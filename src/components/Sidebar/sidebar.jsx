// src/components/Sidebar/sidebar.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Calculator,
  Building2,
  User,
  Settings,
  LogOut,
  Wrench,
  BookMarked
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useDashboard } from '../../context/DashboardContext';

const Sidebar = ({ onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { dashboardItems } = useDashboard();
  
  const stats = {
    totalItems: (dashboardItems.guides?.length || 0) + 
                (dashboardItems.suppliers?.length || 0) + 
                (dashboardItems.tools?.length || 0) + 
                (dashboardItems.calculators?.length || 0),
    guidesCount: dashboardItems.guides?.length || 0,
    suppliersCount: dashboardItems.suppliers?.length || 0
  };

  const menuItems = [
    {
      title: 'Dashboard',
      icon: LayoutDashboard,
      path: '/dashboard',
      color: 'blue',
      description: 'Overview'
    },
    {
      title: 'Business Tools',
      icon: Wrench,
      path: '/dashboard/business-tools',
      color: 'purple',
      description: 'Manage your tools',
      badge: dashboardItems.tools?.length || 0
    },
    {
      title: 'My Guides',
      icon: BookMarked,
      path: '/dashboard/business-guide',
      color: 'green',
      description: `${stats.guidesCount} guides saved`,
      badge: stats.guidesCount
    },
    {
      title: 'My Suppliers',
      icon: Building2,
      path: '/dashboard/suppliers',
      color: 'orange',
      description: `${stats.suppliersCount} suppliers`,
      badge: stats.suppliersCount
    },
    {
      title: 'My Calculators',
      icon: Calculator,
      path: '/dashboard/calculators',
      color: 'pink',
      description: `${dashboardItems.calculators?.length || 0} calculators`,
      badge: dashboardItems.calculators?.length || 0
    },
    {
      title: 'Profile',
      icon: User,
      path: '/dashboard/profile',
      color: 'indigo',
      description: 'Your account'
    },
    {
      title: 'Settings',
      icon: Settings,
      path: '/dashboard/settings',
      color: 'gray',
      description: 'Preferences'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    if (onClose) onClose();
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    if (onClose) onClose();
  };

  const isActive = (path) => location.pathname === path;

  const getUserInitials = () => {
    if (!user?.name) return 'U';
    return user.name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="h-full bg-white border-r border-gray-200 flex flex-col w-64">
      {/* User Profile Section - Now at the very top of sidebar, directly below navbar */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-medium text-sm shadow-md flex-shrink-0">
            {getUserInitials()}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-medium text-gray-800 truncate">{user?.name || 'harsh'}</p>
            <p className="text-xs text-gray-500 truncate">{user?.email || 'harsh12@gmail.com'}</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-4 py-3 border-b border-gray-200">
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center">
            <p className="text-lg font-bold text-gray-800">{stats.totalItems}</p>
            <p className="text-xs text-gray-500">Items</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-blue-600">{stats.guidesCount}</p>
            <p className="text-xs text-gray-500">Guides</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-orange-600">{stats.suppliersCount}</p>
            <p className="text-xs text-gray-500">Suppliers</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            const bgClass = active ? `bg-gradient-to-r from-${item.color}-50 to-${item.color}-100/50` : '';
            const textClass = active ? `text-${item.color}-600` : 'text-gray-700';
            const iconColor = active ? `text-${item.color}-600` : 'text-gray-500';
            const badgeClass = `bg-${item.color}-100 text-${item.color}-600`;
            
            return (
              <button
                key={index}
                onClick={() => handleNavigation(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group ${
                  active ? bgClass : 'hover:bg-gray-100'
                }`}
              >
                <div className={`flex-shrink-0 ${iconColor} group-hover:text-gray-700`}>
                  <Icon size={20} />
                </div>
                
                <div className="flex-1 text-left">
                  <span className={`text-sm font-medium ${textClass}`}>
                    {item.title}
                  </span>
                  <p className="text-xs text-gray-400">{item.description}</p>
                </div>
                
                {item.badge > 0 && (
                  <span className={`px-1.5 py-0.5 ${badgeClass} text-xs rounded-full`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Logout and Version */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all"
        >
          <LogOut size={20} className="flex-shrink-0" />
          <span className="text-sm font-medium">Logout</span>
        </button>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-400">Version 2.0.0</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;