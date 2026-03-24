// src/Pages/Dashboard/BusinessGuide.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useDashboard } from "../../context/DashboardContext";
import {
  BookOpen,
  Search,
  Grid,
  List,
  Plus,
  RefreshCw,
  Trash2,
  ArrowRight,
  BookMarked,
  Clock,
  Star,
  Calendar,
  Award,
  TrendingUp,
  Filter
} from "lucide-react";
import { toast } from "react-hot-toast";

const BusinessGuide = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { 
    dashboardItems, 
    removeFromDashboard, 
    refreshDashboard 
  } = useDashboard();
  
  const [myGuides, setMyGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadMyGuides();
  }, [dashboardItems.guides]);

  const loadMyGuides = () => {
    setLoading(true);
    const guides = (dashboardItems.guides || []).map(guide => ({
      ...guide,
      title: guide.title || "Untitled Guide",
      author: guide.author || "BizCraft",
      readTime: guide.readTime || "5 min",
      rating: guide.rating || 4.5,
      addedAt: guide.addedAt || new Date().toISOString(),
      category: guide.category || "General"
    }));
    
    setMyGuides(guides);
    setLoading(false);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await refreshDashboard();
    setRefreshing(false);
    toast.success("Dashboard updated");
  };

  const handleRemoveGuide = async (guideId, e) => {
    e.stopPropagation();
    if (window.confirm('Remove this guide from your dashboard?')) {
      await removeFromDashboard('guides', guideId);
      toast.success('Guide removed from dashboard');
    }
  };

  const handleViewGuide = (guideId) => {
    navigate(`/guides/${guideId}`);
  };

  const handleBrowseGuides = () => {
    navigate('/guides');
  };

  const filteredGuides = myGuides.filter(guide =>
    guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guide.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen size={32} className="text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Please Login</h2>
          <p className="text-gray-600 mb-6">Login to view your saved guides</p>
          <button
            onClick={() => navigate('/login')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <BookMarked className="text-blue-600" size={24} />
                My Business Guides
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {myGuides.length} {myGuides.length === 1 ? 'guide' : 'guides'} saved
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
              >
                <RefreshCw size={18} className={refreshing ? 'animate-spin' : ''} />
              </button>
              <button
                onClick={handleBrowseGuides}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <Plus size={18} />
                Browse Guides
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-6 pt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-4 text-white">
            <BookOpen size={20} className="mb-2" />
            <p className="text-2xl font-bold">{myGuides.length}</p>
            <p className="text-xs opacity-80">Total Guides</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <Clock size={20} className="text-blue-600 mb-2" />
            <p className="text-2xl font-bold text-gray-800">
              {myGuides.reduce((acc, g) => acc + (parseInt(g.readTime) || 0), 0)} min
            </p>
            <p className="text-xs text-gray-500">Reading Time</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <Star size={20} className="text-yellow-600 mb-2" />
            <p className="text-2xl font-bold text-gray-800">
              {(myGuides.reduce((acc, g) => acc + (g.rating || 0), 0) / (myGuides.length || 1)).toFixed(1)}
            </p>
            <p className="text-xs text-gray-500">Avg Rating</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <TrendingUp size={20} className="text-green-600 mb-2" />
            <p className="text-2xl font-bold text-gray-800">{myGuides.length}</p>
            <p className="text-xs text-gray-500">In Library</p>
          </div>
        </div>

        {/* Search */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search your guides..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'}`}
            >
              <Grid size={18} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'}`}
            >
              <List size={18} />
            </button>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent mx-auto"></div>
            <p className="text-gray-500 mt-3">Loading...</p>
          </div>
        ) : filteredGuides.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <BookOpen size={48} className="mx-auto text-gray-300 mb-3" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No guides yet</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm ? "No guides match your search" : "You haven't added any guides"}
            </p>
            <button
              onClick={handleBrowseGuides}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-flex items-center gap-2"
            >
              <Plus size={18} />
              Browse Guides
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredGuides.map(guide => (
              <div
                key={guide.id}
                onClick={() => handleViewGuide(guide.id)}
                className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">{guide.title}</h3>
                      <p className="text-sm text-gray-500">{guide.author}</p>
                    </div>
                    <button
                      onClick={(e) => handleRemoveGuide(guide.id, e)}
                      className="p-1.5 text-gray-400 hover:text-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {guide.readTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star size={12} className="text-yellow-400" /> {guide.rating}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={12} /> {new Date(guide.addedAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t">
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-full">
                      {guide.category}
                    </span>
                    <ArrowRight size={16} className="text-gray-400" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Guide</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Category</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Added</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Read Time</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Rating</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredGuides.map(guide => (
                  <tr key={guide.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleViewGuide(guide.id)}>
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-800">{guide.title}</p>
                      <p className="text-xs text-gray-500">{guide.author}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">
                        {guide.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {new Date(guide.addedAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{guide.readTime}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Star size={12} className="text-yellow-400" />
                        <span>{guide.rating}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveGuide(guide.id, e);
                        }}
                        className="p-1 text-gray-400 hover:text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessGuide;