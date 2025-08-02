'use client'

import { useRouter } from 'next/navigation'
import Sidebar from './Sidebar'
import MapboxMap from './MapboxMap'
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { useState } from 'react'
import { Play, Download, Maximize2 } from 'lucide-react'

export default function Dashboard() {
  const router = useRouter()
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [videoModalType, setVideoModalType] = useState<'traffic' | 'road-accident'>('traffic')
  const [currentPotholeImage, setCurrentPotholeImage] = useState(1)

  // Pothole images array
  const potholeImages = [
    '/images/pothole-example1.svg',
    '/images/pothole-example2.svg',
    '/images/pothole-example3.svg',
    '/images/pothole-example4.svg',
    '/images/pothole-example5.svg',
    '/images/pothole-example6.svg'
  ]

  // Carousel navigation functions
  const nextPotholeImage = () => {
    setCurrentPotholeImage((prev) => prev === 6 ? 1 : prev + 1)
  }

  const prevPotholeImage = () => {
    setCurrentPotholeImage((prev) => prev === 1 ? 6 : prev - 1)
  }

  // Same mock data as Traffic Safety page
  const trafficViolationsData = [
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
    }
  ]

  // Same mock data as Road Accidents page
  const roadAccidentsData = [
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
    }
  ]

  return (
    <div className="flex h-screen bg-white">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">City Dashboard</h1>
          
          {/* Top Row - Traffic Violations and Potholes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Traffic Violations Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <img src="/images/partner1.svg" alt="Partner" className="w-[68px] h-[31px]" />
                    <span className="text-gray-400">×</span>
                    <img src="/images/partner3.svg" alt="Partner" className="w-[34px] h-[33px]" />
                  </div>
                  <h2 className="text-base font-semibold text-gray-900 leading-6 tracking-normal">Traffic Violations</h2>
                </div>
                <button 
                  onClick={() => router.push('/traffic-safety')}
                  className="text-sm text-primary-500 hover:text-primary-600"
                >
                  View all
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 font-medium text-gray-700">ID</th>
                      <th className="text-left py-2 font-medium text-gray-700">Type</th>
                      <th className="text-left py-2 font-medium text-gray-700">Plate</th>
                      <th className="text-left py-2 font-medium text-gray-700">Evidence</th>
                      <th className="text-left py-2 font-medium text-gray-700">Submitted By</th>
                      <th className="text-left py-2 font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trafficViolationsData.map((violation) => (
                      <tr key={violation.id} className="border-b border-gray-100">
                        <td className="py-2 text-gray-900">{violation.id}</td>
                        <td className="py-2 text-gray-900">{violation.type}</td>
                        <td className="py-2 text-gray-900">{violation.plate}</td>
                        <td className="py-2">
                          <button 
                            onClick={() => {
                              setVideoModalType('traffic')
                              setShowVideoModal(true)
                            }}
                            className="text-primary-500 hover:underline"
                          >
                            {violation.evidence}
                          </button>
                        </td>
                        <td className="py-2 text-gray-900">{violation.submittedBy}</td>
                        <td className="py-2">
                          <button 
                            onClick={() => router.push(`/traffic-safety/report/${violation.id}`)}
                            className="btn-primary px-3 py-1 text-xs"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Potholes Reported Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <img src="/images/partner1.svg" alt="Partner" className="w-[68px] h-[31px]" />
                    <span className="text-gray-400">×</span>
                    <img src="/images/partner2.svg" alt="Partner" className="w-[79px] h-[31px]" />
                  </div>
                  <h2 className="text-base font-semibold text-gray-900 leading-6 tracking-normal">Potholes Reported</h2>
                </div>
                <a href="#" className="text-sm text-primary-500 hover:text-primary-600">View all</a>
              </div>
              
              <div className="relative">
                {/* Image Carousel */}
                <div className="bg-gray-200 rounded-lg h-48 sm:h-64 flex items-center justify-center overflow-hidden">
                  <img 
                    src={potholeImages[currentPotholeImage - 1]} 
                    alt={`Pothole ${currentPotholeImage}`} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                
                {/* Navigation Buttons */}
                <button 
                  onClick={prevPotholeImage}
                  className="absolute top-2 right-12 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors"
                  style={{ width: '32px', height: '32px' }}
                >
                  <span className="text-gray-600 text-base">‹</span>
                </button>
                <button 
                  onClick={nextPotholeImage}
                  className="absolute top-2 right-2 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors"
                  style={{ width: '32px', height: '32px' }}
                >
                  <span className="text-gray-600 text-base">›</span>
                </button>
                
                {/* Details Section */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full space-y-3 sm:space-y-0 mt-4">
                  {/* Info Fields */}
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-12 text-sm">
                    {/* ID */}
                    <div>
                      <div className="text-gray-600 leading-none mb-1">ID</div>
                      <div className="text-primary-500 font-medium">AM01</div>
                    </div>

                    {/* Location */}
                    <div className="min-w-0 sm:min-w-[150px] sm:max-w-[200px]">
                      <div className="text-gray-600 leading-none mb-1">Location</div>
                      <div className="text-primary-500 font-medium truncate">
                        Aqabat Shaar, Aseer Pr...
                      </div>
                    </div>

                    {/* Reported By */}
                    <div>
                      <div className="text-gray-600 leading-none mb-1">Reported By</div>
                      <div className="text-primary-500 font-medium">A. Abbasi</div>
                    </div>
                  </div>

                  {/* View Button */}
                  <button
                    className="btn-primary text-white text-sm font-medium rounded-md w-full sm:w-auto"
                    style={{
                      width: '89px',
                      height: '28px',
                      lineHeight: '1',
                      padding: '0 12px'
                    }}
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Row - Road Accidents */}
          <div className="mb-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <img src="/images/partner1.svg" alt="Partner" className="w-[68px] h-[31px]" />
                    <span className="text-gray-400">×</span>
                    <img src="/images/partner4.svg" alt="Najm" className="w-[38px] h-[38px]" />
                  </div>
                  <h2 className="text-base font-semibold text-gray-900 leading-6 tracking-normal">Road Accidents</h2>
                </div>
                <button 
                  onClick={() => router.push('/road-accidents')}
                  className="text-sm text-primary-500 hover:text-primary-600"
                >
                  View all
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 font-medium text-gray-700">ID</th>
                      <th className="text-left py-2 font-medium text-gray-700">Location</th>
                      <th className="text-left py-2 font-medium text-gray-700">Time</th>
                      <th className="text-left py-2 font-medium text-gray-700">Plate</th>
                      <th className="text-left py-2 font-medium text-gray-700">Evidence</th>
                      <th className="text-left py-2 font-medium text-gray-700">Submitted By</th>
                      <th className="text-left py-2 font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {roadAccidentsData.map((accident) => (
                      <tr key={accident.id} className="border-b border-gray-100">
                        <td className="py-2 text-gray-900">{accident.id}</td>
                        <td className="py-2 text-gray-900">{accident.location}</td>
                        <td className="py-2 text-gray-900">{accident.time}</td>
                        <td className="py-2 text-gray-900">{accident.plate}</td>
                        <td className="py-2">
                          <button 
                            onClick={() => {
                              setVideoModalType('road-accident')
                              setShowVideoModal(true)
                            }}
                            className="text-primary-500 hover:underline"
                          >
                            {accident.evidence}
                          </button>
                        </td>
                        <td className="py-2 text-gray-900">{accident.submittedBy}</td>
                        <td className="py-2">
                          <button 
                            onClick={() => router.push(`/road-accidents/report/${accident.id}`)}
                            className="btn-primary px-3 py-1 text-xs"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Bin Checking Route Section */}
          <div className="rounded-xl border border-gray-200 p-6 shadow-sm bg-white">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <img src="/images/partner1.svg" alt="Partner 1" className="w-[68px] h-[31px]" />
                  <span className="text-gray-400">×</span>
                  <img src="/images/partner2.svg" alt="Partner 2" className="w-[79px] h-[31px]" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Bin Checking Route</h2>
              </div>
              <button 
                onClick={() => router.push('/municipality/waste-management')}
                className="text-sm text-[#447ABB] hover:underline"
              >
                View all
              </button>
            </div>
            {/* Main Layout */}
            <div className="grid grid-cols-10 gap-6 h-[368px]">
              {/* Map */}
              <div className="col-span-4 rounded-lg overflow-hidden">
                <MapboxMap
                  center={[39.8579, 21.4225]} // Mecca, Saudi Arabia coordinates
                  zoom={13}
                  showRoute={true}
                  startPoint={[39.8579, 21.4225]} // Starting point
                  endPoint={[39.8620, 21.4280]} // End point on Harmalah Bin Al Walid
                  waypoints={[
                    [39.8585, 21.4240], // First turn north
                    [39.8590, 21.4255], // East turn
                    [39.8600, 21.4265], // North again
                    [39.8605, 21.4270], // Complex loop
                    [39.8610, 21.4275], // Southeast turn
                    [39.8615, 21.4280], // Final approach
                    [39.8618, 21.4280]  // Near end point
                  ]}
                  routeColor="#374151"
                  markers={[
                    { id: 'start', coordinates: [39.8579, 21.4225], color: '#ef4444', size: 16, label: 'Start Point' },
                    { id: 'marker4', coordinates: [39.8580, 21.4235], color: '#22c55e', size: 14, label: 'Stop 4' },
                    { id: 'marker7', coordinates: [39.8585, 21.4250], color: '#eab308', size: 14, label: 'Stop 7' },
                    { id: 'marker9', coordinates: [39.8592, 21.4265], color: '#f97316', size: 14, label: 'Stop 9' },
                    { id: 'marker10', coordinates: [39.8600, 21.4275], color: '#eab308', size: 14, label: 'Stop 10' },
                    { id: 'marker11', coordinates: [39.8608, 21.4280], color: '#22c55e', size: 14, label: 'Stop 11' },
                    { id: 'marker12', coordinates: [39.8615, 21.4282], color: '#ec4899', size: 14, label: 'Stop 12' },
                    { id: 'marker13', coordinates: [39.8618, 21.4283], color: '#eab308', size: 14, label: 'Stop 13' },
                    { id: 'vehicle', coordinates: [39.8588, 21.4255], color: '#3b82f6', size: 20, label: 'Current Vehicle Location' },
                    { id: 'end', coordinates: [39.8620, 21.4280], color: '#3b82f6', size: 16, label: 'End Point' }
                  ]}
                  height="100%"
                  className="rounded-lg"
                  onMarkerClick={(markerId, coordinates) => {
                    console.log('Bin route marker clicked:', markerId, coordinates)
                  }}
                />
              </div>

              {/* Right Side - Graph and Timeline */}
              <div className="col-span-6 grid grid-cols-2 gap-0">
                {/* Timeline */}
                <div className="relative flex flex-col">
                  {/* Continuous vertical line - starts at first marker */}
                  <div className="relative flex flex-col before:absolute before:left-20 before:top-6 before:bottom-6 before:w-px before:bg-[#447ABB]">
                  
                  <div className="overflow-y-auto pr-2 max-h-[300px]">
                    {[
                      { time: '9:30AM', location: 'Al Aziziyah Street', distance: '' },
                      { time: '9:30AM', location: 'Misfalah Area', distance: '• 45KM' },
                      { time: '9:30AM', location: 'Ibrahim Al Khalil Street', distance: '• 45KM' },
                      { time: '9:30AM', location: 'Near Clock Tower / Ajyad', distance: '• 45KM' },
                      { time: '9:30AM', location: 'Jabal Al Kaaba Street', distance: '• 45KM' },
                      { time: '9:30AM', location: 'Al Hajoun Street', distance: '• 45KM' },
                      { time: '9:30AM', location: 'Al Jummayzah Street eastward', distance: '• 45KM' },
                      { time: '9:30AM', location: 'Al Taneem Road', distance: '• 45KM' }
                    ].map((item, index, arr) => (
                      <div key={index} className="relative flex items-center py-3">
                        {/* Time - Left side */}
                        <div className="w-16 text-xs text-gray-600">
                          {item.time}
                        </div>
                        
                        {/* Marker - Center */}
                        <div className="relative flex items-center justify-center w-8">
                          {/* Marker */}
                          <div
                            className={`z-10 bg-[#447ABB] ${
                              index === 0 
                                ? 'w-3 h-3 rounded-sm' 
                                : 'w-3 h-3 rounded-full'
                            }`}
                          />
                        </div>
                        
                        {/* Location - Right side */}
                        <div className="flex-1 text-sm text-gray-900">
                          {item.location} {item.distance}
                        </div>
                        
                        {/* Horizontal separation line - only for location area */}
                        {index > 0 && index < arr.length - 1 && (
                          <div className="absolute bottom-0 left-24 right-0 h-px bg-gray-200" />
                        )}
                      </div>
                    ))}
                  </div>
                  </div>
                </div>

                {/* Graph */}
                <div className="flex flex-col items-center justify-center">
                  {/* Legend */}
                  <div className="grid grid-cols-3 gap-x-2 gap-y-1 text-xs text-gray-700 mb-0">
                    {[
                      ['#14b8a6', 'Empty'],
                      ['#eab308', 'Moderate Filled'],
                      ['#f97316', 'Nearly Filled'],
                      ['#ef4444', 'Overflow'],
                      ['#6b7280', 'Offline']
                    ].map(([color, label], idx) => (
                      <div key={idx} className="flex items-center space-x-1">
                        <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: color as string }} />
                        <span>{label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Donut Chart */}
                  <div className="relative w-[250px] h-[250px] mb-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Empty', value: 174, color: '#14b8a6' },
                            { name: 'Moderate Filled', value: 87, color: '#eab308' },
                            { name: 'Nearly Filled', value: 145, color: '#f97316' },
                            { name: 'Overflow', value: 87, color: '#ef4444' },
                            { name: 'Offline', value: 87, color: '#6b7280' }
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={70}
                          paddingAngle={0}
                          dataKey="value"
                        >
                          {[
                            '#14b8a6',
                            '#eab308',
                            '#f97316',
                            '#ef4444',
                            '#6b7280'
                          ].map((color, index) => (
                            <Cell key={index} fill={color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <div className="text-3xl font-bold text-gray-900">580</div>
                      <div className="text-sm text-gray-500">Bins</div>
                    </div>
                  </div>

                  {/* Trend */}
                  <div className="flex items-center justify-center gap-1 text-xs text-gray-600">
                    <span>Trending up by 5.2% this month</span>
                    <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                </div>
              </div>
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
              <h3 className="text-lg font-semibold text-gray-900">
                {videoModalType === 'traffic' ? 'Traffic Video Report' : 'Road Accident Video Report'}
              </h3>
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
                  src={videoModalType === 'traffic' ? "/images/traffic-video-report.svg" : "/images/road-accident-video-report.svg"}
                  alt={videoModalType === 'traffic' ? "Traffic Video Report" : "Road Accident Video Report"}
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