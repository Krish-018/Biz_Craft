// src/Pages/Calculators/CalculatorsPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useDashboard } from "../../context/DashboardContext";
import Navbar from "../../components/Navbar/Navbar";
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
  X,
  Eye,
  Download,
  Save,
  Share2,
  Printer,
  Copy,
  RotateCcw,
  Info,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  Calendar,
  Hash,
  Scale,
  TrendingDown,
  BarChart,
  LineChart as LineChartIcon
} from "lucide-react";
import { toast } from "react-hot-toast";
import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
  BarChart as ReBarChart,
  Bar
} from "recharts";

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
  
  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  .animate-float {
    animation: float 4s ease-in-out infinite;
  }
  
  .animate-slideUp {
    animation: slideUp 0.4s ease-out forwards;
  }
  
  .animate-slideDown {
    animation: slideDown 0.3s ease-out forwards;
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out forwards;
  }
  
  .stagger-item {
    opacity: 0;
    animation: slideUp 0.4s ease-out forwards;
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
  .stagger-item:nth-child(11) { animation-delay: 0.55s; }
  .stagger-item:nth-child(12) { animation-delay: 0.6s; }
  
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
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  
  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type=number] {
    -moz-appearance: textfield;
  }
`;

// Calculator Data with full details
const calculatorsData = [
  {
    id: "profit-margin",
    name: "Profit Margin Calculator",
    shortName: "Profit Margin",
    description: "Calculate profit margins, markup, and optimal pricing for your products",
    longDescription: "Determine your profit margins, markup percentages, and optimal selling prices. Perfect for retail, e-commerce, and manufacturing businesses.",
    category: "finance",
    icon: DollarSign,
    color: "green",
    popular: true,
    featured: true,
    uses: 15234,
    rating: 4.9,
    lastUpdated: "2024-03-15",
    tags: ["profit", "margin", "pricing", "markup"],
    inputs: [
      { name: "costPrice", label: "Cost Price ($)", type: "number", min: 0, step: 0.01, placeholder: "0.00" },
      { name: "sellingPrice", label: "Selling Price ($)", type: "number", min: 0, step: 0.01, placeholder: "0.00" },
      { name: "quantity", label: "Quantity", type: "number", min: 1, step: 1, placeholder: "1", default: 1 }
    ],
    formula: "profit = sellingPrice - costPrice\nprofitMargin = (profit / sellingPrice) * 100\nmarkup = (profit / costPrice) * 100"
  },
  {
    id: "loan-emi",
    name: "Loan EMI Calculator",
    shortName: "EMI Calculator",
    description: "Calculate EMI, total interest, and loan repayment schedules",
    longDescription: "Plan your loans better with detailed EMI calculations, amortization schedules, and total interest payable.",
    category: "finance",
    icon: CreditCard,
    color: "blue",
    popular: true,
    featured: true,
    uses: 12345,
    rating: 4.8,
    lastUpdated: "2024-03-14",
    tags: ["loan", "emi", "interest", "amortization"],
    inputs: [
      { name: "loanAmount", label: "Loan Amount ($)", type: "number", min: 0, step: 1000, placeholder: "10000" },
      { name: "interestRate", label: "Interest Rate (% per annum)", type: "number", min: 0, step: 0.1, placeholder: "8.5" },
      { name: "loanTerm", label: "Loan Term (years)", type: "number", min: 1, max: 30, step: 1, placeholder: "5" }
    ],
    formula: "monthlyRate = interestRate / 12 / 100\nnumberOfPayments = loanTerm * 12\nemi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1)"
  },
  {
    id: "gst-calculator",
    name: "GST Calculator",
    shortName: "GST",
    description: "Calculate GST for invoices, tax returns, and pricing",
    longDescription: "Easily calculate GST for your business transactions. Supports multiple tax slabs and reverse calculations.",
    category: "tax",
    icon: Percent,
    color: "purple",
    popular: true,
    featured: false,
    uses: 9876,
    rating: 4.7,
    lastUpdated: "2024-03-13",
    tags: ["gst", "tax", "invoice", "vat"],
    inputs: [
      { name: "amount", label: "Amount ($)", type: "number", min: 0, step: 0.01, placeholder: "1000" },
      { name: "gstRate", label: "GST Rate (%)", type: "number", min: 0, max: 28, step: 0.1, placeholder: "18" },
      { name: "type", label: "Calculation Type", type: "select", options: ["exclusive", "inclusive"], default: "exclusive" }
    ],
    formula: "exclusive: gst = amount * (gstRate / 100)\ntotal = amount + gst\ninclusive: gst = amount - (amount * 100 / (100 + gstRate))\nbase = amount - gst"
  },
  {
    id: "roi-calculator",
    name: "ROI Calculator",
    shortName: "ROI",
    description: "Calculate return on investment for business decisions",
    longDescription: "Evaluate investment opportunities with comprehensive ROI analysis, payback period, and net present value calculations.",
    category: "finance",
    icon: TrendingUp,
    color: "orange",
    popular: true,
    featured: true,
    uses: 8765,
    rating: 4.8,
    lastUpdated: "2024-03-12",
    tags: ["roi", "investment", "return", "profitability"],
    inputs: [
      { name: "initialInvestment", label: "Initial Investment ($)", type: "number", min: 0, step: 100, placeholder: "10000" },
      { name: "finalValue", label: "Final Value ($)", type: "number", min: 0, step: 100, placeholder: "15000" },
      { name: "years", label: "Time Period (years)", type: "number", min: 1, step: 0.5, placeholder: "3" }
    ],
    formula: "roi = ((finalValue - initialInvestment) / initialInvestment) * 100\nannualizedRoi = (Math.pow(finalValue / initialInvestment, 1 / years) - 1) * 100"
  },
  {
    id: "break-even",
    name: "Break-Even Analyzer",
    shortName: "Break-Even",
    description: "Find your break-even point and profitability threshold",
    longDescription: "Determine how many units you need to sell to cover costs and start making a profit.",
    category: "finance",
    icon: BarChart3,
    color: "red",
    popular: false,
    featured: false,
    uses: 6543,
    rating: 4.6,
    lastUpdated: "2024-03-11",
    tags: ["breakeven", "cost", "profit", "analysis"],
    inputs: [
      { name: "fixedCosts", label: "Fixed Costs ($)", type: "number", min: 0, step: 100, placeholder: "50000" },
      { name: "variableCostPerUnit", label: "Variable Cost per Unit ($)", type: "number", min: 0, step: 0.01, placeholder: "25" },
      { name: "sellingPricePerUnit", label: "Selling Price per Unit ($)", type: "number", min: 0, step: 0.01, placeholder: "45" }
    ],
    formula: "contributionMargin = sellingPricePerUnit - variableCostPerUnit\nbreakEvenUnits = fixedCosts / contributionMargin\nbreakEvenRevenue = breakEvenUnits * sellingPricePerUnit"
  },
  {
    id: "compound-interest",
    name: "Compound Interest Calculator",
    shortName: "Compound Interest",
    description: "Calculate compound interest for investments",
    longDescription: "See how your investments grow with compound interest. Perfect for retirement planning and long-term investments.",
    category: "investment",
    icon: PiggyBank,
    color: "emerald",
    popular: false,
    featured: false,
    uses: 7654,
    rating: 4.8,
    lastUpdated: "2024-03-08",
    tags: ["compound", "interest", "investment", "savings"],
    inputs: [
      { name: "principal", label: "Principal Amount ($)", type: "number", min: 0, step: 100, placeholder: "10000" },
      { name: "rate", label: "Annual Interest Rate (%)", type: "number", min: 0, step: 0.1, placeholder: "8" },
      { name: "years", label: "Time Period (years)", type: "number", min: 1, step: 1, placeholder: "10" },
      { name: "compoundFrequency", label: "Compound Frequency", type: "select", options: ["1 (Annually)", "2 (Semi-annually)", "4 (Quarterly)", "12 (Monthly)"], default: "12 (Monthly)" }
    ],
    formula: "finalAmount = principal * Math.pow(1 + rate / (frequency * 100), frequency * years)\ninterestEarned = finalAmount - principal"
  }
];

// Main Calculators Page Component
const CalculatorsPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addToDashboard, isInDashboard } = useDashboard();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("popular");
  const [selectedCalculator, setSelectedCalculator] = useState(null);
  const [showCalculator, setShowCalculator] = useState(false);
  const [calculationHistory, setCalculationHistory] = useState([]);
  const [calculationsRemaining, setCalculationsRemaining] = useState(3);

  // Load calculation history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('calculator_history');
    if (saved) {
      setCalculationHistory(JSON.parse(saved));
    }
  }, []);

  // Save calculation history to localStorage
  useEffect(() => {
    localStorage.setItem('calculator_history', JSON.stringify(calculationHistory));
  }, [calculationHistory]);

  const categories = [
    { id: "all", name: "All Calculators", icon: Calculator, count: calculatorsData.length, color: "blue" },
    { id: "finance", name: "Finance", icon: DollarSign, count: calculatorsData.filter(c => c.category === "finance").length, color: "green" },
    { id: "tax", name: "Tax", icon: Percent, count: calculatorsData.filter(c => c.category === "tax").length, color: "purple" },
    { id: "loan", name: "Loan", icon: CreditCard, count: calculatorsData.filter(c => c.category === "loan").length, color: "orange" },
    { id: "investment", name: "Investment", icon: TrendingUp, count: calculatorsData.filter(c => c.category === "investment").length, color: "emerald" }
  ];

  // Filter and sort calculators
  const filteredCalculators = calculatorsData.filter(calc => {
    const matchesSearch = searchTerm === "" || 
      calc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      calc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      calc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || calc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedCalculators = [...filteredCalculators].sort((a, b) => {
    switch(sortBy) {
      case "popular":
        return b.uses - a.uses;
      case "rating":
        return b.rating - a.rating;
      case "name":
        return a.name.localeCompare(b.name);
      case "newest":
        return new Date(b.lastUpdated) - new Date(a.lastUpdated);
      default:
        return 0;
    }
  });

  const handleCalculatorClick = (calc) => {
    if (!isAuthenticated && calculationsRemaining <= 0) {
      toast((t) => (
        <div className="flex flex-col gap-2">
          <p className="font-medium">You've used all free calculations</p>
          <p className="text-sm text-gray-500">Sign up for unlimited access</p>
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => {
                toast.dismiss(t.id);
                navigate('/register');
              }}
              className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
            >
              Sign Up
            </button>
            <button
              onClick={() => {
                toast.dismiss(t.id);
                navigate('/login');
              }}
              className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-300"
            >
              Login
            </button>
          </div>
        </div>
      ), { duration: 8000 });
      return;
    }
    setSelectedCalculator(calc);
    setShowCalculator(true);
  };

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
    
    toast.success(`Added ${calc.name} to dashboard`, {
      icon: '✅',
      duration: 2000
    });
  };

  const getCategoryColor = (color) => {
    const colors = {
      green: 'bg-green-50 text-green-700 border-green-200',
      blue: 'bg-blue-50 text-blue-700 border-blue-200',
      purple: 'bg-purple-50 text-purple-700 border-purple-200',
      orange: 'bg-orange-50 text-orange-700 border-orange-200',
      red: 'bg-red-50 text-red-700 border-red-200',
      indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      yellow: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      pink: 'bg-pink-50 text-pink-700 border-pink-200',
      cyan: 'bg-cyan-50 text-cyan-700 border-cyan-200'
    };
    return colors[color] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const getCategoryGradient = (color) => {
    const gradients = {
      green: 'from-green-600 to-green-800',
      blue: 'from-blue-600 to-blue-800',
      purple: 'from-purple-600 to-purple-800',
      orange: 'from-orange-600 to-orange-800',
      red: 'from-red-600 to-red-800',
      indigo: 'from-indigo-600 to-indigo-800',
      yellow: 'from-yellow-600 to-yellow-800',
      emerald: 'from-emerald-600 to-emerald-800',
      pink: 'from-pink-600 to-pink-800',
      cyan: 'from-cyan-600 to-cyan-800'
    };
    return gradients[color] || 'from-blue-600 to-gray-800';
  };

  const CalculatorCard = ({ calc }) => {
    const Icon = calc.icon;
    const inDashboard = isInDashboard('calculators', calc.id);
    const gradient = getCategoryGradient(calc.color);
    const badgeColor = getCategoryColor(calc.color);

    return (
      <div
        onClick={() => handleCalculatorClick(calc)}
        className="group relative bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all cursor-pointer overflow-hidden hover-lift stagger-item"
      >
        {/* Featured/Trending badges */}
        <div className="absolute top-3 left-3 z-10 flex gap-1.5">
          {calc.featured && (
            <span className="px-2 py-0.5 bg-blue-600 text-white text-xs font-medium rounded flex items-center gap-1 shadow-sm">
              <Sparkles size={10} />
              Featured
            </span>
          )}
          {calc.popular && (
            <span className="px-2 py-0.5 bg-orange-600 text-white text-xs font-medium rounded flex items-center gap-1 shadow-sm">
              <Zap size={10} />
              Popular
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="absolute top-3 right-3 z-10 flex gap-1.5">
          <button
            onClick={(e) => handleAddToDashboard(calc, e)}
            disabled={inDashboard}
            className={`p-1.5 bg-white/90 backdrop-blur-sm rounded-md shadow-sm hover:bg-gray-50 transition-colors ${
              inDashboard ? 'text-green-600 cursor-default' : 'text-gray-500 hover:text-blue-600'
            }`}
            title={inDashboard ? 'Already in dashboard' : 'Add to dashboard'}
          >
            {inDashboard ? <Check size={14} /> : <Plus size={14} />}
          </button>
        </div>

        {/* Header */}
        <div className="p-5">
          <div className="flex items-start justify-between mb-3">
            <div className={`p-3 rounded-lg bg-gradient-to-r ${gradient} text-white shadow-md`}>
              <Icon size={24} />
            </div>
          </div>

          {/* Content */}
          <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
            {calc.name}
          </h3>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{calc.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-3">
            {calc.tags.slice(0, 2).map((tag, i) => (
              <span key={i} className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                #{tag}
              </span>
            ))}
            {calc.tags.length > 2 && (
              <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                +{calc.tags.length - 2}
              </span>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 mb-3">
            <div className="text-center p-1.5 bg-gray-50 rounded">
              <Users size={12} className="mx-auto mb-0.5 text-gray-400" />
              <p className="text-xs font-medium text-gray-700">{(calc.uses / 1000).toFixed(1)}k</p>
              <p className="text-[10px] text-gray-500">Uses</p>
            </div>
            <div className="text-center p-1.5 bg-gray-50 rounded">
              <Star size={12} className="mx-auto mb-0.5 text-yellow-400 fill-current" />
              <p className="text-xs font-medium text-gray-700">{calc.rating}</p>
              <p className="text-[10px] text-gray-500">Rating</p>
            </div>
            <div className="text-center p-1.5 bg-gray-50 rounded">
              <Clock size={12} className="mx-auto mb-0.5 text-gray-400" />
              <p className="text-xs font-medium text-gray-700">2024</p>
              <p className="text-[10px] text-gray-500">Updated</p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <span className={`text-xs px-2 py-1 rounded-full ${badgeColor}`}>
              {calc.category}
            </span>
            <div className="flex items-center gap-2">
              <ChevronRight size={16} className="text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Calculator Modal Component
  const CalculatorModal = ({ calculator, onClose }) => {
    const [inputs, setInputs] = useState({});
    const [result, setResult] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [saved, setSaved] = useState(false);
    const [chartData, setChartData] = useState([]);

    // Initialize inputs with defaults
    useEffect(() => {
      const initialInputs = {};
      calculator.inputs.forEach(input => {
        initialInputs[input.name] = input.default || '';
      });
      setInputs(initialInputs);
    }, [calculator]);

    // Calculate result based on calculator type
    const calculateResult = () => {
      if (!isAuthenticated) {
        setCalculationsRemaining(prev => prev - 1);
      }

      let calculatedResult = {};
      let chart = [];

      switch(calculator.id) {
        case "profit-margin":
          const cost = parseFloat(inputs.costPrice) || 0;
          const price = parseFloat(inputs.sellingPrice) || 0;
          const qty = parseFloat(inputs.quantity) || 1;
          
          const totalCost = cost * qty;
          const totalRevenue = price * qty;
          const profit = totalRevenue - totalCost;
          const profitMargin = totalRevenue > 0 ? (profit / totalRevenue) * 100 : 0;
          const markup = totalCost > 0 ? (profit / totalCost) * 100 : 0;
          
          calculatedResult = {
            profit: profit.toFixed(2),
            profitMargin: profitMargin.toFixed(2),
            markup: markup.toFixed(2),
            totalCost: totalCost.toFixed(2),
            totalRevenue: totalRevenue.toFixed(2),
            perUnitProfit: (profit / qty).toFixed(2)
          };
          
          chart = [
            { name: 'Cost', value: totalCost },
            { name: 'Profit', value: profit },
            { name: 'Revenue', value: totalRevenue }
          ];
          break;

        case "loan-emi":
          const amount = parseFloat(inputs.loanAmount) || 0;
          const rate = parseFloat(inputs.interestRate) || 0;
          const years = parseFloat(inputs.loanTerm) || 1;
          
          const monthlyRate = rate / 12 / 100;
          const months = years * 12;
          const emi = monthlyRate === 0 
            ? amount / months 
            : (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
          
          const totalPayment = emi * months;
          const totalInterest = totalPayment - amount;
          
          calculatedResult = {
            emi: emi.toFixed(2),
            totalPayment: totalPayment.toFixed(2),
            totalInterest: totalInterest.toFixed(2),
            interestPercentage: ((totalInterest / amount) * 100).toFixed(2)
          };

          // Generate amortization chart data
          chart = [];
          let balance = amount;
          for (let year = 1; year <= Math.min(years, 5); year++) {
            const yearlyPrincipal = 0;
            const yearlyInterest = 0;
            chart.push({
              year: `Year ${year}`,
              principal: balance,
              interest: totalInterest / years
            });
          }
          break;

        case "gst-calculator":
          const amt = parseFloat(inputs.amount) || 0;
          const gstRate = parseFloat(inputs.gstRate) || 0;
          const type = inputs.type || 'exclusive';
          
          if (type === 'exclusive') {
            const gst = amt * (gstRate / 100);
            const total = amt + gst;
            calculatedResult = {
              baseAmount: amt.toFixed(2),
              gstAmount: gst.toFixed(2),
              totalAmount: total.toFixed(2),
              gstRate: gstRate
            };
          } else {
            const base = amt * 100 / (100 + gstRate);
            const gst = amt - base;
            calculatedResult = {
              baseAmount: base.toFixed(2),
              gstAmount: gst.toFixed(2),
              totalAmount: amt.toFixed(2),
              gstRate: gstRate
            };
          }
          
          chart = [
            { name: 'Base Amount', value: parseFloat(calculatedResult.baseAmount) },
            { name: 'GST', value: parseFloat(calculatedResult.gstAmount) }
          ];
          break;

        case "roi-calculator":
          const investment = parseFloat(inputs.initialInvestment) || 0;
          const final = parseFloat(inputs.finalValue) || 0;
          const period = parseFloat(inputs.years) || 1;
          
          const roi = ((final - investment) / investment) * 100;
          const annualizedRoi = (Math.pow(final / investment, 1 / period) - 1) * 100;
          const gain = final - investment;
          
          calculatedResult = {
            roi: roi.toFixed(2),
            annualizedRoi: annualizedRoi.toFixed(2),
            gain: gain.toFixed(2),
            gainPercentage: ((gain / investment) * 100).toFixed(2)
          };
          
          chart = [
            { name: 'Investment', value: investment },
            { name: 'Returns', value: gain },
            { name: 'Final Value', value: final }
          ];
          break;

        case "break-even":
          const fixed = parseFloat(inputs.fixedCosts) || 0;
          const varCost = parseFloat(inputs.variableCostPerUnit) || 0;
          const sellPrice = parseFloat(inputs.sellingPricePerUnit) || 0;
          
          const contributionMargin = sellPrice - varCost;
          const breakEvenUnits = contributionMargin > 0 ? Math.ceil(fixed / contributionMargin) : 0;
          const breakEvenRevenue = breakEvenUnits * sellPrice;
          
          calculatedResult = {
            breakEvenUnits: breakEvenUnits,
            breakEvenRevenue: breakEvenRevenue.toFixed(2),
            contributionMargin: contributionMargin.toFixed(2),
            profitAt100Units: (100 * contributionMargin - fixed).toFixed(2),
            profitAt500Units: (500 * contributionMargin - fixed).toFixed(2)
          };

          // Generate break-even chart
          chart = [];
          for (let units = 0; units <= breakEvenUnits * 2; units += Math.max(1, Math.floor(breakEvenUnits / 10))) {
            const revenue = units * sellPrice;
            const totalCost = fixed + (units * varCost);
            chart.push({
              units: units,
              revenue: revenue,
              cost: totalCost,
              profit: revenue - totalCost
            });
          }
          break;

        case "compound-interest":
          const principal = parseFloat(inputs.principal) || 0;
          const ratePercent = parseFloat(inputs.rate) || 0;
          const timeYears = parseFloat(inputs.years) || 1;
          const freqOption = inputs.compoundFrequency || "12 (Monthly)";
          const frequency = parseInt(freqOption.split(' ')[0]) || 12;
          
          const rateDecimal = ratePercent / 100;
          const finalAmount = principal * Math.pow(1 + rateDecimal / frequency, frequency * timeYears);
          const interest = finalAmount - principal;
          
          calculatedResult = {
            finalAmount: finalAmount.toFixed(2),
            totalInterest: interest.toFixed(2),
            interestPercentage: ((interest / principal) * 100).toFixed(2),
            effectiveAnnualRate: (Math.pow(1 + rateDecimal / frequency, frequency) - 1).toFixed(4)
          };

          // Generate growth chart
          chart = [];
          for (let year = 1; year <= timeYears; year++) {
            const yearAmount = principal * Math.pow(1 + rateDecimal / frequency, frequency * year);
            chart.push({
              year: `Year ${year}`,
              amount: yearAmount,
              interest: yearAmount - principal
            });
          }
          break;

        default:
          calculatedResult = { message: "Calculation not implemented" };
      }

      setResult(calculatedResult);
      setChartData(chart);

      // Save to history
      const historyEntry = {
        id: Date.now(),
        calculatorId: calculator.id,
        calculatorName: calculator.name,
        inputs: inputs,
        result: calculatedResult,
        timestamp: new Date().toISOString()
      };
      setCalculationHistory(prev => [historyEntry, ...prev].slice(0, 20));
      
      toast.success('Calculation completed!');
    };

    const handleInputChange = (name, value) => {
      setInputs(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
      setSaved(true);
      toast.success('Result saved to history');
      setTimeout(() => setSaved(false), 2000);
    };

    const handleCopy = () => {
      const text = Object.entries(result)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n');
      navigator.clipboard.writeText(text);
      toast.success('Copied to clipboard');
    };

    const handleReset = () => {
      const initialInputs = {};
      calculator.inputs.forEach(input => {
        initialInputs[input.name] = input.default || '';
      });
      setInputs(initialInputs);
      setResult(null);
      setChartData([]);
    };

    const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn" onClick={onClose}>
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className={`p-6 bg-gradient-to-r ${getCategoryGradient(calculator.color)} text-white`}>
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/20 rounded-xl">
                  <calculator.icon size={28} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{calculator.name}</h2>
                  <p className="text-white/80 text-sm mt-1">{calculator.description}</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Input Section */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <Calculator size={18} className="text-blue-600" />
                  Input Values
                </h3>
                
                {calculator.inputs.map((input) => (
                  <div key={input.name}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {input.label}
                    </label>
                    {input.type === 'select' ? (
                      <select
                        value={inputs[input.name] || input.default || ''}
                        onChange={(e) => handleInputChange(input.name, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {input.options.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    ) : (
                      <div className="relative">
                        {input.name.includes('Amount') || input.name.includes('Price') || input.name.includes('Cost') ? (
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                        ) : null}
                        <input
                          type={input.type}
                          min={input.min}
                          max={input.max}
                          step={input.step}
                          value={inputs[input.name] || ''}
                          onChange={(e) => handleInputChange(input.name, e.target.value)}
                          placeholder={input.placeholder}
                          className={`w-full ${input.name.includes('Amount') || input.name.includes('Price') || input.name.includes('Cost') ? 'pl-8' : 'pl-3'} pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                        />
                      </div>
                    )}
                  </div>
                ))}

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={calculateResult}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Zap size={16} />
                    Calculate
                  </button>
                  <button
                    onClick={handleReset}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <RotateCcw size={16} />
                    Reset
                  </button>
                </div>

                {/* Formula */}
                <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                    <Info size={14} className="text-blue-600" />
                    Formula
                  </h4>
                  <pre className="text-xs text-gray-600 whitespace-pre-line font-mono">
                    {calculator.formula}
                  </pre>
                </div>
              </div>

              {/* Result Section */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <TrendingUp size={18} className="text-green-600" />
                  Results
                </h3>

                {result ? (
                  <>
                    <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 border border-green-100">
                      <div className="grid grid-cols-2 gap-4">
                        {Object.entries(result).map(([key, value]) => (
                          <div key={key} className="text-center p-3 bg-white/80 backdrop-blur-sm rounded-lg">
                            <p className="text-xs text-gray-500 mb-1">
                              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                            </p>
                            <p className="text-lg font-bold text-gray-800">{value}</p>
                            {key.includes('emi') && <p className="text-xs text-gray-500">per month</p>}
                            {key.includes('roi') && <p className="text-xs text-gray-500">%</p>}
                            {key.includes('Margin') && <p className="text-xs text-gray-500">%</p>}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Chart */}
                    {chartData.length > 0 && (
                      <div className="h-64 mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                          {calculator.id === 'break-even' ? (
                            <ReLineChart data={chartData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="units" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Line type="monotone" dataKey="revenue" stroke="#3b82f6" name="Revenue" />
                              <Line type="monotone" dataKey="cost" stroke="#ef4444" name="Cost" />
                              <Line type="monotone" dataKey="profit" stroke="#10b981" name="Profit" />
                            </ReLineChart>
                          ) : calculator.id === 'compound-interest' ? (
                            <ReLineChart data={chartData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="year" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Line type="monotone" dataKey="amount" stroke="#3b82f6" name="Amount" />
                              <Line type="monotone" dataKey="interest" stroke="#f59e0b" name="Interest" />
                            </ReLineChart>
                          ) : (
                            <RePieChart>
                              <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                              >
                                {chartData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                              </Pie>
                              <Tooltip />
                            </RePieChart>
                          )}
                        </ResponsiveContainer>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={handleSave}
                        className="flex-1 px-3 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors flex items-center justify-center gap-1"
                      >
                        <Save size={14} />
                        {saved ? 'Saved!' : 'Save Result'}
                      </button>
                      <button
                        onClick={handleCopy}
                        className="flex-1 px-3 py-2 bg-gray-600 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors flex items-center justify-center gap-1"
                      >
                        <Copy size={14} />
                        Copy
                      </button>
                      <button
                        onClick={() => window.print()}
                        className="flex-1 px-3 py-2 bg-orange-600 text-white rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors flex items-center justify-center gap-1"
                      >
                        <Printer size={14} />
                        Print
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="bg-gray-50 rounded-xl p-8 text-center border-2 border-dashed border-gray-300">
                    <Calculator size={48} className="mx-auto text-gray-400 mb-3" />
                    <p className="text-gray-600">Enter values and click Calculate to see results</p>
                  </div>
                )}
              </div>
            </div>

            {/* History Section */}
            {calculationHistory.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Clock size={18} className="text-gray-500" />
                  Recent Calculations
                </h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {calculationHistory.slice(0, 5).map((item) => (
                    <div key={item.id} className="p-3 bg-gray-50 rounded-lg flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-gray-800">{item.calculatorName}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(item.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setInputs(item.inputs);
                          setResult(item.result);
                          toast.success('Loaded previous calculation');
                        }}
                        className="text-xs text-blue-600 hover:text-blue-700"
                      >
                        Load
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
              Business Calculators
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto animate-slideUp leading-relaxed">
              Powerful financial calculators to help you make informed business decisions
            </p>

            {/* Stats with professional styling */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/10">
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{calculatorsData.length}+</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Calculators</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/10" style={{animationDelay: '0.1s'}}>
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">100k+</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Calculations</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/10" style={{animationDelay: '0.2s'}}>
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">4.8</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Avg Rating</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/10" style={{animationDelay: '0.3s'}}>
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{calculatorsData.filter(c => c.featured).length}+</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Featured</div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mt-12 relative">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search calculators by name, category, or feature..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1.5 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-all"
                >
                  <Filter size={18} />
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
        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => {
                setSelectedCategory(category.id);
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
                  Filters
                </h3>
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setSortBy("popular");
                  }}
                  className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <X size={14} />
                  Clear all
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Sort By */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-2">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="rating">Highest Rated</option>
                    <option value="name">Name A-Z</option>
                    <option value="newest">Newest First</option>
                  </select>
                </div>

                {/* View Mode */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-2">View Mode</label>
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
                    <Calculator className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Free Access: {calculationsRemaining} calculations remaining today</h3>
                    <p className="text-sm text-gray-600">
                      Sign up for unlimited access to all calculators
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 px-3 py-1 rounded-full">
                    <span className="text-blue-600 font-semibold">{calculationsRemaining}/3</span>
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
                <span className="font-bold text-gray-900">{filteredCalculators.length}</span> calculators found
              </span>
            </div>
            
            {/* Active filters */}
            <div className="flex flex-wrap gap-2">
              {selectedCategory !== 'all' && (
                <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full flex items-center gap-1 border border-blue-200">
                  {categories.find(c => c.id === selectedCategory)?.name}
                  <button onClick={() => setSelectedCategory('all')} className="hover:bg-blue-100 rounded-full p-0.5">
                    <X size={12} />
                  </button>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Calculators Grid/List */}
        {filteredCalculators.length === 0 ? (
          <div className="text-center py-20">
            <Calculator className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No calculators found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search or filters</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="px-5 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedCalculators.map((calc, index) => (
              <CalculatorCard key={calc.id} calc={calc} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Calculator</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Uses</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {sortedCalculators.map(calc => {
                  const Icon = calc.icon;
                  const inDashboard = isInDashboard('calculators', calc.id);
                  const badgeColor = getCategoryColor(calc.color);
                  return (
                    <tr 
                      key={calc.id} 
                      className="hover:bg-gray-50 cursor-pointer transition-colors group"
                      onClick={() => handleCalculatorClick(calc)}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className={`p-1.5 rounded-md ${badgeColor}`}>
                            <Icon size={16} className={badgeColor.split(' ')[1]} />
                          </div>
                          <span className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                            {calc.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 text-xs rounded-full ${badgeColor}`}>
                          {calc.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{(calc.uses / 1000).toFixed(1)}k</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-0.5">
                          <Star size={12} className="text-yellow-400 fill-current" />
                          <span className="text-sm font-medium text-gray-700">{calc.rating}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToDashboard(calc, e);
                          }}
                          disabled={inDashboard}
                          className={`p-1 rounded transition-colors ${
                            inDashboard ? 'text-green-600' : 'text-gray-400 hover:text-blue-600'
                          }`}
                          title={inDashboard ? 'Already in dashboard' : 'Add to dashboard'}
                        >
                          {inDashboard ? <Check size={14} /> : <Plus size={14} />}
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
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 py-12 mt-12 border-t border-gray-700">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-4">
              <Calculator className="w-10 h-10 text-blue-400 mx-auto" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Need a Custom Calculator?</h2>
            <p className="text-gray-400 text-sm mb-6">
              Contact us for custom calculator development tailored to your business needs
            </p>
            
            <button 
              onClick={() => navigate('/contact')}
              className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm whitespace-nowrap"
            >
              Request Custom Calculator
            </button>
          </div>
        </div>
      </div>

      {/* Calculator Modal */}
      {showCalculator && selectedCalculator && (
        <CalculatorModal 
          calculator={selectedCalculator} 
          onClose={() => {
            setShowCalculator(false);
            setSelectedCalculator(null);
          }} 
        />
      )}
    </div>
  );
};

export default CalculatorsPage;