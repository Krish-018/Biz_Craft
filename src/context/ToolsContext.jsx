// src/context/ToolsContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { toast } from 'react-hot-toast';

const ToolsContext = createContext();

export const useTools = () => {
  const context = useContext(ToolsContext);
  if (!context) {
    throw new Error('useTools must be used within a ToolsProvider');
  }
  return context;
};

export const ToolsProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [userTools, setUserTools] = useState([]);
  const [toolSettings, setToolSettings] = useState({});
  const [favoriteTools, setFavoriteTools] = useState([]);
  const [recentTools, setRecentTools] = useState([]);

  // Load user's tools from localStorage
  useEffect(() => {
    if (isAuthenticated && user) {
      const saved = localStorage.getItem(`user_tools_${user.id}`);
      if (saved) {
        try {
          const data = JSON.parse(saved);
          setUserTools(data.tools || []);
          setToolSettings(data.settings || {});
          setFavoriteTools(data.favorites || []);
          setRecentTools(data.recent || []);
        } catch (error) {
          console.error('Error loading user tools:', error);
        }
      }
    }
  }, [isAuthenticated, user]);

  // Save user's tools to localStorage
  useEffect(() => {
    if (isAuthenticated && user) {
      localStorage.setItem(`user_tools_${user.id}`, JSON.stringify({
        tools: userTools,
        settings: toolSettings,
        favorites: favoriteTools,
        recent: recentTools
      }));
    }
  }, [userTools, toolSettings, favoriteTools, recentTools, isAuthenticated, user]);

  const addToolToDashboard = (tool) => {
    if (!isAuthenticated) {
      toast.error('Please login to add tools');
      return false;
    }

    const exists = userTools.some(t => t.id === tool.id);
    if (exists) {
      toast.info(`${tool.name} is already in your dashboard`);
      return false;
    }

    setUserTools(prev => [...prev, { 
      ...tool, 
      addedAt: new Date().toISOString(),
      settings: {}
    }]);

    setRecentTools(prev => {
      const filtered = prev.filter(t => t.id !== tool.id);
      return [tool, ...filtered].slice(0, 10);
    });

    toast.success(`${tool.name} added to dashboard!`);
    return true;
  };

  const removeToolFromDashboard = (toolId) => {
    if (!isAuthenticated) return false;

    setUserTools(prev => prev.filter(t => t.id !== toolId));
    setFavoriteTools(prev => prev.filter(id => id !== toolId));
    
    toast.success('Tool removed from dashboard');
    return true;
  };

  const toggleFavorite = (toolId) => {
    if (!isAuthenticated) return false;

    setFavoriteTools(prev => {
      if (prev.includes(toolId)) {
        toast.success('Removed from favorites');
        return prev.filter(id => id !== toolId);
      } else {
        toast.success('Added to favorites');
        return [toolId, ...prev];
      }
    });
  };

  const isToolInDashboard = (toolId) => {
    return userTools.some(t => t.id === toolId);
  };

  const isToolFavorite = (toolId) => {
    return favoriteTools.includes(toolId);
  };

  const updateToolSettings = (toolId, settings) => {
    setToolSettings(prev => ({
      ...prev,
      [toolId]: { ...prev[toolId], ...settings }
    }));

    setUserTools(prev => 
      prev.map(t => 
        t.id === toolId 
          ? { ...t, settings: { ...t.settings, ...settings } }
          : t
      )
    );

    toast.success('Settings saved');
  };

  const trackToolUsage = (toolId) => {
    const tool = userTools.find(t => t.id === toolId);
    if (tool) {
      setRecentTools(prev => {
        const filtered = prev.filter(t => t.id !== toolId);
        return [tool, ...filtered].slice(0, 10);
      });
    }
  };

  const getToolsByCategory = () => {
    const grouped = {};
    userTools.forEach(tool => {
      if (!grouped[tool.category]) {
        grouped[tool.category] = [];
      }
      grouped[tool.category].push(tool);
    });
    return grouped;
  };

  const getFavoriteTools = () => {
    return userTools.filter(tool => favoriteTools.includes(tool.id));
  };

  const getRecentTools = () => {
    return recentTools;
  };

  const getToolsStats = () => {
    return {
      total: userTools.length,
      favorites: favoriteTools.length,
      byCategory: getToolsByCategory(),
      recent: recentTools.length
    };
  };

  const value = {
    userTools,
    favoriteTools,
    recentTools,
    toolSettings,
    addToolToDashboard,
    removeToolFromDashboard,
    toggleFavorite,
    isToolInDashboard,
    isToolFavorite,
    updateToolSettings,
    trackToolUsage,
    getToolsByCategory,
    getFavoriteTools,
    getRecentTools,
    getToolsStats
  };

  return (
    <ToolsContext.Provider value={value}>
      {children}
    </ToolsContext.Provider>
  );
};