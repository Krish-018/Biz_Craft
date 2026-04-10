// src/Pages/Tools/ToolsPage.jsx
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTools } from '../../context/ToolsContext';
import { useActivity } from '../../context/ActivityContext';
import Navbar from '../../components/Navbar/Navbar';
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Star,
  Download,
  Eye,
  Clock,
  X,
  TrendingUp,
  Award,
  Sparkles,
  SlidersHorizontal,
  CheckCircle,
  Users,
  Plus,
  Check,
  Layout,
  Building2,
  Package,
  ShoppingBag,
  FileText,
  Wallet,
  Target,
  DollarSign,
  ChevronRight,
  Zap,
  Shield,
  Rocket,
  Heart,
  Bookmark,
  Share2,
  ChevronDown,
  ArrowUp,
  ArrowDown,
  BarChart3,
  PieChart,
  LineChart,
  Settings,
  MoreVertical,
  AlertCircle,
  Info,
  Lightbulb,
  Globe,
  Clock as ClockIcon,
  Calendar,
  Tag,
  Layers,
  Activity,
  Briefcase,
  Truck,
  Home,
  Coffee,
  Utensils,
  Wine,
  Gift,
  Gem,
  Crown,
  Medal,
  ThumbsUp,
  Mail
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { availableTools, toolCategories } from './data/toolsData';

const styles = `
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    25% { transform: translateY(-4px) rotate(1deg); }
    75% { transform: translateY(4px) rotate(-1deg); }
  }
  
  @keyframes pulse-glow {
    0%, 100% { opacity: 0.1; filter: blur(20px); transform: scale(1); }
    50% { opacity: 0.2; filter: blur(30px); transform: scale(1.05); }
  }
  
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(20px); }
    to { opacity: 1; transform: translateX(0); }
  }
  
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  
  .animate-pulse-glow {
    animation: pulse-glow 4s ease-in-out infinite;
  }
  
  .animate-slideUp {
    animation: slideUp 0.5s ease-out forwards;
  }
  
  .animate-slideDown {
    animation: slideDown 0.3s ease-out forwards;
  }
  
  .animate-slideInRight {
    animation: slideInRight 0.5s ease-out forwards;
  }
  
  .animate-scaleIn {
    animation: scaleIn 0.4s ease-out forwards;
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out forwards;
  }
  
  .stagger-item {
    opacity: 0;
    animation: slideUp 0.5s ease-out forwards;
  }
  
  .stagger-item:nth-child(1) { animation-delay: 0.05s; }
  .stagger-item:nth-child(2) { animation-delay: 0.1s; }
  .stagger-item:nth-child(3) { animation-delay: 0.15s; }
  .stagger-item:nth-child(4) { animation-delay: 0.2s; }
  .stagger-item:nth-child(5) { animation-delay: 0.25s; }
  .stagger-item:nth-child(6) { animation-delay: 0.3s; }
  .stagger-item:nth-child(7) { animation-delay: 0.35s; }
  .stagger-item:nth-child(8) { animation-delay: 0.4s; }
  
  .hover-lift {
    transition: all 0.3s ease;
  }
  
  .hover-lift:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
  
  .glass-effect {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
`;

const ToolsPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addToolToDashboard, isToolInDashboard } = useTools();
  const { addToRecentlyViewed } = useActivity();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('popular');
  const [minRating, setMinRating] = useState(0);
  const [showQuickView, setShowQuickView] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

  const allTags = [...new Set(availableTools.flatMap(t => t.tags))].sort();

  const filteredTools = useMemo(() => {
    let filtered = availableTools.filter(tool => {
      const matchesSearch = searchTerm === '' || 
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
      const matchesRating = tool.rating >= minRating;
      const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => tool.tags.includes(tag));
      
      return matchesSearch && matchesCategory && matchesRating && matchesTags;
    });

    filtered.sort((a, b) => {
      switch(sortBy) {
        case 'popular':
          return b.users - a.users;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return new Date(b.lastUpdated) - new Date(a.lastUpdated);
        case 'name':
          return a.name.localeCompare(b.name);
        case 'downloads':
          return b.downloads - a.downloads;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, sortBy, minRating, selectedTags]);

  const itemsPerPage = 9;
  const paginatedTools = filteredTools.slice(0, page * itemsPerPage);
  const hasMoreItems = paginatedTools.length < filteredTools.length;

  const loadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setPage(prev => prev + 1);
      setIsLoading(false);
    }, 800);
  };

  const handleViewTool = (tool) => {
    addToRecentlyViewed({
      id: tool.id,
      type: 'tool',
      title: tool.name,
      image: tool.screenshots[0] || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=200&fit=crop',
      path: `/tools/${tool.id}`
    });
    navigate(`/tools/${tool.id}`);
  };

  const handleQuickView = (tool, e) => {
    e.stopPropagation();
    setShowQuickView(tool);
  };

  const handleAddToDashboard = (tool, e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      toast((t) => (
        <div className="flex flex-col gap-2">
          <p className="font-medium">Please login to add tools</p>
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
      ), { duration: 5000 });
      return;
    }
    addToolToDashboard(tool);
  };

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setMinRating(0);
    setSortBy('popular');
    setSelectedTags([]);
    toast.success('Filters cleared');
  };

  const getIcon = (iconName) => {
    const icons = {
      Building2, Package, ShoppingBag, FileText, Wallet, Target, DollarSign, Layout,
      Briefcase, Truck, Home, Coffee, Utensils, Wine, Gift, Gem, Crown, Medal, ThumbsUp
    };
    return icons[iconName] || Layout;
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-700 border-blue-200',
      emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      purple: 'bg-purple-50 text-purple-700 border-purple-200',
      red: 'bg-red-50 text-red-700 border-red-200',
      orange: 'bg-orange-50 text-orange-700 border-orange-200',
      indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      green: 'bg-green-50 text-green-700 border-green-200',
      teal: 'bg-teal-50 text-teal-700 border-teal-200',
      pink: 'bg-pink-50 text-pink-700 border-pink-200',
      yellow: 'bg-yellow-50 text-yellow-700 border-yellow-200'
    };
    return colors[color] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const getGradient = (color) => {
    const gradients = {
      blue: 'from-blue-600 to-blue-800',
      emerald: 'from-emerald-600 to-emerald-800',
      purple: 'from-purple-600 to-purple-800',
      red: 'from-red-600 to-red-800',
      orange: 'from-orange-600 to-orange-800',
      indigo: 'from-indigo-600 to-indigo-800',
      green: 'from-green-600 to-green-800',
      teal: 'from-teal-600 to-teal-800',
      pink: 'from-pink-600 to-pink-800',
      yellow: 'from-yellow-600 to-yellow-800'
    };
    return gradients[color] || 'from-blue-600 to-gray-800';
  };

  const ToolCard = ({ tool }) => {
    const Icon = getIcon(tool.icon);
    const colorClasses = getColorClasses(tool.color);
    const gradient = getGradient(tool.color);
    const inDashboard = isToolInDashboard(tool.id);

    return (
      <div
        className="group relative bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover-lift stagger-item border border-gray-100"
        onClick={() => handleViewTool(tool)}
      >
        {/* Featured/Trending badges */}
        <div className="absolute top-3 left-3 z-10 flex gap-1.5">
          {tool.featured && (
            <span className="px-2 py-0.5 bg-blue-600 text-white text-xs font-medium rounded flex items-center gap-1 shadow-sm">
              <Sparkles size={10} />
              Featured
            </span>
          )}
          {tool.popular && (
            <span className="px-2 py-0.5 bg-orange-600 text-white text-xs font-medium rounded flex items-center gap-1 shadow-sm">
              <TrendingUp size={10} />
              Popular
            </span>
          )}
        </div>

        {/* Add button */}
        <div className="absolute top-3 right-3 z-10">
          <button
            onClick={(e) => handleAddToDashboard(tool, e)}
            disabled={inDashboard}
            className={`p-1.5 bg-white/90 backdrop-blur-sm rounded-md shadow-sm transition-colors ${
              inDashboard 
                ? 'text-green-600 cursor-default hover:bg-gray-50' 
                : 'text-gray-500 hover:text-blue-600 hover:bg-gray-50'
            }`}
            title={inDashboard ? 'Already in dashboard' : 'Add to dashboard'}
          >
            {inDashboard ? <Check size={14} /> : <Plus size={14} />}
          </button>
        </div>

        {/* Image section */}
        <div className="relative h-32 overflow-hidden bg-gray-100">
          <img 
            src={tool.screenshots[0] || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=200&fit=crop'} 
            alt={tool.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${gradient} opacity-60`} />
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Icon and title */}
          <div className="flex items-center gap-3 mb-3">
            <div className={`p-2 rounded-lg bg-white shadow-md border border-gray-200 ${colorClasses}`}>
              <Icon size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-800 truncate">{tool.name}</h3>
              <p className="text-xs text-gray-500 capitalize">{tool.category}</p>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <Star size={12} className="text-yellow-500 fill-current" />
            <span className="text-xs font-medium text-gray-700">{tool.rating}</span>
            <span className="text-xs text-gray-400">({tool.users.toLocaleString()} users)</span>
          </div>

          {/* Description */}
          <p className="text-xs text-gray-600 mb-3 line-clamp-2">{tool.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-3">
            {tool.tags.slice(0, 2).map((tag, i) => (
              <span key={i} className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                #{tag}
              </span>
            ))}
            {tool.tags.length > 2 && (
              <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                +{tool.tags.length - 2}
              </span>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-1 mb-3">
            <div className="text-center p-1.5 bg-gray-50 rounded">
              <Download size={12} className="mx-auto mb-0.5 text-gray-400" />
              <p className="text-xs font-medium text-gray-700">{(tool.downloads / 1000).toFixed(1)}k</p>
              <p className="text-[10px] text-gray-500">Downloads</p>
            </div>
            <div className="text-center p-1.5 bg-gray-50 rounded">
              <Users size={12} className="mx-auto mb-0.5 text-gray-400" />
              <p className="text-xs font-medium text-gray-700">{(tool.users / 1000).toFixed(1)}k</p>
              <p className="text-[10px] text-gray-500">Users</p>
            </div>
            <div className="text-center p-1.5 bg-gray-50 rounded">
              <Clock size={12} className="mx-auto mb-0.5 text-gray-400" />
              <p className="text-xs font-medium text-gray-700">{tool.setup.time}</p>
              <p className="text-[10px] text-gray-500">Setup</p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <button
              onClick={(e) => handleQuickView(tool, e)}
              className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
              title="Quick view"
            >
              <Eye size={16} />
            </button>
            <button
              onClick={() => handleViewTool(tool)}
              className={`px-3 py-1.5 bg-gradient-to-r ${gradient} text-white rounded text-xs font-medium hover:shadow-md transition-all flex items-center gap-1`}
            >
              Details
              <ChevronRight size={12} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <style>{styles}</style>
      
      <Navbar />
      
      {/* Hero Section with Professional Blue Gradient */}
      <div className="relative bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 overflow-hidden">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ 
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="container mx-auto px-4 py-16 md:py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-slideUp">
              Business Tools
              <span className="block text-blue-300">Power Your Growth</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto animate-slideUp leading-relaxed">
              Discover powerful tools to manage suppliers, track inventory, process orders, and grow your business.
            </p>

            {/* Stats with professional styling */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/10 animate-scaleIn">
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">50+</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Powerful Tools</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/10 animate-scaleIn" style={{animationDelay: '0.1s'}}>
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">100K+</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Downloads</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/10 animate-scaleIn" style={{animationDelay: '0.2s'}}>
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">4.8</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Avg Rating</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/10 animate-scaleIn" style={{animationDelay: '0.3s'}}>
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">99%</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Satisfaction</div>
              </div>
            </div>

            {/* Search */}
            <div className="max-w-2xl mx-auto mt-12 relative animate-scaleIn" style={{ animationDelay: '0.4s' }}>
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search tools by name, category, or feature..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <button
                  onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1.5 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-all"
                >
                  <SlidersHorizontal size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Simple bottom border instead of wave */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400"></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {toolCategories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                selectedCategory === category.id
                  ? `bg-blue-600 text-white shadow-lg`
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm border border-gray-200'
              }`}
              style={{ animationDelay: `${0.1 + index * 0.05}s` }}
            >
              <span>{category.name}</span>
              <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                selectedCategory === category.id
                  ? 'bg-white/20 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {category.count}
              </span>
            </button>
          ))}
        </div>

        {/* Advanced Search Panel */}
        {showAdvancedSearch && (
          <div className="mb-8 animate-slideDown">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <Filter size={18} />
                  Advanced Filters
                </h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <X size={14} />
                  Clear all
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-2">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest First</option>
                    <option value="name">Name A-Z</option>
                    <option value="downloads">Most Downloaded</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-2">Min Rating</label>
                  <div className="flex items-center gap-2">
                    {[0, 3, 3.5, 4, 4.5].map(rating => (
                      <button
                        key={rating}
                        onClick={() => setMinRating(rating)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                          minRating === rating
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {rating === 0 ? 'Any' : `${rating}+`}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-2">Tags</label>
                  <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto">
                    {allTags.slice(0, 10).map(tag => (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`px-2 py-1 rounded-full text-xs font-medium transition-all ${
                          selectedTags.includes(tag)
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Free Trial Banner */}
        {!isAuthenticated && (
          <div className="mb-8 animate-slideUp">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Rocket className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Try BizCraft Tools Free</h3>
                    <p className="text-sm text-gray-600">
                      Add tools to your dashboard and start growing your business today
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/register')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors whitespace-nowrap"
                >
                  Start Free Trial
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Results Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-white px-3 py-1.5 rounded-lg shadow-sm border border-gray-200">
              <span className="text-sm text-gray-600">
                <span className="font-bold text-gray-900">{filteredTools.length}</span> tools found
              </span>
            </div>
            
            {/* Active filters */}
            <div className="flex flex-wrap gap-2">
              {selectedCategory !== 'all' && (
                <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full flex items-center gap-1 border border-blue-200">
                  {selectedCategory}
                  <button onClick={() => setSelectedCategory('all')} className="hover:bg-blue-100 rounded-full p-0.5">
                    <X size={12} />
                  </button>
                </span>
              )}
              {minRating > 0 && (
                <span className="px-2 py-1 bg-yellow-50 text-yellow-700 text-xs rounded-full flex items-center gap-1 border border-yellow-200">
                  {minRating}+ Stars
                  <button onClick={() => setMinRating(0)} className="hover:bg-yellow-100 rounded-full p-0.5">
                    <X size={12} />
                  </button>
                </span>
              )}
              {selectedTags.map(tag => (
                <span key={tag} className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded-full flex items-center gap-1 border border-purple-200">
                  #{tag}
                  <button onClick={() => toggleTag(tag)} className="hover:bg-purple-100 rounded-full p-0.5">
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded transition-all ${
                viewMode === 'grid' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-500 hover:text-blue-600 hover:bg-gray-100'
              }`}
            >
              <Grid size={18} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded transition-all ${
                viewMode === 'list' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-500 hover:text-blue-600 hover:bg-gray-100'
              }`}
            >
              <List size={18} />
            </button>
          </div>
        </div>

        {/* Tools Grid */}
        {paginatedTools.length === 0 ? (
          <div className="text-center py-20">
            <Layout className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No tools found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search or filters</p>
            <button
              onClick={clearFilters}
              className="px-5 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedTools.map(tool => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tool</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Users</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Setup</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedTools.map(tool => {
                  const Icon = getIcon(tool.icon);
                  const inDashboard = isToolInDashboard(tool.id);
                  return (
                    <tr
                      key={tool.id}
                      onClick={() => handleViewTool(tool)}
                      className="hover:bg-gray-50 cursor-pointer transition-colors group"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className={`p-1.5 rounded-md ${getColorClasses(tool.color)}`}>
                            <Icon size={16} />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-800 group-hover:text-blue-600">
                              {tool.name}
                            </p>
                            <p className="text-xs text-gray-500 line-clamp-1">{tool.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 text-xs rounded-full ${getColorClasses(tool.color)}`}>
                          {tool.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{(tool.users / 1000).toFixed(1)}k</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-0.5">
                          <Star size={12} className="text-yellow-500 fill-current" />
                          <span className="text-sm font-medium text-gray-700">{tool.rating}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{tool.setup.time}</td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToDashboard(tool, e);
                          }}
                          disabled={inDashboard}
                          className={`p-1 rounded transition-colors ${
                            inDashboard
                              ? 'bg-green-100 text-green-600 cursor-default'
                              : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'
                          }`}
                          title={inDashboard ? 'Already in dashboard' : 'Add to dashboard'}
                        >
                          {inDashboard ? <Check size={14} /> : <Plus size={14} />}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Load More */}
        {hasMoreItems && !isLoading && (
          <div className="text-center mt-8">
            <button
              onClick={loadMore}
              className="px-5 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors inline-flex items-center gap-2 text-sm"
            >
              <ChevronDown size={16} />
              Load More Tools
            </button>
          </div>
        )}

        {isLoading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
            <p className="mt-2 text-gray-600">Loading more tools...</p>
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      {showQuickView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn" onClick={() => setShowQuickView(null)}>
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-scaleIn" onClick={(e) => e.stopPropagation()}>
            <div className="relative h-48 overflow-hidden">
              <img 
                src={showQuickView.screenshots[0] || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=400&fit=crop'} 
                alt={showQuickView.name}
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${getGradient(showQuickView.color)} opacity-80`} />
              <button
                onClick={() => setShowQuickView(null)}
                className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:scale-110 transition-transform"
              >
                <X size={20} />
              </button>
              <div className="absolute bottom-4 left-4 flex items-center gap-3">
                <div className={`p-3 rounded-xl bg-white/90 backdrop-blur-sm shadow-lg ${getColorClasses(showQuickView.color)}`}>
                  {(() => {
                    const Icon = getIcon(showQuickView.icon);
                    return <Icon size={24} />;
                  })()}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{showQuickView.name}</h2>
                  <p className="text-white/80">{showQuickView.category}</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <p className="text-gray-600 mb-6">{showQuickView.longDescription}</p>

              {/* Features */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                <div className="grid grid-cols-2 gap-2">
                  {showQuickView.features.slice(0, 6).map((feature, i) => (
                    <div key={i} className="flex items-start gap-2 p-2 bg-gray-50 rounded-lg">
                      <CheckCircle size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="p-4 bg-gray-50 rounded-xl text-center">
                  <Users className="mx-auto mb-2 text-gray-400" size={20} />
                  <p className="text-sm text-gray-500">Users</p>
                  <p className="font-semibold">{(showQuickView.users / 1000).toFixed(1)}k</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl text-center">
                  <Download className="mx-auto mb-2 text-gray-400" size={20} />
                  <p className="text-sm text-gray-500">Downloads</p>
                  <p className="font-semibold">{(showQuickView.downloads / 1000).toFixed(1)}k</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl text-center">
                  <Clock className="mx-auto mb-2 text-gray-400" size={20} />
                  <p className="text-sm text-gray-500">Setup</p>
                  <p className="font-semibold">{showQuickView.setup.time}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl text-center">
                  <Star className="mx-auto mb-2 text-yellow-400 fill-current" size={20} />
                  <p className="text-sm text-gray-500">Rating</p>
                  <p className="font-semibold">{showQuickView.rating}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    handleViewTool(showQuickView);
                    setShowQuickView(null);
                  }}
                  className={`flex-1 px-6 py-3 bg-gradient-to-r ${getGradient(showQuickView.color)} text-white rounded-xl font-medium hover:shadow-lg transition-all`}
                >
                  View Full Details
                </button>
                <button
                  onClick={(e) => {
                    handleAddToDashboard(showQuickView, e);
                    setShowQuickView(null);
                  }}
                  disabled={isToolInDashboard(showQuickView.id)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all ${
                    isToolInDashboard(showQuickView.id)
                      ? 'bg-green-100 text-green-600 cursor-default'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {isToolInDashboard(showQuickView.id) ? 'Already Added' : 'Add to Dashboard'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Newsletter Section with Professional Colors */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 py-12 mt-12 border-t border-gray-700">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-4">
              <Mail className="w-10 h-10 text-blue-400 mx-auto" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Get Tool Updates Weekly</h2>
            <p className="text-gray-400 text-sm mb-6">
              Subscribe to our newsletter and get new tool releases, updates, and exclusive tips.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              <button className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm whitespace-nowrap">
                Subscribe
              </button>
            </div>
            
            <p className="text-xs text-gray-500 mt-3">
              No spam, unsubscribe anytime. We respect your privacy.
            </p>
          </div>
        </div>
      </div>

      {/* Footer with Professional Dark Theme */}
      <footer className="bg-gray-900 text-gray-400 py-10 text-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <h3 className="text-white font-semibold mb-3 text-sm">Business Hub</h3>
              <p className="text-xs leading-relaxed">
                Professional resources for serious entrepreneurs.
              </p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-3 text-xs uppercase tracking-wider">Resources</h4>
              <ul className="space-y-1.5 text-xs">
                <li><button onClick={() => navigate('/tools')} className="hover:text-white transition-colors">All Tools</button></li>
                <li><button onClick={() => navigate('/tools?popular=true')} className="hover:text-white transition-colors">Popular Tools</button></li>
                <li><button onClick={() => navigate('/tools?new=true')} className="hover:text-white transition-colors">New Releases</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-3 text-xs uppercase tracking-wider">Company</h4>
              <ul className="space-y-1.5 text-xs">
                <li><button onClick={() => navigate('/about')} className="hover:text-white transition-colors">About</button></li>
                <li><button onClick={() => navigate('/blog')} className="hover:text-white transition-colors">Blog</button></li>
                <li><button onClick={() => navigate('/contact')} className="hover:text-white transition-colors">Contact</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-3 text-xs uppercase tracking-wider">Legal</h4>
              <ul className="space-y-1.5 text-xs">
                <li><button onClick={() => navigate('/privacy')} className="hover:text-white transition-colors">Terms</button></li>
                <li><button onClick={() => navigate('/terms')} className="hover:text-white transition-colors">Privacy</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-6 pt-4 text-center text-xs">
            <p>&copy; 2024 Business Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ToolsPage;
