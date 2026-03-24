// src/Pages/Calculators/CalculatorDetail.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  ArrowLeft,
  Star,
  Clock,
  Users,
  Plus,
  Check,
  RefreshCw,
  Download,
  Share2,
  Bookmark,
  Heart,
  X
} from "lucide-react";
import { toast } from "react-hot-toast";

// Calculator data (same as in CalculatorsPage)
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
    lastUpdated: "2024-03-15",
    formula: "Profit Margin = (Revenue - Cost) / Revenue × 100%",
    example: "If you sell a product for $100 that costs $60 to make, your profit margin is 40%"
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
    lastUpdated: "2024-03-14",
    formula: "EMI = P × r × (1 + r)^n / ((1 + r)^n - 1)",
    example: "For a ₹10,00,000 loan at 10% interest for 5 years, monthly EMI is ₹21,247"
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
    lastUpdated: "2024-03-13",
    formula: "GST Amount = Original Cost × GST Rate / 100",
    example: "For a product costing ₹1000 with 18% GST, total price is ₹1180"
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
    lastUpdated: "2024-03-12",
    formula: "ROI = (Gain from Investment - Cost of Investment) / Cost of Investment × 100%",
    example: "If you invest ₹1,00,000 and get ₹1,20,000 back, your ROI is 20%"
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
    lastUpdated: "2024-03-11",
    formula: "Break-Even Point = Fixed Costs / (Selling Price - Variable Cost per Unit)",
    example: "With fixed costs of ₹50,000, selling price ₹500, variable cost ₹300, you need 250 units to break even"
  }
];

const CalculatorDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addToDashboard, isInDashboard, dashboardItems } = useDashboard();
  
  const [calculator, setCalculator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inputValues, setInputValues] = useState({});
  const [result, setResult] = useState(null);
  const [savedCalculations, setSavedCalculations] = useState([]);

  useEffect(() => {
    // Find calculator by id
    const found = calculatorsData.find(c => c.id === id);
    if (found) {
      setCalculator(found);
      initializeInputs(found.id);
      
      // Load saved calculations for this calculator
      const saved = dashboardItems.calculators?.find(c => c.calculatorId === id)?.savedCalculations || [];
      setSavedCalculations(saved);
    }
    setLoading(false);
  }, [id, dashboardItems.calculators]);

  const initializeInputs = (calcId) => {
    const defaults = {
      "profit-margin": { cost: 100, price: 150, quantity: 1 },
      "loan-emi": { amount: 100000, rate: 10, tenure: 12 },
      "gst-calculator": { amount: 1000, rate: 18 },
      "roi-calculator": { investment: 10000, returns: 15000, years: 1 },
      "break-even": { fixedCosts: 50000, variableCost: 300, price: 500 }
    };
    setInputValues(defaults[calcId] || {});
  };

  const handleInputChange = (field, value) => {
    setInputValues(prev => ({ ...prev, [field]: parseFloat(value) || 0 }));
  };

  const calculateResult = () => {
    if (!calculator) return;

    let result = {};
    switch(calculator.id) {
      case "profit-margin":
        const cost = inputValues.cost || 0;
        const price = inputValues.price || 0;
        const quantity = inputValues.quantity || 1;
        const revenue = price * quantity;
        const profit = revenue - (cost * quantity);
        const margin = revenue > 0 ? (profit / revenue) * 100 : 0;
        result = {
          revenue: formatCurrency(revenue),
          profit: formatCurrency(profit),
          margin: margin.toFixed(2) + "%",
          markup: cost > 0 ? (((price - cost) / cost) * 100).toFixed(2) + "%" : "0%"
        };
        break;

      case "loan-emi":
        const principal = inputValues.amount || 0;
        const ratePerMonth = (inputValues.rate || 0) / 100 / 12;
        const months = inputValues.tenure || 0;
        if (principal && ratePerMonth && months) {
          const emi = principal * ratePerMonth * Math.pow(1 + ratePerMonth, months) / (Math.pow(1 + ratePerMonth, months) - 1);
          const totalPayment = emi * months;
          const totalInterest = totalPayment - principal;
          result = {
            emi: formatCurrency(emi),
            totalPayment: formatCurrency(totalPayment),
            totalInterest: formatCurrency(totalInterest)
          };
        }
        break;

      case "gst-calculator":
        const amount = inputValues.amount || 0;
        const rate = inputValues.rate || 0;
        const gstAmount = amount * rate / 100;
        const total = amount + gstAmount;
        result = {
          originalAmount: formatCurrency(amount),
          gstAmount: formatCurrency(gstAmount),
          total: formatCurrency(total),
          gstRate: rate + "%"
        };
        break;

      case "roi-calculator":
        const investment = inputValues.investment || 0;
        const returns = inputValues.returns || 0;
        const years = inputValues.years || 1;
        if (investment > 0) {
          const profit = returns - investment;
          const roi = (profit / investment) * 100;
          const annualRoi = roi / years;
          result = {
            profit: formatCurrency(profit),
            roi: roi.toFixed(2) + "%",
            annualRoi: annualRoi.toFixed(2) + "%"
          };
        }
        break;

      case "break-even":
        const fixed = inputValues.fixedCosts || 0;
        const variable = inputValues.variableCost || 0;
        const sellPrice = inputValues.price || 0;
        if (sellPrice > variable) {
          const contribution = sellPrice - variable;
          const breakEvenUnits = Math.ceil(fixed / contribution);
          const breakEvenRevenue = breakEvenUnits * sellPrice;
          result = {
            breakEvenUnits: breakEvenUnits,
            breakEvenRevenue: formatCurrency(breakEvenRevenue),
            contributionMargin: formatCurrency(contribution)
          };
        }
        break;
    }

    setResult(result);
  };

  const saveCalculation = () => {
    if (!isAuthenticated) {
      toast.error("Please login to save calculations");
      return;
    }

    const savedCalc = {
      id: Date.now(),
      date: new Date().toISOString(),
      inputs: inputValues,
      result: result
    };

    setSavedCalculations([savedCalc, ...savedCalculations]);
    toast.success("Calculation saved!");
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const handleAddToDashboard = () => {
    if (!isAuthenticated) {
      toast.error("Please login to add to dashboard");
      return;
    }

    addToDashboard('calculators', {
      id: calculator.id,
      name: calculator.name,
      description: calculator.description,
      category: calculator.category,
      icon: calculator.icon.name,
      color: calculator.color
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!calculator) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <Calculator size={48} className="mx-auto text-gray-300 mb-3" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Calculator Not Found</h2>
          <p className="text-gray-600 mb-4">The calculator you're looking for doesn't exist</p>
          <button
            onClick={() => navigate('/calculators')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Calculators
          </button>
        </div>
      </div>
    );
  }

  const Icon = calculator.icon;
  const inDashboard = isInDashboard('calculators', calculator.id);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-6 py-4 flex justify-between items-center">
          <button
            onClick={() => navigate('/calculators')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={20} />
            Back to Calculators
          </button>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleAddToDashboard}
              disabled={inDashboard}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                inDashboard
                  ? 'bg-green-500 text-white cursor-default'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
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
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculator Info */}
          <div>
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-4 bg-${calculator.color}-100 rounded-xl`}>
                  <Icon className={`w-8 h-8 text-${calculator.color}-600`} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">{calculator.name}</h1>
                  <p className="text-gray-500">{calculator.category}</p>
                </div>
              </div>

              <p className="text-gray-700 mb-4">{calculator.longDescription}</p>

              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <span className="flex items-center gap-1">
                  <Users size={16} />
                  {calculator.uses.toLocaleString()} uses
                </span>
                <span className="flex items-center gap-1">
                  <Star size={16} className="text-yellow-400 fill-current" />
                  {calculator.rating}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={16} />
                  Updated {new Date(calculator.lastUpdated).toLocaleDateString()}
                </span>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Formula</h3>
                <p className="text-sm text-gray-600 font-mono bg-white p-2 rounded border">
                  {calculator.formula}
                </p>
              </div>

              <div className="mt-4 bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Example</h3>
                <p className="text-sm text-gray-600">{calculator.example}</p>
              </div>
            </div>

            {/* Saved Calculations */}
            {savedCalculations.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Saved Calculations</h3>
                <div className="space-y-3">
                  {savedCalculations.map(calc => (
                    <div key={calc.id} className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500 mb-2">
                        {new Date(calc.date).toLocaleString()}
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(calc.result || {}).map(([key, value]) => (
                          <div key={key}>
                            <p className="text-xs text-gray-500">{key}</p>
                            <p className="text-sm font-medium">{value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Calculator Interface */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Calculate</h2>

            {/* Input Fields */}
            <div className="space-y-4 mb-6">
              {calculator.id === "profit-margin" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cost Price (₹)
                    </label>
                    <input
                      type="number"
                      value={inputValues.cost || ''}
                      onChange={(e) => handleInputChange('cost', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Selling Price (₹)
                    </label>
                    <input
                      type="number"
                      value={inputValues.price || ''}
                      onChange={(e) => handleInputChange('price', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quantity
                    </label>
                    <input
                      type="number"
                      value={inputValues.quantity || ''}
                      onChange={(e) => handleInputChange('quantity', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </>
              )}

              {calculator.id === "loan-emi" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Loan Amount (₹)
                    </label>
                    <input
                      type="number"
                      value={inputValues.amount || ''}
                      onChange={(e) => handleInputChange('amount', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Interest Rate (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={inputValues.rate || ''}
                      onChange={(e) => handleInputChange('rate', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tenure (months)
                    </label>
                    <input
                      type="number"
                      value={inputValues.tenure || ''}
                      onChange={(e) => handleInputChange('tenure', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </>
              )}

              {calculator.id === "gst-calculator" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amount (₹)
                    </label>
                    <input
                      type="number"
                      value={inputValues.amount || ''}
                      onChange={(e) => handleInputChange('amount', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      GST Rate (%)
                    </label>
                    <select
                      value={inputValues.rate || 18}
                      onChange={(e) => handleInputChange('rate', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="5">5%</option>
                      <option value="12">12%</option>
                      <option value="18">18%</option>
                      <option value="28">28%</option>
                    </select>
                  </div>
                </>
              )}

              {calculator.id === "roi-calculator" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Initial Investment (₹)
                    </label>
                    <input
                      type="number"
                      value={inputValues.investment || ''}
                      onChange={(e) => handleInputChange('investment', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Returns (₹)
                    </label>
                    <input
                      type="number"
                      value={inputValues.returns || ''}
                      onChange={(e) => handleInputChange('returns', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Time Period (years)
                    </label>
                    <input
                      type="number"
                      value={inputValues.years || ''}
                      onChange={(e) => handleInputChange('years', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </>
              )}

              {calculator.id === "break-even" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fixed Costs (₹)
                    </label>
                    <input
                      type="number"
                      value={inputValues.fixedCosts || ''}
                      onChange={(e) => handleInputChange('fixedCosts', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Variable Cost per Unit (₹)
                    </label>
                    <input
                      type="number"
                      value={inputValues.variableCost || ''}
                      onChange={(e) => handleInputChange('variableCost', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Selling Price per Unit (₹)
                    </label>
                    <input
                      type="number"
                      value={inputValues.price || ''}
                      onChange={(e) => handleInputChange('price', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </>
              )}
            </div>

            {/* Calculate Button */}
            <button
              onClick={calculateResult}
              className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 mb-6"
            >
              Calculate
            </button>

            {/* Results */}
            {result && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-3">Results</h3>
                <div className="space-y-2">
                  {Object.entries(result).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center p-2 bg-white rounded">
                      <span className="text-sm text-gray-600 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}:
                      </span>
                      <span className="font-medium text-blue-600">{value}</span>
                    </div>
                  ))}
                </div>

                {isAuthenticated && (
                  <button
                    onClick={saveCalculation}
                    className="mt-4 w-full px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 flex items-center justify-center gap-2"
                  >
                    <Download size={16} />
                    Save Calculation
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ✅ IMPORTANT: Add this default export at the end
export default CalculatorDetail;