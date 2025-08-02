'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Download, Bell } from 'lucide-react';
import Sidebar from './Sidebar';

interface PotholeDetail {
  id: string;
  number: string;
  width: number;
  length: number;
  depth: number;
  severity: 'Low' | 'Minor' | 'Moderate' | 'Severe';
  location: string;
  image: string;
}

interface PotholeReport {
  id: string;
  numberOfPotholes: number;
  street: string;
  vehicle: string;
  submittedBy: string;
  details: PotholeDetail[];
}

export default function PotholeDetectionReport({ id }: { id: string }) {
  const router = useRouter();
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>('');

  // Mock data based on the image
  const mockReport: PotholeReport = {
    id: 'AM01',
    numberOfPotholes: 5,
    street: 'King Abdul Aziz Road',
    vehicle: 'JV-8550',
    submittedBy: 'Omar Fadil',
    details: [
      {
        id: '1',
        number: '01',
        width: 0.75,
        length: 1.2,
        depth: 7.5,
        severity: 'Moderate',
        location: '18.2234°N, 42.4532°E',
        image: '/images/pothole-example2.svg'
      },
      {
        id: '2',
        number: '02',
        width: 0.45,
        length: 0.9,
        depth: 4.2,
        severity: 'Minor',
        location: '40.7128° N, 74.0060° W',
        image: '/images/pothole-example3.svg'
      },
      {
        id: '3',
        number: '03',
        width: 1.1,
        length: 2.3,
        depth: 12.6,
        severity: 'Severe',
        location: '40.7128° N, 74.0060° W',
        image: '/images/pothole-example4.svg'
      },
      {
        id: '4',
        number: '04',
        width: 0.6,
        length: 0.6,
        depth: 6.8,
        severity: 'Moderate',
        location: '51.5074° N, 0.1278° W',
        image: '/images/pothole-example5.svg'
      },
      {
        id: '5',
        number: '05',
        width: 0.3,
        length: 0.5,
        depth: 3.1,
        severity: 'Low',
        location: '35.6895° N, 139.6917° E',
        image: '/images/pothole-example6.svg'
      }
    ]
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Low':
        return 'text-green-600 bg-green-50';
      case 'Minor':
        return 'text-blue-600 bg-blue-50';
      case 'Moderate':
        return 'text-yellow-600 bg-yellow-50';
      case 'Severe':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const handleImageClick = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    setShowVideoModal(true);
  };

  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto p-x-28">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Pothole Detection</h1>
              <div className="text-sm text-gray-600 mt-1">
                <button
                  onClick={() => router.push('/municipality/pothole-detection')}
                  className="hover:text-primary-500 transition-colors"
                >
                  Municipality &gt; Pothole Detection
                </button>
                {' '}&gt;{' '}{mockReport.id} - Report
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
                Submitted by: <span className="font-medium text-gray-900">{mockReport.submittedBy}</span>
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
                <span className="font-medium text-gray-900">{mockReport.id}</span>
              </div>
              <div className="flex items-center px-4" style={{height: '50px', backgroundColor: 'var(--Primary-Blue-Color-50, #F2F8FC)'}}>
                <span className="text-sm text-gray-500">Street</span>
              </div>
              <div className="flex items-center px-4" style={{height: '50px'}}>
                <span className="font-medium text-gray-900">{mockReport.street}</span>
              </div>

              {/* Row 2 */}
              <div className="flex items-center px-4" style={{height: '50px', backgroundColor: 'var(--Primary-Blue-Color-50, #F2F8FC)'}}>
                <span className="text-sm text-gray-500">No. of Potholes</span>
              </div>
              <div className="flex items-center px-4" style={{height: '50px'}}>
                <span className="font-medium text-gray-900">{mockReport.numberOfPotholes.toString().padStart(2, '0')}</span>
              </div>
              <div className="flex items-center px-4" style={{height: '50px', backgroundColor: 'var(--Primary-Blue-Color-50, #F2F8FC)'}}>
                <span className="text-sm text-gray-500">Vehicle No.</span>
              </div>
              <div className="flex items-center px-4" style={{height: '50px'}}>
                <span className="font-medium text-gray-900">{mockReport.vehicle}</span>
              </div>

              {/* Row 3 */}
              <div className="flex items-center px-4" style={{height: '50px', backgroundColor: 'var(--Primary-Blue-Color-50, #F2F8FC)'}}>
                <span className="text-sm text-gray-500">Date</span>
              </div>
              <div className="flex items-center px-4" style={{height: '50px'}}>
                <span className="font-medium text-gray-900">1 August, 2025</span>
              </div>
              <div className="flex items-center px-4" style={{height: '50px', backgroundColor: 'var(--Primary-Blue-Color-50, #F2F8FC)'}}>
                <span className="text-sm text-gray-500">Time</span>
              </div>
              <div className="flex items-center px-4" style={{height: '50px'}}>
                <span className="font-medium text-gray-900">09:32 AM</span>
              </div>

              {/* Row 4 */}
              <div className="flex items-center px-4" style={{height: '50px', backgroundColor: 'var(--Primary-Blue-Color-50, #F2F8FC)'}}>
                <span className="text-sm text-gray-500">Weather</span>
              </div>
              <div className="flex items-center px-4" style={{height: '50px'}}>
                <span className="font-medium text-gray-900">Clear</span>
              </div>
              <div className="flex items-center px-4" style={{height: '50px', backgroundColor: 'var(--Primary-Blue-Color-50, #F2F8FC)'}}>
                <span className="text-sm text-gray-500">Road Condition</span>
              </div>
              <div className="flex items-center px-4" style={{height: '50px'}}>
                <span className="font-medium text-gray-900">Good</span>
              </div>
            </div>
          </div>

          {/* Pothole Details Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ backgroundColor: '#F3F7FB' }}>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No.</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Width (m)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Length (m)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estimated Depth (cm)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Images</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockReport.details.map((pothole) => (
                  <tr key={pothole.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {pothole.number}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {pothole.width}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {pothole.length}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {pothole.depth}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">
                        {pothole.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button 
                        onClick={() => setShowVideoModal(true)}
                        className="text-primary-600 hover:text-primary-800 text-sm"
                      >
                        {pothole.location}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button 
                        onClick={() => handleImageClick(pothole.image)}
                        className="w-[76px] h-[40px] rounded-lg overflow-hidden border border-gray-200 hover:border-gray-300 transition-colors"
                      >
                        <img 
                          src={pothole.image} 
                          alt={`Pothole ${pothole.number}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Pothole Image
              </h3>
              <button 
                onClick={() => setShowVideoModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video">
              <img 
                src={selectedImage}
                alt="Pothole Image"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 