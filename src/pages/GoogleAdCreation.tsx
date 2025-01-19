import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'

interface BannerbearImage {
  status: string;
  uid: string;
  image_url: string | null;
  image_url_png: string | null;
  modifications: {
    name: string;
    text?: string;
    image_url?: string;
    target?: string;
  }[];
}

interface BannerbearResponse {
  results: BannerbearImage[];
}

export default function GoogleAdCreation() {
  const navigate = useNavigate()
  const location = useLocation()
  const businessId = location.state?.businessId

  const [loading, setLoading] = useState(false)
  const [generatedImages, setGeneratedImages] = useState<{ uid: string; imageUrl: string | null }[]>([])
  const [error, setError] = useState<string | null>(null)

  const pollImageStatus = async (uid: string) => {
    if (!uid) {
      console.error('Invalid UID received')
      return
    }

    try {
      const response = await axios.get<BannerbearImage>(`http://localhost:3000/create/image/${uid}`)
      
      if (response.data.status === 'completed' && response.data.image_url) {
        setGeneratedImages(prev => {
          const existingIndex = prev.findIndex(img => img.uid === uid)
          if (existingIndex !== -1) {
            const newImages = [...prev]
            newImages[existingIndex] = { uid, imageUrl: response.data.image_url }
            return newImages
          }
          if (prev.length < 3) {
            return [...prev, { uid, imageUrl: response.data.image_url }]
          }
          return prev
        })
      } else if (response.data.status === 'pending') {
        setTimeout(() => pollImageStatus(uid), 1000)
      }
    } catch (error) {
      console.error('Error polling image status:', error)
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        setGeneratedImages(prev => prev.filter(img => img.uid !== uid))
      }
    }
  }

  const handleGenerateAd = async () => {
    setLoading(true)
    setGeneratedImages([])
    setError(null)
    
    try {
      const createResponse = await axios.post<BannerbearResponse>('http://localhost:3000/create')

      if (createResponse.data?.results && Array.isArray(createResponse.data.results)) {
        const validResults = createResponse.data.results
          .filter(result => result && result.uid)
          .reduce((unique: BannerbearImage[], item) => {
            return unique.some(u => u.uid === item.uid) ? unique : [...unique, item]
          }, [])
          .slice(0, 3)

        if (validResults.length === 0) {
          throw new Error('No valid images received')
        }

        setGeneratedImages(validResults.map((result, index) => ({
          uid: result.uid,
          imageUrl: null,
          id: `ad-${index + 1}`
        })))

        validResults.forEach(result => {
          pollImageStatus(result.uid)
        })
      } else {
        throw new Error('Invalid response format')
      }
    } catch (error) {
      console.error('Error generating ad:', error)
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        setError(error.response.data.message)
      } else {
        setError('Failed to generate advertisement. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    handleGenerateAd()
  }, [])

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-primary-50 to-primary-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
          <div className="text-red-600 mb-4">Error: {error}</div>
          <button
            onClick={() => handleGenerateAd()}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-primary-50 to-primary-100">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
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

            {generatedImages.length > 0 && generatedImages.every(img => img.imageUrl) && (
              <button
                onClick={() => navigate('/newSuccessPage', { state: { platform: 'Google Ads', businessId } })}
                className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
              >
                Publish All Ads
              </button>
            )}
          </div>

          {loading && generatedImages.length === 0 ? (
            <div className="flex items-center justify-center h-[600px]">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              {generatedImages.map((image, index) => (
                <div key={image.uid} className="flex flex-col">
                  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                    <div className="p-6 border-b border-gray-200 bg-gray-50">
                      <span className="font-medium text-gray-700 text-xl">Ad {index + 1}</span>
                    </div>
                    {image.imageUrl ? (
                      <div 
                        className="aspect-[4/3] relative cursor-pointer h-[500px]"
                        onClick={() => image.imageUrl && window.open(image.imageUrl, '_blank')}
                      >
                        <img 
                          src={image.imageUrl}
                          alt={`Generated Ad ${index + 1}`} 
                          className="absolute inset-0 w-fit h-fit object-contain p-6"
                        />
                      </div>
                    ) : (
                      <div className="aspect-[4/3] flex items-center justify-center bg-gray-50 h-[500px]">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 