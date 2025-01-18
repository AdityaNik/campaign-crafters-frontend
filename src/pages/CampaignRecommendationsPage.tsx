import { useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

interface AIRecommendation {
  strategy: string
  platforms: {
    name: string
    reason: string
    estimatedReach: string
  }[]
  budgetAllocation: {
    platform: string
    percentage: number
    amount: string
  }[]
  timeline: {
    phase: string
    duration: string
    activities: string[]
  }[]
  targetingTips: string[]
}

export default function CampaignRecommendationsPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [recommendations, setRecommendations] = useState<AIRecommendation | null>(null)
  const formData = location.state

  useEffect(() => {
    // Simulate AI model processing
    const generateRecommendations = async () => {
      setLoading(true)
      try {
        // This is where you'd normally call your AI model API
        // For now, we'll simulate a response
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        setRecommendations({
          strategy: `Based on your product ${formData.productName} and target audience (${formData.targetAudience.ageRange}), 
            we recommend a multi-channel digital marketing approach focusing on brand awareness and engagement.`,
          platforms: [
            {
              name: "Instagram",
              reason: "High engagement rates among your target age group",
              estimatedReach: "50,000 - 75,000 impressions"
            },
            {
              name: "Google Ads",
              reason: "Direct response and high intent users",
              estimatedReach: "100,000 - 150,000 impressions"
            }
          ],
          budgetAllocation: [
            {
              platform: "Instagram",
              percentage: 40,
              amount: `₹${parseInt(formData.budget) * 0.4}`
            },
            {
              platform: "Google Ads",
              percentage: 60,
              amount: `₹${parseInt(formData.budget) * 0.6}`
            }
          ],
          timeline: [
            {
              phase: "Launch",
              duration: "2 weeks",
              activities: [
                "Initial brand awareness campaigns",
                "A/B testing of ad creatives",
                "Audience refinement"
              ]
            },
            {
              phase: "Scale",
              duration: "4 weeks",
              activities: [
                "Scale successful campaigns",
                "Retargeting campaigns",
                "Engagement optimization"
              ]
            }
          ],
          targetingTips: [
            "Focus on metropolitan areas in " + formData.targetAudience.location,
            "Use lifestyle and interest-based targeting",
            "Implement lookalike audiences based on early converters"
          ]
        })
      } catch (error) {
        console.error('Error generating recommendations:', error)
      } finally {
        setLoading(false)
      }
    }

    if (formData) {
      generateRecommendations()
    } else {
      navigate('/launch')
    }
  }, [formData, navigate])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-primary-50 to-primary-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700">Generating AI Recommendations...</h2>
          <p className="text-gray-500 mt-2">Analyzing your campaign requirements</p>
        </div>
      </div>
    )
  }

  if (!recommendations) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-primary-50 to-primary-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <button
            onClick={() => navigate('/launch')}
            className="flex items-center text-primary-600 hover:text-primary-700 mb-8"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Campaign Setup
          </button>

          <h1 className="text-3xl font-bold text-gray-900 mb-8">Your AI-Generated Campaign Strategy</h1>

          {/* Overall Strategy */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Campaign Strategy</h2>
            <p className="text-gray-700 bg-primary-50 p-6 rounded-xl">{recommendations.strategy}</p>
          </div>

          {/* Recommended Platforms */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recommended Platforms</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendations.platforms.map((platform, index) => (
                <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <h3 className="text-lg font-semibold text-primary-600 mb-2">{platform.name}</h3>
                  <p className="text-gray-600 mb-2">{platform.reason}</p>
                  <p className="text-sm text-gray-500">Expected Reach: {platform.estimatedReach}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Budget Allocation */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Budget Allocation</h2>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              {recommendations.budgetAllocation.map((allocation, index) => (
                <div key={index} className="flex items-center justify-between py-3">
                  <div>
                    <span className="font-medium text-gray-700">{allocation.platform}</span>
                    <span className="text-gray-500 ml-2">({allocation.percentage}%)</span>
                  </div>
                  <span className="font-semibold text-primary-600">{allocation.amount}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Campaign Timeline</h2>
            <div className="space-y-6">
              {recommendations.timeline.map((phase, index) => (
                <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-primary-600">{phase.phase}</h3>
                    <span className="text-sm text-gray-500">{phase.duration}</span>
                  </div>
                  <ul className="space-y-2">
                    {phase.activities.map((activity, actIndex) => (
                      <li key={actIndex} className="flex items-center text-gray-700">
                        <svg className="w-4 h-4 mr-2 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Targeting Tips */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Targeting Tips</h2>
            <div className="bg-primary-50 p-6 rounded-xl">
              <ul className="space-y-3">
                {recommendations.targetingTips.map((tip, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 flex justify-center">
            <button
              onClick={() => navigate('/create-ad')}
              className="px-12 py-6 text-xl font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 rounded-xl transform hover:scale-105 transition-all duration-200 shadow-xl hover:shadow-2xl"
            >
              Accept Strategy & Create Ad
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 