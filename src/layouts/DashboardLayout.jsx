// src/layouts/DashboardLayout.jsx
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useDashboard } from '../context/DashboardContext';
import Sidebar from '../components/Sidebar/sidebar';
import Navbar from '../components/Navbar/Navbar';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, loading } = useAuth();
  const { dashboardItems } = useDashboard();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar - Full width at the top */}
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Fixed below navbar on desktop, slides in on mobile */}
      <div className="flex flex-1">
        {/* Desktop Sidebar - Always visible */}
        <div className="hidden lg:block h-[calc(100vh-64px)] sticky top-[64px]">
          <Sidebar onClose={() => setSidebarOpen(false)} />
        </div>

        {/* Mobile Sidebar - Slide out */}
        <div className={`lg:hidden fixed inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition duration-200 ease-in-out z-40 pt-[64px]`}>
          <Sidebar onClose={() => setSidebarOpen(false)} />
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;