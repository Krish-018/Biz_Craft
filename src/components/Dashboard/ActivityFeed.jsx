// src/components/Dashboard/ActivityFeed.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Truck, Wrench, Clock, ChevronRight } from 'lucide-react';

const ActivityFeed = () => {
  const navigate = useNavigate();

  // Mock activity data - in a real app, this would come from props or context
  const activities = [
    { 
      id: 1,
      type: 'guide', 
      action: 'read', 
      item: 'The Complete Guide to Starting a Bakery Business', 
      itemId: 1,
      time: '2 hours ago',
      icon: BookOpen,
      color: 'blue'
    },
    { 
      id: 2,
      type: 'supplier', 
      action: 'contacted', 
      item: 'ABC Corporation', 
      itemId: 1,
      time: '5 hours ago',
      icon: Truck,
      color: 'green'
    },
    { 
      id: 3,
      type: 'tool', 
      action: 'used', 
      item: 'ROI Calculator', 
      itemId: 1,
      time: '1 day ago',
      icon: Wrench,
      color: 'purple'
    },
    { 
      id: 4,
      type: 'guide', 
      action: 'bookmarked', 
      item: 'Coffee Shop Success Guide', 
      itemId: 2,
      time: '2 days ago',
      icon: BookOpen,
      color: 'blue'
    },
    { 
      id: 5,
      type: 'supplier', 
      action: 'saved', 
      item: 'Tech Solutions Inc', 
      itemId: 4,
      time: '3 days ago',
      icon: Truck,
      color: 'green'
    },
  ];

  const getActionText = (action) => {
    const actions = {
      'read': 'read',
      'contacted': 'contacted',
      'used': 'used',
      'bookmarked': 'bookmarked',
      'saved': 'saved'
    };
    return actions[action] || action;
  };

  const handleItemClick = (type, id) => {
    navigate(`/${type}s/${id}`);
  };

  const getTimeColor = (time) => {
    if (time.includes('hour')) return 'text-green-600';
    if (time.includes('day')) return 'text-orange-600';
    return 'text-blue-600';
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
                  <div className="flex items-center gap-2 mt-1">
                    <Clock size={12} className={getTimeColor(activity.time)} />
                    <p className={`text-xs ${getTimeColor(activity.time)}`}>
                      {activity.time}
                    </p>
                  </div>
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
          <p className="text-xs text-gray-400 mt-1">Start exploring guides and suppliers</p>
        </div>
      )}

      {activities.length > 0 && (
        <button className="w-full mt-4 pt-4 border-t border-gray-100 text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center gap-1">
          View All Activity
          <ChevronRight size={16} />
        </button>
      )}
    </div>
  );
};

export default ActivityFeed;
