# Coursera Clone - Full-Stack Learning Platform

A comprehensive Coursera-like learning platform built with Node.js, Express, MongoDB, and React. This platform provides a complete online learning experience with course management, user authentication, payment processing, and a modern responsive frontend.

## 🚀 Features

### Core Features
- **User Authentication & Authorization**
  - User registration and login
  - Email verification
  - Password reset functionality
  - Role-based access (Student, Instructor, Admin)
  - JWT token authentication

- **Course Management**
  - Create, edit, and delete courses
  - Course categories and subcategories
  - Course ratings and reviews
  - Course enrollment and progress tracking
  - Video and text content support
  - Course search and filtering

- **User Dashboard**
  - Personal profile management
  - Enrolled courses tracking
  - Course progress monitoring
  - Wishlist management
  - Certificate generation
  - Order history

- **Instructor Features**
  - Course creation and management
  - Student analytics
  - Revenue tracking
  - Course performance metrics
  - Content upload and management

- **Payment & Orders**
  - Stripe payment integration
  - Order management
  - Payment history
  - Refund processing
  - Tax calculation

- **Certificates**
  - Automatic certificate generation
  - Certificate verification
  - Custom certificate templates
  - Certificate sharing

### Technical Features
- **Backend**
  - RESTful API with Express.js
  - MongoDB with Mongoose ODM
  - JWT authentication
  - File upload with Cloudinary
  - Email notifications with Nodemailer
  - Input validation with Joi
  - Error handling middleware
  - Rate limiting
  - CORS configuration

- **Frontend**
  - React 18 with hooks
  - React Router for navigation
  - React Query for data fetching
  - Tailwind CSS for styling
  - Framer Motion for animations
  - Responsive design
  - Progressive Web App features
  - SEO optimization

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer + Cloudinary
- **Email**: Nodemailer
- **Validation**: Joi
- **Payment**: Stripe
- **Testing**: Jest + Supertest

### Frontend
- **Framework**: React 18
- **Routing**: React Router DOM
- **State Management**: React Context + useReducer
- **Data Fetching**: React Query
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Forms**: React Hook Form
- **Notifications**: React Hot Toast
- **Icons**: React Icons + Lucide React

### Development Tools
- **Package Manager**: npm
- **Linting**: ESLint
- **Code Formatting**: Prettier
- **Version Control**: Git
- **Deployment**: Ready for Vercel/Netlify

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd MyProject
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # MongoDB Configuration
   MONGODB_URI=your_mongodb_connection_string
   
   # JWT Configuration
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=30d
   
   # Email Configuration
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   
   # Cloudinary Configuration
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   
   # Stripe Configuration
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   ```

4. **Start the backend server**
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Navigate to client directory**
   ```bash
   cd client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the React development server**
   ```bash
   npm start
   ```

## 🚀 Usage

### Development
- Backend runs on: `http://localhost:5000`
- Frontend runs on: `http://localhost:3000`

### API Endpoints

#### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/updatedetails` - Update user details
- `PUT /api/auth/updatepassword` - Update password
- `POST /api/auth/forgotpassword` - Forgot password
- `PUT /api/auth/resetpassword/:token` - Reset password

#### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course by ID
- `POST /api/courses` - Create course (Instructor/Admin)
- `PUT /api/courses/:id` - Update course (Instructor/Admin)
- `DELETE /api/courses/:id` - Delete course (Instructor/Admin)
- `POST /api/courses/:id/enroll` - Enroll in course
- `POST /api/courses/:id/reviews` - Add course review
- `GET /api/courses/featured` - Get featured courses

#### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/enrolled-courses` - Get enrolled courses
- `GET /api/users/wishlist` - Get wishlist
- `POST /api/users/wishlist/:courseId` - Add to wishlist
- `DELETE /api/users/wishlist/:courseId` - Remove from wishlist

#### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id/cancel` - Cancel order

#### Certificates
- `GET /api/certificates` - Get user certificates
- `GET /api/certificates/:id` - Get certificate by ID
- `GET /api/certificates/verify/:certificateId` - Verify certificate

## 📁 Project Structure

```
MyProject/
├── src/
│   ├── app.js                 # Main application file
│   ├── config/
│   │   └── database.js        # Database configuration
│   ├── controllers/
│   │   ├── authController.js  # Authentication controller
│   │   ├── courseController.js # Course controller
│   │   └── userController.js  # User controller
│   ├── middleware/
│   │   ├── authMiddleware.js  # Authentication middleware
│   │   └── errorHandler.js    # Error handling middleware
│   ├── models/
│   │   ├── User.js           # User model
│   │   ├── Course.js         # Course model
│   │   ├── Order.js          # Order model
│   │   └── Certificate.js    # Certificate model
│   ├── routes/
│   │   ├── authRoutes.js     # Authentication routes
│   │   ├── courseRoutes.js   # Course routes
│   │   └── userRoutes.js     # User routes
│   └── utils/
│       ├── email.js          # Email utility
│       ├── cloudinary.js     # Cloudinary configuration
│       └── validation.js     # Validation schemas
├── client/
│   ├── public/
│   │   └── index.html        # Main HTML file
│   └── src/
│       ├── components/       # React components
│       ├── contexts/         # React contexts
│       ├── pages/           # Page components
│       ├── services/        # API services
│       ├── App.js          # Main App component
│       └── index.js        # Entry point
├── tests/                   # Test files
├── package.json            # Backend dependencies
└── README.md              # Project documentation
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=30d

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
```

## 🧪 Testing

### Backend Testing
```bash
npm test
```

### Frontend Testing
```bash
cd client
npm test
```

## 🚀 Deployment

### Backend Deployment
1. Set up environment variables on your hosting platform
2. Configure MongoDB connection
3. Deploy to platforms like:
   - Heroku
   - Railway
   - DigitalOcean
   - AWS

### Frontend Deployment
1. Build the production version:
   ```bash
   cd client
   npm run build
   ```
2. Deploy to platforms like:
   - Vercel
   - Netlify
   - GitHub Pages
   - AWS S3

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Coursera for inspiration
- React team for the amazing framework
- Express.js team for the backend framework
- MongoDB team for the database
- All open-source contributors

## 📞 Support

If you have any questions or need help, please open an issue in the GitHub repository.

---

**Happy Learning! 🎓** 