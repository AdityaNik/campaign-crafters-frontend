import { useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'

export default function CampaignRecommendationsPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [strategy, setStrategy] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStrategy = async () => {
      try {
        const response = await axios.post('http://localhost:3000/generate', {
          id_b: location.state.businessId
        })
        
        const strategyText = response.data.candidates[0].content.parts[0].text
        setStrategy(strategyText)
      } catch (error) {
        console.error('Error fetching strategy:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStrategy()
  }, [location.state.businessId])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-primary-50 to-primary-100 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Campaign Strategy</h1>
          
          <article className="prose prose-lg max-w-none">
            <ReactMarkdown>{strategy}</ReactMarkdown>
          </article>

          <div className="mt-12 flex justify-center">
            <button
              onClick={() => navigate('/create-ad')}
              className="px-12 py-6 text-xl font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 rounded-xl transform hover:scale-105 transition-all duration-200 shadow-xl hover:shadow-2xl"
            >
              Create Ad Campaign
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 