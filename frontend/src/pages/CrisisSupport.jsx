import React, { useState } from 'react'

const CrisisSupport = () => {
  const [showEmergencyContacts, setShowEmergencyContacts] = useState(false)

  const crisisResources = [
    {
      name: "National Suicide Prevention Lifeline",
      number: "988",
      description: "24/7 free and confidential support for people in distress",
      type: "call"
    },
    {
      name: "Crisis Text Line",
      number: "Text HOME to 741741",
      description: "24/7 crisis support via text message",
      type: "text"
    },
    {
      name: "National Domestic Violence Hotline",
      number: "1-800-799-7233",
      description: "24/7 support for domestic violence situations",
      type: "call"
    },
    {
      name: "SAMHSA National Helpline",
      number: "1-800-662-4357",
      description: "Treatment referral and information service",
      type: "call"
    },
    {
      name: "Emergency Services",
      number: "911",
      description: "For immediate life-threatening emergencies",
      type: "emergency"
    }
  ]

  const copingStrategies = [
    {
      title: "Grounding Technique (5-4-3-2-1)",
      steps: [
        "5 things you can see",
        "4 things you can touch",
        "3 things you can hear",
        "2 things you can smell",
        "1 thing you can taste"
      ]
    },
    {
      title: "Box Breathing",
      steps: [
        "Breathe in for 4 counts",
        "Hold for 4 counts",
        "Breathe out for 4 counts",
        "Hold for 4 counts",
        "Repeat 4-6 times"
      ]
    },
    {
      title: "STOP Technique",
      steps: [
        "Stop what you're doing",
        "Take a breath",
        "Observe your thoughts and feelings",
        "Proceed with awareness"
      ]
    }
  ]

  const warningSigns = [
    "Thoughts of suicide or self-harm",
    "Feeling hopeless or trapped",
    "Extreme mood swings",
    "Increased use of alcohol or drugs",
    "Withdrawing from friends and activities",
    "Giving away prized possessions",
    "Talking about death or suicide",
    "Feeling like a burden to others"
  ]

  return (
    <div className='bg-black min-h-screen text-white'>
      <div className='container mx-auto px-4 py-8'>
        {/* Emergency Header */}
        <div className='text-center mb-8'>
          <div className='bg-red-900 border border-red-600 rounded-lg p-6 mb-6'>
            <h1 className='text-4xl font-bold text-red-100 mb-4'>🆘 Crisis Support</h1>
            <p className='text-xl text-red-200 mb-4'>
              If you're having thoughts of self-harm or suicide, you're not alone. Help is available right now.
            </p>
            <div className='text-center space-y-2'>
              <div className='text-3xl font-bold text-white'>Call 988</div>
              <div className='text-red-200'>National Suicide Prevention Lifeline</div>
            </div>
          </div>
        </div>

        <div className='max-w-6xl mx-auto'>
          {/* Immediate Actions */}
          <div className='grid lg:grid-cols-2 gap-8 mb-8'>
            <div className='bg-gray-900 border border-gray-700 rounded-lg p-6'>
              <h2 className='text-2xl font-semibold mb-4 text-red-400'>Immediate Help</h2>
              <div className='space-y-4'>
                {crisisResources.map((resource, index) => (
                  <div 
                    key={index}
                    className={`p-4 rounded-lg border ${
                      resource.type === 'emergency' 
                        ? 'border-red-600 bg-red-900 bg-opacity-50' 
                        : 'border-gray-600 bg-gray-800'
                    }`}
                  >
                    <div className='flex justify-between items-start mb-2'>
                      <h3 className='font-semibold text-white'>{resource.name}</h3>
                      <span className={`px-2 py-1 rounded text-xs ${
                        resource.type === 'call' ? 'bg-blue-600' :
                        resource.type === 'text' ? 'bg-green-600' :
                        'bg-red-600'
                      }`}>
                        {resource.type.toUpperCase()}
                      </span>
                    </div>
                    <div className='text-xl font-bold text-primary mb-2'>{resource.number}</div>
                    <p className='text-sm text-gray-300'>{resource.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Coping Strategies */}
            <div className='bg-gray-900 border border-gray-700 rounded-lg p-6'>
              <h2 className='text-2xl font-semibold mb-4 text-blue-400'>Quick Coping Strategies</h2>
              <div className='space-y-4'>
                {copingStrategies.map((strategy, index) => (
                  <div key={index} className='bg-gray-800 rounded-lg p-4'>
                    <h3 className='font-semibold mb-3 text-white'>{strategy.title}</h3>
                    <ol className='text-sm text-gray-300 space-y-1'>
                      {strategy.steps.map((step, stepIndex) => (
                        <li key={stepIndex} className='flex items-start'>
                          <span className='text-primary mr-2'>{stepIndex + 1}.</span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Warning Signs */}
          <div className='bg-gray-900 border border-gray-700 rounded-lg p-6 mb-8'>
            <h2 className='text-2xl font-semibold mb-4 text-yellow-400'>Warning Signs to Watch For</h2>
            <p className='text-gray-300 mb-4'>
              If you or someone you know is experiencing these signs, it's important to seek help immediately:
            </p>
            <div className='grid md:grid-cols-2 gap-4'>
              {warningSigns.map((sign, index) => (
                <div key={index} className='flex items-start space-x-2'>
                  <span className='text-yellow-400 mt-1'>⚠️</span>
                  <span className='text-gray-300'>{sign}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Safety Planning */}
          <div className='bg-gray-900 border border-gray-700 rounded-lg p-6 mb-8'>
            <h2 className='text-2xl font-semibold mb-4 text-green-400'>Create a Safety Plan</h2>
            <div className='grid md:grid-cols-2 gap-6'>
              <div>
                <h3 className='font-semibold mb-3'>Personal Safety Steps:</h3>
                <ul className='text-sm text-gray-300 space-y-2'>
                  <li>• Identify your warning signs</li>
                  <li>• List coping strategies that help</li>
                  <li>• Remove or secure means of self-harm</li>
                  <li>• Identify supportive people to contact</li>
                  <li>• Know professional resources</li>
                  <li>• Make your environment safe</li>
                </ul>
              </div>
              <div>
                <h3 className='font-semibold mb-3'>Emergency Contacts:</h3>
                <div className='bg-gray-800 rounded-lg p-4'>
                  <p className='text-sm text-gray-400 mb-2'>Keep these numbers easily accessible:</p>
                  <ul className='text-sm text-gray-300 space-y-1'>
                    <li>• Trusted friend or family member</li>
                    <li>• Mental health professional</li>
                    <li>• Crisis hotline: 988</li>
                    <li>• Emergency services: 911</li>
                    <li>• Local emergency room</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Support for Others */}
          <div className='bg-gray-900 border border-gray-700 rounded-lg p-6 mb-8'>
            <h2 className='text-2xl font-semibold mb-4 text-purple-400'>How to Help Someone in Crisis</h2>
            <div className='grid md:grid-cols-2 gap-6'>
              <div>
                <h3 className='font-semibold mb-3 text-green-400'>Do:</h3>
                <ul className='text-sm text-gray-300 space-y-2'>
                  <li>• Listen without judgment</li>
                  <li>• Take their feelings seriously</li>
                  <li>• Ask directly about suicide</li>
                  <li>• Help them connect with professional help</li>
                  <li>• Stay with them if possible</li>
                  <li>• Remove means of self-harm</li>
                  <li>• Follow up regularly</li>
                </ul>
              </div>
              <div>
                <h3 className='font-semibold mb-3 text-red-400'>Don't:</h3>
                <ul className='text-sm text-gray-300 space-y-2'>
                  <li>• Promise to keep it secret</li>
                  <li>• Leave them alone</li>
                  <li>• Argue about whether suicide is right or wrong</li>
                  <li>• Act shocked or judgmental</li>
                  <li>• Offer simple solutions</li>
                  <li>• Minimize their problems</li>
                  <li>• Give up if they refuse help initially</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Additional Resources */}
          <div className='bg-gray-900 border border-gray-700 rounded-lg p-6'>
            <h2 className='text-2xl font-semibold mb-4'>Additional Resources</h2>
            <div className='grid md:grid-cols-3 gap-4'>
              <div className='bg-gray-800 rounded-lg p-4'>
                <h3 className='font-semibold mb-2 text-blue-400'>Online Support</h3>
                <ul className='text-sm text-gray-300 space-y-1'>
                  <li>• Crisis Chat (suicidepreventionlifeline.org)</li>
                  <li>• 7 Cups (free emotional support)</li>
                  <li>• NAMI Support Groups</li>
                </ul>
              </div>
              <div className='bg-gray-800 rounded-lg p-4'>
                <h3 className='font-semibold mb-2 text-green-400'>Apps</h3>
                <ul className='text-sm text-gray-300 space-y-1'>
                  <li>• MY3 (suicide prevention app)</li>
                  <li>• Calm (meditation and relaxation)</li>
                  <li>• Headspace (mindfulness)</li>
                </ul>
              </div>
              <div className='bg-gray-800 rounded-lg p-4'>
                <h3 className='font-semibold mb-2 text-purple-400'>Professional Help</h3>
                <ul className='text-sm text-gray-300 space-y-1'>
                  <li>• Psychology Today (find therapists)</li>
                  <li>• SAMHSA Treatment Locator</li>
                  <li>• Local community mental health centers</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className='text-center mt-8 p-6 bg-primary bg-opacity-20 border border-primary rounded-lg'>
            <h2 className='text-2xl font-bold mb-4'>Remember: You Are Not Alone</h2>
            <p className='text-gray-300 mb-4'>
              Crisis situations are temporary. With proper support and treatment, people can and do recover.
            </p>
            <div className='space-x-4'>
              <a 
                href="tel:988" 
                className='bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-block'
              >
                Call 988 Now
              </a>
              <button 
                onClick={() => window.open('https://suicidepreventionlifeline.org/chat/', '_blank')}
                className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors'
              >
                Crisis Chat
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CrisisSupport