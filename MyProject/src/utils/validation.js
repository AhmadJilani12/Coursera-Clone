const Joi = require('joi');

// User registration validation
const validateRegistration = (data) => {
  const schema = Joi.object({
    firstName: Joi.string()
      .min(2)
      .max(50)
      .required()
      .messages({
        'string.min': 'First name must be at least 2 characters long',
        'string.max': 'First name cannot exceed 50 characters',
        'any.required': 'First name is required'
      }),
    lastName: Joi.string()
      .min(2)
      .max(50)
      .required()
      .messages({
        'string.min': 'Last name must be at least 2 characters long',
        'string.max': 'Last name cannot exceed 50 characters',
        'any.required': 'Last name is required'
      }),
    email: Joi.string()
      .email()
      .required()
      .messages({
        'string.email': 'Please provide a valid email address',
        'any.required': 'Email is required'
      }),
    password: Joi.string()
      .min(6)
      .required()
      .messages({
        'string.min': 'Password must be at least 6 characters long',
        'any.required': 'Password is required'
      }),
    role: Joi.string()
      .valid('student', 'instructor', 'admin')
      .default('student')
      .messages({
        'any.only': 'Role must be student, instructor, or admin'
      })
  });

  return schema.validate(data);
};

// User login validation
const validateLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .required()
      .messages({
        'string.email': 'Please provide a valid email address',
        'any.required': 'Email is required'
      }),
    password: Joi.string()
      .required()
      .messages({
        'any.required': 'Password is required'
      })
  });

  return schema.validate(data);
};

// Password reset validation
const validatePasswordReset = (data) => {
  const schema = Joi.object({
    password: Joi.string()
      .min(6)
      .required()
      .messages({
        'string.min': 'Password must be at least 6 characters long',
        'any.required': 'Password is required'
      })
  });

  return schema.validate(data);
};

// Course creation validation
const validateCourse = (data) => {
  const schema = Joi.object({
    title: Joi.string()
      .min(5)
      .max(100)
      .required()
      .messages({
        'string.min': 'Course title must be at least 5 characters long',
        'string.max': 'Course title cannot exceed 100 characters',
        'any.required': 'Course title is required'
      }),
    description: Joi.string()
      .min(20)
      .max(2000)
      .required()
      .messages({
        'string.min': 'Course description must be at least 20 characters long',
        'string.max': 'Course description cannot exceed 2000 characters',
        'any.required': 'Course description is required'
      }),
    shortDescription: Joi.string()
      .min(10)
      .max(200)
      .required()
      .messages({
        'string.min': 'Short description must be at least 10 characters long',
        'string.max': 'Short description cannot exceed 200 characters',
        'any.required': 'Short description is required'
      }),
    category: Joi.string()
      .valid(
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
      )
      .required()
      .messages({
        'any.only': 'Please select a valid category',
        'any.required': 'Category is required'
      }),
    subcategory: Joi.string()
      .required()
      .messages({
        'any.required': 'Subcategory is required'
      }),
    level: Joi.string()
      .valid('beginner', 'intermediate', 'advanced', 'all-levels')
      .required()
      .messages({
        'any.only': 'Please select a valid level',
        'any.required': 'Level is required'
      }),
    language: Joi.string()
      .default('English'),
    price: Joi.number()
      .min(0)
      .required()
      .messages({
        'number.min': 'Price cannot be negative',
        'any.required': 'Price is required'
      }),
    originalPrice: Joi.number()
      .min(0)
      .messages({
        'number.min': 'Original price cannot be negative'
      }),
    isFree: Joi.boolean()
      .default(false),
    requirements: Joi.array()
      .items(Joi.string().max(200))
      .messages({
        'array.max': 'Cannot have more than 10 requirements'
      }),
    learningOutcomes: Joi.array()
      .items(Joi.string().max(200))
      .messages({
        'array.max': 'Cannot have more than 10 learning outcomes'
      }),
    targetAudience: Joi.array()
      .items(Joi.string().max(200))
      .messages({
        'array.max': 'Cannot have more than 10 target audience items'
      }),
    tags: Joi.array()
      .items(Joi.string())
      .messages({
        'array.max': 'Cannot have more than 20 tags'
      })
  });

  return schema.validate(data);
};

