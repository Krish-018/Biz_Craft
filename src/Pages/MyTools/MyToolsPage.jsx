// src/Pages/MyTools/MyToolsPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTools } from '../../context/ToolsContext';
import Navbar from '../../components/Navbar/Navbar';
import { 
  Grid,
  List,
  Star,
  Trash2,
  Settings,
  Clock,
  Users,
  Download,
  Eye,
  ChevronRight,
  X,
  AlertCircle,
  Layout,
  Plus,
  Search,
  Filter,
  Move,
  Building2,
  Package,
  ShoppingBag,
  FileText,
  Wallet,
  Target,
  DollarSign,
  TrendingUp
} from 'lucide-react';
import { toast } from 'react-hot-toast';

// Styles
const styles = `
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .animate-slideUp {
    animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  
  .hover-lift {
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  .hover-lift:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 25px -5px rgba(59, 130, 246, 0.2);
  }
`;

const MyToolsPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { 
    userTools, 
    favoriteTools, 
    removeToolFromDashboard,
    toggleFavorite,
    isToolFavorite,
    getToolsByCategory,
    getFavoriteTools,
    getRecentTools
  } = useTools();
  
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOver, setDragOver] = useState(null);

  // Filter tools
  const filteredTools = userTools.filter(tool => {
    const matchesSearch = searchTerm === '' || 
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Categories for filter
  const categories = [
    { id: 'all', name: 'All Tools', count: userTools.length },
    ...Object.entries(getToolsByCategory()).map(([category, tools]) => ({
      id: category,
      name: category.charAt(0).toUpperCase() + category.slice(1),
      count: tools.length
    }))
  ];

  const favoriteToolsList = getFavoriteTools();
  const recentToolsList = getRecentTools();

  const handleRemoveTool = (toolId) => {
    removeToolFromDashboard(toolId);
    setShowDeleteModal(null);
  };

  const handleDragStart = (e, tool) => {
    setDraggedItem(tool);
    e.dataTransfer.setData('text/plain', tool.id);
  };

  const handleDragOver = (e, id) => {
    e.preventDefault();
    setDragOver(id);
  };

  const handleDrop = (e, targetId) => {
    e.preventDefault();
    const sourceId = e.dataTransfer.getData('text/plain');
    
    if (sourceId !== targetId) {
      toast.success('Tool reorganized');
    }
    
    setDraggedItem(null);
    setDragOver(null);
  };

  const getIcon = (iconName) => {
    const icons = {
      Building2, Package, ShoppingBag, FileText, Wallet, Target, DollarSign, TrendingUp, Layout
    };
    return icons[iconName] || Layout;
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-600',
      emerald: 'bg-emerald-50 text-emerald-600',
      purple: 'bg-purple-50 text-purple-600',
      red: 'bg-red-50 text-red-600',
      orange: 'bg-orange-50 text-orange-600',
      indigo: 'bg-indigo-50 text-indigo-600',
      green: 'bg-green-50 text-green-600',
      teal: 'bg-teal-50 text-teal-600'
    };
    return colors[color] || 'bg-gray-50 text-gray-600';
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Layout size={48} className="text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Please Login</h2>
          <p className="text-gray-600 mb-6">You need to be logged in to view your tools.</p>
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <style>{styles}</style>
      
      <Navbar onMenuClick={() => {}} />
      <div className="h-16"></div>

      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">My Tools</h1>
              <p className="text-gray-500 mt-1">Manage your business tools collection</p>
            </div>
            
            <button
              onClick={() => navigate('/tools')}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center gap-2"
            >
              <Plus size={18} />
              Browse More Tools
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-4 text-white">
              <p className="text-blue-100 text-sm">Total Tools</p>
              <p className="text-2xl font-bold">{userTools.length}</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <p className="text-gray-500 text-sm">Favorites</p>
              <p className="text-2xl font-bold text-gray-800">{favoriteTools.length}</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <p className="text-gray-500 text-sm">Categories</p>
              <p className="text-2xl font-bold text-gray-800">
                {Object.keys(getToolsByCategory()).length}
              </p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <p className="text-gray-500 text-sm">Recently Used</p>
              <p className="text-2xl font-bold text-gray-800">{recentToolsList.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Favorites Section */}
        {favoriteToolsList.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Star size={20} className="text-yellow-400 fill-current" />
              Favorite Tools
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {favoriteToolsList.slice(0, 3).map(tool => {
                const Icon = getIcon(tool.icon);
                const colorClasses = getColorClasses(tool.color);
                return (
                  <div
                    key={tool.id}
                    onClick={() => navigate(`/tools/${tool.id}`)}
                    className="bg-white rounded-xl shadow-lg p-4 cursor-pointer hover-lift group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className={`p-2 rounded-lg ${colorClasses}`}>
                        <Icon size={18} />
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(tool.id);
                        }}
                        className="text-yellow-400 hover:scale-110 transition-transform"
                      >
                        <Star size={16} className="fill-current" />
                      </button>
                    </div>
                    <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">{tool.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search your tools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.name} ({cat.count})
                </option>
              ))}
            </select>

            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'grid' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'
                }`}
              >
                <Grid size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'
                }`}
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Tools Grid/List */}
        {filteredTools.length === 0 ? (
          <div className="text-center py-20">
            <Layout className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-800 mb-2">No tools found</h3>
            <p className="text-gray-500 mb-6">
              {userTools.length === 0 
                ? "You haven't added any tools to your dashboard yet."
                : "No tools match your search criteria."}
            </p>
            {userTools.length === 0 && (
              <button
                onClick={() => navigate('/tools')}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
              >
                Browse Tools
              </button>
            )}
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTools.map(tool => {
              const Icon = getIcon(tool.icon);
              const colorClasses = getColorClasses(tool.color);
              const isFav = isToolFavorite(tool.id);
              
              return (
                <div
                  key={tool.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, tool)}
                  onDragOver={(e) => handleDragOver(e, tool.id)}
                  onDragLeave={() => setDragOver(null)}
                  onDrop={(e) => handleDrop(e, tool.id)}
                  className={`bg-white rounded-xl shadow-lg overflow-hidden cursor-move transition-all hover-lift ${
                    dragOver === tool.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`p-2 rounded-lg ${colorClasses}`}>
                        <Icon size={20} />
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(tool.id);
                          }}
                          className={`p-1.5 rounded-lg transition-colors ${
                            isFav ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-400'
                          }`}
                        >
                          <Star size={16} className={isFav ? 'fill-current' : ''} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowDeleteModal(tool);
                          }}
                          className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    <h3 
                      onClick={() => navigate(`/tools/${tool.id}`)}
                      className="font-semibold text-gray-800 hover:text-blue-600 transition-colors cursor-pointer"
                    >
                      {tool.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 mb-3">{tool.description}</p>

                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {tool.setup?.time || '5 min'}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users size={12} />
                        {tool.users} users
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tool</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Added</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Users</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredTools.map(tool => {
                  const Icon = getIcon(tool.icon);
                  const colorClasses = getColorClasses(tool.color);
                  const isFav = isToolFavorite(tool.id);
                  
                  return (
                    <tr key={tool.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${colorClasses}`}>
                            <Icon size={18} />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{tool.name}</p>
                            <p className="text-xs text-gray-500">{tool.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm capitalize text-gray-600">{tool.category}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {tool.addedAt ? new Date(tool.addedAt).toLocaleDateString() : 'Today'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{tool.users}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => toggleFavorite(tool.id)}
                            className={`p-1 rounded-lg transition-colors ${
                              isFav ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-400'
                            }`}
                          >
                            <Star size={16} className={isFav ? 'fill-current' : ''} />
                          </button>
                          <button
                            onClick={() => navigate(`/tools/${tool.id}`)}
                            className="p-1 text-gray-400 hover:text-blue-600 rounded-lg transition-colors"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => setShowDeleteModal(tool)}
                            className="p-1 text-gray-400 hover:text-red-600 rounded-lg transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowDeleteModal(null)}>
          <div className="bg-white rounded-2xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle size={32} className="text-red-500" />
            </div>
            <h3 className="text-xl font-bold text-center text-gray-800 mb-2">Remove Tool</h3>
            <p className="text-gray-600 text-center mb-6">
              Are you sure you want to remove <span className="font-semibold">{showDeleteModal.name}</span> from your dashboard?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleRemoveTool(showDeleteModal.id)}
                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Remove
              </button>
              <button
                onClick={() => setShowDeleteModal(null)}
                className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyToolsPage;