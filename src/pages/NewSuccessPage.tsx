
import { useNavigate, useLocation } from 'react-router-dom'

export default function NewSuccessPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const platform = location.state?.platform || 'selected platform'

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-primary-50 to-primary-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">          
            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
                <div className="mb-8">
                    <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>
                
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    Advertisement Published Successfully!
                </h1>
                
                <p className="text-lg text-gray-600 mb-8">
                    Your advertisement has been published to {platform}. You can now track its performance in the analytics dashboard.
                </p>

                <button
                    onClick={() => navigate('/analytics', { 
                        state: { 
                          businessId: location.state.businessId
                        } 
                      })}
                    className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
                >
                    Show Analytics
                </button>
            </div>
        </div>          
    </div>
    )
}