import React from 'react'

const MentalHealthResources = () => {
  const resources = [
    {
      category: "Educational Materials",
      items: [
        {
          title: "Understanding Anxiety",
          description: "Learn about anxiety disorders, symptoms, and management techniques",
          type: "Article",
          link: "#"
        },
        {
          title: "Depression: Signs and Support",
          description: "Comprehensive guide to recognizing and addressing depression",
          type: "Guide",
          link: "#"
        },
        {
          title: "Stress Management Techniques",
          description: "Practical strategies for managing daily stress and pressure",
          type: "Video",
          link: "#"
        }
      ]
    },
    {
      category: "Self-Help Tools",
      items: [
        {
          title: "Mindfulness Meditation Guide",
          description: "Step-by-step instructions for mindfulness practice",
          type: "Interactive",
          link: "#"
        },
        {
          title: "Cognitive Behavioral Therapy Worksheets",
          description: "Downloadable CBT exercises and thought tracking sheets",
          type: "Worksheet",
          link: "#"
        },
        {
          title: "Sleep Hygiene Checklist",
          description: "Improve your sleep quality with evidence-based tips",
          type: "Checklist",
          link: "#"
        }
      ]
    },
    {
      category: "Crisis Resources",
      items: [
        {
          title: "National Suicide Prevention Lifeline",
          description: "24/7 crisis support - Call 988",
          type: "Hotline",
          link: "tel:988"
        },
        {
          title: "Crisis Text Line",
          description: "Text HOME to 741741 for crisis support",
          type: "Text",
          link: "sms:741741"
        },
        {
          title: "Emergency Mental Health Services",
          description: "Find local emergency mental health services",
          type: "Directory",
          link: "#"
        }
      ]
    }
  ]

  const copingStrategies = [
    {
      title: "Deep Breathing",
      description: "4-7-8 breathing technique for immediate calm",
      steps: ["Inhale for 4 counts", "Hold for 7 counts", "Exhale for 8 counts", "Repeat 3-4 times"]
    },
    {
      title: "Progressive Muscle Relaxation",
      description: "Systematic tension and release of muscle groups",
      steps: ["Start with toes", "Tense for 5 seconds", "Release and relax", "Move up through body"]
    },
    {
      title: "Grounding Exercise",
      description: "5-4-3-2-1 technique to stay present",
      steps: ["5 things you see", "4 things you touch", "3 things you hear", "2 things you smell", "1 thing you taste"]
    }
  ]

  return (
    <div className='bg-black min-h-screen text-white'>
      <div className='container mx-auto px-4 py-8'>
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-bold text-primary mb-4'>Mental Health Resources</h1>
          <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
            Access educational materials, self-help tools, and professional resources to support your mental health journey.
          </p>
        </div>

        <div className='max-w-6xl mx-auto'>
          {/* Quick Coping Strategies */}
          <div className='mb-12'>
            <h2 className='text-3xl font-bold text-center mb-8'>Quick Coping Strategies</h2>
            <div className='grid md:grid-cols-3 gap-6'>
              {copingStrategies.map((strategy, index) => (
                <div key={index} className='bg-gray-900 border border-gray-700 rounded-lg p-6'>
                  <h3 className='text-xl font-semibold mb-3 text-primary'>{strategy.title}</h3>
                  <p className='text-gray-400 mb-4'>{strategy.description}</p>
                  <ol className='space-y-2'>
                    {strategy.steps.map((step, stepIndex) => (
                      <li key={stepIndex} className='text-sm text-gray-300 flex items-start'>
                        <span className='text-primary mr-2'>{stepIndex + 1}.</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </div>

          {/* Resource Categories */}
          <div className='space-y-12'>
            {resources.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h2 className='text-3xl font-bold mb-6 text-center'>{category.category}</h2>
                <div className='grid md:grid-cols-3 gap-6'>
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className='bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-primary transition-colors'>
                      <div className='flex justify-between items-start mb-3'>
                        <h3 className='text-lg font-semibold text-white'>{item.title}</h3>
                        <span className={`px-2 py-1 rounded text-xs ${
                          item.type === 'Article' ? 'bg-blue-600' :
                          item.type === 'Guide' ? 'bg-green-600' :
                          item.type === 'Video' ? 'bg-purple-600' :
                          item.type === 'Interactive' ? 'bg-yellow-600' :
                          item.type === 'Worksheet' ? 'bg-indigo-600' :
                          item.type === 'Checklist' ? 'bg-pink-600' :
                          item.type === 'Hotline' ? 'bg-red-600' :
                          item.type === 'Text' ? 'bg-green-600' :
                          'bg-gray-600'
                        }`}>
                          {item.type}
                        </span>
                      </div>
                      <p className='text-gray-400 mb-4'>{item.description}</p>
                      <button 
                        onClick={() => item.link !== '#' && window.open(item.link, '_blank')}
                        className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                          item.link === '#' 
                            ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                            : 'bg-primary hover:bg-blue-600 text-white'
                        }`}
                        disabled={item.link === '#'}
                      >
                        {item.link === '#' ? 'Coming Soon' : 'Access Resource'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Mental Health Tips */}
          <div className='mt-12 bg-gray-900 border border-gray-700 rounded-lg p-8'>
            <h2 className='text-2xl font-bold text-center mb-6'>Daily Mental Health Tips</h2>
            <div className='grid md:grid-cols-2 gap-8'>
              <div>
                <h3 className='text-lg font-semibold mb-4 text-green-400'>Healthy Habits</h3>
                <ul className='space-y-2 text-gray-300'>
                  <li>• Maintain a regular sleep schedule (7-9 hours)</li>
                  <li>• Exercise regularly, even light walking helps</li>
                  <li>• Eat nutritious meals at regular times</li>
                  <li>• Stay hydrated throughout the day</li>
                  <li>• Limit alcohol and avoid drugs</li>
                  <li>• Practice mindfulness or meditation</li>
                  <li>• Spend time in nature when possible</li>
                </ul>
              </div>
              <div>
                <h3 className='text-lg font-semibold mb-4 text-blue-400'>Social Connection</h3>
                <ul className='space-y-2 text-gray-300'>
                  <li>• Stay connected with friends and family</li>
                  <li>• Join support groups or communities</li>
                  <li>• Volunteer for causes you care about</li>
                  <li>• Practice active listening with others</li>
                  <li>• Share your feelings with trusted people</li>
                  <li>• Seek professional help when needed</li>
                  <li>• Be patient and kind with yourself</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Professional Help Section */}
          <div className='mt-12 bg-primary bg-opacity-20 border border-primary rounded-lg p-8'>
            <h2 className='text-2xl font-bold text-center mb-6'>When to Seek Professional Help</h2>
            <div className='text-center mb-6'>
              <p className='text-gray-300 mb-4'>
                It's important to reach out to a mental health professional if you experience:
              </p>
              <div className='grid md:grid-cols-2 gap-4 text-left max-w-2xl mx-auto'>
                <ul className='space-y-2 text-gray-300'>
                  <li>• Persistent sadness or hopelessness</li>
                  <li>• Severe anxiety or panic attacks</li>
                  <li>• Thoughts of self-harm or suicide</li>
                  <li>• Substance abuse problems</li>
                </ul>
                <ul className='space-y-2 text-gray-300'>
                  <li>• Difficulty functioning in daily life</li>
                  <li>• Relationship or work problems</li>
                  <li>• Trauma or major life changes</li>
                  <li>• Sleep or appetite changes</li>
                </ul>
              </div>
            </div>
            <div className='text-center space-x-4'>
              <button 
                onClick={() => window.location.href = '/doctors/Psychiatrist'}
                className='bg-primary hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors'
              >
                Find a Therapist
              </button>
              <button 
                onClick={() => window.location.href = '/crisis-support'}
                className='bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors'
              >
                Crisis Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MentalHealthResources