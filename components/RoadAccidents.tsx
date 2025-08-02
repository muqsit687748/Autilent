'use client'

import Sidebar from './Sidebar'
import { ChevronDown, Bell, Calendar, Play, Download, Maximize2, MapPin } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

interface RoadAccident {
  id: string
  location: string
  time: string
  plate: string
  evidence: string
  submittedBy: string
  plateStatus: string
  date: string
}

export default function RoadAccidents() {
  const [showCalendar, setShowCalendar] = useState(false)
  const [showStreetDropdown, setShowStreetDropdown] = useState(false)
  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedStreet, setSelectedStreet] = useState('')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [showVideoModal, setShowVideoModal] = useState(false)

  const calendarRef = useRef<HTMLDivElement>(null)
  const streetRef = useRef<HTMLDivElement>(null)
  const sortRef = useRef<HTMLDivElement>(null)

  // Comprehensive mock data for 12 road accidents
  const mockData: RoadAccident[] = [
    {
      id: 'NO1',
      location: 'King Fahd Road, 18.2234°N, 42.4532°E',
      time: '15 Minutes ago',
      plate: 'Not Detected',
      evidence: 'View Instance',
      submittedBy: 'A. Abbasi',
      plateStatus: 'Not Detected',
      date: '12'
    },
    {
      id: 'NO2',
      location: 'King Abdullah Road, 34.0522°N, 118.2437°W',
      time: '42 Minutes ago',
      plate: 'ABC-1234',
      evidence: 'View Instance',
      submittedBy: 'B. Bakhshi',
      plateStatus: 'Detected',
      date: '13'
    },
    {
      id: 'NO3',
      location: 'Prince Sultan Road, 40.7128°N, 74.0060°W',
      time: '2 Hours ago',
      plate: 'XYZ-5678',
      evidence: 'View Instance',
      submittedBy: 'C. Chen',
      plateStatus: 'In Progress',
      date: '16'
    },
    {
      id: 'NO4',
      location: 'Olaya Street, 51.5074°N, 0.1278°W',
      time: '8 Hours ago',
      plate: 'Not Detected',
      evidence: 'View Instance',
      submittedBy: 'D. Dasgupta',
      plateStatus: 'Not Detected',
      date: '17'
    },
    {
      id: 'NO5',
      location: 'Tahlia Street, 35.6895°N, 139.6917°E',
      time: '1 Day ago',
      plate: 'DEF-9012',
      evidence: 'View Instance',
      submittedBy: 'E. El-Sayed',
      plateStatus: 'Error',
      date: '18'
    },
    {
      id: 'NO6',
      location: 'King Khalid Road, 48.8566°N, 2.3522°E',
      time: '2 Days ago',
      plate: 'GHI-3456',
      evidence: 'View Instance',
      submittedBy: 'F. Flores',
      plateStatus: 'Detected',
      date: '19'
    },
    {
      id: 'NO7',
      location: 'King Fahd Road, 55.7558°N, 37.6176°E',
      time: '3 Days ago',
      plate: 'JKL-7890',
      evidence: 'View Instance',
      submittedBy: 'G. Gupta',
      plateStatus: 'In Progress',
      date: '20'
    },
    {
      id: 'NO8',
      location: 'Prince Sultan Road, 19.4326°N, 99.1332°W',
      time: '4 Days ago',
      plate: 'Not Detected',
      evidence: 'View Instance',
      submittedBy: 'H. Hernandez',
      plateStatus: 'Not Detected',
      date: '23'
    },
    {
      id: 'NO9',
      location: 'Olaya Street, 39.9042°N, 116.4074°E',
      time: '5 Days ago',
      plate: 'MNO-1234',
      evidence: 'View Instance',
      submittedBy: 'I. Ivanov',
      plateStatus: 'Detected',
      date: '24'
    },
    {
      id: 'NO10',
      location: 'Tahlia Street, 28.6139°N, 77.2090°E',
      time: '6 Days ago',
      plate: 'PQR-5678',
      evidence: 'View Instance',
      submittedBy: 'J. Johnson',
      plateStatus: 'Error',
      date: '25'
    },
    {
      id: 'NO11',
      location: 'King Abdullah Road, 33.8688°S, 151.2093°E',
      time: '1 Week ago',
      plate: 'STU-9012',
      evidence: 'View Instance',
      submittedBy: 'K. Kim',
      plateStatus: 'Detected',
      date: '26'
    },
    {
      id: 'NO12',
      location: 'King Khalid Road, 23.6345°N, 102.5528°W',
      time: '1 Week ago',
      plate: 'VWX-3456',
      evidence: 'View Instance',
      submittedBy: 'L. Lee',
      plateStatus: 'In Progress',
      date: '30'
    }
  ]

  // Filter and sort data
  const filteredAndSortedData = mockData
    .filter(item => {
      const dateMatch = !selectedDate || item.date === selectedDate
      const streetMatch = !selectedStreet || item.location.includes(selectedStreet)
      
      return dateMatch && streetMatch
    })
    .sort((a, b) => {
      const idA = parseInt(a.id.replace('NO', ''))
      const idB = parseInt(b.id.replace('NO', ''))
      
      return sortOrder === 'asc' ? idA - idB : idB - idA
    })

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setShowCalendar(false)
      }
      if (streetRef.current && !streetRef.current.contains(event.target as Node)) {
        setShowStreetDropdown(false)
      }
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setShowSortDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const streetOptions = [
    'King Fahd Road',
    'King Abdullah Road',
    'Prince Sultan Road',
    'Olaya Street',
    'Tahlia Street',
    'King Khalid Road'
  ]

  const sortOptions = [
    { label: 'ID (Ascending)', value: 'asc' },
    { label: 'ID (Descending)', value: 'desc' }
  ]

  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold text-gray-900">Road Accidents</h1>
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <Bell className="w-5 h-5" />
              </button>
            </div>
            
            {/* Filters Row */}
            <div className="flex items-center justify-between">
              {/* Street Filter */}
              <div className="relative" ref={streetRef}>
                <button 
                  onClick={() => setShowStreetDropdown(!showStreetDropdown)}
                  className="flex items-center justify-between px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 min-w-[200px]"
                >
                  <div className="flex items-center space-x-2">
                    <img src="/icons/select-street-icon.svg" alt="Select Street" className="w-4 h-4" />
                    <span>{selectedStreet || 'Select Street'}</span>
                  </div>
                  <ChevronDown className="w-4 h-4 ml-2" />
                </button>
                
                {showStreetDropdown && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg p-2 z-10 min-w-[200px]">
                    <div className="text-xs font-medium text-gray-700 mb-2 px-2">Select Street</div>
                    <button
                      onClick={() => {
                        setSelectedStreet('')
                        setShowStreetDropdown(false)
                      }}
                      className="block w-full text-left px-2 py-1 text-sm text-gray-500 hover:bg-gray-100 rounded"
                    >
                      All Streets
                    </button>
                    {streetOptions.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSelectedStreet(option)
                          setShowStreetDropdown(false)
                        }}
                        className="block w-full text-left px-2 py-1 text-sm text-gray-900 hover:bg-gray-100 rounded"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Sort Button */}
              <div className="relative" ref={sortRef}>
                <button 
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                  <span>ID</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {showSortDropdown && (
                  <div className="absolute top-full right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg p-2 z-10 min-w-[180px]">
                    <div className="text-xs font-medium text-gray-700 mb-2 px-2">Sort by ID</div>
                    {sortOptions.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSortOrder(option.value as 'asc' | 'desc')
                          setShowSortDropdown(false)
                        }}
                        className={`block w-full text-left px-2 py-1 text-sm rounded ${
                          sortOrder === option.value 
                            ? 'bg-primary-50 text-primary-700' 
                            : 'text-gray-900 hover:bg-gray-100'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Data Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200" style={{ backgroundColor: '#F3F7FB' }}>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    <button className="flex items-center space-x-1 hover:text-gray-900">
                      <span>ID</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                      </svg>
                    </button>
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Location</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Time</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Plate</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Evidence</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Submitted By</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedData.length > 0 ? (
                  filteredAndSortedData.slice(0, 5).map((item, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-900">{item.id}</td>
                      <td className="py-3 px-4">
                        <a href="#" className="text-sm text-primary-500 hover:text-primary-600">{item.location}</a>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900">{item.time}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{item.plate}</td>
                      <td className="py-3 px-4">
                        <button 
                          onClick={() => setShowVideoModal(true)}
                          className="text-sm text-primary-500 hover:text-primary-600"
                        >
                          {item.evidence}
                        </button>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900">{item.submittedBy}</td>
                      <td className="py-3 px-4">
                        <a href={`/road-accidents/report/${item.id}`} className="text-sm text-primary-500 hover:text-primary-600">View Report</a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-gray-500">
                      No data found for the selected filters
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 mt-4">
            <div className="text-sm text-gray-700">
              {Math.min(5, filteredAndSortedData.length)} of {filteredAndSortedData.length} items
            </div>
            <div className="flex items-center space-x-1">
              <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">1</button>
              <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">2</button>
              <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">3</button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Road Accident Video Report</h3>
              <button 
                onClick={() => setShowVideoModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="p-4">
              <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video">
                {/* Video Frame - Using SVG placeholder */}
                <img 
                  src="/images/road-accident-video-report.svg" 
                  alt="Road Accident Video Report" 
                  className="w-full h-full object-cover"
                />
                
                {/* Video Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-3">
                  <div className="flex items-center space-x-3">
                    <button className="text-white hover:text-gray-300">
                      <Play className="w-5 h-5" />
                    </button>
                    <div className="flex-1">
                      <div className="w-full bg-gray-600 rounded-full h-1">
                        <div className="bg-white h-1 rounded-full" style={{ width: '55%' }}></div>
                      </div>
                    </div>
                    <span className="text-white text-sm">01:08 / 02:15</span>
                    <button className="text-white hover:text-gray-300">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="text-white hover:text-gray-300">
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 