import axios from 'axios';

// Create axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle token expiration
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    
    // Handle server errors
    if (error.response?.status >= 500) {
      console.error('Server error:', error.response.data);
    }
    
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/api/auth/login', credentials),
  register: (userData) => api.post('/api/auth/register', userData),
  logout: () => api.post('/api/auth/logout'),
  getMe: () => api.get('/api/auth/me'),
  updateProfile: (userData) => api.put('/api/auth/updatedetails', userData),
  updatePassword: (passwordData) => api.put('/api/auth/updatepassword', passwordData),
  forgotPassword: (email) => api.post('/api/auth/forgotpassword', { email }),
  resetPassword: (token, password) => api.put(`/api/auth/resetpassword/${token}`, { password }),
  verifyEmail: (token) => api.get(`/api/auth/verify-email/${token}`),
  resendVerification: () => api.post('/api/auth/resend-verification'),
  updateNotifications: (notifications) => api.put('/api/auth/notifications', { notifications }),
};

// Courses API
export const coursesAPI = {
  getAll: (params) => api.get('/api/courses', { params }),
  getById: (id) => api.get(`/api/courses/${id}`),
  create: (courseData) => api.post('/api/courses', courseData),
  update: (id, courseData) => api.put(`/api/courses/${id}`, courseData),
  delete: (id) => api.delete(`/api/courses/${id}`),
  uploadThumbnail: (id, formData) => api.put(`/api/courses/${id}/thumbnail`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  addReview: (id, reviewData) => api.post(`/api/courses/${id}/reviews`, reviewData),
  getReviews: (id) => api.get(`/api/courses/${id}/reviews`),
  enroll: (id) => api.post(`/api/courses/${id}/enroll`),
  getFeatured: (limit) => api.get('/api/courses/featured', { params: { limit } }),
  getByCategory: (category, limit) => api.get(`/api/courses/category/${category}`, { params: { limit } }),
  getByInstructor: (instructorId) => api.get(`/api/courses/instructor/${instructorId}`),
};

// Users API
export const usersAPI = {
  getProfile: () => api.get('/api/users/profile'),
  updateProfile: (userData) => api.put('/api/users/profile', userData),
  uploadAvatar: (formData) => api.put('/api/users/avatar', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getEnrolledCourses: () => api.get('/api/users/enrolled-courses'),
  getWishlist: () => api.get('/api/users/wishlist'),
  addToWishlist: (courseId) => api.post(`/api/users/wishlist/${courseId}`),
  removeFromWishlist: (courseId) => api.delete(`/api/users/wishlist/${courseId}`),
  getCertificates: () => api.get('/api/users/certificates'),
  getOrders: () => api.get('/api/users/orders'),
  getProgress: (courseId) => api.get(`/api/users/progress/${courseId}`),
  updateProgress: (courseId, progressData) => api.put(`/api/users/progress/${courseId}`, progressData),
};

// Orders API
export const ordersAPI = {
  create: (orderData) => api.post('/api/orders', orderData),
  getById: (id) => api.get(`/api/orders/${id}`),
  getUserOrders: () => api.get('/api/orders'),
  cancel: (id) => api.put(`/api/orders/${id}/cancel`),
  getPaymentIntent: (orderData) => api.post('/api/orders/payment-intent', orderData),
  confirmPayment: (paymentData) => api.post('/api/orders/confirm-payment', paymentData),
};

// Certificates API
export const certificatesAPI = {
  getByUser: () => api.get('/api/certificates'),
  getById: (id) => api.get(`/api/certificates/${id}`),
  verify: (certificateId) => api.get(`/api/certificates/verify/${certificateId}`),
  download: (id) => api.get(`/api/certificates/${id}/download`),
};

// Instructor API
export const instructorAPI = {
  getDashboard: () => api.get('/api/instructor/dashboard'),
  getCourses: () => api.get('/api/instructor/courses'),
  getCourseStats: (courseId) => api.get(`/api/instructor/courses/${courseId}/stats`),
  getStudents: (courseId) => api.get(`/api/instructor/courses/${courseId}/students`),
  getRevenue: (params) => api.get('/api/instructor/revenue', { params }),
  getAnalytics: (params) => api.get('/api/instructor/analytics', { params }),
};

// Admin API
export const adminAPI = {
  getDashboard: () => api.get('/api/admin/dashboard'),
  getUsers: (params) => api.get('/api/admin/users', { params }),
  updateUser: (id, userData) => api.put(`/api/admin/users/${id}`, userData),
  deleteUser: (id) => api.delete(`/api/admin/users/${id}`),
  getCourses: (params) => api.get('/api/admin/courses', { params }),
  updateCourse: (id, courseData) => api.put(`/api/admin/courses/${id}`, courseData),
  deleteCourse: (id) => api.delete(`/api/admin/courses/${id}`),
  getOrders: (params) => api.get('/api/admin/orders', { params }),
  getAnalytics: (params) => api.get('/api/admin/analytics', { params }),
  getRevenue: (params) => api.get('/api/admin/revenue', { params }),
};

// Search API
export const searchAPI = {
  searchCourses: (query, params) => api.get('/api/search/courses', { 
    params: { q: query, ...params } 
  }),
  searchInstructors: (query, params) => api.get('/api/search/instructors', { 
    params: { q: query, ...params } 
  }),
  getSuggestions: (query) => api.get('/api/search/suggestions', { 
    params: { q: query } 
  }),
};

// File Upload API
export const uploadAPI = {
  uploadImage: (formData) => api.post('/api/upload/image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  uploadVideo: (formData, onProgress) => api.post('/api/upload/video', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      onProgress && onProgress(percentCompleted);
    }
  }),
  uploadDocument: (formData) => api.post('/api/upload/document', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
};

// Utility functions
export const apiUtils = {
  // Format error message
  formatError: (error) => {
    if (error.response?.data?.message) {
      return error.response.data.message;
    }
    if (error.response?.data?.error) {
      return error.response.data.error;
    }
    if (error.message) {
      return error.message;
    }
    return 'An unexpected error occurred';
  },

  // Check if error is network error
  isNetworkError: (error) => {
    return !error.response && error.request;
  },

  // Check if error is server error
  isServerError: (error) => {
    return error.response?.status >= 500;
  },

  // Check if error is client error
  isClientError: (error) => {
    return error.response?.status >= 400 && error.response?.status < 500;
  },

  // Retry request
  retry: async (fn, retries = 3, delay = 1000) => {
    try {
      return await fn();
    } catch (error) {
      if (retries > 0 && !apiUtils.isClientError(error)) {
        await new Promise(resolve => setTimeout(resolve, delay));
        return apiUtils.retry(fn, retries - 1, delay * 2);
      }
      throw error;
    }
  },
};

export default api; 