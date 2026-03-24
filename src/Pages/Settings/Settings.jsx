import { useState, useEffect } from 'react';
import {
  Settings as SettingsIcon,
  Bell,
  Shield,
  Eye,
  CreditCard,
  X,
  Plus,
  Download,
  Trash2,
  LogOut,
  Mail,
  Smartphone,
  Volume2,
  AlertCircle,
  CheckCircle,
  Check,
  Save,
  RefreshCw,
  ChevronRight,
  History,
  Award,
  MapPin,
  Clock,
  Globe,
  Key,
  Fingerprint
} from 'lucide-react';
import toast from 'react-hot-toast';

const Settings = () => {
  const [activeSection, setActiveSection] = useState('notifications');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSavedAlert, setShowSavedAlert] = useState(false);
  
  // Modal States
  const [showChangePlanModal, setShowChangePlanModal] = useState(false);
  const [showAddPaymentModal, setShowAddPaymentModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteItemType, setDeleteItemType] = useState(null);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [newPaymentMethod, setNewPaymentMethod] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
    isDefault: false
  });

  // Password change state
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });

  // 2FA state
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

  // Data export state
  const [exportFormat, setExportFormat] = useState('json');
  const [exportDateRange, setExportDateRange] = useState('all');
  const [isExporting, setIsExporting] = useState(false);

  // Notification preferences with real-time toggle
  const [notificationSettings, setNotificationSettings] = useState(() => {
    const saved = localStorage.getItem('notification_settings');
    return saved ? JSON.parse(saved) : {
      email: true,
      push: true,
      sms: false,
      digest: true,
      marketing: false,
      supplierAlerts: true,
      guideRecommendations: true,
      toolUpdates: true,
      billing: true,
      security: true
    };
  });

  // Privacy settings
  const [privacySettings, setPrivacySettings] = useState(() => {
    const saved = localStorage.getItem('privacy_settings');
    return saved ? JSON.parse(saved) : {
      profileVisibility: 'public',
      showEmail: false,
      showActivity: true,
      showCompany: true,
      showStats: true,
      allowDataCollection: true
    };
  });

  // Security settings
  const [securitySettings, setSecuritySettings] = useState(() => {
    const saved = localStorage.getItem('security_settings');
    return saved ? JSON.parse(saved) : {
      twoFactor: false,
      sessionTimeout: '30',
      loginAlerts: true,
      deviceTracking: true,
      ipWhitelisting: false
    };
  });

  // Active sessions
  const [activeSessions, setActiveSessions] = useState([
    {
      id: 1,
      device: 'Windows PC',
      browser: 'Chrome',
      location: 'New York, NY',
      ip: '192.168.1.1',
      lastActive: 'Now',
      isCurrent: true
    },
    {
      id: 2,
      device: 'iPhone 14',
      browser: 'Safari',
      location: 'New York, NY',
      ip: '192.168.1.2',
      lastActive: '2 hours ago',
      isCurrent: false
    },
    {
      id: 3,
      device: 'iPad Pro',
      browser: 'Safari',
      location: 'Boston, MA',
      ip: '192.168.1.3',
      lastActive: '2 days ago',
      isCurrent: false
    }
  ]);

  // Login history
  const [loginHistory, setLoginHistory] = useState([
    { id: 1, date: 'Today, 09:30 AM', device: 'Chrome on Windows', location: 'New York, NY', status: 'success' },
    { id: 2, date: 'Yesterday, 06:45 PM', device: 'Safari on iPhone', location: 'New York, NY', status: 'success' },
    { id: 3, date: 'Mar 14, 2024, 08:15 AM', device: 'Firefox on Mac', location: 'Boston, MA', status: 'success' },
    { id: 4, date: 'Mar 13, 2024, 11:20 PM', device: 'Unknown device', location: 'Unknown location', status: 'failed' }
  ]);

  // Billing data
  const [billingData, setBillingData] = useState(() => {
    const saved = localStorage.getItem('billing_data');
    return saved ? JSON.parse(saved) : {
      currentPlan: 'pro',
      nextBillingDate: '2024-04-15',
      paymentMethods: [
        {
          id: 1,
          type: 'visa',
          last4: '4242',
          expMonth: '12',
          expYear: '25',
          cardName: 'John Doe',
          isDefault: true
        },
        {
          id: 2,
          type: 'mastercard',
          last4: '8888',
          expMonth: '08',
          expYear: '24',
          cardName: 'John Doe',
          isDefault: false
        }
      ],
      invoices: [
        { id: 'INV-001', date: 'Mar 15, 2024', amount: '$29.00', status: 'paid' },
        { id: 'INV-002', date: 'Feb 15, 2024', amount: '$29.00', status: 'paid' },
        { id: 'INV-003', date: 'Jan 15, 2024', amount: '$29.00', status: 'paid' }
      ]
    };
  });

  const plans = [
    { 
      id: 'free', 
      name: 'Free Plan', 
      price: '$0', 
      period: 'forever',
      features: ['Up to 10 suppliers', 'Basic calculators', '50+ guides'],
      popular: false,
      icon: '🚀'
    },
    { 
      id: 'pro', 
      name: 'Pro Plan', 
      price: '$29', 
      period: 'month',
      features: ['Unlimited suppliers', 'Advanced calculators', '500+ guides', 'Analytics dashboard', 'Priority support'],
      popular: true,
      icon: '⭐'
    },
    { 
      id: 'business', 
      name: 'Business Plan', 
      price: '$99', 
      period: 'month',
      features: ['Everything in Pro', 'Team collaboration', 'API access', 'Dedicated account manager', 'Custom integrations'],
      popular: false,
      icon: '🏢'
    }
  ];

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem('notification_settings', JSON.stringify(notificationSettings));
  }, [notificationSettings]);

  useEffect(() => {
    localStorage.setItem('privacy_settings', JSON.stringify(privacySettings));
  }, [privacySettings]);

  useEffect(() => {
    localStorage.setItem('security_settings', JSON.stringify(securitySettings));
  }, [securitySettings]);

  useEffect(() => {
    localStorage.setItem('billing_data', JSON.stringify(billingData));
  }, [billingData]);

  const settingsSections = [
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Eye },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'billing', label: 'Billing', icon: CreditCard }
  ];

  // Handle notification toggle with real-time update
  const handleNotificationChange = (key) => {
    setNotificationSettings(prev => {
      const newSettings = { ...prev, [key]: !prev[key] };
      toast.success(`${key.charAt(0).toUpperCase() + key.slice(1)} ${newSettings[key] ? 'enabled' : 'disabled'}`);
      return newSettings;
    });
  };

  // Handle privacy change
  const handlePrivacyChange = (key, value) => {
    setPrivacySettings(prev => {
      const newSettings = { ...prev, [key]: value };
      toast.success('Privacy setting updated');
      return newSettings;
    });
  };

  // Handle security change
  const handleSecurityChange = (key, value) => {
    setSecuritySettings(prev => {
      const newSettings = { ...prev, [key]: value };
      toast.success('Security setting updated');
      return newSettings;
    });
  };

  // Handle password change
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
    
    // Calculate password strength
    if (name === 'new') {
      let strength = 0;
      if (value.length >= 8) strength += 25;
      if (value.match(/[a-z]/)) strength += 25;
      if (value.match(/[A-Z]/)) strength += 25;
      if (value.match(/[0-9]/)) strength += 25;
      if (value.match(/[^a-zA-Z0-9]/)) strength += 25;
      setPasswordStrength(Math.min(strength, 100));
    }
  };

  const handleUpdatePassword = () => {
    if (!passwordData.current || !passwordData.new || !passwordData.confirm) {
      toast.error('Please fill in all fields');
      return;
    }
    
    if (passwordData.new !== passwordData.confirm) {
      toast.error('New passwords do not match');
      return;
    }

    if (passwordStrength < 75) {
      toast.error('Password is too weak');
      return;
    }

    // Simulate password update
    toast.success('Password updated successfully');
    setPasswordData({ current: '', new: '', confirm: '' });
  };

  // Handle 2FA setup
  const handleSetup2FA = () => {
    setShow2FAModal(true);
  };

  const handleVerify2FA = () => {
    if (verificationCode.length === 6) {
      setTwoFAEnabled(true);
      setSecuritySettings(prev => ({ ...prev, twoFactor: true }));
      setShow2FAModal(false);
      toast.success('2FA enabled successfully');
    } else {
      toast.error('Invalid verification code');
    }
  };

  // Handle session management
  const handleRevokeSession = (sessionId) => {
    setActiveSessions(prev => prev.filter(s => s.id !== sessionId));
    toast.success('Session revoked');
  };

  const handleRevokeAllSessions = () => {
    setActiveSessions(prev => prev.filter(s => s.isCurrent));
    toast.success('All other sessions revoked');
  };

  // Handle data export
  const handleExportData = async () => {
    setIsExporting(true);
    
    // Simulate export
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const exportData = {
      notifications: notificationSettings,
      privacy: privacySettings,
      security: securitySettings,
      billing: billingData,
      exportDate: new Date().toISOString(),
      format: exportFormat,
      dateRange: exportDateRange
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bizcraft-data-export-${new Date().toISOString().split('T')[0]}.${exportFormat}`;
    a.click();
    
    setIsExporting(false);
    toast.success('Data exported successfully');
  };

  // Handle account deletion
  const handleDeleteAccount = () => {
    setDeleteItemType('account');
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (deleteItemType === 'account') {
      // Simulate account deletion
      toast.success('Account deleted successfully');
      // Redirect to login or home
      window.location.href = '/';
    } else if (deleteItemType === 'payment') {
      handleRemovePaymentMethod(deleteItemId);
    }
    setShowDeleteConfirm(false);
  };

  // Billing handlers
  const handlePlanChange = (planId) => {
    setSelectedPlan(planId);
    setBillingData(prev => ({
      ...prev,
      currentPlan: planId,
      nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    }));
    setShowChangePlanModal(false);
    toast.success(`Plan changed to ${plans.find(p => p.id === planId)?.name}`);
  };

  const handleAddPaymentMethod = () => {
    if (!newPaymentMethod.cardNumber || !newPaymentMethod.cardName || !newPaymentMethod.expiry || !newPaymentMethod.cvv) {
      toast.error('Please fill in all fields');
      return;
    }

    const newCard = {
      id: (billingData.paymentMethods?.length || 0) + 1,
      type: newPaymentMethod.cardNumber.startsWith('4') ? 'visa' : 'mastercard',
      last4: newPaymentMethod.cardNumber.slice(-4),
      expMonth: newPaymentMethod.expiry.split('/')[0],
      expYear: newPaymentMethod.expiry.split('/')[1],
      cardName: newPaymentMethod.cardName,
      isDefault: newPaymentMethod.isDefault || (billingData.paymentMethods?.length || 0) === 0
    };

    setBillingData(prev => ({
      ...prev,
      paymentMethods: [...(prev.paymentMethods || []), newCard]
    }));

    setNewPaymentMethod({
      cardNumber: '',
      cardName: '',
      expiry: '',
      cvv: '',
      isDefault: false
    });
    setShowAddPaymentModal(false);
    toast.success('Payment method added');
  };

  const handleSetDefaultPayment = (methodId) => {
    setBillingData(prev => ({
      ...prev,
      paymentMethods: (prev.paymentMethods || []).map(method => ({
        ...method,
        isDefault: method.id === methodId
      }))
    }));
    toast.success('Default payment method updated');
  };

  const handleRemovePaymentMethod = (methodId) => {
    if ((billingData.paymentMethods?.length || 0) > 1) {
      setBillingData(prev => ({
        ...prev,
        paymentMethods: (prev.paymentMethods || []).filter(m => m.id !== methodId)
      }));
      toast.success('Payment method removed');
    }
    setShowDeleteConfirm(false);
  };

  const confirmRemovePayment = (methodId) => {
    setDeleteItemType('payment');
    setDeleteItemId(methodId);
    setShowDeleteConfirm(true);
  };

  const getDefaultPaymentMethod = () => {
    return billingData.paymentMethods?.find(m => m.isDefault) || billingData.paymentMethods?.[0] || null;
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 50) return 'bg-red-500';
    if (passwordStrength < 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 50) return 'Weak';
    if (passwordStrength < 75) return 'Medium';
    return 'Strong';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Success Alert */}
      {showSavedAlert && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-slideDown">
          <Check size={18} />
          <span>Settings saved successfully!</span>
        </div>
      )}

      {/* Change Plan Modal */}
      {showChangePlanModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="max-w-2xl w-full bg-white rounded-xl shadow-xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">
                Choose Your Plan
              </h2>
              <button
                onClick={() => setShowChangePlanModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X size={20} className="text-gray-600" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    onClick={() => handlePlanChange(plan.id)}
                    className={`relative cursor-pointer p-6 border-2 rounded-xl transition-all ${
                      billingData.currentPlan === plan.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {plan.popular && (
                      <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white text-xs px-3 py-1 rounded-full">
                        Popular
                      </span>
                    )}
                    <div className="text-center mb-4">
                      <span className="text-3xl mb-2 block">{plan.icon}</span>
                      <h3 className="font-bold text-gray-800">
                        {plan.name}
                      </h3>
                      <p className="text-2xl font-bold mt-2 text-gray-800">
                        {plan.price}
                        <span className="text-sm font-normal text-gray-500">
                          /{plan.period}
                        </span>
                      </p>
                    </div>
                    <ul className="space-y-2 mb-4">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <Check size={14} className="text-green-600" />
                          <span className="text-gray-600">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                    {billingData.currentPlan === plan.id && (
                      <div className="absolute bottom-2 right-2">
                        <Check size={20} className="text-blue-600" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowChangePlanModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowChangePlanModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Payment Method Modal */}
      {showAddPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="max-w-md w-full bg-white rounded-xl shadow-xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">
                Add Payment Method
              </h2>
              <button
                onClick={() => setShowAddPaymentModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X size={20} className="text-gray-600" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="4242 4242 4242 4242"
                  value={newPaymentMethod.cardNumber}
                  onChange={(e) => setNewPaymentMethod({...newPaymentMethod, cardNumber: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 border border-gray-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Name on Card
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={newPaymentMethod.cardName}
                  onChange={(e) => setNewPaymentMethod({...newPaymentMethod, cardName: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 border border-gray-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Expiry (MM/YY)
                  </label>
                  <input
                    type="text"
                    placeholder="12/25"
                    value={newPaymentMethod.expiry}
                    onChange={(e) => setNewPaymentMethod({...newPaymentMethod, expiry: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 border border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    CVV
                  </label>
                  <input
                    type="password"
                    placeholder="123"
                    maxLength="3"
                    value={newPaymentMethod.cvv}
                    onChange={(e) => setNewPaymentMethod({...newPaymentMethod, cvv: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 border border-gray-300"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="defaultPayment"
                  checked={newPaymentMethod.isDefault}
                  onChange={(e) => setNewPaymentMethod({...newPaymentMethod, isDefault: e.target.checked})}
                  className="w-4 h-4 text-blue-600"
                />
                <label htmlFor="defaultPayment" className="text-sm text-gray-700">
                  Set as default payment method
                </label>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowAddPaymentModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleAddPaymentMethod}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add Card
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2FA Modal */}
      {show2FAModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="max-w-md w-full bg-white rounded-xl shadow-xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">
                Set up Two-Factor Authentication
              </h2>
              <button
                onClick={() => setShow2FAModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X size={20} className="text-gray-600" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-700">
                  Scan this QR code with your authenticator app, then enter the 6-digit code below.
                </p>
              </div>
              
              <div className="flex justify-center py-4">
                <div className="w-48 h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">QR Code Placeholder</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Verification Code
                </label>
                <input
                  type="text"
                  placeholder="000000"
                  maxLength="6"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="w-full px-4 py-3 text-center text-2xl tracking-widest rounded-lg focus:ring-2 focus:ring-blue-500 border border-gray-300"
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setShow2FAModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleVerify2FA}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Verify & Enable
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="max-w-md w-full bg-white rounded-xl shadow-xl">
            <div className="p-6">
              <div className="flex items-center gap-3 text-red-600 mb-4">
                <AlertCircle size={24} />
                <h2 className="text-xl font-semibold">Confirm Deletion</h2>
              </div>
              
              <p className="text-gray-600 mb-6">
                {deleteItemType === 'account' 
                  ? 'Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.'
                  : 'Are you sure you want to remove this payment method?'}
              </p>
              
              <div className="flex gap-3">
                <button
                  onClick={confirmDelete}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">
              Settings
            </h1>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 bg-gray-100 text-gray-600 rounded-lg"
            >
              <SettingsIcon size={20} />
            </button>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={handleExportData}
                disabled={isExporting}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Download size={16} />
                {isExporting ? 'Exporting...' : 'Export Data'}
              </button>
            </div>
          </div>

          {/* Mobile Sections Menu */}
          {showMobileMenu && (
            <div className="md:hidden mt-4 space-y-2 max-h-96 overflow-y-auto">
              {settingsSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => {
                    setActiveSection(section.id);
                    setShowMobileMenu(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                    activeSection === section.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <section.icon size={18} />
                    <span>{section.label}</span>
                  </div>
                  <ChevronRight size={16} />
                </button>
              ))}
            </div>
          )}

          {/* Desktop Sections Tabs */}
          <div className="hidden md:flex gap-4 mt-4 overflow-x-auto pb-2">
            {settingsSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  activeSection === section.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <section.icon size={16} />
                <span>{section.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Notifications Settings */}
        {activeSection === 'notifications' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-6 text-gray-800">
              Notification Preferences
            </h2>
            
            <div className="space-y-6">
              {/* Delivery Methods */}
              <div>
                <h3 className="font-medium mb-4 text-gray-700">
                  Delivery Methods
                </h3>
                <div className="space-y-4">
                  {[
                    { key: 'email', label: 'Email Notifications', desc: 'Receive updates via email', icon: Mail },
                    { key: 'push', label: 'Push Notifications', desc: 'Browser push notifications', icon: Bell },
                    { key: 'sms', label: 'SMS Alerts', desc: 'Text message alerts', icon: Smartphone },
                    { key: 'digest', label: 'Weekly Digest', desc: 'Weekly summary email', icon: Mail }
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <item.icon size={18} className="text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{item.label}</p>
                          <p className="text-sm text-gray-500">{item.desc}</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={notificationSettings[item.key]}
                          onChange={() => handleNotificationChange(item.key)}
                        />
                        <div className="w-12 h-6 bg-gray-300 rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Alert Types */}
              <div className="pt-4">
                <h3 className="font-medium mb-4 text-gray-700">
                  Alert Types
                </h3>
                <div className="space-y-4">
                  {[
                    { key: 'supplierAlerts', label: 'Supplier Alerts', desc: 'Updates about your suppliers', icon: Bell },
                    { key: 'guideRecommendations', label: 'Guide Recommendations', desc: 'New guides based on your interests', icon: Bell },
                    { key: 'toolUpdates', label: 'Tool Updates', desc: 'New features and calculators', icon: Bell },
                    { key: 'billing', label: 'Billing Notifications', desc: 'Invoices and payment updates', icon: CreditCard },
                    { key: 'security', label: 'Security Alerts', desc: 'Login alerts and security updates', icon: Shield },
                    { key: 'marketing', label: 'Marketing Updates', desc: 'Promotions and product news', icon: Mail }
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <item.icon size={16} className="text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{item.label}</p>
                          <p className="text-sm text-gray-500">{item.desc}</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={notificationSettings[item.key]}
                          onChange={() => handleNotificationChange(item.key)}
                        />
                        <div className="w-12 h-6 bg-gray-300 rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quiet Hours */}
              <div className="pt-4 border-t border-gray-200">
                <h3 className="font-medium mb-4 text-gray-700">
                  Quiet Hours
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2 text-gray-600">Start Time</label>
                    <select 
                      value="9:00 PM"
                      onChange={() => {}}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300"
                    >
                      <option>9:00 PM</option>
                      <option>10:00 PM</option>
                      <option>11:00 PM</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm mb-2 text-gray-600">End Time</label>
                    <select 
                      value="7:00 AM"
                      onChange={() => {}}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300"
                    >
                      <option>7:00 AM</option>
                      <option>8:00 AM</option>
                      <option>9:00 AM</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Privacy Settings */}
        {activeSection === 'privacy' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-6 text-gray-800">
              Privacy Settings
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Profile Visibility
                </label>
                <select
                  value={privacySettings.profileVisibility}
                  onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 border border-gray-300"
                >
                  <option value="public">Public - Anyone can view</option>
                  <option value="private">Private - Only logged in users</option>
                  <option value="hidden">Hidden - Only me</option>
                </select>
              </div>

              <div className="space-y-4 pt-4">
                {[
                  { key: 'showEmail', label: 'Show Email Address', desc: 'Display email on profile' },
                  { key: 'showCompany', label: 'Show Company', desc: 'Display company information' },
                  { key: 'showActivity', label: 'Show Activity', desc: 'Display recent activity' },
                  { key: 'showStats', label: 'Show Statistics', desc: 'Display usage statistics' },
                  { key: 'allowDataCollection', label: 'Allow Data Collection', desc: 'Help improve BizCraft by sharing usage data' }
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0">
                    <div>
                      <p className="font-medium text-gray-800">{item.label}</p>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={privacySettings[item.key]}
                        onChange={() => handlePrivacyChange(item.key, !privacySettings[item.key])}
                      />
                      <div className="w-12 h-6 bg-gray-300 rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                ))}
              </div>

              {/* Data Export */}
              <div className="pt-6 border-t border-gray-200">
                <h3 className="font-medium mb-4 text-gray-700">
                  Data & Privacy
                </h3>
                <div className="space-y-3">
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      Export Format
                    </label>
                    <div className="flex gap-3">
                      {['json', 'csv', 'pdf'].map((format) => (
                        <button
                          key={format}
                          onClick={() => setExportFormat(format)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            exportFormat === format
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {format.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      Date Range
                    </label>
                    <select
                      value={exportDateRange}
                      onChange={(e) => setExportDateRange(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300"
                    >
                      <option value="all">All time</option>
                      <option value="30d">Last 30 days</option>
                      <option value="90d">Last 90 days</option>
                      <option value="year">This year</option>
                    </select>
                  </div>

                  <button
                    onClick={handleExportData}
                    disabled={isExporting}
                    className="flex items-center justify-between w-full p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Download size={18} className="text-blue-600" />
                      <span className="text-blue-600 font-medium">
                        {isExporting ? 'Exporting...' : 'Export My Data'}
                      </span>
                    </div>
                    <ChevronRight size={16} className="text-blue-600" />
                  </button>
                  
                  <button
                    onClick={handleDeleteAccount}
                    className="flex items-center justify-between w-full p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Trash2 size={18} className="text-red-600" />
                      <span className="text-red-600 font-medium">Delete Account</span>
                    </div>
                    <ChevronRight size={16} className="text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Security Settings */}
        {activeSection === 'security' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-6 text-gray-800">
                Security Settings
              </h2>
              
              <div className="space-y-6">
                {/* Change Password */}
                <div>
                  <h3 className="font-medium mb-4 text-gray-700">
                    Change Password
                  </h3>
                  <div className="space-y-4">
                    <div className="relative">
                      <input
                        type={showPassword.current ? 'text' : 'password'}
                        name="current"
                        placeholder="Current Password"
                        value={passwordData.current}
                        onChange={handlePasswordChange}
                        className="w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 border border-gray-300"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(prev => ({ ...prev, current: !prev.current }))}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      >
                        <Eye size={18} />
                      </button>
                    </div>

                    <div className="relative">
                      <input
                        type={showPassword.new ? 'text' : 'password'}
                        name="new"
                        placeholder="New Password"
                        value={passwordData.new}
                        onChange={handlePasswordChange}
                        className="w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 border border-gray-300"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(prev => ({ ...prev, new: !prev.new }))}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      >
                        <Eye size={18} />
                      </button>
                    </div>

                    <div className="relative">
                      <input
                        type={showPassword.confirm ? 'text' : 'password'}
                        name="confirm"
                        placeholder="Confirm New Password"
                        value={passwordData.confirm}
                        onChange={handlePasswordChange}
                        className="w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 border border-gray-300"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(prev => ({ ...prev, confirm: !prev.confirm }))}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      >
                        <Eye size={18} />
                      </button>
                    </div>

                    {/* Password Strength Meter */}
                    {passwordData.new && (
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <p className="text-sm font-medium text-gray-700">
                            Password Strength: {getPasswordStrengthText()}
                          </p>
                          <span className="text-sm text-gray-600">{passwordStrength}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full">
                          <div 
                            className={`h-full ${getPasswordStrengthColor()} rounded-full transition-all`}
                            style={{ width: `${passwordStrength}%` }}
                          ></div>
                        </div>
                        <ul className="text-xs text-gray-500 mt-2 space-y-1">
                          <li className="flex items-center gap-1">
                            <CheckCircle size={12} className={passwordData.new.length >= 8 ? 'text-green-500' : 'text-gray-300'} />
                            At least 8 characters
                          </li>
                          <li className="flex items-center gap-1">
                            <CheckCircle size={12} className={/[a-z]/.test(passwordData.new) ? 'text-green-500' : 'text-gray-300'} />
                            Contains lowercase letter
                          </li>
                          <li className="flex items-center gap-1">
                            <CheckCircle size={12} className={/[A-Z]/.test(passwordData.new) ? 'text-green-500' : 'text-gray-300'} />
                            Contains uppercase letter
                          </li>
                          <li className="flex items-center gap-1">
                            <CheckCircle size={12} className={/[0-9]/.test(passwordData.new) ? 'text-green-500' : 'text-gray-300'} />
                            Contains number
                          </li>
                        </ul>
                      </div>
                    )}

                    <button
                      onClick={handleUpdatePassword}
                      className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Update Password
                    </button>
                  </div>
                </div>

                {/* Two-Factor Authentication */}
                <div className="pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-medium text-gray-800">
                        Two-Factor Authentication
                      </p>
                      <p className="text-sm text-gray-500">
                        Add extra security to your account
                      </p>
                    </div>
                    {securitySettings.twoFactor ? (
                      <div className="flex items-center gap-3">
                        <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                          Enabled
                        </span>
                        <button
                          onClick={() => {
                            setSecuritySettings(prev => ({ ...prev, twoFactor: false }));
                            setTwoFAEnabled(false);
                            toast.success('2FA disabled');
                          }}
                          className="text-sm text-red-600 hover:text-red-700"
                        >
                          Disable
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={handleSetup2FA}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
                      >
                        Enable 2FA
                      </button>
                    )}
                  </div>
                </div>

                {/* Session Settings */}
                <div className="pt-6 border-t border-gray-200">
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Session Timeout (minutes)
                  </label>
                  <select
                    value={securitySettings.sessionTimeout}
                    onChange={(e) => handleSecurityChange('sessionTimeout', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 border border-gray-300"
                  >
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="120">2 hours</option>
                    <option value="240">4 hours</option>
                  </select>
                </div>

                {/* Additional Security Options */}
                <div className="space-y-4 pt-4">
                  {[
                    { key: 'loginAlerts', label: 'Login Alerts', desc: 'Get notified of new logins' },
                    { key: 'deviceTracking', label: 'Device Tracking', desc: 'Track and manage active devices' },
                    { key: 'ipWhitelisting', label: 'IP Whitelisting', desc: 'Restrict access to specific IPs' }
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between py-3">
                      <div>
                        <p className="font-medium text-gray-800">{item.label}</p>
                        <p className="text-sm text-gray-500">{item.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={securitySettings[item.key]}
                          onChange={(e) => handleSecurityChange(item.key, e.target.checked)}
                        />
                        <div className="w-12 h-6 bg-gray-300 rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Active Sessions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">
                Active Sessions
              </h2>
              <div className="space-y-4">
                {activeSessions.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 ${session.isCurrent ? 'bg-green-500' : 'bg-gray-400'} rounded-full`}></div>
                      <div>
                        <p className="font-medium text-gray-800">{session.device}</p>
                        <p className="text-sm text-gray-500">
                          {session.browser} • {session.location} • {session.ip}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">Last active: {session.lastActive}</p>
                      </div>
                    </div>
                    {!session.isCurrent && (
                      <button
                        onClick={() => handleRevokeSession(session.id)}
                        className="text-sm text-red-600 hover:text-red-700"
                      >
                        Revoke
                      </button>
                    )}
                  </div>
                ))}
              </div>
              
              {activeSessions.length > 1 && (
                <button
                  onClick={handleRevokeAllSessions}
                  className="mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-2"
                >
                  <LogOut size={16} />
                  Sign out all other devices
                </button>
              )}
            </div>

            {/* Login History */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">
                Recent Login Activity
              </h2>
              <div className="space-y-3">
                {loginHistory.map((login) => (
                  <div key={login.id} className="flex items-center justify-between text-sm py-2">
                    <div>
                      <p className="text-gray-600">{login.date}</p>
                      <p className="text-xs text-gray-400">{login.device}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-600">{login.location}</p>
                      {login.status === 'failed' && (
                        <span className="text-xs text-red-600">Failed attempt</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Billing Settings */}
        {activeSection === 'billing' && billingData && (
          <div className="space-y-6">
            {/* Current Plan */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">
                Current Plan
              </h2>
              
              <div className="p-6 bg-blue-50 rounded-lg">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <select
                        value={billingData.currentPlan}
                        onChange={(e) => handlePlanChange(e.target.value)}
                        className="text-2xl font-bold px-3 py-1 rounded-lg border-2 bg-white border-gray-200 text-gray-800"
                      >
                        {plans.map(plan => (
                          <option key={plan.id} value={plan.id}>
                            {plan.name}
                          </option>
                        ))}
                      </select>
                      <span className="text-sm bg-green-600 text-white px-3 py-1 rounded-full">
                        Active
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Next billing date:</span> {billingData.nextBillingDate}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Payment method:</span> {getDefaultPaymentMethod() ? 
                          `${getDefaultPaymentMethod().type === 'visa' ? 'Visa' : 'Mastercard'} ending in ${getDefaultPaymentMethod().last4}` 
                          : 'No payment method'}
                      </p>
                    </div>

                    <div className="mt-4 flex gap-3">
                      <button
                        onClick={() => setShowChangePlanModal(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                      >
                        Change Plan
                      </button>
                      <button
                        onClick={() => setShowAddPaymentModal(true)}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 text-sm"
                      >
                        Update Payment Method
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-left md:text-right">
                    <p className="text-3xl font-bold text-blue-600">
                      {plans.find(p => p.id === billingData.currentPlan)?.price}
                    </p>
                    <p className="text-sm text-gray-500">
                      /{plans.find(p => p.id === billingData.currentPlan)?.period}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  Payment Methods
                </h2>
                <button
                  onClick={() => setShowAddPaymentModal(true)}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  <Plus size={16} />
                  Add Payment Method
                </button>
              </div>
              
              <div className="space-y-3">
                {billingData.paymentMethods && billingData.paymentMethods.length > 0 ? (
                  billingData.paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div className={`w-12 h-8 ${
                          method.type === 'visa' ? 'bg-blue-600' : 'bg-orange-600'
                        } rounded flex items-center justify-center text-white text-xs font-bold`}>
                          {method.type === 'visa' ? 'VISA' : 'MC'}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">
                            {method.type === 'visa' ? 'Visa' : 'Mastercard'} ending in {method.last4}
                          </p>
                          <p className="text-xs text-gray-500">
                            Expires {method.expMonth}/{method.expYear}
                          </p>
                        </div>
                        {method.isDefault && (
                          <span className="text-xs bg-green-600 text-white px-2 py-1 rounded-full ml-2">
                            Default
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {!method.isDefault && (
                          <>
                            <button
                              onClick={() => handleSetDefaultPayment(method.id)}
                              className="text-sm text-blue-600 hover:text-blue-700"
                            >
                              Set Default
                            </button>
                            <button
                              onClick={() => confirmRemovePayment(method.id)}
                              className="text-sm text-red-600 hover:text-red-700"
                            >
                              Remove
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center py-4 text-gray-500">
                    No payment methods added yet.
                  </p>
                )}
              </div>
            </div>

            {/* Billing History */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">
                Billing History
              </h2>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 text-sm font-medium text-gray-500">Invoice</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-500">Date</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-500">Amount</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-500">Status</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-500">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {billingData.invoices && billingData.invoices.length > 0 ? (
                      billingData.invoices.map((invoice) => (
                        <tr key={invoice.id} className="border-b border-gray-100">
                          <td className="py-3 text-sm text-gray-700">{invoice.id}</td>
                          <td className="py-3 text-sm text-gray-700">{invoice.date}</td>
                          <td className="py-3 text-sm font-medium text-gray-800">{invoice.amount}</td>
                          <td className="py-3">
                            <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                              {invoice.status}
                            </span>
                          </td>
                          <td className="py-3">
                            <button className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1">
                              <Download size={14} />
                              PDF
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center py-4 text-gray-500">
                          No billing history available.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

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
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Settings;