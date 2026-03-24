import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/Navbar/Navbar';
import { 
  ArrowRight, 
  Check, 
  Star, 
  Users, 
  Briefcase, 
  TrendingUp,
  Shield,
  Clock,
  DollarSign,
  BarChart3,
  Menu,
  X,
  ChevronDown,
  LayoutDashboard,
  Calculator,
  PieChart,
  BookOpen,
  HelpCircle,
  Mail,
  Sparkles,
  Zap,
  Rocket,
  Award,
  Gift,
  Coffee,
  Heart,
  Search,
  ChevronRight,
  UserPlus,
  Settings,
  Download,
  RefreshCw,
  Play,
  PlayCircle,
  MessageCircle,
  Send,
  XCircle,
  Truck,
  Package,
  Warehouse,
  ShoppingCart,
  Gem,
  Flame,
  Crown,
  Star as StarIcon,
  User,
  LogOut,
  Shield as ShieldIcon,
  Home as HomeIcon,
  FileText,
  Video,
  Wrench,
  Building2,
  Phone,
  Bell,
  Bookmark,
  Grid
} from 'lucide-react';

const Home = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [searchQuery, setSearchQuery] = useState('');
  
  // ROI Calculator State
  const [supplierCount, setSupplierCount] = useState(25);
  const [spendAmount, setSpendAmount] = useState(5000);
  const [savings, setSavings] = useState(null);
  
  // Feature Explorer State
  const [activeFeature, setActiveFeature] = useState(0);
  
  // FAQ State
  const [openFaq, setOpenFaq] = useState(null);
  
  // Live Chat State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { type: 'bot', text: 'Hi! 👋 How can I help you today?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  
  const navigate = useNavigate();
  
  // Animation state
  const [visibleSections, setVisibleSections] = useState({});
  
  // Add refs - FIXED: Added separate refs for tools and roi-calculator
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const suppliersRef = useRef(null);
  const guidesRef = useRef(null);
  const toolsRef = useRef(null); // New ref for Business Tools
  const roiCalculatorRef = useRef(null); // New ref for ROI Calculator
  const explorerRef = useRef(null);
  const howItWorksRef = useRef(null);
  const comparisonRef = useRef(null);
  const testimonialsRef = useRef(null);
  const pricingRef = useRef(null);
  const faqRef = useRef(null);
  const chatEndRef = useRef(null);

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user?.name) return 'U';
    return user.name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
    setShowProfileMenu(false);
  };

  // Handle navigation with authentication check
  const handleNavigation = (path, requiresAuth = false) => {
    if (requiresAuth && !user) {
      navigate('/login');
    } else {
      navigate(path);
    }
    setIsMenuOpen(false);
    setShowProfileMenu(false);
  };

  // Track mouse for subtle parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 10,
        y: (e.clientY / window.innerHeight - 0.5) * 10
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll animation observer - FIXED: Updated with correct refs
  useEffect(() => {
    const observers = [];
    
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const handleIntersect = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisibleSections(prev => ({
            ...prev,
            [entry.target.id]: true
          }));
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, options);

    const sections = [
      heroRef.current,
      featuresRef.current,
      suppliersRef.current,
      guidesRef.current,
      toolsRef.current,
      roiCalculatorRef.current,
      explorerRef.current,
      howItWorksRef.current,
      comparisonRef.current,
      testimonialsRef.current,
      pricingRef.current,
      faqRef.current
    ].filter(Boolean);

    sections.forEach(section => {
      if (section) {
        if (!section.id) {
          if (section === heroRef.current) section.id = 'hero';
          else if (section === featuresRef.current) section.id = 'features';
          else if (section === suppliersRef.current) section.id = 'suppliers';
          else if (section === guidesRef.current) section.id = 'guides';
          else if (section === toolsRef.current) section.id = 'tools';
          else if (section === roiCalculatorRef.current) section.id = 'roi-calculator';
          else if (section === explorerRef.current) section.id = 'explorer';
          else if (section === howItWorksRef.current) section.id = 'how-it-works';
          else if (section === comparisonRef.current) section.id = 'comparison';
          else if (section === testimonialsRef.current) section.id = 'testimonials';
          else if (section === pricingRef.current) section.id = 'pricing';
          else if (section === faqRef.current) section.id = 'faq';
        }
        observer.observe(section);
      }
    });

    return () => {
      sections.forEach(section => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  // Calculate savings for ROI calculator
  useEffect(() => {
    if (supplierCount > 0 && spendAmount > 0) {
      const calculated = supplierCount * spendAmount * 0.15 * 12;
      setSavings(calculated);
    }
  }, [supplierCount, spendAmount]);

  const handleChatSend = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    setChatMessages(prev => [...prev, { type: 'user', text: chatInput }]);
    setChatInput('');

    setTimeout(() => {
      const botResponses = [
        "Thanks for your message! Our team will get back to you shortly.",
        "Great question! You can learn more on our pricing page.",
        "I'd be happy to help! Would you like to schedule a demo?",
        "You can sign up for a free trial to test all features.",
        "Our support team is available 24/7 to assist you."
      ];
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      setChatMessages(prev => [...prev, { type: 'bot', text: randomResponse }]);
    }, 1000);
  };

  const scrollToSection = (sectionId) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  // Animation classes based on visibility
  const getSectionClass = (sectionId) => {
    return `transition-all duration-1000 ${
      visibleSections[sectionId]
        ? 'opacity-100 translate-y-0'
        : 'opacity-0 translate-y-10'
    }`;
  };

  const getStaggeredClass = (sectionId, index) => {
    return `transition-all duration-700 delay-${index * 150} ${
      visibleSections[sectionId]
        ? 'opacity-100 translate-y-0'
        : 'opacity-0 translate-y-5'
    }`;
  };

  const products = [
    { 
      name: 'Supplier Management', 
      icon: Truck, 
      description: 'Manage all suppliers in one place', 
      href: '/suppliers',
      color: 'blue',
      badge: '10K+ suppliers',
      isNew: false,
      bgColor: 'bg-blue-600',
      requiresAuth: false
    },
    { 
      name: 'Business Guides', 
      icon: BookOpen, 
      description: 'Learn, grow, and succeed with expert resources', 
      href: '/guides',
      color: 'purple',
      badge: '500+ guides',
      isNew: true,
      bgColor: 'bg-purple-600',
      requiresAuth: false
    },
    { 
      name: 'Business Tools', 
      icon: Wrench, 
      description: 'Powerful calculators for business decisions', 
      href: '/tools',
      color: 'green',
      badge: '50+ tools',
      isNew: true,
      bgColor: 'bg-green-600',
      requiresAuth: false
    },
    { 
      name: 'Analytics Dashboard', 
      icon: PieChart, 
      description: 'Real-time insights and reports', 
      href: '/dashboard',
      color: 'purple',
      bgColor: 'bg-purple-600',
      requiresAuth: true
    }
  ];

  const resources = [
    { name: 'Help Center', icon: HelpCircle, description: 'Guides and tutorials', href: '/help', color: 'green' },
    { name: 'Contact', icon: Mail, description: 'Get in touch with us', href: '/contact', color: 'orange' }
  ];

  const features = [
    {
      icon: Truck,
      title: 'Supplier Management',
      description: 'Easily manage all your suppliers in one place with our comprehensive directory.',
      color: 'blue',
      stats: '10K+ Suppliers',
      bgColor: 'bg-blue-600',
      lightBg: 'bg-blue-50'
    },
    {
      icon: BookOpen,
      title: 'Business Guides',
      description: 'Access 500+ expert guides, video tutorials, and templates to grow your business.',
      color: 'purple',
      stats: '500+ Guides',
      bgColor: 'bg-purple-600',
      lightBg: 'bg-purple-50'
    },
    {
      icon: Wrench,
      title: 'Business Tools',
      description: 'Access powerful calculators for profit margins, loans, ROI, and more.',
      color: 'green',
      stats: '50+ Tools',
      bgColor: 'bg-green-600',
      lightBg: 'bg-green-50'
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Get real-time insights into your business performance with beautiful charts.',
      color: 'purple',
      stats: '99.9% Accuracy',
      bgColor: 'bg-purple-600',
      lightBg: 'bg-purple-50'
    },
    {
      icon: Shield,
      title: 'Secure Platform',
      description: 'Enterprise-grade security with role-based access control.',
      color: 'red',
      stats: '100% Secure',
      bgColor: 'bg-red-600',
      lightBg: 'bg-red-50'
    },
    {
      icon: Clock,
      title: 'Time-Saving',
      description: 'Automate repetitive tasks and focus on growing your business.',
      color: 'amber',
      stats: '10hrs/week saved',
      bgColor: 'bg-amber-600',
      lightBg: 'bg-amber-50'
    }
  ];

  const testimonials = [
    {
      name: 'John Smith',
      role: 'CEO, TechCorp',
      content: 'BizCraft transformed how we manage our suppliers. The tools are intuitive and powerful.',
      rating: 5,
      avatar: 'JS',
      color: 'blue',
      bgColor: 'bg-blue-600',
      lightBg: 'bg-blue-100',
      businessType: 'Enterprise'
    },
    {
      name: 'Sarah Johnson',
      role: 'Operations Manager',
      content: 'The business calculators saved us hours of manual work. Highly recommended!',
      rating: 5,
      avatar: 'SJ',
      color: 'green',
      bgColor: 'bg-green-600',
      lightBg: 'bg-green-100',
      businessType: 'Medium Business'
    },
    {
      name: 'Mike Brown',
      role: 'Small Business Owner',
      content: 'Finally a platform that understands small business needs. The dashboard is amazing.',
      rating: 5,
      avatar: 'MB',
      color: 'purple',
      bgColor: 'bg-purple-600',
      lightBg: 'bg-purple-100',
      businessType: 'Startup'
    }
  ];

  const stats = [
    { value: '10K+', label: 'Active Users', icon: Users, color: 'blue', bgColor: 'bg-blue-600', subtext: 'Growing daily' },
    { value: '50K+', label: 'Suppliers Managed', icon: Briefcase, color: 'green', bgColor: 'bg-green-600', subtext: 'Across 40+ countries' },
    { value: '100K+', label: 'Calculations Done', icon: TrendingUp, color: 'purple', bgColor: 'bg-purple-600', subtext: 'Monthly active' },
    { value: '99.9%', label: 'Uptime', icon: Shield, color: 'amber', bgColor: 'bg-amber-600', subtext: 'Enterprise grade' }
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: '$0',
      period: 'forever',
      description: 'Perfect for small businesses just getting started',
      features: [
        'Up to 10 suppliers',
        'Basic calculators',
        'Email support',
        'Dashboard access',
        '50+ Business Guides'
      ],
      buttonText: 'Get Started',
      popular: false,
      color: 'blue',
      bgColor: 'bg-blue-600',
      lightBg: 'bg-blue-50',
      icon: '🚀'
    },
    {
      name: 'Pro',
      price: '$29',
      period: 'per month',
      description: 'For growing businesses that need more power',
      features: [
        'Unlimited suppliers',
        'Advanced calculators',
        'Priority support',
        'Analytics dashboard',
        'API access',
        'Team collaboration',
        '500+ Business Guides'
      ],
      buttonText: 'Start Free Trial',
      popular: true,
      color: 'purple',
      bgColor: 'bg-purple-600',
      lightBg: 'bg-purple-50',
      icon: '⭐'
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'contact us',
      description: 'For large organizations with complex needs',
      features: [
        'Everything in Pro',
        'Custom integrations',
        'Dedicated account manager',
        'SLA guarantee',
        'On-premise option',
        'Custom Guides'
      ],
      buttonText: 'Contact Sales',
      popular: false,
      color: 'amber',
      bgColor: 'bg-amber-600',
      lightBg: 'bg-amber-50',
      icon: '🏢'
    }
  ];

  // Feature explorer data
  const featureExplorerItems = [
    {
      title: 'Supplier Management',
      description: 'Manage all your suppliers in one centralized dashboard with real-time updates and automated workflows.',
      icon: Truck,
      color: 'blue',
      bgColor: 'bg-blue-600',
      lightBg: 'bg-blue-50',
      features: [
        'Bulk import/export',
        'Automated reminders',
        'Performance tracking',
        'Document storage'
      ]
    },
    {
      title: 'Business Guides',
      description: 'Access 500+ expert guides, video tutorials, and templates to help you start and grow your business.',
      icon: BookOpen,
      color: 'purple',
      bgColor: 'bg-purple-600',
      lightBg: 'bg-purple-50',
      features: [
        'Step-by-step guides',
        'Video tutorials',
        'Downloadable templates',
        'Expert insights'
      ]
    },
    {
      title: 'Business Tools',
      description: 'Access powerful financial tools to make data-driven decisions for your business.',
      icon: Wrench,
      color: 'green',
      bgColor: 'bg-green-600',
      lightBg: 'bg-green-50',
      features: [
        'Profit margin calculator',
        'ROI analysis',
        'Loan repayment',
        'Break-even analysis'
      ]
    },
    {
      title: 'Analytics Dashboard',
      description: 'Get real-time insights into your business performance with beautiful, interactive charts.',
      icon: PieChart,
      color: 'purple',
      bgColor: 'bg-purple-600',
      lightBg: 'bg-purple-50',
      features: [
        'Custom reports',
        'Trend analysis',
        'Data export',
        'Scheduled reports'
      ]
    }
  ];

  // FAQ data
  const faqs = [
    {
      question: 'How do I get started with BizCraft?',
      answer: 'Simply sign up for a free account and you\'ll have immediate access to all basic features. No credit card required. You can start adding suppliers, accessing business guides, and using calculators right away.',
      category: 'Getting Started'
    },
    {
      question: 'How does supplier management work?',
      answer: 'Our supplier management system allows you to add, track, and manage all your suppliers in one place. You can import existing data, set up automated reminders, track performance, and store all documents securely.',
      category: 'Suppliers'
    },
    {
      question: 'What kind of business guides are available?',
      answer: 'We offer over 500+ guides covering various topics including business planning, financial management, marketing, legal compliance, and industry-specific advice. All guides are written by industry experts.',
      category: 'Guides'
    },
    {
      question: 'What tools are available?',
      answer: 'We offer powerful calculators for profit margins, loan analysis, ROI, break-even analysis, and more. All tools are designed to help you make data-driven business decisions.',
      category: 'Tools'
    },
    {
      question: 'Can I upgrade or downgrade my plan later?',
      answer: 'Yes, you can change your plan at any time. Upgrades take effect immediately, and downgrades will apply at the start of your next billing cycle.',
      category: 'Pricing'
    },
    {
      question: 'Is my data secure with BizCraft?',
      answer: 'Absolutely. We use enterprise-grade encryption for all data, regular security audits, and role-based access control to ensure your information stays protected.',
      category: 'Security'
    }
  ];

  // Comparison data
  const comparisonData = [
    { feature: 'Setup time', traditional: '2-3 weeks', bizcraft: '5 minutes', highlight: true },
    { feature: 'Monthly cost', traditional: '$500+', bizcraft: 'Starting at $0', highlight: true },
    { feature: 'Supplier management', traditional: 'Manual spreadsheets', bizcraft: 'Automated workflows', highlight: false },
    { feature: 'Business Guides', traditional: 'Paid separately', bizcraft: '500+ free guides', highlight: true },
    { feature: 'Business Tools', traditional: 'Paid separately', bizcraft: '50+ free tools', highlight: true },
    { feature: 'Reports generation', traditional: 'Hours of work', bizcraft: 'Real-time insights', highlight: false },
    { feature: 'Team collaboration', traditional: 'Email chains', bizcraft: 'Built-in tools', highlight: false }
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600 border-blue-200',
      green: 'bg-green-100 text-green-600 border-green-200',
      purple: 'bg-purple-100 text-purple-600 border-purple-200',
      red: 'bg-red-100 text-red-600 border-red-200',
      amber: 'bg-amber-100 text-amber-600 border-amber-200',
      rose: 'bg-rose-100 text-rose-600 border-rose-200',
      orange: 'bg-orange-100 text-orange-600 border-orange-200'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden relative">
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.2s ease-out forwards;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>

      {/* Navbar */}
      <Navbar />

      {/* Professional Business Images - Background Elements */}
      
      {/* Hero Section Background Images */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top right - Business meeting image */}
        <div className="absolute -top-20 right-0 w-[600px] h-[600px] opacity-5">
          <img 
            src="https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="Business meeting" 
            className="w-full h-full object-cover rounded-full blur-3xl"
            onError={(e) => e.target.style.display = 'none'}
          />
        </div>
        
        {/* Bottom left - Office workers image */}
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] opacity-5">
          <img 
            src="https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="Office team" 
            className="w-full h-full object-cover rounded-full blur-3xl"
            onError={(e) => e.target.style.display = 'none'}
          />
        </div>

        {/* Center left - Business analytics image */}
        <div className="absolute top-1/3 left-0 w-[400px] h-[400px] opacity-5">
          <img 
            src="https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="Business analytics" 
            className="w-full h-full object-cover rounded-full blur-3xl"
            onError={(e) => e.target.style.display = 'none'}
          />
        </div>

        {/* Bottom right - Business handshake image */}
        <div className="absolute bottom-1/4 right-0 w-[450px] h-[450px] opacity-5">
          <img 
            src="https://images.pexels.com/photos/5668868/pexels-photo-5668868.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="Business handshake" 
            className="w-full h-full object-cover rounded-full blur-3xl"
            onError={(e) => e.target.style.display = 'none'}
          />
        </div>
      </div>

      {/* Features Section Background Images */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[800px] right-10 w-[300px] h-[300px] opacity-5">
          <img 
            src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="Business planning" 
            className="w-full h-full object-cover rounded-full blur-3xl"
            onError={(e) => e.target.style.display = 'none'}
          />
        </div>
        <div className="absolute top-[1200px] left-10 w-[350px] h-[350px] opacity-5">
          <img 
            src="https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="Team meeting" 
            className="w-full h-full object-cover rounded-full blur-3xl"
            onError={(e) => e.target.style.display = 'none'}
          />
        </div>
      </div>

      {/* Supplier Management Section Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[1800px] right-20 w-[400px] h-[400px] opacity-5">
          <img 
            src="https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="Supply chain" 
            className="w-full h-full object-cover rounded-full blur-3xl"
            onError={(e) => e.target.style.display = 'none'}
          />
        </div>
      </div>

      {/* Guides Section Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[2800px] right-10 w-[350px] h-[350px] opacity-5">
          <img 
            src="https://images.pexels.com/photos/256455/pexels-photo-256455.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="Reading books" 
            className="w-full h-full object-cover rounded-full blur-3xl"
            onError={(e) => e.target.style.display = 'none'}
          />
        </div>
        <div className="absolute top-[3200px] left-10 w-[300px] h-[300px] opacity-5">
          <img 
            src="https://images.pexels.com/photos/3768914/pexels-photo-3768914.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="Learning" 
            className="w-full h-full object-cover rounded-full blur-3xl"
            onError={(e) => e.target.style.display = 'none'}
          />
        </div>
      </div>

      {/* Tools Section Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[3800px] right-20 w-[400px] h-[400px] opacity-5">
          <img 
            src="https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="Calculator and tools" 
            className="w-full h-full object-cover rounded-full blur-3xl"
            onError={(e) => e.target.style.display = 'none'}
          />
        </div>
      </div>

      {/* Testimonials Section Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[4800px] right-10 w-[350px] h-[350px] opacity-5">
          <img 
            src="https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="Happy clients" 
            className="w-full h-full object-cover rounded-full blur-3xl"
            onError={(e) => e.target.style.display = 'none'}
          />
        </div>
      </div>

      {/* FAQ Section Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[5800px] right-20 w-[400px] h-[400px] opacity-5">
          <img 
            src="https://images.pexels.com/photos/3768894/pexels-photo-3768894.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="FAQ support" 
            className="w-full h-full object-cover rounded-full blur-3xl"
            onError={(e) => e.target.style.display = 'none'}
          />
        </div>
      </div>

      {/* Hero Section */}
      <section 
        ref={heroRef} 
        id="hero"
        className={`relative pt-20 pb-16 px-4 overflow-hidden bg-white ${getSectionClass('hero')}`}
      >
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl" />
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl" />
        </div>

        <div className="container mx-auto text-center relative z-10 max-w-5xl">
          {/* Badge */}
          <div className={`inline-block mb-6 transition-all duration-700 delay-0 ${
            visibleSections['hero'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}>
            <span className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-sm font-medium shadow-lg">
              <Sparkles className="inline w-4 h-4 mr-1" />
              Trusted by 10,000+ businesses worldwide
            </span>
          </div>

          <h1 className={`text-5xl md:text-6xl font-bold mb-6 transition-all duration-700 delay-150 ${
            visibleSections['hero'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}>
            <span className="text-gray-900">Manage Your Business</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mt-2">
              Like Never Before
            </span>
          </h1>

          <p className={`text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto transition-all duration-700 delay-300 ${
            visibleSections['hero'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}>
            Streamline your supplier management, access 500+ business guides, powerful tools, and make data-driven decisions with our all-in-one platform.
          </p>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-6 transition-all duration-700 delay-450 ${
            visibleSections['hero'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}>
            <button
              onClick={() => navigate('/register')}
              className="group px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              Start Free Trial
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              onClick={() => scrollToSection('#features')}
              className="group px-8 py-3 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-all transform hover:scale-105 font-semibold border-2 border-gray-200 hover:border-blue-200 flex items-center justify-center gap-2"
            >
              Watch Demo
              <Zap size={18} className="text-yellow-500 group-hover:animate-pulse" />
            </button>
          </div>

          {/* Quick Access Links */}
          <div className={`flex items-center justify-center gap-6 mb-12 text-sm transition-all duration-700 delay-600 ${
            visibleSections['hero'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}>
            <button 
              onClick={() => navigate('/suppliers')}
              className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-1 group"
            >
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                <Truck size={12} className="text-white" />
              </div>
              Manage Suppliers
            </button>
            <span className="text-gray-300">•</span>
            <button 
              onClick={() => navigate('/guides')}
              className="text-gray-600 hover:text-purple-600 transition-colors flex items-center gap-1 group"
            >
              <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                <BookOpen size={12} className="text-white" />
              </div>
              Browse Guides
            </button>
            <span className="text-gray-300">•</span>
            <button 
              onClick={() => navigate('/tools')}
              className="text-gray-600 hover:text-green-600 transition-colors flex items-center gap-1 group"
            >
              <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                <Wrench size={12} className="text-white" />
              </div>
              Use Tools
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100 transition-all duration-700 hover:shadow-xl ${
                  visibleSections['hero'] 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-5'
                }`}
                style={{ transitionDelay: `${750 + index * 150}ms` }}
              >
                <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm font-medium text-gray-700">{stat.label}</div>
                <div className="text-xs text-gray-400 mt-1">{stat.subtext}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section 
        ref={featuresRef} 
        id="features"
        className={`relative py-20 px-4 bg-gray-50/80 backdrop-blur-sm ${getSectionClass('features')}`}
      >
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className={`text-center mb-12 transition-all duration-700 ${
            visibleSections['features'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Everything You Need to Succeed
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to help you manage and grow your business efficiently
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all card-hover ${
                  visibleSections['features'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-14 h-14 ${feature.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-md`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-lg font-semibold text-${feature.color}-600`}>
                      {feature.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-medium text-gray-500">{feature.stats}</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full" />
                      <span className="text-xs text-gray-400">Active</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-3">
                  {feature.description}
                </p>
                
                {/* Feature tags */}
                {feature.title === 'Supplier Management' && (
                  <div className="flex items-center gap-2 text-xs text-blue-600">
                    <span className="bg-blue-50 px-2 py-1 rounded-full">10K+ suppliers</span>
                    <span>•</span>
                    <span className="bg-blue-50 px-2 py-1 rounded-full">Bulk import</span>
                  </div>
                )}
                
                {feature.title === 'Business Guides' && (
                  <div className="flex items-center gap-2 text-xs text-purple-600">
                    <span className="bg-purple-50 px-2 py-1 rounded-full">500+ guides</span>
                    <span>•</span>
                    <span className="bg-purple-50 px-2 py-1 rounded-full">Free access</span>
                  </div>
                )}

                {feature.title === 'Business Tools' && (
                  <div className="flex items-center gap-2 text-xs text-green-600">
                    <span className="bg-green-50 px-2 py-1 rounded-full">50+ tools</span>
                    <span>•</span>
                    <span className="bg-green-50 px-2 py-1 rounded-full">Free calculators</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supplier Management Section */}
      <section 
        ref={suppliersRef} 
        id="suppliers"
        className={`relative py-20 px-4 bg-white/80 backdrop-blur-sm ${getSectionClass('suppliers')}`}
      >
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left side - Content */}
            <div className={`flex-1 text-center lg:text-left transition-all duration-700 delay-0 ${
              visibleSections['suppliers'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}>
              <div className="inline-block px-4 py-1 bg-blue-600 text-white rounded-full text-sm font-medium mb-4 shadow-lg">
                🚚 Supplier Hub
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Streamline Your 
                <span className="text-blue-600"> Supplier Management</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Manage all your suppliers in one centralized dashboard. Track performance, automate communications, and optimize your supply chain.
              </p>
              
              {/* Features list */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { text: 'Centralized directory', icon: Package, color: 'bg-blue-600' },
                  { text: 'Performance tracking', icon: TrendingUp, color: 'bg-green-600' },
                  { text: 'Bulk import/export', icon: Download, color: 'bg-purple-600' },
                  { text: 'Automated reminders', icon: Clock, color: 'bg-amber-600' },
                  { text: 'Document storage', icon: Shield, color: 'bg-red-600' },
                  { text: 'Communication logs', icon: MessageCircle, color: 'bg-indigo-600' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className={`w-6 h-6 ${item.color} rounded-full flex items-center justify-center`}>
                      <item.icon size={12} className="text-white" />
                    </div>
                    <span className="text-sm text-gray-700">{item.text}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button
                onClick={() => navigate('/suppliers')}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg inline-flex items-center gap-2 group"
              >
                Manage Suppliers
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Right side - Visual preview */}
            <div className={`flex-1 relative transition-all duration-700 delay-300 ${
              visibleSections['suppliers'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}>
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Truck className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Top Suppliers</h3>
                    <p className="text-xs text-gray-500">Most active this month</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {[
                    { name: 'ABC Supplies Inc.', category: 'Raw Materials', status: 'Active', color: 'bg-green-600' },
                    { name: 'Global Logistics Co.', category: 'Shipping', status: 'Active', color: 'bg-blue-600' },
                    { name: 'TechComponents Ltd.', category: 'Electronics', status: 'Pending', color: 'bg-amber-600' }
                  ].map((supplier, i) => (
                    <div 
                      key={i} 
                      className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                      onClick={() => navigate('/suppliers')}
                    >
                      <div className={`w-8 h-8 ${supplier.color} rounded-lg flex items-center justify-center text-white text-xs font-bold`}>
                        {supplier.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-800">{supplier.name}</h4>
                        <p className="text-xs text-gray-500">{supplier.category}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        supplier.status === 'Active' 
                          ? 'bg-green-600 text-white' 
                          : 'bg-amber-600 text-white'
                      }`}>
                        {supplier.status}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">50K+ suppliers managed</span>
                    <span className="text-blue-600 font-medium">98% satisfaction</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Guides Section */}
      <section 
        ref={guidesRef} 
        id="guides"
        className={`relative py-20 px-4 bg-gray-50/80 backdrop-blur-sm ${getSectionClass('guides')}`}
      >
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left side - Content */}
            <div className={`flex-1 text-center lg:text-left transition-all duration-700 delay-0 ${
              visibleSections['guides'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}>
              <div className="inline-block px-4 py-1 bg-purple-600 text-white rounded-full text-sm font-medium mb-4 shadow-lg">
                📚 Learning Hub
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Learn, Grow, and Succeed with 
                <span className="text-purple-600"> Business Guides</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Access 500+ expert guides, video tutorials, and templates to help you 
                start, run, and scale your business effectively. Updated weekly with new content.
              </p>
              
              {/* Features list */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { text: 'Step-by-step guides', icon: BookOpen, color: 'bg-purple-600' },
                  { text: 'Video tutorials', icon: Play, color: 'bg-blue-600' },
                  { text: 'Downloadable templates', icon: Download, color: 'bg-green-600' },
                  { text: 'Expert insights', icon: Award, color: 'bg-amber-600' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className={`w-6 h-6 ${item.color} rounded-full flex items-center justify-center`}>
                      <item.icon size={12} className="text-white" />
                    </div>
                    <span className="text-sm text-gray-700">{item.text}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button
                onClick={() => navigate('/guides')}
                className="px-8 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-all transform hover:scale-105 shadow-lg inline-flex items-center gap-2 group"
              >
                Explore All Guides
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Right side - Visual preview */}
            <div className={`flex-1 relative transition-all duration-700 delay-300 ${
              visibleSections['guides'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}>
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Popular Guides</h3>
                    <p className="text-xs text-gray-500">Most read this week</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {[
                    { title: 'Complete Guide to Business Planning', reads: '2.3k reads', color: 'bg-blue-600' },
                    { title: 'Financial Planning for Small Business', reads: '1.8k reads', color: 'bg-purple-600' },
                    { title: 'Legal Compliance Checklist', reads: '1.5k reads', color: 'bg-green-600' }
                  ].map((guide, i) => (
                    <div 
                      key={i} 
                      className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                      onClick={() => navigate('/guides')}
                    >
                      <div className={`w-8 h-8 ${guide.color} rounded-lg flex items-center justify-center text-white text-xs font-bold`}>
                        {guide.title.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-800">{guide.title}</h4>
                        <p className="text-xs text-gray-500">15 min read • {guide.reads}</p>
                      </div>
                      <BookOpen className="w-4 h-4 text-gray-400" />
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">500+ guides available</span>
                    <span className="text-purple-600 font-medium">Free access</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Tools Section - FIXED: Now using toolsRef */}
      <section 
        ref={toolsRef} 
        id="tools"
        className={`relative py-20 px-4 bg-white/80 backdrop-blur-sm ${getSectionClass('tools')}`}
      >
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left side - Content */}
            <div className={`flex-1 text-center lg:text-left transition-all duration-700 delay-0 ${
              visibleSections['tools'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}>
              <div className="inline-block px-4 py-1 bg-green-600 text-white rounded-full text-sm font-medium mb-4 shadow-lg">
                🛠️ Tools Hub
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Powerful 
                <span className="text-green-600"> Business Tools</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Access powerful calculators for profit margins, loans, ROI, and more. Make data-driven decisions with our comprehensive toolset.
              </p>
              
              {/* Features list */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { text: 'Profit margin calculator', icon: Calculator, color: 'bg-green-600' },
                  { text: 'ROI analysis', icon: TrendingUp, color: 'bg-blue-600' },
                  { text: 'Loan repayment', icon: DollarSign, color: 'bg-purple-600' },
                  { text: 'Break-even analysis', icon: BarChart3, color: 'bg-amber-600' },
                  { text: 'Cash flow projection', icon: RefreshCw, color: 'bg-red-600' },
                  { text: 'Inventory management', icon: Package, color: 'bg-indigo-600' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className={`w-6 h-6 ${item.color} rounded-full flex items-center justify-center`}>
                      <item.icon size={12} className="text-white" />
                    </div>
                    <span className="text-sm text-gray-700">{item.text}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button
                onClick={() => navigate('/tools')}
                className="px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all transform hover:scale-105 shadow-lg inline-flex items-center gap-2 group"
              >
                Explore All Tools
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Right side - Visual preview */}
            <div className={`flex-1 relative transition-all duration-700 delay-300 ${
              visibleSections['tools'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}>
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                    <Wrench className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Popular Tools</h3>
                    <p className="text-xs text-gray-500">Most used this week</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {[
                    { name: 'Profit Margin Calculator', uses: '2.3k uses', icon: Calculator, color: 'bg-blue-600' },
                    { name: 'ROI Calculator', uses: '1.8k uses', icon: TrendingUp, color: 'bg-purple-600' },
                    { name: 'Loan Calculator', uses: '1.5k uses', icon: DollarSign, color: 'bg-green-600' }
                  ].map((tool, i) => (
                    <div 
                      key={i} 
                      className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                      onClick={() => navigate('/tools')}
                    >
                      <div className={`w-8 h-8 ${tool.color} rounded-lg flex items-center justify-center text-white`}>
                        <tool.icon size={14} />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-800">{tool.name}</h4>
                        <p className="text-xs text-gray-500">{tool.uses}</p>
                      </div>
                      <Calculator className="w-4 h-4 text-gray-400" />
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">50+ tools available</span>
                    <span className="text-green-600 font-medium">Free access</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE ROI CALCULATOR - FIXED: Now using roiCalculatorRef */}
      <section 
        ref={roiCalculatorRef} 
        id="roi-calculator"
        className={`relative py-20 px-4 bg-gray-50/80 backdrop-blur-sm ${getSectionClass('roi-calculator')}`}
      >
        <div className="container mx-auto max-w-4xl relative z-10">
          <div className={`text-center mb-12 transition-all duration-700 ${
            visibleSections['roi-calculator'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Calculate Your Potential Savings
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              See how much your business could save with BizCraft
            </p>
          </div>
          
          <div className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-100 transition-all duration-700 delay-150 ${
            visibleSections['roi-calculator'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of suppliers
                </label>
                <input 
                  type="range" 
                  min="1" 
                  max="100" 
                  value={supplierCount}
                  onChange={(e) => setSupplierCount(parseInt(e.target.value))}
                  className="w-full accent-blue-600"
                />
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-gray-500">1</span>
                  <span className="text-lg font-bold text-blue-600">{supplierCount} suppliers</span>
                  <span className="text-xs text-gray-500">100</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Average monthly spend per supplier
                </label>
                <input 
                  type="range" 
                  min="1000" 
                  max="50000" 
                  step="1000"
                  value={spendAmount}
                  onChange={(e) => setSpendAmount(parseInt(e.target.value))}
                  className="w-full accent-blue-600"
                />
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-gray-500">$1K</span>
                  <span className="text-lg font-bold text-blue-600">${spendAmount.toLocaleString()}</span>
                  <span className="text-xs text-gray-500">$50K</span>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50/90 backdrop-blur-sm rounded-xl p-6 border border-blue-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700 font-medium">Estimated annual savings:</span>
                <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full">Based on 15% average reduction</span>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-4xl font-bold text-blue-600">
                    ${savings ? savings.toLocaleString() : '0'}
                  </p>
                  <p className="text-sm text-gray-500">per year</p>
                </div>
                <button
                  onClick={() => navigate('/register')}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 text-sm font-medium shadow-md"
                >
                  Get Started
                </button>
              </div>
            </div>
            
            <p className="text-xs text-gray-400 text-center mt-4">
              *Calculations are estimates based on typical customer savings. Actual results may vary.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURE EXPLORER */}
      <section 
        ref={explorerRef} 
        id="explorer"
        className={`relative py-20 px-4 bg-white/80 backdrop-blur-sm ${getSectionClass('explorer')}`}
      >
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className={`text-center mb-12 transition-all duration-700 ${
            visibleSections['explorer'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Explore Features
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Click through to see how each feature can benefit your business
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Feature tabs */}
            <div className="space-y-4">
              {featureExplorerItems.map((item, index) => (
                <div
                  key={index}
                  className={`p-5 rounded-xl cursor-pointer transition-all border-2 ${
                    activeFeature === index 
                      ? `bg-${item.color}-50 border-${item.color}-200 shadow-lg` 
                      : 'bg-white/90 backdrop-blur-sm border-gray-200 hover:border-gray-300 hover:shadow-md'
                  } ${getStaggeredClass('explorer', index)}`}
                  onClick={() => setActiveFeature(index)}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      activeFeature === index 
                        ? `bg-${item.color}-600` 
                        : `bg-${item.color}-600`
                    }`}>
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold text-lg ${
                        activeFeature === index ? `text-${item.color}-600` : 'text-gray-800'
                      }`}>
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Feature preview */}
            <div className={`bg-white/90 backdrop-blur-sm rounded-xl p-6 border-2 border-gray-200 shadow-lg transition-all duration-700 delay-450 ${
              visibleSections['explorer'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}>
              <div className="mb-4">
                <h3 className={`text-xl font-bold text-${featureExplorerItems[activeFeature].color}-600 mb-2`}>
                  {featureExplorerItems[activeFeature].title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {featureExplorerItems[activeFeature].description}
                </p>
              </div>
              
              <div className="bg-gray-50/90 backdrop-blur-sm rounded-lg p-4 border border-gray-200 mb-4">
                <h4 className="font-medium text-gray-700 mb-3 text-sm">Key features:</h4>
                <ul className="space-y-2">
                  {featureExplorerItems[activeFeature].features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <div className={`w-5 h-5 bg-${featureExplorerItems[activeFeature].color}-600 rounded-full flex items-center justify-center`}>
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-600">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <button
                onClick={() => {
                  if (featureExplorerItems[activeFeature].title === 'Supplier Management') {
                    navigate('/suppliers');
                  } else if (featureExplorerItems[activeFeature].title === 'Business Guides') {
                    navigate('/guides');
                  } else if (featureExplorerItems[activeFeature].title === 'Business Tools') {
                    navigate('/tools');
                  } else if (featureExplorerItems[activeFeature].title === 'Analytics Dashboard') {
                    if (user) {
                      navigate('/dashboard');
                    } else {
                      navigate('/login');
                    }
                  }
                }}
                className={`w-full py-2.5 bg-${featureExplorerItems[activeFeature].color}-600 text-white rounded-lg font-medium hover:bg-${featureExplorerItems[activeFeature].color}-700 transition-all transform hover:scale-105 shadow-md`}
              >
                {featureExplorerItems[activeFeature].title === 'Supplier Management' 
                  ? 'Manage Suppliers' 
                  : featureExplorerItems[activeFeature].title === 'Business Guides'
                  ? 'Explore Guides'
                  : featureExplorerItems[activeFeature].title === 'Business Tools'
                  ? 'Use Tools'
                  : featureExplorerItems[activeFeature].title === 'Analytics Dashboard'
                  ? user ? 'Go to Dashboard' : 'Login to Access'
                  : `Try ${featureExplorerItems[activeFeature].title} Free`}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section 
        ref={howItWorksRef} 
        id="how-it-works"
        className={`relative py-20 px-4 bg-gray-50/80 backdrop-blur-sm ${getSectionClass('how-it-works')}`}
      >
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className={`text-center mb-12 transition-all duration-700 ${
            visibleSections['how-it-works'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              How BizCraft Works
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Your journey to smarter business management in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-gray-100 transform hover:scale-105 transition-all duration-300 ${getStaggeredClass('how-it-works', 0)}`}>
              <div className="h-2 bg-blue-600" />
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl font-bold text-blue-600">01</span>
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <UserPlus className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Sign Up Free</h3>
                <p className="text-gray-600 text-sm mb-4">Create your account in seconds. No credit card needed for trial.</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-600 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span>2-minute setup</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-600 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span>Free 14-day trial</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-600 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span>No credit card required</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Step 2 */}
            <div className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-gray-100 transform hover:scale-105 transition-all duration-300 ${getStaggeredClass('how-it-works', 1)}`}>
              <div className="h-2 bg-purple-600" />
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl font-bold text-purple-600">02</span>
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                    <Settings className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Configure & Import</h3>
                <p className="text-gray-600 text-sm mb-4">Add your suppliers and customize your dashboard.</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-600 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span>Bulk CSV import</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-600 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span>Custom categories</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-600 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span>Automated data sync</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Step 3 */}
            <div className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-gray-100 transform hover:scale-105 transition-all duration-300 ${getStaggeredClass('how-it-works', 2)}`}>
              <div className="h-2 bg-green-600" />
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl font-bold text-green-600">03</span>
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Grow & Optimize</h3>
                <p className="text-gray-600 text-sm mb-4">Use insights to save time and reduce costs.</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-600 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span>Real-time analytics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-600 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span>Cost reduction insights</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-600 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span>Performance tracking</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className={`text-center mt-10 transition-all duration-700 delay-450 ${
            visibleSections['how-it-works'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}>
            <button
              onClick={() => navigate('/register')}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
            >
              Start Your Journey Today
            </button>
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section 
        ref={comparisonRef} 
        id="comparison"
        className={`relative py-20 px-4 bg-white/80 backdrop-blur-sm ${getSectionClass('comparison')}`}
      >
        <div className="container mx-auto max-w-4xl relative z-10">
          <div className={`text-center mb-12 transition-all duration-700 ${
            visibleSections['comparison'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Why Choose BizCraft?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              See how we compare to traditional business management methods
            </p>
          </div>
          
          <div className={`bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border-2 border-gray-200 overflow-hidden transition-all duration-700 delay-150 ${
            visibleSections['comparison'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}>
            <table className="w-full">
              <thead className="bg-gray-50/90">
                <tr>
                  <th className="py-4 px-6 text-left text-sm font-medium text-gray-500">Feature</th>
                  <th className="py-4 px-6 text-center text-sm font-medium text-gray-500">Traditional Methods</th>
                  <th className="py-4 px-6 text-center text-sm font-medium text-blue-600">BizCraft</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, i) => (
                  <tr key={i} className="border-t border-gray-100 hover:bg-gray-50/80 transition-colors">
                    <td className="py-4 px-6 text-sm font-medium text-gray-800">{row.feature}</td>
                    <td className="py-4 px-6 text-center text-sm text-gray-500">{row.traditional}</td>
                    <td className="py-4 px-6 text-center">
                      <span className={`text-sm font-semibold ${row.highlight ? 'text-blue-600' : 'text-gray-700'}`}>
                        {row.bizcraft}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className={`text-center mt-8 transition-all duration-700 delay-300 ${
            visibleSections['comparison'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}>
            <button
              onClick={() => navigate('/register')}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 inline-flex items-center gap-2 shadow-lg"
            >
              Start Your Free Trial
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section 
        ref={testimonialsRef} 
        id="testimonials"
        className={`relative py-20 px-4 bg-gray-50/80 backdrop-blur-sm ${getSectionClass('testimonials')}`}
      >
        <div className="container mx-auto max-w-4xl relative z-10">
          <div className={`text-center mb-12 transition-all duration-700 ${
            visibleSections['testimonials'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Trusted by Business Owners
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              See how BizCraft is helping businesses of all sizes streamline their operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all ${getStaggeredClass('testimonials', index)}`}
                style={{
                  animation: visibleSections['testimonials'] ? `float 3s ease-in-out infinite` : 'none',
                  animationDelay: visibleSections['testimonials'] ? `${index * 0.2}s` : '0s'
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 ${testimonial.bgColor} rounded-full flex items-center justify-center font-bold text-white`}>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                    <p className="text-xs text-gray-500">{testimonial.role}</p>
                    <span className="text-xs text-blue-600 font-medium">{testimonial.businessType}</span>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  "{testimonial.content}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section 
        ref={pricingRef} 
        id="pricing"
        className={`relative py-20 px-4 bg-white/80 backdrop-blur-sm ${getSectionClass('pricing')}`}
      >
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className={`text-center mb-12 transition-all duration-700 ${
            visibleSections['pricing'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Simple, Transparent Pricing
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose the plan that fits your business size and needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border-2 ${
                  plan.popular ? 'border-purple-200' : 'border-gray-200'
                } overflow-hidden transition-all hover:shadow-2xl transform hover:scale-105 ${getStaggeredClass('pricing', index)}`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-purple-600 text-white px-4 py-1 text-xs font-medium rounded-bl-lg">
                    🔥 RECOMMENDED
                  </div>
                )}
                
                <div className="p-6">
                  <div className="text-3xl mb-2">{plan.icon}</div>
                  <h3 className={`text-xl font-bold text-${plan.color}-600 mb-1`}>
                    {plan.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">{plan.description}</p>
                  
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-sm text-gray-500">/{plan.period}</span>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <div className={`w-5 h-5 bg-${plan.color}-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}>
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => {
                      if (plan.name === 'Enterprise') {
                        navigate('/contact');
                      } else {
                        navigate('/register');
                      }
                    }}
                    className={`w-full py-2.5 rounded-lg font-medium transition-all bg-${plan.color}-600 text-white hover:bg-${plan.color}-700 shadow-md transform hover:scale-105`}
                  >
                    {plan.buttonText}
                  </button>
                </div>

                <div className={`h-1 bg-${plan.color}-600`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE FAQ */}
      <section 
        ref={faqRef} 
        id="faq"
        className={`relative py-20 px-4 bg-gray-50/80 backdrop-blur-sm ${getSectionClass('faq')}`}
      >
        <div className="container mx-auto max-w-3xl relative z-10">
          <div className={`text-center mb-12 transition-all duration-700 ${
            visibleSections['faq'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Got questions? We've got answers
            </p>
          </div>
          
          {/* Search FAQ */}
          <div className={`relative mb-8 transition-all duration-700 delay-150 ${
            visibleSections['faq'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}>
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/90 backdrop-blur-sm"
            />
          </div>
          
          {/* FAQ Accordion */}
          <div className="space-y-4">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => (
                <div
                  key={index}
                  className={`bg-white/90 backdrop-blur-sm rounded-lg border-2 border-gray-200 overflow-hidden transition-all duration-700 ${getStaggeredClass('faq', index, 300)}`}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50/80 transition-colors"
                  >
                    <div>
                      <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full mb-1 inline-block">{faq.category}</span>
                      <span className="font-medium text-gray-800 block">{faq.question}</span>
                    </div>
                    <ChevronDown 
                      className={`w-5 h-5 text-gray-500 transition-transform ${
                        openFaq === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  
                  {openFaq === index && (
                    <div className="px-6 pb-4 text-gray-600 border-t border-gray-100 pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className={`text-center py-8 bg-white/90 backdrop-blur-sm rounded-lg border-2 border-gray-200 transition-all duration-700 delay-450 ${
                visibleSections['faq'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}>
                <p className="text-gray-500">No matching questions found.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white overflow-hidden">
        {/* Background image overlay */}
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="Business team" 
            className="w-full h-full object-cover"
            onError={(e) => e.target.style.display = 'none'}
          />
        </div>
        <div className="container mx-auto text-center max-w-2xl relative z-10">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Streamline Your Business?
          </h2>
          <p className="text-blue-100 mb-8">
            Join thousands of businesses already using BizCraft to manage suppliers, access business guides, use powerful tools, and grow faster.
          </p>
          <button
            onClick={() => navigate('/register')}
            className="group px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg inline-flex items-center gap-2"
          >
            Start Your Free Trial
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-xs text-blue-200 mt-4">
            No credit card required · 14-day free trial
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-10 text-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <h3 className="text-white font-semibold mb-3 text-sm">BizCraft</h3>
              <p className="text-xs leading-relaxed">
                Professional business solutions for serious entrepreneurs.
              </p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-3 text-xs uppercase tracking-wider">Product</h4>
              <ul className="space-y-1.5 text-xs">
                <li><button onClick={() => navigate('/suppliers')} className="hover:text-white transition-colors">Supplier Management</button></li>
                <li><button onClick={() => navigate('/guides')} className="hover:text-white transition-colors">Business Guides</button></li>
                <li><button onClick={() => navigate('/tools')} className="hover:text-white transition-colors">Business Tools</button></li>
                <li><button onClick={() => scrollToSection('#pricing')} className="hover:text-white transition-colors">Pricing</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-3 text-xs uppercase tracking-wider">Resources</h4>
              <ul className="space-y-1.5 text-xs">
                <li><button onClick={() => navigate('/help')} className="hover:text-white transition-colors">Help Center</button></li>
                <li><button onClick={() => navigate('/contact')} className="hover:text-white transition-colors">Contact</button></li>
                <li><button onClick={() => navigate('/about')} className="hover:text-white transition-colors">About</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-3 text-xs uppercase tracking-wider">Legal</h4>
              <ul className="space-y-1.5 text-xs">
                <li><button onClick={() => navigate('/privacy')} className="hover:text-white transition-colors">Privacy</button></li>
                <li><button onClick={() => navigate('/terms')} className="hover:text-white transition-colors">Terms</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-6 pt-4 text-center text-xs">
            <p>&copy; 2026 BizCraft. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Live Chat Widget */}
      <div className="fixed bottom-6 right-6 z-40">
        {/* Chat Button */}
        {!isChatOpen && (
          <button
            onClick={() => setIsChatOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-110 flex items-center justify-center"
          >
            <MessageCircle className="w-6 h-6" />
          </button>
        )}

        {/* Chat Window */}
        {isChatOpen && (
          <div className="bg-white rounded-2xl shadow-2xl w-80 sm:w-96 overflow-hidden border border-gray-200">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                <span className="font-semibold">BizCraft Support</span>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="hover:bg-blue-700 rounded-lg p-1 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="h-80 overflow-y-auto p-4 bg-gray-50">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-3 flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 text-sm ${
                      msg.type === 'user'
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                        : 'bg-white text-gray-800 shadow-sm border border-gray-200'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Chat Input */}
            <form onSubmit={handleChatSend} className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;