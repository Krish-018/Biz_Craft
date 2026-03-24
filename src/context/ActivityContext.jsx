import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const ActivityContext = createContext();

export const useActivity = () => {
  const context = useContext(ActivityContext);
  if (!context) {
    throw new Error('useActivity must be used within an ActivityProvider');
  }
  return context;
};

export const ActivityProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [downloads, setDownloads] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [progress, setProgress] = useState({
    guidesRead: 0,
    suppliersViewed: 0,
    calculatorsUsed: 0,
    templatesDownloaded: 0
  });

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('bizcraft_activity');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setBookmarks(data.bookmarks || []);
        setRecentlyViewed(data.recentlyViewed || []);
        setDownloads(data.downloads || []);
        setCompleted(data.completed || []);
        setProgress(data.progress || {
          guidesRead: 0,
          suppliersViewed: 0,
          calculatorsUsed: 0,
          templatesDownloaded: 0
        });
      } catch (error) {
        console.error('Error loading activity data:', error);
      }
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('bizcraft_activity', JSON.stringify({
      bookmarks,
      recentlyViewed,
      downloads,
      completed,
      progress
    }));
  }, [bookmarks, recentlyViewed, downloads, completed, progress]);

  // Add to recently viewed
  const addToRecentlyViewed = (item) => {
    setRecentlyViewed(prev => {
      // Remove if already exists
      const filtered = prev.filter(i => i.id !== item.id);
      // Add to beginning with timestamp
      return [{ ...item, viewedAt: new Date().toISOString() }, ...filtered].slice(0, 30);
    });

    // Update progress based on item type
    if (item.type === 'supplier' || item.category === 'suppliers') {
      setProgress(prev => ({
        ...prev,
        suppliersViewed: prev.suppliersViewed + 1
      }));
    }
  };

  // Toggle bookmark
  const toggleBookmark = (item) => {
    setBookmarks(prev => {
      const exists = prev.some(i => i.id === item.id);
      if (exists) {
        toast.success(`Removed from bookmarks`);
        return prev.filter(i => i.id !== item.id);
      } else {
        toast.success(`Added to bookmarks`);
        return [{ ...item, bookmarkedAt: new Date().toISOString() }, ...prev];
      }
    });
  };

  // Check if item is bookmarked
  const isBookmarked = (itemId) => {
    return bookmarks.some(i => i.id === itemId);
  };

  // Add download record
  const addDownload = (item) => {
    setDownloads(prev => {
      const exists = prev.some(i => i.id === item.id);
      if (!exists) {
        setProgress(prev => ({
          ...prev,
          templatesDownloaded: prev.templatesDownloaded + 1
        }));
        toast.success(`Downloaded "${item.title}"`);
        return [{ ...item, downloadedAt: new Date().toISOString() }, ...prev].slice(0, 50);
      }
      return prev;
    });
  };

  // Mark as completed (read guide, watched video, etc.)
  const markAsCompleted = (item) => {
    setCompleted(prev => {
      const exists = prev.some(i => i.id === item.id);
      if (!exists) {
        // Update progress based on item type
        if (item.type === 'guide' || item.category === 'guides') {
          setProgress(p => ({ ...p, guidesRead: p.guidesRead + 1 }));
        } else if (item.type === 'calculator' || item.category === 'calculators') {
          setProgress(p => ({ ...p, calculatorsUsed: p.calculatorsUsed + 1 }));
        } else if (item.type === 'template') {
          setProgress(p => ({ ...p, templatesDownloaded: p.templatesDownloaded + 1 }));
        }
        
        toast.success(`Marked "${item.title}" as completed`);
        return [{ ...item, completedAt: new Date().toISOString() }, ...prev].slice(0, 100);
      }
      return prev;
    });
  };

  // Check if item is completed
  const isCompleted = (itemId) => {
    return completed.some(i => i.id === itemId);
  };

  // Remove from bookmarks (alias for toggleBookmark)
  const removeBookmark = (itemId) => {
    setBookmarks(prev => {
      const item = prev.find(i => i.id === itemId);
      if (item) {
        toast.success(`Removed from bookmarks`);
        return prev.filter(i => i.id !== itemId);
      }
      return prev;
    });
  };

  // Clear all bookmarks
  const clearAllBookmarks = () => {
    if (bookmarks.length > 0) {
      setBookmarks([]);
      toast.success('All bookmarks cleared');
    }
  };

  // Clear all recently viewed
  const clearAllRecent = () => {
    if (recentlyViewed.length > 0) {
      setRecentlyViewed([]);
      toast.success('Recent history cleared');
    }
  };

  // Get recommendations based on user activity
  const getRecommendations = (allItems, limit = 6) => {
    if (!allItems || allItems.length === 0) return [];
    
    // Get user's preferred categories from bookmarks and completed
    const userCategories = [
      ...bookmarks.map(i => i.category),
      ...completed.map(i => i.category)
    ].filter(Boolean);
    
    // Count category frequency
    const categoryCount = {};
    userCategories.forEach(cat => {
      categoryCount[cat] = (categoryCount[cat] || 0) + 1;
    });
    
    // Get top 3 categories
    const topCategories = Object.entries(categoryCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([cat]) => cat);
    
    // Get items user has already interacted with
    const userItemIds = [
      ...bookmarks.map(i => i.id),
      ...completed.map(i => i.id),
      ...downloads.map(i => i.id)
    ];
    
    // Filter items from top categories that user hasn't interacted with
    return allItems
      .filter(item => topCategories.includes(item.category))
      .filter(item => !userItemIds.includes(item.id))
      .slice(0, limit);
  };

  // Get stats for dashboard
  const getStats = () => {
    return {
      bookmarksCount: bookmarks.length,
      recentlyViewedCount: recentlyViewed.length,
      downloadsCount: downloads.length,
      completedCount: completed.length,
      guidesRead: progress.guidesRead,
      suppliersViewed: progress.suppliersViewed,
      calculatorsUsed: progress.calculatorsUsed,
      templatesDownloaded: progress.templatesDownloaded
    };
  };

  const value = {
    // State
    bookmarks,
    recentlyViewed,
    downloads,
    completed,
    progress,
    
    // Actions
    addToRecentlyViewed,
    toggleBookmark,
    isBookmarked,
    removeBookmark,
    clearAllBookmarks,
    clearAllRecent,
    addDownload,
    markAsCompleted,
    isCompleted,
    
    // Utilities
    getRecommendations,
    getStats
  };

  return (
    <ActivityContext.Provider value={value}>
      {children}
    </ActivityContext.Provider>
  );
};