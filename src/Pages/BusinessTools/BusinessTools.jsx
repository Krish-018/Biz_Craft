// src/pages/Dashboard/BusinessTools.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useDashboard } from "../../context/DashboardContext";
import {
  Wrench,
  Search,
  Grid,
  List,
  Plus,
  Trash2,
  ArrowRight,
  Clock,
  Star,
  Users,
  Calendar,
  Award,
  TrendingUp,
  RefreshCw,
  BookOpen,
  Package,
  ShoppingBag,
  FileText,
  Wallet,
  Target,
  DollarSign,
  Layout,
  Filter,
  Eye,
  Download,
  Sparkles,
  Zap,
  Shield,
  Globe,
  CreditCard,
  HardDrive,
  Settings,
} from "lucide-react";
import { toast } from "react-hot-toast";

// Styles
const styles = `
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .animate-slideUp {
    animation: slideUp 0.4s ease-out forwards;
  }
  
  .stagger-item {
    opacity: 0;
    animation: slideUp 0.4s ease-out forwards;
  }
  
  .stagger-item:nth-child(1) { animation-delay: 0.1s; }
  .stagger-item:nth-child(2) { animation-delay: 0.15s; }
  .stagger-item:nth-child(3) { animation-delay: 0.2s; }
  .stagger-item:nth-child(4) { animation-delay: 0.25s; }
  .stagger-item:nth-child(5) { animation-delay: 0.3s; }
  
  .hover-lift {
    transition: all 0.2s ease;
  }
  
  .hover-lift:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px -5px rgba(139, 92, 246, 0.2);
  }
`;

// Placeholder images for tools
const placeholderIcons = {
  'supplier-database': '🏢',
  'inventory-tracker': '📦',
  'order-management': '🛒',
  'invoice-generator': '📄',
  'expense-tracker': '💰',
  'project-planner': '🎯',
  'profit-margin-calculator': '📊',
  'cash-flow-forecaster': '💵',
  'loan-emi-calculator': '🏦',
  'break-even-analyzer': '⚖️',
  'tax-estimator': '🧾',
  'roi-calculator': '📈',
  'default': '🔧'
};

const BusinessTools = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { 
    dashboardItems, 
    removeFromDashboard, 
    refreshDashboard 
  } = useDashboard();
  
  const [myTools, setMyTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("recent");
  const [filterCategory, setFilterCategory] = useState("all");
  const [refreshing, setRefreshing] = useState(false);

  // Load tools from dashboard context
  useEffect(() => {
    loadMyTools();
  }, [dashboardItems.tools]);

  const loadMyTools = () => {
    setLoading(true);
    // Get tools from dashboard context with proper structure
    const tools = (dashboardItems.tools || []).map(tool => ({
      ...tool,
      title: tool.name || tool.title || "Untitled Tool",
      description: tool.description || "No description available",
      category: tool.category || "General",
      usage: tool.usage || tool.users || Math.floor(Math.random() * 1000) + 500,
      rating: tool.rating || 4.5,
      addedAt: tool.addedAt || new Date().toISOString(),
      icon: tool.icon || 'default',
      color: tool.color || getRandomColor(),
      lastUsed: tool.lastUsed || tool.addedAt || new Date().toISOString()
    }));
    
    setMyTools(tools);
    setLoading(false);
  };

  // Helper to get random color for placeholder
  const getRandomColor = () => {
    const colors = ['blue', 'purple', 'green', 'orange', 'pink', 'indigo'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Get icon for tool
  const getToolIcon = (iconName) => {
    return placeholderIcons[iconName] || placeholderIcons.default;
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await refreshDashboard();
    setRefreshing(false);
    toast.success("Dashboard updated");
  };

  const handleRemoveTool = async (toolId, e) => {
    e.stopPropagation();
    if (window.confirm('Remove this tool from your dashboard?')) {
      await removeFromDashboard('tools', toolId);
      toast.success('Tool removed from dashboard');
    }
  };

  const handleViewTool = (toolId) => {
    navigate(`/tools/${toolId}`);
  };

  const handleBrowseTools = () => {
    navigate('/tools');
  };

  // Get unique categories from user's tools
  const categories = ["all", ...new Set(myTools.map(tool => tool.category).filter(Boolean))];

  // Filter and sort tools
  const filteredTools = myTools
    .filter(tool => {
      const matchesSearch = searchTerm === "" ||
        tool.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.category?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = filterCategory === "all" || tool.category === filterCategory;
      
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch(sortBy) {
        case "recent":
          return new Date(b.addedAt || 0) - new Date(a.addedAt || 0);
        case "title":
          return (a.title || "").localeCompare(b.title || "");
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        case "usage":
          return (b.usage || 0) - (a.usage || 0);
        default:
          return 0;
      }
    });

  const ToolCard = ({ tool }) => {
    const color = tool.color || 'purple';
    const formattedDate = tool.addedAt ? new Date(tool.addedAt).toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric'
    }) : 'Recently';
    
    const icon = getToolIcon(tool.icon);

    return (
      <div
        onClick={() => handleViewTool(tool.id)}
        className="group relative bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all cursor-pointer overflow-hidden hover-lift stagger-item"
      >
        <div className="p-5">
          {/* Header with Icon and Title */}
          <div className="flex items-start gap-3 mb-3">
            {/* Icon */}
            <div className={`w-14 h-14 rounded-lg flex items-center justify-center text-2xl bg-${color}-100 text-${color}-600 flex-shrink-0`}>
              {icon}
            </div>

            {/* Title and Category */}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-800 group-hover:text-purple-600 transition-colors line-clamp-2">
                {tool.title}
              </h3>
              <p className="text-sm text-gray-500 mt-1 capitalize">{tool.category}</p>
            </div>

            {/* Remove Button */}
            <button
              onClick={(e) => handleRemoveTool(tool.id, e)}
              className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
              title="Remove from dashboard"
            >
              <Trash2 size={16} />
            </button>
          </div>

          {/* Description */}
          {tool.description && (
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{tool.description}</p>
          )}

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-3">
            <span className="flex items-center gap-1">
              <Users size={12} />
              {tool.usage.toLocaleString()} uses
            </span>
            <span className="flex items-center gap-1">
              <Star size={12} className="text-yellow-400 fill-current" />
              {tool.rating}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {formattedDate}
            </span>
          </div>

          {/* Last Used (if available) */}
          {tool.lastUsed && (
            <div className="text-xs text-gray-400 mb-3">
              Last used: {new Date(tool.lastUsed).toLocaleDateString()}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <button
              onClick={() => handleViewTool(tool.id)}
              className="text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1"
            >
              Open Tool
              <ArrowRight size={14} />
            </button>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Wrench size={12} />
              <span>Tool</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // If not authenticated, show login prompt
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Wrench size={32} className="text-purple-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Please Login</h2>
          <p className="text-gray-600 mb-6">Login to view your saved tools</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/register')}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-6">
      <style>{styles}</style>

      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 py-4 md:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center gap-2">
                <Wrench className="text-purple-600" size={24} />
                My Business Tools
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {myTools.length} {myTools.length === 1 ? 'tool' : 'tools'} saved to your dashboard
              </p>
            </div>
            
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 disabled:opacity-50"
                title="Refresh"
              >
                <RefreshCw size={18} className={refreshing ? 'animate-spin' : ''} />
              </button>
              <button
                onClick={handleBrowseTools}
                className="flex-1 sm:flex-none px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center justify-center gap-2 text-sm font-medium"
              >
                <Plus size={18} />
                Browse Tools
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-4 md:px-6 pt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-4 text-white">
            <Wrench size={20} className="mb-2 opacity-80" />
            <p className="text-2xl font-bold">{myTools.length}</p>
            <p className="text-xs opacity-80">Total Tools</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <Users size={20} className="text-purple-600 mb-2" />
            <p className="text-2xl font-bold text-gray-800">
              {myTools.reduce((acc, t) => acc + (t.usage || 0), 0).toLocaleString()}
            </p>
            <p className="text-xs text-gray-500">Total Uses</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <Star size={20} className="text-yellow-600 mb-2" />
            <p className="text-2xl font-bold text-gray-800">
              {(myTools.reduce((acc, t) => acc + (t.rating || 0), 0) / (myTools.length || 1)).toFixed(1)}
            </p>
            <p className="text-xs text-gray-500">Avg Rating</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <TrendingUp size={20} className="text-green-600 mb-2" />
            <p className="text-2xl font-bold text-gray-800">
              {myTools.length}
            </p>
            <p className="text-xs text-gray-500">In Toolkit</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search your tools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
            >
              <option value="recent">Recently Added</option>
              <option value="title">Title</option>
              <option value="rating">Rating</option>
              <option value="usage">Most Used</option>
            </select>

            {categories.length > 2 && (
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
              >
                <option value="all">All Categories</option>
                {categories.filter(c => c !== "all").map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            )}

            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-500'
                }`}
              >
                <Grid size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-500'
                }`}
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-purple-600 border-t-transparent"></div>
            <p className="text-gray-500 mt-3">Loading your tools...</p>
          </div>
        ) : filteredTools.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Wrench size={32} className="text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No tools yet</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              {searchTerm || filterCategory !== "all" 
                ? "No tools match your search criteria" 
                : "You haven't added any tools to your dashboard yet"}
            </p>
            <button
              onClick={handleBrowseTools}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 inline-flex items-center gap-2"
            >
              <Plus size={18} />
              Browse Tools
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTools.map(tool => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Tool</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Category</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Added</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Usage</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Rating</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredTools.map(tool => {
                  const formattedDate = tool.addedAt ? new Date(tool.addedAt).toLocaleDateString('en-US', {
                    month: 'numeric',
                    day: 'numeric',
                    year: 'numeric'
                  }) : 'Recently';

                  return (
                    <tr 
                      key={tool.id} 
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleViewTool(tool.id)}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-purple-100 rounded flex items-center justify-center text-lg">
                            {getToolIcon(tool.icon)}
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{tool.title}</p>
                            <p className="text-xs text-gray-500">{tool.description?.substring(0, 30)}...</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-purple-100 text-purple-600 text-xs rounded-full capitalize">
                          {tool.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{formattedDate}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{tool.usage.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <Star size={12} className="text-yellow-400 fill-current" />
                          <span className="text-sm">{tool.rating}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveTool(tool.id, e);
                          }}
                          className="p-1 text-gray-400 hover:text-red-600"
                          title="Remove from dashboard"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessTools;