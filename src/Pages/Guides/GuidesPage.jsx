import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccess } from '../../context/AccessContext';
import { useAuth } from '../../context/AuthContext';
import { useActivity } from '../../context/ActivityContext';
import Navbar from '../../Components/Navbar/Navbar';
import { 
  Search, 
  BookOpen, 
  FileText, 
  Video, 
  Download,
  Clock,
  Star,
  Filter,
  Grid,
  List,
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  Heart,
  Share2,
  Printer,
  Mail,
  ChevronDown,
  SlidersHorizontal,
  X,
  Sparkles,
  TrendingUp,
  Award,
  Users,
  Calendar,
  Tag,
  Layers,
  Eye,
  PlayCircle,
  FileSpreadsheet,
  Globe,
  Zap,
  BarChart,
  PieChart,
  LineChart,
  Activity,
  Settings,
  MoreHorizontal,
  CheckCircle,
  AlertCircle,
  Info,
  HelpCircle,
  Lightbulb,
  Rocket,
  Gift,
  Coffee,
  Headphones,
  Mic,
  Camera,
  FileJson,
  FileCode,
  FileImage,
  FileAudio,
  FileVideo,
  FileArchive
} from 'lucide-react';
import { toast } from 'react-hot-toast';

// Enhanced styles with professional blue color scheme
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
  .stagger-item:nth-child(9) { animation-delay: 0.45s; }
  .stagger-item:nth-child(10) { animation-delay: 0.5s; }
  
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

const GuidesPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { getRemaining, trackView } = useAccess();
  const { addToRecentlyViewed, toggleBookmark, isBookmarked } = useActivity();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('popular');
  const [selectedTags, setSelectedTags] = useState([]);
  const [difficulty, setDifficulty] = useState('all');
  const [duration, setDuration] = useState('all');
  const [minRating, setMinRating] = useState(0);
  const [showQuickView, setShowQuickView] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  // Refs for infinite scroll
  const observerRef = useRef();
  const lastItemRef = useRef();

  // Complete Business Guides Data - MOVED INSIDE COMPONENT
  const allGuides = [
    // 🍞 BAKERY BUSINESS GUIDE
    {
      id: 1,
      title: 'The Complete Guide to Starting a Bakery Business',
      subtitle: 'From Home Baker to Bakery Owner',
      description: 'A step-by-step guide to launching and growing a successful bakery business, from concept to first million in revenue.',
      longDescription: `This comprehensive guide takes you from the initial dream of owning a bakery to running a profitable business. Whether you're starting from your home kitchen or opening a storefront, you'll learn everything about recipes, equipment, staffing, marketing, and scaling your bakery.

      **What makes this guide unique:**
      - Real cost breakdowns for different bakery types
      - Recipe scaling secrets from professional bakers
      - Equipment sourcing on any budget
      - Staff training systems that work
      - Marketing strategies that actually sell pastries
      
      **Perfect for:** Home bakers, culinary school graduates, food entrepreneurs, and anyone passionate about baking.`,
      
      category: 'guides',
      type: 'PDF Guide',
      format: 'PDF',
      readTime: '45 min',
      rating: 4.9,
      level: 'Beginner',
      difficulty: 'Beginner',
      downloads: 15420,
      views: 45678,
      likes: 3421,
      bookmarks: 2156,
      shares: 1890,
      
      author: 'Chef Marie Dubois',
      authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop',
      authorRole: 'Pastry Chef & Business Consultant',
      authorBio: 'Marie has helped over 200 bakeries start and scale across Europe and North America.',
      
      publishedDate: '2024-01-15',
      lastUpdated: '2024-03-01',
      
      tags: ['bakery', 'food business', 'small business', 'baking', 'culinary', 'restaurant'],
      language: 'English',
      pages: 156,
      
      featured: true,
      popular: true,
      trending: true,
      
      coverImage: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=1200&h=600&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=200&fit=crop',
      icon: '🥖',
      
      color: 'from-amber-500 to-orange-600',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-600',
      
      includes: [
        '156-page comprehensive guide',
        'Equipment checklist PDF',
        'Recipe scaling calculator',
        'Staff training templates',
        'Marketing calendar',
        'Financial projections spreadsheet'
      ],
      
      learningObjectives: [
        'Choose the right bakery concept for your market',
        'Source equipment on a startup budget',
        'Develop signature recipes that sell',
        'Price products for profit',
        'Hire and train bakery staff',
        'Market to local customers effectively',
        'Scale from home kitchen to commercial space'
      ],
      
      tableOfContents: [
        { chapter: 1, title: 'Choosing Your Bakery Concept', pages: '12-28' },
        { chapter: 2, title: 'Business Planning & Licenses', pages: '29-45' },
        { chapter: 3, title: 'Equipment & Supply Sourcing', pages: '46-67' },
        { chapter: 4, title: 'Recipe Development & Scaling', pages: '68-89' },
        { chapter: 5, title: 'Staffing & Training', pages: '90-108' },
        { chapter: 6, title: 'Marketing Your Bakery', pages: '109-128' },
        { chapter: 7, title: 'Financial Management', pages: '129-145' },
        { chapter: 8, title: 'Growth & Expansion', pages: '146-156' }
      ],
      
      relatedIds: [2, 3, 4, 5]
    },

    // ☕ COFFEE SHOP GUIDE
    {
      id: 2,
      title: 'Coffee Shop Success: From Beans to Business',
      subtitle: 'The Ultimate Guide to Opening a Profitable Cafe',
      description: 'Everything you need to know about starting and running a successful coffee shop, including equipment, sourcing, and customer experience.',
      longDescription: `The coffee industry is booming, but competition is fierce. This guide gives you the insider knowledge needed to stand out and thrive in the coffee shop business.

      **Inside this comprehensive guide:**
      - Coffee sourcing and roasting partnerships
      - Espresso machine buying guide for every budget
      - Barista training programs that work
      - Creating a memorable customer experience
      - Building a loyal customer base
      - Expanding to multiple locations
      
      **Includes interviews with successful cafe owners who started with nothing and built thriving businesses.`,
      
      category: 'guides',
      type: 'PDF Guide',
      format: 'PDF',
      readTime: '55 min',
      rating: 4.8,
      level: 'Beginner',
      difficulty: 'Beginner',
      downloads: 12340,
      views: 38900,
      likes: 2890,
      bookmarks: 1876,
      shares: 1456,
      
      author: 'James Hoffman',
      authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
      authorRole: 'Coffee Expert & 3x Cafe Owner',
      authorBio: 'James has opened 7 successful coffee shops and consulted for over 50 cafes worldwide.',
      
      publishedDate: '2024-02-10',
      lastUpdated: '2024-03-05',
      
      tags: ['coffee', 'cafe', 'food and beverage', 'hospitality', 'small business'],
      language: 'English',
      pages: 182,
      
      featured: true,
      popular: true,
      trending: false,
      
      coverImage: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1200&h=600&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=400&h=200&fit=crop',
      icon: '☕',
      
      color: 'from-amber-700 to-brown-600',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-700',
      
      includes: [
        '182-page comprehensive guide',
        'Equipment ROI calculator',
        'Barista training manual',
        'Coffee sourcing checklist',
        'Menu pricing templates',
        'Customer loyalty program guide'
      ],
      
      learningObjectives: [
        'Source and roast coffee beans',
        'Choose the right espresso equipment',
        'Train baristas to consistently produce quality drinks',
        'Design an inviting cafe space',
        'Create a profitable menu',
        'Build customer loyalty',
        'Scale to multiple locations'
      ],
      
      tableOfContents: [
        { chapter: 1, title: 'The Coffee Industry Landscape', pages: '10-25' },
        { chapter: 2, title: 'Coffee Sourcing & Relationships', pages: '26-45' },
        { chapter: 3, title: 'Equipment Selection Guide', pages: '46-72' },
        { chapter: 4, title: 'Cafe Design & Layout', pages: '73-95' },
        { chapter: 5, title: 'Barista Training Systems', pages: '96-118' },
        { chapter: 6, title: 'Menu Development & Pricing', pages: '119-140' },
        { chapter: 7, title: 'Marketing & Community Building', pages: '141-160' },
        { chapter: 8, title: 'Financial Management', pages: '161-175' },
        { chapter: 9, title: 'Multi-Location Expansion', pages: '176-182' }
      ],
      
      relatedIds: [1, 3, 5, 7]
    },

    // 🍕 PIZZA RESTAURANT GUIDE
    {
      id: 3,
      title: 'The Ultimate Pizza Restaurant Business Guide',
      subtitle: 'From Neapolitan to New York Style',
      description: 'Complete guide to opening and running a successful pizzeria, covering dough recipes, oven selection, and building a loyal following.',
      longDescription: `Pizza is a beloved food worldwide, but opening a successful pizzeria requires mastering both craft and business. This guide covers every aspect of pizza restaurant ownership.

      **Master the craft:**
      - Perfect dough recipes for every style
      - Sauce making from scratch
      - Cheese selection and blends
      - Oven selection (wood-fired, deck, conveyor)
      - Topping combinations that sell
      - Delivery vs. dine-in operations
      
      **Business systems that work:**
      - Location selection for pizza
      - Kitchen workflow optimization
      - Delivery logistics
      - Catering and events
      - Building a local following
      - Franchising opportunities
      
      **Includes interviews with pizzeria owners who've been featured in national media.**`,
      
      category: 'guides',
      type: 'PDF Guide',
      format: 'PDF',
      readTime: '65 min',
      rating: 4.9,
      level: 'Intermediate',
      difficulty: 'Intermediate',
      downloads: 15670,
      views: 42300,
      likes: 3870,
      bookmarks: 2450,
      shares: 1980,
      
      author: 'Tony Gemignani',
      authorAvatar: 'https://images.unsplash.com/photo-1531427186627-0fd5d0acc1d3d?w=200&h=200&fit=crop',
      authorRole: '13-time World Pizza Champion',
      authorBio: 'Tony has won more pizza competitions than anyone and owns 15 successful pizza restaurants.',
      
      publishedDate: '2024-01-30',
      lastUpdated: '2024-03-10',
      
      tags: ['pizza', 'restaurant', 'food business', 'italian food', 'hospitality'],
      language: 'English',
      pages: 210,
      
      featured: true,
      popular: true,
      trending: true,
      
      coverImage: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&h=600&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=200&fit=crop',
      icon: '🍕',
      
      color: 'from-red-500 to-orange-600',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
      
      includes: [
        '210-page comprehensive guide',
        'Recipe book with 15 signature pizzas',
        'Dough calculator spreadsheet',
        'Equipment buying guide',
        'Kitchen layout templates',
        'Marketing calendar',
        'Delivery route optimizer'
      ],
      
      learningObjectives: [
        'Master pizza dough for any style',
        'Choose the right oven for your concept',
        'Design an efficient kitchen workflow',
        'Create a profitable menu',
        'Build a delivery operation',
        'Develop catering business',
        'Create a recognizable brand'
      ],
      
      tableOfContents: [
        { chapter: 1, title: 'Pizza Styles & Concepts', pages: '12-30' },
        { chapter: 2, title: 'The Science of Dough', pages: '31-55' },
        { chapter: 3, title: 'Sauces & Toppings', pages: '56-78' },
        { chapter: 4, title: 'Oven Selection Guide', pages: '79-100' },
        { chapter: 5, title: 'Kitchen Design & Workflow', pages: '101-125' },
        { chapter: 6, title: 'Staff Training', pages: '126-145' },
        { chapter: 7, title: 'Delivery Operations', pages: '146-165' },
        { chapter: 8, title: 'Catering & Events', pages: '166-180' },
        { chapter: 9, title: 'Marketing Your Pizzeria', pages: '181-195' },
        { chapter: 10, title: 'Growth & Franchising', pages: '196-210' }
      ],
      
      relatedIds: [1, 2, 4, 5]
    },

    // 🏋️ GYM & FITNESS CENTER GUIDE
    {
      id: 4,
      title: 'Fitness Business Blueprint: Starting & Scaling a Gym',
      subtitle: 'From Personal Training to Full-Service Fitness Center',
      description: 'Complete guide to opening and running a profitable gym, fitness studio, or personal training business.',
      longDescription: `The fitness industry is booming, but most gyms fail within the first three years. This guide gives you the systems and strategies used by successful fitness entrepreneurs to build thriving businesses.

      **Choose your path:**
      - Boutique studio (yoga, Pilates, spin)
      - CrossFit-style box
      - Traditional gym
      - Personal training studio
      - Multi-purpose fitness center
      
      **Business systems:**
      - Membership models that work
      - Retention strategies
      - Personal trainer hiring & training
      - Equipment financing
      - Group class programming
      - Corporate wellness programs
      - Online training integration
      
      **Real stories from gym owners who built million-dollar fitness businesses.**`,
      
      category: 'guides',
      type: 'PDF Guide',
      format: 'PDF',
      readTime: '60 min',
      rating: 4.8,
      level: 'Beginner',
      difficulty: 'Beginner',
      downloads: 11230,
      views: 29800,
      likes: 2670,
      bookmarks: 1876,
      shares: 1345,
      
      author: 'Jillian Michaels',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop',
      authorRole: 'Fitness Expert & Entrepreneur',
      authorBio: 'Jillian has helped millions get fit and has built multiple successful fitness businesses.',
      
      publishedDate: '2024-02-15',
      lastUpdated: '2024-03-08',
      
      tags: ['gym', 'fitness', 'health', 'wellness', 'personal training', 'small business'],
      language: 'English',
      pages: 195,
      
      featured: true,
      popular: true,
      trending: false,
      
      coverImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=600&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=200&fit=crop',
      icon: '🏋️',
      
      color: 'from-green-600 to-emerald-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      
      includes: [
        '195-page comprehensive guide',
        'Membership pricing calculator',
        'Personal trainer agreement templates',
        'Class schedule planner',
        'Equipment ROI spreadsheet',
        'Retention strategies workbook',
        'Marketing campaign templates'
      ],
      
      learningObjectives: [
        'Choose the right fitness concept',
        'Design effective membership models',
        'Hire and train fitness professionals',
        'Create engaging class programs',
        'Retain members long-term',
        'Add corporate wellness programs',
        'Integrate online training'
      ],
      
      tableOfContents: [
        { chapter: 1, title: 'Fitness Industry Overview', pages: '10-25' },
        { chapter: 2, title: 'Choosing Your Fitness Concept', pages: '26-45' },
        { chapter: 3, title: 'Location & Facility Design', pages: '46-70' },
        { chapter: 4, title: 'Equipment Selection & Financing', pages: '71-95' },
        { chapter: 5, title: 'Membership Models & Pricing', pages: '96-115' },
        { chapter: 6, title: 'Staffing & Training', pages: '116-135' },
        { chapter: 7, title: 'Group Class Programming', pages: '136-155' },
        { chapter: 8, title: 'Retention Strategies', pages: '156-170' },
        { chapter: 9, title: 'Marketing & Sales', pages: '171-185' },
        { chapter: 10, title: 'Expansion & Multi-Location', pages: '186-195' }
      ],
      
      relatedIds: [1, 2, 5, 7]
    },

    // 🌿 ECO-FRIENDLY PRODUCTS BUSINESS
    {
      id: 5,
      title: 'Green Business: Starting an Eco-Friendly Products Company',
      subtitle: 'Sustainable Products, Sustainable Profits',
      description: 'Complete guide to launching and growing a business selling eco-friendly, sustainable, and zero-waste products.',
      longDescription: `Consumers are increasingly choosing sustainable products, creating enormous opportunities for green entrepreneurs. This guide shows you how to build a business that's both profitable and planet-friendly.

      **Product categories:**
      - Reusable household items
      - Sustainable fashion
      - Natural personal care
      - Eco-friendly packaging
      - Zero-waste lifestyle products
      - Green cleaning supplies
      
      **Business essentials:**
      - Sourcing sustainable materials
      - Finding ethical manufacturers
      - Certifications that matter
      - Marketing to conscious consumers
      - Packaging and shipping sustainably
      - Building a brand story
      - Measuring your impact
      
      **Stories from founders who've built million-dollar sustainable brands.**`,
      
      category: 'guides',
      type: 'PDF Guide',
      format: 'PDF',
      readTime: '50 min',
      rating: 4.8,
      level: 'Beginner',
      difficulty: 'Beginner',
      downloads: 8760,
      views: 19800,
      likes: 2340,
      bookmarks: 1678,
      shares: 1234,
      
      author: 'Lauren Singer',
      authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop',
      authorRole: 'Zero-Waste Expert & Founder',
      authorBio: 'Lauren founded a successful zero-waste store and has helped hundreds of entrepreneurs start eco-friendly businesses.',
      
      publishedDate: '2024-02-05',
      lastUpdated: '2024-03-01',
      
      tags: ['eco-friendly', 'sustainable', 'green business', 'environment', 'ecommerce'],
      language: 'English',
      pages: 145,
      
      featured: true,
      popular: false,
      trending: true,
      
      coverImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778bdf?w=1200&h=600&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778bdf?w=400&h=200&fit=crop',
      icon: '🌿',
      
      color: 'from-emerald-600 to-teal-600',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-600',
      
      includes: [
        '145-page comprehensive guide',
        'Supplier sourcing directory',
        'Certification checklist',
        'Sustainable packaging guide',
        'Impact measurement tools',
        'Marketing templates',
        'Brand story workbook'
      ],
      
      learningObjectives: [
        'Identify profitable eco-friendly niches',
        'Source sustainable materials',
        'Find ethical manufacturers',
        'Obtain meaningful certifications',
        'Market to conscious consumers',
        'Package products sustainably',
        'Measure and communicate impact'
      ],
      
      tableOfContents: [
        { chapter: 1, title: 'The Green Economy', pages: '8-20' },
        { chapter: 2, title: 'Finding Your Niche', pages: '21-35' },
        { chapter: 3, title: 'Sourcing Materials', pages: '36-50' },
        { chapter: 4, title: 'Manufacturing Partners', pages: '51-65' },
        { chapter: 5, title: 'Certifications & Standards', pages: '66-80' },
        { chapter: 6, title: 'Sustainable Packaging', pages: '81-95' },
        { chapter: 7, title: 'Brand Story & Marketing', pages: '96-115' },
        { chapter: 8, title: 'E-commerce & Retail', pages: '116-130' },
        { chapter: 9, title: 'Measuring Impact', pages: '131-145' }
      ],
      
      relatedIds: [1, 2, 4, 7]
    },

    // 📱 MOBILE APP DEVELOPMENT AGENCY GUIDE
    {
      id: 6,
      title: 'App Agency: Building a Mobile Development Business',
      subtitle: 'From Freelancer to Agency Owner',
      description: 'Complete guide to starting and scaling a mobile app development agency, from finding clients to managing teams.',
      longDescription: `The app economy is worth billions, but most developers struggle to turn their skills into a sustainable business. This guide shows you how to build a profitable app development agency.

      **From freelancer to agency:**
      - Finding your first clients
      - Pricing projects profitably
      - Hiring developers and designers
      - Project management systems
      - Quality assurance processes
      - Client communication
      - Scaling to multiple teams
      
      **Specialized knowledge:**
      - iOS vs. Android strategy
      - Cross-platform frameworks
      - UI/UX best practices
      - App store optimization
      - Post-launch support
      - Recurring revenue models
      
      **Interviews with agency owners who've built 7-figure businesses.**`,
      
      category: 'guides',
      type: 'PDF Guide',
      format: 'PDF',
      readTime: '55 min',
      rating: 4.7,
      level: 'Intermediate',
      difficulty: 'Intermediate',
      downloads: 9870,
      views: 25600,
      likes: 2130,
      bookmarks: 1567,
      shares: 1098,
      
      author: 'Sarah Chen',
      authorAvatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop',
      authorRole: 'Agency Founder & Tech Consultant',
      authorBio: 'Sarah started as a freelance developer and built a 50-person agency serving Fortune 500 clients.',
      
      publishedDate: '2024-02-20',
      lastUpdated: '2024-03-12',
      
      tags: ['app development', 'agency', 'freelance', 'technology', 'software', 'startup'],
      language: 'English',
      pages: 178,
      
      featured: false,
      popular: true,
      trending: true,
      
      coverImage: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=1200&h=600&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=400&h=200&fit=crop',
      icon: '📱',
      
      color: 'from-indigo-600 to-purple-600',
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-600',
      
      includes: [
        '178-page comprehensive guide',
        'Client contract templates',
        'Project estimation worksheet',
        'Hiring & interview guides',
        'Project management templates',
        'Quality assurance checklist',
        'Recurring revenue models'
      ],
      
      learningObjectives: [
        'Find and close high-paying clients',
        'Price projects profitably',
        'Hire and manage development teams',
        'Implement effective project management',
        'Ensure quality deliverables',
        'Build recurring revenue',
        'Scale to multi-team agency'
      ],
      
      tableOfContents: [
        { chapter: 1, title: 'The App Economy', pages: '8-22' },
        { chapter: 2, title: 'Finding Your First Clients', pages: '23-40' },
        { chapter: 3, title: 'Pricing & Proposals', pages: '41-60' },
        { chapter: 4, title: 'Project Management Systems', pages: '61-80' },
        { chapter: 5, title: 'Hiring Your First Team', pages: '81-100' },
        { chapter: 6, title: 'Development Processes', pages: '101-120' },
        { chapter: 7, title: 'Quality Assurance', pages: '121-135' },
        { chapter: 8, title: 'Client Communication', pages: '136-150' },
        { chapter: 9, title: 'Scaling Your Agency', pages: '151-168' },
        { chapter: 10, title: 'Recurring Revenue', pages: '169-178' }
      ],
      
      relatedIds: [1, 8, 9, 10]
    },

    // 🏡 AIRBNB & SHORT-TERM RENTAL GUIDE
    {
      id: 7,
      title: 'Airbnb Empire: Building a Short-Term Rental Business',
      subtitle: 'From One Property to a Portfolio',
      description: 'Complete guide to starting and scaling a profitable short-term rental business.',
      longDescription: `The short-term rental market has exploded, creating opportunities for entrepreneurs to build substantial businesses. This guide shows you how to succeed in the Airbnb and vacation rental space.

      **Getting started:**
      - Finding profitable properties
      - Financing your first rental
      - Setting up for success
      - Photography that sells
      - Writing compelling listings
      - Pricing strategies
      - Guest communication
      
      **Scaling up:**
      - Managing multiple properties
      - Hiring cleaning teams
      - Co-hosting arrangements
      - Dynamic pricing tools
      - Automation systems
      - Handling difficult guests
      - Expanding to new markets
      
      **Real stories from hosts who built 7-figure rental portfolios.**`,
      
      category: 'guides',
      type: 'PDF Guide',
      format: 'PDF',
      readTime: '55 min',
      rating: 4.9,
      level: 'Beginner',
      difficulty: 'Beginner',
      downloads: 18760,
      views: 45600,
      likes: 3980,
      bookmarks: 2876,
      shares: 2134,
      
      author: 'Sarah Johnson',
      authorAvatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop',
      authorRole: 'Short-Term Rental Expert',
      authorBio: 'Sarah started with one spare room and now manages a portfolio of 25+ properties generating millions annually.',
      
      publishedDate: '2024-01-25',
      lastUpdated: '2024-03-01',
      
      tags: ['airbnb', 'vacation rental', 'real estate', 'hospitality', 'passive income'],
      language: 'English',
      pages: 172,
      
      featured: true,
      popular: true,
      trending: true,
      
      coverImage: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&h=600&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=200&fit=crop',
      icon: '🏡',
      
      color: 'from-rose-600 to-pink-600',
      bgColor: 'bg-rose-50',
      textColor: 'text-rose-600',
      
      includes: [
        '172-page comprehensive guide',
        'Property analysis spreadsheet',
        'Listing template',
        'Welcome book template',
        'Cleaning checklist',
        'Guest communication templates',
        'Dynamic pricing guide'
      ],
      
      learningObjectives: [
        'Find profitable rental properties',
        'Finance your first rental',
        'Create listings that convert',
        'Price for maximum revenue',
        'Manage guest communication',
        'Handle cleaning and maintenance',
        'Scale to multiple properties'
      ],
      
      tableOfContents: [
        { chapter: 1, title: 'The Short-Term Rental Opportunity', pages: '10-25' },
        { chapter: 2, title: 'Finding the Right Property', pages: '26-40' },
        { chapter: 3, title: 'Financing Your Rental', pages: '41-55' },
        { chapter: 4, title: 'Setting Up for Success', pages: '56-70' },
        { chapter: 5, title: 'Creating Your Listing', pages: '71-85' },
        { chapter: 6, title: 'Pricing Strategies', pages: '86-100' },
        { chapter: 7, title: 'Guest Communication', pages: '101-115' },
        { chapter: 8, title: 'Cleaning & Maintenance', pages: '116-130' },
        { chapter: 9, title: 'Managing Multiple Properties', pages: '131-150' },
        { chapter: 10, title: 'Scaling Your Portfolio', pages: '151-172' }
      ],
      
      relatedIds: [1, 3, 5, 8]
    },

    // 🧘 YOGA & WELLNESS STUDIO GUIDE
    {
      id: 8,
      title: 'Mindful Business: Starting a Yoga & Wellness Studio',
      subtitle: 'From Teaching to Studio Ownership',
      description: 'Complete guide to opening and running a successful yoga, meditation, or wellness studio.',
      longDescription: `You've found your calling in yoga or wellness, and now you want to share it with more people. This guide helps you build a business that supports your mission and your livelihood.

      **Studio essentials:**
      - Location and space requirements
      - Studio design and atmosphere
      - Equipment and props
      - Class scheduling
      - Pricing and memberships
      - Teacher hiring and training
      - Workshop and event planning
      
      **Business systems:**
      - Studio management software
      - Marketing to wellness seekers
      - Building community
      - Corporate partnerships
      - Retreats and intensives
      - Teacher trainings
      - Online class offerings
      
      **Stories from studio owners who've built thriving wellness communities.**`,
      
      category: 'guides',
      type: 'PDF Guide',
      format: 'PDF',
      readTime: '50 min',
      rating: 4.8,
      level: 'Beginner',
      difficulty: 'Beginner',
      downloads: 9870,
      views: 23400,
      likes: 2450,
      bookmarks: 1876,
      shares: 1456,
      
      author: 'Jessamyn Stanley',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop',
      authorRole: 'Yoga Teacher & Entrepreneur',
      authorBio: 'Jessamyn has built a global wellness brand and helped countless teachers start their own studios.',
      
      publishedDate: '2024-02-18',
      lastUpdated: '2024-03-10',
      
      tags: ['yoga', 'wellness', 'fitness', 'meditation', 'health'],
      language: 'English',
      pages: 158,
      
      featured: true,
      popular: false,
      trending: true,
      
      coverImage: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1200&h=600&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=400&h=200&fit=crop',
      icon: '🧘',
      
      color: 'from-purple-600 to-indigo-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      
      includes: [
        '158-page comprehensive guide',
        'Studio layout templates',
        'Membership pricing calculator',
        'Teacher agreement templates',
        'Class schedule planner',
        'Marketing templates',
        'Retreat planning guide'
      ],
      
      learningObjectives: [
        'Choose the right studio location',
        'Design an inviting space',
        'Price memberships profitably',
        'Hire and train teachers',
        'Build studio community',
        'Plan workshops and events',
        'Add online offerings'
      ],
      
      tableOfContents: [
        { chapter: 1, title: 'The Wellness Industry', pages: '8-20' },
        { chapter: 2, title: 'Finding Your Studio Space', pages: '21-35' },
        { chapter: 3, title: 'Studio Design & Atmosphere', pages: '36-50' },
        { chapter: 4, title: 'Equipment & Props', pages: '51-60' },
        { chapter: 5, title: 'Class Scheduling', pages: '61-75' },
        { chapter: 6, title: 'Pricing & Memberships', pages: '76-90' },
        { chapter: 7, title: 'Hiring Teachers', pages: '91-105' },
        { chapter: 8, title: 'Marketing Your Studio', pages: '106-120' },
        { chapter: 9, title: 'Workshops & Events', pages: '121-135' },
        { chapter: 10, title: 'Retreats & Online', pages: '136-158' }
      ],
      
      relatedIds: [1, 2, 4, 7]
    },

    // 🎨 GRAPHIC DESIGN AGENCY GUIDE
    {
      id: 9,
      title: 'Design & Scale: Building a Graphic Design Agency',
      subtitle: 'From Freelancer to Creative Director',
      description: 'Complete guide to starting and growing a successful graphic design agency.',
      longDescription: `Your design skills got you clients, but building an agency requires business skills. This guide helps creative freelancers build scalable design businesses.

      **Service offerings:**
      - Branding and identity
      - Web and UI design
      - Print and packaging
      - Marketing collateral
      - Social media graphics
      - Motion graphics
      - Creative direction
      
      **Business systems:**
      - Finding quality clients
      - Creative briefs that work
      - Pricing and proposals
      - Managing creative teams
      - Client feedback cycles
      - Quality control
      - Recurring retainers
      
      **Interviews with agency founders who've built award-winning creative firms.**`,
      
      category: 'guides',
      type: 'PDF Guide',
      format: 'PDF',
      readTime: '50 min',
      rating: 4.8,
      level: 'Intermediate',
      difficulty: 'Intermediate',
      downloads: 10230,
      views: 26700,
      likes: 2340,
      bookmarks: 1789,
      shares: 1456,
      
      author: 'Debbie Millman',
      authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop',
      authorRole: 'Design Leader & Educator',
      authorBio: 'Debbie has led design at major brands and helped countless designers build successful agencies.',
      
      publishedDate: '2024-02-12',
      lastUpdated: '2024-03-07',
      
      tags: ['design', 'graphic design', 'agency', 'creative', 'freelance'],
      language: 'English',
      pages: 165,
      
      featured: false,
      popular: true,
      trending: false,
      
      coverImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=600&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=200&fit=crop',
      icon: '🎨',
      
      color: 'from-pink-600 to-purple-600',
      bgColor: 'bg-pink-50',
      textColor: 'text-pink-600',
      
      includes: [
        '165-page comprehensive guide',
        'Creative brief templates',
        'Pricing calculator',
        'Proposal templates',
        'Client feedback forms',
        'Quality control checklists',
        'Retainer agreement templates'
      ],
      
      learningObjectives: [
        'Find and attract quality clients',
        'Create effective creative briefs',
        'Price projects profitably',
        'Manage creative teams',
        'Handle client feedback',
        'Ensure quality deliverables',
        'Build recurring revenue'
      ],
      
      tableOfContents: [
        { chapter: 1, title: 'The Design Industry', pages: '8-20' },
        { chapter: 2, title: 'Defining Your Services', pages: '21-35' },
        { chapter: 3, title: 'Finding Clients', pages: '36-50' },
        { chapter: 4, title: 'Creative Briefs', pages: '51-65' },
        { chapter: 5, title: 'Pricing & Proposals', pages: '66-80' },
        { chapter: 6, title: 'Managing Creative Teams', pages: '81-100' },
        { chapter: 7, title: 'Client Feedback Cycles', pages: '101-115' },
        { chapter: 8, title: 'Quality Control', pages: '116-130' },
        { chapter: 9, title: 'Recurring Retainers', pages: '131-145' },
        { chapter: 10, title: 'Scaling Your Agency', pages: '146-165' }
      ],
      
      relatedIds: [1, 6, 8, 9]
    },

    // 🏠 HOME RENOVATION CONTRACTOR GUIDE
    {
      id: 10,
      title: 'Contractor to CEO: Building a Renovation Business',
      subtitle: 'From Skilled Tradesperson to Business Owner',
      description: 'Complete guide to starting and scaling a home renovation and contracting business.',
      longDescription: `You're great at the work, but running the business is a different skill entirely. This guide helps skilled tradespeople build real businesses that aren't dependent on their own labor.

      **Master the business side:**
      - Estimating and bidding accurately
      - Managing cash flow through projects
      - Hiring and training crews
      - Scheduling for efficiency
      - Managing client expectations
      - Handling permits and inspections
      - Building a reliable subcontractor network
      
      **Growth strategies:**
      - Specializing for higher margins
      - Adding design services
      - Building a referral network
      - Digital marketing for contractors
      - Showroom strategies
      - Multi-crew operations
      
      **Real stories from contractors who built million-dollar renovation companies.**`,
      
      category: 'guides',
      type: 'PDF Guide',
      format: 'PDF',
      readTime: '65 min',
      rating: 4.8,
      level: 'Intermediate',
      difficulty: 'Intermediate',
      downloads: 11230,
      views: 28700,
      likes: 2450,
      bookmarks: 1890,
      shares: 1456,
      
      author: 'Mike Holmes',
      authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
      authorRole: 'Contractor & TV Host',
      authorBio: 'Mike has been in construction for over 40 years and has helped thousands of contractors build successful businesses.',
      
      publishedDate: '2024-01-18',
      lastUpdated: '2024-02-25',
      
      tags: ['contractor', 'construction', 'renovation', 'home improvement', 'trades'],
      language: 'English',
      pages: 188,
      
      featured: false,
      popular: true,
      trending: false,
      
      coverImage: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=1200&h=600&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=400&h=200&fit=crop',
      icon: '🔨',
      
      color: 'from-orange-600 to-amber-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
      
      includes: [
        '188-page comprehensive guide',
        'Estimating spreadsheet templates',
        'Contract templates',
        'Subcontractor agreements',
        'Project management checklists',
        'Marketing plan templates',
        'Cash flow worksheets'
      ],
      
      learningObjectives: [
        'Estimate projects accurately',
        'Manage project cash flow',
        'Hire and train reliable crews',
        'Schedule for maximum efficiency',
        'Manage client expectations',
        'Build subcontractor networks',
        'Scale to multi-crew operations'
      ],
      
      tableOfContents: [
        { chapter: 1, title: 'From Tradesperson to Business Owner', pages: '10-25' },
        { chapter: 2, title: 'Estimating & Bidding', pages: '26-45' },
        { chapter: 3, title: 'Contracts & Legal', pages: '46-60' },
        { chapter: 4, title: 'Cash Flow Management', pages: '61-80' },
        { chapter: 5, title: 'Hiring & Training', pages: '81-100' },
        { chapter: 6, title: 'Project Scheduling', pages: '101-120' },
        { chapter: 7, title: 'Subcontractor Management', pages: '121-135' },
        { chapter: 8, title: 'Client Management', pages: '136-150' },
        { chapter: 9, title: 'Marketing for Contractors', pages: '151-165' },
        { chapter: 10, title: 'Growth & Expansion', pages: '166-188' }
      ],
      
      relatedIds: [1, 3, 5, 7]
    },

    // 🐶 PET BUSINESS GUIDE
    {
      id: 11,
      title: 'Paws & Profit: Starting a Pet Business',
      subtitle: 'Dog Walking, Grooming, Boarding & More',
      description: 'Complete guide to starting and growing a successful pet services business.',
      longDescription: `Americans spend over $100 billion annually on their pets. This guide shows you how to capture a piece of this booming market with a pet business you'll love.

      **Service opportunities:**
      - Dog walking and pet sitting
      - Professional grooming
      - Pet boarding and daycare
      - Training and behavior
      - Pet photography
      - Mobile pet services
      - Pet product retail
      
      **Business systems:**
      - Licensing and insurance
      - Pricing your services
      - Scheduling and routing
      - Client communication
      - Handling difficult pets
      - Building a team
      - Expanding services
      
      **Success stories from pet entrepreneurs who turned their passion into profit.**`,
      
      category: 'guides',
      type: 'PDF Guide',
      format: 'PDF',
      readTime: '45 min',
      rating: 4.7,
      level: 'Beginner',
      difficulty: 'Beginner',
      downloads: 14560,
      views: 32400,
      likes: 3120,
      bookmarks: 2345,
      shares: 1876,
      
      author: 'Cesar Millan',
      authorAvatar: 'https://images.unsplash.com/photo-1531427186627-0fd5d0acc1d3d?w=200&h=200&fit=crop',
      authorRole: 'Dog Behavior Expert',
      authorBio: 'Cesar has helped millions of dogs and their owners and built a global pet business empire.',
      
      publishedDate: '2024-02-08',
      lastUpdated: '2024-03-05',
      
      tags: ['pet business', 'dogs', 'grooming', 'pet sitting', 'animal services'],
      language: 'English',
      pages: 142,
      
      featured: true,
      popular: true,
      trending: true,
      
      coverImage: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1200&h=600&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=200&fit=crop',
      icon: '🐕',
      
      color: 'from-amber-600 to-yellow-600',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-600',
      
      includes: [
        '142-page comprehensive guide',
        'Business plan templates',
        'Pricing calculator',
        'Client intake forms',
        'Service agreements',
        'Safety protocols',
        'Marketing templates'
      ],
      
      learningObjectives: [
        'Choose the right pet business model',
        'Handle licensing and insurance',
        'Price services profitably',
        'Schedule services efficiently',
        'Communicate with clients',
        'Handle difficult situations',
        'Build and train a team'
      ],
      
      tableOfContents: [
        { chapter: 1, title: 'The Pet Industry Opportunity', pages: '8-20' },
        { chapter: 2, title: 'Choosing Your Pet Business', pages: '21-35' },
        { chapter: 3, title: 'Licensing & Insurance', pages: '36-45' },
        { chapter: 4, title: 'Pricing Your Services', pages: '46-55' },
        { chapter: 5, title: 'Scheduling & Routing', pages: '56-70' },
        { chapter: 6, title: 'Client Communication', pages: '71-85' },
        { chapter: 7, title: 'Safety & Emergencies', pages: '86-100' },
        { chapter: 8, title: 'Building Your Team', pages: '101-115' },
        { chapter: 9, title: 'Marketing Your Business', pages: '116-130' },
        { chapter: 10, title: 'Growth & Expansion', pages: '131-142' }
      ],
      
      relatedIds: [1, 2, 5, 7]
    }
  ];

  // Categories with icons - updated colors
  const categories = [
    { id: 'all', name: 'All Resources', icon: Layers, count: allGuides.length, color: 'blue' },
    { id: 'guides', name: 'Guides', icon: FileText, count: allGuides.filter(g => g.category === 'guides').length, color: 'blue' },
    { id: 'videos', name: 'Videos', icon: Video, count: allGuides.filter(g => g.category === 'videos').length, color: 'indigo' },
    { id: 'templates', name: 'Templates', icon: FileSpreadsheet, count: allGuides.filter(g => g.category === 'templates').length, color: 'navy' }
  ];

  const allTags = [...new Set(allGuides.flatMap(g => g.tags))].sort();

  // Filter guides
  const filteredGuides = allGuides.filter(guide => {
    const matchesSearch = searchTerm === '' || 
      guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guide.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guide.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || guide.category === selectedCategory;
    const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => guide.tags.includes(tag));
    const matchesDifficulty = difficulty === 'all' || guide.difficulty === difficulty;
    const matchesRating = guide.rating >= minRating;
    
    return matchesSearch && matchesCategory && matchesTags && matchesDifficulty && matchesRating;
  });

  // Sort guides
  const sortedGuides = [...filteredGuides].sort((a, b) => {
    switch(sortBy) {
      case 'popular': return (b.views || 0) - (a.views || 0);
      case 'rating': return b.rating - a.rating;
      case 'newest': return new Date(b.publishedDate) - new Date(a.publishedDate);
      case 'downloads': return (b.downloads || 0) - (a.downloads || 0);
      case 'title': return a.title.localeCompare(b.title);
      default: return 0;
    }
  });

  // Pagination
  const itemsPerPage = 9;
  const paginatedGuides = sortedGuides.slice(0, page * itemsPerPage);
  const hasMoreItems = paginatedGuides.length < sortedGuides.length;

  // Infinite scroll observer
  useEffect(() => {
    if (isLoading) return;
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMoreItems) {
        setPage(prev => prev + 1);
      }
    });

    if (lastItemRef.current) {
      observerRef.current.observe(lastItemRef.current);
    }

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [isLoading, hasMoreItems, paginatedGuides.length]);

  const handleViewGuide = (guide) => {
    addToRecentlyViewed(guide);
    navigate(`/guides/${guide.id}`);
  };

  const handleQuickView = (guide, e) => {
    e.stopPropagation();
    setShowQuickView(guide);
  };

  const handleWishlist = (guide, e) => {
    e.stopPropagation();
    if (wishlist.includes(guide.id)) {
      setWishlist(wishlist.filter(id => id !== guide.id));
      toast.success(`Removed from reading list`, {
        icon: '📚',
        style: { background: '#f3f4f6', color: '#1f2937' }
      });
    } else {
      setWishlist([...wishlist, guide.id]);
      toast.success(`Added to reading list`, {
        icon: '📖',
        style: { background: '#f3f4f6', color: '#1f2937' }
      });
    }
  };

  const handleBookmark = (guide, e) => {
    e.stopPropagation();
    toggleBookmark(guide);
    toast.success(isBookmarked(guide.id) ? 'Bookmark removed' : 'Guide bookmarked', {
      icon: isBookmarked(guide.id) ? '🔖' : '📌',
      duration: 2000
    });
  };

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedTags([]);
    setDifficulty('all');
    setMinRating(0);
    setSortBy('popular');
    toast.success('Filters cleared', { icon: '✨' });
  };

  const loadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setPage(prev => prev + 1);
      setIsLoading(false);
    }, 800);
  };

  const getCategoryColor = (category) => {
    const colors = {
      'guides': 'from-blue-600 to-blue-800',
      'videos': 'from-indigo-600 to-indigo-800',
      'templates': 'from-gray-700 to-gray-900'
    };
    return colors[category] || 'from-blue-600 to-gray-800';
  };

  const getCategoryBadgeColor = (category) => {
    const colors = {
      'guides': 'bg-blue-50 text-blue-700 border-blue-200',
      'videos': 'bg-indigo-50 text-indigo-700 border-indigo-200',
      'templates': 'bg-gray-100 text-gray-700 border-gray-200'
    };
    return colors[category] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const GuideCard = ({ guide }) => {
    const categoryColor = getCategoryColor(guide.category);
    const badgeColor = getCategoryBadgeColor(guide.category);
    const bookmarked = isBookmarked(guide.id);

    return (
      <div
        ref={lastItemRef}
        className="group relative bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover-lift stagger-item border border-gray-100"
        onClick={() => handleViewGuide(guide)}
      >
        {/* Featured/Trending badges */}
        <div className="absolute top-3 left-3 z-10 flex gap-1.5">
          {guide.featured && (
            <span className="px-2 py-0.5 bg-blue-600 text-white text-xs font-medium rounded flex items-center gap-1 shadow-sm">
              <Sparkles size={10} />
              Featured
            </span>
          )}
          {guide.trending && (
            <span className="px-2 py-0.5 bg-orange-600 text-white text-xs font-medium rounded flex items-center gap-1 shadow-sm">
              <TrendingUp size={10} />
              Trending
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="absolute top-3 right-3 z-10 flex gap-1.5">
          <button
            onClick={(e) => handleBookmark(guide, e)}
            className="p-1.5 bg-white/90 backdrop-blur-sm rounded-md shadow-sm hover:bg-gray-50 transition-colors"
          >
            <Bookmark 
              size={14} 
              className={bookmarked ? 'text-blue-600 fill-current' : 'text-gray-500'} 
            />
          </button>
          <button
            onClick={(e) => handleWishlist(guide, e)}
            className="p-1.5 bg-white/90 backdrop-blur-sm rounded-md shadow-sm hover:bg-gray-50 transition-colors"
          >
            <Heart 
              size={14} 
              className={wishlist.includes(guide.id) ? 'text-red-500 fill-current' : 'text-gray-500'} 
            />
          </button>
        </div>

        {/* Cover image with gradient overlay */}
        <div className="relative h-40 overflow-hidden bg-gray-100">
          <img 
            src={guide.coverImage} 
            alt={guide.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${categoryColor} opacity-40`} />
          <div className="absolute bottom-2 left-2">
            <span className={`px-2 py-0.5 ${badgeColor} text-xs font-medium rounded border`}>
              {guide.type}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Author and rating */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <img 
                src={guide.authorAvatar} 
                alt={guide.author}
                className="w-5 h-5 rounded-full object-cover border border-gray-200"
              />
              <span className="text-xs text-gray-600">{guide.author}</span>
            </div>
            <div className="flex items-center gap-0.5">
              <Star size={12} className="text-yellow-500 fill-current" />
              <span className="text-xs font-medium text-gray-700">{guide.rating}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-base font-semibold text-gray-800 mb-1.5 group-hover:text-blue-600 transition-colors line-clamp-2">
            {guide.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-gray-600 mb-2 line-clamp-2">{guide.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-2">
            {guide.tags.slice(0, 2).map((tag, i) => (
              <span
                key={i}
                className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded"
              >
                #{tag}
              </span>
            ))}
            {guide.tags.length > 2 && (
              <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                +{guide.tags.length - 2}
              </span>
            )}
          </div>

          {/* Meta info */}
          <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
            <span className="flex items-center gap-0.5">
              <Clock size={10} />
              {guide.readTime || guide.duration}
            </span>
            <span className="flex items-center gap-0.5">
              <Download size={10} />
              {(guide.downloads / 1000).toFixed(1)}k
            </span>
            <span className="flex items-center gap-0.5">
              <Eye size={10} />
              {(guide.views / 1000).toFixed(1)}k
            </span>
          </div>

          {/* Difficulty badge */}
          <div className="mb-3">
            <span className={`text-xs px-2 py-0.5 rounded ${
              guide.difficulty === 'Beginner' ? 'bg-green-50 text-green-700' :
              guide.difficulty === 'Intermediate' ? 'bg-yellow-50 text-yellow-700' :
              'bg-red-50 text-red-700'
            }`}>
              {guide.difficulty}
            </span>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <button
              onClick={(e) => handleQuickView(guide, e)}
              className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
              title="Quick preview"
            >
              <Eye size={16} />
            </button>
            <button
              onClick={() => handleViewGuide(guide)}
              className={`px-3 py-1.5 bg-gradient-to-r ${categoryColor} text-white rounded text-xs font-medium hover:shadow-md transition-all flex items-center gap-1`}
            >
              Read Guide
              <ArrowRight size={12} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <style>{styles}</style>
      
      {/* Navbar */}
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
              Business Knowledge Hub
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto animate-slideUp leading-relaxed">
              Access our complete library of business guides, templates, and resources 
              to help you start, run, and scale your dream business.
            </p>

            {/* Stats with professional styling */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/10 animate-scaleIn">
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{allGuides.length}+</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Guides</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/10 animate-scaleIn" style={{animationDelay: '0.1s'}}>
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{(allGuides.reduce((acc, g) => acc + (g.downloads || 0), 0) / 1000).toFixed(1)}k+</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Downloads</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/10 animate-scaleIn" style={{animationDelay: '0.2s'}}>
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">4.8</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Avg Rating</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/10 animate-scaleIn" style={{animationDelay: '0.3s'}}>
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{allGuides.filter(g => g.featured).length}+</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Featured</div>
              </div>
            </div>
          </div>
        </div>

        {/* Simple bottom border instead of wave */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400"></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Search and Filter Bar */}
        <div className="mb-8 glass-effect rounded-2xl p-4 shadow-xl">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search guides, templates, videos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all ${
                showFilters 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <SlidersHorizontal size={20} />
              Filters
              {selectedTags.length > 0 && (
                <span className="ml-1 px-2 py-0.5 bg-white text-blue-600 rounded-full text-xs font-bold">
                  {selectedTags.length}
                </span>
              )}
            </button>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-6 py-3 bg-gray-100 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer min-w-[160px]"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest First</option>
              <option value="downloads">Most Downloaded</option>
              <option value="title">Title A-Z</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'grid' ? 'bg-white shadow-md text-blue-600' : 'text-gray-500'
                }`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'list' ? 'bg-white shadow-md text-blue-600' : 'text-gray-500'
                }`}
              >
                <List size={20} />
              </button>
            </div>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200 animate-slideDown">
              {/* Categories */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Layers size={16} />
                  Categories
                </h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                        selectedCategory === cat.id
                          ? `bg-${cat.color}-600 text-white shadow-lg shadow-${cat.color}-500/30`
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <cat.icon size={16} />
                      {cat.name}
                      <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                        selectedCategory === cat.id
                          ? 'bg-white/20 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {cat.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Tag size={16} />
                  Popular Topics
                </h3>
                <div className="flex flex-wrap gap-2">
                  {allTags.slice(0, 20).map(tag => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                        selectedTags.includes(tag)
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty & Rating */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Difficulty Level
                  </label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Levels</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Rating
                  </label>
                  <select
                    value={minRating}
                    onChange={(e) => setMinRating(Number(e.target.value))}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={0}>Any Rating</option>
                    <option value={4.5}>4.5+ Stars</option>
                    <option value={4}>4+ Stars</option>
                    <option value={3.5}>3.5+ Stars</option>
                    <option value={3}>3+ Stars</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    &nbsp;
                  </label>
                  <button
                    onClick={clearAllFilters}
                    className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <X size={16} />
                    Clear All Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Active Filters */}
        {(selectedTags.length > 0 || difficulty !== 'all' || minRating > 0 || searchTerm) && (
          <div className="mb-6 flex flex-wrap gap-2 items-center animate-slideUp">
            <span className="text-sm text-gray-500">Active filters:</span>
            {searchTerm && (
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-1">
                Search: "{searchTerm}"
                <button onClick={() => setSearchTerm('')}>
                  <X size={14} />
                </button>
              </span>
            )}
            {selectedTags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-1">
                #{tag}
                <button onClick={() => toggleTag(tag)}>
                  <X size={14} />
                </button>
              </span>
            ))}
            {difficulty !== 'all' && (
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-1">
                {difficulty}
                <button onClick={() => setDifficulty('all')}>
                  <X size={14} />
                </button>
              </span>
            )}
            {minRating > 0 && (
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-1">
                {minRating}+ Stars
                <button onClick={() => setMinRating(0)}>
                  <X size={14} />
                </button>
              </span>
            )}
          </div>
        )}

        {/* Results count */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-600">
            Showing <span className="font-semibold">{paginatedGuides.length}</span> of{' '}
            <span className="font-semibold">{filteredGuides.length}</span> resources
          </p>
          {filteredGuides.length === 0 && (
            <button
              onClick={clearAllFilters}
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
            >
              <X size={16} />
              Clear all filters
            </button>
          )}
        </div>

        {/* Grid/List View */}
        {filteredGuides.length === 0 ? (
          <div className="text-center py-20">
            <div className="mb-6 text-6xl animate-float">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No resources found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
            <button
              onClick={clearAllFilters}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
            >
              <X size={18} />
              Clear all filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedGuides.map((guide, index) => (
              <GuideCard key={guide.id} guide={guide} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {paginatedGuides.map((guide, index) => (
              <div
                key={guide.id}
                ref={index === paginatedGuides.length - 1 ? lastItemRef : null}
                className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all group stagger-item"
                onClick={() => handleViewGuide(guide)}
              >
                <div className="flex flex-col md:flex-row">
                  {/* Image */}
                  <div className="md:w-48 h-48 md:h-auto relative overflow-hidden">
                    <img 
                      src={guide.thumbnail} 
                      alt={guide.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${getCategoryColor(guide.category)} opacity-60`} />
                    <div className="absolute top-3 left-3">
                      <span className={`px-3 py-1 ${getCategoryBadgeColor(guide.category)} text-xs font-semibold rounded-full`}>
                        {guide.type}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                          {guide.title}
                        </h3>
                        <p className="text-gray-600 mb-3 line-clamp-2">{guide.description}</p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={(e) => handleBookmark(guide, e)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <Bookmark 
                            size={20} 
                            className={isBookmarked(guide.id) ? 'text-blue-600 fill-current' : 'text-gray-400'} 
                          />
                        </button>
                        <button
                          onClick={(e) => handleWishlist(guide, e)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <Heart 
                            size={20} 
                            className={wishlist.includes(guide.id) ? 'text-red-500 fill-current' : 'text-gray-400'} 
                          />
                        </button>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {guide.tags.slice(0, 5).map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Meta info */}
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {guide.readTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <Download size={14} />
                        {guide.downloads.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye size={14} />
                        {guide.views.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star size={14} className="text-yellow-400 fill-current" />
                        {guide.rating}
                      </span>
                    </div>

                    {/* Author and action */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-3">
                        <img 
                          src={guide.authorAvatar} 
                          alt={guide.author}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium text-gray-800">{guide.author}</p>
                          <p className="text-xs text-gray-500">{guide.authorRole}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleViewGuide(guide)}
                        className={`px-6 py-2 bg-gradient-to-r ${getCategoryColor(guide.category)} text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all flex items-center gap-2`}
                      >
                        Read Guide
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Loading more indicator */}
        {isLoading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
            <p className="mt-2 text-gray-600">Loading more resources...</p>
          </div>
        )}

        {/* Load more button (fallback for browsers without intersection observer) */}
        {!isLoading && hasMoreItems && (
          <div className="text-center py-8">
            <button
              onClick={loadMore}
              className="px-6 py-3 bg-white border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors inline-flex items-center gap-2"
            >
              <ChevronDown size={18} />
              Load More
            </button>
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      {showQuickView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scaleIn">
            {/* Modal header */}
            <div className="relative h-64 overflow-hidden">
              <img 
                src={showQuickView.coverImage} 
                alt={showQuickView.title}
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${getCategoryColor(showQuickView.category)} opacity-60`} />
              <button
                onClick={() => setShowQuickView(null)}
                className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur rounded-full hover:bg-white transition-colors"
              >
                <X size={20} />
              </button>
              <div className="absolute bottom-4 left-4 right-4">
                <h2 className="text-3xl font-bold text-white mb-2">{showQuickView.title}</h2>
                <p className="text-white/90 text-lg">{showQuickView.subtitle}</p>
              </div>
            </div>

            {/* Modal content */}
            <div className="p-6">
              {/* Quick stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <Clock className="w-5 h-5 mx-auto mb-1 text-gray-600" />
                  <div className="font-semibold">{showQuickView.readTime}</div>
                  <div className="text-xs text-gray-500">Read time</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <Download className="w-5 h-5 mx-auto mb-1 text-gray-600" />
                  <div className="font-semibold">{showQuickView.downloads.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">Downloads</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <Star className="w-5 h-5 mx-auto mb-1 text-yellow-400 fill-current" />
                  <div className="font-semibold">{showQuickView.rating}</div>
                  <div className="text-xs text-gray-500">Rating</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <FileText className="w-5 h-5 mx-auto mb-1 text-gray-600" />
                  <div className="font-semibold">{showQuickView.pages} pages</div>
                  <div className="text-xs text-gray-500">{showQuickView.format}</div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Overview</h3>
                <p className="text-gray-600 leading-relaxed">{showQuickView.longDescription}</p>
              </div>

              {/* What's included */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">What's Included</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {showQuickView.includes.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-gray-600">
                      <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Learning objectives */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">What You'll Learn</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {showQuickView.learningObjectives.map((objective, index) => (
                    <div key={index} className="flex items-center gap-2 text-gray-600">
                      <Lightbulb size={16} className="text-yellow-500 flex-shrink-0" />
                      <span>{objective}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Table of contents preview */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Table of Contents</h3>
                <div className="space-y-2">
                  {showQuickView.tableOfContents.slice(0, 5).map((chapter) => (
                    <div key={chapter.chapter} className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">
                        <span className="font-medium">Chapter {chapter.chapter}:</span> {chapter.title}
                      </span>
                      <span className="text-gray-400">{chapter.pages}</span>
                    </div>
                  ))}
                  {showQuickView.tableOfContents.length > 5 && (
                    <p className="text-sm text-blue-600">+ {showQuickView.tableOfContents.length - 5} more chapters</p>
                  )}
                </div>
              </div>

              {/* Author info */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl mb-6">
                <img 
                  src={showQuickView.authorAvatar} 
                  alt={showQuickView.author}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">{showQuickView.author}</h4>
                  <p className="text-sm text-gray-600 mb-1">{showQuickView.authorRole}</p>
                  <p className="text-sm text-gray-500">{showQuickView.authorBio}</p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => handleViewGuide(showQuickView)}
                  className={`flex-1 px-6 py-3 bg-gradient-to-r ${getCategoryColor(showQuickView.category)} text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2`}
                >
                  <BookOpen size={18} />
                  Read Full Guide
                </button>
                <button
                  onClick={(e) => {
                    handleBookmark(showQuickView, e);
                    setShowQuickView(null);
                  }}
                  className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <Bookmark size={18} className={isBookmarked(showQuickView.id) ? 'text-blue-600 fill-current' : 'text-gray-600'} />
                </button>
                <button className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                  <Share2 size={18} className="text-gray-600" />
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
            <h2 className="text-2xl font-bold text-white mb-2">Get Free Business Guides Weekly</h2>
            <p className="text-gray-400 text-sm mb-6">
              Subscribe to our newsletter and get a free business guide every week, plus exclusive tips and resources.
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
                <li><button onClick={() => navigate('/guides')} className="hover:text-white transition-colors">All Guides</button></li>
                <li><button onClick={() => navigate('/guides?type=videos')} className="hover:text-white transition-colors">Video Courses</button></li>
                <li><button onClick={() => navigate('/guides?type=templates')} className="hover:text-white transition-colors">Templates</button></li>
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

export default GuidesPage;