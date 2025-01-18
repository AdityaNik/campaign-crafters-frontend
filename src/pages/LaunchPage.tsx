import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LaunchPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    companyName: '',
    website: '',
    productName: '',
    description: '',
    targetAudience: {
      ageRange: '',
      location: '',
      interests: '',
      demographics: ''
    },
    budget: '',
    goals: '',
    timeline: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/recommendations', { state: formData })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-primary-50 to-primary-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          {/* Back button */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-primary-600 hover:text-primary-700 mb-8"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </button>

          <div className="mb-12">
            <div className="flex justify-center space-x-4 mb-8">
              {[1, 2, 3].map((stepNumber) => (
                <div
                  key={stepNumber}
                  className={`w-14 h-14 rounded-full flex items-center justify-center ${
                    step >= stepNumber
                      ? 'bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-400'
                  } transition-all duration-200`}
                >
                  {stepNumber}
                </div>
              ))}
            </div>
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
              {step === 1 && 'Company Information'}
              {step === 2 && 'Product Details'}
              {step === 3 && 'Campaign Settings'}
            </h2>
            <p className="text-center text-gray-600 max-w-md mx-auto">
              {step === 1 && 'Tell us about your company'}
              {step === 2 && 'Describe your product or service'}
              {step === 3 && 'Set your campaign preferences'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                    placeholder="Enter your company name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website URL
                  </label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                    placeholder="https://example.com"
                    required
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={formData.productName}
                    onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                    placeholder="Enter product name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                    rows={4}
                    placeholder="Describe your product"
                    required
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Target Age Range
                    </label>
                    <input
                      type="text"
                      value={formData.targetAudience.ageRange}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          targetAudience: { ...formData.targetAudience, ageRange: e.target.value }
                        })
                      }
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                      placeholder="e.g., 18-35"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Target Location
                    </label>
                    <input
                      type="text"
                      value={formData.targetAudience.location}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          targetAudience: { ...formData.targetAudience, location: e.target.value }
                        })
                      }
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                      placeholder="e.g., India"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Campaign Budget
                  </label>
                  <input
                    type="text"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                    placeholder="Enter your budget"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Campaign Goals
                  </label>
                  <textarea
                    value={formData.goals}
                    onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                    rows={3}
                    placeholder="Describe your campaign goals"
                    required
                  />
                </div>
              </div>
            )}

            <div className="flex justify-between pt-8">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-3 text-primary-600 hover:text-primary-700 font-medium rounded-lg hover:bg-primary-50 transition-all duration-200"
                >
                  Previous
                </button>
              )}
              {step < 3 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white font-medium rounded-lg ml-auto shadow-md hover:shadow-lg transition-all duration-200"
                >
                  Next Step
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white font-medium rounded-lg ml-auto shadow-md hover:shadow-lg transition-all duration-200"
                >
                  Launch Campaign
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 