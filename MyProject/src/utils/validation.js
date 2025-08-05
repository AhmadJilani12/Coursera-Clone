const Joi = require('joi');

const validation = {
  // User validation schemas
  user: {
    create: Joi.object({
      name: Joi.string().required().min(2).max(50),
      email: Joi.string().email().required(),
      password: Joi.string().required().min(6)
    }),

    update: Joi.object({
      name: Joi.string().min(2).max(50),
      email: Joi.string().email()
    })
  },

  // Auth validation schemas
  auth: {
    register: Joi.object({
      name: Joi.string().required().min(2).max(50),
      email: Joi.string().email().required(),
      password: Joi.string().required().min(6)
    }),

    login: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    })
  }
};

// Validation middleware
const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: error.details[0].message
      });
    }
    next();
  };
};

module.exports = { validation, validate }; 