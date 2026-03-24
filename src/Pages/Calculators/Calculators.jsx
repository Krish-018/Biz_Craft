// src/Pages/Calculators/CalculatorsPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useDashboard } from "../../context/DashboardContext";
import {
  Calculator,
  DollarSign,
  Percent,
  TrendingUp,
  Home,
  Car,
  Briefcase,
  PieChart,
  LineChart,
  BarChart3,
  Wallet,
  CreditCard,
  Landmark,
  PiggyBank,
  Gift,
  Award,
  Search,
  Filter,
  Star,
  Clock,
  Users,
  BookOpen,
  Shield,
  Zap,
  Sparkles,
  Plus,
  Check,
  Grid,
  List,
  ChevronRight,
  X
} from "lucide-react";
import { toast } from "react-hot-toast";

// Styles
const styles = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .animate-float {
    animation: float 4s ease-in-out infinite;
  }
  
  .animate-slideUp {
    animation: slideUp 0.4s ease-out forwards;
  }
  
  .hover-lift {
    transition: all 0.2s ease;
  }
  
  .hover-lift:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 20px -5px rgba(59, 130, 246, 0.2);
  }
`;

// Calculators Data
const calculatorsData = [
  {
    id: "profit-margin",
    name: "Profit Margin Calculator",
    description: "Calculate profit margins, markup, and optimal pricing for your products",
    longDescription: "Determine your profit margins, markup percentages, and optimal selling prices. Perfect for retail, e-commerce, and manufacturing businesses.",
    category: "finance",
    icon: DollarSign,
    color: "green",
    popular: true,
    featured: true,
    uses: 15234,
    rating: 4.9,
    lastUpdated: "2024-03-15"
  },
  {
    id: "loan-emi",
    name: "Loan EMI Calculator",
    description: "Calculate EMI, total interest, and loan repayment schedules",
    longDescription: "Plan your loans better with detailed EMI calculations, amortization schedules, and total interest payable.",
    category: "finance",
    icon: CreditCard,
    color: "blue",
    popular: true,
    featured: true,
    uses: 12345,
    rating: 4.8,
    lastUpdated: "2024-03-14"
  },
  {
    id: "gst-calculator",
    name: "GST Calculator",
    description: "Calculate GST for invoices, tax returns, and pricing",
    longDescription: "Easily calculate GST for your business transactions. Supports multiple tax slabs and reverse calculations.",
    category: "tax",
    icon: Percent,
    color: "purple",
    popular: true,
    featured: false,
    uses: 9876,
    rating: 4.7,
    lastUpdated: "2024-03-13"
  },
  {
    id: "roi-calculator",
    name: "ROI Calculator",
    description: "Calculate return on investment for business decisions",
    longDescription: "Evaluate investment opportunities with comprehensive ROI analysis, payback period, and net present value calculations.",
    category: "finance",
    icon: TrendingUp,
    color: "orange",
    popular: true,
    featured: true,
    uses: 8765,
    rating: 4.8,
    lastUpdated: "2024-03-12"
  },
  {
    id: "break-even",
    name: "Break-Even Analyzer",
    description: "Find your break-even point and profitability threshold",
    longDescription: "Determine how many units you need to sell to cover costs and start making a profit.",
    category: "finance",
    icon: BarChart3,
    color: "red",
    popular: false,
    featured: false,
    uses: 6543,
    rating: 4.6,
    lastUpdated: "2024-03-11"
  },
  {
    id: "vat-calculator",
    name: "VAT Calculator",
    description: "Calculate VAT for international transactions",
    longDescription: "Handle VAT calculations for cross-border transactions with support for multiple VAT rates.",
    category: "tax",
    icon: Percent,
    color: "indigo",
    popular: false,
    featured: false,
    uses: 5432,
    rating: 4.5,
    lastUpdated: "2024-03-10"
  },
  {
    id: "income-tax",
    name: "Income Tax Calculator",
    description: "Estimate personal and business income tax",
    longDescription: "Calculate estimated income tax liability with deductions and tax slabs. Supports multiple tax regimes.",
    category: "tax",
    icon: Landmark,
    color: "yellow",
    popular: true,
    featured: false,
    uses: 10987,
    rating: 4.7,
    lastUpdated: "2024-03-09"
  },
  {
    id: "compound-interest",
    name: "Compound Interest Calculator",
    description: "Calculate compound interest for investments",
    longDescription: "See how your investments grow with compound interest. Perfect for retirement planning and long-term investments.",
    category: "investment",
    icon: PiggyBank,
    color: "emerald",
    popular: false,
    featured: false,
    uses: 7654,
    rating: 4.8,
    lastUpdated: "2024-03-08"
  },
  {
    id: "discount-calculator",
    name: "Discount Calculator",
    description: "Calculate final prices after discounts",
    longDescription: "Determine sale prices, discount amounts, and savings percentages for your products.",
    category: "finance",
    icon: Gift,
    color: "pink",
    popular: true,
    featured: false,
    uses: 8765,
    rating: 4.6,
    lastUpdated: "2024-03-07"
  },
  {
    id: "currency-converter",
    name: "Currency Converter",
    description: "Convert between different currencies",
    longDescription: "Real-time currency conversion for international business transactions.",
    category: "finance",
    icon: Wallet,
    color: "cyan",
    popular: true,
    featured: false,
    uses: 23456,
    rating: 4.9,
    lastUpdated: "2024-03-06"
  },
  {
    id: "mortgage-calculator",
    name: "Mortgage Calculator",
    description: "Calculate monthly mortgage payments",
    longDescription: "Plan your property purchase with detailed mortgage calculations including interest and amortization.",
    category: "loan",
    icon: Home,
    color: "blue",
    popular: false,
    featured: false,
    uses: 5432,
    rating: 4.7,
    lastUpdated: "2024-03-05"
  },
  {
    id: "car-loan-calculator",
    name: "Car Loan Calculator",
    description: "Calculate auto loan payments and interest",
    longDescription: "Plan your vehicle purchase with accurate car loan calculations.",
    category: "loan",
    icon: Car,
    color: "orange",
    popular: false,
    featured: false,
    uses: 4321,
    rating: 4.6,
    lastUpdated: "2024-03-04"
  }
];

const CalculatorsPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addToDashboard, isInDashboard } = useDashboard();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: "all", name: "All Calculators", count: calculatorsData.length },
    { id: "finance", name: "Finance", count: calculatorsData.filter(c => c.category === "finance").length },
    { id: "tax", name: "Tax", count: calculatorsData.filter(c => c.category === "tax").length },
    { id: "loan", name: "Loan", count: calculatorsData.filter(c => c.category === "loan").length },
    { id: "investment", name: "Investment", count: calculatorsData.filter(c => c.category === "investment").length }
  ];

  const filteredCalculators = calculatorsData.filter(calc => {
    const matchesSearch = calc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         calc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || calc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToDashboard = (calc, e) => {
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

    addToDashboard('calculators', {
      id: calc.id,
      name: calc.name,
      description: calc.description,
      category: calc.category,
      icon: calc.icon.name,
      color: calc.color
    });
  };

  const CalculatorCard = ({ calc }) => {
    const Icon = calc.icon;
    const inDashboard = isInDashboard('calculators', calc.id);

    return (
      <div
        onClick={() => navigate(`/calculators/${calc.id}`)}
        className="group relative bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all cursor-pointer overflow-hidden hover-lift"
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 bg-${calc.color}-100 rounded-lg`}>
              <Icon className={`w-6 h-6 text-${calc.color}-600`} />
            </div>
            <div className="flex gap-1">
              <button
                onClick={(e) => handleAddToDashboard(calc, e)}
                disabled={inDashboard}
                className={`p-1.5 rounded-lg transition-all hover:scale-110 ${
                  inDashboard 
                    ? 'bg-green-500 text-white cursor-default' 
                    : 'bg-gray-100 text-gray-600 hover:bg-blue-600 hover:text-white'
                }`}
                title={inDashboard ? 'Already in dashboard' : 'Add to dashboard'}
              >
                {inDashboard ? <Check size={16} /> : <Plus size={16} />}
              </button>
            </div>
          </div>

          {/* Content */}
          <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
            {calc.name}
          </h3>
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{calc.description}</p>

          {/* Stats */}
          <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
            <span className="flex items-center gap-1">
              <Users size={12} />
              {calc.uses.toLocaleString()} uses
            </span>
            <span className="flex items-center gap-1">
              <Star size={12} className="text-yellow-400 fill-current" />
              {calc.rating}
            </span>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <span className={`text-xs px-2 py-1 bg-${calc.color}-100 text-${calc.color}-600 rounded-full`}>
              {calc.category}
            </span>
            <ChevronRight size={16} className="text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <style>{styles}</style>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-float" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-yellow-300 rounded-full mix-blend-overlay filter blur-3xl animate-float" />
        </div>

        <div className="relative px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center gap-4 mb-6">
              <Calculator className="w-12 h-12 text-white" />
              <DollarSign className="w-12 h-12 text-white" />
              <Percent className="w-12 h-12 text-white" />
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Business Calculators
            </h1>
            <p className="text-sm md:text-lg text-white/90 mb-6 max-w-2xl mx-auto">
              Powerful financial calculators to help you make informed business decisions
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-6">
              <div className="text-center">
                <div className="text-xl font-bold text-white">{calculatorsData.length}+</div>
                <div className="text-xs text-white/70">Calculators</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-white">100k+</div>
                <div className="text-xs text-white/70">Calculations</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-white">4.8</div>
                <div className="text-xs text-white/70">Rating</div>
              </div>
            </div>

            {/* Search */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search calculators..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-12 py-4 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white shadow-xl"
              />
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 bg-gray-100/80 backdrop-blur-sm text-gray-600 rounded-lg hover:bg-gray-200"
              >
                <Filter size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 -mt-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-2">
          <div className="flex overflow-x-auto pb-2 gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                  selectedCategory === category.id
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <span className="text-sm font-medium">{category.name}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  selectedCategory === category.id
                    ? "bg-white/20 text-white"
                    : "bg-gray-300 text-gray-600"
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="px-4 mb-6 animate-slideUp">
          <div className="bg-white rounded-xl shadow-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <Filter size={16} />
                Filters
              </h3>
              <button
                onClick={() => setSelectedCategory("all")}
                className="text-xs text-blue-600 hover:text-blue-700"
              >
                Clear all
              </button>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex-1 px-3 py-2 rounded-lg text-sm flex items-center justify-center gap-2 ${
                  viewMode === 'grid'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Grid size={14} />
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex-1 px-3 py-2 rounded-lg text-sm flex items-center justify-center gap-2 ${
                  viewMode === 'list'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <List size={14} />
                List
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Results Header */}
      <div className="px-4 mb-4">
        <p className="text-sm text-gray-600">
          Showing <span className="font-semibold">{filteredCalculators.length}</span> calculators
        </p>
      </div>

      {/* Calculators Grid */}
      <div className="px-4">
        {filteredCalculators.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <Calculator size={48} className="mx-auto text-gray-300 mb-3" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No calculators found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search</p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredCalculators.map(calc => (
              <CalculatorCard key={calc.id} calc={calc} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Calculator</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Category</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Uses</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Rating</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCalculators.map(calc => {
                  const Icon = calc.icon;
                  const inDashboard = isInDashboard('calculators', calc.id);
                  return (
                    <tr 
                      key={calc.id} 
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => navigate(`/calculators/${calc.id}`)}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className={`p-2 bg-${calc.color}-100 rounded`}>
                            <Icon size={16} className={`text-${calc.color}-600`} />
                          </div>
                          <span className="font-medium text-gray-800">{calc.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 bg-${calc.color}-100 text-${calc.color}-600 text-xs rounded-full`}>
                          {calc.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{calc.uses.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <Star size={12} className="text-yellow-400 fill-current" />
                          <span className="text-sm">{calc.rating}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToDashboard(calc, e);
                          }}
                          disabled={inDashboard}
                          className={`p-1 rounded ${
                            inDashboard ? 'text-green-600' : 'text-gray-400 hover:text-blue-600'
                          }`}
                        >
                          {inDashboard ? <Check size={16} /> : <Plus size={16} />}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Newsletter Section */}
      <div className="px-4 mt-8">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 md:p-8 text-white">
          <div className="max-w-2xl mx-auto text-center">
            <Calculator size={32} className="mx-auto mb-4 opacity-80" />
            <h3 className="text-xl md:text-2xl font-bold mb-2">Need a custom calculator?</h3>
            <p className="text-sm md:text-base text-white/90 mb-6">
              Contact us for custom calculator development tailored to your business needs
            </p>
            <button className="px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-all">
              Request Custom Calculator
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorsPage;