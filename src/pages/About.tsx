import React from 'react';
import { Users, Target, Award, Heart } from 'lucide-react';

export function About() {
  const teamMembers = [
    {
      name: 'Abdul Hafiz',
      role: 'Project Lead & Backend Developer',
      description: 'Experienced in system architecture and database design',
    },
    {
      name: 'Rizky Andika Putra',
      role: 'Frontend Developer & UI/UX Designer',
      description: 'Passionate about creating beautiful and functional user interfaces',
    },
    {
      name: 'Falisthati Unus Rangkuti',
      role: 'Full Stack Developer & Quality Assurance',
      description: 'Ensures code quality and seamless user experience',
    },
  ];

  const values = [
    {
      icon: <Target className="h-8 w-8 text-blue-600" />,
      title: 'Ease of Use',
      description: 'Making it simple for users to find and connect with trusted service providers',
    },
    {
      icon: <Award className="h-8 w-8 text-green-600" />,
      title: 'Speed',
      description: 'Quick connections and fast response times for urgent service needs',
    },
    {
      icon: <Heart className="h-8 w-8 text-red-600" />,
      title: 'Trust',
      description: 'Building confidence through verified providers and real customer reviews',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About HelpIN</h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Connecting communities with trusted service providers through technology
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                HelpIN was created with a simple yet powerful mission: to bridge the gap between 
                service seekers and trusted service providers. We believe that finding reliable 
                help shouldn't be complicated or time-consuming.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mt-4">
                Our platform serves as a centralized, accessible, and reliable directory for 
                essential services, making it easier for communities to connect and support 
                each other.
              </p>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                We envision a world where finding trusted services is as easy as a few clicks. 
                HelpIN aims to become the go-to platform for service discovery, fostering 
                stronger communities through reliable connections.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mt-4">
                By leveraging technology and user feedback, we're building a ecosystem where 
                quality service providers can thrive and customers can find exactly what they need, 
                when they need it.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600">The principles that guide everything we do</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600">The passionate individuals behind HelpIN</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-lg text-center hover:shadow-lg transition-shadow">
                <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="text-blue-600" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-4">{member.role}</p>
                <p className="text-gray-600">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
          </div>
          
          <div className="prose prose-lg mx-auto text-gray-700">
            <p className="text-center text-lg leading-relaxed">
              HelpIN was born from a simple observation: finding reliable service providers 
              shouldn't be a hassle. Our team noticed that people often struggled to find 
              trustworthy professionals for their needs, while skilled service providers 
              had difficulty reaching potential customers.
            </p>
            
            <p className="text-center text-lg leading-relaxed mt-6">
              We set out to create a platform that would solve both problems - giving users 
              easy access to verified service providers while helping businesses grow their 
              customer base. Today, HelpIN continues to evolve, always putting user experience 
              and trust at the forefront of everything we do.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join Our Community?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Whether you're looking for services or want to offer yours, HelpIN is here to help
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/search"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Find Services
            </a>
            <a
              href="/register"
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Become a Provider
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}