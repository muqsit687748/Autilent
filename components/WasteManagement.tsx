'use client'

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown, MapPin, Bell, User, ArrowUpDown } from 'lucide-react';
import Sidebar from '@/components/Sidebar';

interface WasteReport {
  id: string;
  street: string;
  vehicle: string;
  date: string;
  time: string;
  status: 'Completed' | 'In Progress' | 'Pending';
  binsCollected: number;
  route: string;
  driver: string;
}

export default function WasteManagement() {
  const router = useRouter();
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [selectedRoute, setSelectedRoute] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [showVehicleDropdown, setShowVehicleDropdown] = useState(false);
  const [showRouteDropdown, setShowRouteDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  
  const vehicleDropdownRef = useRef<HTMLDivElement>(null);
  const routeDropdownRef = useRef<HTMLDivElement>(null);
  const statusDropdownRef = useRef<HTMLDivElement>(null);

  // Mock data with dates matching the design
  const mockData: WasteReport[] = [
    {
      id: 'WM-001',
      street: 'King Fahd Road',
      vehicle: 'JV-8550',
      date: '2025-04-12',
      time: '08:30 AM',
      status: 'In Progress',
      binsCollected: 45,
      route: 'Route 3',
      driver: 'Ahmed Al-Rashid'
    },
    {
      id: 'WM-002',
      street: 'Prince Sultan Street',
      vehicle: 'JV-3422',
      date: '2025-06-25',
      time: '03:45 PM',
      status: 'In Progress',
      binsCollected: 32,
      route: 'Route 5',
      driver: 'Mohammed Al-Zahrani'
    },
    {
      id: 'WM-003',
      street: 'Al-Madinah Al-Munawwarah Road',
      vehicle: 'JV-3241',
      date: '2025-09-01',
      time: '11:00 AM',
      status: 'In Progress',
      binsCollected: 58,
      route: 'Route 3',
      driver: 'Omar Al-Qahtani'
    },
    {
      id: 'WM-004',
      street: 'King Abdullah Road',
      vehicle: 'JV-7866',
      date: '2025-12-14',
      time: '06:15 PM',
      status: 'Completed',
      binsCollected: 0,
      route: 'Route 1',
      driver: 'Khalid Al-Shehri'
    },
    {
      id: 'WM-005',
      street: 'Al-Khobar Corniche',
      vehicle: 'JV-3544',
      date: '2025-01-07',
      time: '09:20 AM',
      status: 'Completed',
      binsCollected: 41,
      route: 'Route 12',
      driver: 'Abdullah Al-Ghamdi'
    },
    {
      id: 'WM-006',
      street: 'King Fahd Road',
      vehicle: 'JV-1234',
      date: '2025-01-15',
      time: '09:30 AM',
      status: 'In Progress',
      binsCollected: 28,
      route: 'Route 7',
      driver: 'Yousef Al-Harbi'
    },
    {
      id: 'WM-007',
      street: 'Prince Sultan Street',
      vehicle: 'JV-5678',
      date: '2025-01-15',
      time: '07:30 AM',
      status: 'Completed',
      binsCollected: 52,
      route: 'Route 9',
      driver: 'Ibrahim Al-Malki'
    },
    {
      id: 'WM-008',
      street: 'Al-Madinah Al-Munawwarah Road',
      vehicle: 'JV-9012',
      date: '2025-01-15',
      time: '08:45 AM',
      status: 'In Progress',
      binsCollected: 0,
      route: 'Route 2',
      driver: 'Saleh Al-Otaibi'
    },
    {
      id: 'WM-009',
      street: 'King Abdullah Road',
      vehicle: 'JV-3456',
      date: '2025-01-15',
      time: '09:00 AM',
      status: 'Completed',
      binsCollected: 38,
      route: 'Route 8',
      driver: 'Fahad Al-Dossary'
    },
    {
      id: 'WM-010',
      street: 'Al-Khobar Corniche',
      vehicle: 'JV-7890',
      date: '2025-01-15',
      time: '08:15 AM',
      status: 'In Progress',
      binsCollected: 35,
      route: 'Route 4',
      driver: 'Saud Al-Rashid'
    },
    {
      id: 'WM-011',
      street: 'King Fahd Road',
      vehicle: 'JV-2345',
      date: '2025-01-15',
      time: '10:15 AM',
      status: 'In Progress',
      binsCollected: 0,
      route: 'Route 6',
      driver: 'Hamad Al-Zahrani'
    },
    {
      id: 'WM-012',
      street: 'Prince Sultan Street',
      vehicle: 'JV-6789',
      date: '2025-01-15',
      time: '07:00 AM',
      status: 'Completed',
      binsCollected: 47,
      route: 'Route 10',
      driver: 'Nasser Al-Qahtani'
    }
  ];

  const vehicleOptions = ['JV-8550', 'JV-3422', 'JV-3241', 'JV-7866', 'JV-3544', 'JV-1234', 'JV-5678', 'JV-9012', 'JV-3456', 'JV-7890', 'JV-2345', 'JV-6789'];
  const routeOptions = ['Route 1', 'Route 2', 'Route 3', 'Route 4', 'Route 5', 'Route 6', 'Route 7', 'Route 8', 'Route 9', 'Route 10', 'Route 12'];

  // Filter and sort data
  const filteredData = mockData
    .filter(report => {
      const vehicleMatch = !selectedVehicle || report.vehicle === selectedVehicle;
      const routeMatch = !selectedRoute || report.route === selectedRoute;
      const statusMatch = !selectedStatus || 
        (selectedStatus === 'Online' && report.status === 'Completed') ||
        (selectedStatus === 'Offline' && (report.status === 'In Progress' || report.status === 'Pending'));
      
      return vehicleMatch && routeMatch && statusMatch;
    })
    .sort((a, b) => a.id.localeCompare(b.id));

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Click outside to close dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (vehicleDropdownRef.current && !vehicleDropdownRef.current.contains(event.target as Node)) {
        setShowVehicleDropdown(false);
      }
      if (routeDropdownRef.current && !routeDropdownRef.current.contains(event.target as Node)) {
        setShowRouteDropdown(false);
      }
      if (statusDropdownRef.current && !statusDropdownRef.current.contains(event.target as Node)) {
        setShowStatusDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleViewReport = (report: WasteReport) => {
    const url = `/municipality/waste-management/report/${report.id}`;
    console.log('Navigating to:', url);
    console.log('Report ID:', report.id);
    router.push(url);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-orange-100 text-orange-800';
      case 'Pending':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-orange-100 text-orange-800';
    }
  };

  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Waste Management</h1>
              <div className="text-sm text-gray-600 mt-1">
                <span>Home</span>
                <span className="mx-2">&gt;</span>
                <span className="text-primary-500">Vehicle Management</span>
              </div>
            </div>
            <button className="p-2 text-gray-600 hover:text-gray-900">
              <Bell className="w-5 h-5" />
            </button>
          </div>

          {/* Summary Cards - Left Side Layout */}
          <div className="flex justify-start space-x-6 mb-6">
            <div className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col justify-center" style={{ width: '200px', height: '75px' }}>
              <p className="text-xs font-normal text-gray-600 mb-1">No. Routes</p>
              <p className="text-2xl font-bold text-primary-500">15</p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col justify-center" style={{ width: '200px', height: '75px' }}>
              <p className="text-xs font-normal text-gray-600 mb-1">Total Vehicles</p>
              <p className="text-2xl font-bold text-primary-500">12</p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col justify-center" style={{ width: '240px', height: '75px' }}>
              <p className="text-xs font-normal text-gray-600 mb-1 leading-tight">Assigned Routes to Vehicles</p>
              <p className="text-2xl font-bold text-primary-500">14</p>
            </div>
          </div>

          {/* Filters and Actions */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              {/* Vehicle Filter */}
              <div className="relative" ref={vehicleDropdownRef}>
                <button 
                  onClick={() => setShowVehicleDropdown(!showVehicleDropdown)}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 bg-white"
                >
                  <img src="/icons/select-vehicle-icon.svg" alt="Select Vehicle" className="w-4 h-4" />
                  <span className="text-sm text-gray-700">{selectedVehicle || 'Select Vehicle'}</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>
                {showVehicleDropdown && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                    <button
                      onClick={() => {
                        setSelectedVehicle('');
                        setShowVehicleDropdown(false);
                        setCurrentPage(1);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      All Vehicles
                    </button>
                    {vehicleOptions.map((vehicle) => (
                      <button
                        key={vehicle}
                        onClick={() => {
                          setSelectedVehicle(vehicle);
                          setShowVehicleDropdown(false);
                          setCurrentPage(1);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {vehicle}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Route Filter */}
              <div className="relative" ref={routeDropdownRef}>
                <button 
                  onClick={() => setShowRouteDropdown(!showRouteDropdown)}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 bg-white"
                >
                  <img src="/icons/select-street-icon.svg" alt="Select Route" className="w-4 h-4" />
                  <span className="text-sm text-gray-700">{selectedRoute || 'Select Route'}</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>
                {showRouteDropdown && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                    <button
                      onClick={() => {
                        setSelectedRoute('');
                        setShowRouteDropdown(false);
                        setCurrentPage(1);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      All Routes
                    </button>
                    {routeOptions.map((route) => (
                      <button
                        key={route}
                        onClick={() => {
                          setSelectedRoute(route);
                          setShowRouteDropdown(false);
                          setCurrentPage(1);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {route}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Status Filter */}
              <div className="relative" ref={statusDropdownRef}>
                <button 
                  onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 bg-white"
                >
                  <ArrowUpDown className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-700">{selectedStatus || 'Status'}</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>
                {showStatusDropdown && (
                  <div className="absolute top-full right-0 mt-1 w-32 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                    <button
                      onClick={() => {
                        setSelectedStatus('');
                        setShowStatusDropdown(false);
                        setCurrentPage(1);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      All Status
                    </button>
                    <button
                      onClick={() => {
                        setSelectedStatus('Online');
                        setShowStatusDropdown(false);
                        setCurrentPage(1);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Online
                    </button>
                    <button
                      onClick={() => {
                        setSelectedStatus('Offline');
                        setShowStatusDropdown(false);
                        setCurrentPage(1);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Offline
                    </button>
                  </div>
                )}
              </div>

              {/* Add Vehicle Button */}
              <button className="flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
                <span className="text-lg">+</span>
                <span>Add Vehicle</span>
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ backgroundColor: '#F3F7FB' }}>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NO.</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PLATE NO.</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ASSIGNED ROUTE</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">LAST WASTE COLLECTION</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STATUS</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentData.map((report, index) => (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {startIndex + index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {report.vehicle}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {report.route}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(report.date)} - {report.time}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(report.status)}`}>
                        {report.status === 'Completed' ? 'Online' : 'Offline'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-gray-400 hover:text-gray-600">
                        ⋯
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-gray-700">
                {Math.min(endIndex, filteredData.length)} of {filteredData.length} items
              </div>
              <div className="flex space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 text-sm rounded ${
                      currentPage === page
                        ? 'bg-primary-500 text-white'
                        : 'text-gray-700 hover:text-gray-900'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* No data message */}
          {filteredData.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No waste management reports found.</p>
            </div>
          )}
        </div>
      </div>

      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Waste Management Video
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
                src="/images/waste-management-video.svg"
                alt="Waste Management Video"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 