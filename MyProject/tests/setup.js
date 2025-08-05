// Test setup file
require('dotenv').config({ path: '.env.test' });

// Set test environment
process.env.NODE_ENV = 'test';
process.env.MONGODB_URI = 'mongodb://localhost:27017/my-nodejs-project-test';
process.env.JWT_SECRET = 'test-secret-key';

// Global test timeout
jest.setTimeout(10000); 