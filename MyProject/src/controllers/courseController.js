const Course = require('../models/Course');
const User = require('../models/User');
const Order = require('../models/Order');
const Certificate = require('../models/Certificate');
const cloudinary = require('../utils/cloudinary');
const { validateCourse, validateCourseUpdate } = require('../utils/validation');

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
exports.getCourses = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Course.countDocuments({ isPublished: true, status: 'published' });

    // Build query
    let query = Course.find({ isPublished: true, status: 'published' })
      .populate('instructor', 'firstName lastName avatar bio')
      .populate('reviews.user', 'firstName lastName avatar');

    // Filter by category
    if (req.query.category) {
      query = query.find({ category: req.query.category });
    }

    // Filter by level
    if (req.query.level) {
      query = query.find({ level: req.query.level });
    }

    // Filter by price range
    if (req.query.minPrice || req.query.maxPrice) {
      const priceFilter = {};
      if (req.query.minPrice) priceFilter.$gte = parseFloat(req.query.minPrice);
      if (req.query.maxPrice) priceFilter.$lte = parseFloat(req.query.maxPrice);
      query = query.find({ price: priceFilter });
    }

    // Filter by rating
    if (req.query.minRating) {
      query = query.find({ 'rating.average': { $gte: parseFloat(req.query.minRating) } });
    }

    // Search by title or description
    if (req.query.search) {
      query = query.find({
        $or: [
          { title: { $regex: req.query.search, $options: 'i' } },
          { description: { $regex: req.query.search, $options: 'i' } },
          { tags: { $in: [new RegExp(req.query.search, 'i')] } }
        ]
      });
    }

    // Sort
    if (req.query.sort) {
      const sortOrder = req.query.order === 'desc' ? -1 : 1;
      switch (req.query.sort) {
        case 'price':
          query = query.sort({ price: sortOrder });
          break;
        case 'rating':
          query = query.sort({ 'rating.average': sortOrder });
          break;
        case 'students':
          query = query.sort({ totalStudents: sortOrder });
          break;
        case 'date':
          query = query.sort({ createdAt: sortOrder });
          break;
        default:
          query = query.sort({ createdAt: -1 });
      }
    } else {
      query = query.sort({ createdAt: -1 });
    }

    // Pagination
    query = query.skip(startIndex).limit(limit);

    const courses = await query;

    // Pagination result
    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit
      };
    }

    res.status(200).json({
      success: true,
      count: courses.length,
      pagination,
      total,
      data: courses
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single course
// @route   GET /api/courses/:id
// @access  Public
exports.getCourse = async (req, res, next) => {
  try {
    const course = await Course.findOne({ 
      $or: [
        { _id: req.params.id },
        { slug: req.params.id }
      ],
      isPublished: true,
      status: 'published'
    })
    .populate('instructor', 'firstName lastName avatar bio socialLinks')
    .populate({
      path: 'reviews.user',
      select: 'firstName lastName avatar'
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Increment view count
    course.analytics.views += 1;
    await course.save();

    // Check if user is enrolled
    let isEnrolled = false;
    let userProgress = 0;
    if (req.user) {
      const user = await User.findById(req.user.id);
      isEnrolled = user.isEnrolledInCourse(course._id);
      if (isEnrolled) {
        userProgress = user.getCourseProgress(course._id);
      }
    }

    res.status(200).json({
      success: true,
      data: {
        ...course.toObject(),
        isEnrolled,
        userProgress
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new course
// @route   POST /api/courses
// @access  Private (Instructor/Admin)
exports.createCourse = async (req, res, next) => {
  try {
    // Validate input
    const { error } = validateCourse(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }

    // Check if user is instructor or admin
    if (req.user.role !== 'instructor' && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Only instructors can create courses'
      });
    }

    req.body.instructor = req.user.id;
    const course = await Course.create(req.body);

    res.status(201).json({
      success: true,
      data: course
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update course
// @route   PUT /api/courses/:id
// @access  Private (Instructor/Admin)
exports.updateCourse = async (req, res, next) => {
  try {
    // Validate input
    const { error } = validateCourseUpdate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }

    let course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Check ownership
    if (course.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this course'
      });
    }

    course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: course
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete course
// @route   DELETE /api/courses/:id
// @access  Private (Instructor/Admin)
exports.deleteCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Check ownership
    if (course.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this course'
      });
    }

    // Delete course images from cloudinary
    if (course.thumbnail.public_id) {
      await cloudinary.uploader.destroy(course.thumbnail.public_id);
    }

    if (course.previewVideo && course.previewVideo.public_id) {
      await cloudinary.uploader.destroy(course.previewVideo.public_id);
    }

    await course.remove();

    res.status(200).json({
      success: true,
      message: 'Course deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload course thumbnail
// @route   PUT /api/courses/:id/thumbnail
// @access  Private (Instructor/Admin)
exports.uploadThumbnail = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Check ownership
    if (course.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this course'
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a file'
      });
    }

    // Delete old image if exists
    if (course.thumbnail.public_id) {
      await cloudinary.uploader.destroy(course.thumbnail.public_id);
    }

    // Upload new image
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'courses/thumbnails',
      width: 300,
      crop: 'scale'
    });

    course.thumbnail = {
      public_id: result.public_id,
      url: result.secure_url
    };

    await course.save();

    res.status(200).json({
      success: true,
      data: course.thumbnail
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add course review
// @route   POST /api/courses/:id/reviews
// @access  Private
exports.addReview = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Check if user is enrolled
    const user = await User.findById(req.user.id);
    if (!user.isEnrolledInCourse(course._id)) {
      return res.status(400).json({
        success: false,
        message: 'You must be enrolled in the course to review it'
      });
    }

    const { rating, comment } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a rating between 1 and 5'
      });
    }

    await course.addReview(req.user.id, rating, comment);

    res.status(200).json({
      success: true,
      message: 'Review added successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get course reviews
// @route   GET /api/courses/:id/reviews
// @access  Public
exports.getReviews = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate({
        path: 'reviews.user',
        select: 'firstName lastName avatar'
      });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    res.status(200).json({
      success: true,
      count: course.reviews.length,
      data: course.reviews
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Enroll in course
// @route   POST /api/courses/:id/enroll
// @access  Private
exports.enrollCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    if (!course.isPublished || course.status !== 'published') {
      return res.status(400).json({
        success: false,
        message: 'Course is not available for enrollment'
      });
    }

    const user = await User.findById(req.user.id);

    // Check if already enrolled
    if (user.isEnrolledInCourse(course._id)) {
      return res.status(400).json({
        success: false,
        message: 'You are already enrolled in this course'
      });
    }

    // Check if course is full
    if (course.isFull()) {
      return res.status(400).json({
        success: false,
        message: 'Course is full'
      });
    }

    // Check if enrollment is open
    if (!course.isEnrollmentOpen()) {
      return res.status(400).json({
        success: false,
        message: 'Enrollment is closed for this course'
      });
    }

    // Add to enrolled courses
    user.enrolledCourses.push({
      course: course._id,
      enrolledAt: new Date(),
      progress: 0
    });

    await user.save();

    // Update course enrollment count
    course.enrollment.currentStudents += 1;
    course.totalStudents += 1;
    await course.save();

    res.status(200).json({
      success: true,
      message: 'Successfully enrolled in course'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get featured courses
// @route   GET /api/courses/featured
// @access  Public
exports.getFeaturedCourses = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 10;
    const courses = await Course.getFeaturedCourses(limit);

    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get courses by category
// @route   GET /api/courses/category/:category
// @access  Public
exports.getCoursesByCategory = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 20;
    const courses = await Course.getCoursesByCategory(req.params.category, limit);

    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get instructor courses
// @route   GET /api/courses/instructor/:id
// @access  Public
exports.getInstructorCourses = async (req, res, next) => {
  try {
    const courses = await Course.find({
      instructor: req.params.id,
      isPublished: true,
      status: 'published'
    })
    .populate('instructor', 'firstName lastName avatar')
    .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses
    });
  } catch (error) {
    next(error);
  }
}; 