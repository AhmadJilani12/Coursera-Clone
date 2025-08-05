# Node.js Project

A well-structured Node.js project with Express.js, MongoDB, and JWT authentication.

## Features

- ✅ Express.js REST API
- ✅ MongoDB with Mongoose ODM
- ✅ JWT Authentication
- ✅ User management (CRUD operations)
- ✅ Input validation with Joi
- ✅ Error handling middleware
- ✅ Security with Helmet and CORS
- ✅ Testing setup with Jest
- ✅ Environment configuration
- ✅ Organized folder structure

## Project Structure

```
MyProject/
├── src/
│   ├── app.js                 # Main application entry point
│   ├── routes/                # Route definitions
│   │   ├── index.js          # Main router
│   │   ├── userRoutes.js     # User routes
│   │   └── authRoutes.js     # Authentication routes
│   ├── controllers/           # Business logic
│   │   ├── userController.js # User operations
│   │   └── authController.js # Authentication operations
│   ├── models/               # Database models
│   │   └── User.js          # User model
│   ├── middleware/           # Custom middleware
│   │   ├── authMiddleware.js # JWT authentication
│   │   └── errorHandler.js   # Error handling
│   ├── config/              # Configuration files
│   │   └── database.js      # Database connection
│   └── utils/               # Utility functions
│       └── validation.js    # Input validation
├── tests/                   # Test files
│   └── user.test.js        # User API tests
├── package.json            # Dependencies and scripts
├── env.example            # Environment variables template
└── README.md              # Project documentation
```

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd MyProject
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy the example file
   cp env.example .env
   
   # Edit .env with your configuration
   nano .env
   ```

4. **Set up MongoDB**
   - Install MongoDB locally or use MongoDB Atlas
   - Update `MONGODB_URI` in your `.env` file

## Usage

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

### Testing
```bash
npm test
```

### Linting
```bash
npm run lint
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Users
- `GET /api/users` - Get all users (requires auth)
- `GET /api/users/:id` - Get user by ID (requires auth)
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user (requires auth)
- `DELETE /api/users/:id` - Delete user (requires auth)

### Health Check
- `GET /health` - Server health status

## Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/my-nodejs-project

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

## Dependencies

### Production Dependencies
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT authentication
- `joi` - Input validation
- `cors` - Cross-origin resource sharing
- `helmet` - Security headers
- `dotenv` - Environment variables

### Development Dependencies
- `nodemon` - Development server
- `jest` - Testing framework
- `supertest` - HTTP testing
- `eslint` - Code linting

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License 