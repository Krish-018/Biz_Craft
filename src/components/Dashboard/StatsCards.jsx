// src/components/Dashboard/StatsCards.jsx
import React from 'react';
import { BookOpen, Truck, Wrench, TrendingUp, Bookmark } from 'lucide-react';

const StatsCards = () => {
  // Mock stats - in a real app, these would come from props or context
  const stats = {
    readingProgress: 75,
    savedGuides: 12,
    contactedSuppliers: 8,
    toolUsage: 45
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Reading Progress */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm text-gray-500">Reading Progress</h3>
          <BookOpen className="text-blue-600" size={20} />
        </div>
        <div className="text-2xl font-bold text-gray-800 mb-2">{stats.readingProgress}%</div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-600 rounded-full transition-all duration-500" 
            style={{ width: `${stats.readingProgress}%` }} 
          />
        </div>
        <p className="text-xs text-gray-500 mt-2">3 guides in progress</p>
      </div>
      
      {/* Saved Guides */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm text-gray-500">Saved Guides</h3>
          <Bookmark className="text-purple-600" size={20} />
        </div>
        <div className="text-2xl font-bold text-gray-800">{stats.savedGuides}</div>
        <div className="flex items-center gap-1 mt-2">
          <TrendingUp size={14} className="text-green-600" />
          <p className="text-xs text-green-600">+3 this week</p>
        </div>
        <p className="text-xs text-gray-500 mt-1">2 unread</p>
      </div>
      
      {/* Suppliers Contacted */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm text-gray-500">Suppliers Contacted</h3>
          <Truck className="text-green-600" size={20} />
        </div>
        <div className="text-2xl font-bold text-gray-800">{stats.contactedSuppliers}</div>
        <div className="flex items-center gap-1 mt-2">
          <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
          <p className="text-xs text-yellow-600">2 pending responses</p>
        </div>
        <p className="text-xs text-gray-500 mt-1">4 active conversations</p>
      </div>
      
      {/* Tool Usage */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm text-gray-500">Tool Usage</h3>
          <Wrench className="text-orange-600" size={20} />
        </div>
        <div className="text-2xl font-bold text-gray-800">{stats.toolUsage}</div>
        <p className="text-xs text-gray-500 mt-2">Calculations this month</p>
        <p className="text-xs text-gray-400 mt-1">Most used: ROI Calculator</p>
      </div>
    </div>
  );
};

export default StatsCards;