'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import MapboxMap from './MapboxMap'
import { ArrowLeft, Download, Bell, Play, Maximize2 } from 'lucide-react'

interface ReportPageProps {
  type: 'traffic-safety' | 'road-accidents'
}

export default function ReportPage({ type }: ReportPageProps) {
  const params = useParams()
  const router = useRouter()
  const reportId = params.id as string
  const [isClient, setIsClient] = useState(false)
  const [showVideoModal, setShowVideoModal] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Comprehensive mock data for different report types
  const getReportData = (id: string) => {
    if (type === 'traffic-safety') {
      const trafficReports: { [key: string]: any } = {
        'MO1': {
          id: 'MO1',
          submittedBy: 'A. Abbasi',
          time: '09:32 AM',
          street: 'King Abdulaziz Road, Abha',
          trafficConcern: 'Speeding',
          location: '18.2234°N, 42.4532°E',
          date: '1 August, 2025',
          plate: 'Not Detected',
          speed: '120 Km/hr',
          videoDuration: '02:15',
          currentTime: '01:08',
          weather: 'Clear',
          roadCondition: 'Good'
        },
        'MO2': {
          id: 'MO2',
          submittedBy: 'B. Caldwell',
          time: '03:45 PM',
          street: 'Olaya Street, Riyadh',
          trafficConcern: 'Illegal Parking',
          location: '24.7136°N, 46.6753°E',
          date: '25 June, 2024',
          plate: 'LMO-4587',
          speed: '0 Km/hr',
          videoDuration: '01:45',
          currentTime: '00:45',
          weather: 'Sunny',
          roadCondition: 'Good'
        },
        'MO3': {
          id: 'MO3',
          submittedBy: 'C. Davies',
          time: '11:00 AM',
          street: 'Prince Sultan Road, Jeddah',
          trafficConcern: 'Harsh Breaking',
          location: '21.5433°N, 39.1678°E',
          date: '1 September, 2024',
          plate: 'PQR-5678',
          speed: '65 Km/hr',
          videoDuration: '01:30',
          currentTime: '00:45',
          weather: 'Cloudy',
          roadCondition: 'Wet'
        },
        'MO4': {
          id: 'MO4',
          submittedBy: 'D. El-Sayed',
          time: '06:15 PM',
          street: 'King Abdullah Road, Dammam',
          trafficConcern: 'Speeding',
          location: '26.4207°N, 50.0888°E',
          date: '14 December, 2024',
          plate: 'STU-9012',
          speed: '120 Km/hr',
          videoDuration: '02:50',
          currentTime: '01:38',
          weather: 'Clear',
          roadCondition: 'Excellent'
        },
        'MO5': {
          id: 'MO5',
          submittedBy: 'F. Gupta',
          time: '09:20 AM',
          street: 'King Khalid Road, Riyadh',
          trafficConcern: 'Unsafe lane changing',
          location: '24.7136°N, 46.6753°E',
          date: '7 January, 2025',
          plate: 'VWX-3456',
          speed: '45 Km/hr',
          videoDuration: '02:20',
          currentTime: '01:15',
          weather: 'Clear',
          roadCondition: 'Good'
        },
        'MO6': {
          id: 'MO6',
          submittedBy: 'G. Hernandez',
          time: '02:30 PM',
          street: 'Prince Mohammed Road, Jeddah',
          trafficConcern: 'Harsh Breaking',
          location: '21.5433°N, 39.1678°E',
          date: '15 January, 2025',
          plate: 'ABC-1234',
          speed: '70 Km/hr',
          videoDuration: '01:55',
          currentTime: '00:55',
          weather: 'Rainy',
          roadCondition: 'Slippery'
        }
      }
      return trafficReports[id] || trafficReports['MO1']
    } else {
      // Road Accidents data
      const roadAccidentReports: { [key: string]: any } = {
        'NO1': {
          id: 'NO1',
          submittedBy: 'A. Abbasi',
          time: '15 Minutes ago',
          street: 'King Fahd Road, Abha',
          accidentType: 'Rear-end Collision',
          location: '18.2234°N, 42.4532°E',
          date: '1 August, 2025',
          plate: 'Not Detected',
          severity: 'Minor',
          videoDuration: '02:15',
          currentTime: '01:08',
          weather: 'Clear',
          roadCondition: 'Good',
          vehiclesInvolved: 2,
          injuries: 'None'
        },
        'NO2': {
          id: 'NO2',
          submittedBy: 'B. Bakhshi',
          time: '42 Minutes ago',
          street: 'King Abdullah Road, Riyadh',
          accidentType: 'Side Impact',
          location: '24.7136°N, 46.6753°E',
          date: '25 June, 2024',
          plate: 'ABC-1234',
          severity: 'Moderate',
          videoDuration: '01:45',
          currentTime: '00:45',
          weather: 'Sunny',
          roadCondition: 'Good',
          vehiclesInvolved: 2,
          injuries: 'Minor'
        },
        'NO3': {
          id: 'NO3',
          submittedBy: 'C. Chen',
          time: '2 Hours ago',
          street: 'Prince Sultan Road, Jeddah',
          accidentType: 'Head-on Collision',
          location: '21.5433°N, 39.1678°E',
          date: '1 September, 2024',
          plate: 'XYZ-5678',
          severity: 'Major',
          videoDuration: '01:30',
          currentTime: '00:45',
          weather: 'Cloudy',
          roadCondition: 'Wet',
          vehiclesInvolved: 2,
          injuries: 'Serious'
        },
        'NO4': {
          id: 'NO4',
          submittedBy: 'D. Dasgupta',
          time: '8 Hours ago',
          street: 'Olaya Street, Dammam',
          accidentType: 'Rollover',
          location: '26.4207°N, 50.0888°E',
          date: '14 December, 2024',
          plate: 'Not Detected',
          severity: 'Major',
          videoDuration: '02:50',
          currentTime: '01:38',
          weather: 'Clear',
          roadCondition: 'Excellent',
          vehiclesInvolved: 1,
          injuries: 'Critical'
        },
        'NO5': {
          id: 'NO5',
          submittedBy: 'E. El-Sayed',
          time: '1 Day ago',
          street: 'Tahlia Street, Riyadh',
          accidentType: 'Multi-vehicle Pileup',
          location: '24.7136°N, 46.6753°E',
          date: '7 January, 2025',
          plate: 'DEF-9012',
          severity: 'Major',
          videoDuration: '02:20',
          currentTime: '01:15',
          weather: 'Clear',
          roadCondition: 'Good',
          vehiclesInvolved: 4,
          injuries: 'Multiple'
        },
        'NO6': {
          id: 'NO6',
          submittedBy: 'F. Flores',
          time: '2 Days ago',
          street: 'King Khalid Road, Jeddah',
          accidentType: 'Pedestrian Accident',
          location: '21.5433°N, 39.1678°E',
          date: '15 January, 2025',
          plate: 'GHI-3456',
          severity: 'Moderate',
          videoDuration: '01:55',
          currentTime: '00:55',
          weather: 'Rainy',
          roadCondition: 'Slippery',
          vehiclesInvolved: 1,
          injuries: 'Pedestrian'
        }
      }
      return roadAccidentReports[id] || roadAccidentReports['NO1']
    }
  }

  const reportData = getReportData(reportId)
  const pageTitle = type === 'traffic-safety' ? 'Traffic Safety' : 'Road Accidents'
  const backRoute = type === 'traffic-safety' ? '/traffic-safety' : '/road-accidents'

  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <div className="flex-1 overflow-auto p-x-28">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{pageTitle}</h1>
              <div className="text-sm text-gray-600 mt-1">
                <button
                  onClick={() => router.push(backRoute)}
                  className="hover:text-primary-500 transition-colors"
                >
                  {pageTitle}
                </button>
                {' '}&gt;{' '}{reportData.id} - Report
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <Bell className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Report Summary */}
          <div style={{marginBottom: '40px'}}>
            <div className="flex items-center justify-between mb-4">
              <div className="text-base text-black font-semibold">
                Submitted by: <span className="font-medium text-gray-900">{reportData.submittedBy}</span>
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 border border-primary-500 text-primary-500 rounded-lg hover:bg-primary-50 transition-colors">
                <img src="/icons/export-report-icon.svg" alt="Export Report" className="w-4 h-4" />
                <span>Export Report</span>
              </button>
            </div>
            <div className="grid grid-cols-4 divide-x divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden" style={{gridTemplateColumns: '178px 1fr 178px 1fr'}}>
              {/* Row 1 */}
              <div className="flex items-center px-4" style={{height: '50px', backgroundColor: 'var(--Primary-Blue-Color-50, #F2F8FC)'}}>
                <span className="text-sm text-gray-500">ID</span>
              </div>
              <div className="flex items-center px-4" style={{height: '50px'}}>
                <span className="font-medium text-gray-900">{reportData.id}</span>
              </div>
              <div className="flex items-center px-4" style={{height: '50px', backgroundColor: 'var(--Primary-Blue-Color-50, #F2F8FC)'}}>
                <span className="text-sm text-gray-500">Location</span>
              </div>
              <div className="flex items-center px-4" style={{height: '50px'}}>
                <span className="font-medium text-primary-500 underline">{reportData.location}</span>
              </div>

              {/* Row 2 */}
              <div className="flex items-center px-4" style={{height: '50px', backgroundColor: 'var(--Primary-Blue-Color-50, #F2F8FC)'}}>
                <span className="text-sm text-gray-500">Time</span>
              </div>
              <div className="flex items-center px-4" style={{height: '50px'}}>
                <span className="font-medium text-gray-900">{reportData.time}</span>
              </div>
              <div className="flex items-center px-4" style={{height: '50px', backgroundColor: 'var(--Primary-Blue-Color-50, #F2F8FC)'}}>
                <span className="text-sm text-gray-500">Date</span>
              </div>
              <div className="flex items-center px-4" style={{height: '50px'}}>
                <span className="font-medium text-gray-900">{reportData.date}</span>
              </div>

              {/* Row 3 */}
              <div className="flex items-center px-4" style={{height: '50px', backgroundColor: 'var(--Primary-Blue-Color-50, #F2F8FC)'}}>
                <span className="text-sm text-gray-500">Street</span>
              </div>
              <div className="flex items-center px-4" style={{height: '50px'}}>
                <span className="font-medium text-gray-900">{reportData.street}</span>
              </div>
              <div className="flex items-center px-4" style={{height: '50px', backgroundColor: 'var(--Primary-Blue-Color-50, #F2F8FC)'}}>
                <span className="text-sm text-gray-500">Plate</span>
              </div>
              <div className="flex items-center px-4" style={{height: '50px'}}>
                <span className="font-medium text-gray-900">{reportData.plate}</span>
              </div>
              
              {/* Row 4 */}
              <div className="flex items-center px-4" style={{height: '50px', backgroundColor: 'var(--Primary-Blue-Color-50, #F2F8FC)'}}>
                <span className="text-sm text-gray-500">
                  {type === 'traffic-safety' ? 'Traffic Concern' : 'Accident Type'}
                </span>
              </div>
              <div className="flex items-center px-4" style={{height: '50px'}}>
                <span className="font-medium text-gray-900">
                  {type === 'traffic-safety' ? reportData.trafficConcern : reportData.accidentType}
                </span>
              </div>
              <div className="flex items-center px-4" style={{height: '50px', backgroundColor: 'var(--Primary-Blue-Color-50, #F2F8FC)'}}>
                <span className="text-sm text-gray-500">
                  {type === 'traffic-safety' ? 'Speed' : 'Severity'}
                </span>
              </div>
              <div className="flex items-center px-4" style={{height: '50px'}}>
                <span className="font-medium text-gray-900">
                  {type === 'traffic-safety' ? reportData.speed : reportData.severity}
                </span>
              </div>
            </div>
          </div>

          {/* View Incident Section */}
          <div>
            <h2 className="text-base text-black font-semibold mb-4">View Incident</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Video Player */}
              <div className="space-y-4">
                <div 
                  className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video cursor-pointer"
                  onClick={() => setShowVideoModal(true)}
                >
                  {/* Video Frame - Using SVG placeholder */}
                  <img 
                    src={type === 'traffic-safety' ? "/images/traffic-video-report.svg" : "/images/road-accident-video-report.svg"}
                    alt="Video Report" 
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
                      <span className="text-white text-sm">{reportData.currentTime} / {reportData.videoDuration}</span>
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

              {/* Map */}
              <div className="space-y-4">
                {isClient ? (
                  <MapboxMap
                    center={[42.4532, 18.2234]} // Default coordinates
                    zoom={12}
                    showRoute={true}
                    startPoint={[42.4532, 18.2234]}
                    endPoint={[42.4600, 18.2300]}
                    routeColor="#447ABB"
                    incidentPoint={[42.4566, 18.2267]}
                    incidentLabel={`${type === 'traffic-safety' ? 'Traffic' : 'Road Accident'} Incident Location`}
                    height="100%"
                    className="rounded-lg overflow-hidden"
                    onMarkerClick={(markerId, coordinates) => {
                      console.log('Marker clicked:', markerId, coordinates)
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-gray-500">Loading map...</div>
                  </div>
                )}
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
                {type === 'traffic-safety' ? 'Traffic' : 'Road Accident'} Video Report
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
                  src={type === 'traffic-safety' ? "/images/traffic-video-report.svg" : "/images/road-accident-video-report.svg"}
                  alt="Video Report" 
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
                    <span className="text-white text-sm">{reportData.currentTime} / {reportData.videoDuration}</span>
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