// Course update validation
const validateCourseUpdate = (data) => {
  const schema = Joi.object({
    title: Joi.string()
      .min(5)
      .max(100)
      .messages({
        'string.min': 'Course title must be at least 5 characters long',
        'string.max': 'Course title cannot exceed 100 characters'
      }),
    description: Joi.string()
      .min(20)
      .max(2000)
      .messages({
        'string.min': 'Course description must be at least 20 characters long',
        'string.max': 'Course description cannot exceed 2000 characters'
      }),
    shortDescription: Joi.string()
      .min(10)
      .max(200)
      .messages({
        'string.min': 'Short description must be at least 10 characters long',
        'string.max': 'Short description cannot exceed 200 characters'
      }),
    category: Joi.string()
      .valid(
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
      )
      .messages({
        'any.only': 'Please select a valid category'
      }),
    subcategory: Joi.string(),
    level: Joi.string()
      .valid('beginner', 'intermediate', 'advanced', 'all-levels')
      .messages({
        'any.only': 'Please select a valid level'
      }),
    language: Joi.string(),
    price: Joi.number()
      .min(0)
      .messages({
        'number.min': 'Price cannot be negative'
      }),
    originalPrice: Joi.number()
      .min(0)
      .messages({
        'number.min': 'Original price cannot be negative'
      }),
    isFree: Joi.boolean(),
    isPublished: Joi.boolean(),
    isFeatured: Joi.boolean(),
    status: Joi.string()
      .valid('draft', 'published', 'archived'),
    requirements: Joi.array()
      .items(Joi.string().max(200)),
    learningOutcomes: Joi.array()
      .items(Joi.string().max(200)),
    targetAudience: Joi.array()
      .items(Joi.string().max(200)),
    tags: Joi.array()
      .items(Joi.string())
  });

  return schema.validate(data);
};

// Review validation
const validateReview = (data) => {
  const schema = Joi.object({
    rating: Joi.number()
      .min(1)
      .max(5)
      .required()
      .messages({
        'number.min': 'Rating must be at least 1',
        'number.max': 'Rating cannot exceed 5',
        'any.required': 'Rating is required'
      }),
    comment: Joi.string()
      .max(1000)
      .messages({
        'string.max': 'Review comment cannot exceed 1000 characters'
      })
  });

  return schema.validate(data);
};

// User profile update validation
const validateProfileUpdate = (data) => {
  const schema = Joi.object({
    firstName: Joi.string()
      .min(2)
      .max(50)
      .messages({
        'string.min': 'First name must be at least 2 characters long',
        'string.max': 'First name cannot exceed 50 characters'
      }),
    lastName: Joi.string()
      .min(2)
      .max(50)
      .messages({
        'string.min': 'Last name must be at least 2 characters long',
        'string.max': 'Last name cannot exceed 50 characters'
      }),
    bio: Joi.string()
      .max(500)
      .messages({
        'string.max': 'Bio cannot exceed 500 characters'
      }),
    location: Joi.string()
      .max(100)
      .messages({
        'string.max': 'Location cannot exceed 100 characters'
      }),
    website: Joi.string()
      .uri()
      .messages({
        'string.uri': 'Please provide a valid URL'
      }),
    socialLinks: Joi.object({
      linkedin: Joi.string().uri(),
      twitter: Joi.string().uri(),
      github: Joi.string().uri(),
      youtube: Joi.string().uri()
    }),
    skills: Joi.array()
      .items(Joi.string())
      .messages({
        'array.max': 'Cannot have more than 20 skills'
      }),
    interests: Joi.array()
      .items(Joi.string())
      .messages({
        'array.max': 'Cannot have more than 10 interests'
      }),
    preferences: Joi.object({
      language: Joi.string().valid('en', 'es', 'fr', 'de', 'zh', 'ja', 'ko'),
      timezone: Joi.string(),
      theme: Joi.string().valid('light', 'dark')
    })
  });

  return schema.validate(data);
};

// Password update validation
const validatePasswordUpdate = (data) => {
  const schema = Joi.object({
    currentPassword: Joi.string()
      .required()
      .messages({
        'any.required': 'Current password is required'
      }),
    newPassword: Joi.string()
      .min(6)
      .required()
      .messages({
        'string.min': 'New password must be at least 6 characters long',
        'any.required': 'New password is required'
      })
  });

  return schema.validate(data);
};

module.exports = {
  validateRegistration,
  validateLogin,
  validatePasswordReset,
  validateCourse,
  validateCourseUpdate,
  validateReview,
  validateProfileUpdate,
  validatePasswordUpdate
}; 