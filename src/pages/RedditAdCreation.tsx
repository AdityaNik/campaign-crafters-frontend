import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface RedditAd {
  title: string;
  description: string;
  callToAction: string;
  subreddit: string;
}

export default function RedditAdCreation() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [generatedAd, setGeneratedAd] = useState<RedditAd | null>(null)

  // Simulating ad generation
  useEffect(() => {
    const generateRedditAd = () => {
      // This is a mock ad. In the future, this will come from the backend
      const mockAd: RedditAd = {
        title: "Transform Your Fitness Journey with Premium Protein",
        description: "🚀 Scientifically formulated for maximum gains. Our premium whey protein powder delivers 24g of pure protein per serving, with zero artificial additives. Perfect for pre and post-workout nutrition. Join thousands of satisfied customers who've achieved their fitness goals!",
        callToAction: "🎯 Click to get 20% off your first order",
        subreddit: "r/Fitness"
      }

      setTimeout(() => {
        setGeneratedAd(mockAd)
        setLoading(false)
      }, 1500) // Simulate loading time
    }

    generateRedditAd()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-primary-50 to-primary-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <div className="flex items-center mb-8">
            <button
              onClick={() => navigate('/create-ad')}
              className="mr-4 text-primary-600 hover:text-primary-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Create Reddit Ad</h1>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
          ) : generatedAd && (
            <div className="space-y-8">
              <div className="bg-[#1A1A1B] text-white rounded-lg p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-1">
                    <div className="text-xs text-gray-400 mb-2">
                      Promoted • {generatedAd.subreddit}
                    </div>
                    <h2 className="text-lg font-semibold mb-3">
                      {generatedAd.title}
                    </h2>
                    <p className="text-gray-300 mb-4 whitespace-pre-line">
                      {generatedAd.description}
                    </p>
                    <div className="text-blue-400 font-medium">
                      {generatedAd.callToAction}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => navigate('/success', { state: { platform: 'Reddit' } })}
                  className="flex-1 px-6 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
                >
                  Publish Ad
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 