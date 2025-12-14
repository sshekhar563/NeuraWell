import React, { useState, useRef, useEffect } from 'react'
import { assets } from '../assets/assets'

const AITherapist = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm NeuraWell AI, your psychological support companion. I'm here to listen and provide support. How are you feeling today?",
      sender: 'ai',
      timestamp: new Date().toLocaleTimeString()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [sessionActive, setSessionActive] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // AI Response Generator (In production, this would connect to a real AI service)
  const generateAIResponse = (userMessage) => {
    const responses = {
      // Greeting responses
      greeting: [
        "Thank you for sharing that with me. It takes courage to reach out. Can you tell me more about what's on your mind?",
        "I appreciate you opening up. Your feelings are valid. What would you like to talk about today?",
        "I'm glad you're here. This is a safe space for you to express yourself. How can I support you right now?"
      ],
      // Anxiety responses
      anxiety: [
        "I understand you're feeling anxious. That's a very common experience. Let's try a breathing exercise together. Take a deep breath in for 4 counts, hold for 4, then exhale for 6. Would you like to try this?",
        "Anxiety can feel overwhelming, but you're not alone. Can you identify what might be triggering these feelings? Sometimes naming our worries can help reduce their power.",
        "It sounds like you're dealing with anxiety. Remember, anxiety is your mind trying to protect you, but sometimes it can be overprotective. What specific thoughts are causing you distress?"
      ],
      // Depression responses
      depression: [
        "I hear that you're going through a difficult time. Depression can make everything feel heavy and overwhelming. You've taken an important step by reaching out. What has been the hardest part of your day?",
        "Thank you for trusting me with these feelings. Depression affects many people, and it's nothing to be ashamed of. Have you been able to do any small activities that usually bring you comfort?",
        "I want you to know that what you're experiencing is real and valid. Even small steps forward matter. Is there one tiny thing you could do today just for yourself?"
      ],
      // Stress responses
      stress: [
        "Stress can really impact our wellbeing. It sounds like you have a lot on your plate. Let's break this down - what feels like the most pressing concern right now?",
        "I can hear that you're feeling overwhelmed. When we're stressed, everything can feel urgent. What's one thing you could let go of or delegate today?",
        "Stress is your body's way of responding to challenges. You're stronger than you know. What coping strategies have helped you in the past?"
      ],
      // Default supportive responses
      default: [
        "Thank you for sharing that with me. Your feelings matter, and I'm here to listen. Can you tell me more about what you're experiencing?",
        "I appreciate your openness. It's important to acknowledge what you're going through. What would be most helpful for you right now?",
        "You're being very brave by talking about this. Every step toward understanding yourself better is valuable. How long have you been feeling this way?"
      ]
    }

    const lowerMessage = userMessage.toLowerCase()
    
    if (lowerMessage.includes('anxious') || lowerMessage.includes('anxiety') || lowerMessage.includes('worried') || lowerMessage.includes('panic')) {
      return responses.anxiety[Math.floor(Math.random() * responses.anxiety.length)]
    } else if (lowerMessage.includes('depressed') || lowerMessage.includes('depression') || lowerMessage.includes('sad') || lowerMessage.includes('hopeless')) {
      return responses.depression[Math.floor(Math.random() * responses.depression.length)]
    } else if (lowerMessage.includes('stress') || lowerMessage.includes('overwhelmed') || lowerMessage.includes('pressure')) {
      return responses.stress[Math.floor(Math.random() * responses.stress.length)]
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('good') || lowerMessage.includes('fine')) {
      return responses.greeting[Math.floor(Math.random() * responses.greeting.length)]
    } else {
      return responses.default[Math.floor(Math.random() * responses.default.length)]
    }
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
    setIsTyping(true)
    setSessionActive(true)

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        text: generateAIResponse(inputMessage),
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString()
      }
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const startCrisisSupport = () => {
    const crisisMessage = {
      id: messages.length + 1,
      text: "I'm concerned about your wellbeing. If you're having thoughts of self-harm, please reach out to a crisis helpline immediately:\n\n🆘 National Suicide Prevention Lifeline: 988\n🆘 Crisis Text Line: Text HOME to 741741\n🆘 Emergency Services: 911\n\nYou matter, and help is available. Would you like me to help you find local mental health resources?",
      sender: 'ai',
      timestamp: new Date().toLocaleTimeString(),
      type: 'crisis'
    }
    setMessages(prev => [...prev, crisisMessage])
  }

  return (
    <div className='bg-black min-h-screen text-white'>
      <div className='container mx-auto px-4 py-8'>
        {/* Header */}
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold text-primary mb-4'>NeuraWell AI Therapist</h1>
          <p className='text-gray-300 max-w-2xl mx-auto'>
            Your confidential AI psychological support companion. Available 24/7 to listen, support, and guide you through difficult moments.
          </p>
          <div className='mt-4 p-4 bg-gray-900 rounded-lg border border-gray-700'>
            <p className='text-sm text-yellow-400'>
              ⚠️ This AI is for support only and not a replacement for professional therapy. 
              In case of emergency, please contact crisis services immediately.
            </p>
          </div>
        </div>

        {/* Chat Interface */}
        <div className='max-w-4xl mx-auto bg-gray-900 rounded-lg border border-gray-700 overflow-hidden'>
          {/* Chat Header */}
          <div className='bg-gray-800 p-4 border-b border-gray-700'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-3'>
                <div className='w-10 h-10 bg-primary rounded-full flex items-center justify-center'>
                  <span className='text-white font-bold'>AI</span>
                </div>
                <div>
                  <h3 className='font-semibold text-white'>NeuraWell AI</h3>
                  <p className='text-sm text-green-400'>● Online - Always here for you</p>
                </div>
              </div>
              <button
                onClick={startCrisisSupport}
                className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors'
              >
                🆘 Crisis Support
              </button>
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
                      : message.type === 'crisis'
                      ? 'bg-red-900 border border-red-600 text-white'
                      : 'bg-gray-700 text-white'
                  }`}
                >
                  <p className='whitespace-pre-line'>{message.text}</p>
                  <p className='text-xs mt-1 opacity-70'>{message.timestamp}</p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className='flex justify-start'>
                <div className='bg-gray-700 text-white px-4 py-2 rounded-lg'>
                  <div className='flex space-x-1'>
                    <div className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'></div>
                    <div className='w-2 h-2 bg-gray-400 rounded-full animate-bounce' style={{animationDelay: '0.1s'}}></div>
                    <div className='w-2 h-2 bg-gray-400 rounded-full animate-bounce' style={{animationDelay: '0.2s'}}></div>
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
                placeholder="Share what's on your mind... (Press Enter to send)"
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

        {/* Quick Actions */}
        <div className='max-w-4xl mx-auto mt-8'>
          <h3 className='text-xl font-semibold mb-4 text-center'>Quick Support Options</h3>
          <div className='grid md:grid-cols-3 gap-4'>
            <button
              onClick={() => setInputMessage("I'm feeling anxious and need help with breathing exercises")}
              className='bg-gray-800 hover:bg-gray-700 border border-gray-600 p-4 rounded-lg text-left transition-colors'
            >
              <h4 className='font-semibold text-blue-400 mb-2'>🫁 Anxiety Support</h4>
              <p className='text-sm text-gray-300'>Breathing exercises and anxiety management</p>
            </button>
            
            <button
              onClick={() => setInputMessage("I'm feeling overwhelmed and stressed about everything")}
              className='bg-gray-800 hover:bg-gray-700 border border-gray-600 p-4 rounded-lg text-left transition-colors'
            >
              <h4 className='font-semibold text-green-400 mb-2'>😰 Stress Relief</h4>
              <p className='text-sm text-gray-300'>Coping strategies for overwhelming feelings</p>
            </button>
            
            <button
              onClick={() => setInputMessage("I've been feeling really down and need someone to talk to")}
              className='bg-gray-800 hover:bg-gray-700 border border-gray-600 p-4 rounded-lg text-left transition-colors'
            >
              <h4 className='font-semibold text-purple-400 mb-2'>💙 Emotional Support</h4>
              <p className='text-sm text-gray-300'>Someone to listen and provide comfort</p>
            </button>
          </div>
        </div>

        {/* Disclaimer */}
        <div className='max-w-4xl mx-auto mt-8 p-4 bg-gray-900 rounded-lg border border-gray-700'>
          <h4 className='font-semibold mb-2 text-yellow-400'>Important Information</h4>
          <ul className='text-sm text-gray-300 space-y-1'>
            <li>• This AI provides supportive conversations but is not a substitute for professional mental health care</li>
            <li>• All conversations are confidential and not stored permanently</li>
            <li>• If you're experiencing a mental health crisis, please contact emergency services or a crisis hotline</li>
            <li>• For ongoing mental health support, consider speaking with a licensed therapist</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default AITherapist