import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock course data
  const courses = [
    {
      id: 1,
      title: 'React Development',
      instructor: 'John Doe',
      category: 'technology',
      price: 49.99,
      rating: 4.8,
      students: 1250,
      image: 'bg-gradient-to-r from-blue-400 to-blue-600',
      description: 'Learn React from scratch and build modern web applications.'
    },
    {
      id: 2,
      title: 'Python Programming',
      instructor: 'Jane Smith',
      category: 'technology',
      price: 39.99,
      rating: 4.7,
      students: 2100,
      image: 'bg-gradient-to-r from-green-400 to-green-600',
      description: 'Master Python programming and data science fundamentals.'
    },
    {
      id: 3,
      title: 'UI/UX Design',
      instructor: 'Mike Johnson',
      category: 'design',
      price: 59.99,
      rating: 4.9,
      students: 890,
      image: 'bg-gradient-to-r from-purple-400 to-purple-600',
      description: 'Create beautiful and functional user interfaces and experiences.'
    },
    {
      id: 4,
      title: 'Business Strategy',
      instructor: 'Sarah Wilson',
      category: 'business',
      price: 69.99,
      rating: 4.6,
      students: 1560,
      image: 'bg-gradient-to-r from-red-400 to-red-600',
      description: 'Develop strategic thinking and business planning skills.'
    },
    {
      id: 5,
      title: 'Digital Marketing',
      instructor: 'David Brown',
      category: 'business',
      price: 44.99,
      rating: 4.5,
      students: 3200,
      image: 'bg-gradient-to-r from-yellow-400 to-yellow-600',
      description: 'Learn modern digital marketing strategies and techniques.'
    },
    {
      id: 6,
      title: 'Graphic Design',
      instructor: 'Lisa Chen',
      category: 'design',
      price: 54.99,
      rating: 4.8,
      students: 1100,
      image: 'bg-gradient-to-r from-pink-400 to-pink-600',
      description: 'Master graphic design principles and tools.'
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'technology', label: 'Technology' },
    { value: 'business', label: 'Business' },
    { value: 'design', label: 'Design' }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Explore Courses</h1>
          <p className="text-lg text-gray-600">Find the perfect course to advance your career</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search courses or instructors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="md:w-48">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredCourses.length} of {courses.length} courses
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
              <div className={`h-48 ${course.image}`}></div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500 capitalize">{course.category}</span>
                  <div className="flex items-center">
                    <span className="text-yellow-400">★</span>
                    <span className="text-sm text-gray-600 ml-1">{course.rating}</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500">by {course.instructor}</span>
                  <span className="text-sm text-gray-500">{course.students} students</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600">${course.price}</span>
                  <Link 
                    to={`/courses/${course.id}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                  >
                    View Course
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
