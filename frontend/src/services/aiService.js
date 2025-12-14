// NeuraWell AI Service Integration
const AI_SERVICE_URL = 'http://localhost:8000'

class AIService {
  constructor() {
    this.baseURL = AI_SERVICE_URL
    this.websocket = null
    this.isConnected = false
  }

  // HTTP API Methods
  async makeRequest(endpoint, options = {}) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        ...options
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('AI Service request failed:', error)
      throw error
    }
  }

  // Get AI Status
  async getStatus() {
    return await this.makeRequest('/ai/status')
  }

  // Chat with AI
  async chatWithAI(message, userId, context = {}) {
    return await this.makeRequest('/ai/chat', {
      method: 'POST',
      body: JSON.stringify({
        text: message,
        user_id: userId,
        context: context
      })
    })
  }

  // Trigger AI Learning
  async triggerLearning() {
    return await this.makeRequest('/ai/learn', {
      method: 'POST'
    })
  }

  // Get AI Insights
  async getInsights() {
    return await this.makeRequest('/ai/insights')
  }

  // Get AI Thoughts
  async getThoughts() {
    return await this.makeRequest('/ai/thoughts')
  }

  // Process Assessment
  async processAssessment(assessmentData) {
    return await this.makeRequest('/ai/assessment', {
      method: 'POST',
      body: JSON.stringify(assessmentData)
    })
  }

  // Analyze Mood
  async analyzeMood(moodData) {
    return await this.makeRequest('/ai/mood', {
      method: 'POST',
      body: JSON.stringify(moodData)
    })
  }

  // WebSocket Methods
  connectWebSocket(userId, onMessage, onThoughts) {
    if (this.websocket) {
      this.websocket.close()
    }

    try {
      this.websocket = new WebSocket(`ws://localhost:8000/ws/${userId}`)
      
      this.websocket.onopen = () => {
        console.log('Connected to AI WebSocket')
        this.isConnected = true
      }

      this.websocket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          
          if (data.type === 'thoughts') {
            onThoughts && onThoughts(data.data)
          } else {
            onMessage && onMessage(data)
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error)
        }
      }

      this.websocket.onclose = () => {
        console.log('Disconnected from AI WebSocket')
        this.isConnected = false
      }

      this.websocket.onerror = (error) => {
        console.error('WebSocket error:', error)
        this.isConnected = false
      }

    } catch (error) {
      console.error('Failed to connect WebSocket:', error)
    }
  }

  sendWebSocketMessage(message, includeThoughts = false) {
    if (this.websocket && this.isConnected) {
      this.websocket.send(JSON.stringify({
        text: message,
        include_thoughts: includeThoughts,
        timestamp: new Date().toISOString()
      }))
    } else {
      console.error('WebSocket not connected')
    }
  }

  disconnectWebSocket() {
    if (this.websocket) {
      this.websocket.close()
      this.websocket = null
      this.isConnected = false
    }
  }

  // Utility Methods
  isServiceAvailable() {
    return this.getStatus()
      .then(() => true)
      .catch(() => false)
  }

  async waitForService(maxAttempts = 10, delay = 2000) {
    for (let i = 0; i < maxAttempts; i++) {
      try {
        await this.getStatus()
        return true
      } catch (error) {
        console.log(`Waiting for AI service... (${i + 1}/${maxAttempts})`)
        await new Promise(resolve => setTimeout(resolve, delay))
      }
    }
    return false
  }
}

// Create singleton instance
const aiService = new AIService()

export default aiService

// Export individual methods for convenience
export const {
  getStatus,
  chatWithAI,
  triggerLearning,
  getInsights,
  getThoughts,
  processAssessment,
  analyzeMood,
  connectWebSocket,
  sendWebSocketMessage,
  disconnectWebSocket,
  isServiceAvailable,
  waitForService
} = aiService