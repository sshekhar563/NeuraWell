import React from 'react'
import { useNavigate } from 'react-router-dom'

const MentalHealthDashboard = () => {
  const navigate = useNavigate()

  const features = [
    {
      id: 'advanced-ai',
      title: 'Advanced AI Agent',
      description: 'Interact with our autonomous learning AI that thinks and adapts on its own',
      icon: '🧠',
      color: 'bg-gradient-to-r from-purple-600 to-blue-600',
      route: '/advanced-ai',
      featured: true
    },
    {
      id: 'autonomous-ai',
      title: 'AI Dashboard',
      description: 'Monitor the autonomous AI system and view real-time learning insights',
      icon: '⚡',
      color: 'bg-gradient-to-r from-green-600 to-teal-600',
      route: '/autonomous-ai',
      featured: true
    },
    {
      id: 'ai-therapist',
      title: 'AI Therapist',
      description: 'Chat with our AI-powered psychological support companion available 24/7',
      icon: '🤖',
      color: 'bg-blue-600',
      route: '/ai-therapist'
    },
    {
      id: 'assessment',
      title: 'Mental Health Assessment',
      description: 'Take confidential assessments for anxiety, depression, and stress levels',
      icon: '📋',
      color: 'bg-purple-600',
      route: '/mental-health-assessment'
    },
    {
      id: 'mood-tracker',
      title: 'Mood Tracker',
      description: 'Track your daily mood and activities to identify patterns and triggers',
      icon: '📊',
      color: 'bg-green-600',
      route: '/mood-tracker'
    },
    {
      id: 'crisis-support',
      title: 'Crisis Support',
      description: 'Immediate access to crisis resources and emergency mental health support',
      icon: '🆘',
      color: 'bg-red-600',
      route: '/crisis-support'
    },
    {
      id: 'resources',
      title: 'Mental Health Resources',
      description: 'Access educational materials, coping strategies, and self-help tools',
      icon: '📚',
      color: 'bg-yellow-600',
      route: '/mental-health-resources'
    },
    {
      id: 'professional-help',
      title: 'Find Professional Help',
      description: 'Connect with licensed therapists and mental health professionals',
      icon: '👨‍⚕️',
      color: 'bg-indigo-600',
      route: '/doctors/Psychiatrist'
    }
  ]

  const quickStats = [
    { label: 'AI Sessions', value: '24/7', icon: '💬' },
    { label: 'Users Helped', value: '10K+', icon: '👥' },
    { label: 'Success Rate', value: '94%', icon: '✅' },
    { label: 'Response Time', value: '<1min', icon: '⚡' }
  ]

  return (
    <div className='bg-black min-h-screen text-white'>
      <div className='container mx-auto px-4 py-8'>
        {/* Header */}
        <div className='text-center mb-12'>
          <h1 className='text-5xl font-bold text-primary mb-4'>
            Mental Health Support
          </h1>
          <p className='text-xl text-gray-300 max-w-3xl mx-auto mb-8'>
            Your comprehensive mental health companion powered by AI. 
            Get support, track your wellbeing, and access professional resources all in one place.
          </p>
          
          {/* Quick Stats */}
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto'>
            {quickStats.map((stat, index) => (
              <div key={index} className='bg-gray-900 border border-gray-700 rounded-lg p-4'>
                <div className='text-2xl mb-1'>{stat.icon}</div>
                <div className='text-lg font-bold text-primary'>{stat.value}</div>
                <div className='text-xs text-gray-400'>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured AI Section */}
        <div className='max-w-6xl mx-auto mb-12'>
          <h2 className='text-3xl font-bold text-center mb-8 text-primary'>🚀 Advanced AI Features</h2>
          <div className='grid md:grid-cols-2 gap-6 mb-8'>
            {features.filter(f => f.featured).map((feature) => (
              <div
                key={feature.id}
                onClick={() => navigate(feature.route)}
                className='bg-gray-900 border-2 border-primary rounded-lg p-8 cursor-pointer hover:border-blue-400 transition-all duration-300 hover:transform hover:scale-105 relative overflow-hidden'
              >
                <div className='absolute top-0 right-0 bg-primary text-white px-3 py-1 text-xs font-bold rounded-bl-lg'>
                  NEW
                </div>
                <div className={`w-20 h-20 ${feature.color} rounded-full flex items-center justify-center text-3xl mb-4`}>
                  {feature.icon}
                </div>
                <h3 className='text-2xl font-semibold mb-3 text-white'>{feature.title}</h3>
                <p className='text-gray-300 mb-6'>{feature.description}</p>
                <div className='text-primary font-medium flex items-center text-lg'>
                  Experience Advanced AI 
                  <span className='ml-2'>→</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Features Grid */}
        <div className='max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12'>
          {features.filter(f => !f.featured).map((feature) => (
            <div
              key={feature.id}
              onClick={() => navigate(feature.route)}
              className='bg-gray-900 border border-gray-700 rounded-lg p-6 cursor-pointer hover:border-primary transition-all duration-300 hover:transform hover:scale-105'
            >
              <div className={`w-16 h-16 ${feature.color} rounded-full flex items-center justify-center text-2xl mb-4`}>
                {feature.icon}
              </div>
              <h3 className='text-xl font-semibold mb-3'>{feature.title}</h3>
              <p className='text-gray-400 text-sm mb-4'>{feature.description}</p>
              <div className='text-primary font-medium flex items-center'>
                Get Started 
                <span className='ml-2'>→</span>
              </div>
            </div>
          ))}
        </div>

        {/* Emergency Banner */}
        <div className='max-w-4xl mx-auto bg-red-900 border border-red-600 rounded-lg p-6 mb-8'>
          <div className='flex items-center justify-between'>
            <div>
              <h3 className='text-xl font-semibold text-red-100 mb-2'>
                🆘 Need Immediate Help?
              </h3>
              <p className='text-red-200 text-sm'>
                If you're experiencing a mental health crisis or having thoughts of self-harm, 
                please reach out for immediate professional help.
              </p>
            </div>
            <button
              onClick={() => navigate('/crisis-support')}
              className='bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap ml-4'
            >
              Crisis Support
            </button>
          </div>
        </div>

        {/* How It Works */}
        <div className='max-w-4xl mx-auto mb-12'>
          <h2 className='text-3xl font-bold text-center mb-8'>How NeuraWell Supports You</h2>
          <div className='grid md:grid-cols-3 gap-8'>
            <div className='text-center'>
              <div className='w-20 h-20 bg-primary rounded-full flex items-center justify-center text-3xl mx-auto mb-4'>
                1️⃣
              </div>
              <h3 className='text-xl font-semibold mb-2'>Assess & Understand</h3>
              <p className='text-gray-400'>
                Take confidential assessments to understand your mental health status and identify areas for support.
              </p>
            </div>
            <div className='text-center'>
              <div className='w-20 h-20 bg-primary rounded-full flex items-center justify-center text-3xl mx-auto mb-4'>
                2️⃣
              </div>
              <h3 className='text-xl font-semibold mb-2'>Get AI Support</h3>
              <p className='text-gray-400'>
                Chat with our AI therapist for immediate support, coping strategies, and emotional guidance.
              </p>
            </div>
            <div className='text-center'>
              <div className='w-20 h-20 bg-primary rounded-full flex items-center justify-center text-3xl mx-auto mb-4'>
                3️⃣
              </div>
              <h3 className='text-xl font-semibold mb-2'>Track & Improve</h3>
              <p className='text-gray-400'>
                Monitor your mood and progress over time, and connect with professional help when needed.
              </p>
            </div>
          </div>
        </div>

        {/* Features Highlight */}
        <div className='max-w-4xl mx-auto bg-gray-900 border border-gray-700 rounded-lg p-8'>
          <h2 className='text-2xl font-bold text-center mb-6'>Why Choose NeuraWell AI?</h2>
          <div className='grid md:grid-cols-2 gap-6'>
            <div className='space-y-4'>
              <div className='flex items-start space-x-3'>
                <div className='text-green-400 text-xl'>✅</div>
                <div>
                  <h4 className='font-semibold'>24/7 Availability</h4>
                  <p className='text-sm text-gray-400'>Get support whenever you need it, day or night</p>
                </div>
              </div>
              <div className='flex items-start space-x-3'>
                <div className='text-green-400 text-xl'>✅</div>
                <div>
                  <h4 className='font-semibold'>Completely Confidential</h4>
                  <p className='text-sm text-gray-400'>Your conversations are private and secure</p>
                </div>
              </div>
              <div className='flex items-start space-x-3'>
                <div className='text-green-400 text-xl'>✅</div>
                <div>
                  <h4 className='font-semibold'>Evidence-Based</h4>
                  <p className='text-sm text-gray-400'>Built on proven psychological principles and techniques</p>
                </div>
              </div>
            </div>
            <div className='space-y-4'>
              <div className='flex items-start space-x-3'>
                <div className='text-green-400 text-xl'>✅</div>
                <div>
                  <h4 className='font-semibold'>Personalized Support</h4>
                  <p className='text-sm text-gray-400'>Tailored responses based on your specific needs</p>
                </div>
              </div>
              <div className='flex items-start space-x-3'>
                <div className='text-green-400 text-xl'>✅</div>
                <div>
                  <h4 className='font-semibold'>Professional Integration</h4>
                  <p className='text-sm text-gray-400'>Seamlessly connect with licensed therapists when needed</p>
                </div>
              </div>
              <div className='flex items-start space-x-3'>
                <div className='text-green-400 text-xl'>✅</div>
                <div>
                  <h4 className='font-semibold'>Progress Tracking</h4>
                  <p className='text-sm text-gray-400'>Monitor your mental health journey over time</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className='text-center mt-12'>
          <h2 className='text-2xl font-bold mb-4'>Ready to Start Your Mental Health Journey?</h2>
          <p className='text-gray-400 mb-6'>
            Take the first step towards better mental health with NeuraWell AI
          </p>
          <div className='space-x-4'>
            <button
              onClick={() => navigate('/ai-therapist')}
              className='bg-primary hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium transition-colors'
            >
              Start AI Chat
            </button>
            <button
              onClick={() => navigate('/mental-health-assessment')}
              className='bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-medium transition-colors'
            >
              Take Assessment
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MentalHealthDashboard