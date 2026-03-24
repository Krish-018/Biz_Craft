import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTools } from '../../context/ToolsContext';
import { useActivity } from '../../context/ActivityContext';
import Navbar from '../../components/Navbar/Navbar';
import { 
  ArrowLeft,
  Star,
  Download,
  Eye,
  Clock,
  Users,
  CheckCircle,
  X,
  Plus,
  Check,
  Bookmark,
  Share2,
  Calendar,
  HardDrive,
  Zap,
  Award,
  TrendingUp,
  Sparkles,
  Grid,
  Maximize2,
  Minimize2,
  Info,
  AlertTriangle,
  Layout,
  Building2,
  Package,
  ShoppingBag,
  FileText,
  Wallet,
  Target,
  DollarSign,
  CreditCard,
  Globe,
  Tag,
  TrendingUp as TrendingUpIcon,
  Play,
  Pause,
  Volume2,
  VolumeX,
  SkipBack,
  SkipForward,
  Maximize,
  ChevronRight,
  ChevronLeft,
  CheckSquare,
  Square,
  BookOpen,
  Settings,
  HelpCircle,
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  Flag,
  Copy,
  Printer,
  Mail,
  Link,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Camera,
  Video,
  Mic,
  Headphones,
  Monitor,
  Smartphone,
  Tablet,
  Laptop,
  Cloud,
  Database,
  Server,
  Shield,
  Lock,
  Key,
  Fingerprint,
  Bell,
  AlertCircle,
  HelpCircle as HelpIcon,
  RefreshCw,
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { availableTools } from './Data/toolsData';

const styles = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  
  @keyframes pulse-glow {
    0%, 100% { opacity: 0.5; filter: blur(10px); }
    50% { opacity: 1; filter: blur(15px); }
  }
  
  @keyframes slideIn {
    from { opacity: 0; transform: translateX(-20px); }
    to { opacity: 1; transform: translateX(0); }
  }
  
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
  }
  
  @keyframes shimmer {
    0% { background-position: -1000px 0; }
    100% { background-position: 1000px 0; }
  }
  
  .animate-float {
    animation: float 4s ease-in-out infinite;
  }
  
  .animate-pulse-glow {
    animation: pulse-glow 3s ease-in-out infinite;
  }
  
  .animate-slideIn {
    animation: slideIn 0.5s ease-out forwards;
  }
  
  .animate-scaleIn {
    animation: scaleIn 0.4s ease-out forwards;
  }
  
  .stagger-item {
    opacity: 0;
    animation: slideIn 0.5s ease-out forwards;
  }
  
  .stagger-item:nth-child(1) { animation-delay: 0.1s; }
  .stagger-item:nth-child(2) { animation-delay: 0.15s; }
  .stagger-item:nth-child(3) { animation-delay: 0.2s; }
  .stagger-item:nth-child(4) { animation-delay: 0.25s; }
  .stagger-item:nth-child(5) { animation-delay: 0.3s; }
  
  .hover-lift {
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  .hover-lift:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 25px -5px rgba(59, 130, 246, 0.2);
  }
  
  .hover-scale {
    transition: transform 0.2s ease;
  }
  
  .hover-scale:hover {
    transform: scale(1.05);
  }
  
  .glass-effect {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  
  .progress-step {
    position: relative;
  }
  
  .progress-step::before {
    content: '';
    position: absolute;
    left: -20px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
    transform: scaleY(0);
    transform-origin: top;
    transition: transform 0.5s ease;
  }
  
  .progress-step.active::before {
    transform: scaleY(1);
  }
  
  .step-number {
    transition: all 0.3s ease;
  }
  
  .step-number.completed {
    background: linear-gradient(135deg, #10b981, #059669);
    color: white;
  }
  
  .step-number.active {
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    color: white;
    transform: scale(1.1);
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
  }
`;

const ToolDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { 
    addToolToDashboard, 
    isToolInDashboard,
    toggleFavorite,
    isToolFavorite,
    trackToolUsage
  } = useTools();
  const { addToRecentlyViewed } = useActivity();
  
  const [tool, setTool] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedImage, setSelectedImage] = useState(0);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showScreenshotModal, setShowScreenshotModal] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [showVideo, setShowVideo] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [calculatorInputs, setCalculatorInputs] = useState({});
  const [calculatorResult, setCalculatorResult] = useState(null);
  const [showHelp, setShowHelp] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackRating, setFeedbackRating] = useState(0);
  const [feedbackComment, setFeedbackComment] = useState('');
  const [showComparison, setShowComparison] = useState(false);
  const [compareTools, setCompareTools] = useState([]);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const found = availableTools.find(t => t.id === id);
    if (found) {
      setTool(found);
      addToRecentlyViewed({
        id: found.id,
        type: 'tool',
        title: found.name,
        image: found.screenshots[0] || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=200&fit=crop',
        path: `/tools/${found.id}`
      });
      trackToolUsage(found.id);
      
      // Initialize calculator inputs with default values based on tool type
      initializeCalculator(found);
    }
    setLoading(false);
  }, [id, addToRecentlyViewed, trackToolUsage]);

  const initializeCalculator = (tool) => {
    const defaults = {};
    switch(tool.id) {
      case 'profit-margin-calculator':
        defaults.cost = 100;
        defaults.price = 150;
        defaults.quantity = 1;
        break;
      case 'loan-emi-calculator':
        defaults.amount = 100000;
        defaults.rate = 10;
        defaults.tenure = 12;
        break;
      case 'break-even-analyzer':
        defaults.fixedCosts = 5000;
        defaults.variableCost = 20;
        defaults.price = 50;
        break;
      case 'roi-calculator':
        defaults.investment = 10000;
        defaults.return = 15000;
        defaults.years = 1;
        break;
      default:
        break;
    }
    setCalculatorInputs(defaults);
  };

  const handleAddToDashboard = () => {
    if (!isAuthenticated) {
      toast.error('Please login to add tools to your dashboard');
      navigate('/login');
      return;
    }
    const success = addToolToDashboard(tool);
    if (success) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
    setShowShareModal(false);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleStepComplete = (stepIndex) => {
    if (!completedSteps.includes(stepIndex)) {
      setCompletedSteps([...completedSteps, stepIndex]);
      toast.success(`Step ${stepIndex + 1} completed!`, {
        icon: '✅',
        duration: 2000
      });
      
      // If all steps completed, show congratulations
      if (completedSteps.length + 1 === tool.tutorial?.steps?.length) {
        toast.success('🎉 Congratulations! You\'ve completed all steps!', {
          duration: 5000,
          icon: '🏆'
        });
      }
    }
  };

  const resetSteps = () => {
    setCurrentStep(0);
    setCompletedSteps([]);
    toast.info('Tutorial reset. Start from the beginning!');
  };

  const handleCalculatorChange = (field, value) => {
    setCalculatorInputs(prev => ({ ...prev, [field]: parseFloat(value) || 0 }));
    
    // Auto-calculate based on tool type
    setTimeout(() => calculateResult(), 100);
  };

  const calculateResult = () => {
    if (!tool) return;
    
    let result = {};
    switch(tool.id) {
      case 'profit-margin-calculator':
        const cost = calculatorInputs.cost || 0;
        const price = calculatorInputs.price || 0;
        const quantity = calculatorInputs.quantity || 1;
        const revenue = price * quantity;
        const profit = revenue - (cost * quantity);
        const margin = revenue > 0 ? (profit / revenue) * 100 : 0;
        result = {
          revenue,
          profit,
          margin: margin.toFixed(2),
          markup: cost > 0 ? ((price - cost) / cost * 100).toFixed(2) : 0
        };
        break;
        
      case 'loan-emi-calculator':
        const principal = calculatorInputs.amount || 0;
        const rate = (calculatorInputs.rate || 0) / 100 / 12;
        const months = calculatorInputs.tenure || 0;
        if (principal && rate && months) {
          const emi = principal * rate * Math.pow(1 + rate, months) / (Math.pow(1 + rate, months) - 1);
          const totalPayment = emi * months;
          const totalInterest = totalPayment - principal;
          result = {
            emi: emi.toFixed(2),
            totalPayment: totalPayment.toFixed(2),
            totalInterest: totalInterest.toFixed(2)
          };
        }
        break;
        
      case 'break-even-analyzer':
        const fixed = calculatorInputs.fixedCosts || 0;
        const variable = calculatorInputs.variableCost || 0;
        const sellPrice = calculatorInputs.price || 0;
        if (sellPrice > variable) {
          const contribution = sellPrice - variable;
          const breakEvenUnits = fixed / contribution;
          const breakEvenRevenue = breakEvenUnits * sellPrice;
          result = {
            breakEvenUnits: Math.ceil(breakEvenUnits),
            breakEvenRevenue: breakEvenRevenue.toFixed(2),
            contributionMargin: contribution
          };
        }
        break;
        
      case 'roi-calculator':
        const investment = calculatorInputs.investment || 0;
        const returns = calculatorInputs.return || 0;
        const years = calculatorInputs.years || 1;
        if (investment > 0) {
          const profit = returns - investment;
          const roi = (profit / investment) * 100;
          const annualRoi = roi / years;
          result = {
            profit: profit.toFixed(2),
            roi: roi.toFixed(2),
            annualRoi: annualRoi.toFixed(2)
          };
        }
        break;
        
      default:
        break;
    }
    
    setCalculatorResult(result);
  };

  const handleFeedbackSubmit = () => {
    toast.success('Thank you for your feedback!', {
      icon: '💝',
      duration: 3000
    });
    setShowFeedback(false);
    setFeedbackRating(0);
    setFeedbackComment('');
  };

  const handleCompareAdd = (toolId) => {
    const toolToAdd = availableTools.find(t => t.id === toolId);
    if (toolToAdd && !compareTools.some(t => t.id === toolId)) {
      setCompareTools([...compareTools, toolToAdd]);
      toast.success(`${toolToAdd.name} added to comparison`);
    }
  };

  const handleCompareRemove = (toolId) => {
    setCompareTools(compareTools.filter(t => t.id !== toolId));
  };

  const getIcon = (iconName) => {
    const icons = {
      Building2, Package, ShoppingBag, FileText, Wallet, Target, DollarSign, Layout,
      CreditCard, Globe, Tag, TrendingUpIcon, Users, Calendar, Clock, HardDrive,
      Zap, Award, Sparkles, CheckCircle, BookOpen, Settings, HelpCircle, MessageCircle,
      ThumbsUp, ThumbsDown, Flag, Copy, Printer, Mail, Link, Facebook, Twitter,
      Linkedin, Youtube, Camera, Video, Mic, Headphones, Monitor, Smartphone,
      Tablet, Laptop, Cloud, Database, Server, Shield, Lock, Key, Fingerprint, Bell
    };
    return icons[iconName] || Layout;
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-600 border-blue-200',
      emerald: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      purple: 'bg-purple-50 text-purple-600 border-purple-200',
      red: 'bg-red-50 text-red-600 border-red-200',
      orange: 'bg-orange-50 text-orange-600 border-orange-200',
      indigo: 'bg-indigo-50 text-indigo-600 border-indigo-200',
      green: 'bg-green-50 text-green-600 border-green-200',
      teal: 'bg-teal-50 text-teal-600 border-teal-200',
      pink: 'bg-pink-50 text-pink-600 border-pink-200',
      yellow: 'bg-yellow-50 text-yellow-600 border-yellow-200'
    };
    return colors[color] || 'bg-gray-50 text-gray-600 border-gray-200';
  };

  const getGradient = (color) => {
    const gradients = {
      blue: 'from-blue-500 to-blue-600',
      emerald: 'from-emerald-500 to-emerald-600',
      purple: 'from-purple-500 to-purple-600',
      red: 'from-red-500 to-red-600',
      orange: 'from-orange-500 to-orange-600',
      indigo: 'from-indigo-500 to-indigo-600',
      green: 'from-green-500 to-green-600',
      teal: 'from-teal-500 to-teal-600',
      pink: 'from-pink-500 to-pink-600',
      yellow: 'from-yellow-500 to-yellow-600'
    };
    return gradients[color] || 'from-gray-500 to-gray-600';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!tool) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle size={48} className="text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Tool Not Found</h2>
          <p className="text-gray-600 mb-6">The tool you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate('/tools')}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
          >
            Browse Tools
          </button>
        </div>
      </div>
    );
  }

  const inDashboard = isToolInDashboard(tool.id);
  const isFav = isToolFavorite(tool.id);
  const Icon = getIcon(tool.icon);
  const colorClasses = getColorClasses(tool.color);
  const gradient = getGradient(tool.color);
  const hasTutorial = tool.tutorial && tool.tutorial.steps && tool.tutorial.steps.length > 0;
  const progress = tool.tutorial?.steps?.length > 0 
    ? (completedSteps.length / tool.tutorial.steps.length) * 100 
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <style>{styles}</style>
      
      <Navbar onMenuClick={() => {}} />
      <div className="h-16"></div>

      {/* Success Banner */}
      {showSuccess && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-scaleIn">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3">
            <CheckCircle size={20} />
            <span className="font-medium">✨ Tool added to your dashboard!</span>
          </div>
        </div>
      )}

      {/* Back Button */}
      <div className="fixed top-20 left-4 z-10">
        <button
          onClick={() => navigate('/tools')}
          className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg text-gray-700 hover:bg-white transition-all group hover:shadow-xl"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Tools</span>
        </button>
      </div>

      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img 
          src={tool.screenshots[selectedImage] || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&h=400&fit=crop'} 
          alt={tool.name}
          className="w-full h-full object-cover"
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${gradient} opacity-80`} />

        {/* Fullscreen Toggle */}
        <button
          onClick={toggleFullscreen}
          className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg text-gray-700 hover:bg-white z-10 hover:scale-110 transition-all"
          title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
        >
          {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
        </button>

        {/* Tool Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="container mx-auto">
            <div className="flex items-end gap-6">
              {/* Icon */}
              <div className={`p-4 rounded-2xl bg-white/90 backdrop-blur-sm ${colorClasses} animate-float`}>
                <Icon size={40} />
              </div>
              
              {/* Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <h1 className="text-4xl font-bold">{tool.name}</h1>
                  {tool.popular && (
                    <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-sm rounded-full flex items-center gap-1">
                      <TrendingUp size={14} />
                      Popular
                    </span>
                  )}
                  {tool.featured && (
                    <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm rounded-full flex items-center gap-1">
                      <Sparkles size={14} />
                      Featured
                    </span>
                  )}
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm rounded-full">
                    v{tool.version}
                  </span>
                </div>
                
                <p className="text-xl text-white/90 mb-3">{tool.description}</p>
                
                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Users size={18} />
                    <span>{tool.users.toLocaleString()} users</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Download size={18} />
                    <span>{tool.downloads.toLocaleString()} downloads</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star size={18} className="fill-yellow-400 text-yellow-400" />
                    <span>{tool.rating}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={18} />
                    <span>Updated {new Date(tool.lastUpdated).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-20 flex gap-2">
          <button
            onClick={() => toggleFavorite(tool.id)}
            className={`p-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg transition-all hover:scale-110 ${
              isFav ? 'bg-yellow-500 text-white' : 'text-gray-700 hover:bg-white'
            }`}
            title={isFav ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Bookmark size={20} className={isFav ? 'fill-current' : ''} />
          </button>
          <button
            onClick={handleShare}
            className="p-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg text-gray-700 hover:bg-white transition-all hover:scale-110"
            title="Share"
          >
            <Share2 size={20} />
          </button>
          <button
            onClick={handleAddToDashboard}
            disabled={inDashboard}
            className={`px-6 py-3 rounded-xl shadow-lg font-medium transition-all hover:scale-105 flex items-center gap-2 ${
              inDashboard
                ? 'bg-green-500 text-white cursor-default'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-xl'
            }`}
          >
            {inDashboard ? (
              <>
                <Check size={18} />
                Added to Dashboard
              </>
            ) : (
              <>
                <Plus size={18} />
                Add to Dashboard
              </>
            )}
          </button>
        </div>
      </div>

      {/* Screenshot Thumbnails */}
      {tool.screenshots.length > 0 && (
        <div className="container mx-auto px-4 -mt-16 relative z-20">
          <div className="flex gap-3 overflow-x-auto pb-4">
            {tool.screenshots.map((screenshot, index) => (
              <button
                key={index}
                onClick={() => {
                  setSelectedImage(index);
                  setShowScreenshotModal(true);
                }}
                className={`flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
                  selectedImage === index ? 'border-blue-600 shadow-lg' : 'border-white hover:border-blue-300'
                }`}
              >
                <img src={screenshot} alt={`Screenshot ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl shadow-lg p-4 text-center hover-lift">
                <Users className="mx-auto mb-2 text-blue-600" size={24} />
                <p className="text-sm text-gray-500">Total Users</p>
                <p className="font-semibold text-gray-800">{tool.users.toLocaleString()}</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-4 text-center hover-lift">
                <Download className="mx-auto mb-2 text-green-600" size={24} />
                <p className="text-sm text-gray-500">Downloads</p>
                <p className="font-semibold text-gray-800">{tool.downloads.toLocaleString()}</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-4 text-center hover-lift">
                <Clock className="mx-auto mb-2 text-purple-600" size={24} />
                <p className="text-sm text-gray-500">Setup Time</p>
                <p className="font-semibold text-gray-800">{tool.setup.time}</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-4 text-center hover-lift">
                <HardDrive className="mx-auto mb-2 text-orange-600" size={24} />
                <p className="text-sm text-gray-500">Size</p>
                <p className="font-semibold text-gray-800">{tool.size}</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="border-b border-gray-200">
                <div className="flex overflow-x-auto">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                      activeTab === 'overview'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab('features')}
                    className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                      activeTab === 'features'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Features
                  </button>
                  {hasTutorial && (
                    <button
                      onClick={() => setActiveTab('tutorial')}
                      className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                        activeTab === 'tutorial'
                          ? 'text-blue-600 border-b-2 border-blue-600'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Tutorial {progress > 0 && `(${Math.round(progress)}%)`}
                    </button>
                  )}
                  <button
                    onClick={() => setActiveTab('calculator')}
                    className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                      activeTab === 'calculator'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Live Demo
                  </button>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                      activeTab === 'reviews'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Reviews
                  </button>
                </div>
              </div>

              <div className="p-6">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="space-y-6 animate-slideIn">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <Info size={18} className="text-blue-600" />
                        About {tool.name}
                      </h3>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {tool.longDescription}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <Zap size={18} className="text-yellow-600" />
                        Key Benefits
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {tool.longDescription.split('**Key Benefits:**')[1]?.split('\n')
                          .filter(line => line.trim().startsWith('-'))
                          .map((benefit, index) => (
                            <div key={index} className="flex items-start gap-2 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                              <CheckCircle size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-gray-700">{benefit.replace('-', '').trim()}</span>
                            </div>
                          ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <HardDrive size={18} className="text-purple-600" />
                        Requirements
                      </h3>
                      <div className="space-y-2">
                        {tool.requirements.map((req, index) => (
                          <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
                            <CheckCircle size={16} className="text-blue-500" />
                            <span className="text-sm text-gray-700">{req}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <Clock size={18} className="text-orange-600" />
                        What's New in v{tool.version}
                      </h3>
                      <div className="space-y-2">
                        {tool.whatsNew.map((item, index) => (
                          <div key={index} className="flex items-center gap-2 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                            <Sparkles size={16} className="text-green-600" />
                            <span className="text-sm text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Features Tab */}
                {activeTab === 'features' && (
                  <div className="space-y-4 animate-slideIn">
                    {tool.features.map((feature, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all hover:shadow-md">
                        <div className="flex items-start gap-3">
                          <div className="p-1 bg-green-100 rounded-full">
                            <CheckCircle size={18} className="text-green-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-800">{feature}</h4>
                            <p className="text-sm text-gray-600 mt-1">
                              Powerful feature to help you manage your business more effectively.
                            </p>
                            
                            {/* Feature stats */}
                            <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                              <span className="flex items-center gap-1">
                                <Users size={12} />
                                85% of users find this useful
                              </span>
                              <span className="flex items-center gap-1">
                                <ThumbsUp size={12} />
                                4.8 rating
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tutorial Tab */}
                {activeTab === 'tutorial' && hasTutorial && (
                  <div className="space-y-6 animate-slideIn">
                    {/* Progress Bar */}
                    <div className="bg-gray-100 rounded-full h-2 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    
                    {/* Step Counter */}
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600">
                        Step {currentStep + 1} of {tool.tutorial.steps.length}
                      </p>
                      <button
                        onClick={resetSteps}
                        className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                      >
                        <RefreshCw size={14} />
                        Reset Tutorial
                      </button>
                    </div>

                    {/* Steps Navigation */}
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                        disabled={currentStep === 0}
                        className="p-2 text-gray-400 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      
                      <div className="flex gap-2">
                        {tool.tutorial.steps.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentStep(index)}
                            className={`w-3 h-3 rounded-full transition-all ${
                              index === currentStep
                                ? 'bg-blue-600 scale-125'
                                : completedSteps.includes(index)
                                ? 'bg-green-500'
                                : 'bg-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      
                      <button
                        onClick={() => setCurrentStep(Math.min(tool.tutorial.steps.length - 1, currentStep + 1))}
                        disabled={currentStep === tool.tutorial.steps.length - 1}
                        className="p-2 text-gray-400 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>

                    {/* Current Step */}
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white flex-shrink-0 ${
                          completedSteps.includes(currentStep)
                            ? 'bg-green-500'
                            : 'bg-gradient-to-r from-blue-600 to-purple-600'
                        }`}>
                          {completedSteps.includes(currentStep) ? '✓' : currentStep + 1}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-800 mb-2">
                            {tool.tutorial.steps[currentStep].title}
                          </h4>
                          <p className="text-gray-700 mb-4">
                            {tool.tutorial.steps[currentStep].description}
                          </p>
                          
                          {tool.tutorial.steps[currentStep].image && (
                            <img
                              src={tool.tutorial.steps[currentStep].image}
                              alt={tool.tutorial.steps[currentStep].title}
                              className="rounded-lg shadow-md mb-4 w-full object-cover"
                            />
                          )}
                          
                          <button
                            onClick={() => handleStepComplete(currentStep)}
                            disabled={completedSteps.includes(currentStep)}
                            className={`px-4 py-2 rounded-lg font-medium transition-all ${
                              completedSteps.includes(currentStep)
                                ? 'bg-green-100 text-green-600 cursor-default'
                                : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg'
                            }`}
                          >
                            {completedSteps.includes(currentStep) ? 'Completed ✓' : 'Mark as Complete'}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Tutorial Video */}
                    {tool.tutorial.video && (
                      <div className="mt-4">
                        <button
                          onClick={() => setShowVideo(!showVideo)}
                          className="w-full p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-between"
                        >
                          <span className="font-medium text-gray-700 flex items-center gap-2">
                            <Video size={18} className="text-blue-600" />
                            Watch Video Tutorial
                          </span>
                          {showVideo ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </button>
                        
                        {showVideo && (
                          <div className="mt-4 aspect-video rounded-lg overflow-hidden shadow-lg">
                            <iframe
                              src={tool.tutorial.video}
                              title="Tutorial Video"
                              className="w-full h-full"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Calculator Tab */}
                {activeTab === 'calculator' && (
                  <div className="space-y-6 animate-slideIn">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-xl">
                      <h3 className="text-xl font-bold mb-2">Live Demo</h3>
                      <p className="opacity-90">Try {tool.name} right now - see instant results!</p>
                    </div>

                    {/* Dynamic Calculator based on tool type */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        {tool.id === 'profit-margin-calculator' && (
                          <>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Cost Price ($)
                              </label>
                              <input
                                type="number"
                                value={calculatorInputs.cost || ''}
                                onChange={(e) => handleCalculatorChange('cost', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter cost"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Selling Price ($)
                              </label>
                              <input
                                type="number"
                                value={calculatorInputs.price || ''}
                                onChange={(e) => handleCalculatorChange('price', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter price"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Quantity
                              </label>
                              <input
                                type="number"
                                value={calculatorInputs.quantity || ''}
                                onChange={(e) => handleCalculatorChange('quantity', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter quantity"
                              />
                            </div>
                          </>
                        )}

                        {tool.id === 'loan-emi-calculator' && (
                          <>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Loan Amount ($)
                              </label>
                              <input
                                type="number"
                                value={calculatorInputs.amount || ''}
                                onChange={(e) => handleCalculatorChange('amount', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter loan amount"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Interest Rate (%)
                              </label>
                              <input
                                type="number"
                                step="0.1"
                                value={calculatorInputs.rate || ''}
                                onChange={(e) => handleCalculatorChange('rate', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter interest rate"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tenure (months)
                              </label>
                              <input
                                type="number"
                                value={calculatorInputs.tenure || ''}
                                onChange={(e) => handleCalculatorChange('tenure', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter tenure in months"
                              />
                            </div>
                          </>
                        )}

                        {tool.id === 'break-even-analyzer' && (
                          <>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Fixed Costs ($)
                              </label>
                              <input
                                type="number"
                                value={calculatorInputs.fixedCosts || ''}
                                onChange={(e) => handleCalculatorChange('fixedCosts', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter fixed costs"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Variable Cost per Unit ($)
                              </label>
                              <input
                                type="number"
                                value={calculatorInputs.variableCost || ''}
                                onChange={(e) => handleCalculatorChange('variableCost', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter variable cost"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Selling Price per Unit ($)
                              </label>
                              <input
                                type="number"
                                value={calculatorInputs.price || ''}
                                onChange={(e) => handleCalculatorChange('price', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter selling price"
                              />
                            </div>
                          </>
                        )}

                        {tool.id === 'roi-calculator' && (
                          <>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Initial Investment ($)
                              </label>
                              <input
                                type="number"
                                value={calculatorInputs.investment || ''}
                                onChange={(e) => handleCalculatorChange('investment', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter investment"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Total Return ($)
                              </label>
                              <input
                                type="number"
                                value={calculatorInputs.return || ''}
                                onChange={(e) => handleCalculatorChange('return', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter return"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Time Period (years)
                              </label>
                              <input
                                type="number"
                                value={calculatorInputs.years || ''}
                                onChange={(e) => handleCalculatorChange('years', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter years"
                              />
                            </div>
                          </>
                        )}
                      </div>

                      {/* Results */}
                      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
                        <h4 className="text-lg font-semibold text-gray-800 mb-4">Results</h4>
                        
                        {calculatorResult ? (
                          <div className="space-y-4">
                            {Object.entries(calculatorResult).map(([key, value]) => (
                              <div key={key} className="flex justify-between items-center p-3 bg-white rounded-lg">
                                <span className="text-sm text-gray-600 capitalize">
                                  {key.replace(/([A-Z])/g, ' $1').trim()}:
                                </span>
                                <span className="font-semibold text-blue-600">
                                  {key.includes('margin') || key.includes('roi') ? `${value}%` : 
                                   key.includes('emi') || key.includes('payment') || key.includes('profit') ? `$${value}` : value}
                                </span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8">
                            <HelpCircle size={32} className="mx-auto text-gray-300 mb-2" />
                            <p className="text-gray-500">Enter values to see results</p>
                          </div>
                        )}

                        <button
                          onClick={calculateResult}
                          className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                        >
                          Calculate
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                  <div className="space-y-6 animate-slideIn">
                    {/* Rating Summary */}
                    <div className="flex items-center gap-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                      <div className="text-center">
                        <div className="text-5xl font-bold text-gray-800">{tool.rating}</div>
                        <div className="flex items-center gap-1 mt-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              size={20}
                              className={star <= Math.round(tool.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{tool.users} reviews</p>
                      </div>
                      
                      <div className="flex-1 space-y-2">
                        {[5, 4, 3, 2, 1].map((stars) => {
                          const percentage = stars === 5 ? 70 : stars === 4 ? 20 : stars === 3 ? 7 : stars === 2 ? 2 : 1;
                          return (
                            <div key={stars} className="flex items-center gap-2">
                              <span className="text-sm text-gray-600 w-8">{stars} ★</span>
                              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full ${stars === 5 ? 'bg-green-500' : stars === 4 ? 'bg-blue-500' : stars === 3 ? 'bg-yellow-500' : 'bg-orange-500'} rounded-full`}
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                              <span className="text-sm text-gray-600 w-12">{percentage}%</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Write Review Button */}
                    <button
                      onClick={() => setShowFeedback(true)}
                      className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      <MessageCircle size={18} />
                      Write a Review
                    </button>

                    {/* Sample Reviews */}
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-all">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                                U{i}
                              </div>
                              <div>
                                <p className="font-medium text-gray-800">User {i}</p>
                                <p className="text-xs text-gray-500">2 days ago</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  size={14}
                                  className={star <= 5 ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-700 ml-13">
                            This tool has been incredibly helpful for our business. 
                            The step-by-step tutorial made it easy to get started!
                          </p>
                          <div className="flex items-center gap-4 mt-3 ml-13">
                            <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600">
                              <ThumbsUp size={14} />
                              Helpful (12)
                            </button>
                            <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600">
                              <MessageCircle size={14} />
                              Reply
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Info Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Info size={18} className="text-blue-600" />
                Tool Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
                  <span className="text-sm text-gray-500 flex items-center gap-2">
                    <Tag size={14} /> Version
                  </span>
                  <span className="text-sm font-medium text-gray-800">{tool.version}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
                  <span className="text-sm text-gray-500 flex items-center gap-2">
                    <Users size={14} /> Author
                  </span>
                  <span className="text-sm font-medium text-gray-800">{tool.author}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
                  <span className="text-sm text-gray-500 flex items-center gap-2">
                    <Grid size={14} /> Category
                  </span>
                  <span className="text-sm font-medium text-gray-800 capitalize">{tool.category}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
                  <span className="text-sm text-gray-500 flex items-center gap-2">
                    <Calendar size={14} /> Last Updated
                  </span>
                  <span className="text-sm font-medium text-gray-800">
                    {new Date(tool.lastUpdated).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
                  <span className="text-sm text-gray-500 flex items-center gap-2">
                    <HardDrive size={14} /> File Size
                  </span>
                  <span className="text-sm font-medium text-gray-800">{tool.size}</span>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Tag size={18} className="text-purple-600" />
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {tool.tags.map((tag, index) => (
                  <span
                    key={index}
                    onClick={() => navigate(`/tools?tag=${tag}`)}
                    className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white transition-all cursor-pointer hover:scale-105"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Zap size={18} className="text-yellow-600" />
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => window.print()}
                  className="w-full flex items-center gap-3 p-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white transition-all group"
                >
                  <Printer size={18} />
                  <span className="flex-1 text-left">Print Details</span>
                  <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-all" />
                </button>
                
                <button
                  onClick={handleShare}
                  className="w-full flex items-center gap-3 p-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white transition-all group"
                >
                  <Share2 size={18} />
                  <span className="flex-1 text-left">Share Tool</span>
                  <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-all" />
                </button>
                
                <button
                  onClick={() => setShowHelp(true)}
                  className="w-full flex items-center gap-3 p-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white transition-all group"
                >
                  <HelpCircle size={18} />
                  <span className="flex-1 text-left">Get Help</span>
                  <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-all" />
                </button>
                
                <button
                  onClick={() => navigate('/tools')}
                  className="w-full flex items-center gap-3 p-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white transition-all group"
                >
                  <Grid size={18} />
                  <span className="flex-1 text-left">Browse All Tools</span>
                  <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-all" />
                </button>
              </div>
            </div>

            {/* Similar Tools */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Layout size={18} className="text-green-600" />
                Similar Tools
              </h3>
              <div className="space-y-3">
                {availableTools
                  .filter(t => t.category === tool.category && t.id !== tool.id)
                  .slice(0, 3)
                  .map(similarTool => {
                    const SimilarIcon = getIcon(similarTool.icon);
                    return (
                      <div
                        key={similarTool.id}
                        onClick={() => navigate(`/tools/${similarTool.id}`)}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 cursor-pointer transition-all group"
                      >
                        <div className={`p-2 rounded-lg ${getColorClasses(similarTool.color)}`}>
                          <SimilarIcon size={16} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-800 group-hover:text-blue-600">
                            {similarTool.name}
                          </p>
                          <p className="text-xs text-gray-500">{similarTool.users} users</p>
                        </div>
                        <ChevronRight size={16} className="text-gray-400 group-hover:text-blue-600" />
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowShareModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full p-6 animate-scaleIn" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">Share Tool</h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            <p className="text-gray-600 mb-6">Share "{tool.name}" with others</p>

            <div className="grid grid-cols-4 gap-3 mb-6">
              <button
                onClick={copyLink}
                className="p-4 bg-gray-100 text-gray-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all hover:scale-105"
              >
                <Link className="w-6 h-6 mx-auto" />
              </button>
              <button
                onClick={() => {
                  window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank');
                  setShowShareModal(false);
                }}
                className="p-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all hover:scale-105"
              >
                <Facebook className="w-6 h-6 mx-auto" />
              </button>
              <button
                onClick={() => {
                  window.open(`https://twitter.com/intent/tweet?text=Check out ${tool.name} on BizCraft&url=${window.location.href}`, '_blank');
                  setShowShareModal(false);
                }}
                className="p-4 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-all hover:scale-105"
              >
                <Twitter className="w-6 h-6 mx-auto" />
              </button>
              <button
                onClick={() => {
                  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`, '_blank');
                  setShowShareModal(false);
                }}
                className="p-4 bg-blue-700 text-white rounded-xl hover:bg-blue-800 transition-all hover:scale-105"
              >
                <Linkedin className="w-6 h-6 mx-auto" />
              </button>
            </div>

            <button
              onClick={() => {
                window.open(`mailto:?subject=Check out ${tool.name} on BizCraft&body=I thought you might be interested in this tool: ${window.location.href}`, '_blank');
                setShowShareModal(false);
              }}
              className="w-full flex items-center justify-center gap-2 p-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all"
            >
              <Mail size={18} />
              Share via Email
            </button>
          </div>
        </div>
      )}

      {/* Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowHelp(false)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 animate-scaleIn" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Help & Support</h3>
              <button
                onClick={() => setShowHelp(false)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6">
              <div className="p-4 bg-blue-50 rounded-xl">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <HelpCircle size={18} className="text-blue-600" />
                  Frequently Asked Questions
                </h4>
                <div className="space-y-3">
                  <div className="p-3 bg-white rounded-lg">
                    <p className="font-medium text-gray-800">How do I add this tool to my dashboard?</p>
                    <p className="text-sm text-gray-600 mt-1">Click the "Add to Dashboard" button at the top of the page. You'll need to be logged in first.</p>
                  </div>
                  <div className="p-3 bg-white rounded-lg">
                    <p className="font-medium text-gray-800">Is this tool really free?</p>
                    <p className="text-sm text-gray-600 mt-1">Yes! All basic features are completely free. Premium features may require a subscription.</p>
                  </div>
                  <div className="p-3 bg-white rounded-lg">
                    <p className="font-medium text-gray-800">Can I share this tool with my team?</p>
                    <p className="text-sm text-gray-600 mt-1">Absolutely! Use the share button to invite team members or share via email/social media.</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-purple-50 rounded-xl">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <MessageCircle size={18} className="text-purple-600" />
                  Need More Help?
                </h4>
                <p className="text-sm text-gray-600 mb-4">Our support team is ready to assist you with any questions.</p>
                <button
                  onClick={() => {
                    setShowHelp(false);
                    toast.success('Support ticket created! We\'ll respond within 24 hours.');
                  }}
                  className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                >
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {showFeedback && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowFeedback(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full p-6 animate-scaleIn" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">Write a Review</h3>
              <button
                onClick={() => setShowFeedback(false)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setFeedbackRating(star)}
                      className="hover:scale-110 transition-transform"
                    >
                      <Star
                        size={24}
                        className={star <= feedbackRating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
                <textarea
                  value={feedbackComment}
                  onChange={(e) => setFeedbackComment(e.target.value)}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Share your experience with this tool..."
                />
              </div>

              <button
                onClick={handleFeedbackSubmit}
                disabled={!feedbackRating || !feedbackComment}
                className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Screenshot Modal */}
      {showScreenshotModal && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4" onClick={() => setShowScreenshotModal(false)}>
          <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowScreenshotModal(false)}
              className="absolute -top-12 right-0 text-white/80 hover:text-white hover:scale-110 transition-all"
            >
              <X size={24} />
            </button>
            <img 
              src={tool.screenshots[selectedImage]} 
              alt={tool.name}
              className="w-full rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ToolDetail;