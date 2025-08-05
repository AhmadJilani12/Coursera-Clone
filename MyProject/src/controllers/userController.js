const User = require('../models/User');

const userController = {
  // Get all users
  getAllUsers: async (req, res) => {
    try {
      // Check if MongoDB is connected
      if (!User.db || User.db.readyState !== 1) {
        return res.status(503).json({ error: 'Database not available' });
      }
      const users = await User.find().select('-password');
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching users' });
    }
  },

  // Get user by ID
  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select('-password');
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching user' });
    }
  },

  // Create new user
  createUser: async (req, res) => {
    try {
      // Check if MongoDB is connected
      if (!User.db || User.db.readyState !== 1) {
        return res.status(503).json({ error: 'Database not available' });
      }
      
      const { name, email, password } = req.body;
      
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }

      const user = new User({ name, email, password });
      await user.save();
      
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error creating user' });
    }
  },

  // Update user
  updateUser: async (req, res) => {
    try {
      const { name, email } = req.body;
      const user = await User.findByIdAndUpdate(
        req.params.id,
        { name, email },
        { new: true }
      ).select('-password');
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Error updating user' });
    }
  },

  // Delete user
  deleteUser: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting user' });
    }
  }
};

module.exports = userController; 