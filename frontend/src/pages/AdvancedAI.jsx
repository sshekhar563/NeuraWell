import React, { useState, useRef, useEffect } from 'react'

const AdvancedAI = () => {
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [isThinking, setIsThinking] = useState(false)
  const [aiPersonality, setAiPersonality] = useState({
    empathy: 0.8,
    curiosity: 0.7,
    analytical: 0.9,
    creativity: 0.6,
    memory_strength: 0.8
  })
  const [aiMemory, setAiMemory] = useState({
    userPreferences: {},
    conversationHistory: [],
    learnedPatterns: {},
    emotionalContext: {},
    personalInsights: []
  })
  const [aiThoughts, setAiThoughts] = useState([])
  const [showThoughts, setShowThoughts] = useState(false)
  const messagesEndRef = useRef(null)

  // Initialize AI with welcome message
  useEffect(() => {
    const initMessage = {
      id: 1,
      text: "Hello! I'm NeuraWell Advanced AI - an autonomous learning agent. I can think, learn, and adapt based on our conversations. I'm constantly analyzing patterns, forming insights, and evolving my understanding. How can I assist you today?",
      sender: 'ai',
      timestamp: new Date().toLocaleTimeString(),
      confidence: 0.95,
      reasoning: "Initial greeting with capability explanation"
    }
    setMessages([initMessage])
    
    // Load saved AI memory
    const savedMemory = localStorage.getItem('neurawell-ai-memory')
    if (savedMemory) {
      setAiMemory(JSON.parse(savedMemory))
    }
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, aiThoughts])

  // Advanced AI thinking process
  const aiThinkingProcess = (userInput, context) => {
    const thoughts = []
    
    // 1. Input Analysis
    thoughts.push({
      type: 'analysis',
      content: `Analyzing input: "${userInput.substring(0, 50)}..." - Detecting emotional tone, keywords, and intent.`,
      timestamp: Date.now()
    })

    // 2. Memory Retrieval
    const relevantMemories = aiMemory.conversationHistory.filter(msg => 
      msg.text.toLowerCase().includes(userInput.toLowerCase().split(' ')[0])
    )
    if (relevantMemories.length > 0) {
      thoughts.push({
        type: 'memory',
        content: `Retrieving ${relevantMemories.length} relevant memories from past conversations.`,
        timestamp: Date.now() + 100
      })
    }

    // 3. Pattern Recognition
    const patterns = detectPatterns(userInput, aiMemory)
    if (patterns.length > 0) {
      thoughts.push({
        type: 'pattern',
        content: `Identified patterns: ${patterns.join(', ')}. Adjusting response strategy.`,
        timestamp: Date.now() + 200
      })
    }

    // 4. Emotional Intelligence
    const emotion = detectEmotion(userInput)
    thoughts.push({
      type: 'emotion',
      content: `Emotional analysis: ${emotion.primary} (${emotion.confidence}% confidence). Adapting empathy level.`,
      timestamp: Date.now() + 300
    })

    // 5. Response Generation
    thoughts.push({
      type: 'generation',
      content: `Generating response using analytical reasoning, emotional intelligence, and learned patterns.`,
      timestamp: Date.now() + 400
    })

    return thoughts
  }

  // Pattern detection algorithm
  const detectPatterns = (input, memory) => {
    const patterns = []
    const words = input.toLowerCase().split(' ')
    
    // Check for recurring themes
    const themes = ['anxiety', 'stress', 'depression', 'work', 'family', 'sleep', 'health']
    themes.forEach(theme => {
      if (words.includes(theme)) {
        const frequency = memory.conversationHistory.filter(msg => 
          msg.text.toLowerCase().includes(theme)
        ).length
        if (frequency > 2) {
          patterns.push(`recurring_${theme}`)
        }
      }
    })

    // Check for time patterns
    const hour = new Date().getHours()
    if (hour < 6 || hour > 22) {
      patterns.push('late_night_conversation')
    }

    // Check for question patterns
    if (input.includes('?')) {
      patterns.push('seeking_information')
    }

    return patterns
  }

  // Emotion detection
  const detectEmotion = (input) => {
    const emotions = {
      anxiety: ['worried', 'anxious', 'nervous', 'panic', 'fear'],
      sadness: ['sad', 'depressed', 'down', 'hopeless', 'lonely'],
      anger: ['angry', 'frustrated', 'mad', 'irritated', 'annoyed'],
      joy: ['happy', 'excited', 'great', 'wonderful', 'amazing'],
      neutral: ['okay', 'fine', 'normal', 'alright']
    }

    let maxScore = 0
    let primaryEmotion = 'neutral'
    
    Object.entries(emotions).forEach(([emotion, keywords]) => {
      const score = keywords.reduce((acc, keyword) => {
        return acc + (input.toLowerCase().includes(keyword) ? 1 : 0)
      }, 0)
      
      if (score > maxScore) {
        maxScore = score
        primaryEmotion = emotion
      }
    })

    return {
      primary: primaryEmotion,
      confidence: Math.min(maxScore * 30 + 40, 95)
    }
  }

  // Advanced response generation with learning
  const generateAdvancedResponse = (userInput, thoughts, memory) => {
    const emotion = detectEmotion(userInput)
    const patterns = detectPatterns(userInput, memory)
    
    // Learning from conversation
    const newInsight = {
      timestamp: Date.now(),
      userInput: userInput,
      detectedEmotion: emotion,
      patterns: patterns,
      context: `User interaction at ${new Date().toLocaleTimeString()}`
    }

    // Update AI memory
    const updatedMemory = {
      ...memory,
      conversationHistory: [...memory.conversationHistory, { text: userInput, timestamp: Date.now() }],
      personalInsights: [...memory.personalInsights, newInsight],
      emotionalContext: {
        ...memory.emotionalContext,
        [emotion.primary]: (memory.emotionalContext[emotion.primary] || 0) + 1
      }
    }

    // Generate contextual response based on learning
    let response = ""
    let reasoning = ""

    if (patterns.includes('recurring_anxiety')) {
      response = "I've noticed anxiety is a recurring theme in our conversations. Based on our previous discussions, I think we should explore some personalized coping strategies that align with your specific triggers. "
      reasoning = "Pattern recognition: recurring anxiety theme detected"
    } else if (patterns.includes('late_night_conversation')) {
      response = "I see you're reaching out during late hours. This suggests you might be experiencing sleep difficulties or heightened stress. "
      reasoning = "Temporal pattern analysis: late-night conversation pattern"
    } else if (emotion.primary === 'sadness' && emotion.confidence > 70) {
      response = "I can sense the sadness in your words, and I want you to know that your feelings are completely valid. "
      reasoning = "High-confidence sadness detection with empathetic response"
    } else if (emotion.primary === 'anxiety') {
      response = "I'm picking up on some anxiety in what you're sharing. Let's work through this together. "
      reasoning = "Anxiety detection with supportive approach"
    } else {
      response = "Thank you for sharing that with me. I'm processing what you've told me and considering how I can best support you. "
      reasoning = "General supportive response with active processing indication"
    }

    // Add personalized elements based on memory
    if (updatedMemory.personalInsights.length > 5) {
      response += "Based on our ongoing conversations, I'm developing a deeper understanding of your unique situation and needs. "
    }

    // Add specific guidance
    const guidance = generateGuidance(userInput, emotion, patterns)
    response += guidance

    return {
      response,
      reasoning,
      updatedMemory,
      confidence: calculateConfidence(emotion, patterns, memory)
    }
  }

  const generateGuidance = (input, emotion, patterns) => {
    if (emotion.primary === 'anxiety') {
      return "Would you like to try a breathing exercise, or would you prefer to talk through what's causing these anxious feelings?"
    } else if (emotion.primary === 'sadness') {
      return "Sometimes it helps to acknowledge these feelings rather than push them away. What's been weighing on your mind?"
    } else if (patterns.includes('seeking_information')) {
      return "I'm here to provide information and support. What specific aspect would you like to explore further?"
    } else {
      return "How can I best support you right now? I'm here to listen and help in whatever way feels most helpful to you."
    }
  }

  const calculateConfidence = (emotion, patterns, memory) => {
    let confidence = 0.7 // Base confidence
    
    if (emotion.confidence > 80) confidence += 0.1
    if (patterns.length > 0) confidence += 0.1
    if (memory.conversationHistory.length > 10) confidence += 0.1
    
    return Math.min(confidence, 0.95)
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsThinking(true)

    // AI thinking process
    const thoughts = aiThinkingProcess(inputMessage, aiMemory)
    setAiThoughts(thoughts)

    // Simulate thinking time
    setTimeout(() => {
      const aiResponse = generateAdvancedResponse(inputMessage, thoughts, aiMemory)
      
      const aiMessage = {
        id: messages.length + 2,
        text: aiResponse.response,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString(),
        confidence: aiResponse.confidence,
        reasoning: aiResponse.reasoning
      }

      setMessages(prev => [...prev, aiMessage])
      setAiMemory(aiResponse.updatedMemory)
      
      // Save memory to localStorage
      localStorage.setItem('neurawell-ai-memory', JSON.stringify(aiResponse.updatedMemory))
      
      setIsThinking(false)
    }, 2000)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const clearMemory = () => {
    setAiMemory({
      userPreferences: {},
      conversationHistory: [],
      learnedPatterns: {},
      emotionalContext: {},
      personalInsights: []
    })
    localStorage.removeItem('neurawell-ai-memory')
    alert('AI memory cleared. The agent will start learning fresh.')
  }

  return (
    <div className='bg-black min-h-screen text-white'>
      <div className='container mx-auto px-4 py-8'>
        {/* Header */}
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold text-primary mb-4'>NeuraWell Advanced AI</h1>
          <p className='text-gray-300 max-w-3xl mx-auto mb-4'>
            An autonomous learning AI agent that thinks, learns, and adapts. This AI has memory, 
            pattern recognition, emotional intelligence, and continuous learning capabilities.
          </p>
          
          {/* AI Stats */}
          <div className='grid grid-cols-2 md:grid-cols-5 gap-4 max-w-2xl mx-auto mb-4'>
            <div className='bg-gray-900 border border-gray-700 rounded-lg p-3'>
              <div className='text-sm text-gray-400'>Conversations</div>
              <div className='text-lg font-bold text-primary'>{aiMemory.conversationHistory.length}</div>
            </div>
            <div className='bg-gray-900 border border-gray-700 rounded-lg p-3'>
              <div className='text-sm text-gray-400'>Insights</div>
              <div className='text-lg font-bold text-primary'>{aiMemory.personalInsights.length}</div>
            </div>
            <div className='bg-gray-900 border border-gray-700 rounded-lg p-3'>
              <div className='text-sm text-gray-400'>Empathy</div>
              <div className='text-lg font-bold text-primary'>{Math.round(aiPersonality.empathy * 100)}%</div>
            </div>
            <div className='bg-gray-900 border border-gray-700 rounded-lg p-3'>
              <div className='text-sm text-gray-400'>Learning</div>
              <div className='text-lg font-bold text-primary'>{Math.round(aiPersonality.memory_strength * 100)}%</div>
            </div>
            <div className='bg-gray-900 border border-gray-700 rounded-lg p-3'>
              <div className='text-sm text-gray-400'>Analysis</div>
              <div className='text-lg font-bold text-primary'>{Math.round(aiPersonality.analytical * 100)}%</div>
            </div>
          </div>
        </div>

        <div className='max-w-6xl mx-auto grid lg:grid-cols-3 gap-6'>
          {/* Main Chat */}
          <div className='lg:col-span-2'>
            <div className='bg-gray-900 rounded-lg border border-gray-700 overflow-hidden'>
              {/* Chat Header */}
              <div className='bg-gray-800 p-4 border-b border-gray-700'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center space-x-3'>
                    <div className='w-10 h-10 bg-gradient-to-r from-primary to-purple-600 rounded-full flex items-center justify-center'>
                      <span className='text-white font-bold'>🧠</span>
                    </div>
                    <div>
                      <h3 className='font-semibold text-white'>Advanced AI Agent</h3>
                      <p className='text-sm text-green-400'>● Learning & Adapting</p>
                    </div>
                  </div>
                  <div className='flex space-x-2'>
                    <button
                      onClick={() => setShowThoughts(!showThoughts)}
                      className='bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm transition-colors'
                    >
                      {showThoughts ? 'Hide' : 'Show'} Thoughts
                    </button>
                    <button
                      onClick={clearMemory}
                      className='bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors'
                    >
                      Clear Memory
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className='h-96 overflow-y-auto p-4 space-y-4'>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-primary text-white'
                          : 'bg-gray-700 text-white border border-gray-600'
                      }`}
                    >
                      <p className='whitespace-pre-line'>{message.text}</p>
                      <div className='flex justify-between items-center mt-2'>
                        <p className='text-xs opacity-70'>{message.timestamp}</p>
                        {message.confidence && (
                          <p className='text-xs opacity-70'>
                            Confidence: {Math.round(message.confidence * 100)}%
                          </p>
                        )}
                      </div>
                      {message.reasoning && (
                        <p className='text-xs opacity-60 mt-1 italic'>
                          Reasoning: {message.reasoning}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
                
                {isThinking && (
                  <div className='flex justify-start'>
                    <div className='bg-gray-700 text-white px-4 py-2 rounded-lg border border-purple-500'>
                      <div className='flex items-center space-x-2'>
                        <div className='flex space-x-1'>
                          <div className='w-2 h-2 bg-purple-400 rounded-full animate-bounce'></div>
                          <div className='w-2 h-2 bg-purple-400 rounded-full animate-bounce' style={{animationDelay: '0.1s'}}></div>
                          <div className='w-2 h-2 bg-purple-400 rounded-full animate-bounce' style={{animationDelay: '0.2s'}}></div>
                        </div>
                        <span className='text-sm'>AI is thinking and analyzing...</span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className='p-4 border-t border-gray-700'>
                <div className='flex space-x-2'>
                  <textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Share anything with the Advanced AI... It will learn and adapt to help you better."
                    className='flex-1 bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-primary resize-none'
                    rows={2}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim()}
                    className='bg-primary hover:bg-blue-600 disabled:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-colors'
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* AI Insights Panel */}
          <div className='space-y-6'>
            {/* AI Thoughts */}
            {showThoughts && (
              <div className='bg-gray-900 border border-gray-700 rounded-lg p-4'>
                <h3 className='font-semibold mb-3 text-purple-400'>AI Thought Process</h3>
                <div className='space-y-2 max-h-48 overflow-y-auto'>
                  {aiThoughts.map((thought, index) => (
                    <div key={index} className='text-xs bg-gray-800 p-2 rounded border-l-2 border-purple-500'>
                      <div className={`font-medium ${
                        thought.type === 'analysis' ? 'text-blue-400' :
                        thought.type === 'memory' ? 'text-green-400' :
                        thought.type === 'pattern' ? 'text-yellow-400' :
                        thought.type === 'emotion' ? 'text-red-400' :
                        'text-purple-400'
                      }`}>
                        {thought.type.toUpperCase()}
                      </div>
                      <div className='text-gray-300'>{thought.content}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Memory Stats */}
            <div className='bg-gray-900 border border-gray-700 rounded-lg p-4'>
              <h3 className='font-semibold mb-3 text-green-400'>AI Memory</h3>
              <div className='space-y-2 text-sm'>
                <div className='flex justify-between'>
                  <span className='text-gray-400'>Total Conversations:</span>
                  <span className='text-white'>{aiMemory.conversationHistory.length}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-400'>Personal Insights:</span>
                  <span className='text-white'>{aiMemory.personalInsights.length}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-400'>Emotional Patterns:</span>
                  <span className='text-white'>{Object.keys(aiMemory.emotionalContext).length}</span>
                </div>
              </div>
            </div>

            {/* Emotional Context */}
            {Object.keys(aiMemory.emotionalContext).length > 0 && (
              <div className='bg-gray-900 border border-gray-700 rounded-lg p-4'>
                <h3 className='font-semibold mb-3 text-blue-400'>Emotional Patterns</h3>
                <div className='space-y-2'>
                  {Object.entries(aiMemory.emotionalContext).map(([emotion, count]) => (
                    <div key={emotion} className='flex justify-between text-sm'>
                      <span className='text-gray-400 capitalize'>{emotion}:</span>
                      <span className='text-white'>{count} times</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* AI Capabilities */}
            <div className='bg-gray-900 border border-gray-700 rounded-lg p-4'>
              <h3 className='font-semibold mb-3 text-yellow-400'>AI Capabilities</h3>
              <div className='space-y-2 text-xs'>
                <div className='flex items-center space-x-2'>
                  <div className='w-2 h-2 bg-green-400 rounded-full'></div>
                  <span>Continuous Learning</span>
                </div>
                <div className='flex items-center space-x-2'>
                  <div className='w-2 h-2 bg-green-400 rounded-full'></div>
                  <span>Pattern Recognition</span>
                </div>
                <div className='flex items-center space-x-2'>
                  <div className='w-2 h-2 bg-green-400 rounded-full'></div>
                  <span>Emotional Intelligence</span>
                </div>
                <div className='flex items-center space-x-2'>
                  <div className='w-2 h-2 bg-green-400 rounded-full'></div>
                  <span>Memory Retention</span>
                </div>
                <div className='flex items-center space-x-2'>
                  <div className='w-2 h-2 bg-green-400 rounded-full'></div>
                  <span>Adaptive Responses</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdvancedAI