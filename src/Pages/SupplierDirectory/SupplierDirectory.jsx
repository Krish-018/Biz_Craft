// src/pages/SupplierDirectory/SupplierDirectory.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useDashboard } from "../../context/DashboardContext";
import {
  Building2,
  Search,
  Filter,
  ChevronRight,
  Star,
  Clock,
  Users,
  TrendingUp,
  Shield,
  DollarSign,
  Award,
  MapPin,
  Phone,
  Mail,
  Globe,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  AlertCircle,
  Grid,
  List,
  Plus,
  Check,
  Sparkles,
  X,
  Eye,
  Heart,
  Share2,
  Calendar,
  Tag,
  Layers,
  Zap,
  Rocket,
  Gift,
  ThumbsUp,
  MessageCircle,
  Info,
  Lightbulb,
  HelpCircle,
  RefreshCw,
  Trash2,
  ArrowRight,
  Layout,
  Filter as FilterIcon,
  ChevronDown,
  SlidersHorizontal,
  Download,
  Image as ImageIcon,
  Verified,
  Briefcase,
  Globe2,
  Clock as ClockIcon,
  CalendarDays
} from "lucide-react";
import { toast } from "react-hot-toast";

// Styles
const styles = `
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
  }
  
  .animate-slideUp {
    animation: slideUp 0.4s ease-out forwards;
  }
  
  .animate-scaleIn {
    animation: scaleIn 0.3s ease-out forwards;
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
    box-shadow: 0 10px 20px -5px rgba(59, 130, 246, 0.2);
  }
  
  .image-placeholder {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 24px;
    font-weight: bold;
  }
`;

// Placeholder images for suppliers
const placeholderImages = [
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%233b82f6'/%3E%3Ctext x='50' y='65' font-size='40' text-anchor='middle' fill='white' font-family='Arial'%3E🏢%3C/text%3E%3C/svg%3E",
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%2310b981'/%3E%3Ctext x='50' y='65' font-size='40' text-anchor='middle' fill='white' font-family='Arial'%3E🏭%3C/text%3E%3C/svg%3E",
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%238b5cf6'/%3E%3Ctext x='50' y='65' font-size='40' text-anchor='middle' fill='white' font-family='Arial'%3E📦%3C/text%3E%3C/svg%3E",
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f59e0b'/%3E%3Ctext x='50' y='65' font-size='40' text-anchor='middle' fill='white' font-family='Arial'%3E🚚%3C/text%3E%3C/svg%3E",
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23ec4899'/%3E%3Ctext x='50' y='65' font-size='40' text-anchor='middle' fill='white' font-family='Arial'%3E💼%3C/text%3E%3C/svg%3E"
];

const SupplierDirectory = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { 
    dashboardItems, 
    removeFromDashboard, 
    refreshDashboard 
  } = useDashboard();
  
  const [mySuppliers, setMySuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("recent");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterVerified, setFilterVerified] = useState("all");
  const [refreshing, setRefreshing] = useState(false);

  // Load suppliers from dashboard context
  useEffect(() => {
    loadMySuppliers();
  }, [dashboardItems.suppliers]);

  const loadMySuppliers = () => {
    setLoading(true);
    // Get suppliers from dashboard context with proper structure
    const suppliers = (dashboardItems.suppliers || []).map(supplier => ({
      ...supplier,
      // Ensure all fields exist with defaults
      name: supplier.name || "Unknown Supplier",
      description: supplier.description || supplier.shortDescription || "No description available",
      category: supplier.category || "General",
      location: supplier.location || "Location not specified",
      rating: supplier.rating || 4.0,
      verified: supplier.verified || false,
      products: supplier.products || 0,
      email: supplier.email || "contact@supplier.com",
      phone: supplier.phone || "+1 (555) 000-0000",
      website: supplier.website || "www.supplier.com",
      addedAt: supplier.addedAt || new Date().toISOString(),
      image: supplier.image || supplier.logo || placeholderImages[Math.floor(Math.random() * placeholderImages.length)],
      color: supplier.color || getRandomColor(),
      status: supplier.status || "active",
      totalOrders: supplier.totalOrders || 0,
      successRate: supplier.successRate || 98
    }));
    
    setMySuppliers(suppliers);
    setLoading(false);
  };

  // Helper to get random color for placeholder
  const getRandomColor = () => {
    const colors = ['blue', 'green', 'purple', 'orange', 'pink', 'indigo'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await refreshDashboard();
    setRefreshing(false);
    toast.success("Dashboard updated");
  };

  const handleRemoveSupplier = async (supplierId, e) => {
    e.stopPropagation();
    if (window.confirm('Remove this supplier from your directory?')) {
      await removeFromDashboard('suppliers', supplierId);
      toast.success('Supplier removed from directory');
    }
  };

  const handleViewSupplier = (supplierId) => {
    navigate(`/suppliers/${supplierId}`);
  };

  const handleBrowseSuppliers = () => {
    navigate('/suppliers');
  };

  // Get unique categories from user's suppliers
  const categories = ["all", ...new Set(mySuppliers.map(s => s.category).filter(Boolean))];

  // Filter and sort suppliers
  const filteredSuppliers = mySuppliers
    .filter(supplier => {
      // Search filter
      const matchesSearch = searchTerm === "" ||
        supplier.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.location?.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Category filter
      const matchesCategory = filterCategory === "all" || supplier.category === filterCategory;
      
      // Verified filter
      const matchesVerified = filterVerified === "all" || 
        (filterVerified === "verified" && supplier.verified) ||
        (filterVerified === "unverified" && !supplier.verified);
      
      return matchesSearch && matchesCategory && matchesVerified;
    })
    .sort((a, b) => {
      switch(sortBy) {
        case "recent":
          return new Date(b.addedAt || 0) - new Date(a.addedAt || 0);
        case "name":
          return (a.name || "").localeCompare(b.name || "");
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        case "products":
          return (b.products || 0) - (a.products || 0);
        case "orders":
          return (b.totalOrders || 0) - (a.totalOrders || 0);
        default:
          return 0;
      }
    });

  const SupplierCard = ({ supplier }) => {
    const color = supplier.color || 'blue';
    const formattedDate = supplier.addedAt ? new Date(supplier.addedAt).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }) : 'Recently';

    return (
      <div
        onClick={() => handleViewSupplier(supplier.id)}
        className="group relative bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all cursor-pointer overflow-hidden hover-lift stagger-item"
      >
        <div className="p-5">
          {/* Header with Image and Title */}
          <div className="flex items-start gap-3 mb-3">
            {/* Image/Logo */}
            <div className={`w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-${color}-100 border border-gray-200`}>
              {supplier.image ? (
                <img 
                  src={supplier.image} 
                  alt={supplier.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = placeholderImages[0];
                  }}
                />
              ) : (
                <div className={`w-full h-full flex items-center justify-center bg-${color}-100 text-${color}-600 text-2xl font-bold`}>
                  {supplier.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            {/* Name and Verified Badge */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-1">
                  {supplier.name}
                </h3>
                {supplier.verified && (
                  <span className="flex-shrink-0" title="Verified Supplier">
                    <CheckCircle size={16} className="text-green-500 fill-current" />
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1 line-clamp-1">{supplier.category}</p>
              <div className="flex items-center gap-1 mt-1">
                <MapPin size={12} className="text-gray-400" />
                <span className="text-xs text-gray-500 truncate">{supplier.location}</span>
              </div>
            </div>

            {/* Remove Button */}
            <button
              onClick={(e) => handleRemoveSupplier(supplier.id, e)}
              className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
              title="Remove from directory"
            >
              <Trash2 size={16} />
            </button>
          </div>

          {/* Description */}
          {supplier.description && (
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{supplier.description}</p>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-2 mb-3">
            <div className="text-center p-2 bg-gray-50 rounded-lg">
              <Package size={14} className="mx-auto mb-1 text-gray-400" />
              <p className="text-xs font-medium text-gray-700">{supplier.products}</p>
              <p className="text-xs text-gray-500">Products</p>
            </div>
            <div className="text-center p-2 bg-gray-50 rounded-lg">
              <Star size={14} className="mx-auto mb-1 text-yellow-400 fill-current" />
              <p className="text-xs font-medium text-gray-700">{supplier.rating}</p>
              <p className="text-xs text-gray-500">Rating</p>
            </div>
            <div className="text-center p-2 bg-gray-50 rounded-lg">
              <Truck size={14} className="mx-auto mb-1 text-gray-400" />
              <p className="text-xs font-medium text-gray-700">{supplier.totalOrders}</p>
              <p className="text-xs text-gray-500">Orders</p>
            </div>
          </div>

          {/* Success Rate */}
          <div className="mb-3">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-gray-500">Success Rate</span>
              <span className="font-medium text-green-600">{supplier.successRate}%</span>
            </div>
            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-500 rounded-full transition-all duration-300"
                style={{ width: `${supplier.successRate}%` }}
              />
            </div>
          </div>

          {/* Added Date */}
          <div className="flex items-center gap-1 text-xs text-gray-400 mb-3">
            <CalendarDays size={12} />
            <span>Added {formattedDate}</span>
          </div>

          {/* Contact Icons */}
          <div className="flex items-center gap-2 mb-3">
            {supplier.email && (
              <a 
                href={`mailto:${supplier.email}`}
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-blue-100 hover:text-blue-600 transition-colors"
                title={`Email: ${supplier.email}`}
              >
                <Mail size={14} />
              </a>
            )}
            {supplier.phone && (
              <a 
                href={`tel:${supplier.phone}`}
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-green-100 hover:text-green-600 transition-colors"
                title={`Call: ${supplier.phone}`}
              >
                <Phone size={14} />
              </a>
            )}
            {supplier.website && (
              <a 
                href={`https://${supplier.website}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-purple-100 hover:text-purple-600 transition-colors"
                title={`Website: ${supplier.website}`}
              >
                <Globe size={14} />
              </a>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <button
              onClick={() => handleViewSupplier(supplier.id)}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
            >
              View Details
              <ArrowRight size={14} />
            </button>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Building2 size={12} />
              <span>Supplier</span>
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
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building2 size={32} className="text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Please Login</h2>
          <p className="text-gray-600 mb-6">Login to view your supplier directory</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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
                <Building2 className="text-blue-600" size={24} />
                My Supplier Directory
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {mySuppliers.length} {mySuppliers.length === 1 ? 'supplier' : 'suppliers'} in your directory
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
                onClick={handleBrowseSuppliers}
                className="flex-1 sm:flex-none px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 text-sm font-medium"
              >
                <Plus size={18} />
                Browse Suppliers
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-4 md:px-6 pt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-4 text-white">
            <Building2 size={20} className="mb-2 opacity-80" />
            <p className="text-2xl font-bold">{mySuppliers.length}</p>
            <p className="text-xs opacity-80">Total Suppliers</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <CheckCircle size={20} className="text-green-600 mb-2" />
            <p className="text-2xl font-bold text-gray-800">
              {mySuppliers.filter(s => s.verified).length}
            </p>
            <p className="text-xs text-gray-500">Verified</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <Star size={20} className="text-yellow-600 mb-2" />
            <p className="text-2xl font-bold text-gray-800">
              {(mySuppliers.reduce((acc, s) => acc + (s.rating || 0), 0) / (mySuppliers.length || 1)).toFixed(1)}
            </p>
            <p className="text-xs text-gray-500">Avg Rating</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <Package size={20} className="text-purple-600 mb-2" />
            <p className="text-2xl font-bold text-gray-800">
              {mySuppliers.reduce((acc, s) => acc + (s.products || 0), 0)}
            </p>
            <p className="text-xs text-gray-500">Total Products</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search your suppliers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
            >
              <option value="recent">Recently Added</option>
              <option value="name">Name</option>
              <option value="rating">Rating</option>
              <option value="products">Products</option>
              <option value="orders">Orders</option>
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

            <select
              value={filterVerified}
              onChange={(e) => setFilterVerified(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
            >
              <option value="all">All Suppliers</option>
              <option value="verified">Verified Only</option>
              <option value="unverified">Unverified</option>
            </select>

            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'
                }`}
              >
                <Grid size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'
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
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent"></div>
            <p className="text-gray-500 mt-3">Loading your suppliers...</p>
          </div>
        ) : filteredSuppliers.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building2 size={32} className="text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No suppliers yet</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              {searchTerm || filterCategory !== "all" || filterVerified !== "all"
                ? "No suppliers match your search criteria" 
                : "You haven't added any suppliers to your directory yet"}
            </p>
            <button
              onClick={handleBrowseSuppliers}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-flex items-center gap-2"
            >
              <Plus size={18} />
              Browse Suppliers
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSuppliers.map(supplier => (
              <SupplierCard key={supplier.id} supplier={supplier} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Supplier</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Category</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Location</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Added</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Rating</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Products</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredSuppliers.map(supplier => {
                  const formattedDate = supplier.addedAt ? new Date(supplier.addedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  }) : 'Recently';

                  return (
                    <tr 
                      key={supplier.id} 
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleViewSupplier(supplier.id)}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center overflow-hidden">
                            {supplier.image ? (
                              <img 
                                src={supplier.image} 
                                alt={supplier.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = placeholderImages[0];
                                }}
                              />
                            ) : (
                              <Building2 size={16} className="text-blue-600" />
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-1">
                              <p className="font-medium text-gray-800">{supplier.name}</p>
                              {supplier.verified && (
                                <CheckCircle size={12} className="text-green-500 fill-current" />
                              )}
                            </div>
                            <p className="text-xs text-gray-500">{supplier.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">
                          {supplier.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{supplier.location}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{formattedDate}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <Star size={12} className="text-yellow-400 fill-current" />
                          <span className="text-sm">{supplier.rating}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{supplier.products}</td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveSupplier(supplier.id, e);
                          }}
                          className="p-1 text-gray-400 hover:text-red-600"
                          title="Remove from directory"
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

export default SupplierDirectory;