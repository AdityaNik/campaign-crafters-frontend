import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface TwitterAd {
  mainText: string;
  hashtags: string[];
  mediaUrl: string;
  metrics: {
    likes: number;
    retweets: number;
    replies: number;
  }
}

export default function TwitterAdCreation() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [generatedAd, setGeneratedAd] = useState<TwitterAd | null>(null)

  useEffect(() => {
    const generateTwitterAd = () => {
      const mockAd: TwitterAd = {
        mainText: "Level up your fitness game! 💪 Our premium whey protein delivers 24g of pure protein per serving. Zero artificial additives, maximum gains.",
        hashtags: ["#FitnessGoals", "#ProteinPower", "#HealthyLifestyle"],
        mediaUrl: "https://cdn.vectorstock.com/i/1000v/03/31/whey-protein-powder-ad-poster-vector-47880331.jpg",
        metrics: {
          likes: 1205,
          retweets: 328,
          replies: 42
        }
      }

      setTimeout(() => {
        setGeneratedAd(mockAd)
        setLoading(false)
      }, 1500)
    }

    generateTwitterAd()
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
            <h1 className="text-3xl font-bold text-gray-900">Create Twitter Ad</h1>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
          ) : generatedAd && (
            <div className="space-y-8">
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className="font-bold text-gray-900">Your Brand</span>
                      <span className="ml-2 text-gray-500">@yourbrand • Promoted</span>
                    </div>
                    <p className="text-gray-900 mb-4">{generatedAd.mainText}</p>
                    <p className="text-primary-600 mb-4">
                      {generatedAd.hashtags.join(' ')}
                    </p>
                    <img 
                      src={generatedAd.mediaUrl} 
                      alt="Ad Media"
                      className="rounded-xl w-full mb-4"
                    />
                    <div className="flex space-x-12 text-gray-500">
                      <span>{generatedAd.metrics.replies} Replies</span>
                      <span>{generatedAd.metrics.retweets} Retweets</span>
                      <span>{generatedAd.metrics.likes} Likes</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => navigate('/success', { state: { platform: 'Twitter' } })}
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