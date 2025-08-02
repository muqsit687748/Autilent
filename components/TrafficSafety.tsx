'use client'

import Sidebar from './Sidebar'
import { ChevronDown, Bell, Calendar, Play, Download, Maximize2 } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

interface TrafficViolation {
  id: string
  type: string
  plate: string
  evidence: string
  dateTime: string
  submittedBy: string
  plateStatus: string
  date: string
}

export default function TrafficSafety() {
  const [showCalendar, setShowCalendar] = useState(false)
  const [showSafetyDropdown, setShowSafetyDropdown] = useState(false)
  const [showPlateDropdown, setShowPlateDropdown] = useState(false)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedSafety, setSelectedSafety] = useState('')
  const [selectedPlate, setSelectedPlate] = useState('')
  const [showVideoModal, setShowVideoModal] = useState(false)

  const calendarRef = useRef<HTMLDivElement>(null)
  const safetyRef = useRef<HTMLDivElement>(null)
  const plateRef = useRef<HTMLDivElement>(null)

  // Comprehensive mock data for 12 traffic violations
  const mockData: TrafficViolation[] = [
    {
      id: 'MO1',
      type: 'Speeding',
      plate: 'LMO-4587',
      evidence: 'View Instance',
      dateTime: '12/04/2024 - 08:30 AM',
      submittedBy: 'A. Abbasi',
      plateStatus: 'Detected',
      date: '12'
    },
    {
      id: 'MO2',
      type: 'Illegal Parking',
      plate: 'LMO-4587',
      evidence: 'View Instance',
      dateTime: '25/06/2024 - 03:45 PM',
      submittedBy: 'B. Caldwell',
      plateStatus: 'Detected',
      date: '13'
    },
    {
      id: 'MO3',
      type: 'Harsh Breaking',
      plate: 'PQR-5678',
      evidence: 'View Instance',
      dateTime: '01/09/2024 - 11:00 AM',
      submittedBy: 'C. Davies',
      plateStatus: 'Error',
      date: '16'
    },
    {
      id: 'MO4',
      type: 'Speeding',
      plate: 'STU-9012',
      evidence: 'View Instance',
      dateTime: '14/12/2024 - 06:15 PM',
      submittedBy: 'D. El-Sayed',
      plateStatus: 'Undetected',
      date: '17'
    },
    {
      id: 'MO5',
      type: 'Unsafe lane changing',
      plate: 'VWX-3456',
      evidence: 'View Instance',
      dateTime: '07/01/2025 - 09:20 AM',
      submittedBy: 'F. Gupta',
      plateStatus: 'In progress',
      date: '18'
    },
    {
      id: 'MO6',
      type: 'Harsh Breaking',
      plate: 'ABC-1234',
      evidence: 'View Instance',
      dateTime: '15/01/2025 - 02:30 PM',
      submittedBy: 'G. Hernandez',
      plateStatus: 'Detected',
      date: '19'
    },
    {
      id: 'MO7',
      type: 'Over speeding',
      plate: 'DEF-5678',
      evidence: 'View Instance',
      dateTime: '20/01/2025 - 10:45 AM',
      submittedBy: 'H. Johnson',
      plateStatus: 'Error',
      date: '20'
    },
    {
      id: 'MO8',
      type: 'Wrong lane changing',
      plate: 'GHI-9012',
      evidence: 'View Instance',
      dateTime: '23/01/2025 - 07:15 PM',
      submittedBy: 'I. Kim',
      plateStatus: 'Undetected',
      date: '23'
    },
    {
      id: 'MO9',
      type: 'Illegal Parking',
      plate: 'JKL-3456',
      evidence: 'View Instance',
      dateTime: '24/01/2025 - 01:20 PM',
      submittedBy: 'J. Lee',
      plateStatus: 'In progress',
      date: '24'
    },
    {
      id: 'MO10',
      type: 'Speeding',
      plate: 'MNO-7890',
      evidence: 'View Instance',
      dateTime: '25/01/2025 - 04:30 PM',
      submittedBy: 'K. Martinez',
      plateStatus: 'Detected',
      date: '25'
    },
    {
      id: 'MO11',
      type: 'Harsh Breaking',
      plate: 'PQR-1234',
      evidence: 'View Instance',
      dateTime: '26/01/2025 - 11:45 AM',
      submittedBy: 'L. Nguyen',
      plateStatus: 'Error',
      date: '26'
    },
    {
      id: 'MO12',
      type: 'Over speeding',
      plate: 'RST-5678',
      evidence: 'View Instance',
      dateTime: '30/01/2025 - 08:00 PM',
      submittedBy: 'M. O\'Connor',
      plateStatus: 'Undetected',
      date: '30'
    }
  ]

  // Filter data based on selected filters
  const filteredData = mockData.filter(item => {
    const dateMatch = !selectedDate || item.date === selectedDate
    const safetyMatch = !selectedSafety || item.type === selectedSafety
    const plateMatch = !selectedPlate || item.plateStatus === selectedPlate
    
    return dateMatch && safetyMatch && plateMatch
  })

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setShowCalendar(false)
      }
      if (safetyRef.current && !safetyRef.current.contains(event.target as Node)) {
        setShowSafetyDropdown(false)
      }
      if (plateRef.current && !plateRef.current.contains(event.target as Node)) {
        setShowPlateDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const safetyOptions = [
    'Harsh Breaking',
    'Over speeding', 
    'Illegal Parking',
    'Wrong lane changing',
    'Unsafe lane changing',
    'Speeding'
  ]

  const plateOptions = [
    'Undetected',
    'Detected', 
    'Error',
    'In progress'
  ]

  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Traffic Safety</h1>
            <button className="p-2 text-gray-600 hover:text-gray-900">
              <Bell className="w-5 h-5" />
            </button>
          </div>

          {/* Filters */}
          <div className="flex gap-4 mb-6">
            {/* Date Calendar */}
            <div className="relative" ref={calendarRef}>
              <button 
                onClick={() => setShowCalendar(!showCalendar)}
                className="flex items-center justify-between px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 min-w-[140px]"
              >
                <span>{selectedDate ? `Date ${selectedDate}` : 'Select Date'}</span>
                <Calendar className={`w-4 h-4 ml-2 ${showCalendar ? 'text-primary-500' : ''}`} />
              </button>
              
              {showCalendar && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-10 min-w-[280px]" style={{zIndex: 1000}}>
                  <div className="text-center mb-3">
                    <h3 className="font-medium text-gray-900">January 2023</h3>
                  </div>
                  
                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-1 text-xs">
                    {/* Days of week */}
                    <div className="text-center py-1 text-gray-500 font-medium">M</div>
                    <div className="text-center py-1 text-gray-500 font-medium">T</div>
                    <div className="text-center py-1 text-gray-500 font-medium">W</div>
                    <div className="text-center py-1 text-gray-500 font-medium">T</div>
                    <div className="text-center py-1 text-gray-500 font-medium">F</div>
                    <div className="text-center py-1 text-gray-500 font-medium">S</div>
                    <div className="text-center py-1 text-gray-500 font-medium">S</div>
                    
                    {/* Dates */}
                    {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31].map((date) => {
                      const isSelected = date.toString() === selectedDate
                      const isActive = [12,13,16,17,18,19,20,23,24,25,26,30,31].includes(date)
                      const isInactive = [1,2,3,4,5,6,7,8,9,10,11,14,15,21,22,27,28,29].includes(date)
                      
                      return (
                        <button
                          key={date}
                          onClick={() => {
                            if (isActive) {
                              setSelectedDate(date.toString())
                              setShowCalendar(false)
                            }
                          }}
                          className={`text-center py-1 rounded-full w-8 h-8 text-sm ${
                            isSelected 
                              ? 'bg-primary-500 text-white' 
                              : isActive 
                              ? 'text-gray-900 hover:bg-gray-100' 
                              : 'text-gray-400'
                          }`}
                        >
                          {date}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
            
            {/* Safety Concern Dropdown */}
            <div className="relative" ref={safetyRef}>
              <button 
                onClick={() => setShowSafetyDropdown(!showSafetyDropdown)}
                className="flex items-center justify-between px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 min-w-[140px]"
              >
                <span>{selectedSafety || 'Safety Concern'}</span>
                <ChevronDown className="w-4 h-4 ml-2" />
              </button>
              
              {showSafetyDropdown && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg p-2 z-10 min-w-[200px]">
                  <div className="text-xs font-medium text-gray-700 mb-2 px-2">Select</div>
                  {safetyOptions.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedSafety(option)
                        setShowSafetyDropdown(false)
                      }}
                      className="block w-full text-left px-2 py-1 text-sm text-gray-900 hover:bg-gray-100 rounded"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Plate Status Dropdown */}
            <div className="relative" ref={plateRef}>
              <button 
                onClick={() => setShowPlateDropdown(!showPlateDropdown)}
                className="flex items-center justify-between px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 min-w-[140px]"
              >
                <span>{selectedPlate || 'Plate Status'}</span>
                <ChevronDown className="w-4 h-4 ml-2" />
              </button>
              
              {showPlateDropdown && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg p-2 z-10 min-w-[200px]">
                  <div className="text-xs font-medium text-gray-700 mb-2 px-2">Select</div>
                  {plateOptions.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedPlate(option)
                        setShowPlateDropdown(false)
                      }}
                      className="block w-full text-left px-2 py-1 text-sm text-gray-900 hover:bg-gray-100 rounded"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Clear Filters Button */}
            {(selectedDate || selectedSafety || selectedPlate) && (
              <button
                onClick={() => {
                  setSelectedDate('')
                  setSelectedSafety('')
                  setSelectedPlate('')
                }}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 underline"
              >
                Clear Filters
              </button>
            )}
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
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Plate</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Evidence</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Date & Time</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Submitted By</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-900">{item.id}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{item.type}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{item.plate}</td>
                      <td className="py-3 px-4">
                        <button 
                          onClick={() => setShowVideoModal(true)}
                          className="text-sm text-primary-500 hover:text-primary-600"
                        >
                          {item.evidence}
                        </button>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900">{item.dateTime}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{item.submittedBy}</td>
                      <td className="py-3 px-4">
                        <a href={`/traffic-safety/report/${item.id}`} className="text-sm text-primary-500 hover:text-primary-600">View Report</a>
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
              Showing {filteredData.length} of {mockData.length} items
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
              <h3 className="text-lg font-semibold text-gray-900">Traffic Video Report</h3>
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
                  src="/images/traffic-video-report.svg" 
                  alt="Traffic Video Report" 
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