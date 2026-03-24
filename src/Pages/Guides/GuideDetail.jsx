// src/Pages/Guides/GuideDetail.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import {
  ArrowLeft,
  BookOpen,
  Download,
  Share2,
  Bookmark,
  Heart,
  Clock,
  Calendar,
  User,
  Tag,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Award,
  Star,
  CheckCircle,
  X,
  Printer,
  Mail,
  Facebook,
  Twitter,
  Linkedin,
  Link as LinkIcon,
  ThumbsUp,
  MessageCircle,
  Eye
} from 'lucide-react';
import { toast } from 'react-hot-toast';

// Complete Business Guides Data
const guidesData = [
  // 🍞 BAKERY BUSINESS GUIDE
  {
    id: 1,
    title: 'The Complete Guide to Starting a Bakery Business',
    subtitle: 'From Home Baker to Bakery Owner',
    description: 'A step-by-step guide to launching and growing a successful bakery business, from concept to first million in revenue.',
    longDescription: `This comprehensive guide takes you from the initial dream of owning a bakery to running a profitable business. Whether you're starting from your home kitchen or opening a storefront, you'll learn everything about recipes, equipment, staffing, marketing, and scaling your bakery.

    **What makes this guide unique:**
    • Real cost breakdowns for different bakery types
    • Recipe scaling secrets from professional bakers
    • Equipment sourcing on any budget
    • Staff training systems that work
    • Marketing strategies that actually sell pastries
    
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
    authorBio: 'Marie has helped over 200 bakeries start and scale across Europe and North America. She trained at Le Cordon Bleu in Paris and has owned three successful bakeries herself.',
    
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
    
    includes: [
      '156-page comprehensive guide',
      'Equipment checklist PDF',
      'Recipe scaling calculator (Excel)',
      'Staff training templates',
      '12-month marketing calendar',
      'Financial projections spreadsheet',
      'Sample business plan',
      'Supplier directory with 50+ contacts'
    ],
    
    learningObjectives: [
      'Choose the right bakery concept for your market',
      'Source equipment on a startup budget',
      'Develop signature recipes that sell',
      'Price products for profit',
      'Hire and train bakery staff',
      'Market to local customers effectively',
      'Scale from home kitchen to commercial space',
      'Navigate health department regulations'
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
    • Coffee sourcing and roasting partnerships
    • Espresso machine buying guide for every budget
    • Barista training programs that work
    • Creating a memorable customer experience
    • Building a loyal customer base
    • Expanding to multiple locations
    
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
    authorBio: 'James has opened 7 successful coffee shops and consulted for over 50 cafes worldwide. He is a World Barista Championship finalist and author of "The Professional Barista\'s Handbook."',
    
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
    
    includes: [
      '182-page comprehensive guide',
      'Equipment ROI calculator',
      'Barista training manual',
      'Coffee sourcing checklist',
      'Menu pricing templates',
      'Customer loyalty program guide',
      'Shop layout blueprints',
      'Staff schedule templates'
    ],
    
    learningObjectives: [
      'Source and roast coffee beans',
      'Choose the right espresso equipment',
      'Train baristas to consistently produce quality drinks',
      'Design an inviting cafe space',
      'Create a profitable menu',
      'Build customer loyalty',
      'Scale to multiple locations',
      'Manage inventory effectively'
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
    • Perfect dough recipes for every style
    • Sauce making from scratch
    • Cheese selection and blends
    • Oven selection (wood-fired, deck, conveyor)
    • Topping combinations that sell
    • Delivery vs. dine-in operations
    
    **Business systems that work:**
    • Location selection for pizza
    • Kitchen workflow optimization
    • Delivery logistics
    • Catering and events
    • Building a local following
    • Franchising opportunities
    
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
    authorBio: 'Tony has won more pizza competitions than anyone and owns 15 successful pizza restaurants. He is the author of "The Pizza Bible" and has trained pizzaiolos worldwide.',
    
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
    
    includes: [
      '210-page comprehensive guide',
      'Recipe book with 15 signature pizzas',
      'Dough calculator spreadsheet',
      'Equipment buying guide',
      'Kitchen layout templates',
      'Marketing calendar',
      'Delivery route optimizer',
      'Staff training videos (QR codes)'
    ],
    
    learningObjectives: [
      'Master pizza dough for any style',
      'Choose the right oven for your concept',
      'Design an efficient kitchen workflow',
      'Create a profitable menu',
      'Build a delivery operation',
      'Develop catering business',
      'Create a recognizable brand',
      'Train staff to maintain quality'
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
    • Boutique studio (yoga, Pilates, spin)
    • CrossFit-style box
    • Traditional gym
    • Personal training studio
    • Multi-purpose fitness center
    
    **Business systems:**
    • Membership models that work
    • Retention strategies
    • Personal trainer hiring & training
    • Equipment financing
    • Group class programming
    • Corporate wellness programs
    • Online training integration
    
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
    authorBio: 'Jillian has helped millions get fit and has built multiple successful fitness businesses. She is a New York Times bestselling author and has been featured on major media outlets worldwide.',
    
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
    
    includes: [
      '195-page comprehensive guide',
      'Membership pricing calculator',
      'Personal trainer agreement templates',
      'Class schedule planner',
      'Equipment ROI spreadsheet',
      'Retention strategies workbook',
      'Marketing campaign templates',
      'Sample workout programs'
    ],
    
    learningObjectives: [
      'Choose the right fitness concept',
      'Design effective membership models',
      'Hire and train fitness professionals',
      'Create engaging class programs',
      'Retain members long-term',
      'Add corporate wellness programs',
      'Integrate online training',
      'Scale to multiple locations'
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
    • Reusable household items
    • Sustainable fashion
    • Natural personal care
    • Eco-friendly packaging
    • Zero-waste lifestyle products
    • Green cleaning supplies
    
    **Business essentials:**
    • Sourcing sustainable materials
    • Finding ethical manufacturers
    • Certifications that matter
    • Marketing to conscious consumers
    • Packaging and shipping sustainably
    • Building a brand story
    • Measuring your impact
    
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
    authorBio: 'Lauren founded a successful zero-waste store and has helped hundreds of entrepreneurs start eco-friendly businesses. She is a TED speaker and has been featured in Forbes, Vogue, and The New York Times.',
    
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
    
    includes: [
      '145-page comprehensive guide',
      'Supplier sourcing directory (200+ contacts)',
      'Certification checklist',
      'Sustainable packaging guide',
      'Impact measurement tools',
      'Marketing templates',
      'Brand story workbook',
      'Sample product descriptions'
    ],
    
    learningObjectives: [
      'Identify profitable eco-friendly niches',
      'Source sustainable materials',
      'Find ethical manufacturers',
      'Obtain meaningful certifications',
      'Market to conscious consumers',
      'Package products sustainably',
      'Measure and communicate impact',
      'Build a transparent supply chain'
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
    • Finding your first clients
    • Pricing projects profitably
    • Hiring developers and designers
    • Project management systems
    • Quality assurance processes
    • Client communication
    • Scaling to multiple teams
    
    **Specialized knowledge:**
    • iOS vs. Android strategy
    • Cross-platform frameworks
    • UI/UX best practices
    • App store optimization
    • Post-launch support
    • Recurring revenue models
    
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
    authorBio: 'Sarah started as a freelance developer and built a 50-person agency serving Fortune 500 clients. She has been featured in Inc. Magazine as one of the top female entrepreneurs in tech.',
    
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
    
    includes: [
      '178-page comprehensive guide',
      'Client contract templates',
      'Project estimation worksheet',
      'Hiring & interview guides',
      'Project management templates',
      'Quality assurance checklist',
      'Recurring revenue models',
      'Sales script templates'
    ],
    
    learningObjectives: [
      'Find and close high-paying clients',
      'Price projects profitably',
      'Hire and manage development teams',
      'Implement effective project management',
      'Ensure quality deliverables',
      'Build recurring revenue',
      'Scale to multi-team agency',
      'Master client communication'
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
    • Finding profitable properties
    • Financing your first rental
    • Setting up for success
    • Photography that sells
    • Writing compelling listings
    • Pricing strategies
    • Guest communication
    
    **Scaling up:**
    • Managing multiple properties
    • Hiring cleaning teams
    • Co-hosting arrangements
    • Dynamic pricing tools
    • Automation systems
    • Handling difficult guests
    • Expanding to new markets
    
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
    authorBio: 'Sarah started with one spare room and now manages a portfolio of 25+ properties generating millions annually. She has been featured on the cover of Airbnb Magazine and speaks at hospitality conferences worldwide.',
    
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
    
    includes: [
      '172-page comprehensive guide',
      'Property analysis spreadsheet',
      'Listing template',
      'Welcome book template',
      'Cleaning checklist',
      'Guest communication templates',
      'Dynamic pricing guide',
      'Legal contract templates'
    ],
    
    learningObjectives: [
      'Find profitable rental properties',
      'Finance your first rental',
      'Create listings that convert',
      'Price for maximum revenue',
      'Manage guest communication',
      'Handle cleaning and maintenance',
      'Scale to multiple properties',
      'Navigate local regulations'
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
    • Location and space requirements
    • Studio design and atmosphere
    • Equipment and props
    • Class scheduling
    • Pricing and memberships
    • Teacher hiring and training
    • Workshop and event planning
    
    **Business systems:**
    • Studio management software
    • Marketing to wellness seekers
    • Building community
    • Corporate partnerships
    • Retreats and intensives
    • Teacher trainings
    • Online class offerings
    
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
    authorBio: 'Jessamyn has built a global wellness brand and helped countless teachers start their own studios. She is the author of "Every Body Yoga" and has been featured in Yoga Journal, Cosmopolitan, and The New York Times.',
    
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
    
    includes: [
      '158-page comprehensive guide',
      'Studio layout templates',
      'Membership pricing calculator',
      'Teacher agreement templates',
      'Class schedule planner',
      'Marketing templates',
      'Retreat planning guide',
      'Online class setup guide'
    ],
    
    learningObjectives: [
      'Choose the right studio location',
      'Design an inviting space',
      'Price memberships profitably',
      'Hire and train teachers',
      'Build studio community',
      'Plan workshops and events',
      'Add online offerings',
      'Create signature retreats'
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
    • Branding and identity
    • Web and UI design
    • Print and packaging
    • Marketing collateral
    • Social media graphics
    • Motion graphics
    • Creative direction
    
    **Business systems:**
    • Finding quality clients
    • Creative briefs that work
    • Pricing and proposals
    • Managing creative teams
    • Client feedback cycles
    • Quality control
    • Recurring retainers
    
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
    authorBio: 'Debbie has led design at major brands and helped countless designers build successful agencies. She is the host of the "Design Matters" podcast and a president emeritus of AIGA.',
    
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
    
    includes: [
      '165-page comprehensive guide',
      'Creative brief templates',
      'Pricing calculator',
      'Proposal templates',
      'Client feedback forms',
      'Quality control checklists',
      'Retainer agreement templates',
      'Portfolio building guide'
    ],
    
    learningObjectives: [
      'Find and attract quality clients',
      'Create effective creative briefs',
      'Price projects profitably',
      'Manage creative teams',
      'Handle client feedback',
      'Ensure quality deliverables',
      'Build recurring revenue',
      'Scale your creative business'
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
    • Estimating and bidding accurately
    • Managing cash flow through projects
    • Hiring and training crews
    • Scheduling for efficiency
    • Managing client expectations
    • Handling permits and inspections
    • Building a reliable subcontractor network
    
    **Growth strategies:**
    • Specializing for higher margins
    • Adding design services
    • Building a referral network
    • Digital marketing for contractors
    • Showroom strategies
    • Multi-crew operations
    
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
    authorBio: 'Mike has been in construction for over 40 years and has helped thousands of contractors build successful businesses. He is the star of "Holmes on Homes" and a trusted voice in the renovation industry.',
    
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
    
    includes: [
      '188-page comprehensive guide',
      'Estimating spreadsheet templates',
      'Contract templates',
      'Subcontractor agreements',
      'Project management checklists',
      'Marketing plan templates',
      'Cash flow worksheets',
      'Safety compliance guide'
    ],
    
    learningObjectives: [
      'Estimate projects accurately',
      'Manage project cash flow',
      'Hire and train reliable crews',
      'Schedule for maximum efficiency',
      'Manage client expectations',
      'Build subcontractor networks',
      'Scale to multi-crew operations',
      'Navigate permits and inspections'
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
    • Dog walking and pet sitting
    • Professional grooming
    • Pet boarding and daycare
    • Training and behavior
    • Pet photography
    • Mobile pet services
    • Pet product retail
    
    **Business systems:**
    • Licensing and insurance
    • Pricing your services
    • Scheduling and routing
    • Client communication
    • Handling difficult pets
    • Building a team
    • Expanding services
    
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
    authorBio: 'Cesar has helped millions of dogs and their owners and built a global pet business empire. He is the star of "Dog Whisperer" and has authored multiple New York Times bestselling books.',
    
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
    
    includes: [
      '142-page comprehensive guide',
      'Business plan templates',
      'Pricing calculator',
      'Client intake forms',
      'Service agreements',
      'Safety protocols',
      'Marketing templates',
      'Staff training manual'
    ],
    
    learningObjectives: [
      'Choose the right pet business model',
      'Handle licensing and insurance',
      'Price services profitably',
      'Schedule services efficiently',
      'Communicate with clients',
      'Handle difficult situations',
      'Build and train a team',
      'Expand your service offerings'
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

const GuideDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [guide, setGuide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookmarked, setBookmarked] = useState(false);
  const [liked, setLiked] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showShareMenu, setShowShareMenu] = useState(false);

  useEffect(() => {
    // Find the guide by ID
    const foundGuide = guidesData.find(g => g.id === parseInt(id));
    
    // Simulate loading
    setTimeout(() => {
      if (foundGuide) {
        setGuide(foundGuide);
      }
      setLoading(false);
    }, 500);
  }, [id]);

  const handleBack = () => {
    navigate('/guides');
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    toast.success(bookmarked ? 'Guide removed from bookmarks' : 'Guide bookmarked!', {
      icon: bookmarked ? '🔖' : '📌',
      duration: 2000
    });
  };

  const handleLike = () => {
    setLiked(!liked);
    toast.success(liked ? 'Removed like' : 'Guide liked!', {
      icon: liked ? '💔' : '❤️',
      duration: 2000
    });
  };

  const handleDownload = () => {
    toast.success('Guide download started!', {
      icon: '📥',
      duration: 2000
    });
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = guide?.title || 'BizCraft Guide';
    
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
        setShowShareMenu(false);
        return;
      default:
        return;
    }
    
    window.open(shareUrl, '_blank');
    setShowShareMenu(false);
    toast.success(`Shared on ${platform}!`);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleEmail = () => {
    window.location.href = `mailto:?subject=${encodeURIComponent(guide?.title)}&body=${encodeURIComponent(window.location.href)}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-[80vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
            <p className="text-gray-600">Loading guide...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!guide) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <BookOpen size={64} className="text-gray-300 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Guide Not Found</h1>
            <p className="text-gray-600 mb-6">The guide you're looking for doesn't exist or has been removed.</p>
            <button
              onClick={handleBack}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
            >
              <ArrowLeft size={18} />
              Back to Guides
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section with Cover Image */}
      <div className="relative h-[300px] md:h-[400px] overflow-hidden">
        <img 
          src={guide.coverImage} 
          alt={guide.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
        
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="absolute top-6 left-6 md:top-8 md:left-8 flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg text-gray-700 hover:bg-white transition-all shadow-lg hover:shadow-xl z-10"
        >
          <ArrowLeft size={18} />
          <span className="hidden md:inline">Back to Guides</span>
        </button>

        {/* Title and Meta Info */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white">
          <div className="container mx-auto">
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              {guide.featured && (
                <span className="px-3 py-1 bg-yellow-500 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                  <Sparkles size={12} />
                  Featured
                </span>
              )}
              {guide.trending && (
                <span className="px-3 py-1 bg-orange-500 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                  <TrendingUp size={12} />
                  Trending
                </span>
              )}
              {guide.popular && (
                <span className="px-3 py-1 bg-purple-500 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                  <Award size={12} />
                  Popular
                </span>
              )}
              <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                {guide.type}
              </span>
              <span className="px-3 py-1 bg-green-600 text-white text-xs font-semibold rounded-full">
                {guide.difficulty}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-bold mb-3">{guide.title}</h1>
            
            {/* Subtitle */}
            <p className="text-lg md:text-xl text-gray-200 mb-4">{guide.subtitle}</p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
              <span className="flex items-center gap-1">
                <Clock size={16} />
                {guide.readTime}
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={16} />
                Updated {new Date(guide.lastUpdated).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-1">
                <Eye size={16} />
                {guide.views.toLocaleString()} views
              </span>
              <span className="flex items-center gap-1">
                <Download size={16} />
                {guide.downloads.toLocaleString()} downloads
              </span>
              <span className="flex items-center gap-1">
                <Star size={16} className="text-yellow-400 fill-current" />
                {guide.rating} ({guide.likes} reviews)
              </span>
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
                onClick={handleDownload}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
              >
                <Download size={18} />
                <span>Download</span>
              </button>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <div className="flex space-x-8">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`pb-4 px-1 font-medium text-sm transition-all relative ${
                    activeTab === 'overview'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('content')}
                  className={`pb-4 px-1 font-medium text-sm transition-all relative ${
                    activeTab === 'content'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Table of Contents
                </button>
                <button
                  onClick={() => setActiveTab('includes')}
                  className={`pb-4 px-1 font-medium text-sm transition-all relative ${
                    activeTab === 'includes'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  What's Included
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
              {activeTab === 'overview' && (
                <div className="prose prose-lg max-w-none">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Overview</h2>
                  <div className="whitespace-pre-line text-gray-600 leading-relaxed">
                    {guide.longDescription}
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">What You'll Learn</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {guide.learningObjectives.map((objective, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600">{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'content' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Table of Contents</h2>
                  <div className="space-y-3">
                    {guide.tableOfContents.map((chapter) => (
                      <div key={chapter.chapter} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                            {chapter.chapter}
                          </span>
                          <span className="font-medium text-gray-800">{chapter.title}</span>
                        </div>
                        <span className="text-sm text-gray-500">{chapter.pages}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-4">Total pages: {guide.pages}</p>
                </div>
              )}

              {activeTab === 'includes' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">What's Included</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {guide.includes.map((item, index) => (
                      <div key={index} className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                        <CheckCircle size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1">
            {/* Author Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <h3 className="font-semibold text-gray-800 mb-4">About the Author</h3>
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src={guide.authorAvatar} 
                  alt={guide.author}
                  className="w-16 h-16 rounded-full object-cover border-2 border-blue-600"
                />
                <div>
                  <h4 className="font-medium text-gray-800">{guide.author}</h4>
                  <p className="text-sm text-gray-500">{guide.authorRole}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{guide.authorBio}</p>
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
                  <span>{bookmarked ? 'Bookmarked' : 'Bookmark'}</span>
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
                  <span>{liked ? 'Liked' : 'Like'}</span>
                </button>
                
                <button
                  onClick={handleDownload}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
                >
                  <Download size={18} />
                  <span>Download PDF</span>
                </button>
                
                {/* Share Button with Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all"
                  >
                    <Share2 size={18} />
                    <span>Share</span>
                  </button>
                  
                  {showShareMenu && (
                    <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
                      <button
                        onClick={() => handleShare('facebook')}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                      >
                        <Facebook size={18} className="text-blue-600" />
                        <span className="text-sm">Facebook</span>
                      </button>
                      <button
                        onClick={() => handleShare('twitter')}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                      >
                        <Twitter size={18} className="text-sky-500" />
                        <span className="text-sm">Twitter</span>
                      </button>
                      <button
                        onClick={() => handleShare('linkedin')}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                      >
                        <Linkedin size={18} className="text-blue-700" />
                        <span className="text-sm">LinkedIn</span>
                      </button>
                      <button
                        onClick={() => handleShare('copy')}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors border-t border-gray-100"
                      >
                        <LinkIcon size={18} className="text-gray-600" />
                        <span className="text-sm">Copy Link</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Guide Details Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <h3 className="font-semibold text-gray-800 mb-4">Guide Details</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 flex items-center gap-2">
                    <Tag size={16} />
                    Format
                  </span>
                  <span className="text-sm font-medium text-gray-800">{guide.format}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 flex items-center gap-2">
                    <BookOpen size={16} />
                    Pages
                  </span>
                  <span className="text-sm font-medium text-gray-800">{guide.pages}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 flex items-center gap-2">
                    <Clock size={16} />
                    Reading Time
                  </span>
                  <span className="text-sm font-medium text-gray-800">{guide.readTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 flex items-center gap-2">
                    <Calendar size={16} />
                    Published
                  </span>
                  <span className="text-sm font-medium text-gray-800">
                    {new Date(guide.publishedDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 flex items-center gap-2">
                    <User size={16} />
                    Level
                  </span>
                  <span className="text-sm font-medium text-gray-800">{guide.level}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 flex items-center gap-2">
                    <MessageCircle size={16} />
                    Language
                  </span>
                  <span className="text-sm font-medium text-gray-800">{guide.language}</span>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Topics</h3>
              <div className="flex flex-wrap gap-2">
                {guide.tags.map((tag, index) => (
                  <Link
                    key={index}
                    to={`/guides?tag=${tag}`}
                    className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-gray-200 transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Guides Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Guides You Might Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {guide.relatedIds.map((relatedId) => {
              const relatedGuide = guidesData.find(g => g.id === relatedId);
              if (!relatedGuide) return null;
              
              return (
                <Link
                  key={relatedId}
                  to={`/guides/${relatedId}`}
                  className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all"
                >
                  <div className="h-40 overflow-hidden">
                    <img 
                      src={relatedGuide.thumbnail} 
                      alt={relatedGuide.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {relatedGuide.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">{relatedGuide.readTime}</p>
                    <div className="flex items-center gap-1">
                      <Star size={14} className="text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-700">{relatedGuide.rating}</span>
                      <span className="text-sm text-gray-500">({relatedGuide.downloads.toLocaleString()} downloads)</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Business Journey?</h2>
            <p className="text-lg text-blue-100 mb-6">
              Download this comprehensive guide and get all the resources you need to succeed.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={handleDownload}
                className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
              >
                <Download size={20} />
                Download Now
              </button>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                Back to Top
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuideDetail;