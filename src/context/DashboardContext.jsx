import React, { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { toast } from "react-hot-toast";
import axios from "axios";

const DashboardContext = createContext();

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
};

export const DashboardProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [dashboardItems, setDashboardItems] = useState({
    guides: [],
    suppliers: [],
    tools: [],
    calculators: [],
  });

  // Load user's dashboard items from API and local backup
  useEffect(() => {
    const fetchDashboard = async () => {
      if (isAuthenticated && user) {
        try {
          const { data } = await axios.get("/users/dashboard");
          setDashboardItems(data);
          // backup to local storage
          localStorage.setItem(`dashboard_${user.id}`, JSON.stringify(data));
        } catch (error) {
          console.error("Error loading dashboard from API:", error);
          // try to recover from local storage
          const saved = localStorage.getItem(`dashboard_${user.id}`);
          if (saved) {
            try {
              setDashboardItems(JSON.parse(saved));
            } catch (e) {}
          }
        }
      } else {
        setDashboardItems({
          guides: [],
          suppliers: [],
          tools: [],
          calculators: [],
        });
      }
    };

    fetchDashboard();
  }, [isAuthenticated, user]);

  // Sync dashboard to API
  const syncToApi = async (newItems) => {
    if (isAuthenticated && user) {
      try {
        await axios.put("/users/dashboard", newItems);
        localStorage.setItem(`dashboard_${user.id}`, JSON.stringify(newItems));
      } catch (error) {
        console.error("Error syncing dashboard to API:", error);
      }
    }
  };

  // Add item to dashboard
  const addToDashboard = (type, item) => {
    if (!isAuthenticated) {
      toast.error("Please login to add items to your dashboard");
      return false;
    }

    // Check if item already exists
    const exists = dashboardItems[type].some(
      (existingItem) => existingItem.id === item.id,
    );

    if (exists) {
      toast.info("Item already in your dashboard");
      return false;
    }

    const newItem = {
      ...item,
      addedAt: new Date().toISOString(),
    };

    setDashboardItems((prev) => {
      const newItems = {
        ...prev,
        [type]: [newItem, ...prev[type]],
      };
      syncToApi(newItems);
      return newItems;
    });

    toast.success("Added to your dashboard!", {
      icon: "✅",
      duration: 2000,
    });

    return true;
  };

  // Remove item from dashboard
  const removeFromDashboard = (type, itemId) => {
    setDashboardItems((prev) => {
      const newItems = {
        ...prev,
        [type]: prev[type].filter((item) => item.id !== itemId),
      };
      syncToApi(newItems);
      return newItems;
    });

    toast.success("Removed from dashboard");
  };

  // Check if item is in dashboard
  const isInDashboard = (type, itemId) => {
    return dashboardItems[type].some((item) => item.id === itemId);
  };

  // Get dashboard stats
  const getDashboardStats = () => {
    return {
      totalItems:
        dashboardItems.guides.length +
        dashboardItems.suppliers.length +
        dashboardItems.tools.length +
        dashboardItems.calculators.length,
      guidesCount: dashboardItems.guides.length,
      suppliersCount: dashboardItems.suppliers.length,
      toolsCount: dashboardItems.tools.length,
      calculatorsCount: dashboardItems.calculators.length,
    };
  };

  // Get recent items
  const getRecentItems = (limit = 5) => {
    const allItems = [
      ...dashboardItems.guides.map((item) => ({ ...item, type: "guides" })),
      ...dashboardItems.suppliers.map((item) => ({
        ...item,
        type: "suppliers",
      })),
      ...dashboardItems.tools.map((item) => ({ ...item, type: "tools" })),
      ...dashboardItems.calculators.map((item) => ({
        ...item,
        type: "calculators",
      })),
    ];

    return allItems
      .sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt))
      .slice(0, limit);
  };

  const value = {
    dashboardItems,
    addToDashboard,
    removeFromDashboard,
    isInDashboard,
    getDashboardStats,
    getRecentItems,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};
