import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const CourseDetail = () => {
  // eslint-disable-next-line no-unused-vars
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock course data
  const course = {
    id: 1,
    title: 'React Development',
    category: 'technology',
    price: 49.99,
    originalPrice: 99.99,
    rating: 4.8,
    students: 1250,
    duration: '12 hours',
    level: 'Beginner',
    language: 'English',
    lastUpdated: 'December 2024',
    image: 'bg-gradient-to-r from-blue-400 to-blue-600',
    description: 'Learn React from scratch and build modern web applications. This comprehensive course covers everything you need to know to become a React developer.',
    whatYouWillLearn: [
      'Build modern React applications from scratch',
      'Understand React hooks and functional components',
      'Implement state management with Redux',
      'Create responsive and interactive user interfaces',
      'Deploy React applications to production',
      'Work with APIs and external data sources'
    ],
    requirements: [
      'Basic knowledge of HTML, CSS, and JavaScript',
      'A computer with internet connection',
      'No prior React experience required'
    ],
    curriculum: [
      {
        section: 'Getting Started',
        lectures: [
          { title: 'Introduction to React', duration: '15 min', type: 'video' },
          { title: 'Setting up your development environment', duration: '20 min', type: 'video' },
          { title: 'Your first React component', duration: '25 min', type: 'video' }
        ]
      },
      {
        section: 'React Fundamentals',
        lectures: [
          { title: 'Components and Props', duration: '30 min', type: 'video' },
          { title: 'State and Lifecycle', duration: '35 min', type: 'video' },
          { title: 'Handling Events', duration: '25 min', type: 'video' },
          { title: 'Conditional Rendering', duration: '20 min', type: 'video' }
        ]
      },
      {
        section: 'Advanced Concepts',
        lectures: [
          { title: 'Hooks Introduction', duration: '40 min', type: 'video' },
          { title: 'useState and useEffect', duration: '45 min', type: 'video' },
          { title: 'Custom Hooks', duration: '30 min', type: 'video' },
          { title: 'Context API', duration: '35 min', type: 'video' }
        ]
      }
    ],
    instructor: {
      name: 'John Doe',
      title: 'Senior React Developer',
      company: 'TechCorp',
      bio: 'John is a senior React developer with over 8 years of experience building web applications. He has worked with companies like Google, Facebook, and Netflix.',
      avatar: 'bg-gradient-to-r from-gray-400 to-gray-600',
      rating: 4.9,
      students: 50000,
      courses: 15
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'curriculum', label: 'Curriculum' },
    { id: 'instructor', label: 'Instructor' },
    { id: 'reviews', label: 'Reviews' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Course Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="md:flex">
            <div className="md:w-1/3">
              <div className={`h-64 md:h-full ${course.image}`}></div>
            </div>
            <div className="md:w-2/3 p-6">
              <div className="flex items-center mb-2">
                <span className="text-sm text-gray-500 capitalize">{course.category}</span>
                <span className="mx-2">•</span>
                <div className="flex items-center">
                  <span className="text-yellow-400">★</span>
                  <span className="text-sm text-gray-600 ml-1">{course.rating}</span>
                  <span className="text-sm text-gray-500 ml-1">({course.students} students)</span>
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
              <p className="text-gray-600 mb-6">{course.description}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <div className="text-sm text-gray-500">Duration</div>
                  <div className="font-semibold">{course.duration}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Level</div>
                  <div className="font-semibold">{course.level}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Language</div>
                  <div className="font-semibold">{course.language}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Updated</div>
                  <div className="font-semibold">{course.lastUpdated}</div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-3xl font-bold text-blue-600">${course.price}</span>
                  <span className="text-lg text-gray-500 line-through ml-2">${course.originalPrice}</span>
                </div>
                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-300">
                  Enroll Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div>
                <h3 className="text-xl font-semibold mb-4">What you'll learn</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {course.whatYouWillLearn.map((item, index) => (
                    <div key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <h3 className="text-xl font-semibold mb-4">Requirements</h3>
                <ul className="list-disc list-inside space-y-2 mb-8">
                  {course.requirements.map((req, index) => (
                    <li key={index} className="text-gray-600">{req}</li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'curriculum' && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Course Content</h3>
                <div className="space-y-4">
                  {course.curriculum.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="border border-gray-200 rounded-lg">
                      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                        <h4 className="font-semibold">{section.section}</h4>
                      </div>
                      <div className="divide-y divide-gray-200">
                        {section.lectures.map((lecture, lectureIndex) => (
                          <div key={lectureIndex} className="px-4 py-3 flex items-center justify-between">
                            <div className="flex items-center">
                              <span className="text-gray-400 mr-3">▶</span>
                              <span>{lecture.title}</span>
                            </div>
                            <span className="text-sm text-gray-500">{lecture.duration}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'instructor' && (
              <div>
                <div className="flex items-start space-x-4">
                  <div className={`w-20 h-20 rounded-full ${course.instructor.avatar} flex items-center justify-center text-white font-bold text-xl`}>
                    {course.instructor.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">{course.instructor.name}</h3>
                    <p className="text-gray-600">{course.instructor.title} at {course.instructor.company}</p>
                    <div className="flex items-center mt-2">
                      <span className="text-yellow-400">★</span>
                      <span className="text-sm text-gray-600 ml-1">{course.instructor.rating} Instructor Rating</span>
                      <span className="mx-2">•</span>
                      <span className="text-sm text-gray-600">{course.instructor.students.toLocaleString()} Students</span>
                      <span className="mx-2">•</span>
                      <span className="text-sm text-gray-600">{course.instructor.courses} Courses</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <h4 className="font-semibold mb-2">About the instructor</h4>
                  <p className="text-gray-600">{course.instructor.bio}</p>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <div className="text-center py-8">
                  <div className="text-gray-400 text-4xl mb-4">⭐</div>
                  <h3 className="text-xl font-semibold mb-2">No reviews yet</h3>
                  <p className="text-gray-600">Be the first to review this course!</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
