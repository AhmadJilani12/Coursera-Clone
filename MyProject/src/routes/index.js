const express = require('express');
const router = express.Router();

// Import route modules
const userRoutes = require('./userRoutes');
const authRoutes = require('./authRoutes');

// Route definitions
router.use('/users', userRoutes);
router.use('/auth', authRoutes);

// Default API route
router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the API',
    version: '1.0.0',
    endpoints: {
      users: '/api/users',
      auth: '/api/auth'
    }
  });
});

module.exports = router; 