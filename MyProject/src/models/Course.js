const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Course title is required'],
    trim: true,
    maxlength: [100, 'Course title cannot exceed 100 characters']
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: [true, 'Course description is required'],
    maxlength: [2000, 'Course description cannot exceed 2000 characters']
  },
  shortDescription: {
    type: String,
    required: [true, 'Short description is required'],
    maxlength: [200, 'Short description cannot exceed 200 characters']
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Instructor is required']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: [
      'programming',
      'data-science',
      'business',
      'design',
      'marketing',
      'health',
      'music',
      'photography',
      'lifestyle',
      'language',
      'academic',
      'other'
    ]
  },
  subcategory: {
    type: String,
    required: [true, 'Subcategory is required']
  },
  level: {
    type: String,
    required: [true, 'Course level is required'],
    enum: ['beginner', 'intermediate', 'advanced', 'all-levels']
  },
  language: {
    type: String,
    required: [true, 'Course language is required'],
    default: 'English'
  },
  thumbnail: {
    public_id: {
      type: String,
      default: null
    },
    url: {
      type: String,
      required: [true, 'Course thumbnail is required']
    }
  },
  previewVideo: {
    public_id: String,
    url: String,
    duration: Number
  },
  price: {
    type: Number,
    required: [true, 'Course price is required'],
    min: [0, 'Price cannot be negative']
  },
  originalPrice: {
    type: Number,
    min: [0, 'Original price cannot be negative']
  },
  currency: {
    type: String,
    default: 'USD'
  },
  isFree: {
    type: Boolean,
    default: false
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  sections: [{
    title: {
      type: String,
      required: [true, 'Section title is required']
    },
    description: String,
    order: {
      type: Number,
      required: true
    },
    lessons: [{
      title: {
        type: String,
        required: [true, 'Lesson title is required']
      },
      description: String,
      type: {
        type: String,
        enum: ['video', 'text', 'quiz', 'assignment'],
        default: 'video'
      },
      content: {
        video: {
          public_id: String,
          url: String,
          duration: Number,
          transcript: String
        },
        text: String,
        quiz: {
          questions: [{
            question: String,
            options: [String],
            correctAnswer: Number,
            explanation: String
          }],
          timeLimit: Number,
          passingScore: Number
        },
        assignment: {
          description: String,
          requirements: [String],
          dueDate: Date,
          maxScore: Number
        }
      },
      order: {
        type: Number,
        required: true
      },
      isPreview: {
        type: Boolean,
        default: false
      },
      duration: {
        type: Number,
        default: 0
      },
      resources: [{
        title: String,
        type: String,
        url: String,
        file: {
          public_id: String,
          url: String
        }
      }]
    }]
  }],
  requirements: [{
    type: String,
    maxlength: [200, 'Requirement cannot exceed 200 characters']
  }],
  learningOutcomes: [{
    type: String,
    maxlength: [200, 'Learning outcome cannot exceed 200 characters']
  }],
  targetAudience: [{
    type: String,
    maxlength: [200, 'Target audience cannot exceed 200 characters']
  }],
  tags: [String],
  totalDuration: {
    type: Number,
    default: 0
  },
  totalLessons: {
    type: Number,
    default: 0
  },
  totalStudents: {
    type: Number,
    default: 0
  },
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    },
    distribution: {
      five: { type: Number, default: 0 },
      four: { type: Number, default: 0 },
      three: { type: Number, default: 0 },
      two: { type: Number, default: 0 },
      one: { type: Number, default: 0 }
    }
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      maxlength: [1000, 'Review comment cannot exceed 1000 characters']
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    isVerified: {
      type: Boolean,
      default: false
    }
  }],
  certificates: {
    enabled: {
      type: Boolean,
      default: true
    },
    template: {
      type: String,
      default: 'default'
    },
    requirements: {
      completionRate: {
        type: Number,
        default: 80,
        min: 0,
        max: 100
      },
      minimumScore: {
        type: Number,
        default: 70,
        min: 0,
        max: 100
      }
    }
  },
  enrollment: {
    maxStudents: {
      type: Number,
      default: null
    },
    currentStudents: {
      type: Number,
      default: 0
    },
    enrollmentDeadline: Date,
    startDate: Date,
    endDate: Date
  },
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String]
  },
  analytics: {
    views: {
      type: Number,
      default: 0
    },
    uniqueViews: {
      type: Number,
      default: 0
    },
    conversionRate: {
      type: Number,
      default: 0
    },
    revenue: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for course URL
courseSchema.virtual('url').get(function() {
  return `/courses/${this.slug}`;
});

// Virtual for discount percentage
courseSchema.virtual('discountPercentage').get(function() {
  if (this.originalPrice && this.originalPrice > this.price) {
    return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
  }
  return 0;
});

// Virtual for average rating
courseSchema.virtual('averageRating').get(function() {
  return this.rating.average;
});

// Virtual for total reviews
courseSchema.virtual('totalReviews').get(function() {
  return this.rating.count;
});

// Virtual for enrollment percentage
courseSchema.virtual('enrollmentPercentage').get(function() {
  if (this.enrollment.maxStudents) {
    return Math.round((this.enrollment.currentStudents / this.enrollment.maxStudents) * 100);
  }
  return 0;
});

// Indexes for better query performance
courseSchema.index({ slug: 1 });
courseSchema.index({ instructor: 1 });
courseSchema.index({ category: 1 });
courseSchema.index({ status: 1 });
courseSchema.index({ isPublished: 1 });
courseSchema.index({ isFeatured: 1 });
courseSchema.index({ price: 1 });
courseSchema.index({ 'rating.average': -1 });
courseSchema.index({ totalStudents: -1 });
courseSchema.index({ createdAt: -1 });

// Pre-save middleware to generate slug
courseSchema.pre('save', function(next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

// Method to calculate total duration
courseSchema.methods.calculateTotalDuration = function() {
  let total = 0;
  this.sections.forEach(section => {
    section.lessons.forEach(lesson => {
      if (lesson.duration) {
        total += lesson.duration;
      }
    });
  });
  this.totalDuration = total;
  return total;
};

// Method to calculate total lessons
courseSchema.methods.calculateTotalLessons = function() {
  let total = 0;
  this.sections.forEach(section => {
    total += section.lessons.length;
  });
  this.totalLessons = total;
  return total;
};

// Method to update rating
courseSchema.methods.updateRating = function() {
  if (this.reviews.length === 0) {
    this.rating.average = 0;
    this.rating.count = 0;
    return;
  }

  const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
  this.rating.average = totalRating / this.reviews.length;
  this.rating.count = this.reviews.length;

  // Update rating distribution
  this.rating.distribution = { five: 0, four: 0, three: 0, two: 0, one: 0 };
  this.reviews.forEach(review => {
    switch (review.rating) {
      case 5: this.rating.distribution.five++; break;
      case 4: this.rating.distribution.four++; break;
      case 3: this.rating.distribution.three++; break;
      case 2: this.rating.distribution.two++; break;
      case 1: this.rating.distribution.one++; break;
    }
  });
};

// Method to add review
courseSchema.methods.addReview = function(userId, rating, comment) {
  // Check if user already reviewed
  const existingReviewIndex = this.reviews.findIndex(
    review => review.user.toString() === userId.toString()
  );

  if (existingReviewIndex !== -1) {
    // Update existing review
    this.reviews[existingReviewIndex].rating = rating;
    this.reviews[existingReviewIndex].comment = comment;
    this.reviews[existingReviewIndex].createdAt = new Date();
  } else {
    // Add new review
    this.reviews.push({
      user: userId,
      rating,
      comment,
      createdAt: new Date()
    });
  }

  this.updateRating();
  return this.save();
};

// Method to check if course is full
courseSchema.methods.isFull = function() {
  return this.enrollment.maxStudents && 
         this.enrollment.currentStudents >= this.enrollment.maxStudents;
};

// Method to check if enrollment is open
courseSchema.methods.isEnrollmentOpen = function() {
  if (this.enrollment.enrollmentDeadline) {
    return new Date() <= this.enrollment.enrollmentDeadline;
  }
  return true;
};

// Static method to get featured courses
courseSchema.statics.getFeaturedCourses = function(limit = 10) {
  return this.find({
    isPublished: true,
    isFeatured: true,
    status: 'published'
  })
  .populate('instructor', 'firstName lastName avatar')
  .sort({ createdAt: -1 })
  .limit(limit);
};

// Static method to get courses by category
courseSchema.statics.getCoursesByCategory = function(category, limit = 20) {
  return this.find({
    category,
    isPublished: true,
    status: 'published'
  })
  .populate('instructor', 'firstName lastName avatar')
  .sort({ 'rating.average': -1 })
  .limit(limit);
};

module.exports = mongoose.model('Course', courseSchema); 