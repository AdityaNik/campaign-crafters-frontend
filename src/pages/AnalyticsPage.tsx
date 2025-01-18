import { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface AnalyticsData {
  impressions: number
  clicks: number
  engagement: number
  reach: number
  ctr: number
  dailyData: {
    date: string
    impressions: number
    clicks: number
  }[]
}

export default function AnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true)
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        // Mock data
        setAnalyticsData({
          impressions: 125000,
          clicks: 3200,
          engagement: 4500,
          reach: 98000,
          ctr: 2.56,
          dailyData: Array.from({ length: 7 }, (_, i) => ({
            date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
            impressions: Math.floor(Math.random() * 20000) + 10000,
            clicks: Math.floor(Math.random() * 500) + 200
          }))
        })
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-primary-50 to-primary-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700">Loading Analytics...</h2>
        </div>
      </div>
    )
  }

  if (!analyticsData) return null

  const chartData = {
    labels: analyticsData.dailyData.map(d => d.date),
    datasets: [
      {
        label: 'Impressions',
        data: analyticsData.dailyData.map(d => d.impressions),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
      },
      {
        label: 'Clicks',
        data: analyticsData.dailyData.map(d => d.clicks),
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
      }
    ]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-primary-50 to-primary-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Campaign Analytics</h1>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-primary-50 p-6 rounded-xl">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Total Impressions</h3>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.impressions.toLocaleString()}</p>
            </div>
            <div className="bg-green-50 p-6 rounded-xl">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Total Clicks</h3>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.clicks.toLocaleString()}</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-xl">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Total Reach</h3>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.reach.toLocaleString()}</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-xl">
              <h3 className="text-sm font-medium text-gray-500 mb-1">CTR</h3>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.ctr}%</p>
            </div>
          </div>

          {/* Performance Chart */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Performance Over Time</h2>
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <Line
                data={chartData}
                options={{
                  responsive: true,
                  interaction: {
                    mode: 'index' as const,
                    intersect: false,
                  },
                  plugins: {
                    legend: {
                      position: 'top' as const,
                    },
                    title: {
                      display: false,
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 