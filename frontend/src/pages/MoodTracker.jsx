import React, { useState, useEffect } from 'react'

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState(null)
  const [moodNote, setMoodNote] = useState('')
  const [moodHistory, setMoodHistory] = useState([])
  const [showHistory, setShowHistory] = useState(false)

  const moods = [
    { id: 1, emoji: '😄', label: 'Excellent', color: 'bg-green-500', value: 5 },
    { id: 2, emoji: '😊', label: 'Good', color: 'bg-green-400', value: 4 },
    { id: 3, emoji: '😐', label: 'Okay', color: 'bg-yellow-500', value: 3 },
    { id: 4, emoji: '😔', label: 'Low', color: 'bg-orange-500', value: 2 },
    { id: 5, emoji: '😢', label: 'Very Low', color: 'bg-red-500', value: 1 }
  ]

  const activities = [
    { id: 1, name: 'Exercise', emoji: '🏃‍♂️' },
    { id: 2, name: 'Meditation', emoji: '🧘‍♀️' },
    { id: 3, name: 'Social Time', emoji: '👥' },
    { id: 4, name: 'Work', emoji: '💼' },
    { id: 5, name: 'Sleep', emoji: '😴' },
    { id: 6, name: 'Hobbies', emoji: '🎨' },
    { id: 7, name: 'Nature', emoji: '🌳' },
    { id: 8, name: 'Reading', emoji: '📚' }
  ]

  const [selectedActivities, setSelectedActivities] = useState([])

  useEffect(() => {
    // Load mood history from localStorage
    const savedHistory = localStorage.getItem('neurawell-mood-history')
    if (savedHistory) {
      setMoodHistory(JSON.parse(savedHistory))
    }
  }, [])

  const saveMoodEntry = () => {
    if (!selectedMood) return

    const newEntry = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString(),
      mood: selectedMood,
      note: moodNote,
      activities: selectedActivities,
      timestamp: new Date().toISOString()
    }

    const updatedHistory = [newEntry, ...moodHistory]
    setMoodHistory(updatedHistory)
    localStorage.setItem('neurawell-mood-history', JSON.stringify(updatedHistory))

    // Reset form
    setSelectedMood(null)
    setMoodNote('')
    setSelectedActivities([])

    alert('Mood entry saved successfully!')
  }

  const toggleActivity = (activityId) => {
    setSelectedActivities(prev => 
      prev.includes(activityId)
        ? prev.filter(id => id !== activityId)
        : [...prev, activityId]
    )
  }

  const getMoodStats = () => {
    if (moodHistory.length === 0) return null

    const last7Days = moodHistory.filter(entry => {
      const entryDate = new Date(entry.timestamp)
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      return entryDate >= weekAgo
    })

    const averageMood = last7Days.reduce((sum, entry) => sum + entry.mood.value, 0) / last7Days.length
    const moodTrend = last7Days.length >= 2 ? 
      (last7Days[0].mood.value - last7Days[last7Days.length - 1].mood.value) : 0

    return {
      entriesThisWeek: last7Days.length,
      averageMood: averageMood.toFixed(1),
      trend: moodTrend > 0 ? 'improving' : moodTrend < 0 ? 'declining' : 'stable'
    }
  }

  const stats = getMoodStats()

  return (
    <div className='bg-black min-h-screen text-white'>
      <div className='container mx-auto px-4 py-8'>
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold text-primary mb-4'>Mood Tracker</h1>
          <p className='text-gray-300 max-w-2xl mx-auto'>
            Track your daily mood and activities to better understand your mental health patterns. 
            Regular tracking can help identify triggers and positive influences.
          </p>
        </div>

        <div className='max-w-4xl mx-auto'>
          {/* Stats Overview */}
          {stats && (
            <div className='grid md:grid-cols-3 gap-4 mb-8'>
              <div className='bg-gray-900 border border-gray-700 rounded-lg p-4 text-center'>
                <div className='text-2xl font-bold text-primary'>{stats.entriesThisWeek}</div>
                <div className='text-sm text-gray-400'>Entries This Week</div>
              </div>
              <div className='bg-gray-900 border border-gray-700 rounded-lg p-4 text-center'>
                <div className='text-2xl font-bold text-primary'>{stats.averageMood}/5</div>
                <div className='text-sm text-gray-400'>Average Mood</div>
              </div>
              <div className='bg-gray-900 border border-gray-700 rounded-lg p-4 text-center'>
                <div className={`text-2xl font-bold ${
                  stats.trend === 'improving' ? 'text-green-400' : 
                  stats.trend === 'declining' ? 'text-red-400' : 'text-yellow-400'
                }`}>
                  {stats.trend === 'improving' ? '📈' : stats.trend === 'declining' ? '📉' : '➡️'}
                </div>
                <div className='text-sm text-gray-400 capitalize'>{stats.trend}</div>
              </div>
            </div>
          )}

          <div className='grid lg:grid-cols-2 gap-8'>
            {/* Mood Entry Form */}
            <div className='bg-gray-900 border border-gray-700 rounded-lg p-6'>
              <h2 className='text-2xl font-semibold mb-6'>How are you feeling today?</h2>
              
              {/* Mood Selection */}
              <div className='mb-6'>
                <h3 className='text-lg font-medium mb-4'>Select your mood:</h3>
                <div className='grid grid-cols-5 gap-2'>
                  {moods.map(mood => (
                    <button
                      key={mood.id}
                      onClick={() => setSelectedMood(mood)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedMood?.id === mood.id
                          ? 'border-primary bg-primary bg-opacity-20'
                          : 'border-gray-600 hover:border-gray-500'
                      }`}
                    >
                      <div className='text-3xl mb-2'>{mood.emoji}</div>
                      <div className='text-xs'>{mood.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Activities */}
              <div className='mb-6'>
                <h3 className='text-lg font-medium mb-4'>What activities did you do today?</h3>
                <div className='grid grid-cols-4 gap-2'>
                  {activities.map(activity => (
                    <button
                      key={activity.id}
                      onClick={() => toggleActivity(activity.id)}
                      className={`p-3 rounded-lg border transition-all ${
                        selectedActivities.includes(activity.id)
                          ? 'border-primary bg-primary bg-opacity-20'
                          : 'border-gray-600 hover:border-gray-500'
                      }`}
                    >
                      <div className='text-xl mb-1'>{activity.emoji}</div>
                      <div className='text-xs'>{activity.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Note */}
              <div className='mb-6'>
                <h3 className='text-lg font-medium mb-4'>Add a note (optional):</h3>
                <textarea
                  value={moodNote}
                  onChange={(e) => setMoodNote(e.target.value)}
                  placeholder="What influenced your mood today? Any thoughts or reflections..."
                  className='w-full bg-gray-800 border border-gray-600 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:border-primary'
                  rows={3}
                />
              </div>

              <button
                onClick={saveMoodEntry}
                disabled={!selectedMood}
                className='w-full bg-primary hover:bg-blue-600 disabled:bg-gray-600 text-white py-3 rounded-lg font-medium transition-colors'
              >
                Save Mood Entry
              </button>
            </div>

            {/* Mood History */}
            <div className='bg-gray-900 border border-gray-700 rounded-lg p-6'>
              <div className='flex justify-between items-center mb-6'>
                <h2 className='text-2xl font-semibold'>Mood History</h2>
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className='text-primary hover:text-blue-400 transition-colors'
                >
                  {showHistory ? 'Hide' : 'Show'} History
                </button>
              </div>

              {showHistory && (
                <div className='space-y-4 max-h-96 overflow-y-auto'>
                  {moodHistory.length === 0 ? (
                    <p className='text-gray-400 text-center py-8'>
                      No mood entries yet. Start tracking your mood to see your history here.
                    </p>
                  ) : (
                    moodHistory.slice(0, 10).map(entry => (
                      <div key={entry.id} className='bg-gray-800 rounded-lg p-4'>
                        <div className='flex items-center justify-between mb-2'>
                          <div className='flex items-center space-x-3'>
                            <span className='text-2xl'>{entry.mood.emoji}</span>
                            <div>
                              <div className='font-medium'>{entry.mood.label}</div>
                              <div className='text-sm text-gray-400'>{entry.date} at {entry.time}</div>
                            </div>
                          </div>
                        </div>
                        
                        {entry.activities.length > 0 && (
                          <div className='mb-2'>
                            <div className='text-sm text-gray-400 mb-1'>Activities:</div>
                            <div className='flex flex-wrap gap-1'>
                              {entry.activities.map(activityId => {
                                const activity = activities.find(a => a.id === activityId)
                                return activity ? (
                                  <span key={activityId} className='text-xs bg-gray-700 px-2 py-1 rounded'>
                                    {activity.emoji} {activity.name}
                                  </span>
                                ) : null
                              })}
                            </div>
                          </div>
                        )}
                        
                        {entry.note && (
                          <div className='text-sm text-gray-300 bg-gray-700 p-2 rounded'>
                            "{entry.note}"
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Insights */}
          <div className='mt-8 bg-gray-900 border border-gray-700 rounded-lg p-6'>
            <h2 className='text-2xl font-semibold mb-4'>Mood Insights</h2>
            <div className='grid md:grid-cols-2 gap-6'>
              <div>
                <h3 className='font-medium mb-2 text-green-400'>Tips for Better Mood:</h3>
                <ul className='text-sm text-gray-300 space-y-1'>
                  <li>• Regular exercise can boost mood naturally</li>
                  <li>• Maintain a consistent sleep schedule</li>
                  <li>• Practice mindfulness or meditation</li>
                  <li>• Stay connected with friends and family</li>
                  <li>• Spend time in nature when possible</li>
                </ul>
              </div>
              <div>
                <h3 className='font-medium mb-2 text-blue-400'>When to Seek Help:</h3>
                <ul className='text-sm text-gray-300 space-y-1'>
                  <li>• Persistent low mood for 2+ weeks</li>
                  <li>• Mood significantly impacts daily life</li>
                  <li>• Thoughts of self-harm or suicide</li>
                  <li>• Extreme mood swings</li>
                  <li>• Loss of interest in all activities</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MoodTracker