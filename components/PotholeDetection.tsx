'use client'

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown, MapPin, Bell, User, ArrowUpDown } from 'lucide-react';
import Sidebar from '@/components/Sidebar';

interface PotholeReport {
  id: string;
  street: string;
  numberOfPotholes: number;
  submittedBy: string;
  vehicle: string;
}

export default function PotholeDetection() {
  const router = useRouter();
  const [showStreetDropdown, setShowStreetDropdown] = useState(false);
  const [showIdDropdown, setShowIdDropdown] = useState(false);
  const [selectedStreet, setSelectedStreet] = useState('All Streets');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState<PotholeReport | null>(null);
  
  const streetDropdownRef = useRef<HTMLDivElement>(null);
  const idDropdownRef = useRef<HTMLDivElement>(null);

  // Mock data based on the image
  const mockData: PotholeReport[] = [
    { id: 'AM01', street: 'King Abdul Aziz Road', numberOfPotholes: 5, submittedBy: 'Omar Fadil', vehicle: 'JV-8550' },
    { id: 'AM02', street: 'King Khalid Road', numberOfPotholes: 12, submittedBy: 'Zayd Hassan', vehicle: 'JV-3422' },
    { id: 'AM03', street: 'Abha-Khamis Mushayt Highway', numberOfPotholes: 9, submittedBy: 'Layla Ahmed', vehicle: 'JV-3241' },
    { id: 'AM04', street: 'Abha Ring Road', numberOfPotholes: 3, submittedBy: 'Amina Khalid', vehicle: 'JV-7866' },
    { id: 'AM05', street: 'Valley Axes', numberOfPotholes: 4, submittedBy: 'Yusuf Tariq Al-Mutairi', vehicle: 'JV-3544' },
    { id: 'AM06', street: 'Al Sahabah Road', numberOfPotholes: 7, submittedBy: 'Fatima Zahra', vehicle: 'JV-1234' },
    { id: 'AM07', street: 'Al Andalus Street', numberOfPotholes: 6, submittedBy: 'Ahmed Hassan', vehicle: 'JV-5678' },
    { id: 'AM08', street: 'King Fahd Road', numberOfPotholes: 8, submittedBy: 'Sara Al-Mansouri', vehicle: 'JV-9012' },
    { id: 'AM09', street: 'Al Zahra District', numberOfPotholes: 2, submittedBy: 'Mohammed Ali', vehicle: 'JV-3456' },
    { id: 'AM10', street: 'Al Rihab Street', numberOfPotholes: 11, submittedBy: 'Noor Al-Sayed', vehicle: 'JV-7890' },
    { id: 'AM11', street: 'Al Malaz Road', numberOfPotholes: 4, submittedBy: 'Khalid Omar', vehicle: 'JV-2345' },
    { id: 'AM12', street: 'Al Olaya Street', numberOfPotholes: 6, submittedBy: 'Aisha Rahman', vehicle: 'JV-6789' },
  ];

  const streetOptions = ['All Streets', ...Array.from(new Set(mockData.map(item => item.street)))];

  // Filter and sort data
  const filteredData = mockData
    .filter(item => selectedStreet === 'All Streets' || item.street === selectedStreet)
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.id.localeCompare(b.id);
      } else {
        return b.id.localeCompare(a.id);
      }
    });

  // Pagination
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  // Click outside to close dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (streetDropdownRef.current && !streetDropdownRef.current.contains(event.target as Node)) {
        setShowStreetDropdown(false);
      }
      if (idDropdownRef.current && !idDropdownRef.current.contains(event.target as Node)) {
        setShowIdDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleViewReport = (report: PotholeReport) => {
    const url = `/municipality/pothole-detection/report/${report.id}`;
    router.push(url);
  };

  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Pothole Detection</h1>
            <div className="text-sm text-gray-600">
              Municipality &gt; Pothole Detection
            </div>
          </div>

          {/* Filters */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              {/* Street Filter */}
              <div className="relative" ref={streetDropdownRef}>
                <button
                  onClick={() => setShowStreetDropdown(!showStreetDropdown)}
                  className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
                >
                  <img src="/icons/select-street-icon.svg" alt="Select Street" className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-700">{selectedStreet}</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>
                
                {showStreetDropdown && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                    {streetOptions.map((street) => (
                      <button
                        key={street}
                        onClick={() => {
                          setSelectedStreet(street);
                          setShowStreetDropdown(false);
                          setCurrentPage(1);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                      >
                        {street}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* ID Sort */}
            <div className="flex items-center space-x-4">
              <div className="relative" ref={idDropdownRef}>
                <button
                  onClick={() => setShowIdDropdown(!showIdDropdown)}
                  className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
                >
                  <ArrowUpDown className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-700">ID</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>
                
                {showIdDropdown && (
                  <div className="absolute top-full right-0 mt-1 w-32 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                    <button
                      onClick={() => {
                        setSortOrder('asc');
                        setShowIdDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-lg"
                    >
                      Ascending
                    </button>
                    <button
                      onClick={() => {
                        setSortOrder('desc');
                        setShowIdDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 last:rounded-b-lg"
                    >
                      Descending
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr style={{ backgroundColor: '#F3F7FB' }}>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Id</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Street</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No. of Potholes</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted By</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.street}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.numberOfPotholes}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.submittedBy}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.vehicle}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <button
                        onClick={() => handleViewReport(item)}
                        className="text-primary-600 hover:text-primary-800 font-medium"
                      >
                        View Report
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-700">
              {startIndex + 1}-{Math.min(endIndex, filteredData.length)} of {filteredData.length} items
            </div>
            <div className="flex space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 text-sm rounded ${
                    currentPage === page
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>

          {/* Video Modal */}
          {showVideoModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Pothole Report - {selectedReport?.id}
                  </h3>
                  <button
                    onClick={() => setShowVideoModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
                <div className="relative">
                  <img
                    src="/images/pothole-example1.svg"
                    alt="Pothole Report"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                    <div className="bg-white bg-opacity-90 rounded-full p-3">
                      <svg className="w-8 h-8 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-sm text-gray-600">
                  <p><strong>Street:</strong> {selectedReport?.street}</p>
                  <p><strong>Number of Potholes:</strong> {selectedReport?.numberOfPotholes}</p>
                  <p><strong>Submitted By:</strong> {selectedReport?.submittedBy}</p>
                  <p><strong>Vehicle:</strong> {selectedReport?.vehicle}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 