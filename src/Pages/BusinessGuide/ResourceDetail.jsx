import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useActivity } from '../../context/ActivityContext';
import { 
  ArrowLeft,
  Download,
  Bookmark,
  BookmarkCheck,
  Share2,
  Clock,
  Star,
  CheckCircle,
  Printer,
  Mail,
  Calendar,
  User,
  Tag
} from 'lucide-react';
import toast from 'react-hot-toast';

// Mock data - replace with API call
const resources = [
  {
    id: 1,
    title: 'Complete Guide to Supplier Management',
    description: 'Learn how to effectively manage and evaluate your suppliers',
    longDescription: 'This comprehensive guide covers everything from supplier selection to performance evaluation and long-term relationship management. You\'ll learn proven strategies for building strong supplier partnerships that drive business success.',
    category: 'guides',
    type: 'PDF Guide',
    readTime: '15 min',
    rating: 4.8,
    level: 'Beginner',
    downloads: 1234,
    views: 5678,
    author: 'John Smith',
    publishedDate: '2024-01-15',
    tags: ['suppliers', 'management', 'procurement'],
    downloadable: true,
    fileSize: '2.4 MB',
    content: [
      'Introduction to Supplier Management',
      'Supplier Selection Criteria',
      'Negotiation Strategies',
      'Performance Evaluation',
      'Relationship Management',
      'Case Studies'
    ]
  },
  {
    id: 2,
    title: 'Financial Planning for Small Business',
    description: 'Master your business finances with expert tips and strategies',
    longDescription: 'Learn essential financial planning techniques to grow your business. This video course covers budgeting, cash flow management, financial forecasting, and investment strategies.',
    category: 'videos',
    type: 'Video Course',
    readTime: '45 min',
    rating: 4.9,
    level: 'Intermediate',
    downloads: 2341,
    views: 8923,
    author: 'Sarah Johnson',
    publishedDate: '2024-02-10',
    tags: ['finance', 'planning', 'budgeting'],
    downloadable: false,
    duration: '45 min'
  },
  {
    id: 3,
    title: 'Legal Compliance Checklist',
    description: 'Stay compliant with the latest business regulations',
    longDescription: 'Keep your business compliant with this comprehensive legal checklist. Covering licenses, permits, tax requirements, employment laws, and industry-specific regulations.',
    category: 'templates',
    type: 'Template',
    readTime: '10 min',
    rating: 4.7,
    level: 'All Levels',
    downloads: 3456,
    views: 4567,
    author: 'Legal Team',
    publishedDate: '2024-01-20',
    tags: ['legal', 'compliance', 'checklist'],
    downloadable: true,
    fileSize: '1.2 MB'
  }
];

const ResourceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    toggleBookmark, 
    isBookmarked, 
    addDownload,
    markAsCompleted,
    isCompleted,
    addToRecentlyViewed
  } = useActivity();
  
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const found = resources.find(r => r.id === parseInt(id));
    if (found) {
      setResource(found);
      addToRecentlyViewed(found);
    }
    setLoading(false);
  }, [id, addToRecentlyViewed]);

  const bookmarked = isBookmarked(resource?.id);
  const completed = isCompleted(resource?.id);

  const handleDownload = () => {
    if (resource?.downloadable) {
      addDownload(resource);
      toast.success(`Downloading ${resource.title}`);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleEmail = () => {
    window.location.href = `mailto:?subject=${encodeURIComponent(resource?.title)}&body=${encodeURIComponent(window.location.href)}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!resource) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800">Resource not found</h2>
        <button
          onClick={() => navigate('/dashboard/business-guide')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Back to Guides
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate('/dashboard/business-guide')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft size={20} />
        Back to Guides
      </button>

      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">
                {resource.type}
              </span>
              <span className="flex items-center gap-1 text-sm text-gray-500">
                <Clock size={14} />
                {resource.readTime}
              </span>
              <span className="flex items-center gap-1 text-sm text-yellow-600">
                <Star size={14} className="fill-current" />
                {resource.rating}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{resource.title}</h1>
            <p className="text-gray-600">{resource.description}</p>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleBookmark(resource)}
              className={`p-2 rounded-lg transition-colors ${
                bookmarked ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {bookmarked ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
            </button>
            <button
              onClick={handleShare}
              className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
            >
              <Share2 size={20} />
            </button>
            {resource.downloadable && (
              <button
                onClick={handleDownload}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <Download size={18} />
                Download ({resource.fileSize})
              </button>
            )}
          </div>
        </div>

        {/* Meta Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t">
          <div>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <User size={12} /> Author
            </p>
            <p className="text-sm font-medium">{resource.author}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <Calendar size={12} /> Published
            </p>
            <p className="text-sm font-medium">
              {new Date(resource.publishedDate).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <Download size={12} /> Downloads
            </p>
            <p className="text-sm font-medium">{resource.downloads.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <Tag size={12} /> Level
            </p>
            <p className="text-sm font-medium">{resource.level}</p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {resource.tags.map(tag => (
            <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">About this resource</h2>
        <p className="text-gray-700 whitespace-pre-line">{resource.longDescription}</p>
      </div>

      {/* Content List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">What you'll learn</h2>
        <div className="space-y-2">
          {resource.content.map((item, index) => (
            <div key={index} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg">
              <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
              <span className="text-gray-700">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={() => markAsCompleted(resource)}
          className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
            completed
              ? 'bg-green-100 text-green-700'
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          <CheckCircle size={18} />
          {completed ? 'Completed' : 'Mark as Completed'}
        </button>
        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center justify-center gap-2"
        >
          <Printer size={18} />
          Print
        </button>
        <button
          onClick={handleEmail}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center justify-center gap-2"
        >
          <Mail size={18} />
          Email
        </button>
      </div>
    </div>
  );
};

export default ResourceDetail;