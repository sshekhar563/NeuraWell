import React, { useState, useEffect } from 'react'

const AILearningEngine = () => {
  const [neuralNetwork, setNeuralNetwork] = useState({
    layers: [
      { name: 'Input Layer', neurons: 10, activation: 0.7 },
      { name: 'Hidden Layer 1', neurons: 15, activation: 0.8 },
      { name: 'Hidden Layer 2', neurons: 12, activation: 0.6 },
      { name: 'Output Layer', neurons: 5, activation: 0.9 }
    ],
    connections: 847,
    learningRate: 0.001,
    accuracy: 94.7
  })

  const [learningStats, setLearningStats] = useState({
    totalInteractions: 0,
    patternsLearned: 0,
    memorySize: 0,
    adaptationRate: 0,
    confidenceLevel: 0
  })

  const [isLearning, setIsLearning] = useState(false)
  const [learningProgress, setLearningProgress] = useState(0)

  useEffect(() => {
    // Load learning stats from localStorage
    const savedStats = localStorage.getItem('neurawell-ai-learning-stats')
    if (savedStats) {
      setLearningStats(JSON.parse(savedStats))
    }

    // Simulate continuous learning
    const learningInterval = setInterval(() => {
      if (isLearning) {
        setLearningProgress(prev => {
          const newProgress = prev + Math.random() * 5
          if (newProgress >= 100) {
            setIsLearning(false)
            updateNeuralNetwork()
            return 0
          }
          return newProgress
        })
      }
    }, 100)

    return () => clearInterval(learningInterval)
  }, [isLearning])

  const updateNeuralNetwork = () => {
    setNeuralNetwork(prev => ({
      ...prev,
      accuracy: Math.min(prev.accuracy + Math.random() * 0.5, 99.9),
      connections: prev.connections + Math.floor(Math.random() * 10),
      layers: prev.layers.map(layer => ({
        ...layer,
        activation: Math.min(layer.activation + Math.random() * 0.1, 1.0)
      }))
    }))

    setLearningStats(prev => {
      const newStats = {
        ...prev,
        totalInteractions: prev.totalInteractions + Math.floor(Math.random() * 5) + 1,
        patternsLearned: prev.patternsLearned + Math.floor(Math.random() * 3) + 1,
        memorySize: prev.memorySize + Math.random() * 0.1,
        adaptationRate: Math.min(prev.adaptationRate + Math.random() * 2, 100),
        confidenceLevel: Math.min(prev.confidenceLevel + Math.random() * 1.5, 100)
      }
      localStorage.setItem('neurawell-ai-learning-stats', JSON.stringify(newStats))
      return newStats
    })
  }

  const startLearning = () => {
    setIsLearning(true)
    setLearningProgress(0)
  }

  const resetLearning = () => {
    setLearningStats({
      totalInteractions: 0,
      patternsLearned: 0,
      memorySize: 0,
      adaptationRate: 0,
      confidenceLevel: 0
    })
    setNeuralNetwork({
      layers: [
        { name: 'Input Layer', neurons: 10, activation: 0.5 },
        { name: 'Hidden Layer 1', neurons: 15, activation: 0.5 },
        { name: 'Hidden Layer 2', neurons: 12, activation: 0.5 },
        { name: 'Output Layer', neurons: 5, activation: 0.5 }
      ],
      connections: 500,
      learningRate: 0.001,
      accuracy: 70.0
    })
    localStorage.removeItem('neurawell-ai-learning-stats')
  }

  return (
    <div className='bg-gray-900 border border-gray-700 rounded-lg p-6'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-2xl font-bold text-primary'>AI Learning Engine</h2>
        <div className='flex space-x-2'>
          <button
            onClick={startLearning}
            disabled={isLearning}
            className='bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm transition-colors'
          >
            {isLearning ? 'Learning...' : 'Start Learning'}
          </button>
          <button
            onClick={resetLearning}
            className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-colors'
          >
            Reset
          </button>
        </div>
      </div>

      {/* Learning Progress */}
      {isLearning && (
        <div className='mb-6'>
          <div className='flex justify-between items-center mb-2'>
            <span className='text-sm text-gray-400'>Learning Progress</span>
            <span className='text-sm text-primary'>{Math.round(learningProgress)}%</span>
          </div>
          <div className='w-full bg-gray-700 rounded-full h-2'>
            <div 
              className='bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300'
              style={{ width: `${learningProgress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Neural Network Visualization */}
      <div className='grid md:grid-cols-2 gap-6 mb-6'>
        <div>
          <h3 className='text-lg font-semibold mb-4 text-blue-400'>Neural Network Architecture</h3>
          <div className='space-y-3'>
            {neuralNetwork.layers.map((layer, index) => (
              <div key={index} className='bg-gray-800 rounded-lg p-3'>
                <div className='flex justify-between items-center mb-2'>
                  <span className='font-medium text-white'>{layer.name}</span>
                  <span className='text-sm text-gray-400'>{layer.neurons} neurons</span>
                </div>
                <div className='w-full bg-gray-700 rounded-full h-2'>
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      layer.activation > 0.8 ? 'bg-green-500' :
                      layer.activation > 0.6 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${layer.activation * 100}%` }}
                  ></div>
                </div>
                <div className='text-xs text-gray-400 mt-1'>
                  Activation: {(layer.activation * 100).toFixed(1)}%
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className='text-lg font-semibold mb-4 text-green-400'>Learning Statistics</h3>
          <div className='space-y-3'>
            <div className='bg-gray-800 rounded-lg p-3'>
              <div className='flex justify-between'>
                <span className='text-gray-400'>Total Interactions:</span>
                <span className='text-white font-bold'>{learningStats.totalInteractions}</span>
              </div>
            </div>
            <div className='bg-gray-800 rounded-lg p-3'>
              <div className='flex justify-between'>
                <span className='text-gray-400'>Patterns Learned:</span>
                <span className='text-white font-bold'>{learningStats.patternsLearned}</span>
              </div>
            </div>
            <div className='bg-gray-800 rounded-lg p-3'>
              <div className='flex justify-between'>
                <span className='text-gray-400'>Memory Size:</span>
                <span className='text-white font-bold'>{learningStats.memorySize.toFixed(2)} MB</span>
              </div>
            </div>
            <div className='bg-gray-800 rounded-lg p-3'>
              <div className='flex justify-between'>
                <span className='text-gray-400'>Adaptation Rate:</span>
                <span className='text-white font-bold'>{learningStats.adaptationRate.toFixed(1)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Network Performance */}
      <div className='grid md:grid-cols-3 gap-4'>
        <div className='bg-gray-800 rounded-lg p-4 text-center'>
          <div className='text-2xl font-bold text-primary'>{neuralNetwork.accuracy.toFixed(1)}%</div>
          <div className='text-sm text-gray-400'>Accuracy</div>
        </div>
        <div className='bg-gray-800 rounded-lg p-4 text-center'>
          <div className='text-2xl font-bold text-primary'>{neuralNetwork.connections}</div>
          <div className='text-sm text-gray-400'>Neural Connections</div>
        </div>
        <div className='bg-gray-800 rounded-lg p-4 text-center'>
          <div className='text-2xl font-bold text-primary'>{learningStats.confidenceLevel.toFixed(1)}%</div>
          <div className='text-sm text-gray-400'>Confidence Level</div>
        </div>
      </div>
    </div>
  )
}

export default AILearningEngine