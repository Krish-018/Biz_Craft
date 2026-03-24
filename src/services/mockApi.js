// src/services/mockApi.js
import { allGuides } from '../data/guidesData';
// Mock user data
const mockUsers = [
  {
    id: 1,
    name: 'Demo User',
    email: 'demo@bizcraft.com',
    password: 'demo123',
    role: 'user'
  },
  {
    id: 2,
    name: 'Admin User',
    email: 'admin@bizcraft.com',
    password: 'admin123',
    role: 'admin'
  },
  {
    id: 3,
    name: 'John Baker',
    email: 'john@example.com',
    password: 'password123',
    role: 'user'
  }
];

// Mock authentication
export const mockLogin = async (email, password) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));

  const user = mockUsers.find(u => u.email === email && u.password === password);
  
  if (user) {
    const { password, ...userWithoutPassword } = user;
    return {
      success: true,
      data: {
        user: userWithoutPassword,
        token: 'mock-jwt-token-' + Date.now()
      }
    };
  }
  
  return {
    success: false,
    error: 'Invalid email or password'
  };
};

export const mockRegister = async (userData) => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const existingUser = mockUsers.find(u => u.email === userData.email);
  
  if (existingUser) {
    return {
      success: false,
      error: 'User already exists'
    };
  }
  
  const newUser = {
    id: mockUsers.length + 1,
    ...userData,
    role: 'user'
  };
  
  mockUsers.push(newUser);
  
  const { password, ...userWithoutPassword } = newUser;
  
  return {
    success: true,
    data: {
      user: userWithoutPassword,
      token: 'mock-jwt-token-' + Date.now()
    }
  };
};

// Mock guides data (from your GuidesPage)
export const mockGuides = [
  {
    id: 1,
    title: 'The Complete Guide to Starting a Bakery Business',
    subtitle: 'From Home Baker to Bakery Owner',
    description: 'A step-by-step guide to launching and growing a successful bakery business, from concept to first million in revenue.',
    longDescription: `This comprehensive guide takes you from the initial dream of owning a bakery to running a profitable business. Whether you're starting from your home kitchen or opening a storefront, you'll learn everything about recipes, equipment, staffing, marketing, and scaling your bakery.`,
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
    tags: ['bakery', 'food business', 'small business', 'baking'],
    language: 'English',
    pages: 156,
    featured: true,
    popular: true,
    trending: true,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&h=400&fit=crop',
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
      'Choose the right bakery concept',
      'Source equipment on a startup budget',
      'Develop signature recipes',
      'Price products for profit',
      'Hire and train bakery staff',
      'Scale from home kitchen to commercial space'
    ],
    chapters: [
      'Choosing Your Bakery Concept',
      'Business Planning & Licenses',
      'Equipment & Supply Sourcing',
      'Recipe Development & Scaling',
      'Staffing & Training',
      'Marketing Your Bakery',
      'Financial Management',
      'Growth & Expansion'
    ],
    relatedIds: [2, 3, 4, 5]
  },
  {
    id: 2,
    title: 'Coffee Shop Success: From Beans to Business',
    subtitle: 'The Ultimate Guide to Opening a Profitable Cafe',
    description: 'Everything you need to know about starting and running a successful coffee shop.',
    longDescription: `The coffee industry is booming, but competition is fierce. This guide gives you the insider knowledge needed to stand out and thrive in the coffee shop business.`,
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
    tags: ['coffee', 'cafe', 'food and beverage', 'hospitality'],
    language: 'English',
    pages: 182,
    featured: true,
    popular: true,
    trending: false,
    image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&h=400&fit=crop',
    icon: '☕',
    color: 'from-amber-700 to-brown-600',
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-700',
    includes: [
      '182-page comprehensive guide',
      'Equipment ROI calculator',
      'Barista training manual',
      'Coffee sourcing checklist',
      'Menu pricing templates'
    ],
    learningObjectives: [
      'Source and roast coffee beans',
      'Choose the right espresso equipment',
      'Train baristas consistently',
      'Design an inviting cafe space',
      'Create a profitable menu',
      'Build customer loyalty'
    ],
    chapters: [
      'The Coffee Industry Landscape',
      'Coffee Sourcing & Relationships',
      'Equipment Selection Guide',
      'Cafe Design & Layout',
      'Barista Training Systems',
      'Menu Development & Pricing',
      'Marketing & Community Building',
      'Financial Management',
      'Multi-Location Expansion'
    ],
    relatedIds: [1, 3, 5, 7]
  },
  {
    id: 3,
    title: 'Convenience Store Empire: The Complete Business Guide',
    subtitle: 'From Single Store to Regional Chain',
    description: 'Master the art of running a profitable convenience store, including inventory management and vendor relationships.',
    longDescription: `Convenience stores are everywhere, but few are truly profitable. This guide reveals the secrets of successful convenience store owners who've built thriving businesses in competitive markets.`,
    category: 'guides',
    type: 'PDF Guide',
    format: 'PDF',
    readTime: '50 min',
    rating: 4.7,
    level: 'Intermediate',
    difficulty: 'Intermediate',
    downloads: 8760,
    views: 23400,
    likes: 1980,
    bookmarks: 1345,
    shares: 980,
    author: 'Robert Chen',
    authorAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop',
    authorRole: 'Retail Expert & Chain Owner',
    authorBio: 'Robert built a chain of 23 convenience stores before selling and becoming a retail consultant.',
    publishedDate: '2024-01-22',
    lastUpdated: '2024-02-28',
    tags: ['convenience store', 'retail', 'small business', 'inventory management'],
    language: 'English',
    pages: 168,
    featured: false,
    popular: true,
    trending: false,
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=800&h=400&fit=crop',
    icon: '🏪',
    color: 'from-blue-600 to-cyan-600',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-600',
    includes: [
      '168-page comprehensive guide',
      'Inventory management spreadsheet',
      'Vendor comparison worksheet',
      'Staff scheduling templates',
      'Profit margin calculator',
      'Location scorecard'
    ],
    learningObjectives: [
      'Select profitable locations',
      'Manage inventory effectively',
      'Negotiate with vendors',
      'Optimize product mix',
      'Schedule staff efficiently',
      'Add high-margin services',
      'Expand to multiple locations'
    ],
    chapters: [
      'The Convenience Store Industry',
      'Location Selection Criteria',
      'Store Layout & Design',
      'Inventory Management Systems',
      'Vendor Relationships',
      'Product Mix Optimization',
      'Staffing & Operations',
      'Financial Management',
      'Growth & Expansion'
    ],
    relatedIds: [1, 2, 4, 7]
  }
];

