import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import protin from '../assets/protin.jpg'
import proteinn from '../assets/proteinn.png'
import axios from 'axios'

interface WhatsAppAd {
  messageText: string;
  mediaUrl: string;
  callToAction: string;
  businessName: string;
}

interface HookResponse {
  result: {
    id: number;
    businessId: number;
    reditString: string;
    whatsappString: string;
    twitterString: string;
    startDate: string;
    createdAt: string;
  }
}

export default function WhatsAppAdCreation() {
  const navigate = useNavigate()
  const location = useLocation()
  const businessId = location.state?.businessId
  
  const [loading, setLoading] = useState(true)
  const [generatedAds, setGeneratedAds] = useState<WhatsAppAd[]>([])
  const [adStrings, setAdStrings] = useState<HookResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAdStrings = async () => {
      if (!businessId) {
        setError('No business ID provided')
        setLoading(false)
        return
      }

      try {
        const response = await axios.post<HookResponse>('http://localhost:3000/gen_hook', {
          id_b: businessId
        })
        
        if (response.data && response.data.result) {
          setAdStrings(response.data)
          return response.data
        } else {
          throw new Error('Invalid response format')
        }
      } catch (error) {
        console.error('Error fetching ad strings:', error)
        if (axios.isAxiosError(error)) {
          setError(error.response?.data?.message || 'Failed to fetch ad content')
        } else {
          setError('An unexpected error occurred')
        }
        return null
      }
    }

    const generateWhatsAppAds = async () => {
      try {
        const adData = await fetchAdStrings()
        
        if (adData && adData.result) {
          const mockAds: WhatsAppAd[] = [
            {
              businessName: "FitLife Supplements",
              messageText: adData.result.whatsappString || "No content available",
              mediaUrl: "https://cdn.vectorstock.com/i/1000v/03/31/whey-protein-powder-ad-poster-vector-47880331.jpg",
              callToAction: "Shop Now 🛍️"
            },
            {
              businessName: "ProFit Nutrition",
              messageText: adData.result.reditString || "No content available",
              mediaUrl: protin,
              callToAction: "Order Now 🏃‍♂️"
            },
            {
              businessName: "Elite Supplements",
              messageText: adData.result.twitterString || "No content available",
              mediaUrl: proteinn,
              callToAction: "Get Yours 💪"
            }
          ]
          setGeneratedAds(mockAds)
        }
      } catch (error) {
        console.error('Error generating ads:', error)
        setError('Failed to generate ads')
      } finally {
        setLoading(false)
      }
    }

    generateWhatsAppAds()
  }, [businessId])

  const handlePublishAll = () => {
    if (!businessId) {
      alert('No business ID available')
      return
    }
    navigate('/success', { state: {  businessId: businessId, platform: 'WhatsApp' } })
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-primary-50 to-primary-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
          <div className="text-red-600 mb-4">Error: {error}</div>
          <button
            onClick={() => navigate('/create-ad')}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-primary-50 to-primary-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
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
              <h1 className="text-3xl font-bold text-gray-900">Create WhatsApp Ad</h1>
            </div>
            
            {!loading && (
              <button
                onClick={handlePublishAll}
                className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
              >
                Publish All Ads
              </button>
            )}
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {generatedAds.map((ad, index) => (
                <div key={index} className="flex flex-col">
                  <div className="bg-[#DCF8C6] rounded-xl p-6 flex-1">
                    <div className="mb-2 text-sm font-medium text-gray-700">{ad.businessName}</div>
                    <img 
                      src={ad.mediaUrl} 
                      alt="Product"
                      className="rounded-lg w-full mb-4 h-48 object-cover"
                    />
                    <p className="whitespace-pre-line text-gray-800 mb-4 text-sm leading-relaxed">
                      {ad.messageText}
                    </p>
                    <div className="bg-[#25D366] text-white px-4 py-2.5 rounded-full text-center font-medium text-sm hover:bg-[#1ea952] transition-colors cursor-pointer">
                      {ad.callToAction}
                    </div>
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