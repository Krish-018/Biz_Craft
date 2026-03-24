// src/pages/NotFound/NotFound.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowLeft, LayoutDashboard, AlertCircle } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Number */}
        <h1 className="text-9xl font-bold text-gray-200 mb-4">404</h1>
        
        {/* Main Message */}
        <div className="mb-6">
          <AlertCircle className="w-20 h-20 text-red-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search for pages..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  navigate(`/${e.target.value.toLowerCase()}`);
                }
              }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-2">Try: suppliers, guides, tools, dashboard</p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-all flex items-center gap-2"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center gap-2"
          >
            <LayoutDashboard size={18} />
            Go to Dashboard
          </button>
        </div>

        {/* Quick Links */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-3">Popular destinations:</p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => navigate('/suppliers')}
              className="px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all text-sm text-gray-700 hover:text-blue-600"
            >
              Suppliers
            </button>
            <button
              onClick={() => navigate('/guides')}
              className="px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all text-sm text-gray-700 hover:text-blue-600"
            >
              Business Guides
            </button>
            <button
              onClick={() => navigate('/tools')}
              className="px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all text-sm text-gray-700 hover:text-blue-600"
            >
              Business Tools
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;