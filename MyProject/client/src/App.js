import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';

// Layout Components
import Layout from './components/layout/Layout';

// Page Components
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/dashboard/Dashboard';
import Profile from './pages/dashboard/Profile';
import MyCourses from './pages/dashboard/MyCourses';
import Wishlist from './pages/dashboard/Wishlist';
import Certificates from './pages/dashboard/Certificates';
import InstructorDashboard from './pages/dashboard/InstructorDashboard';
import CreateCourse from './pages/dashboard/CreateCourse';
import EditCourse from './pages/dashboard/EditCourse';

// Context Providers
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';

// Styles
import './index.css';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <AuthProvider>
            <CartProvider>
                             <div className="App min-h-screen bg-gray-50">
                 <Layout>
                   <Routes>
                     {/* Public Routes */}
                     <Route path="/" element={<Home />} />
                     <Route path="/courses" element={<Courses />} />
                     <Route path="/courses/:id" element={<CourseDetail />} />
                     <Route path="/login" element={<Login />} />
                     <Route path="/register" element={<Register />} />
                     
                     {/* Protected Routes */}
                     <Route path="/dashboard" element={<Dashboard />} />
                     <Route path="/profile" element={<Profile />} />
                     <Route path="/my-courses" element={<MyCourses />} />
                     <Route path="/wishlist" element={<Wishlist />} />
                     <Route path="/certificates" element={<Certificates />} />
                     <Route path="/instructor" element={<InstructorDashboard />} />
                     <Route path="/create-course" element={<CreateCourse />} />
                     <Route path="/edit-course/:id" element={<EditCourse />} />
                   </Routes>
                 </Layout>
                
                {/* Toast Notifications */}
                <Toaster
                  position="top-right"
                  toastOptions={{
                    duration: 4000,
                    style: {
                      background: '#363636',
                      color: '#fff',
                    },
                    success: {
                      duration: 3000,
                      iconTheme: {
                        primary: '#22c55e',
                        secondary: '#fff',
                      },
                    },
                    error: {
                      duration: 5000,
                      iconTheme: {
                        primary: '#ef4444',
                        secondary: '#fff',
                      },
                    },
                  }}
                />
              </div>
            </CartProvider>
          </AuthProvider>
        </Router>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App; 