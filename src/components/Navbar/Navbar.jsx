// src/components/Navbar/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Logo from '../Logo/Logo';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Search,
  User,
  LogOut,
  Settings,
  BookOpen,
  Home,
  Package,
  DollarSign,
  BarChart3,
  HelpCircle,
  Bell,
  Mail,
  ChevronRight,
  Wrench,
  Truck,
  PieChart,
  Briefcase,
  Headphones,
  MessageCircle,
  Calculator // Add this missing import
} from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const isDashboardPage = location.pathname.startsWith('/dashboard');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
    setShowProfileMenu(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const goToMainHome = () => {
    window.location.href = '/';
  };

  const handleNavigation = (path, requiresAuth = false) => {
    if (requiresAuth && !isAuthenticated) {
      navigate('/login');
    } else {
      navigate(path);
    }
    setIsMenuOpen(false);
    setShowProfileMenu(false);
    setActiveDropdown(null);
  };

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.querySelector(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.querySelector(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  const getUserInitials = () => {
    if (!user?.name) return 'U';
    return user.name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { 
      name: 'Products', 
      path: '/products',
      icon: Package,
      dropdown: [
        { name: 'Supplier Management', path: '/suppliers', icon: Truck, description: 'Manage all suppliers' },
        { name: 'Business Guides', path: '/guides', icon: BookOpen, description: '500+ expert guides' },
        { name: 'Business Tools', path: '/tools', icon: Wrench, description: 'Powerful calculators & tools' },
        { name: 'Calculators', path: '/calculators', icon: Calculator, description: 'Financial calculators' },
        { name: 'Analytics Dashboard', path: '/dashboard', icon: PieChart, description: 'Real-time insights', requiresAuth: true }
      ]
    },
    { 
      name: 'Resources', 
      path: '/resources',
      icon: BookOpen,
      dropdown: [
        { name: 'Help Center', path: '/help', icon: HelpCircle, description: 'Guides, tutorials, and FAQs' },
        { name: 'Contact Us', path: '/contact', icon: Mail, description: 'Get in touch with our team' }
      ]
    },
    { name: 'Pricing', path: '#pricing', icon: DollarSign, isAnchor: true }
  ];

  const isActive = (path) => {
    if (path === '#pricing') return false;
    return location.pathname === path;
  };

  return (
    <>
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideDown { animation: slideDown 0.2s ease-out forwards; }
      `}</style>

      <nav className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-2' : 'bg-white py-3'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Left side - Logo and Navigation */}
            <div className="flex items-center gap-6">
              {/* Logo */}
              {!isDashboardPage && <Logo showText={true} size="md" />}

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-1">
                {navLinks.map((link) => {
                  if (link.name === 'Home') {
                    return (
                      <button
                        key={link.name}
                        onClick={goToMainHome}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                          location.pathname === '/'
                            ? 'text-blue-600 bg-blue-50'
                            : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                        }`}
                      >
                        <link.icon size={18} />
                        {link.name}
                      </button>
                    );
                  } else if (link.dropdown) {
                    return (
                      <div
                        key={link.name}
                        className="relative"
                        onMouseEnter={() => setActiveDropdown(link.name)}
                        onMouseLeave={() => setActiveDropdown(null)}
                      >
                        <button
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                            link.dropdown.some(d => location.pathname === d.path)
                              ? 'text-blue-600 bg-blue-50'
                              : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                          }`}
                        >
                          <link.icon size={18} />
                          {link.name}
                          <ChevronDown size={16} className={`transition-transform duration-200 ${
                            activeDropdown === link.name ? 'rotate-180' : ''
                          }`} />
                        </button>
                        
                        {activeDropdown === link.name && (
                          <div className="absolute top-full left-0 mt-1 w-72 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-slideDown z-50">
                            {link.dropdown.map((item) => (
                              <button
                                key={item.path}
                                onClick={() => handleNavigation(item.path, item.requiresAuth)}
                                className="w-full flex items-center gap-3 px-4 py-3 text-sm transition-all hover:bg-gray-50 text-left"
                              >
                                <div className={`p-2 rounded-lg ${
                                  location.pathname === item.path ? 'bg-blue-100' : 'bg-gray-100'
                                }`}>
                                  <item.icon size={16} className={
                                    location.pathname === item.path ? 'text-blue-600' : 'text-gray-600'
                                  } />
                                </div>
                                <div className="flex-1">
                                  <p className="font-medium text-gray-800">{item.name}</p>
                                  {item.description && (
                                    <p className="text-xs text-gray-500">{item.description}</p>
                                  )}
                                </div>
                                {item.requiresAuth && !isAuthenticated && (
                                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                                    Login
                                  </span>
                                )}
                                <ChevronRight size={14} className="text-gray-400" />
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  } else {
                    return (
                      <button
                        key={link.name}
                        onClick={() => link.isAnchor ? scrollToSection(link.path) : handleNavigation(link.path)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                          isActive(link.path)
                            ? 'text-blue-600 bg-blue-50'
                            : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                        }`}
                      >
                        <link.icon size={18} />
                        {link.name}
                      </button>
                    );
                  }
                })}
              </div>
            </div>

            {/* Right side - Search and User Menu */}
            <div className="flex items-center gap-3">
              {/* Search Bar */}
              <form onSubmit={handleSearch} className="hidden md:flex items-center relative">
                <input
                  type="text"
                  placeholder="Search suppliers, guides, tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <button type="submit" className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Search size={18} className="text-gray-400" />
                </button>
              </form>

              {/* Mobile Search Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Search size={20} />
              </button>

              {/* Notifications */}
              {isAuthenticated && (
                <button 
                  onClick={() => handleNavigation('/notifications')}
                  className="hidden md:block p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors relative"
                >
                  <Bell size={20} />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
              )}

              {/* User Menu */}
              {isAuthenticated && user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {getUserInitials()}
                    </div>
                  </button>

                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-slideDown z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-800">{user.name || 'Demo User'}</p>
                        <p className="text-xs text-gray-500">{user.email || 'demo@bizcraft.com'}</p>
                      </div>
                      
                      {/* Profile - Now redirects to /dashboard/profile */}
                      <button
                        onClick={() => handleNavigation('/dashboard/profile')}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left"
                      >
                        <User size={18} />
                        <span>Your Profile</span>
                      </button>
                      
                      {/* Dashboard */}
                      <button
                        onClick={() => handleNavigation('/dashboard')}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left"
                      >
                        <BarChart3 size={18} />
                        <span>Dashboard</span>
                      </button>
                      
                      {/* Settings - Now redirects to /dashboard/settings */}
                      <button
                        onClick={() => handleNavigation('/dashboard/settings')}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left"
                      >
                        <Settings size={18} />
                        <span>Settings</span>
                      </button>
                      
                      <div className="border-t border-gray-100 mt-2 pt-2">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                        >
                          <LogOut size={18} />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleNavigation('/login')}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => handleNavigation('/register')}
                    className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                  >
                    Sign Up
                  </button>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-gray-200 shadow-lg animate-slideDown">
              <div className="container mx-auto px-4 py-4">
                {/* Mobile Search */}
                <form onSubmit={handleSearch} className="relative mb-4">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button type="submit" className="absolute left-3 top-3">
                    <Search size={18} className="text-gray-400" />
                  </button>
                </form>

                {/* Mobile Logo */}
                <div className="flex justify-center mb-4">
                  <Logo showText={true} size="md" />
                </div>

                {/* Mobile Navigation Links */}
                <div className="space-y-1">
                  {navLinks.map((link) => (
                    <div key={link.name}>
                      {link.name === 'Home' ? (
                        <button
                          onClick={() => { goToMainHome(); setIsMenuOpen(false); }}
                          className="w-full flex items-center gap-2 px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors text-left"
                        >
                          <link.icon size={18} />
                          {link.name}
                        </button>
                      ) : link.dropdown ? (
                        <>
                          <button
                            onClick={() => setActiveDropdown(activeDropdown === link.name ? null : link.name)}
                            className="w-full flex items-center justify-between px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                          >
                            <span className="flex items-center gap-2">
                              <link.icon size={18} />
                              {link.name}
                            </span>
                            <ChevronDown size={16} className={`transition-transform duration-200 ${
                              activeDropdown === link.name ? 'rotate-180' : ''
                            }`} />
                          </button>
                          {activeDropdown === link.name && (
                            <div className="ml-4 mt-1 space-y-1">
                              {link.dropdown.map((item) => (
                                <button
                                  key={item.path}
                                  onClick={() => handleNavigation(item.path, item.requiresAuth)}
                                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg text-left"
                                >
                                  <item.icon size={16} />
                                  <div className="flex-1">
                                    <p>{item.name}</p>
                                    {item.description && <p className="text-xs text-gray-500">{item.description}</p>}
                                  </div>
                                  {item.requiresAuth && !isAuthenticated && (
                                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                                      Login
                                    </span>
                                  )}
                                </button>
                              ))}
                            </div>
                          )}
                        </>
                      ) : (
                        <button
                          onClick={() => {
                            if (link.isAnchor) scrollToSection(link.path);
                            else handleNavigation(link.path);
                            setIsMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors text-left"
                        >
                          <link.icon size={18} />
                          {link.name}
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Mobile User Menu - Non-authenticated */}
                {!isAuthenticated && (
                  <div className="mt-4 pt-4 border-t border-gray-200 flex gap-2">
                    <button
                      onClick={() => { handleNavigation('/login'); setIsMenuOpen(false); }}
                      className="flex-1 px-4 py-2 text-center text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => { handleNavigation('/register'); setIsMenuOpen(false); }}
                      className="flex-1 px-4 py-2 text-center text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Sign Up
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;