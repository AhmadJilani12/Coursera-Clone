import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-900">
              Coursera Clone
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link to="/courses" className="text-gray-700 hover:text-gray-900">
              Courses
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-gray-900">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-gray-900">
              Contact
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link to="/login" className="text-gray-700 hover:text-gray-900">
              Login
            </Link>
            <Link to="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
