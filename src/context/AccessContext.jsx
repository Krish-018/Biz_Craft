import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AccessContext = createContext();

export const useAccess = () => {
  const context = useContext(AccessContext);
  if (!context) {
    throw new Error('useAccess must be used within an AccessProvider');
  }
  return context;
};

export const AccessProvider = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  // Track anonymous user's usage
  const [anonymousUsage, setAnonymousUsage] = useState({
    suppliersViewed: 0,
    guidesViewed: 0,
    calculatorsUsed: 0,
    lastReset: new Date().toISOString()
  });

  const limits = {
    suppliers: 3,
    guides: 4,
    calculators: 2
  };

  // Load anonymous usage from localStorage
  useEffect(() => {
    if (!isAuthenticated) {
      const saved = localStorage.getItem('anonymous_usage');
      if (saved) {
        try {
          const data = JSON.parse(saved);
          const lastReset = new Date(data.lastReset);
          const today = new Date();
          
          // Reset if it's a new day
          if (lastReset.toDateString() !== today.toDateString()) {
            const newUsage = {
              suppliersViewed: 0,
              guidesViewed: 0,
              calculatorsUsed: 0,
              lastReset: today.toISOString()
            };
            setAnonymousUsage(newUsage);
            localStorage.setItem('anonymous_usage', JSON.stringify(newUsage));
          } else {
            setAnonymousUsage(data);
          }
        } catch (error) {
          console.error('Error loading anonymous usage:', error);
        }
      }
    }
  }, [isAuthenticated]);

  // Save anonymous usage to localStorage
  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem('anonymous_usage', JSON.stringify(anonymousUsage));
    }
  }, [anonymousUsage, isAuthenticated]);

  // Check if user can access content
  const canAccess = (type) => {
    if (isAuthenticated) return true;
    const current = anonymousUsage[`${type}Viewed`] || 0;
    return current < limits[type];
  };

  // Get remaining views
  const getRemaining = (type) => {
    if (isAuthenticated) return Infinity;
    const used = anonymousUsage[`${type}Viewed`] || 0;
    return limits[type] - used;
  };

  // Track content view
  const trackView = (type) => {
    if (isAuthenticated) return true;

    const current = anonymousUsage[`${type}Viewed`] || 0;
    
    if (current < limits[type]) {
      setAnonymousUsage(prev => ({
        ...prev,
        [`${type}Viewed`]: prev[`${type}Viewed`] + 1
      }));
      
      const remaining = limits[type] - (current + 1);
      if (remaining === 1) {
        toast(`You have 1 ${type} view remaining today`, {
          icon: '⚠️',
          duration: 4000
        });
      }
      
      return true;
    } else {
      // Show login prompt
      toast((t) => (
        <div className="flex flex-col gap-2">
          <p className="font-medium">You've reached your free limit!</p>
          <p className="text-sm">Sign up to access unlimited {type}</p>
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => {
                toast.dismiss(t.id);
                navigate('/login');
              }}
              className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
            >
              Sign In
            </button>
            <button
              onClick={() => {
                toast.dismiss(t.id);
                navigate('/register');
              }}
              className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-300"
            >
              Register
            </button>
          </div>
        </div>
      ), {
        duration: 10000,
        position: 'top-center',
      });
      
      return false;
    }
  };

  // Reset usage (for testing)
  const resetUsage = () => {
    const newUsage = {
      suppliersViewed: 0,
      guidesViewed: 0,
      calculatorsUsed: 0,
      lastReset: new Date().toISOString()
    };
    setAnonymousUsage(newUsage);
    localStorage.setItem('anonymous_usage', JSON.stringify(newUsage));
    toast.success('Usage reset for new session');
  };

  const value = {
    canAccess,
    trackView,
    getRemaining,
    resetUsage,
    anonymousUsage,
    limits,
    isPremium: isAuthenticated
  };

  return (
    <AccessContext.Provider value={value}>
      {children}
    </AccessContext.Provider>
  );
};