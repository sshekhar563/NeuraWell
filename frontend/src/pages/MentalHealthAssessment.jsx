import React, { useState } from 'react'

const MentalHealthAssessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [assessmentType, setAssessmentType] = useState(null)

  const assessments = {
    anxiety: {
      title: "Anxiety Assessment (GAD-7)",
      description: "This assessment helps identify symptoms of generalized anxiety disorder.",
      questions: [
        "Feeling nervous, anxious, or on edge",
        "Not being able to stop or control worrying",
        "Worrying too much about different things",
        "Trouble relaxing",
        "Being so restless that it's hard to sit still",
        "Becoming easily annoyed or irritable",
        "Feeling afraid as if something awful might happen"
      ],
      options: [
        { value: 0, label: "Not at all" },
        { value: 1, label: "Several days" },
        { value: 2, label: "More than half the days" },
        { value: 3, label: "Nearly every day" }
      ]
    },
    depression: {
      title: "Depression Assessment (PHQ-9)",
      description: "This assessment helps identify symptoms of depression.",
      questions: [
        "Little interest or pleasure in doing things",
        "Feeling down, depressed, or hopeless",
        "Trouble falling or staying asleep, or sleeping too much",
        "Feeling tired or having little energy",
        "Poor appetite or overeating",
        "Feeling bad about yourself or that you are a failure",
        "Trouble concentrating on things",
        "Moving or speaking slowly, or being fidgety/restless",
        "Thoughts that you would be better off dead or hurting yourself"
      ],
      options: [
        { value: 0, label: "Not at all" },
        { value: 1, label: "Several days" },
        { value: 2, label: "More than half the days" },
        { value: 3, label: "Nearly every day" }
      ]
    },
    stress: {
      title: "Stress Level Assessment",
      description: "This assessment helps evaluate your current stress levels.",
      questions: [
        "How often have you felt overwhelmed by your responsibilities?",
        "How often have you had trouble sleeping due to stress?",
        "How often have you felt unable to cope with daily tasks?",
        "How often have you experienced physical symptoms of stress (headaches, muscle tension)?",
        "How often have you felt irritable or short-tempered?",
        "How often have you had difficulty concentrating?",
        "How often have you felt like you have no control over your life?"
      ],
      options: [
        { value: 0, label: "Never" },
        { value: 1, label: "Rarely" },
        { value: 2, label: "Sometimes" },
        { value: 3, label: "Often" },
        { value: 4, label: "Very often" }
      ]
    }
  }

  const getResults = () => {
    const assessment = assessments[assessmentType]
    const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0)
    const maxScore = assessment.questions.length * (assessment.options.length - 1)
    const percentage = (totalScore / maxScore) * 100

    let severity, recommendation, color

    if (assessmentType === 'anxiety') {
      if (totalScore <= 4) {
        severity = "Minimal Anxiety"
        recommendation = "Your anxiety levels appear to be minimal. Continue with healthy lifestyle practices."
        color = "text-green-400"
      } else if (totalScore <= 9) {
        severity = "Mild Anxiety"
        recommendation = "You may be experiencing mild anxiety. Consider stress management techniques and monitor your symptoms."
        color = "text-yellow-400"
      } else if (totalScore <= 14) {
        severity = "Moderate Anxiety"
        recommendation = "You may be experiencing moderate anxiety. Consider speaking with a mental health professional."
        color = "text-orange-400"
      } else {
        severity = "Severe Anxiety"
        recommendation = "You may be experiencing severe anxiety. We strongly recommend consulting with a mental health professional."
        color = "text-red-400"
      }
    } else if (assessmentType === 'depression') {
      if (totalScore <= 4) {
        severity = "Minimal Depression"
        recommendation = "Your depression symptoms appear to be minimal. Continue with healthy lifestyle practices."
        color = "text-green-400"
      } else if (totalScore <= 9) {
        severity = "Mild Depression"
        recommendation = "You may be experiencing mild depression. Consider lifestyle changes and monitor your mood."
        color = "text-yellow-400"
      } else if (totalScore <= 14) {
        severity = "Moderate Depression"
        recommendation = "You may be experiencing moderate depression. Consider speaking with a mental health professional."
        color = "text-orange-400"
      } else if (totalScore <= 19) {
        severity = "Moderately Severe Depression"
        recommendation = "You may be experiencing moderately severe depression. We recommend consulting with a mental health professional."
        color = "text-red-400"
      } else {
        severity = "Severe Depression"
        recommendation = "You may be experiencing severe depression. Please seek immediate professional help."
        color = "text-red-500"
      }
    } else {
      if (percentage <= 25) {
        severity = "Low Stress"
        recommendation = "Your stress levels appear to be manageable. Keep up your current coping strategies."
        color = "text-green-400"
      } else if (percentage <= 50) {
        severity = "Moderate Stress"
        recommendation = "You're experiencing moderate stress. Consider implementing stress reduction techniques."
        color = "text-yellow-400"
      } else if (percentage <= 75) {
        severity = "High Stress"
        recommendation = "You're experiencing high stress levels. Consider professional support and stress management strategies."
        color = "text-orange-400"
      } else {
        severity = "Very High Stress"
        recommendation = "You're experiencing very high stress levels. We strongly recommend seeking professional support."
        color = "text-red-400"
      }
    }

    return { severity, recommendation, color, totalScore, maxScore }
  }

  const handleAnswer = (questionIndex, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: value
    }))
  }

  const nextQuestion = () => {
    if (currentQuestion < assessments[assessmentType].questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  const resetAssessment = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setShowResults(false)
    setAssessmentType(null)
  }

  if (!assessmentType) {
    return (
      <div className='bg-black min-h-screen text-white'>
        <div className='container mx-auto px-4 py-8'>
          <div className='text-center mb-12'>
            <h1 className='text-4xl font-bold text-primary mb-4'>Mental Health Assessment</h1>
            <p className='text-gray-300 max-w-2xl mx-auto'>
              Take a confidential self-assessment to better understand your mental health. 
              These tools can help identify areas where you might benefit from additional support.
            </p>
          </div>

          <div className='max-w-4xl mx-auto grid md:grid-cols-3 gap-6'>
            <div 
              onClick={() => setAssessmentType('anxiety')}
              className='bg-gray-900 border border-gray-700 rounded-lg p-6 cursor-pointer hover:border-primary transition-colors'
            >
              <div className='text-center'>
                <div className='w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <span className='text-2xl'>😰</span>
                </div>
                <h3 className='text-xl font-semibold mb-2'>Anxiety Assessment</h3>
                <p className='text-gray-400 text-sm mb-4'>
                  Evaluate symptoms of generalized anxiety disorder using the GAD-7 scale.
                </p>
                <div className='text-primary font-medium'>Take Assessment →</div>
              </div>
            </div>

            <div 
              onClick={() => setAssessmentType('depression')}
              className='bg-gray-900 border border-gray-700 rounded-lg p-6 cursor-pointer hover:border-primary transition-colors'
            >
              <div className='text-center'>
                <div className='w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <span className='text-2xl'>😔</span>
                </div>
                <h3 className='text-xl font-semibold mb-2'>Depression Assessment</h3>
                <p className='text-gray-400 text-sm mb-4'>
                  Screen for depression symptoms using the PHQ-9 questionnaire.
                </p>
                <div className='text-primary font-medium'>Take Assessment →</div>
              </div>
            </div>

            <div 
              onClick={() => setAssessmentType('stress')}
              className='bg-gray-900 border border-gray-700 rounded-lg p-6 cursor-pointer hover:border-primary transition-colors'
            >
              <div className='text-center'>
                <div className='w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <span className='text-2xl'>😤</span>
                </div>
                <h3 className='text-xl font-semibold mb-2'>Stress Assessment</h3>
                <p className='text-gray-400 text-sm mb-4'>
                  Measure your current stress levels and identify coping needs.
                </p>
                <div className='text-primary font-medium'>Take Assessment →</div>
              </div>
            </div>
          </div>

          <div className='max-w-4xl mx-auto mt-12 p-6 bg-gray-900 rounded-lg border border-gray-700'>
            <h3 className='text-lg font-semibold mb-4 text-yellow-400'>Important Disclaimer</h3>
            <ul className='text-sm text-gray-300 space-y-2'>
              <li>• These assessments are screening tools and not diagnostic instruments</li>
              <li>• Results should not replace professional medical or psychological evaluation</li>
              <li>• If you're experiencing thoughts of self-harm, please seek immediate professional help</li>
              <li>• All responses are confidential and not stored permanently</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }

  const assessment = assessments[assessmentType]

  if (showResults) {
    const results = getResults()
    
    return (
      <div className='bg-black min-h-screen text-white'>
        <div className='container mx-auto px-4 py-8'>
          <div className='max-w-2xl mx-auto'>
            <div className='text-center mb-8'>
              <h1 className='text-3xl font-bold text-primary mb-4'>Assessment Results</h1>
              <h2 className='text-xl text-gray-300'>{assessment.title}</h2>
            </div>

            <div className='bg-gray-900 rounded-lg border border-gray-700 p-6 mb-6'>
              <div className='text-center mb-6'>
                <div className={`text-3xl font-bold ${results.color} mb-2`}>
                  {results.severity}
                </div>
                <div className='text-gray-400'>
                  Score: {results.totalScore} / {results.maxScore}
                </div>
              </div>

              <div className='bg-gray-800 rounded-lg p-4 mb-6'>
                <h3 className='font-semibold mb-2'>Recommendation:</h3>
                <p className='text-gray-300'>{results.recommendation}</p>
              </div>

              <div className='space-y-4'>
                <h3 className='font-semibold'>Next Steps:</h3>
                <div className='grid gap-3'>
                  <button className='bg-primary hover:bg-blue-600 text-white p-3 rounded-lg text-left transition-colors'>
                    💬 Talk to NeuraWell AI Therapist
                  </button>
                  <button className='bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-lg text-left transition-colors'>
                    📅 Schedule Professional Consultation
                  </button>
                  <button className='bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-lg text-left transition-colors'>
                    📚 Access Mental Health Resources
                  </button>
                </div>
              </div>
            </div>

            <div className='text-center space-x-4'>
              <button
                onClick={resetAssessment}
                className='bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors'
              >
                Take Another Assessment
              </button>
              <button
                onClick={() => window.history.back()}
                className='bg-primary hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors'
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='bg-black min-h-screen text-white'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
          <div className='text-center mb-8'>
            <h1 className='text-3xl font-bold text-primary mb-4'>{assessment.title}</h1>
            <p className='text-gray-300 mb-4'>{assessment.description}</p>
            <div className='text-sm text-gray-400'>
              Question {currentQuestion + 1} of {assessment.questions.length}
            </div>
          </div>

          <div className='bg-gray-900 rounded-lg border border-gray-700 p-6'>
            <div className='mb-6'>
              <div className='w-full bg-gray-700 rounded-full h-2 mb-4'>
                <div 
                  className='bg-primary h-2 rounded-full transition-all duration-300'
                  style={{ width: `${((currentQuestion + 1) / assessment.questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className='mb-8'>
              <h2 className='text-xl font-semibold mb-6'>
                Over the last 2 weeks, how often have you been bothered by:
              </h2>
              <p className='text-lg text-gray-300 mb-6'>
                "{assessment.questions[currentQuestion]}"
              </p>

              <div className='space-y-3'>
                {assessment.options.map((option, index) => (
                  <label
                    key={index}
                    className={`block p-4 rounded-lg border cursor-pointer transition-colors ${
                      answers[currentQuestion] === option.value
                        ? 'border-primary bg-primary bg-opacity-20'
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${currentQuestion}`}
                      value={option.value}
                      onChange={() => handleAnswer(currentQuestion, option.value)}
                      className='sr-only'
                    />
                    <div className='flex items-center'>
                      <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                        answers[currentQuestion] === option.value
                          ? 'border-primary bg-primary'
                          : 'border-gray-400'
                      }`}>
                        {answers[currentQuestion] === option.value && (
                          <div className='w-2 h-2 bg-white rounded-full m-0.5'></div>
                        )}
                      </div>
                      <span>{option.label}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className='flex justify-between'>
              <button
                onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                disabled={currentQuestion === 0}
                className='bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 text-white px-6 py-2 rounded-lg transition-colors'
              >
                Previous
              </button>
              <button
                onClick={nextQuestion}
                disabled={answers[currentQuestion] === undefined}
                className='bg-primary hover:bg-blue-600 disabled:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors'
              >
                {currentQuestion === assessment.questions.length - 1 ? 'Get Results' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MentalHealthAssessment