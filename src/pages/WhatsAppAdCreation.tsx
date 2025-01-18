import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import protin from '../assets/protin.jpg'
import proteinn from '../assets/proteinn.png'

interface WhatsAppAd {
  messageText: string;
  mediaUrl: string;
  callToAction: string;
  businessName: string;
}

export default function WhatsAppAdCreation() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [generatedAds, setGeneratedAds] = useState<WhatsAppAd[]>([])

  useEffect(() => {
    const generateWhatsAppAds = () => {
      const mockAds: WhatsAppAd[] = [
        {
          businessName: "FitLife Supplements",
          messageText: "🌟 Special Offer Alert! 🌟\n\nIntroducing our Premium Whey Protein:\n✅ 24g protein per serving\n✅ Zero artificial additives\n✅ Perfect for pre/post workout\n✅ Scientifically formulated\n\nLimited Time Offer: Get 20% OFF on your first order! 🎉",
          mediaUrl: "https://cdn.vectorstock.com/i/1000v/03/31/whey-protein-powder-ad-poster-vector-47880331.jpg",
          callToAction: "Shop Now 🛍️"
        },
        {
          businessName: "ProFit Nutrition",
          messageText: "💪 BULK UP WITH THE BEST! 💪\n\nPremium Gold Standard Whey:\n✨ 30g protein per scoop\n✨ Muscle recovery formula\n✨ Delicious flavors\n✨ Lab tested quality\n\nEarly Bird Offer: Buy 2 Get 1 Free! 🎊",
          mediaUrl: protin,
          callToAction: "Order Now 🏃‍♂️"
        },
        {
          businessName: "Elite Supplements",
          messageText: "🏆 PREMIUM PROTEIN POWDER 🏆\n\nLevel Up Your Gains:\n⚡️ Fast absorption formula\n⚡️ Added BCAAs & Glutamine\n⚡️ 100% pure whey isolate\n⚡️ Sugar-free formula\n\nExclusive Deal: 30% OFF Today! 💫",
          mediaUrl: proteinn,
          callToAction: "Get Yours 💪"
        }
      ]

      setTimeout(() => {
        setGeneratedAds(mockAds)
        setLoading(false)
      }, 1500)
    }

    generateWhatsAppAds()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-primary-50 to-primary-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
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
            <h1 className="text-3xl font-bold text-gray-900">Create WhatsApp Ad</h1>
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
                  
                  <div className="mt-4">
                    <button
                      onClick={() => navigate('/success', { state: { platform: 'WhatsApp' } })}
                      className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
                    >
                      Publish This Ad
                    </button>
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