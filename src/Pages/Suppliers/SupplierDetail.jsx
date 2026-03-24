// src/Pages/Suppliers/SupplierDetail.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import {
  ArrowLeft,
  Building2,
  MapPin,
  Globe,
  Mail,
  Phone,
  Star,
  Clock,
  Calendar,
  Users,
  Package,
  CheckCircle,
  XCircle,
  Award,
  TrendingUp,
  Shield,
  ThumbsUp,
  MessageCircle,
  Share2,
  Bookmark,
  Heart,
  Download,
  Printer,
  ExternalLink,
  Copy,
  Facebook,
  Twitter,
  Linkedin,
  Link as LinkIcon,
  FileText,
  Truck,
  CreditCard,
  Wallet,
  BadgeCheck,
  AlertCircle
} from 'lucide-react';
import { toast } from 'react-hot-toast';

// Complete Suppliers Data (same as in SuppliersPage)
const suppliersData = [
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
    longDescription: `ABC Corporation has been a trusted name in the electronics industry for over 20 years. We provide high-quality components for manufacturers, retailers, and hobbyists alike.

    Our extensive inventory includes microcontrollers, sensors, displays, power supplies, and development boards from leading manufacturers. We pride ourselves on exceptional customer service, technical support, and fast worldwide shipping.

    **Why choose ABC Corporation:**
    • 20+ years of industry experience
    • ISO 9001 certified quality management
    • Engineering support team available
    • Same-day shipping on orders before 2 PM EST
    • Volume discounts for bulk orders`,
    
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
      { user: 'John D.', rating: 5, comment: 'Excellent quality products! Fast shipping and great communication.', date: '2024-02-15' },
      { user: 'Sarah M.', rating: 4, comment: 'Good supplier, responsive team. Would recommend.', date: '2024-02-10' },
      { user: 'Michael R.', rating: 5, comment: 'Best electronics supplier we\'ve worked with. Consistent quality.', date: '2024-02-05' }
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
    longDescription: `XYZ Industries specializes in high-grade raw materials for various industries including automotive, construction, and consumer goods.

    We source metals and alloys from the best mills worldwide, ensuring consistent quality and competitive pricing. Our inventory includes steel, aluminum, copper, titanium, and specialty alloys.

    **Our commitment:**
    • Strict quality control at every stage
    • Mill test reports with every shipment
    • Just-in-time delivery options
    • Custom cutting and processing available
    • Technical support for material selection`,
    
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
      { user: 'Mike R.', rating: 5, comment: 'Consistent quality, reliable supplier', date: '2024-02-12' },
      { user: 'Jennifer L.', rating: 4, comment: 'Good materials, fair pricing', date: '2024-02-08' }
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
    longDescription: `Global Traders connects businesses worldwide with quality products and seamless logistics solutions.

    With partners in over 40 countries, we facilitate international trade for commodities, manufactured goods, and specialized products. Our team handles all aspects of cross-border transactions including documentation, customs clearance, and freight forwarding.

    **Our services:**
    • Sourcing and procurement
    • Quality inspection
    • Freight forwarding (air, sea, land)
    • Customs brokerage
    • Warehousing and distribution
    • Trade financing assistance`,
    
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
    longDescription: `Tech Solutions Inc provides cutting-edge technology products and IT services to businesses of all sizes.

    From hardware procurement to cloud solutions, we help companies build and maintain their technology infrastructure. Our team of certified engineers provides technical support and consulting services.

    **What we offer:**
    • Enterprise hardware and software
    • Cloud infrastructure setup
    • IT consulting and strategy
    • 24/7 technical support
    • Custom software development
    • Cybersecurity solutions`,
    
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
    longDescription: `Quality Materials Co supplies premium materials to manufacturers across North America.

    We specialize in industrial supplies, safety equipment, and production consumables. Our goal is to be a one-stop shop for manufacturing facilities of all sizes.

    **Our products:**
    • Industrial supplies and consumables
    • Safety equipment and PPE
    • Maintenance and repair materials
    • Production tools and equipment
    • Janitorial and facility supplies`,
    
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
    longDescription: `Fast Shipping Co offers comprehensive logistics solutions including freight, warehousing, and last-mile delivery.

    Whether you need to ship a single package or manage a complex supply chain, our team provides customized solutions to meet your needs. We leverage technology to provide real-time tracking and visibility.

    **Our services:**
    • LTL and full truckload freight
    • Air and ocean freight forwarding
    • Warehousing and distribution
    • Last-mile delivery
    • Reverse logistics
    • Inventory management`,
    
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
    longDescription: `Green Energy Supplies is your one-stop shop for solar panels, wind turbines, and renewable energy solutions.

    We partner with leading manufacturers to bring you high-efficiency solar panels, inverters, mounting systems, and monitoring equipment. Our team provides technical support and system design assistance.

    **Our products:**
    • Solar panels (mono, poly, thin-film)
    • Inverters and optimizers
    • Mounting systems
    • Energy storage solutions
    • EV charging stations
    • Monitoring equipment`,
    
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
    longDescription: `Office Depot Pro provides everything your office needs - from paper clips to executive desks.

    We serve businesses of all sizes with competitive pricing, fast delivery, and exceptional customer service. Our B2B portal makes it easy for companies to manage their office supply needs.

    **Our products:**
    • Office supplies and stationery
    • Furniture and ergonomic seating
    • Breakroom supplies
    • Technology and electronics
    • Cleaning and janitorial
    • Promotional products`,
    
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
    longDescription: `Industrial Parts Co supplies replacement parts and components for industrial machinery.

    We stock thousands of parts for immediate shipment and can source hard-to-find items for older equipment. Our knowledgeable staff can help you identify the right parts for your machinery.

    **Our inventory:**
    • Bearings and power transmission
    • Hydraulic and pneumatic components
    • Motors and drives
    • Conveyor parts
    • Industrial fasteners
    • Machine tool accessories`,
    
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

const SupplierDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [supplier, setSupplier] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookmarked, setBookmarked] = useState(false);
  const [liked, setLiked] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    // Find the supplier by ID
    const foundSupplier = suppliersData.find(s => s.id === parseInt(id));
    
    // Simulate loading
    setTimeout(() => {
      if (foundSupplier) {
        setSupplier(foundSupplier);
      }
      setLoading(false);
    }, 500);
  }, [id]);

  const handleBack = () => {
    navigate('/suppliers');
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    toast.success(bookmarked ? 'Supplier removed from bookmarks' : 'Supplier bookmarked!', {
      icon: bookmarked ? '🔖' : '📌',
      duration: 2000
    });
  };

  const handleLike = () => {
    setLiked(!liked);
    toast.success(liked ? 'Removed like' : 'Supplier liked!', {
      icon: liked ? '💔' : '❤️',
      duration: 2000
    });
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = supplier?.name || 'BizCraft Supplier';
    
    let shareUrl = '';
    switch(platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        toast.success('Link copied to clipboard!');
        return;
      default:
        return;
    }
    
    window.open(shareUrl, '_blank');
    toast.success(`Shared on ${platform}!`);
  };

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setFormSubmitted(true);
      toast.success('Message sent successfully! The supplier will respond shortly.');
      setContactForm({ name: '', email: '', message: '' });
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setFormSubmitted(false);
      }, 3000);
    }, 1000);
  };

  const handleContactChange = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value
    });
  };

  const handleWebsite = () => {
    window.open(`https://${supplier.website}`, '_blank');
  };

  const handleEmail = () => {
    window.location.href = `mailto:${supplier.email}`;
  };

  const handlePhone = () => {
    window.location.href = `tel:${supplier.phone}`;
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Electronics': 'bg-blue-100 text-blue-700 border-blue-200',
      'Raw Materials': 'bg-green-100 text-green-700 border-green-200',
      'Import/Export': 'bg-purple-100 text-purple-700 border-purple-200',
      'Technology': 'bg-indigo-100 text-indigo-700 border-indigo-200',
      'Manufacturing': 'bg-orange-100 text-orange-700 border-orange-200',
      'Logistics': 'bg-yellow-100 text-yellow-700 border-yellow-200',
      'Renewable Energy': 'bg-emerald-100 text-emerald-700 border-emerald-200',
      'Office Supplies': 'bg-pink-100 text-pink-700 border-pink-200',
      'Industrial': 'bg-red-100 text-red-700 border-red-200'
    };
    return colors[category] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-[80vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
            <p className="text-gray-600">Loading supplier details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!supplier) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <Building2 size={64} className="text-gray-300 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Supplier Not Found</h1>
            <p className="text-gray-600 mb-6">The supplier you're looking for doesn't exist or has been removed.</p>
            <button
              onClick={handleBack}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
            >
              <ArrowLeft size={18} />
              Back to Suppliers
            </button>
          </div>
        </div>
      </div>
    );
  }

  const categoryColor = getCategoryColor(supplier.category);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section with Cover Image */}
      <div className="relative h-[300px] md:h-[400px] overflow-hidden">
        <img 
          src={supplier.coverImage} 
          alt={supplier.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
        
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="absolute top-6 left-6 md:top-8 md:left-8 flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg text-gray-700 hover:bg-white transition-all shadow-lg hover:shadow-xl z-10"
        >
          <ArrowLeft size={18} />
          <span className="hidden md:inline">Back to Suppliers</span>
        </button>

        {/* Supplier Info */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white">
          <div className="container mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-20 h-20 rounded-xl bg-white/90 backdrop-blur-sm p-2 shadow-xl">
                <img 
                  src={supplier.image} 
                  alt={supplier.name}
                  className="w-full h-full rounded-lg object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl md:text-4xl font-bold">{supplier.name}</h1>
                  {supplier.verified && (
                    <span className="px-3 py-1 bg-green-600 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                      <BadgeCheck size={14} />
                      Verified
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-200">
                  <span className="flex items-center gap-1">
                    <Building2 size={16} />
                    {supplier.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={16} />
                    {supplier.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star size={16} className="text-yellow-400 fill-current" />
                    {supplier.rating} ({supplier.reviews.length} reviews)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            {/* Action Buttons (Mobile) */}
            <div className="flex flex-wrap gap-3 mb-6 lg:hidden">
              <button
                onClick={handleBookmark}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                  bookmarked 
                    ? 'bg-blue-600 text-white border-blue-600' 
                    : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500 hover:text-blue-600'
                }`}
              >
                <Bookmark size={18} className={bookmarked ? 'fill-current' : ''} />
                <span>{bookmarked ? 'Bookmarked' : 'Bookmark'}</span>
              </button>
              
              <button
                onClick={handleLike}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                  liked 
                    ? 'bg-red-600 text-white border-red-600' 
                    : 'bg-white text-gray-700 border-gray-300 hover:border-red-500 hover:text-red-600'
                }`}
              >
                <Heart size={18} className={liked ? 'fill-current' : ''} />
                <span>{liked ? 'Liked' : 'Like'}</span>
              </button>
              
              <button
                onClick={() => handleShare('copy')}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all"
              >
                <Share2 size={18} />
                <span>Share</span>
              </button>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <div className="flex space-x-8 overflow-x-auto">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`pb-4 px-1 font-medium text-sm transition-all relative whitespace-nowrap ${
                    activeTab === 'overview'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('products')}
                  className={`pb-4 px-1 font-medium text-sm transition-all relative whitespace-nowrap ${
                    activeTab === 'products'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Products & Services
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`pb-4 px-1 font-medium text-sm transition-all relative whitespace-nowrap ${
                    activeTab === 'reviews'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Reviews ({supplier.reviews.length})
                </button>
                <button
                  onClick={() => setActiveTab('contact')}
                  className={`pb-4 px-1 font-medium text-sm transition-all relative whitespace-nowrap ${
                    activeTab === 'contact'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Contact
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
              {activeTab === 'overview' && (
                <div className="prose prose-lg max-w-none">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">About {supplier.name}</h2>
                  <div className="whitespace-pre-line text-gray-600 leading-relaxed">
                    {supplier.longDescription}
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Company Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                      <Calendar size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-800">Founded</p>
                        <p className="text-sm text-gray-600">{supplier.founded}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                      <Users size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-800">Employees</p>
                        <p className="text-sm text-gray-600">{supplier.employees}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                      <Truck size={18} className="text-purple-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-800">Shipping</p>
                        <p className="text-sm text-gray-600">{supplier.shipping}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                      <Clock size={18} className="text-orange-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-800">Delivery Time</p>
                        <p className="text-sm text-gray-600">{supplier.deliveryTime}</p>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Certifications</h3>
                  <div className="flex flex-wrap gap-2">
                    {supplier.certifications.map((cert, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full border border-blue-200">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'products' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Products & Services</h2>
                  <p className="text-gray-600 mb-4">This supplier offers {supplier.products} products across various categories.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <h3 className="font-semibold text-gray-800 mb-2">Product Categories</h3>
                      <div className="flex flex-wrap gap-2">
                        {supplier.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-white text-gray-600 text-xs rounded border border-gray-300">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <h3 className="font-semibold text-gray-800 mb-2">Business Terms</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Minimum Order:</span>
                          <span className="font-medium text-gray-800">{supplier.minOrder}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Payment Terms:</span>
                          <span className="font-medium text-gray-800">{supplier.paymentTerms}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Return Policy:</span>
                          <span className="font-medium text-gray-800">{supplier.returnPolicy}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h3 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                      <Award size={18} />
                      Performance Metrics
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">{supplier.successRate}%</p>
                        <p className="text-xs text-gray-600">Success Rate</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">{supplier.totalOrders.toLocaleString()}</p>
                        <p className="text-xs text-gray-600">Total Orders</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-purple-600">{supplier.responseTime}</p>
                        <p className="text-xs text-gray-600">Response Time</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-orange-600">{supplier.languages.length}</p>
                        <p className="text-xs text-gray-600">Languages</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Customer Reviews</h2>
                  <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <p className="text-4xl font-bold text-gray-800">{supplier.rating}</p>
                      <div className="flex items-center gap-0.5 mt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={16}
                            className={star <= supplier.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{supplier.reviews.length} reviews</p>
                    </div>
                    <div className="flex-1">
                      <div className="space-y-1">
                        {[5, 4, 3, 2, 1].map((star) => {
                          const count = supplier.reviews.filter(r => r.rating === star).length;
                          const percentage = (count / supplier.reviews.length) * 100 || 0;
                          return (
                            <div key={star} className="flex items-center gap-2">
                              <span className="text-xs text-gray-600 w-8">{star} star</span>
                              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-yellow-400 rounded-full"
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                              <span className="text-xs text-gray-500 w-8">{count}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {supplier.reviews.length > 0 ? (
                    <div className="space-y-4">
                      {supplier.reviews.map((review, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <p className="font-medium text-gray-800">{review.user}</p>
                              <p className="text-xs text-gray-500">{review.date}</p>
                            </div>
                            <div className="flex items-center gap-0.5">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  size={14}
                                  className={star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <MessageCircle size={40} className="text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">No reviews yet</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'contact' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Supplier</h2>
                  
                  {formSubmitted ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                      <CheckCircle size={48} className="text-green-500 mx-auto mb-3" />
                      <h3 className="text-lg font-semibold text-green-800 mb-2">Message Sent!</h3>
                      <p className="text-green-600">The supplier will respond to your inquiry shortly.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                        <input
                          type="text"
                          name="name"
                          value={contactForm.name}
                          onChange={handleContactChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Your Email</label>
                        <input
                          type="email"
                          name="email"
                          value={contactForm.email}
                          onChange={handleContactChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="john@example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                        <textarea
                          name="message"
                          value={contactForm.message}
                          onChange={handleContactChange}
                          required
                          rows="4"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Tell us about your requirements..."
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                      >
                        Send Message
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1">
            {/* Quick Info Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <h3 className="font-semibold text-gray-800 mb-4">Quick Info</h3>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Globe size={18} className="text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">Website</p>
                    <button
                      onClick={handleWebsite}
                      className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                    >
                      {supplier.website}
                      <ExternalLink size={12} />
                    </button>
                  </div>
                  <button
                    onClick={() => handleCopy(supplier.website, 'Website')}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Copy size={14} className="text-gray-400" />
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Mail size={18} className="text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">Email</p>
                    <button
                      onClick={handleEmail}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      {supplier.email}
                    </button>
                  </div>
                  <button
                    onClick={() => handleCopy(supplier.email, 'Email')}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Copy size={14} className="text-gray-400" />
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Phone size={18} className="text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">Phone</p>
                    <button
                      onClick={handlePhone}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      {supplier.phone}
                    </button>
                  </div>
                  <button
                    onClick={() => handleCopy(supplier.phone, 'Phone')}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Copy size={14} className="text-gray-400" />
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <MapPin size={18} className="text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">Address</p>
                    <p className="text-sm text-gray-700">{supplier.address}</p>
                  </div>
                  <button
                    onClick={() => handleCopy(supplier.address, 'Address')}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Copy size={14} className="text-gray-400" />
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons (Desktop) */}
            <div className="hidden lg:block bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <h3 className="font-semibold text-gray-800 mb-4">Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={handleBookmark}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border transition-all ${
                    bookmarked 
                      ? 'bg-blue-600 text-white border-blue-600' 
                      : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500 hover:text-blue-600'
                  }`}
                >
                  <Bookmark size={18} className={bookmarked ? 'fill-current' : ''} />
                  <span>{bookmarked ? 'Bookmarked' : 'Add to Bookmarks'}</span>
                </button>
                
                <button
                  onClick={handleLike}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border transition-all ${
                    liked 
                      ? 'bg-red-600 text-white border-red-600' 
                      : 'bg-white text-gray-700 border-gray-300 hover:border-red-500 hover:text-red-600'
                  }`}
                >
                  <Heart size={18} className={liked ? 'fill-current' : ''} />
                  <span>{liked ? 'Liked' : 'Like this Supplier'}</span>
                </button>
              </div>
            </div>

            {/* Share Options */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Share</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleShare('facebook')}
                  className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  title="Share on Facebook"
                >
                  <Facebook size={18} />
                </button>
                <button
                  onClick={() => handleShare('twitter')}
                  className="p-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
                  title="Share on Twitter"
                >
                  <Twitter size={18} />
                </button>
                <button
                  onClick={() => handleShare('linkedin')}
                  className="p-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
                  title="Share on LinkedIn"
                >
                  <Linkedin size={18} />
                </button>
                <button
                  onClick={() => handleShare('copy')}
                  className="p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  title="Copy link"
                >
                  <LinkIcon size={18} />
                </button>
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">
              <h3 className="font-semibold text-gray-800 mb-3">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {supplier.tags.map((tag, index) => (
                  <Link
                    key={index}
                    to={`/suppliers?tag=${tag}`}
                    className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-blue-100 hover:text-blue-600 transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierDetail;