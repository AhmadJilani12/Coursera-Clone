import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Dashboard</h1>
          <p className="text-lg text-gray-600 mb-8">Welcome to your learning dashboard</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">My Courses</h3>
            <p className="text-gray-600 mb-4">Track your enrolled courses and progress</p>
            <Link to="/dashboard/my-courses" className="text-blue-600 hover:text-blue-800">
              View Courses →
            </Link>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Profile</h3>
            <p className="text-gray-600 mb-4">Manage your account settings and preferences</p>
            <Link to="/dashboard/profile" className="text-blue-600 hover:text-blue-800">
              Edit Profile →
            </Link>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Certificates</h3>
            <p className="text-gray-600 mb-4">View and download your earned certificates</p>
            <Link to="/dashboard/certificates" className="text-blue-600 hover:text-blue-800">
              View Certificates →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
