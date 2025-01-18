import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface AdPlatform {
  id: string
  name: string
  icon: string
  description: string
}

const platforms: AdPlatform[] = [
  {
    id: 'google',
    name: 'Google Ads',
    icon: 'https://www.gstatic.com/images/branding/product/2x/ads_96dp.png',
    description: 'Create compelling search and display ads'
  },
  {
    id: 'facebook',
    name: 'Facebook & Instagram',
    icon: 'https://www.facebook.com/images/fb_icon_325x325.png',
    description: 'Reach audiences across Facebook and Instagram'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: 'https://content.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Bug.svg.original.svg',
    description: 'Target professional networks and B2B audiences'
  }
]

export default function AdCreationPage() {
  const navigate = useNavigate()
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null)
  const [generatedAd, setGeneratedAd] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleGenerateAd = async () => {
    if (!selectedPlatform) return
    
    setLoading(true)
    try {
      // Simulate API call to generate ad
      await new Promise(resolve => setTimeout(resolve, 2000))
      // In reality, you would get this URL from your backend
      setGeneratedAd('/sample-ad-image.jpg')
    } finally {
      setLoading(false)
    }
  }

  const handlePublishAd = () => {
    navigate('/analytics')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-primary-50 to-primary-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Create Your Ad Campaign</h1>

          {/* Platform Selection */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Select Platform</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {platforms.map((platform) => (
                <div
                  key={platform.id}
                  className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                    selectedPlatform === platform.id
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-200 hover:border-primary-300'
                  }`}
                  onClick={() => setSelectedPlatform(platform.id)}
                >
                  <img src={platform.icon} alt={platform.name} className="w-12 h-12 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{platform.name}</h3>
                  <p className="text-gray-600">{platform.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Ad Generation */}
          {selectedPlatform && (
            <div className="mb-12">
              <button
                onClick={handleGenerateAd}
                disabled={loading}
                className="w-full px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating Ad...
                  </span>
                ) : (
                  'Generate Ad'
                )}
              </button>
            </div>
          )}

          {/* Generated Ad Preview */}
          {generatedAd && (
            <div className="mb-12">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Ad Preview</h2>
              <div className="bg-gray-50 p-8 rounded-xl">
                <img src={generatedAd} alt="Generated Ad" className="max-w-full rounded-lg shadow-lg mx-auto" />
              </div>
              <button
                onClick={handlePublishAd}
                className="mt-8 w-full px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
              >
                Publish Ad
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 