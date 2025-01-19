import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

interface AdAnalytics {
  adId: string;
  impressions: number;
  clicks: number;
}

export default function AnalyticsPage() {
  const location = useLocation()
  const platform = location.state?.platform || 'Advertisement'
  const [selectedTimeframe, setSelectedTimeframe] = useState('7days')
  const navigate = useNavigate()
  
  // Mock data for demonstration - replace with actual API call
  const analyticsData: AdAnalytics[] = [
    {
      adId: 'Ad 1',
      impressions: 1500,
      clicks: 750,
    },
    {
      adId: 'Ad 2',
      impressions: 2000,
      clicks: 900,
    },
    {
      adId: 'Ad 3',
      impressions: 1800,
      clicks: 820,
    }
  ]

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            size: 16,
            weight: 'bold' as const
          },
          padding: 20
        }
      },
      title: {
        display: true,
        text: `${platform} Performance Analytics`,
        font: {
          size: 24,
          weight: 'bold' as const
        },
        padding: 20
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          font: {
            size: 14
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 16,
            weight: 'bold' as const
          }
        }
      }
    }
  }

  const chartData = {
    labels: analyticsData.map(data => data.adId),
    datasets: [
      {
        label: 'Impressions',
        data: analyticsData.map(data => data.impressions),
        backgroundColor: 'rgba(53, 162, 235, 0.8)',
        borderRadius: 6
      },
      {
        label: 'Clicks',
        data: analyticsData.map(data => data.clicks),
        backgroundColor: 'rgba(75, 192, 192, 0.8)',
        borderRadius: 6
      }
    ]
  }

  const totalImpressions = analyticsData.reduce((sum, data) => sum + data.impressions, 0)
  const totalClicks = analyticsData.reduce((sum, data) => sum + data.clicks, 0)
  const averageClickRate = ((totalClicks / totalImpressions) * 100).toFixed(1)

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-primary-50 to-primary-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <button onClick={() => navigate('/create-ad', {
            state: { 
              businessId: location?.state?.businessId
            } 
          })}>
            Go back
          </button>
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-gray-900">{platform} Analytics</h1>
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="px-4 py-2 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
            </select>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-base font-medium text-gray-500 mb-2">Total Impressions</h3>
              <p className="text-3xl font-bold text-gray-900">{totalImpressions.toLocaleString()}</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-base font-medium text-gray-500 mb-2">Total Clicks</h3>
              <p className="text-3xl font-bold text-gray-900">{totalClicks.toLocaleString()}</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-base font-medium text-gray-500 mb-2">Average Click Rate</h3>
              <p className="text-3xl font-bold text-gray-900">{averageClickRate}%</p>
            </div>
          </div>

          {/* Performance Chart */}
          <div className="bg-white p-8 rounded-xl border border-gray-200">
            <div className="h-[600px]">
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>

          {/* Individual Ad Performance */}
          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Individual Ad Performance</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {analyticsData.map((ad) => (
                <div key={ad.adId} className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{ad.adId}</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg text-gray-600">Impressions</span>
                      <span className="text-lg font-medium text-gray-900">{ad.impressions.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg text-gray-600">Clicks</span>
                      <span className="text-lg font-medium text-gray-900">{ad.clicks.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg text-gray-600">Click Rate</span>
                      <span className="text-lg font-medium text-gray-900">
                        {((ad.clicks / ad.impressions) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 