import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

interface BannerbearResponse {
  uid: string;
  status: string;
  image_url: string | null;
  image_url_png: string | null;
}

export default function GoogleAdCreation() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [generatedImageId, setGeneratedImageId] = useState('')
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null)
  const staticData = {
    backgroundImage: 'https://cdn.vectorstock.com/i/1000v/03/31/whey-protein-powder-ad-poster-vector-47880331.jpg',
    titleText: 'Protein'
  }

  const pollImageStatus = async (uid: string) => {
    try {
      const response = await axios.get<BannerbearResponse>(`http://localhost:3000/create/image/${uid}`)
      if (response.data.status === 'completed' && response.data.image_url) {
        setGeneratedImageUrl(response.data.image_url)
        setLoading(false)
      } else if (response.data.status === 'pending') {
        setTimeout(() => pollImageStatus(uid), 1000)
      }
    } catch (error) {
      console.error('Error polling image status:', error)
      setLoading(false)
    }
  }

  const handleGenerateAd = async () => {
    setLoading(true)
    setGeneratedImageUrl(null)
    
    try {
      const createResponse = await axios.post<BannerbearResponse>('http://localhost:3000/create', {
        backgroundImage: staticData.backgroundImage,
        titleText: staticData.titleText
      })

      if (createResponse.data.uid) {
        setGeneratedImageId(createResponse.data.uid)
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

  useEffect(() => {
    handleGenerateAd()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-primary-50 to-primary-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
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
            <h1 className="text-3xl font-bold text-gray-900">Create Google Ad</h1>
          </div>

          {/* Generated Image Display */}
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
                      onClick={() => window.open(generatedImageUrl, '_blank')}
                      className="flex-1 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                    >
                      View Full Image
                    </button>
                    <button
                      onClick={() => navigate('/success', { state: { platform: 'Google Ads' } })}
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
      </div>
    </div>
  )
} 