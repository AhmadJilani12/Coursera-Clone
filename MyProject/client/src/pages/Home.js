import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Learn from the World's Best
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Access thousands of courses from top universities and companies. 
              Build skills for today's most in-demand careers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/courses" 
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
              >
                Explore Courses
              </Link>
              <Link 
                to="/signup" 
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition duration-300"
              >
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join millions of learners worldwide and transform your career with our comprehensive learning platform.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Instructors</h3>
              <p className="text-gray-600">Learn from industry experts and university professors from around the world.</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Flexible Learning</h3>
              <p className="text-gray-600">Study at your own pace with 24/7 access to course materials and videos.</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Certificates</h3>
              <p className="text-gray-600">Earn certificates upon completion to showcase your new skills to employers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Courses Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Popular Courses
            </h2>
            <p className="text-lg text-gray-600">
              Start with our most popular courses and build your skills
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Course Card 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
              <div className="h-48 bg-gradient-to-r from-blue-400 to-blue-600"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">React Development</h3>
                <p className="text-gray-600 mb-4">Learn React from scratch and build modern web applications.</p>
                <div className="flex justify-between items-center">
                  <span className="text-blue-600 font-semibold">$49.99</span>
                  <Link to="/courses/react" className="text-blue-600 hover:text-blue-800 font-medium">
                    Learn More →
                  </Link>
                </div>
              </div>
            </div>

            {/* Course Card 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
              <div className="h-48 bg-gradient-to-r from-green-400 to-green-600"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Python Programming</h3>
                <p className="text-gray-600 mb-4">Master Python programming and data science fundamentals.</p>
                <div className="flex justify-between items-center">
                  <span className="text-blue-600 font-semibold">$39.99</span>
                  <Link to="/courses/python" className="text-blue-600 hover:text-blue-800 font-medium">
                    Learn More →
                  </Link>
                </div>
              </div>
            </div>

            {/* Course Card 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
              <div className="h-48 bg-gradient-to-r from-purple-400 to-purple-600"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">UI/UX Design</h3>
                <p className="text-gray-600 mb-4">Create beautiful and functional user interfaces and experiences.</p>
                <div className="flex justify-between items-center">
                  <span className="text-blue-600 font-semibold">$59.99</span>
                  <Link to="/courses/design" className="text-blue-600 hover:text-blue-800 font-medium">
                    Learn More →
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link 
              to="/courses" 
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
            >
              View All Courses
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
