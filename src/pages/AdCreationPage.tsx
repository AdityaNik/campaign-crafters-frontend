import { useNavigate } from 'react-router-dom'

interface AdPlatform {
  id: string
  name: string
  icon: string
  description: string
  recommended?: boolean
}

const platforms: AdPlatform[] = [
  {
    id: 'google',
    name: 'Google Ads',
    icon: 'https://www.gstatic.com/images/branding/product/2x/ads_96dp.png',
    description: 'Create compelling search and display ads',
    recommended: true
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    icon: 'https://static.whatsapp.net/rsrc.php/v3/yP/r/rYZqPCBaG70.png',
    description: 'Share business updates directly with customers',
    recommended: true
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
  }
]

export default function AdCreationPage() {
  const navigate = useNavigate()

  const handlePlatformSelect = (platformId: string) => {
    switch (platformId) {
      case 'google':
        navigate('/google-ad')
        break
      case 'twitter':
        navigate('/twitter-ad')
        break
      case 'reddit':
        navigate('/reddit-ad')
        break
      case 'whatsapp':
        navigate('/whatsapp-ad')
        break
    }
  }

  const recommendedPlatforms = platforms.filter(p => p.recommended)
  const otherPlatforms = platforms.filter(p => !p.recommended)

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-primary-50 to-primary-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Select Ad Platform</h1>
          
          {/* Recommended Platforms Section */}
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <div className="bg-green-500 w-2 h-2 rounded-full mr-3"></div>
              <h2 className="text-xl font-semibold text-gray-900">Recommended for You</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendedPlatforms.map((platform) => (
                <div
                  key={platform.id}
                  onClick={() => handlePlatformSelect(platform.id)}
                  className="relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 border-green-200 hover:border-green-400 bg-gradient-to-br from-green-50 to-white group"
                >
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                      Recommended
                    </span>
                  </div>
                  <img src={platform.icon} alt={platform.name} className="w-12 h-12 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600">
                    {platform.name}
                  </h3>
                  <p className="text-gray-600">{platform.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Other Platforms Section */}
          <div>
            <div className="flex items-center mb-6">
              <div className="bg-gray-400 w-2 h-2 rounded-full mr-3"></div>
              <h2 className="text-xl font-semibold text-gray-900">Other Platforms</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherPlatforms.map((platform) => (
                <div
                  key={platform.id}
                  onClick={() => handlePlatformSelect(platform.id)}
                  className="p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 border-gray-200 hover:border-primary-300 group"
                >
                  <img src={platform.icon} alt={platform.name} className="w-12 h-12 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600">
                    {platform.name}
                  </h3>
                  <p className="text-gray-600">{platform.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 