// Mock suppliers data
export const mockSuppliers = [
  {
    id: 1,
    name: 'Premium Bakery Supplies',
    category: 'Food Equipment',
    location: 'Chicago, IL',
    rating: 4.8,
    products: 156,
    verified: true,
    image: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=200&h=200&fit=crop',
    description: 'High-quality bakery equipment and supplies for commercial bakeries.'
  },
  {
    id: 2,
    name: 'Coffee Bean International',
    category: 'Coffee & Beverage',
    location: 'Portland, OR',
    rating: 4.9,
    products: 89,
    verified: true,
    image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=200&h=200&fit=crop',
    description: 'Premium coffee beans sourced from sustainable farms worldwide.'
  },
  {
    id: 3,
    name: 'Restaurant Supply Co',
    category: 'Restaurant Equipment',
    location: 'Miami, FL',
    rating: 4.7,
    products: 423,
    verified: true,
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=200&h=200&fit=crop',
    description: 'Complete restaurant equipment and supplies for all types of food service.'
  }
];

// Mock calculators data
export const mockCalculators = [
  {
    id: 1,
    name: 'GST Calculator',
    type: 'Tax',
    uses: 1234,
    icon: '💰',
    description: 'Calculate GST for your business transactions'
  },
  {
    id: 2,
    name: 'Profit Margin Calculator',
    type: 'Finance',
    uses: 987,
    icon: '📊',
    description: 'Calculate profit margins and pricing strategies'
  },
  {
    id: 3,
    name: 'Business Loan Calculator',
    type: 'Finance',
    uses: 756,
    icon: '🏦',
    description: 'Calculate loan payments and interest'
  }
];

// Mock verify token
export const mockVerifyToken = async (token) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  if (token && token.startsWith('mock-jwt-token-')) {
    // Extract user info from mock users
    const user = mockUsers[0]; // For demo, return first user
    const { password, ...userWithoutPassword } = user;
    return {
      success: true,
      data: {
        user: userWithoutPassword
      }
    };
  }
  
  return {
    success: false,
    error: 'Invalid token'
  };
};