import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import LaunchPage from './pages/LaunchPage'
import CampaignRecommendationsPage from './pages/CampaignRecommendationsPage'
import geniusAiLogo from './assets/geniusAi.png'
import AdCreationPage from './pages/AdCreationPage'
import AnalyticsPage from './pages/AnalyticsPage'

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-md fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <img src={geniusAiLogo} alt="GeniusAI Logo" className="h-14 w-20 object-contain" />
            <span className="ml-2 text-xl font-semibold text-gray-900">CampaignGenius</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-8">
            <a href="#features" className="text-gray-700 hover:text-primary-600 transition-colors">Features</a>
            <a href="#pricing" className="text-gray-700 hover:text-primary-600 transition-colors">Pricing</a>
            <a href="#about" className="text-gray-700 hover:text-primary-600 transition-colors">About</a>
            <button 
              onClick={() => navigate('/launch')}
              className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-all transform hover:scale-105 shadow-md hover:shadow-lg text-lg"
            >
              Launch Campaign
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden absolute w-full bg-white/95 backdrop-blur-md shadow-lg">
          <div className="pt-2 pb-3 space-y-1">
            <a href="#features" className="block px-3 py-2 text-gray-700 hover:bg-primary-50">Features</a>
            <a href="#pricing" className="block px-3 py-2 text-gray-700 hover:bg-primary-50">Pricing</a>
            <a href="#about" className="block px-3 py-2 text-gray-700 hover:bg-primary-50">About</a>
            <div className="px-3 py-2">
              <button 
                onClick={() => {
                  navigate('/launch')
                  setIsMenuOpen(false)
                }}
                className="w-full bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Launch Campaign
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

function HomePage() {
  const navigate = useNavigate()
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-primary-50 to-primary-100">
      <Navigation />
      
      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="text-center mt-44">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Transform Your Marketing</span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400">
              with AI-Powered Campaigns
            </span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Revolutionize your advertising strategy with our cutting-edge AI platform. Create, optimize, and launch successful campaigns in minutes.
          </p>
          <div className="mt-12">
            <button
              onClick={() => navigate('/launch')}
              className="px-16 py-8 text-2xl font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 rounded-2xl transform hover:scale-105 transition-all duration-200 shadow-xl hover:shadow-2xl"
            >
              Launch Your Campaign
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/launch" element={<LaunchPage />} />
        <Route path="/recommendations" element={<CampaignRecommendationsPage />} />
        <Route path="/create-ad" element={<AdCreationPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
      </Routes>
    </Router>
  )
}

export default App
