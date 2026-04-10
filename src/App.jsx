// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Context Providers
import { AuthProvider, useAuth } from './context/AuthContext';
import { ActivityProvider } from './context/ActivityContext';
import { AccessProvider } from './context/AccessContext';
import { ToolsProvider } from './context/ToolsContext';
import { DashboardProvider } from './context/DashboardContext';

// Layouts
import DashboardLayout from './layouts/DashboardLayout';

// Pages - NOTE: Using capital 'Pages' folder name
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import GuidesPage from './Pages/Guides/GuidesPage';
import GuideDetail from './Pages/Guides/GuideDetail';
import SuppliersPage from './Pages/Suppliers/SuppliersPage';
import SupplierDetail from './Pages/Suppliers/SupplierDetail';
import ToolsPage from './Pages/Tools/ToolsPage';
import ToolDetail from './Pages/Tools/ToolDetail';
import MyToolsPage from './Pages/MyTools/MyToolsPage';
import CalculatorsPage from './Pages/Calculators/CalculatorsPage';
import CalculatorDetail from './Pages/Calculators/CalculatorDetail';
import HelpCenter from './Pages/HelpCenter/HelpCenter';
import ContactUs from './Pages/ContactUs/ContactUs';
import Dashboard from './Pages/Dashboard/Dashboard';
import BusinessTools from './Pages/BusinessTools/BusinessTools';
import BusinessGuide from './Pages/Dashboard/BusinessGuide';
import SupplierDirectory from './Pages/SupplierDirectory/SupplierDirectory';
import DashboardCalculators from './Pages/Dashboard/DashboardCalculators';
import Profile from './Pages/Profile/Profile';
import Settings from './Pages/Settings/Settings';
import NotFound from './Pages/NotFound/NotFound';
import SearchResults from './Pages/Search/SearchResults';

// Components - NOTE: Using capital 'Components' folder name
import ScrollToTop from './Components/ScrollToTop/ScrollToTop';
import Breadcrumb from './Components/Breadcrumb/Breadcrumb';

// Loading Component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
      <p className="text-gray-600 font-medium">Loading BizCraft...</p>
    </div>
  </div>
);

// Protected Route Component
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: window.location.pathname }} replace />;
  }

  if (adminOnly && user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

// Public Route Component
const PublicRoute = ({ children }) => {
  const { loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return children;
};

// Main App Component Wrapper
const AppContent = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        
        {/* Auth Routes */}
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        
        <Route path="/register" element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } />
        
        {/* Public Content Pages */}
        <Route path="/guides" element={<GuidesPage />} />
        <Route path="/guides/:id" element={<GuideDetail />} />
        <Route path="/suppliers" element={<SuppliersPage />} />
        <Route path="/suppliers/:id" element={<SupplierDetail />} />
        <Route path="/tools" element={<ToolsPage />} />
        <Route path="/tools/:id" element={<ToolDetail />} />
        <Route path="/calculators" element={<CalculatorsPage />} />
        <Route path="/calculators/:id" element={<CalculatorDetail />} />
        <Route path="/help" element={<HelpCenter />} />
        <Route path="/help/:id" element={<HelpCenter />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/search" element={<SearchResults />} />
        
        {/* Protected Routes */}
        <Route path="/my-tools" element={
          <ProtectedRoute>
            <MyToolsPage />
          </ProtectedRoute>
        } />
        
        {/* Dashboard Layout */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="business-tools" element={<BusinessTools />} />
          <Route path="business-guide" element={<BusinessGuide />} />
          <Route path="suppliers" element={<SupplierDirectory />} />
          <Route path="calculators" element={<DashboardCalculators />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
        
        {/* 404 page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

// Main App Component
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ActivityProvider>
          <AccessProvider>
            <ToolsProvider>
              <DashboardProvider>
                <Toaster 
                  position="top-right"
                  toastOptions={{
                    duration: 4000,
                    style: {
                      background: '#1f2937',
                      color: '#fff',
                      padding: '16px',
                      borderRadius: '12px',
                      fontSize: '14px',
                      fontWeight: '500',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                    },
                    success: {
                      style: {
                        background: '#10b981',
                      },
                      icon: '✅',
                      duration: 3000,
                    },
                    error: {
                      style: {
                        background: '#ef4444',
                      },
                      icon: '❌',
                      duration: 4000,
                    },
                    loading: {
                      style: {
                        background: '#3b82f6',
                      },
                      icon: '⏳',
                      duration: Infinity,
                    },
                  }}
                />
                <AppContent />
              </DashboardProvider>
            </ToolsProvider>
          </AccessProvider>
        </ActivityProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
