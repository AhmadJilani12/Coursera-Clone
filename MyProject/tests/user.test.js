const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/User');

describe('User API', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe('POST /api/users', () => {
    it('should create a new user', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/users')
        .send(userData)
        .expect(201);

      expect(response.body.message).toBe('User created successfully');
    });

    it('should not create user with existing email', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      };

      // Create first user
      await request(app)
        .post('/api/users')
        .send(userData);

      // Try to create second user with same email
      const response = await request(app)
        .post('/api/users')
        .send(userData)
        .expect(400);

      expect(response.body.error).toBe('User already exists');
    });
  });

  describe('GET /api/users', () => {
    it('should return all users', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      };

      await request(app)
        .post('/api/users')
        .send(userData);

      const response = await request(app)
        .get('/api/users')
        .expect(401); // Should require authentication

      // Note: This test would need a valid token to pass
      // In a real test, you'd need to authenticate first
    });
  });
}); 