// src/components/Dashboard/ActivityFeed.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Truck, Wrench, Clock, ChevronRight } from 'lucide-react';

const ActivityFeed = () => {
  const navigate = useNavigate();

  const activities = [
    { id: 1, type: 'guide', action: 'read', item: 'The Complete Guide to Starting a Bakery Business', itemId: 1, time: '2 hours ago', icon: BookOpen, color: 'blue' },
    { id: 2, type: 'supplier', action: 'contacted', item: 'ABC Corporation', itemId: 1, time: '5 hours ago', icon: Truck, color: 'green' },
    { id: 3, type: 'tool', action: 'used', item: 'ROI Calculator', itemId: 1, time: '1 day ago', icon: Wrench, color: 'purple' },
  ];

  const getActionText = (action) => {
    const actions = { 'read': 'read', 'contacted': 'contacted', 'used': 'used' };
    return actions[action] || action;
  };

  const handleItemClick = (type, id) => {
    navigate(`/${type}s/${id}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
        <Clock size={18} className="text-gray-400" />
      </div>
      
      {activities.length > 0 ? (
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = activity.icon;
            return (
              <div 
                key={activity.id} 
                className="flex items-start gap-3 group cursor-pointer"
                onClick={() => handleItemClick(activity.type, activity.itemId)}
              >
                <div className={`p-2 rounded-lg bg-${activity.color}-100 group-hover:bg-${activity.color}-200 transition-colors`}>
                  <Icon size={16} className={`text-${activity.color}-600`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-800">
                    You <span className="font-medium">{getActionText(activity.action)}</span>{' '}
                    <span className="font-medium text-blue-600 group-hover:underline">
                      {activity.item}
                    </span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
                <ChevronRight size={16} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-8">
          <Clock size={40} className="text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No recent activity</p>
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;