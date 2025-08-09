import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Coursera Clone</h3>
            <p className="text-gray-400">
              Learn from the world's best instructors and advance your career.
            </p>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Courses</h4>
            <ul className="space-y-2">
              <li><Link to="/courses" className="text-gray-400 hover:text-white">All Courses</Link></li>
              <li><Link to="/courses/technology" className="text-gray-400 hover:text-white">Technology</Link></li>
              <li><Link to="/courses/business" className="text-gray-400 hover:text-white">Business</Link></li>
              <li><Link to="/courses/design" className="text-gray-400 hover:text-white">Design</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><Link to="/help" className="text-gray-400 hover:text-white">Help Center</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact Us</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-white">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
              <li><Link to="/careers" className="text-gray-400 hover:text-white">Careers</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Coursera Clone. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
