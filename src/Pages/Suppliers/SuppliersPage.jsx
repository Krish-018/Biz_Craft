// src/Pages/Suppliers/SuppliersPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useDashboard } from '../../context/DashboardContext';
import { useAccess } from '../../context/AccessContext';
import { useActivity } from '../../context/ActivityContext';
import Navbar from '../../components/Navbar/Navbar';
import { 
  Search, 
  Building2, 
  MapPin, 
  Star,
  Filter,
  Grid,
  List,
  ArrowRight,
  Truck,
  Package,
  CheckCircle,
  X,
  SlidersHorizontal,
  Sparkles,
  TrendingUp,
  Award,
  Users,
  Calendar,
  Tag,
  Layers,
  Eye,
  Globe,
  Zap,
  Clock,
  DollarSign,
  Phone,
  Mail,
  Heart,
  Bookmark,
  Share2,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Info,
  Shield,
  ThumbsUp,
  MessageCircle,
  Plus,
  Check
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

// Enhanced mock data with beautiful images - MOVED INSIDE COMPONENT
const SuppliersPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addToDashboard, isInDashboard } = useDashboard();
  const { getRemaining, trackView } = useAccess();
  const { addToRecentlyViewed, toggleBookmark, isBookmarked } = useActivity();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState('rating');
  const [selectedCountry, setSelectedCountry] = useState('all');
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

  // Enhanced mock data with beautiful images
  const allSuppliers = [
    {
      id: 1,
      name: 'ABC Corporation',
      category: 'Electronics',
      subCategory: 'Consumer Electronics',
      location: 'New York, NY',
      country: 'USA',
      rating: 4.8,
      verified: true,
      products: 245,
      image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=200&h=200&fit=crop',
      logo: 'ABC',
      description: 'Leading supplier of electronic components and devices',
      longDescription: 'ABC Corporation has been a trusted name in the electronics industry for over 20 years. We provide high-quality components for manufacturers, retailers, and hobbyists alike.',
      founded: '2005',
      employees: '50-100',
      website: 'www.abccorp.com',
      email: 'contact@abccorp.com',
      phone: '+1 (212) 555-0123',
      address: '123 Business Ave, New York, NY 10001',
      certifications: ['ISO 9001', 'RoHS Compliant', 'UL Certified'],
      paymentTerms: 'Net 30',
      minOrder: '$500',
      shipping: 'Worldwide',
      deliveryTime: '3-5 days',
      returnPolicy: '30 days',
      tags: ['electronics', 'components', 'wholesale'],
      featured: true,
      trending: true,
      verifiedBadge: true,
      yearEstablished: 2005,
      totalOrders: 15420,
      successRate: 98.5,
      responseTime: '< 2 hours',
      languages: ['English', 'Spanish', 'Mandarin'],
      reviews: [
        { user: 'John D.', rating: 5, comment: 'Excellent quality products!', date: '2024-02-15' },
        { user: 'Sarah M.', rating: 4, comment: 'Fast shipping, good communication', date: '2024-02-10' }
      ],
      coverImage: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=800&h=400&fit=crop',
      color: 'from-blue-600 to-blue-800'
    },
    {
      id: 2,
      name: 'XYZ Industries',
      category: 'Raw Materials',
      subCategory: 'Metals & Alloys',
      location: 'Los Angeles, CA',
      country: 'USA',
      rating: 4.6,
      verified: true,
      products: 189,
      image: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=200&h=200&fit=crop',
      logo: 'XYZ',
      description: 'Premium raw materials for manufacturing',
      longDescription: 'XYZ Industries specializes in high-grade raw materials for various industries including automotive, construction, and consumer goods.',
      founded: '2010',
      employees: '100-200',
      website: 'www.xyzindustries.com',
      email: 'sales@xyzindustries.com',
      phone: '+1 (213) 555-0456',
      address: '456 Market St, Los Angeles, CA 90001',
      certifications: ['ISO 14001', 'OHSAS 18001', 'REACH Compliant'],
      paymentTerms: 'Net 45',
      minOrder: '$1000',
      shipping: 'North America',
      deliveryTime: '5-7 days',
      returnPolicy: '14 days',
      tags: ['raw materials', 'metals', 'manufacturing'],
      featured: false,
      trending: true,
      verifiedBadge: true,
      yearEstablished: 2010,
      totalOrders: 8920,
      successRate: 97.2,
      responseTime: '< 4 hours',
      languages: ['English', 'Spanish'],
      reviews: [
        { user: 'Mike R.', rating: 5, comment: 'Consistent quality, reliable supplier', date: '2024-02-12' }
      ],
      coverImage: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=800&h=400&fit=crop',
      color: 'from-green-600 to-green-800'
    },
    {
      id: 3,
      name: 'Global Traders',
      category: 'Import/Export',
      subCategory: 'International Trade',
      location: 'Chicago, IL',
      country: 'USA',
      rating: 4.5,
      verified: true,
      products: 567,
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=200&h=200&fit=crop',
      logo: 'GT',
      description: 'International trading and logistics',
      longDescription: 'Global Traders connects businesses worldwide with quality products and seamless logistics solutions.',
      founded: '2008',
      employees: '200-500',
      website: 'www.globaltraders.com',
      email: 'info@globaltraders.com',
      phone: '+1 (312) 555-0789',
      address: '789 Trade Center, Chicago, IL 60007',
      certifications: ['ISO 9001', 'C-TPAT', 'AEO Certified'],
      paymentTerms: 'Net 60',
      minOrder: '$2000',
      shipping: 'Worldwide',
      deliveryTime: '7-14 days',
      returnPolicy: 'Negotiable',
      tags: ['import', 'export', 'logistics', 'trade'],
      featured: true,
      trending: false,
      verifiedBadge: true,
      yearEstablished: 2008,
      totalOrders: 23450,
      successRate: 96.8,
      responseTime: '< 6 hours',
      languages: ['English', 'Spanish', 'French', 'German', 'Chinese'],
      reviews: [
        { user: 'Anna K.', rating: 5, comment: 'Great international partner', date: '2024-02-08' },
        { user: 'Tom L.', rating: 4, comment: 'Good communication, reliable shipping', date: '2024-02-05' }
      ],
      coverImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=400&fit=crop',
      color: 'from-purple-600 to-purple-800'
    },
    {
      id: 4,
      name: 'Tech Solutions Inc',
      category: 'Technology',
      subCategory: 'IT Services',
      location: 'San Francisco, CA',
      country: 'USA',
      rating: 4.9,
      verified: true,
      products: 312,
      image: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=200&h=200&fit=crop',
      logo: 'TS',
      description: 'Innovative technology solutions',
      longDescription: 'Tech Solutions Inc provides cutting-edge technology products and IT services to businesses of all sizes.',
      founded: '2015',
      employees: '50-100',
      website: 'www.techsolutions.com',
      email: 'hello@techsolutions.com',
      phone: '+1 (415) 555-0234',
      address: '321 Innovation Dr, San Francisco, CA 94105',
      certifications: ['ISO 27001', 'SOC 2 Type II', 'GDPR Compliant'],
      paymentTerms: 'Net 30',
      minOrder: '$500',
      shipping: 'Worldwide',
      deliveryTime: '2-3 days',
      returnPolicy: '30 days',
      tags: ['technology', 'software', 'hardware', 'IT'],
      featured: true,
      trending: true,
      verifiedBadge: true,
      yearEstablished: 2015,
      totalOrders: 6780,
      successRate: 99.1,
      responseTime: '< 1 hour',
      languages: ['English'],
      reviews: [
        { user: 'David W.', rating: 5, comment: 'Amazing tech products!', date: '2024-02-14' },
        { user: 'Lisa M.', rating: 5, comment: 'Great customer support', date: '2024-02-11' }
      ],
      coverImage: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=800&h=400&fit=crop',
      color: 'from-indigo-600 to-indigo-800'
    },
    {
      id: 5,
      name: 'Quality Materials Co',
      category: 'Manufacturing',
      subCategory: 'Industrial Materials',
      location: 'Detroit, MI',
      country: 'USA',
      rating: 4.7,
      verified: false,
      products: 156,
      image: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=200&h=200&fit=crop',
      logo: 'QM',
      description: 'High-quality manufacturing materials',
      longDescription: 'Quality Materials Co supplies premium materials to manufacturers across North America.',
      founded: '2012',
      employees: '20-50',
      website: 'www.qualitymaterials.com',
      email: 'orders@qualitymaterials.com',
      phone: '+1 (313) 555-0678',
      address: '567 Industrial Pkwy, Detroit, MI 48201',
      certifications: ['ISO 9001'],
      paymentTerms: 'Net 30',
      minOrder: '$250',
      shipping: 'USA & Canada',
      deliveryTime: '3-5 days',
      returnPolicy: '14 days',
      tags: ['manufacturing', 'industrial', 'materials'],
      featured: false,
      trending: false,
      verifiedBadge: false,
      yearEstablished: 2012,
      totalOrders: 3450,
      successRate: 95.3,
      responseTime: '< 8 hours',
      languages: ['English'],
      reviews: [],
      coverImage: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=800&h=400&fit=crop',
      color: 'from-orange-600 to-orange-800'
    },
    {
      id: 6,
      name: 'Fast Shipping Co',
      category: 'Logistics',
      subCategory: 'Freight & Shipping',
      location: 'Miami, FL',
      country: 'USA',
      rating: 4.4,
      verified: true,
      products: 78,
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=200&h=200&fit=crop',
      logo: 'FS',
      description: 'Fast and reliable shipping services',
      longDescription: 'Fast Shipping Co offers comprehensive logistics solutions including freight, warehousing, and last-mile delivery.',
      founded: '2018',
      employees: '100-200',
      website: 'www.fastshipping.com',
      email: 'info@fastshipping.com',
      phone: '+1 (305) 555-0890',
      address: '890 Transport Way, Miami, FL 33101',
      certifications: ['DOT Certified', 'FMCSA Registered'],
      paymentTerms: 'Net 15',
      minOrder: '$100',
      shipping: 'USA, Canada, Mexico',
      deliveryTime: '1-3 days',
      returnPolicy: 'N/A',
      tags: ['logistics', 'shipping', 'freight', 'delivery'],
      featured: false,
      trending: true,
      verifiedBadge: true,
      yearEstablished: 2018,
      totalOrders: 12450,
      successRate: 97.8,
      responseTime: '< 30 minutes',
      languages: ['English', 'Spanish'],
      reviews: [
        { user: 'Carlos R.', rating: 5, comment: 'Fastest shipping ever!', date: '2024-02-13' }
      ],
      coverImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=400&fit=crop',
      color: 'from-yellow-600 to-yellow-800'
    },
    {
      id: 7,
      name: 'Green Energy Supplies',
      category: 'Renewable Energy',
      subCategory: 'Solar & Wind',
      location: 'Denver, CO',
      country: 'USA',
      rating: 4.8,
      verified: true,
      products: 134,
      image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=200&h=200&fit=crop',
      logo: 'GE',
      description: 'Solar panels and renewable energy equipment',
      longDescription: 'Green Energy Supplies is your one-stop shop for solar panels, wind turbines, and renewable energy solutions.',
      founded: '2016',
      employees: '20-50',
      website: 'www.greenenergy.com',
      email: 'sales@greenenergy.com',
      phone: '+1 (303) 555-0456',
      address: '123 Solar Way, Denver, CO 80201',
      certifications: ['NABCEP Certified', 'UL Listed', 'Energy Star Partner'],
      paymentTerms: 'Net 30',
      minOrder: '$1000',
      shipping: 'Worldwide',
      deliveryTime: '5-10 days',
      returnPolicy: '30 days',
      tags: ['solar', 'renewable', 'green energy', 'sustainable'],
      featured: true,
      trending: true,
      verifiedBadge: true,
      yearEstablished: 2016,
      totalOrders: 5670,
      successRate: 98.2,
      responseTime: '< 3 hours',
      languages: ['English', 'Spanish'],
      reviews: [
        { user: 'Emma S.', rating: 5, comment: 'Excellent solar panels!', date: '2024-02-09' }
      ],
      coverImage: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=800&h=400&fit=crop',
      color: 'from-emerald-600 to-emerald-800'
    },
    {
      id: 8,
      name: 'Office Depot Pro',
      category: 'Office Supplies',
      subCategory: 'Business Supplies',
      location: 'Dallas, TX',
      country: 'USA',
      rating: 4.5,
      verified: true,
      products: 892,
      image: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=200&h=200&fit=crop',
      logo: 'OD',
      description: 'Complete office supplies and furniture',
      longDescription: 'Office Depot Pro provides everything your office needs - from paper clips to executive desks.',
      founded: '2000',
      employees: '500+',
      website: 'www.officedepotpro.com',
      email: 'business@officedepotpro.com',
      phone: '+1 (214) 555-0789',
      address: '456 Commerce Blvd, Dallas, TX 75201',
      certifications: ['ISO 9001', 'Green Business Certified'],
      paymentTerms: 'Net 15',
      minOrder: '$50',
      shipping: 'USA & Canada',
      deliveryTime: '2-4 days',
      returnPolicy: '60 days',
      tags: ['office supplies', 'furniture', 'stationery', 'business'],
      featured: false,
      trending: false,
      verifiedBadge: true,
      yearEstablished: 2000,
      totalOrders: 45670,
      successRate: 96.5,
      responseTime: '< 2 hours',
      languages: ['English', 'Spanish'],
      reviews: [
        { user: 'Nancy P.', rating: 4, comment: 'Good selection, fast shipping', date: '2024-02-07' }
      ],
      coverImage: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=800&h=400&fit=crop',
      color: 'from-pink-600 to-pink-800'
    },
    {
      id: 9,
      name: 'Industrial Parts Co',
      category: 'Industrial',
      subCategory: 'Machinery Parts',
      location: 'Houston, TX',
      country: 'USA',
      rating: 4.6,
      verified: false,
      products: 423,
      image: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=200&h=200&fit=crop',
      logo: 'IP',
      description: 'Industrial machinery and parts',
      longDescription: 'Industrial Parts Co supplies replacement parts and components for industrial machinery.',
      founded: '2011',
      employees: '20-50',
      website: 'www.industrialparts.com',
      email: 'parts@industrialparts.com',
      phone: '+1 (713) 555-0123',
      address: '789 Industry Rd, Houston, TX 77001',
      certifications: [],
      paymentTerms: 'Net 30',
      minOrder: '$100',
      shipping: 'USA',
      deliveryTime: '3-7 days',
      returnPolicy: '30 days',
      tags: ['industrial', 'machinery', 'parts', 'equipment'],
      featured: false,
      trending: false,
      verifiedBadge: false,
      yearEstablished: 2011,
      totalOrders: 2340,
      successRate: 94.1,
      responseTime: '< 12 hours',
      languages: ['English'],
      reviews: [],
      coverImage: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=800&h=400&fit=crop',
      color: 'from-red-600 to-red-800'
    }
  ];

  // Categories with icons
  const categories = [
    { id: 'all', name: 'All Suppliers', icon: Building2, count: allSuppliers.length, color: 'blue' },
    { id: 'Electronics', name: 'Electronics', icon: Zap, count: allSuppliers.filter(s => s.category === 'Electronics').length, color: 'blue' },
    { id: 'Raw Materials', name: 'Raw Materials', icon: Package, count: allSuppliers.filter(s => s.category === 'Raw Materials').length, color: 'green' },
    { id: 'Import/Export', name: 'Import/Export', icon: Globe, count: allSuppliers.filter(s => s.category === 'Import/Export').length, color: 'purple' },
    { id: 'Technology', name: 'Technology', icon: Shield, count: allSuppliers.filter(s => s.category === 'Technology').length, color: 'indigo' },
    { id: 'Manufacturing', name: 'Manufacturing', icon: Building2, count: allSuppliers.filter(s => s.category === 'Manufacturing').length, color: 'orange' },
    { id: 'Logistics', name: 'Logistics', icon: Truck, count: allSuppliers.filter(s => s.category === 'Logistics').length, color: 'yellow' },
    { id: 'Renewable Energy', name: 'Renewable Energy', icon: Zap, count: allSuppliers.filter(s => s.category === 'Renewable Energy').length, color: 'emerald' },
  ];

  // Filter suppliers
  const filteredSuppliers = allSuppliers.filter(supplier => {
    const matchesSearch = searchTerm === '' || 
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || supplier.category === selectedCategory;
    const matchesVerified = showVerifiedOnly ? supplier.verified : true;
    const matchesRating = supplier.rating >= minRating;
    
    return matchesSearch && matchesCategory && matchesVerified && matchesRating;
  });

  // Sort suppliers
  const sortedSuppliers = [...filteredSuppliers].sort((a, b) => {
    switch(sortBy) {
      case 'rating': return b.rating - a.rating;
      case 'name': return a.name.localeCompare(b.name);
      case 'products': return b.products - a.products;
      case 'orders': return b.totalOrders - a.totalOrders;
      case 'success': return b.successRate - a.successRate;
      default: return 0;
    }
  });

  // Pagination
  const itemsPerPage = 9;
  const paginatedSuppliers = sortedSuppliers.slice(0, page * itemsPerPage);
  const hasMoreItems = paginatedSuppliers.length < sortedSuppliers.length;

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
  }, [isLoading, hasMoreItems, paginatedSuppliers.length]);

  const handleViewSupplier = (supplier) => {
    addToRecentlyViewed({
      id: supplier.id,
      type: 'supplier',
      name: supplier.name,
      image: supplier.image,
      path: `/suppliers/${supplier.id}`
    });
    navigate(`/suppliers/${supplier.id}`);
  };

  const handleQuickView = (supplier, e) => {
    e.stopPropagation();
    setShowQuickView(supplier);
  };

  const handleWishlist = (supplier, e) => {
    e.stopPropagation();
    if (wishlist.includes(supplier.id)) {
      setWishlist(wishlist.filter(id => id !== supplier.id));
      toast.success(`Removed from wishlist`, {
        icon: '💔',
        style: { background: '#f3f4f6', color: '#1f2937' }
      });
    } else {
      setWishlist([...wishlist, supplier.id]);
      toast.success(`Added to wishlist`, {
        icon: '💖',
        style: { background: '#f3f4f6', color: '#1f2937' }
      });
    }
  };

  const handleBookmark = (supplier, e) => {
    e.stopPropagation();
    toggleBookmark({
      id: supplier.id,
      type: 'supplier',
      name: supplier.name,
      image: supplier.image,
      path: `/suppliers/${supplier.id}`
    });
    toast.success(isBookmarked(supplier.id) ? 'Bookmark removed' : 'Bookmark added', {
      icon: isBookmarked(supplier.id) ? '🔖' : '📌',
      duration: 2000
    });
  };

  const handleAddToDashboard = (supplier, e) => {
    e.stopPropagation();
    
    if (!isAuthenticated) {
      toast((t) => (
        <div className="flex flex-col gap-2">
          <p className="font-medium">Login to add to dashboard</p>
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

    addToDashboard('suppliers', {
      id: supplier.id,
      name: supplier.name,
      image: supplier.image,
      category: supplier.category,
      location: supplier.location,
      rating: supplier.rating,
      verified: supplier.verified
    });
  };

  const handleShare = (supplier, e) => {
    e.stopPropagation();
    // Share functionality
    navigator.clipboard.writeText(`${window.location.origin}/suppliers/${supplier.id}`);
    toast.success('Link copied to clipboard!');
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setShowVerifiedOnly(false);
    setMinRating(0);
    setSortBy('rating');
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
      'Electronics': 'from-blue-600 to-blue-800',
      'Raw Materials': 'from-green-600 to-green-800',
      'Import/Export': 'from-purple-600 to-purple-800',
      'Technology': 'from-indigo-600 to-indigo-800',
      'Manufacturing': 'from-orange-600 to-orange-800',
      'Logistics': 'from-yellow-600 to-yellow-800',
      'Renewable Energy': 'from-emerald-600 to-emerald-800',
      'Office Supplies': 'from-pink-600 to-pink-800',
      'Industrial': 'from-red-600 to-red-800'
    };
    return colors[category] || 'from-blue-600 to-gray-800';
  };

  const getCategoryBadgeColor = (category) => {
    const colors = {
      'Electronics': 'bg-blue-50 text-blue-700 border-blue-200',
      'Raw Materials': 'bg-green-50 text-green-700 border-green-200',
      'Import/Export': 'bg-purple-50 text-purple-700 border-purple-200',
      'Technology': 'bg-indigo-50 text-indigo-700 border-indigo-200',
      'Manufacturing': 'bg-orange-50 text-orange-700 border-orange-200',
      'Logistics': 'bg-yellow-50 text-yellow-700 border-yellow-200',
      'Renewable Energy': 'bg-emerald-50 text-emerald-700 border-emerald-200',
      'Office Supplies': 'bg-pink-50 text-pink-700 border-pink-200',
      'Industrial': 'bg-red-50 text-red-700 border-red-200'
    };
    return colors[category] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const SupplierCard = ({ supplier }) => {
    const categoryColor = getCategoryColor(supplier.category);
    const badgeColor = getCategoryBadgeColor(supplier.category);
    const bookmarked = isBookmarked(supplier.id);
    const inDashboard = isInDashboard('suppliers', supplier.id);

    return (
      <div
        ref={lastItemRef}
        className="group relative bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover-lift stagger-item border border-gray-100"
        onClick={() => handleViewSupplier(supplier)}
      >
        {/* Featured/Trending badges */}
        <div className="absolute top-3 left-3 z-10 flex gap-1.5">
          {supplier.featured && (
            <span className="px-2 py-0.5 bg-blue-600 text-white text-xs font-medium rounded flex items-center gap-1 shadow-sm">
              <Sparkles size={10} />
              Featured
            </span>
          )}
          {supplier.trending && (
            <span className="px-2 py-0.5 bg-orange-600 text-white text-xs font-medium rounded flex items-center gap-1 shadow-sm">
              <TrendingUp size={10} />
              Trending
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="absolute top-3 right-3 z-10 flex gap-1.5">
          <button
            onClick={(e) => handleAddToDashboard(supplier, e)}
            disabled={inDashboard}
            className={`p-1.5 bg-white/90 backdrop-blur-sm rounded-md shadow-sm hover:bg-gray-50 transition-colors ${
              inDashboard ? 'text-green-600 cursor-default' : 'text-gray-500 hover:text-blue-600'
            }`}
            title={inDashboard ? 'Already in dashboard' : 'Add to dashboard'}
          >
            {inDashboard ? <Check size={14} /> : <Plus size={14} />}
          </button>
          <button
            onClick={(e) => handleBookmark(supplier, e)}
            className="p-1.5 bg-white/90 backdrop-blur-sm rounded-md shadow-sm hover:bg-gray-50 transition-colors"
          >
            <Bookmark 
              size={14} 
              className={bookmarked ? 'text-blue-600 fill-current' : 'text-gray-500'} 
            />
          </button>
          <button
            onClick={(e) => handleWishlist(supplier, e)}
            className="p-1.5 bg-white/90 backdrop-blur-sm rounded-md shadow-sm hover:bg-gray-50 transition-colors"
          >
            <Heart 
              size={14} 
              className={wishlist.includes(supplier.id) ? 'text-red-500 fill-current' : 'text-gray-500'} 
            />
          </button>
        </div>

        {/* Cover image with gradient overlay */}
        <div className="relative h-32 overflow-hidden bg-gray-100">
          <img 
            src={supplier.coverImage} 
            alt={supplier.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${categoryColor} opacity-60`} />
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Logo and name */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-lg bg-white shadow-md p-1 -mt-8 relative z-10 border border-gray-200">
              <img 
                src={supplier.image} 
                alt={supplier.name}
                className="w-full h-full rounded-md object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-800 truncate">{supplier.name}</h3>
              <p className="text-xs text-gray-500">{supplier.category}</p>
            </div>
          </div>

          {/* Verified badge and rating */}
          <div className="flex items-center justify-between mb-2">
            {supplier.verified ? (
              <span className="px-2 py-0.5 bg-green-50 text-green-700 text-xs rounded-full flex items-center gap-1 border border-green-200">
                <CheckCircle size={10} className="fill-current" />
                Verified
              </span>
            ) : (
              <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-full">
                Unverified
              </span>
            )}
            <div className="flex items-center gap-0.5">
              <Star size={12} className="text-yellow-500 fill-current" />
              <span className="text-xs font-medium text-gray-700">{supplier.rating}</span>
              <span className="text-xs text-gray-400">({supplier.reviews.length})</span>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
            <MapPin size={10} />
            <span>{supplier.location}</span>
          </div>

          {/* Description */}
          <p className="text-xs text-gray-600 mb-3 line-clamp-2">{supplier.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-3">
            {supplier.tags.slice(0, 2).map((tag, i) => (
              <span
                key={i}
                className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded"
              >
                #{tag}
              </span>
            ))}
            {supplier.tags.length > 2 && (
              <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                +{supplier.tags.length - 2}
              </span>
            )}
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-3 gap-1 mb-3">
            <div className="text-center p-1.5 bg-gray-50 rounded">
              <Package size={12} className="mx-auto mb-0.5 text-gray-400" />
              <p className="text-xs font-medium text-gray-700">{supplier.products}</p>
              <p className="text-[10px] text-gray-500">Products</p>
            </div>
            <div className="text-center p-1.5 bg-gray-50 rounded">
              <Clock size={12} className="mx-auto mb-0.5 text-gray-400" />
              <p className="text-xs font-medium text-gray-700">{supplier.deliveryTime}</p>
              <p className="text-[10px] text-gray-500">Delivery</p>
            </div>
            <div className="text-center p-1.5 bg-gray-50 rounded">
              <TrendingUp size={12} className="mx-auto mb-0.5 text-gray-400" />
              <p className="text-xs font-medium text-gray-700">{supplier.successRate}%</p>
              <p className="text-[10px] text-gray-500">Success</p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <button
              onClick={(e) => handleQuickView(supplier, e)}
              className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
              title="Quick view"
            >
              <Eye size={16} />
            </button>
            <button
              onClick={() => handleViewSupplier(supplier)}
              className={`px-3 py-1.5 bg-gradient-to-r ${categoryColor} text-white rounded text-xs font-medium hover:shadow-md transition-all flex items-center gap-1`}
            >
              View Details
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
              Find Your Perfect
              <span className="block text-blue-300">Business Partner</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto animate-slideUp leading-relaxed">
              Connect with thousands of verified suppliers from around the world. Quality assured, trust guaranteed.
            </p>

            {/* Stats with professional styling */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/10 animate-scaleIn">
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">9,000+</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Suppliers</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/10 animate-scaleIn" style={{animationDelay: '0.1s'}}>
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">50+</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Countries</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/10 animate-scaleIn" style={{animationDelay: '0.2s'}}>
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">100K+</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Products</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/10 animate-scaleIn" style={{animationDelay: '0.3s'}}>
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">98%</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Success Rate</div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mt-12 relative animate-scaleIn" style={{ animationDelay: '0.4s' }}>
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search by supplier name, category, or product..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <button
                  onClick={() => setShowFilters(!showFilters)}
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
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => {
                setSelectedCategory(category.id);
                setActiveFilter(category.id);
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                selectedCategory === category.id
                  ? `bg-blue-600 text-white shadow-lg`
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm border border-gray-200'
              }`}
              style={{ animationDelay: `${0.1 + index * 0.05}s` }}
            >
              <category.icon size={16} />
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

        {/* Filters Panel */}
        {showFilters && (
          <div className="mb-8 animate-slideDown">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <Filter size={18} />
                  Advanced Filters
                </h3>
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <X size={14} />
                  Clear all
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Sort By */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-2">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    <option value="rating">Highest Rated</option>
                    <option value="name">Name A-Z</option>
                    <option value="products">Most Products</option>
                    <option value="orders">Most Orders</option>
                    <option value="success">Success Rate</option>
                  </select>
                </div>

                {/* Country Filter */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-2">Country</label>
                  <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    <option value="all">All Countries</option>
                    <option value="USA">USA</option>
                    <option value="China">China</option>
                    <option value="India">India</option>
                    <option value="Germany">Germany</option>
                  </select>
                </div>

                {/* Rating Filter */}
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

                {/* Verified Toggle */}
                <div className="flex items-center">
                  <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showVerifiedOnly}
                      onChange={(e) => setShowVerifiedOnly(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    Show verified only
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Free Access Banner */}
        {!isAuthenticated && (
          <div className="mb-8 animate-slideUp">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Truck className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Free Access: {getRemaining('suppliers')} suppliers remaining today</h3>
                    <p className="text-sm text-gray-600">
                      Sign up for unlimited access to all {allSuppliers.length} suppliers
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 px-3 py-1 rounded-full">
                    <span className="text-blue-600 font-semibold">{getRemaining('suppliers')}/3</span>
                    <span className="text-gray-500 text-xs ml-1">remaining</span>
                  </div>
                  <button
                    onClick={() => navigate('/register')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors whitespace-nowrap"
                  >
                    Sign Up Free
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-white px-3 py-1.5 rounded-lg shadow-sm border border-gray-200">
              <span className="text-sm text-gray-600">
                <span className="font-bold text-gray-900">{filteredSuppliers.length}</span> suppliers found
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
              {showVerifiedOnly && (
                <span className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full flex items-center gap-1 border border-green-200">
                  Verified
                  <button onClick={() => setShowVerifiedOnly(false)} className="hover:bg-green-100 rounded-full p-0.5">
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

        {/* Suppliers Grid */}
        {paginatedSuppliers.length === 0 ? (
          <div className="text-center py-20">
            <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No suppliers found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search or filters</p>
            <button
              onClick={clearAllFilters}
              className="px-5 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedSuppliers.map((supplier, index) => (
              <SupplierCard key={supplier.id} supplier={supplier} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Supplier</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Products</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Success Rate</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedSuppliers.map((supplier) => (
                  <tr
                    key={supplier.id}
                    onClick={() => handleViewSupplier(supplier)}
                    className="hover:bg-gray-50 cursor-pointer transition-colors group"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-md overflow-hidden bg-gray-100">
                          <img src={supplier.image} alt={supplier.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                            {supplier.name}
                          </p>
                          {supplier.verified && (
                            <span className="text-xs text-green-600 flex items-center gap-0.5">
                              <CheckCircle size={10} className="fill-current" />
                              Verified
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 text-xs rounded-full ${getCategoryBadgeColor(supplier.category)}`}>
                        {supplier.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{supplier.location.split(',')[0]}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{supplier.products}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-0.5">
                        <Star size={12} className="text-yellow-500 fill-current" />
                        <span className="text-sm font-medium text-gray-700">{supplier.rating}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-green-500 rounded-full"
                            style={{ width: `${supplier.successRate}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-600">{supplier.successRate}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToDashboard(supplier, e);
                          }}
                          disabled={isInDashboard('suppliers', supplier.id)}
                          className={`p-1 hover:bg-gray-100 rounded ${
                            isInDashboard('suppliers', supplier.id) ? 'text-green-600' : 'text-gray-400 hover:text-blue-600'
                          }`}
                        >
                          {isInDashboard('suppliers', supplier.id) ? <Check size={14} /> : <Plus size={14} />}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBookmark(supplier, e);
                          }}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Bookmark size={14} className={isBookmarked(supplier.id) ? 'text-blue-600 fill-current' : 'text-gray-400'} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleQuickView(supplier, e);
                          }}
                          className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded"
                        >
                          <Eye size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Loading indicator */}
        {isLoading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
            <p className="mt-2 text-gray-600">Loading more suppliers...</p>
          </div>
        )}

        {/* Load More button */}
        {hasMoreItems && !isLoading && (
          <div className="text-center mt-8">
            <button
              onClick={loadMore}
              className="px-5 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors inline-flex items-center gap-2 text-sm"
            >
              <ChevronDown size={16} />
              Load More Suppliers
            </button>
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      {showQuickView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn" onClick={() => setShowQuickView(null)}>
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-scaleIn" onClick={(e) => e.stopPropagation()}>
            <div className="relative h-48 overflow-hidden">
              <img 
                src={showQuickView.coverImage} 
                alt={showQuickView.name}
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${getCategoryColor(showQuickView.category)} opacity-80`} />
              <button
                onClick={() => setShowQuickView(null)}
                className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:scale-110 transition-transform"
              >
                <X size={20} />
              </button>
              <div className="absolute bottom-4 left-4 flex items-center gap-3">
                <div className="w-16 h-16 rounded-xl bg-white/90 backdrop-blur-sm p-1 shadow-xl">
                  <img 
                    src={showQuickView.image} 
                    alt={showQuickView.name}
                    className="w-full h-full rounded-lg object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{showQuickView.name}</h2>
                  <p className="text-white/80">{showQuickView.category} • {showQuickView.subCategory}</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <p className="text-gray-600 mb-6">{showQuickView.longDescription}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <MapPin className="text-gray-400 mb-2" size={20} />
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-semibold">{showQuickView.location}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <Calendar className="text-gray-400 mb-2" size={20} />
                  <p className="text-sm text-gray-500">Founded</p>
                  <p className="font-semibold">{showQuickView.founded}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <Users className="text-gray-400 mb-2" size={20} />
                  <p className="text-sm text-gray-500">Employees</p>
                  <p className="font-semibold">{showQuickView.employees}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <Package className="text-gray-400 mb-2" size={20} />
                  <p className="text-sm text-gray-500">Products</p>
                  <p className="font-semibold">{showQuickView.products}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    handleViewSupplier(showQuickView);
                    setShowQuickView(null);
                  }}
                  className={`flex-1 px-6 py-3 bg-gradient-to-r ${getCategoryColor(showQuickView.category)} text-white rounded-xl font-medium hover:shadow-lg transition-all`}
                >
                  View Full Profile
                </button>
                <button
                  onClick={() => setShowQuickView(null)}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all"
                >
                  Close
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
            <h2 className="text-2xl font-bold text-white mb-2">Get Supplier Updates Weekly</h2>
            <p className="text-gray-400 text-sm mb-6">
              Subscribe to our newsletter and get new supplier listings, industry news, and exclusive deals.
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
                <li><button onClick={() => navigate('/suppliers')} className="hover:text-white transition-colors">All Suppliers</button></li>
                <li><button onClick={() => navigate('/suppliers?verified=true')} className="hover:text-white transition-colors">Verified Suppliers</button></li>
                <li><button onClick={() => navigate('/suppliers?categories=true')} className="hover:text-white transition-colors">Categories</button></li>
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

export default SuppliersPage;
