import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

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
    id: 'twitter',
    name: 'Twitter',
    icon: 'https://abs.twimg.com/responsive-web/client-web/icon-ios.b1fc727a.png',
    description: 'Reach audiences through engaging tweets and media'
  },
  {
    id: 'reddit',
    name: 'Reddit',
    icon: 'https://www.redditstatic.com/desktop2x/img/favicon/android-icon-192x192.png',
    description: 'Connect with specific communities and interests'
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    icon: 'https://static.whatsapp.net/rsrc.php/v3/yP/r/rYZqPCBaG70.png',
    description: 'Share business updates directly with customers'
  }
]

interface BannerbearResponse {
  uid: string;
  status: string;
  image_url: string | null;
  image_url_png: string | null;
}

export default function AdCreationPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [generatedImageId, setGeneratedImageId] = useState('')
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    backgroundImage: 'https://cdn.vectorstock.com/i/1000v/03/31/whey-protein-powder-ad-poster-vector-47880331.jpg',
    titleText: 'Protein'
  })

  const pollImageStatus = async (uid: string) => {
    try {
      const response = await axios.get<BannerbearResponse>(`http://localhost:3000/create/image/${uid}`)
      if (response.data.status === 'completed' && response.data.image_url) {
        setGeneratedImageUrl(response.data.image_url)
        setLoading(false)
      } else if (response.data.status === 'pending') {
        // Poll again after 1 second
        setTimeout(() => pollImageStatus(uid), 1000)
      }
    } catch (error) {
      console.error('Error polling image status:', error)
      setLoading(false)
    }
  }

  const handleGenerateAd = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setGeneratedImageUrl(null)
    
    try {
      const createResponse = await axios.post<BannerbearResponse>('http://localhost:3000/create', {
        backgroundImage: formData.backgroundImage,
        titleText: formData.titleText
      })

      console.log('Create Response:', createResponse.data)
      
      if (createResponse.data.uid) {
        setGeneratedImageId(createResponse.data.uid)
        // Start polling for the image
        pollImageStatus(createResponse.data.uid)
      } else {
        throw new Error('No image ID received')
      }
      
    } catch (error) {
      console.error('Error generating ad:', error)
      alert('Error generating advertisement. Please try again.')
      setLoading(false)
    }
  }

  const handleViewFullImage = () => {
    if (generatedImageUrl) {
      window.open(generatedImageUrl, '_blank')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-primary-50 to-primary-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Create Your Ad Campaign</h1>

          {step === 1 ? (
            // Platform Selection Step
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
              {selectedPlatform && (
                <button
                  onClick={() => setStep(2)}
                  className="mt-8 w-full px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
                >
                  Continue to Ad Creation
                </button>
              )}
            </div>
          ) : (
            // Ad Generation Step
            <div>
              <button
                onClick={() => setStep(1)}
                className="mb-8 flex items-center text-primary-600 hover:text-primary-700"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Platform Selection
              </button>

              <form onSubmit={handleGenerateAd} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Background Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.backgroundImage}
                    onChange={(e) => setFormData({ ...formData, backgroundImage: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter image URL"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title Text
                  </label>
                  <input
                    type="text"
                    value={formData.titleText}
                    onChange={(e) => setFormData({ ...formData, titleText: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter ad title"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                >
                  {loading ? 'Generating...' : 'Generate Advertisement'}
                </button>
              </form>

              {generatedImageId && (
                <div className="mt-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Generated Advertisement</h2>
                  <div className="rounded-lg overflow-hidden shadow-lg bg-gray-50 p-4">
                    <div className="relative">
                      {generatedImageUrl ? (
                        <img 
                          src={generatedImageUrl}
                          alt="Generated Advertisement" 
                          className="w-full h-auto rounded-lg"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-64">
                          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
                        </div>
                      )}
                    </div>
                    {generatedImageUrl && (
                      <div className="mt-4 flex gap-4">
                        <button
                          onClick={handleViewFullImage}
                          className="flex-1 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                        >
                          View Full Image
                        </button>
                        <button
                          onClick={() => navigate('/success', { 
                            state: { platform: platforms.find(p => p.id === selectedPlatform)?.name } 
                          })}
                          className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                        >
                          Publish Ad
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 