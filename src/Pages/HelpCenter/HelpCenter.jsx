// src/Pages/HelpCenter/HelpCenter.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom'; // Add this import
import Navbar from '../../Components/Navbar/Navbar';
import {
  Search,
  HelpCircle,
  BookOpen,
  FileText,
  Video,
  MessageCircle,
  Mail,
  Phone,
  Headphones,
  ChevronRight,
  Sparkles,
  Award,
  Users,
  Clock,
  CheckCircle,
  X,
  ExternalLink,
  ArrowRight,
  Download,
  PlayCircle,
  FileJson,
  Globe,
  Zap,
  Shield,
  Star,
  ThumbsUp,
  MessageSquare,
  Twitter,
  Facebook,
  Linkedin,
  Youtube,
  Mail as MailIcon,
  Phone as PhoneIcon,
  MessageCircle as MessageCircleIcon,
  Rocket,
  Home,
  ChevronLeft,
  Calendar,
  Eye,
  Share2,
  Bookmark,
  Printer,
  Copy,
  Check,
  AlertCircle,
  Send,
  Loader,
  Smartphone
} from 'lucide-react';
import { toast } from 'react-hot-toast';

// ... rest of your component code remains the same

const styles = `
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(20px); }
    to { opacity: 1; transform: translateX(0); }
  }
  
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
  
  .animate-slideUp {
    animation: slideUp 0.5s ease-out forwards;
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.4s ease-out forwards;
  }
  
  .animate-slideInRight {
    animation: slideInRight 0.5s ease-out forwards;
  }
  
  .animate-scaleIn {
    animation: scaleIn 0.4s ease-out forwards;
  }
  
  .stagger-item {
    opacity: 0;
    animation: slideUp 0.5s ease-out forwards;
  }
  
  .stagger-item:nth-child(1) { animation-delay: 0.1s; }
  .stagger-item:nth-child(2) { animation-delay: 0.2s; }
  .stagger-item:nth-child(3) { animation-delay: 0.3s; }
  .stagger-item:nth-child(4) { animation-delay: 0.4s; }
  .stagger-item:nth-child(5) { animation-delay: 0.5s; }
  .stagger-item:nth-child(6) { animation-delay: 0.6s; }
  
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

// Mock data for articles
const articlesData = [
  {
    id: 1,
    title: 'How to Get Started with BizCraft',
    description: 'Learn the basics of setting up your account and navigating the platform.',
    content: `
      <h2>Welcome to BizCraft!</h2>
      <p>Getting started with BizCraft is easy. Follow these steps to begin your journey:</p>
      
      <h3>Step 1: Create Your Account</h3>
      <p>Click the "Sign Up" button in the top right corner. Fill in your details including name, email, and password. Verify your email address to activate your account.</p>
      
      <h3>Step 2: Set Up Your Profile</h3>
      <p>Complete your profile information including your company details, business type, and preferences. This helps us personalize your experience.</p>
      
      <h3>Step 3: Explore the Dashboard</h3>
      <p>Your dashboard is your command center. Here you can:</p>
      <ul>
        <li>View key metrics and analytics</li>
        <li>Access your saved suppliers and guides</li>
        <li>Track your recent activities</li>
        <li>Manage your account settings</li>
      </ul>
      
      <h3>Step 4: Add Your First Supplier</h3>
      <p>Navigate to the Suppliers page and click "Add Supplier". Fill in the supplier details, upload relevant documents, and save to your directory.</p>
      
      <h3>Step 5: Explore Business Guides</h3>
      <p>Visit the Guides section to access hundreds of expert resources. Filter by category, save your favorites, and track your reading progress.</p>
      
      <h3>Step 6: Try Business Tools</h3>
      <p>Use our calculators and tools to analyze your business data, calculate ROI, and make informed decisions.</p>
      
      <p>That's it! You're now ready to make the most of BizCraft. If you need any help, our support team is available 24/7.</p>
    `,
    category: 'Getting Started',
    author: 'Sarah Johnson',
    authorRole: 'Product Specialist',
    authorAvatar: 'SJ',
    reads: 2345,
    likes: 342,
    shares: 156,
    bookmarks: 89,
    date: '2024-03-15',
    readTime: '5 min',
    icon: Rocket,
    color: 'blue',
    tags: ['getting-started', 'account-setup', 'beginner'],
    related: [2, 3, 4]
  },
  {
    id: 2,
    title: 'Managing Suppliers: Complete Guide',
    description: 'Everything you need to know about adding, tracking, and managing suppliers.',
    content: `
      <h2>Master Supplier Management</h2>
      <p>Effective supplier management is crucial for business success. This guide covers everything you need to know.</p>
      
      <h3>Adding Suppliers</h3>
      <p>There are two ways to add suppliers to your directory:</p>
      <ul>
        <li><strong>Single Entry:</strong> Click "Add Supplier" and fill in the form manually</li>
        <li><strong>Bulk Import:</strong> Download our CSV template, fill in your data, and upload multiple suppliers at once</li>
      </ul>
      
      <h3>Organizing Suppliers</h3>
      <p>Use categories and tags to organize your suppliers effectively:</p>
      <ul>
        <li>Create custom categories (e.g., Electronics, Raw Materials, Services)</li>
        <li>Add tags for easy filtering (e.g., "Preferred", "International", "Certified")</li>
        <li>Set priority levels to focus on key partners</li>
      </ul>
      
      <h3>Tracking Performance</h3>
      <p>Monitor supplier performance with our analytics tools:</p>
      <ul>
        <li>Track order history and delivery times</li>
        <li>Monitor quality ratings and feedback</li>
        <li>Set performance benchmarks and alerts</li>
      </ul>
      
      <h3>Communication Logs</h3>
      <p>Keep all communication organized:</p>
      <ul>
        <li>Log emails, calls, and meetings</li>
        <li>Set reminders for follow-ups</li>
        <li>Attach documents and contracts</li>
      </ul>
      
      <h3>Best Practices</h3>
      <ul>
        <li>Regularly update supplier information</li>
        <li>Set up automated review reminders</li>
        <li>Maintain backup suppliers for critical materials</li>
        <li>Document all agreements and contracts</li>
      </ul>
    `,
    category: 'Suppliers',
    author: 'Michael Chen',
    authorRole: 'Supply Chain Expert',
    authorAvatar: 'MC',
    reads: 1876,
    likes: 289,
    shares: 134,
    bookmarks: 67,
    date: '2024-03-12',
    readTime: '8 min',
    icon: Globe,
    color: 'purple',
    tags: ['suppliers', 'management', 'organization'],
    related: [1, 5, 7]
  },
  {
    id: 3,
    title: 'Using Business Calculators Effectively',
    description: 'Master our financial tools for better business decisions.',
    content: `
      <h2>Business Calculators Guide</h2>
      <p>Our business calculators help you make data-driven decisions. Here's how to use them effectively.</p>
      
      <h3>Available Calculators</h3>
      <ul>
        <li><strong>Profit Margin Calculator:</strong> Calculate gross and net profit margins</li>
        <li><strong>ROI Calculator:</strong> Analyze return on investment for projects</li>
        <li><strong>Loan Calculator:</strong> Estimate monthly payments and total interest</li>
        <li><strong>Break-Even Analysis:</strong> Determine when your business becomes profitable</li>
        <li><strong>Cash Flow Projector:</strong> Forecast future cash flows</li>
      </ul>
      
      <h3>Using the ROI Calculator</h3>
      <p>The ROI calculator helps you evaluate investments:</p>
      <ol>
        <li>Enter the initial investment amount</li>
        <li>Input expected returns over time</li>
        <li>Add any ongoing costs</li>
        <li>Review the calculated ROI percentage and payback period</li>
      </ol>
      
      <h3>Profit Margin Analysis</h3>
      <p>Understand your pricing strategy:</p>
      <ul>
        <li>Enter cost of goods sold (COGS)</li>
        <li>Input selling price</li>
        <li>See gross profit margin instantly</li>
        <li>Adjust prices to reach target margins</li>
      </ul>
      
      <h3>Saving and Exporting Results</h3>
      <p>All calculator results can be:</p>
      <ul>
        <li>Saved to your dashboard</li>
        <li>Exported as PDF reports</li>
        <li>Shared with team members</li>
        <li>Added to presentations</li>
      </ul>
    `,
    category: 'Tools',
    author: 'Emily Rodriguez',
    authorRole: 'Financial Analyst',
    authorAvatar: 'ER',
    reads: 1543,
    likes: 234,
    shares: 98,
    bookmarks: 45,
    date: '2024-03-10',
    readTime: '6 min',
    icon: Zap,
    color: 'amber',
    tags: ['tools', 'calculators', 'finance'],
    related: [1, 4, 8]
  },
  {
    id: 4,
    title: 'Understanding Your Dashboard Analytics',
    description: 'Make sense of your business data with our analytics guide.',
    content: `
      <h2>Dashboard Analytics Explained</h2>
      <p>Your dashboard provides powerful insights into your business. Learn how to interpret the data.</p>
      
      <h3>Key Metrics</h3>
      <ul>
        <li><strong>Active Users:</strong> Number of users actively using the platform</li>
        <li><strong>Supplier Count:</strong> Total suppliers in your directory</li>
        <li><strong>Guide Views:</strong> How many times guides have been read</li>
        <li><strong>Tool Usage:</strong> Frequency of calculator and tool usage</li>
      </ul>
      
      <h3>Charts and Visualizations</h3>
      <p>Our interactive charts help you spot trends:</p>
      <ul>
        <li><strong>Revenue Trends:</strong> Track income over time</li>
        <li><strong>Category Distribution:</strong> See supplier breakdown by category</li>
        <li><strong>Performance Metrics:</strong> Compare different business areas</li>
        <li><strong>Engagement Heatmaps:</strong> Identify peak usage times</li>
      </ul>
      
      <h3>Custom Reports</h3>
      <p>Create customized reports for specific needs:</p>
      <ul>
        <li>Filter by date range</li>
        <li>Select specific metrics</li>
        <li>Choose visualization type</li>
        <li>Export in multiple formats</li>
      </ul>
      
      <h3>Setting Up Alerts</h3>
      <p>Stay informed with automated alerts:</p>
      <ul>
        <li>Supplier performance thresholds</li>
        <li>Unusual activity detection</li>
        <li>Monthly summary reports</li>
        <li>Goal achievement notifications</li>
      </ul>
    `,
    category: 'Account',
    author: 'David Kim',
    authorRole: 'Data Analyst',
    authorAvatar: 'DK',
    reads: 1234,
    likes: 198,
    shares: 76,
    bookmarks: 34,
    date: '2024-03-08',
    readTime: '7 min',
    icon: Shield,
    color: 'red',
    tags: ['analytics', 'dashboard', 'reports'],
    related: [1, 3, 6]
  },
  {
    id: 5,
    title: 'Account Settings and Preferences',
    description: 'Customize your account, manage team members, and configure preferences.',
    content: `
      <h2>Account Settings Guide</h2>
      <p>Learn how to manage your account settings and preferences.</p>
      
      <h3>Profile Settings</h3>
      <ul>
        <li>Update personal information</li>
        <li>Change profile picture</li>
        <li>Manage email preferences</li>
        <li>Set language and timezone</li>
      </ul>
      
      <h3>Security Settings</h3>
      <ul>
        <li>Enable two-factor authentication</li>
        <li>Change password</li>
        <li>View login history</li>
        <li>Manage connected devices</li>
      </ul>
      
      <h3>Team Management</h3>
      <p>Invite and manage team members:</p>
      <ul>
        <li>Send invitations via email</li>
        <li>Set role-based permissions</li>
        <li>Monitor team activity</li>
        <li>Remove or deactivate users</li>
      </ul>
      
      <h3>Notification Preferences</h3>
      <p>Control what notifications you receive:</p>
      <ul>
        <li>Email notifications</li>
        <li>In-app alerts</li>
        <li>Mobile push notifications</li>
        <li>Daily/weekly digests</li>
      </ul>
      
      <h3>Billing and Subscription</h3>
      <ul>
        <li>View current plan</li>
        <li>Update payment methods</li>
        <li>Download invoices</li>
        <li>Upgrade or downgrade plan</li>
      </ul>
    `,
    category: 'Account',
    author: 'Lisa Wong',
    authorRole: 'Customer Success Manager',
    authorAvatar: 'LW',
    reads: 987,
    likes: 156,
    shares: 43,
    bookmarks: 21,
    date: '2024-03-05',
    readTime: '5 min',
    icon: Shield,
    color: 'red',
    tags: ['account', 'settings', 'team', 'billing'],
    related: [1, 4, 8]
  },
  {
    id: 6,
    title: 'Troubleshooting Common Issues',
    description: 'Solutions to frequently encountered problems and errors.',
    content: `
      <h2>Troubleshooting Guide</h2>
      <p>Find solutions to common issues you might encounter.</p>
      
      <h3>Login Problems</h3>
      <ul>
        <li><strong>Forgot Password:</strong> Click "Forgot Password" on the login page and follow email instructions</li>
        <li><strong>Account Locked:</strong> After multiple failed attempts, wait 15 minutes or contact support</li>
        <li><strong>Email Not Verified:</strong> Check spam folder for verification email, request new one if needed</li>
      </ul>
      
      <h3>Browser Issues</h3>
      <ul>
        <li><strong>Page Not Loading:</strong> Clear browser cache and cookies, try incognito mode</li>
        <li><strong>Features Not Working:</strong> Update to latest browser version, enable JavaScript</li>
        <li><strong>Slow Performance:</strong> Close unused tabs, check internet connection</li>
      </ul>
      
      <h3>Data Import Errors</h3>
      <ul>
        <li><strong>CSV Format Issues:</strong> Use our template, check column headers, remove special characters</li>
        <li><strong>Duplicate Entries:</strong> Review data for duplicates, use deduplication tool</li>
        <li><strong>File Too Large:</strong> Split into smaller files, compress images</li>
      </ul>
      
      <h3>Payment and Billing</h3>
      <ul>
        <li><strong>Payment Failed:</strong> Verify card details, check funds, try different payment method</li>
        <li><strong>Wrong Amount Charged:</strong> Review invoice, contact billing support within 30 days</li>
        <li><strong>Subscription Not Updating:</strong> Clear cache, try again, contact support if persists</li>
      </ul>
      
      <h3>Contact Support</h3>
      <p>If issues persist, our support team is available 24/7 via:</p>
      <ul>
        <li>Live chat on this page</li>
        <li>Email: support@bizcraft.com</li>
        <li>Phone: +1 (800) 555-1234</li>
      </ul>
    `,
    category: 'Troubleshooting',
    author: 'Tech Support Team',
    authorRole: 'Support Specialists',
    authorAvatar: 'TS',
    reads: 2156,
    likes: 321,
    shares: 187,
    bookmarks: 92,
    date: '2024-03-03',
    readTime: '6 min',
    icon: HelpCircle,
    color: 'orange',
    tags: ['troubleshooting', 'errors', 'help'],
    related: [1, 2, 7]
  },
  {
    id: 7,
    title: 'Business Guides: Best Practices',
    description: 'Tips and strategies for getting the most out of our business guides.',
    content: `
      <h2>Mastering Business Guides</h2>
      <p>Learn how to effectively use our extensive library of business guides.</p>
      
      <h3>Finding the Right Guides</h3>
      <ul>
        <li>Use search with keywords</li>
        <li>Filter by category and topic</li>
        <li>Sort by popularity or date</li>
        <li>Browse curated collections</li>
      </ul>
      
      <h3>Maximizing Learning</h3>
      <ul>
        <li>Bookmark guides for later reading</li>
        <li>Take notes within the platform</li>
        <li>Download PDFs for offline access</li>
        <li>Share insights with team members</li>
      </ul>
      
      <h3>Tracking Progress</h3>
      <ul>
        <li>Mark guides as read</li>
        <li>Track reading history</li>
        <li>Set reading goals</li>
        <li>Earn achievement badges</li>
      </ul>
      
      <h3>Contributing and Feedback</h3>
      <ul>
        <li>Rate guides you've read</li>
        <li>Leave comments and questions</li>
        <li>Suggest new guide topics</li>
        <li>Share your success stories</li>
      </ul>
    `,
    category: 'Guides',
    author: 'Content Team',
    authorRole: 'Learning Specialists',
    authorAvatar: 'CT',
    reads: 1432,
    likes: 267,
    shares: 112,
    bookmarks: 56,
    date: '2024-03-01',
    readTime: '5 min',
    icon: BookOpen,
    color: 'indigo',
    tags: ['guides', 'learning', 'best-practices'],
    related: [1, 3, 8]
  },
  {
    id: 8,
    title: 'Mobile App Guide',
    description: 'How to use BizCraft on your mobile device.',
    content: `
      <h2>Mobile App User Guide</h2>
      <p>Take BizCraft on the go with our mobile apps for iOS and Android.</p>
      
      <h3>Getting the App</h3>
      <ul>
        <li><strong>iOS:</strong> Download from Apple App Store</li>
        <li><strong>Android:</strong> Download from Google Play Store</li>
        <li>Use same credentials as web version</li>
      </ul>
      
      <h3>Mobile Features</h3>
      <ul>
        <li>View dashboard on the go</li>
        <li>Access saved suppliers</li>
        <li>Read guides offline</li>
        <li>Use calculators in mobile view</li>
        <li>Receive push notifications</li>
      </ul>
      
      <h3>Syncing Data</h3>
      <ul>
        <li>All data syncs automatically</li>
        <li>Work offline, sync when connected</li>
        <li>Changes appear across all devices</li>
      </ul>
      
      <h3>Mobile-Specific Features</h3>
      <ul>
        <li>Quick actions from home screen</li>
        <li>Biometric login (fingerprint/face)</li>
        <li>Document scanning with camera</li>
        <li>Voice search capabilities</li>
      </ul>
    `,
    category: 'Technical',
    author: 'Mobile Team',
    authorRole: 'App Developers',
    authorAvatar: 'MT',
    reads: 876,
    likes: 145,
    shares: 67,
    bookmarks: 34,
    date: '2024-02-28',
    readTime: '4 min',
    icon: Smartphone,
    color: 'green',
    tags: ['mobile', 'app', 'ios', 'android'],
    related: [1, 5, 6]
  }
];

// Categories data
const categoriesData = [
  { id: 'all', name: 'All Topics', icon: BookOpen, count: articlesData.length, color: 'blue' },
  { id: 'Getting Started', name: 'Getting Started', icon: Rocket, count: articlesData.filter(a => a.category === 'Getting Started').length, color: 'green' },
  { id: 'Suppliers', name: 'Supplier Management', icon: Globe, count: articlesData.filter(a => a.category === 'Suppliers').length, color: 'purple' },
  { id: 'Guides', name: 'Business Guides', icon: FileText, count: articlesData.filter(a => a.category === 'Guides').length, color: 'indigo' },
  { id: 'Tools', name: 'Business Tools', icon: Zap, count: articlesData.filter(a => a.category === 'Tools').length, color: 'amber' },
  { id: 'Account', name: 'Account & Billing', icon: Shield, count: articlesData.filter(a => a.category === 'Account').length, color: 'red' },
  { id: 'Troubleshooting', name: 'Troubleshooting', icon: HelpCircle, count: articlesData.filter(a => a.category === 'Troubleshooting').length, color: 'orange' },
  { id: 'Technical', name: 'Technical', icon: Smartphone, count: articlesData.filter(a => a.category === 'Technical').length, color: 'green' }
];

const HelpCenter = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openFaq, setOpenFaq] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bookmarkedArticles, setBookmarkedArticles] = useState([]);
  const [likedArticles, setLikedArticles] = useState([]);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [contactLoading, setContactLoading] = useState(false);

  // Load article if ID is present
  useEffect(() => {
    if (id) {
      const article = articlesData.find(a => a.id === parseInt(id));
      if (article) {
        setSelectedArticle(article);
      }
    } else {
      setSelectedArticle(null);
    }
  }, [id, location]);

  // Load bookmarks from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('helpCenter_bookmarks');
    if (saved) {
      setBookmarkedArticles(JSON.parse(saved));
    }
    const liked = localStorage.getItem('helpCenter_liked');
    if (liked) {
      setLikedArticles(JSON.parse(liked));
    }
  }, []);

  // Save bookmarks to localStorage
  useEffect(() => {
    localStorage.setItem('helpCenter_bookmarks', JSON.stringify(bookmarkedArticles));
  }, [bookmarkedArticles]);

  // Save liked to localStorage
  useEffect(() => {
    localStorage.setItem('helpCenter_liked', JSON.stringify(likedArticles));
  }, [likedArticles]);

  // Filter articles based on search and category
  const filteredArticles = articlesData.filter(article => {
    const matchesSearch = searchQuery === '' || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = activeCategory === 'all' || article.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Filter FAQs
  const faqs = [
    {
      id: 1,
      question: 'How do I create an account?',
      answer: 'Creating an account is free and easy. Click the "Sign Up" button in the top right corner, fill in your details, and you\'ll be ready to start in minutes.',
      category: 'Getting Started'
    },
    {
      id: 2,
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for enterprise plans.',
      category: 'Billing'
    },
    {
      id: 3,
      question: 'Can I upgrade or downgrade my plan?',
      answer: 'Yes, you can change your plan at any time from your account settings. Upgrades take effect immediately, and downgrades apply at the next billing cycle.',
      category: 'Billing'
    },
    {
      id: 4,
      question: 'How do I add suppliers to my dashboard?',
      answer: 'Navigate to the Suppliers page, click "Add Supplier", and fill in the required information. You can also import multiple suppliers using our CSV template.',
      category: 'Suppliers'
    },
    {
      id: 5,
      question: 'Is my data secure?',
      answer: 'Absolutely. We use enterprise-grade encryption, regular security audits, and role-based access control to ensure your data stays protected.',
      category: 'Security'
    },
    {
      id: 6,
      question: 'How do I reset my password?',
      answer: 'Click "Forgot Password" on the login page, enter your email, and we\'ll send you instructions to reset your password securely.',
      category: 'Account'
    },
    {
      id: 7,
      question: 'Do you offer customer support?',
      answer: 'Yes! All plans include email support. Pro and Enterprise plans include priority support with faster response times and dedicated account managers.',
      category: 'Support'
    },
    {
      id: 8,
      question: 'Can I access BizCraft on mobile?',
      answer: 'Yes, our platform is fully responsive and works on all devices. We also offer native mobile apps for iOS and Android.',
      category: 'Technical'
    }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === 'all' || 
      faq.category.toLowerCase().includes(activeCategory.toLowerCase());
    
    return matchesSearch && matchesCategory;
  });

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    setSearchQuery('');
  };

  const handleArticleClick = (article) => {
    setLoading(true);
    setTimeout(() => {
      setSelectedArticle(article);
      navigate(`/help/${article.id}`);
      setLoading(false);
    }, 300);
  };

  const handleBackToHelpCenter = () => {
    setSelectedArticle(null);
    navigate('/help');
  };

  const handleBookmark = (articleId) => {
    if (bookmarkedArticles.includes(articleId)) {
      setBookmarkedArticles(bookmarkedArticles.filter(id => id !== articleId));
      toast.success('Article removed from bookmarks');
    } else {
      setBookmarkedArticles([...bookmarkedArticles, articleId]);
      toast.success('Article bookmarked');
    }
  };

  const handleLike = (articleId) => {
    if (likedArticles.includes(articleId)) {
      setLikedArticles(likedArticles.filter(id => id !== articleId));
      toast.success('Removed like');
    } else {
      setLikedArticles([...likedArticles, articleId]);
      toast.success('Article liked');
    }
  };

  const handleShare = (article) => {
    navigator.clipboard.writeText(`${window.location.origin}/help/${article.id}`);
    toast.success('Link copied to clipboard!');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setContactLoading(false);
      setFormSubmitted(true);
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setContactForm({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => {
        setFormSubmitted(false);
      }, 3000);
    }, 1500);
  };

  const handleContactChange = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value
    });
  };

  const getCategoryColor = (color) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-700 border-blue-200',
      green: 'bg-green-50 text-green-700 border-green-200',
      purple: 'bg-purple-50 text-purple-700 border-purple-200',
      indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      amber: 'bg-amber-50 text-amber-700 border-amber-200',
      red: 'bg-red-50 text-red-700 border-red-200',
      orange: 'bg-orange-50 text-orange-700 border-orange-200'
    };
    return colors[color] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const getCategoryGradient = (color) => {
    const gradients = {
      blue: 'from-blue-600 to-blue-800',
      green: 'from-green-600 to-green-800',
      purple: 'from-purple-600 to-purple-800',
      indigo: 'from-indigo-600 to-indigo-800',
      amber: 'from-amber-600 to-amber-800',
      red: 'from-red-600 to-red-800',
      orange: 'from-orange-600 to-orange-800'
    };
    return gradients[color] || 'from-gray-600 to-gray-800';
  };

  // If article is selected, show article detail view
  if (selectedArticle) {
    const article = selectedArticle;
    const gradient = getCategoryGradient(article.color);
    const isBookmarked = bookmarkedArticles.includes(article.id);
    const isLiked = likedArticles.includes(article.id);

    return (
      <div className="min-h-screen bg-gray-50">
        <style>{styles}</style>
        <Navbar />

        {/* Article Header */}
        <div className={`bg-gradient-to-r ${gradient} text-white py-12`}>
          <div className="container mx-auto px-4">
            <button
              onClick={handleBackToHelpCenter}
              className="flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ChevronLeft size={20} />
              Back to Help Center
            </button>
            <div className="max-w-4xl">
              <div className="flex items-center gap-2 mb-4">
                <span className={`px-3 py-1 bg-white/20 rounded-full text-xs font-medium`}>
                  {article.category}
                </span>
                <span className="text-white/60">•</span>
                <span className="text-sm text-white/80">{article.readTime} read</span>
              </div>
              <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
              <p className="text-xl text-white/80 mb-6">{article.description}</p>
              
              {/* Author info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold">
                    {article.authorAvatar}
                  </div>
                  <div>
                    <p className="font-medium">{article.author}</p>
                    <p className="text-sm text-white/70">{article.authorRole}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleLike(article.id)}
                    className={`p-2 rounded-full transition-colors ${
                      isLiked ? 'bg-red-500 text-white' : 'bg-white/10 hover:bg-white/20'
                    }`}
                  >
                    <ThumbsUp size={18} />
                  </button>
                  <button
                    onClick={() => handleBookmark(article.id)}
                    className={`p-2 rounded-full transition-colors ${
                      isBookmarked ? 'bg-yellow-500 text-white' : 'bg-white/10 hover:bg-white/20'
                    }`}
                  >
                    <Bookmark size={18} />
                  </button>
                  <button
                    onClick={() => handleShare(article)}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <Share2 size={18} />
                  </button>
                  <button
                    onClick={handlePrint}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <Printer size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-md p-8 mb-8">
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* Tags */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Article Stats */}
              <div className="mt-6 flex items-center gap-6 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Eye size={16} />
                  {article.reads} reads
                </span>
                <span className="flex items-center gap-1">
                  <ThumbsUp size={16} />
                  {article.likes} likes
                </span>
                <span className="flex items-center gap-1">
                  <Share2 size={16} />
                  {article.shares} shares
                </span>
                <span className="flex items-center gap-1">
                  <Bookmark size={16} />
                  {article.bookmarks} bookmarks
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={16} />
                  {new Date(article.date).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Related Articles */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Related Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {article.related.map(relatedId => {
                  const related = articlesData.find(a => a.id === relatedId);
                  if (!related) return null;
                  return (
                    <button
                      key={related.id}
                      onClick={() => handleArticleClick(related)}
                      className="text-left p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all group"
                    >
                      <h4 className="font-medium text-gray-800 group-hover:text-blue-600 mb-1">
                        {related.title}
                      </h4>
                      <p className="text-sm text-gray-600 line-clamp-2">{related.description}</p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                        <span>{related.readTime} read</span>
                        <span>•</span>
                        <span>{related.reads} reads</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-400 py-10 text-sm mt-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <h3 className="text-white font-semibold mb-3 text-sm">BizCraft</h3>
                <p className="text-xs leading-relaxed">
                  Professional business solutions for serious entrepreneurs.
                </p>
              </div>
              <div>
                <h4 className="text-white font-medium mb-3 text-xs uppercase tracking-wider">Help Center</h4>
                <ul className="space-y-1.5 text-xs">
                  <li><button onClick={() => navigate('/help')} className="hover:text-white transition-colors">All Articles</button></li>
                  <li><button onClick={() => navigate('/help/faq')} className="hover:text-white transition-colors">FAQ</button></li>
                  <li><button onClick={() => navigate('/help/guides')} className="hover:text-white transition-colors">Guides</button></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-medium mb-3 text-xs uppercase tracking-wider">Support</h4>
                <ul className="space-y-1.5 text-xs">
                  <li><button onClick={() => navigate('/contact')} className="hover:text-white transition-colors">Contact Us</button></li>
                  <li><button onClick={() => {
                    setSelectedArticle(null);
                    navigate('/help');
                    setTimeout(() => {
                      document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }} className="hover:text-white transition-colors">Live Chat</button></li>
                  <li><a href="mailto:support@bizcraft.com" className="hover:text-white transition-colors">Email</a></li>
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
              <p>&copy; 2024 BizCraft. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // Main Help Center view
  return (
    <div className="min-h-screen bg-gray-50">
      <style>{styles}</style>
      
      <Navbar />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ 
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="container mx-auto px-4 py-16 md:py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6 animate-fadeIn">
              <Headphones size={16} className="text-blue-300" />
              <span className="text-sm text-blue-200">24/7 Customer Support</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-slideUp">
              How Can We Help You?
            </h1>

            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto animate-slideUp">
              Search our knowledge base, browse guides, or get in touch with our support team.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative animate-scaleIn">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search for answers, guides, topics..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/10">
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{articlesData.length}+</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Articles</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/10">
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">24/7</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Support</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/10">
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">98%</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Satisfaction</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/10">
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">15min</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Response Time</div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400"></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* View Toggle and Results Count */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <p className="text-gray-600 mb-4 sm:mb-0">
            Showing <span className="font-semibold">{filteredArticles.length}</span> articles
            {searchQuery && ` for "${searchQuery}"`}
          </p>
          <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded transition-all ${
                viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:text-blue-600 hover:bg-gray-100'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded transition-all ${
                viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:text-blue-600 hover:bg-gray-100'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categoriesData.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                    activeCategory === category.id
                      ? `bg-${category.color}-600 text-white shadow-lg`
                      : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm border border-gray-200'
                  }`}
                >
                  <Icon size={16} />
                  <span>{category.name}</span>
                  <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                    activeCategory === category.id
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {category.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Articles Grid/List */}
        {filteredArticles.length === 0 ? (
          <div className="text-center py-20">
            <HelpCircle size={48} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No articles found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search or filters</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredArticles.map((article, index) => {
              const Icon = article.icon;
              const gradient = getCategoryGradient(article.color);
              const isBookmarked = bookmarkedArticles.includes(article.id);
              const isLiked = likedArticles.includes(article.id);

              return (
                <div
                  key={article.id}
                  className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
                  onClick={() => handleArticleClick(article)}
                >
                  <div className={`h-2 bg-gradient-to-r ${gradient}`} />
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-r ${gradient} text-white`}>
                        <Icon size={24} />
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLike(article.id);
                          }}
                          className={`p-1.5 rounded-full transition-colors ${
                            isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                          }`}
                        >
                          <ThumbsUp size={16} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBookmark(article.id);
                          }}
                          className={`p-1.5 rounded-full transition-colors ${
                            isBookmarked ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'
                          }`}
                        >
                          <Bookmark size={16} />
                        </button>
                      </div>
                    </div>
                    
                    <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{article.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="bg-gray-100 px-2 py-1 rounded-full">
                          {article.category}
                        </span>
                        <span>•</span>
                        <span>{article.readTime}</span>
                      </div>
                      <ChevronRight size={18} className="text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-4 mb-12">
            {filteredArticles.map((article) => {
              const Icon = article.icon;
              const gradient = getCategoryGradient(article.color);
              const isBookmarked = bookmarkedArticles.includes(article.id);
              const isLiked = likedArticles.includes(article.id);

              return (
                <div
                  key={article.id}
                  className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
                  onClick={() => handleArticleClick(article)}
                >
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-r ${gradient} text-white flex-shrink-0`}>
                        <Icon size={24} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                            {article.title}
                          </h3>
                          <div className="flex items-center gap-1 ml-4">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleLike(article.id);
                              }}
                              className={`p-1.5 rounded-full transition-colors ${
                                isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                              }`}
                            >
                              <ThumbsUp size={16} />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleBookmark(article.id);
                              }}
                              className={`p-1.5 rounded-full transition-colors ${
                                isBookmarked ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'
                              }`}
                            >
                              <Bookmark size={16} />
                            </button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{article.description}</p>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span className="bg-gray-100 px-2 py-1 rounded-full">
                            {article.category}
                          </span>
                          <span>•</span>
                          <span>{article.readTime}</span>
                          <span>•</span>
                          <span>{article.reads} reads</span>
                        </div>
                      </div>
                      <ChevronRight size={20} className="text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* FAQ Section */}
        <div className="mb-12" id="faq-section">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
          <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => (
                <div key={faq.id} className="border-b border-gray-100 last:border-0">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-gray-800">{faq.question}</span>
                    <ChevronRight
                      size={18}
                      className={`text-gray-400 transition-transform ${
                        openFaq === index ? 'rotate-90' : ''
                      }`}
                    />
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-4 text-gray-600 text-sm border-t border-gray-100 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <HelpCircle size={40} className="text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No matching questions found.</p>
              </div>
            )}
          </div>
        </div>

        {/* Contact Options */}
        <div className="mb-12" id="contact-section">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Still Need Help?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Live Chat */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 text-center hover:shadow-lg transition-all hover-lift stagger-item">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircleIcon size={32} className="text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Live Chat</h3>
              <p className="text-sm text-gray-600 mb-4">
                Chat with our support team in real-time
              </p>
              <p className="text-xs text-green-600 mb-3">Average response: 2 minutes</p>
              <button
                onClick={() => {
                  setSelectedArticle(null);
                  toast.success('Connecting you to a support agent...');
                }}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Start Chat
              </button>
            </div>

            {/* Email Support */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 text-center hover:shadow-lg transition-all hover-lift stagger-item" style={{ animationDelay: '0.1s' }}>
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MailIcon size={32} className="text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Email Support</h3>
              <p className="text-sm text-gray-600 mb-4">
                Send us an email and we'll get back to you
              </p>
              <p className="text-xs text-purple-600 mb-3">Response within 24 hours</p>
              <button
                onClick={() => window.location.href = 'mailto:support@bizcraft.com'}
                className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
              >
                Email Us
              </button>
            </div>

            {/* Phone Support */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 text-center hover:shadow-lg transition-all hover-lift stagger-item" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <PhoneIcon size={32} className="text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Phone Support</h3>
              <p className="text-sm text-gray-600 mb-4">
                Talk to a support specialist directly
              </p>
              <p className="text-xs text-green-600 mb-3">Mon-Fri, 9am-6pm EST</p>
              <button
                onClick={() => window.location.href = 'tel:+18005551234'}
                className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
              >
                Call Now
              </button>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Send Us a Message</h2>
          <p className="text-gray-600 mb-6">Fill out the form below and we'll get back to you as soon as possible.</p>
          
          {formSubmitted ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <CheckCircle size={48} className="text-green-500 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-green-800 mb-2">Message Sent!</h3>
              <p className="text-green-600">Thank you for contacting us. We'll respond within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
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
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={contactForm.subject}
                  onChange={handleContactChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="How can we help?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  name="message"
                  value={contactForm.message}
                  onChange={handleContactChange}
                  required
                  rows="5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tell us more about your question or issue..."
                />
              </div>
              <button
                type="submit"
                disabled={contactLoading}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {contactLoading ? (
                  <>
                    <Loader size={18} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Additional Resources */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-8 border border-blue-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Video Tutorials</h3>
              <p className="text-gray-600 mb-4">
                Watch our step-by-step video guides to master BizCraft features.
              </p>
              <button
                onClick={() => navigate('/guides')}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
              >
                <PlayCircle size={18} />
                Watch Tutorials
              </button>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Documentation</h3>
              <p className="text-gray-600 mb-4">
                Access detailed technical documentation and API references.
              </p>
              <button
                onClick={() => navigate('/docs')}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors inline-flex items-center gap-2"
              >
                <FileJson size={18} />
                Read Docs
              </button>
            </div>
          </div>
        </div>

        {/* Community Section */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Join Our Community</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Connect with other BizCraft users, share tips, and get help from the community.
          </p>
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => window.open('https://twitter.com/bizcraft', '_blank')}
              className="p-3 bg-gray-100 rounded-full hover:bg-blue-100 hover:text-blue-600 transition-colors"
            >
              <Twitter size={20} />
            </button>
            <button 
              onClick={() => window.open('https://facebook.com/bizcraft', '_blank')}
              className="p-3 bg-gray-100 rounded-full hover:bg-blue-100 hover:text-blue-600 transition-colors"
            >
              <Facebook size={20} />
            </button>
            <button 
              onClick={() => window.open('https://linkedin.com/company/bizcraft', '_blank')}
              className="p-3 bg-gray-100 rounded-full hover:bg-blue-100 hover:text-blue-600 transition-colors"
            >
              <Linkedin size={20} />
            </button>
            <button 
              onClick={() => window.open('https://youtube.com/bizcraft', '_blank')}
              className="p-3 bg-gray-100 rounded-full hover:bg-red-100 hover:text-red-600 transition-colors"
            >
              <Youtube size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-10 text-sm mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <h3 className="text-white font-semibold mb-3 text-sm">BizCraft</h3>
              <p className="text-xs leading-relaxed">
                Professional business solutions for serious entrepreneurs.
              </p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-3 text-xs uppercase tracking-wider">Help Center</h4>
              <ul className="space-y-1.5 text-xs">
                <li><button onClick={() => navigate('/help')} className="hover:text-white transition-colors">All Articles</button></li>
                <li><button onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                  document.getElementById('faq-section')?.scrollIntoView({ behavior: 'smooth' });
                }} className="hover:text-white transition-colors">FAQ</button></li>
                <li><button onClick={() => navigate('/guides')} className="hover:text-white transition-colors">Guides</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-3 text-xs uppercase tracking-wider">Support</h4>
              <ul className="space-y-1.5 text-xs">
                <li><button onClick={() => navigate('/contact')} className="hover:text-white transition-colors">Contact Us</button></li>
                <li><button onClick={() => {
                  toast.success('Connecting you to a support agent...');
                }} className="hover:text-white transition-colors">Live Chat</button></li>
                <li><a href="mailto:support@bizcraft.com" className="hover:text-white transition-colors">Email</a></li>
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
            <p>&copy; 2024 BizCraft. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HelpCenter;