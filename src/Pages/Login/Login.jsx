// src/pages/Login/Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Logo from '../../components/Logo/Logo'; // Import the Logo component
import { 
  Mail, 
  Lock, 
  LogIn,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  Building2,
  Users,
  Award,
  Shield,
  Briefcase,
  TrendingUp,
  CheckCircle
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const styles = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-15px); }
  }
  
  @keyframes pulse-glow {
    0%, 100% { opacity: 0.2; filter: blur(20px); }
    50% { opacity: 0.4; filter: blur(30px); }
  }
  
  @keyframes slideIn {
    from { opacity: 0; transform: translateX(-20px); }
    to { opacity: 1; transform: translateX(0); }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  
  .animate-pulse-glow {
    animation: pulse-glow 4s ease-in-out infinite;
  }
  
  .animate-slideIn {
    animation: slideIn 0.5s ease-out forwards;
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.4s ease-out forwards;
  }
  
  .stagger-item {
    opacity: 0;
    animation: fadeIn 0.5s ease-out forwards;
  }
  
  .stagger-item:nth-child(1) { animation-delay: 0.1s; }
  .stagger-item:nth-child(2) { animation-delay: 0.2s; }
  .stagger-item:nth-child(3) { animation-delay: 0.3s; }
  .stagger-item:nth-child(4) { animation-delay: 0.4s; }
  
  .hover-lift {
    transition: all 0.3s ease;
  }
  
  .hover-lift:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
  }
  
  .glass-effect {
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 20px 35px -10px rgba(0, 0, 0, 0.15);
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const result = await login(email, password);
    
    if (result.success) {
      navigate('/dashboard');
    }
    
    setLoading(false);
  };

  const handleDemoLogin = async () => {
    setEmail('demo@bizcraft.com');
    setPassword('demo123');
    setLoading(true);
    
    setTimeout(async () => {
      const result = await login('demo@bizcraft.com', 'demo123');
      if (result.success) {
        navigate('/dashboard');
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 overflow-hidden relative">
      <style>{styles}</style>
      
      {/* Subtle geometric pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '50px 50px'
        }} />
      </div>
      
      {/* Animated background elements - more subtle */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/5 rounded-full filter blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-indigo-500/5 rounded-full filter blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-400/5 rounded-full filter blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }} />
        
        {/* Subtle floating icons - more professional */}
        <div className="absolute top-32 left-[15%] text-6xl text-white/5 animate-float">📈</div>
        <div className="absolute bottom-40 right-[20%] text-7xl text-white/5 animate-float" style={{ animationDelay: '1s' }}>📊</div>
        <div className="absolute top-60 right-[25%] text-5xl text-white/5 animate-float" style={{ animationDelay: '2s' }}>💼</div>
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-8 items-center">
          
          {/* Left side - Professional Branding */}
          <div className="hidden lg:block text-white">
            <div className="mb-12 stagger-item">
              <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6">
                <Sparkles size={16} className="text-blue-300" />
                <span className="text-sm text-blue-200">Trusted by 50,000+ businesses</span>
              </div>
              <h1 className="text-5xl font-bold mb-4 leading-tight">
                Welcome to
                <span className="block text-blue-400">
                  BizCraft
                </span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Your complete business management platform for supplier relations, 
                expert guides, and powerful business tools.
              </p>
            </div>

            {/* Professional features grid */}
            <div className="grid grid-cols-2 gap-6 stagger-item">
              <div className="flex items-start gap-3 bg-white/5 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                <div className="p-2 bg-blue-600/20 rounded-lg">
                  <Building2 size={20} className="text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Supplier Directory</h3>
                  <p className="text-sm text-gray-400">Connect with 9000+ verified global suppliers</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 bg-white/5 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                <div className="p-2 bg-indigo-600/20 rounded-lg">
                  <TrendingUp size={20} className="text-indigo-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Business Tools</h3>
                  <p className="text-sm text-gray-400">Powerful calculators and analytics tools</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 bg-white/5 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                <div className="p-2 bg-blue-600/20 rounded-lg">
                  <Award size={20} className="text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Expert Guides</h3>
                  <p className="text-sm text-gray-400">500+ guides from industry experts</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 bg-white/5 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                <div className="p-2 bg-emerald-600/20 rounded-lg">
                  <Shield size={20} className="text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Secure Platform</h3>
                  <p className="text-sm text-gray-400">Enterprise-grade security & encryption</p>
                </div>
              </div>
            </div>

            {/* Professional stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 stagger-item">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">50K+</div>
                <div className="text-sm text-gray-400 mt-1">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">100+</div>
                <div className="text-sm text-gray-400 mt-1">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">4.8</div>
                <div className="text-sm text-gray-400 mt-1">User Rating</div>
              </div>
            </div>

            {/* Trust indicators */}
            <div className="mt-8 flex items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <CheckCircle size={14} className="text-emerald-400" />
                <span>SSL Secure</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle size={14} className="text-emerald-400" />
                <span>GDPR Compliant</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle size={14} className="text-emerald-400" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>

          {/* Right side - Professional Login Form */}
          <div className="w-full max-w-md mx-auto stagger-item">
            <div className="glass-effect rounded-2xl shadow-xl p-8 bg-white">
              {/* Logo at the top - with white background matching the form */}
              <div className="flex justify-center mb-6">
                <div className="bg-white p-2 rounded-xl shadow-sm">
                  <Logo showText={true} size="md" />
                </div>
              </div>
              
              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
                <p className="text-sm text-gray-500 mt-1">Sign in to access your dashboard</p>
              </div>

              {/* Demo Credentials - More subtle */}
              <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <p className="text-sm text-gray-600 font-medium mb-2 flex items-center gap-1">
                  <Sparkles size={14} className="text-blue-600" />
                  Demo Access
                </p>
                <div className="space-y-1.5 text-sm">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Mail size={14} />
                    <span className="font-mono text-xs">demo@bizcraft.com</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                    <Lock size={14} />
                    <span className="font-mono text-xs">demo123</span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-12 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Remember me & Forgot password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-600">Remember me</span>
                  </label>
                  <button
                    type="button"
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <LogIn size={18} />
                      Sign In
                    </>
                  )}
                </button>

                {/* Demo Login Button */}
                <button
                  type="button"
                  onClick={handleDemoLogin}
                  disabled={loading}
                  className="w-full px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 hover:border-blue-500 hover:text-blue-600 transition-all flex items-center justify-center gap-2 group"
                >
                  <Sparkles size={18} className="text-blue-600" />
                  Try Demo
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>

              {/* Sign up link */}
              <p className="mt-6 text-center text-sm text-gray-600">
                Don't have an account?{' '}
                <Link 
                  to="/register" 
                  className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
                >
                  Sign up for free
                </Link>
              </p>

              {/* Professional trust badges */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-center gap-4">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white text-xs font-bold border-2 border-white">
                      JD
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-indigo-700 flex items-center justify-center text-white text-xs font-bold border-2 border-white">
                      SM
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-600 to-emerald-700 flex items-center justify-center text-white text-xs font-bold border-2 border-white">
                      RK
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Trusted by 50K+ businesses</p>
                    <p className="text-xs text-gray-500">Join industry leaders</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;