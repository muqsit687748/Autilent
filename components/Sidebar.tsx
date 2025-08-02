'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import {
  ChevronDown, 
  LogOut,
  User,
} from 'lucide-react'

export default function Sidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const [isMunicipalityExpanded, setIsMunicipalityExpanded] = useState(false)

  const isActive = (path: string) => {
    return pathname === path
  }

  const isMunicipalityActive = () => {
    return pathname.startsWith('/municipality')
  }

  // Initialize municipality expansion state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('municipalityExpanded')
    if (savedState !== null) {
      setIsMunicipalityExpanded(JSON.parse(savedState))
    } else if (isMunicipalityActive()) {
      // Auto-expand if on municipality page and no saved state
      setIsMunicipalityExpanded(true)
      localStorage.setItem('municipalityExpanded', 'true')
    }
  }, [])

  // Auto-expand municipality when on municipality pages
  useEffect(() => {
    if (isMunicipalityActive()) {
      setIsMunicipalityExpanded(true)
      localStorage.setItem('municipalityExpanded', 'true')
    }
  }, [pathname])

  // Handle manual toggle and save to localStorage
  const handleMunicipalityToggle = () => {
    const newState = !isMunicipalityExpanded
    setIsMunicipalityExpanded(newState)
    localStorage.setItem('municipalityExpanded', JSON.stringify(newState))
  }

  return (
    <div className="w-64 bg-white shadow-lg">
      {/* Brand */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-center">
          <img src="/logos/autilent-logo.svg" alt="AUTILENT" className="w-[113px] h-[30px]" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        <button
          onClick={() => router.push('/dashboard')}
          className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
            isActive('/dashboard') 
              ? 'bg-primary-50 text-primary-600' 
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <img src="/icons/dashboard-nav-icon.svg" alt="Dashboard" className="w-5 h-5" />
          <span>Dashboard</span>
        </button>

        <button
          onClick={() => router.push('/traffic-safety')}
          className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
            isActive('/traffic-safety') 
              ? 'bg-primary-50 text-primary-600' 
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <img src="/icons/traffic-nav-icon.svg" alt="Traffic Safety" className="w-5 h-5" />
          <span>Traffic Safety</span>
        </button>

        <button
          onClick={() => router.push('/road-accidents')}
          className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
            isActive('/road-accidents') 
              ? 'bg-primary-50 text-primary-600' 
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <img src="/icons/accident-nav-icon.svg" alt="Road Accidents" className="w-5 h-5" />
          <span>Road Accidents</span>
        </button>

        <div>
          <button
            onClick={handleMunicipalityToggle}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
              isMunicipalityActive() 
                ? 'bg-primary-50 text-primary-600' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center space-x-3">
              <img src="/icons/municipality-nav-icon.svg" alt="Municipality" className="w-5 h-5" />
              <span>Municipality</span>
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform ${isMunicipalityExpanded ? 'rotate-180' : ''}`} />
          </button>
          
          {/* Sub-navigation items */}
          {isMunicipalityExpanded && (
            <div className="ml-6 mt-2 space-y-1 relative">
              {/* Continuous vertical line */}
              <div className="absolute left-2 top-0 bottom-0 w-px bg-gray-300" />
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  router.push('/municipality/pothole-detection');
                }}
                className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${
                  pathname.startsWith('/municipality/pothole-detection') 
                    ? 'text-primary-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className="text-sm ml-4">Pothole Detection</span>
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  router.push('/municipality/waste-management');
                }}
                className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${
                  isActive('/municipality/waste-management') 
                    ? 'text-primary-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className="text-sm ml-4">Waste Management</span>
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* User Profile */}
      <div className="absolute bottom-0 left-0 w-64 p-4 border-t border-gray-200 bg-white">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-gray-600" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-900">Abdul Muqsit</div>
            <button 
              onClick={() => router.push('/')}
              className="text-xs text-gray-500 hover:text-red-600 flex items-center space-x-1"
            >
              <LogOut className="w-3 h-3" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 