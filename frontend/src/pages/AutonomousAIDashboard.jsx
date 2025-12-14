import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AILearningEngine from '../components/AILearningEngine'

const AutonomousAIDashboard = () => {
  const navigate = useNavigate()
  const [aiStatus, setAiStatus] = useState({
    isActive: true,
    autonomyLevel: 85,
    learningMode: 'continuous',
    lastUpdate: new Date().toLocaleTimeString()
  })

  const [aiInsights, setAiInsights] = useState([])
  const [realTimeThoughts, setRealTimeThoughts] = useState([])

  useEffect(() => {
    // Simulate autonomous AI thinking
    const thinkingInterval = setInterval(() => {
      const thoughts = [
        "Analyzing user interaction patterns across the platform...",
        "Identifying emotional trends in recent conversations...",
        "Optimizing response algorithms based on feedback...",
        "Learning new coping strategies from successful interventions...",
        "Detecting potential crisis situations for early intervention...",
        "Adapting personality traits based on user preferences...",
        "Processing natural language patterns for better understanding...",
        "Updating knowledge base with latest psychological research...",
        "Correlating mood data with environmental factors...",
        "Enhancing empathy algorithms through machine learning..."
      ]

      const newThought = {
        id: Date.now(),
        text: thoughts[Math.floor(Math.random() * thoughts.length)],
        timestamp: new Date().toLocaleTimeString(),
        type: Math.random() > 0.5 ? 'analysis' : 'learning'
      }

      setRealTimeThoughts(prev => [newThought, ...prev.slice(0, 9)])
    }, 3000)

    // Generate AI insights
    const insightsInterval = setInterval(() => {
      const insights = [
        {
          type: 'pattern',
          title: 'User Engagement Pattern Detected',
          description: 'Users show 73% higher engagement with empathetic responses during evening hours.',
          confidence: 92,
          action: 'Adjusting response tone for time-based optimization'
        },
        {
          type: 'learning',
          title: 'New Coping Strategy Learned',
          description: 'Breathing exercises combined with visualization show 85% success rate.',
          confidence: 88,
          action: 'Integrating into anxiety response protocols'
        },
        {
          type: 'prediction',
          title: 'Crisis Prevention Opportunity',
          description: 'Early warning signs detected in 3 user conversations.',
          confidence: 95,
          action: 'Proactive intervention protocols activated'
        }
      ]

      if (Math.random() > 0.7) { // 30% chance to generate new insight
        const newInsight = {
          ...insights[Math.floor(Math.random() * insights.length)],
          id: Date.now(),
          timestamp: new Date().toLocaleTimeString()
        }
        setAiInsights(prev => [newInsight, ...prev.slice(0, 4)])
      }
    }, 8000)

    return () => {
      clearInterval(thinkingInterval)
      clearInterval(insightsInterval)
    }
  }, [])

  const aiCapabilities = [
    {
      name: 'Autonomous Learning',
      description: 'Continuously learns from interactions without human intervention',
      status: 'active',
      efficiency: 94
    },
    {
      name: 'Pattern Recognition',
      description: 'Identifies complex behavioral and emotional patterns',
      status: 'active',
      efficiency: 89
    },
    {
      name: 'Predictive Analysis',
      description: 'Predicts user needs and potential crisis situations',
      status: 'active',
      efficiency: 87
    },
    {
      name: 'Adaptive Responses',
      description: 'Modifies communication style based on user preferences',
      status: 'active',
      efficiency: 92
    },
    {
      name: 'Emotional Intelligence',
      description: 'Understands and responds to emotional nuances',
      status: 'active',
      efficiency: 91
    },
    {
      name: 'Memory Consolidation',
      description: 'Organizes and retains important information long-term',
      status: 'active',
      efficiency: 88
    }
  ]

  return (
    <div className='bg-black min-h-screen text-white'>
      <div className='container mx-auto px-4 py-8'>
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold text-primary mb-4'>Autonomous AI Dashboard</h1>
          <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
            Monitor and interact with NeuraWell's autonomous AI system. This AI thinks, learns, 
            and evolves independently to provide better mental health support.
          </p>
        </div>

        <div className='max-w-7xl mx-auto'>
          {/* AI Status Overview */}
          <div className='grid md:grid-cols-4 gap-6 mb-8'>
            <div className='bg-gray-900 border border-gray-700 rounded-lg p-6 text-center'>
              <div className={`w-4 h-4 rounded-full mx-auto mb-2 ${
                aiStatus.isActive ? 'bg-green-400 animate-pulse' : 'bg-red-400'
              }`}></div>
              <div className='text-lg font-bold text-white'>
                {aiStatus.isActive ? 'ACTIVE' : 'INACTIVE'}
              </div>
              <div className='text-sm text-gray-400'>AI Status</div>
            </div>
            
            <div className='bg-gray-900 border border-gray-700 rounded-lg p-6 text-center'>
              <div className='text-2xl font-bold text-primary'>{aiStatus.autonomyLevel}%</div>
              <div className='text-sm text-gray-400'>Autonomy Level</div>
            </div>
            
            <div className='bg-gray-900 border border-gray-700 rounded-lg p-6 text-center'>
              <div className='text-lg font-bold text-green-400 capitalize'>{aiStatus.learningMode}</div>
              <div className='text-sm text-gray-400'>Learning Mode</div>
            </div>
            
            <div className='bg-gray-900 border border-gray-700 rounded-lg p-6 text-center'>
              <div className='text-lg font-bold text-blue-400'>{aiStatus.lastUpdate}</div>
              <div className='text-sm text-gray-400'>Last Update</div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className='grid lg:grid-cols-3 gap-8 mb-8'>
            {/* Real-time AI Thoughts */}
            <div className='lg:col-span-1'>
              <div className='bg-gray-900 border border-gray-700 rounded-lg p-6'>
                <h2 className='text-xl font-bold mb-4 text-purple-400'>Real-time AI Thoughts</h2>
                <div className='space-y-3 max-h-80 overflow-y-auto'>
                  {realTimeThoughts.map((thought) => (
                    <div key={thought.id} className='bg-gray-800 rounded-lg p-3 border-l-4 border-purple-500'>
                      <div className='text-sm text-gray-300'>{thought.text}</div>
                      <div className='flex justify-between items-center mt-2'>
                        <span className={`text-xs px-2 py-1 rounded ${
                          thought.type === 'analysis' ? 'bg-blue-600' : 'bg-green-600'
                        }`}>
                          {thought.type}
                        </span>
                        <span className='text-xs text-gray-500'>{thought.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* AI Capabilities */}
            <div className='lg:col-span-2'>
              <div className='bg-gray-900 border border-gray-700 rounded-lg p-6'>
                <h2 className='text-xl font-bold mb-4 text-green-400'>AI Capabilities Status</h2>
                <div className='grid md:grid-cols-2 gap-4'>
                  {aiCapabilities.map((capability, index) => (
                    <div key={index} className='bg-gray-800 rounded-lg p-4'>
                      <div className='flex justify-between items-start mb-2'>
                        <h3 className='font-semibold text-white'>{capability.name}</h3>
                        <span className={`px-2 py-1 rounded text-xs ${
                          capability.status === 'active' ? 'bg-green-600' : 'bg-red-600'
                        }`}>
                          {capability.status}
                        </span>
                      </div>
                      <p className='text-sm text-gray-400 mb-3'>{capability.description}</p>
                      <div className='w-full bg-gray-700 rounded-full h-2'>
                        <div 
                          className='bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full'
                          style={{ width: `${capability.efficiency}%` }}
                        ></div>
                      </div>
                      <div className='text-xs text-gray-400 mt-1'>
                        Efficiency: {capability.efficiency}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* AI Learning Engine */}
          <div className='mb-8'>
            <AILearningEngine />
          </div>

          {/* AI Insights */}
          <div className='bg-gray-900 border border-gray-700 rounded-lg p-6 mb-8'>
            <h2 className='text-xl font-bold mb-4 text-yellow-400'>Recent AI Insights</h2>
            {aiInsights.length === 0 ? (
              <p className='text-gray-400 text-center py-8'>
                AI is analyzing data... Insights will appear as the system learns.
              </p>
            ) : (
              <div className='space-y-4'>
                {aiInsights.map((insight) => (
                  <div key={insight.id} className='bg-gray-800 rounded-lg p-4 border-l-4 border-yellow-500'>
                    <div className='flex justify-between items-start mb-2'>
                      <h3 className='font-semibold text-white'>{insight.title}</h3>
                      <div className='flex items-center space-x-2'>
                        <span className={`px-2 py-1 rounded text-xs ${
                          insight.type === 'pattern' ? 'bg-blue-600' :
                          insight.type === 'learning' ? 'bg-green-600' : 'bg-purple-600'
                        }`}>
                          {insight.type}
                        </span>
                        <span className='text-xs text-gray-400'>{insight.confidence}% confidence</span>
                      </div>
                    </div>
                    <p className='text-gray-300 mb-2'>{insight.description}</p>
                    <p className='text-sm text-yellow-400'>Action: {insight.action}</p>
                    <p className='text-xs text-gray-500 mt-2'>{insight.timestamp}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* AI Interaction Options */}
          <div className='grid md:grid-cols-3 gap-6'>
            <button
              onClick={() => navigate('/advanced-ai')}
              className='bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white p-6 rounded-lg text-left transition-all transform hover:scale-105'
            >
              <div className='text-2xl mb-2'>🧠</div>
              <h3 className='text-lg font-semibold mb-2'>Advanced AI Chat</h3>
              <p className='text-sm opacity-90'>
                Interact with the autonomous learning AI agent
              </p>
            </button>

            <button
              onClick={() => navigate('/ai-therapist')}
              className='bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white p-6 rounded-lg text-left transition-all transform hover:scale-105'
            >
              <div className='text-2xl mb-2'>💬</div>
              <h3 className='text-lg font-semibold mb-2'>AI Therapist</h3>
              <p className='text-sm opacity-90'>
                Get psychological support from the AI therapist
              </p>
            </button>

            <button
              onClick={() => navigate('/mental-health-assessment')}
              className='bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white p-6 rounded-lg text-left transition-all transform hover:scale-105'
            >
              <div className='text-2xl mb-2'>📊</div>
              <h3 className='text-lg font-semibold mb-2'>AI Assessment</h3>
              <p className='text-sm opacity-90'>
                Take AI-powered mental health assessments
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AutonomousAIDashboard