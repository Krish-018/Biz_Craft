import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useDashboard } from "../../context/DashboardContext";
import logo from "../../assets/logo.png";
import StatsCards from "../../components/Dashboard/StatsCards";
import ActivityFeed from "../../components/Dashboard/ActivityFeed";
import {
  TrendingUp,
  Users,
  DollarSign,
  ShoppingCart,
  Calendar,
  Clock,
  Download,
  Eye,
  Star,
  Truck,
  BookOpen,
  Calculator,
  Briefcase,
  Activity,
  Filter,
  Search,
  ChevronDown,
  MoreVertical,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowUp,
  ArrowDown,
  BarChart3,
  PieChart,
  Percent,
  CreditCard,
  Globe,
  Smartphone,
  Laptop,
  Wallet,
  PlusCircle,
  FileText,
  Target,
  Award,
  Zap,
  Users as UsersIcon,
  TrendingUp as TrendingUpIcon,
  LineChart,
  Radar,
  RefreshCw,
  Bell,
  Settings,
  LogOut,
  Edit,
  Trash2,
  Copy,
  Mail,
  Phone,
  MapPin,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Grid,
  List,
  Filter as FilterIcon,
  SortAsc,
  SortDesc,
  Heart,
  Crown,
  Sparkles,
  Rocket,
  Zap as ZapIcon,
  LayoutDashboard,
  Wrench,
  Menu,
  Plus,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar as ReRadar,
  ComposedChart,
  Scatter,
} from "recharts";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { user } = useAuth();
  const { dashboardItems } = useDashboard();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState(null);
  const [recentSuppliers, setRecentSuppliers] = useState([]);
  const [recentGuides, setRecentGuides] = useState([]);
  const [recentTools, setRecentTools] = useState([]);
  const [supplierCategories, setSupplierCategories] = useState([]);
  const [performanceData, setPerformanceData] = useState([]);

  // Chart data states for different metrics
  const [revenueData, setRevenueData] = useState([]);
  const [guidesData, setGuidesData] = useState([]);
  const [toolsData, setToolsData] = useState([]);
  const [suppliersData, setSuppliersData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [engagementData, setEngagementData] = useState([]);

  // Selected metric for charts
  const [selectedMetric, setSelectedMetric] = useState("revenue");

  const [timeRange, setTimeRange] = useState("month");

  // Interactive states
  const [liveUpdates, setLiveUpdates] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem("dashboard_favorites");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [statsHistory, setStatsHistory] = useState({});

  // Load favorites from localStorage
  useEffect(() => {
    try {
      localStorage.setItem("dashboard_favorites", JSON.stringify(favorites));
    } catch (error) {
      console.error("Error saving favorites:", error);
    }
  }, [favorites]);

  // Generate detailed data for each metric with different chart patterns
  const generateRevenueData = () => {
    return [
      { month: "Jan", revenue: 85000, profit: 34000, orders: 450 },
      { month: "Feb", revenue: 92000, profit: 36800, orders: 520 },
      { month: "Mar", revenue: 105000, profit: 42000, orders: 580 },
      { month: "Apr", revenue: 98000, profit: 39200, orders: 620 },
      { month: "May", revenue: 112000, profit: 44800, orders: 710 },
      { month: "Jun", revenue: 118000, profit: 47200, orders: 650 },
      { month: "Jul", revenue: 128500, profit: 51400, orders: 720 },
    ];
  };

  const generateSuppliersData = () => {
    return [
      { category: "Technology", count: 435, growth: 15, active: 98 },
      { category: "Manufacturing", count: 312, growth: 8, active: 95 },
      { category: "Services", count: 248, growth: 12, active: 92 },
      { category: "Retail", count: 186, growth: 5, active: 89 },
      { category: "Logistics", count: 62, growth: 20, active: 96 },
    ];
  };

  const generateGuidesData = () => {
    return [
      { topic: "Business Planning", views: 3245, likes: 342, shares: 156 },
      { topic: "Financial Management", views: 4567, likes: 567, shares: 289 },
      { topic: "Marketing Strategy", views: 3876, likes: 434, shares: 234 },
      { topic: "Tax Planning", views: 2987, likes: 356, shares: 187 },
      { topic: "Legal Compliance", views: 2654, likes: 298, shares: 165 },
    ];
  };

  const generateToolsData = () => {
    return [
      { name: "ROI Calculator", usage: 2345, rating: 4.9, satisfaction: 98 },
      {
        name: "Supplier Comparison",
        usage: 1876,
        rating: 4.7,
        satisfaction: 94,
      },
      { name: "Profit Analyzer", usage: 2987, rating: 4.8, satisfaction: 96 },
      { name: "Inventory Tracker", usage: 1432, rating: 4.6, satisfaction: 92 },
      { name: "Cash Flow Tool", usage: 2134, rating: 4.8, satisfaction: 95 },
    ];
  };

  const generateUsersData = () => {
    return [
      { month: "Jan", new: 245, active: 1245, returning: 876 },
      { month: "Feb", new: 267, active: 1356, returning: 945 },
      { month: "Mar", new: 289, active: 1489, returning: 1023 },
      { month: "Apr", new: 312, active: 1567, returning: 1156 },
      { month: "May", new: 334, active: 1678, returning: 1245 },
      { month: "Jun", new: 356, active: 1789, returning: 1345 },
      { month: "Jul", new: 378, active: 1890, returning: 1456 },
    ];
  };

  const generateEngagementData = () => {
    return [
      { day: "Mon", pageViews: 3456, timeSpent: 4.2, bounceRate: 32 },
      { day: "Tue", pageViews: 3890, timeSpent: 4.5, bounceRate: 30 },
      { day: "Wed", pageViews: 4234, timeSpent: 4.8, bounceRate: 28 },
      { day: "Thu", pageViews: 4567, timeSpent: 5.1, bounceRate: 26 },
      { day: "Fri", pageViews: 4321, timeSpent: 4.9, bounceRate: 29 },
      { day: "Sat", pageViews: 3987, timeSpent: 4.6, bounceRate: 31 },
      { day: "Sun", pageViews: 3678, timeSpent: 4.3, bounceRate: 33 },
    ];
  };

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock stats for BizCraft
      const mockStats = {
        totalSuppliers: { value: 1243, change: 12.5, trend: "up", history: [] },
        totalGuides: { value: 1836, change: 23.1, trend: "up", history: [] },
        totalTools: { value: 11, change: 8.3, trend: "up", history: [] },
        activeUsers: { value: 1535, change: 15.2, trend: "up", history: [] },
        totalRevenue: { value: 128500, change: 18.5, trend: "up", history: [] },
        avgEngagement: { value: 76, change: 5.2, trend: "up", history: [] },
      };

      setStats(mockStats);

      // Generate different chart data for each metric
      setRevenueData(generateRevenueData());
      setSuppliersData(generateSuppliersData());
      setGuidesData(generateGuidesData());
      setToolsData(generateToolsData());
      setUsersData(generateUsersData());
      setEngagementData(generateEngagementData());

      // Supplier categories for pie chart
      setSupplierCategories([
        { name: "Technology", value: 35, color: "#3b82f6", growth: 15 },
        { name: "Manufacturing", value: 25, color: "#10b981", growth: 8 },
        { name: "Services", value: 20, color: "#f59e0b", growth: 12 },
        { name: "Retail", value: 15, color: "#8b5cf6", growth: 5 },
        { name: "Logistics", value: 5, color: "#ec4899", growth: 20 },
      ]);

      // Performance metrics for radar chart
      setPerformanceData([
        { subject: "Suppliers", A: 85, fullMark: 100, target: 90 },
        { subject: "Guides", A: 92, fullMark: 100, target: 95 },
        { subject: "Tools", A: 78, fullMark: 100, target: 85 },
        { subject: "Users", A: 88, fullMark: 100, target: 90 },
        { subject: "Revenue", A: 82, fullMark: 100, target: 88 },
        { subject: "Engagement", A: 76, fullMark: 100, target: 80 },
      ]);

    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setError("Failed to load dashboard data. Please try again.");
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Sync with Dashboard Context Items
  useEffect(() => {
    if (dashboardItems) {
      if (dashboardItems.guides) {
        setRecentGuides(dashboardItems.guides.slice(0, 5));
      }
      if (dashboardItems.tools) {
        setRecentTools(dashboardItems.tools.slice(0, 5));
      }
      if (dashboardItems.suppliers) {
        setRecentSuppliers(dashboardItems.suppliers.slice(0, 5));
      }

      // Update stats dynamically to reflect saved count
      setStats((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          totalGuides: {
            ...prev.totalGuides,
            value: dashboardItems.guides?.length || 0,
          },
          totalTools: {
            ...prev.totalTools,
            value: dashboardItems.tools?.length || 0,
          },
          totalSuppliers: {
            ...prev.totalSuppliers,
            value: dashboardItems.suppliers?.length || 0,
          },
        };
      });
    }
  }, [dashboardItems]);

  // Refresh data
  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchDashboardData();
    toast.success("Dashboard updated!");
  };

  // Toggle favorite
  const toggleFavorite = (type, id) => {
    const key = `${type}-${id}`;
    setFavorites((prev) => {
      if (prev.includes(key)) {
        toast.success("Removed from favorites");
        return prev.filter((f) => f !== key);
      } else {
        toast.success("Added to favorites");
        return [...prev, key];
      }
    });
  };

  // Handle stat click - UPDATES THE CHART WITH UNIQUE DATA
  const handleStatClick = (statKey) => {
    setSelectedMetric(statKey);
    toast.success(`Showing ${statKey} analytics`);
  };

  // Get current chart data based on selected metric
  const getCurrentChartData = () => {
    switch (selectedMetric) {
      case "revenue":
        return revenueData;
      case "suppliers":
        return suppliersData;
      case "guides":
        return guidesData;
      case "tools":
        return toolsData;
      case "users":
        return usersData;
      case "engagement":
        return engagementData;
      default:
        return revenueData;
    }
  };

  // Get chart title
  const getChartTitle = () => {
    switch (selectedMetric) {
      case "revenue":
        return "Revenue Overview";
      case "suppliers":
        return "Supplier Distribution";
      case "guides":
        return "Guide Performance";
      case "tools":
        return "Tool Usage Analytics";
      case "users":
        return "User Growth Metrics";
      case "engagement":
        return "Engagement Analytics";
      default:
        return "Revenue Overview";
    }
  };

  // Get chart color
  const getChartColor = () => {
    switch (selectedMetric) {
      case "revenue":
        return "#3b82f6";
      case "suppliers":
        return "#f97316";
      case "guides":
        return "#3b82f6";
      case "tools":
        return "#a855f7";
      case "users":
        return "#22c55e";
      case "engagement":
        return "#ec4899";
      default:
        return "#3b82f6";
    }
  };

  // Render different chart types based on selected metric
  const renderChart = () => {
    const data = getCurrentChartData();

    switch (selectedMetric) {
      case "revenue":
        return (
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              fillOpacity={1}
              fill="url(#colorRevenue)"
              name="Revenue"
            />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="profit"
              stroke="#10b981"
              fillOpacity={1}
              fill="url(#colorProfit)"
              name="Profit"
            />
            <Bar
              yAxisId="right"
              dataKey="orders"
              fill="#f59e0b"
              name="Orders"
            />
          </AreaChart>
        );

      case "suppliers":
        return (
          <BarChart data={data} layout="vertical">
            <XAxis type="number" />
            <YAxis type="category" dataKey="category" />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#f97316" name="Supplier Count" />
            <Bar dataKey="active" fill="#22c55e" name="Active %" />
          </BarChart>
        );

      case "guides":
        return (
          <ComposedChart data={data}>
            <XAxis dataKey="topic" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="views" fill="#3b82f6" name="Views" />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="likes"
              stroke="#ec4899"
              name="Likes"
            />
            <Scatter
              yAxisId="right"
              dataKey="shares"
              fill="#f59e0b"
              name="Shares"
            />
          </ComposedChart>
        );

      case "tools":
        return (
          <BarChart data={data} layout="vertical">
            <XAxis type="number" />
            <YAxis type="category" dataKey="name" />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Bar dataKey="usage" fill="#a855f7" name="Usage Count" />
            <Bar dataKey="satisfaction" fill="#22c55e" name="Satisfaction %" />
          </BarChart>
        );

      case "users":
        return (
          <BarChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Bar dataKey="new" stackId="a" fill="#3b82f6" name="New Users" />
            <Bar
              dataKey="returning"
              stackId="a"
              fill="#10b981"
              name="Returning Users"
            />
            <Line
              type="monotone"
              dataKey="active"
              stroke="#f59e0b"
              name="Active Users"
            />
          </BarChart>
        );

      case "engagement":
        return (
          <LineChart data={data}>
            <XAxis dataKey="day" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="pageViews"
              stroke="#3b82f6"
              name="Page Views"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="timeSpent"
              stroke="#f59e0b"
              name="Time Spent (min)"
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="bounceRate"
              stroke="#ef4444"
              name="Bounce Rate %"
            />
          </LineChart>
        );

      default:
        return null;
    }
  };

  // Get current value display
  const getCurrentValue = () => {
    switch (selectedMetric) {
      case "revenue":
        return formatCurrency(stats?.totalRevenue.value);
      case "suppliers":
        return `${formatNumber(stats?.totalSuppliers.value)} Suppliers`;
      case "guides":
        return `${formatNumber(stats?.totalGuides.value)} Guides`;
      case "tools":
        return `${Math.round(stats?.totalTools.value)} Tools`;
      case "users":
        return `${formatNumber(stats?.activeUsers.value)} Users`;
      case "engagement":
        return `${Math.round(stats?.avgEngagement.value)}% Engagement`;
      default:
        return formatCurrency(stats?.totalRevenue.value);
    }
  };

  // Handle item click
  const handleItemClick = (type, id) => {
    navigate(`/dashboard/${type}/${id}`);
  };

  // Handle quick actions
  const handleQuickAction = (action, id) => {
    switch (action) {
      case "edit":
        toast.success(`Editing item ${id}`);
        break;
      case "delete":
        if (window.confirm("Are you sure you want to delete this item?")) {
          toast.success("Item deleted");
        }
        break;
      case "copy":
        navigator.clipboard.writeText(id.toString());
        toast.success("ID copied to clipboard");
        break;
      default:
        break;
    }
  };

  // Handle add actions
  const handleAddSupplier = () => {
    navigate("/dashboard/suppliers?action=add");
  };

  const handleAddGuide = () => {
    navigate("/dashboard/guides?action=add");
  };

  const handleAddTool = () => {
    navigate("/dashboard/business-tools?action=add");
  };

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Format number - WHOLE NUMBERS ONLY
  const formatNumber = (value) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Math.round(value));
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "active":
      case "published":
        return "bg-green-100 text-green-600";
      case "pending":
      case "draft":
      case "beta":
        return "bg-yellow-100 text-yellow-600";
      case "inactive":
        return "bg-gray-100 text-gray-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
      case "published":
        return <CheckCircle size={12} className="text-green-600" />;
      case "pending":
      case "draft":
      case "beta":
        return <Clock size={12} className="text-yellow-600" />;
      case "inactive":
        return <XCircle size={12} className="text-gray-600" />;
      default:
        return null;
    }
  };

  // Filter and sort suppliers
  const filteredSuppliers = useMemo(() => {
    let filtered = [...recentSuppliers];

    if (searchTerm) {
      filtered = filtered.filter(
        (s) =>
          s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.location.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter((s) => s.status === filterStatus);
    }

    filtered.sort((a, b) => {
      let aVal, bVal;
      switch (sortBy) {
        case "name":
          aVal = a.name;
          bVal = b.name;
          break;
        case "date":
          aVal = new Date(a.date);
          bVal = new Date(b.date);
          break;
        case "rating":
          aVal = a.rating;
          bVal = b.rating;
          break;
        default:
          aVal = a.id;
          bVal = b.id;
      }

      if (sortDirection === "asc") {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    return filtered;
  }, [recentSuppliers, searchTerm, filterStatus, sortBy, sortDirection]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
        <p className="mt-4 text-gray-600">Loading BizCraft dashboard...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <AlertCircle size={48} className="text-red-500 mb-4" />
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={fetchDashboardData}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Main dashboard render
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            {/* Logo and Brand */}
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-3 group cursor-pointer"
            >
              <img 
                src={logo} 
                alt="BizCraft Logo" 
                className="h-8 w-auto object-contain"
              />
              <span className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                BizCraft
              </span>
            </button>
            <span className="text-gray-300 text-2xl font-light mx-2">|</span>
            <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Refresh Button */}
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="p-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors disabled:opacity-50"
              title="Refresh data"
            >
              <RefreshCw
                size={20}
                className={refreshing ? "animate-spin" : ""}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Welcome Message */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Welcome back, {user?.name || "User"}!
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Stats Cards - New Component */}
        <StatsCards />

        {/* Quick Add Actions */}
        <div className="flex gap-4 flex-wrap">
          <button
            onClick={handleAddSupplier}
            className="px-4 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 flex items-center gap-2 text-sm font-medium transition-all hover:scale-105"
          >
            <PlusCircle size={18} />
            Add Supplier
          </button>
          <button
            onClick={handleAddGuide}
            className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 flex items-center gap-2 text-sm font-medium transition-all hover:scale-105"
          >
            <PlusCircle size={18} />
            Add Guide
          </button>
          <button
            onClick={handleAddTool}
            className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 flex items-center gap-2 text-sm font-medium transition-all hover:scale-105"
          >
            <PlusCircle size={18} />
            Add Business Tool
          </button>
        </div>

        {/* Stats Cards - Original (kept for chart interaction) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {/* Total Suppliers */}
          <div
            onClick={() => handleStatClick("suppliers")}
            className={`bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 cursor-pointer relative group ${
              selectedMetric === "suppliers" ? "ring-2 ring-orange-500" : ""
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Suppliers</p>
                <h3 className="text-2xl font-bold text-gray-800">
                  {formatNumber(stats?.totalSuppliers.value)}
                </h3>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <Truck className="w-5 h-5 text-orange-600" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <span
                className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${
                  stats?.totalSuppliers.trend === "up"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {stats?.totalSuppliers.change > 0 ? "+" : ""}
                {stats?.totalSuppliers.change.toFixed(1)}%
                {stats?.totalSuppliers.trend === "up" ? (
                  <ArrowUp size={12} />
                ) : (
                  <ArrowDown size={12} />
                )}
              </span>
              <span className="text-xs text-gray-500">vs last month</span>
            </div>
          </div>

          {/* Total Guides */}
          <div
            onClick={() => handleStatClick("guides")}
            className={`bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 cursor-pointer relative group ${
              selectedMetric === "guides" ? "ring-2 ring-blue-500" : ""
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Guides</p>
                <h3 className="text-2xl font-bold text-gray-800">
                  {formatNumber(stats?.totalGuides.value)}
                </h3>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <BookOpen className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <span
                className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${
                  stats?.totalGuides.trend === "up"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {stats?.totalGuides.change > 0 ? "+" : ""}
                {stats?.totalGuides.change.toFixed(1)}%
                {stats?.totalGuides.trend === "up" ? (
                  <ArrowUp size={12} />
                ) : (
                  <ArrowDown size={12} />
                )}
              </span>
              <span className="text-xs text-gray-500">vs last month</span>
            </div>
          </div>

          {/* Business Tools */}
          <div
            onClick={() => handleStatClick("tools")}
            className={`bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 cursor-pointer relative group ${
              selectedMetric === "tools" ? "ring-2 ring-purple-500" : ""
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 mb-1">Business Tools</p>
                <h3 className="text-2xl font-bold text-gray-800">
                  {Math.round(stats?.totalTools.value)}
                </h3>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Calculator className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <span
                className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${
                  stats?.totalTools.trend === "up"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {stats?.totalTools.change > 0 ? "+" : ""}
                {stats?.totalTools.change.toFixed(1)}%
                {stats?.totalTools.trend === "up" ? (
                  <ArrowUp size={12} />
                ) : (
                  <ArrowDown size={12} />
                )}
              </span>
              <span className="text-xs text-gray-500">vs last month</span>
            </div>
          </div>

          {/* Active Users */}
          <div
            onClick={() => handleStatClick("users")}
            className={`bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 cursor-pointer relative group ${
              selectedMetric === "users" ? "ring-2 ring-green-500" : ""
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 mb-1">Active Users</p>
                <h3 className="text-2xl font-bold text-gray-800">
                  {formatNumber(stats?.activeUsers.value)}
                </h3>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <UsersIcon className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <span
                className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${
                  stats?.activeUsers.trend === "up"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {stats?.activeUsers.change > 0 ? "+" : ""}
                {stats?.activeUsers.change.toFixed(1)}%
                {stats?.activeUsers.trend === "up" ? (
                  <ArrowUp size={12} />
                ) : (
                  <ArrowDown size={12} />
                )}
              </span>
              <span className="text-xs text-gray-500">vs last month</span>
            </div>
          </div>

          {/* Total Revenue */}
          <div
            onClick={() => handleStatClick("revenue")}
            className={`bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 cursor-pointer relative group ${
              selectedMetric === "revenue" ? "ring-2 ring-indigo-500" : ""
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Revenue</p>
                <h3 className="text-2xl font-bold text-gray-800">
                  {formatCurrency(stats?.totalRevenue.value)}
                </h3>
              </div>
              <div className="p-3 bg-indigo-100 rounded-lg">
                <DollarSign className="w-5 h-5 text-indigo-600" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <span
                className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${
                  stats?.totalRevenue.trend === "up"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {stats?.totalRevenue.change > 0 ? "+" : ""}
                {stats?.totalRevenue.change.toFixed(1)}%
                {stats?.totalRevenue.trend === "up" ? (
                  <ArrowUp size={12} />
                ) : (
                  <ArrowDown size={12} />
                )}
              </span>
              <span className="text-xs text-gray-500">vs last month</span>
            </div>
          </div>

          {/* Avg Engagement */}
          <div
            onClick={() => handleStatClick("engagement")}
            className={`bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 cursor-pointer relative group ${
              selectedMetric === "engagement" ? "ring-2 ring-pink-500" : ""
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 mb-1">Avg Engagement</p>
                <h3 className="text-2xl font-bold text-gray-800">
                  {Math.round(stats?.avgEngagement.value)}%
                </h3>
              </div>
              <div className="p-3 bg-pink-100 rounded-lg">
                <Activity className="w-5 h-5 text-pink-600" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <span
                className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${
                  stats?.avgEngagement.trend === "up"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {stats?.avgEngagement.change > 0 ? "+" : ""}
                {stats?.avgEngagement.change.toFixed(1)}%
                {stats?.avgEngagement.trend === "up" ? (
                  <ArrowUp size={12} />
                ) : (
                  <ArrowDown size={12} />
                )}
              </span>
              <span className="text-xs text-gray-500">vs last month</span>
            </div>
          </div>
        </div>

        {/* Interactive Chart - Changes based on clicked stat */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                {getChartTitle()}
              </h2>
              <p
                className="text-3xl font-bold text-gray-800 mt-2"
                style={{ color: getChartColor() }}
              >
                {getCurrentValue()}
              </p>
            </div>
            <div className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              Click on stat cards above to change visualization
            </div>
          </div>

          <ResponsiveContainer width="100%" height={350}>
            {renderChart()}
          </ResponsiveContainer>
        </div>

        {/* Second Row of Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Supplier Categories Pie Chart */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Supplier Categories
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <RePieChart>
                <Pie
                  data={supplierCategories}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {supplierCategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RePieChart>
            </ResponsiveContainer>
          </div>

          {/* Performance Radar Chart */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Performance Metrics
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <RadarChart
                cx="50%"
                cy="50%"
                outerRadius="80%"
                data={performanceData}
              >
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <ReRadar
                  name="Score"
                  dataKey="A"
                  stroke="#8b5cf6"
                  fill="#8b5cf6"
                  fillOpacity={0.6}
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-3 gap-2 mt-4 text-xs text-gray-600">
              {performanceData.map((item) => (
                <div key={item.subject} className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                  <span>
                    {item.subject}: {item.A}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Items Grid with Activity Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Suppliers */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">
                Recent Suppliers
              </h2>
              <button
                onClick={() => navigate("/dashboard/suppliers")}
                className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                View All
                <ChevronRight size={16} />
              </button>
            </div>
            <div className="divide-y max-h-96 overflow-y-auto">
              {filteredSuppliers.slice(0, 3).map((supplier) => (
                <div
                  key={supplier.id}
                  className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => handleItemClick("suppliers", supplier.id)}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-medium text-gray-800">
                      {supplier.name}
                    </h3>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${getStatusColor(supplier.status)}`}
                    >
                      {supplier.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{supplier.category}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-400">
                      {supplier.location}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-xs text-gray-600">
                        {supplier.rating}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-100">
              <button
                onClick={handleAddSupplier}
                className="w-full py-2 text-sm text-orange-600 hover:text-orange-700 font-medium flex items-center justify-center gap-1 hover:bg-orange-50 rounded-lg transition-colors"
              >
                <PlusCircle size={16} />
                Add New Supplier
              </button>
            </div>
          </div>

          {/* Recent Guides */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">
                Recent Guides
              </h2>
              <button
                onClick={() => navigate("/dashboard/guides")}
                className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                View All
                <ChevronRight size={16} />
              </button>
            </div>
            <div className="divide-y max-h-96 overflow-y-auto">
              {recentGuides.slice(0, 3).map((guide) => (
                <div
                  key={guide.id}
                  className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => handleItemClick("guides", guide.id)}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-medium text-gray-800">{guide.title}</h3>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${getStatusColor(guide.status)}`}
                    >
                      {guide.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{guide.category}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-400">
                      {guide.author}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatNumber(guide.reads)} reads
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-100">
              <button
                onClick={handleAddGuide}
                className="w-full py-2 text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center gap-1 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <PlusCircle size={16} />
                Add New Guide
              </button>
            </div>
          </div>

          {/* Activity Feed - New Component */}
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;