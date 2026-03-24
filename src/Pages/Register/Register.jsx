// src/pages/Register/Register.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Logo from '../../components/Logo/Logo'; // Import the Logo component
import { 
  User,
  Mail, 
  Lock, 
  LogIn,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  CheckCircle,
  Shield,
  Zap,
  Globe,
  Briefcase,
  TrendingUp,
  Award
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
    from { opacity: 0; transform: translateX(20px); }
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
  
  .glass-effect {
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 20px 35px -10px rgba(0, 0, 0, 0.15);
  }
`;

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    if (!agreeTerms) {
      toast.error('Please agree to the terms and conditions');
      return;
    }
    
    setLoading(true);
    
    const result = await register({
      name: formData.name,
      email: formData.email,
      password: formData.password
    });
    
    if (result.success) {
      navigate('/dashboard');
    }
    
    setLoading(false);
  };

  const getPasswordStrength = () => {
    const password = formData.password;
    if (!password) return { strength: 0, label: '', color: '' };
    
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.match(/[a-z]/)) strength++;
    if (password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;
    
    const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];
    
    return {
      strength: Math.min(strength, 4),
      label: labels[strength - 1] || '',
      color: colors[strength - 1] || ''
    };
  };

  const passwordStrength = getPasswordStrength();

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
      
      {/* Animated background elements - subtle */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full filter blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-indigo-500/5 rounded-full filter blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
        
        {/* Subtle floating icons */}
        <div className="absolute top-32 right-[15%] text-6xl text-white/5 animate-float">📈</div>
        <div className="absolute bottom-40 left-[20%] text-7xl text-white/5 animate-float" style={{ animationDelay: '1s' }}>💼</div>
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-8 items-center">
          
          {/* Left side - Professional Benefits */}
          <div className="hidden lg:block text-white stagger-item">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6">
              <Sparkles size={16} className="text-blue-300" />
              <span className="text-sm text-blue-200">Start your 14-day free trial</span>
            </div>
            
            <h1 className="text-5xl font-bold mb-4 leading-tight">
              Join
              <span className="block text-blue-400">
                BizCraft Today
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-12 leading-relaxed">
              Get unlimited access to all premium features, tools, and resources to grow your business.
            </p>

            {/* Professional benefits list */}
            <div className="space-y-6">
              <div className="flex items-start gap-4 bg-white/5 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                <div className="p-2 bg-blue-600/20 rounded-lg">
                  <Zap size={24} className="text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Unlimited Access</h3>
                  <p className="text-gray-400">View unlimited suppliers, guides, and tools</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white/5 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                <div className="p-2 bg-indigo-600/20 rounded-lg">
                  <Globe size={24} className="text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Global Network</h3>
                  <p className="text-gray-400">Connect with suppliers from 50+ countries</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white/5 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                <div className="p-2 bg-emerald-600/20 rounded-lg">
                  <Shield size={24} className="text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Secure & Verified</h3>
                  <p className="text-gray-400">All suppliers are verified for your safety</p>
                </div>
              </div>
            </div>

            {/* Professional stats */}
            <div className="mt-12 grid grid-cols-3 gap-6">
              <div className="text-center bg-white/5 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                <div className="text-3xl font-bold text-white">50K+</div>
                <div className="text-sm text-gray-400 mt-1">Active Users</div>
              </div>
              <div className="text-center bg-white/5 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                <div className="text-3xl font-bold text-white">9K+</div>
                <div className="text-sm text-gray-400 mt-1">Suppliers</div>
              </div>
              <div className="text-center bg-white/5 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                <div className="text-3xl font-bold text-white">100+</div>
                <div className="text-sm text-gray-400 mt-1">Tools</div>
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

          {/* Right side - Professional Register Form */}
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
                <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
                <p className="text-sm text-gray-500 mt-1">Start your 14-day free trial</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
                      placeholder="john@example.com"
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
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-10 pr-12 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
                      placeholder="••••••••"
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
                  
                  {/* Password strength indicator */}
                  {formData.password && (
                    <div className="mt-2">
                      <div className="flex gap-1 mb-1">
                        {[0, 1, 2, 3, 4].map((index) => (
                          <div
                            key={index}
                            className={`h-1 flex-1 rounded-full transition-all ${
                              index <= passwordStrength.strength
                                ? passwordStrength.color
                                : 'bg-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                      <p className={`text-xs ${passwordStrength.color.replace('bg-', 'text-')}`}>
                        {passwordStrength.label}
                      </p>
                    </div>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full pl-10 pr-12 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  
                  {/* Password match indicator */}
                  {formData.confirmPassword && (
                    <p className={`text-xs mt-1 flex items-center gap-1 ${
                      formData.password === formData.confirmPassword
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}>
                      <CheckCircle size={12} />
                      {formData.password === formData.confirmPassword
                        ? 'Passwords match'
                        : 'Passwords do not match'}
                    </p>
                  )}
                </div>

                {/* Terms agreement */}
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-1 w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-600">
                    I agree to the{' '}
                    <a href="/terms" className="text-blue-600 hover:text-blue-700 font-medium">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="/privacy" className="text-blue-600 hover:text-blue-700 font-medium">
                      Privacy Policy
                    </a>
                  </span>
                </label>

                {/* Register Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <LogIn size={18} />
                      Create Account
                    </>
                  )}
                </button>
              </form>

              {/* Login link */}
              <p className="mt-6 text-center text-sm text-gray-600">
                Already have an account?{' '}
                <Link 
                  to="/login" 
                  className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
                >
                  Sign in
                </Link>
              </p>

              {/* Free trial note - professional styling */}
              <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <p className="text-xs text-blue-700 text-center flex items-center justify-center gap-1">
                  <Sparkles size={14} className="text-blue-600" />
                  No credit card required. Start your 14-day free trial today.
                </p>
              </div>

              {/* Trust badges */}
              <div className="mt-6 flex items-center justify-center gap-4">
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
                  <p className="text-xs text-gray-500">Join 50,000+ businesses</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;