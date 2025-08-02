'use client'

import Sidebar from './Sidebar'

export default function Municipality() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Municipality</h1>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Municipality Services Overview</h2>
            <p className="text-gray-600 mb-4">
              This page will contain municipal services, infrastructure management, and city administration tools.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="font-semibold text-green-900 mb-2">Waste Management</h3>
                <p className="text-2xl font-bold text-green-600">580</p>
                <p className="text-sm text-green-700">Active bins</p>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">Infrastructure</h3>
                <p className="text-2xl font-bold text-blue-600">1,247</p>
                <p className="text-sm text-blue-700">Projects active</p>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-4">
                <h3 className="font-semibold text-purple-900 mb-2">Services</h3>
                <p className="text-2xl font-bold text-purple-600">89</p>
                <p className="text-sm text-purple-700">Available services</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 