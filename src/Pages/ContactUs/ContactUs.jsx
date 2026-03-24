// src/Pages/ContactUs/ContactUs.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  X,
  AlertCircle,
  Loader,
  Sparkles,
  Headphones,
  MessageCircle,
  Globe,
  Users,
  Clock,
  Award,
  ChevronRight,
  Twitter,
  Facebook,
  Linkedin,
  Youtube,
  Instagram,
  MessageSquare,
  HelpCircle,
  Calendar,
  Building,
  User,
  FileText,
  ArrowRight
} from 'lucide-react';
import { toast } from 'react-hot-toast';

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
  .stagger-item:nth-child(7) { animation-delay: 0.7s; }
  .stagger-item:nth-child(8) { animation-delay: 0.8s; }
  
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

const ContactUs = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: '',
    department: 'general'
  });
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  // FAQ data
  const faqs = [
    {
      id: 1,
      question: 'How quickly do you respond to inquiries?',
      answer: 'We aim to respond to all inquiries within 24 hours during business days. For urgent matters, we recommend using our live chat or phone support for immediate assistance.'
    },
    {
      id: 2,
      question: 'Do you offer support on weekends?',
      answer: 'Yes! Our support team is available 24/7 via email and live chat. Phone support is available Monday-Friday, 9am-6pm EST.'
    },
    {
      id: 3,
      question: 'Can I schedule a demo of BizCraft?',
      answer: 'Absolutely! You can request a personalized demo through our contact form or by emailing sales@bizcraft.com. A product specialist will reach out to schedule a convenient time.'
    },
    {
      id: 4,
      question: 'How do I report a bug or technical issue?',
      answer: 'Please use the contact form and select "Technical Support" as the department. Include as much detail as possible, including screenshots and steps to reproduce the issue.'
    }
  ];

  // Department options
  const departments = [
    { id: 'general', name: 'General Inquiry', email: 'info@bizcraft.com' },
    { id: 'sales', name: 'Sales', email: 'sales@bizcraft.com' },
    { id: 'support', name: 'Technical Support', email: 'support@bizcraft.com' },
    { id: 'billing', name: 'Billing', email: 'billing@bizcraft.com' },
    { id: 'partnerships', name: 'Partnerships', email: 'partners@bizcraft.com' },
    { id: 'press', name: 'Press & Media', email: 'press@bizcraft.com' }
  ];

  // Office locations
  const offices = [
    {
      city: 'New York',
      address: '123 Business Ave, Suite 100',
      cityState: 'New York, NY 10001',
      phone: '+1 (212) 555-0123',
      email: 'nyc@bizcraft.com',
      hours: 'Mon-Fri, 9am-6pm EST'
    },
    {
      city: 'San Francisco',
      address: '456 Market Street, Floor 12',
      cityState: 'San Francisco, CA 94105',
      phone: '+1 (415) 555-0456',
      email: 'sf@bizcraft.com',
      hours: 'Mon-Fri, 9am-6pm PST'
    },
    {
      city: 'London',
      address: '789 Oxford Street',
      cityState: 'London, UK W1D 1BS',
      phone: '+44 (20) 7946-0123',
      email: 'london@bizcraft.com',
      hours: 'Mon-Fri, 9am-6pm GMT'
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.subject.trim()) {
      errors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }
    
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      toast.error('Please fix the errors in the form');
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          subject: '',
          message: '',
          department: 'general'
        });
      }, 3000);
    }, 1500);
  };

  const handleChatNow = () => {
    toast.success('Connecting you to a live agent...');
  };

  const handleScheduleCall = () => {
    toast.success('Redirecting to scheduling page...');
    setTimeout(() => {
      navigate('/schedule');
    }, 1500);
  };

  const toggleFaq = (id) => {
    setActiveFaq(activeFaq === id ? null : id);
  };

  const getDepartmentEmail = () => {
    const dept = departments.find(d => d.id === formData.department);
    return dept ? dept.email : 'info@bizcraft.com';
  };

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
              <Mail size={16} className="text-blue-300" />
              <span className="text-sm text-blue-200">Get in Touch</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-slideUp">
              Contact Us
            </h1>

            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto animate-slideUp">
              Have questions? We're here to help. Reach out to our team and we'll get back to you as soon as possible.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/10">
                <Headphones size={24} className="text-blue-400 mx-auto mb-2" />
                <div className="text-lg md:text-xl font-bold text-white">24/7</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Support</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/10">
                <Clock size={24} className="text-green-400 mx-auto mb-2" />
                <div className="text-lg md:text-xl font-bold text-white">15min</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Response</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/10">
                <Users size={24} className="text-purple-400 mx-auto mb-2" />
                <div className="text-lg md:text-xl font-bold text-white">50K+</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Customers</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/10">
                <Globe size={24} className="text-yellow-400 mx-auto mb-2" />
                <div className="text-lg md:text-xl font-bold text-white">40+</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Countries</div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400"></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Quick Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Live Chat */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 text-center hover:shadow-lg transition-all hover-lift stagger-item">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle size={32} className="text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Live Chat</h3>
            <p className="text-sm text-gray-600 mb-4">
              Chat with our support team in real-time
            </p>
            <p className="text-xs text-green-600 mb-3">Average response: 2 minutes</p>
            <button
              onClick={handleChatNow}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Start Chat
            </button>
          </div>

          {/* Email Support */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 text-center hover:shadow-lg transition-all hover-lift stagger-item" style={{ animationDelay: '0.1s' }}>
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail size={32} className="text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Email Support</h3>
            <p className="text-sm text-gray-600 mb-4">
              Send us an email and we'll get back to you
            </p>
            <p className="text-xs text-purple-600 mb-3">Response within 24 hours</p>
            <a
              href="mailto:support@bizcraft.com"
              className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium inline-block"
            >
              Email Us
            </a>
          </div>

          {/* Phone Support */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 text-center hover:shadow-lg transition-all hover-lift stagger-item" style={{ animationDelay: '0.2s' }}>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone size={32} className="text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Phone Support</h3>
            <p className="text-sm text-gray-600 mb-4">
              Talk to a support specialist directly
            </p>
            <p className="text-xs text-green-600 mb-3">Mon-Fri, 9am-6pm EST</p>
            <a
              href="tel:+18005551234"
              className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium inline-block"
            >
              Call Now
            </a>
          </div>
        </div>

        {/* Contact Form and Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Send Us a Message</h2>
              <p className="text-gray-600 mb-6">Fill out the form below and we'll get back to you as soon as possible.</p>
              
              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                  <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-green-800 mb-2">Message Sent!</h3>
                  <p className="text-green-600 mb-4">Thank you for contacting us. We'll respond within 24 hours.</p>
                  <p className="text-sm text-gray-500">A confirmation has been sent to {formData.email}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-2 border ${formErrors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                          placeholder="John Doe"
                        />
                      </div>
                      {formErrors.name && (
                        <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle size={12} />
                          {formErrors.name}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-2 border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                          placeholder="john@example.com"
                        />
                      </div>
                      {formErrors.email && (
                        <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle size={12} />
                          {formErrors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Company */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company
                      </label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="BizCraft Inc."
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="+1 (800) 555-1234"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Department */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Department
                    </label>
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      {departments.map(dept => (
                        <option key={dept.id} value={dept.id}>{dept.name}</option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-1">
                      This message will be sent to: {getDepartmentEmail()}
                    </p>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-2 border ${formErrors.subject ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                        placeholder="How can we help?"
                      />
                    </div>
                    {formErrors.subject && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle size={12} />
                        {formErrors.subject}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="6"
                      className={`w-full px-4 py-2 border ${formErrors.message ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                      placeholder="Tell us more about your question or issue..."
                    />
                    {formErrors.message && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle size={12} />
                        {formErrors.message}
                      </p>
                    )}
                    <p className="text-xs text-gray-500 mt-1 text-right">
                      {formData.message.length}/500 characters
                    </p>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? (
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

                  <p className="text-xs text-gray-500 text-center mt-4">
                    By submitting this form, you agree to our <button onClick={() => navigate('/privacy')} className="text-blue-600 hover:underline">Privacy Policy</button> and <button onClick={() => navigate('/terms')} className="text-blue-600 hover:underline">Terms of Service</button>.
                  </p>
                </form>
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Mail size={18} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Email</p>
                    <a href="mailto:info@bizcraft.com" className="text-sm text-blue-600 hover:underline">
                      info@bizcraft.com
                    </a>
                    <p className="text-xs text-gray-500">General inquiries</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Phone size={18} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Phone</p>
                    <a href="tel:+18005551234" className="text-sm text-blue-600 hover:underline">
                      +1 (800) 555-1234
                    </a>
                    <p className="text-xs text-gray-500">Mon-Fri, 9am-6pm EST</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <MapPin size={18} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Headquarters</p>
                    <p className="text-sm text-gray-600">123 Business Ave</p>
                    <p className="text-sm text-gray-600">Suite 100</p>
                    <p className="text-sm text-gray-600">New York, NY 10001</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <Clock size={18} className="text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Business Hours</p>
                    <p className="text-sm text-gray-600">Monday - Friday</p>
                    <p className="text-sm text-gray-600">9:00 AM - 6:00 PM EST</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Follow Us</h4>
                <div className="flex gap-3">
                  <button className="p-2 bg-gray-100 rounded-full hover:bg-blue-100 hover:text-blue-600 transition-colors">
                    <Twitter size={18} />
                  </button>
                  <button className="p-2 bg-gray-100 rounded-full hover:bg-blue-100 hover:text-blue-600 transition-colors">
                    <Facebook size={18} />
                  </button>
                  <button className="p-2 bg-gray-100 rounded-full hover:bg-blue-100 hover:text-blue-600 transition-colors">
                    <Linkedin size={18} />
                  </button>
                  <button className="p-2 bg-gray-100 rounded-full hover:bg-pink-100 hover:text-pink-600 transition-colors">
                    <Instagram size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Schedule a Call */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-md p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Schedule a Call</h3>
              <p className="text-sm text-blue-100 mb-4">
                Prefer to talk? Schedule a call with our team at your convenience.
              </p>
              <button
                onClick={handleScheduleCall}
                className="w-full px-4 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
              >
                <Calendar size={18} />
                Schedule Now
              </button>
            </div>
          </div>
        </div>

        {/* Office Locations */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Our Offices</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {offices.map((office, index) => (
              <div
                key={office.city}
                className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-all hover-lift stagger-item"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <MapPin size={20} className="text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800">{office.city}</h3>
                </div>
                <p className="text-sm text-gray-600 mb-2">{office.address}</p>
                <p className="text-sm text-gray-600 mb-3">{office.cityState}</p>
                <div className="space-y-2 text-sm">
                  <a href={`tel:${office.phone.replace(/\D/g, '')}`} className="flex items-center gap-2 text-blue-600 hover:underline">
                    <Phone size={14} />
                    {office.phone}
                  </a>
                  <a href={`mailto:${office.email}`} className="flex items-center gap-2 text-blue-600 hover:underline">
                    <Mail size={14} />
                    {office.email}
                  </a>
                  <div className="flex items-center gap-2 text-gray-500">
                    <Clock size={14} />
                    {office.hours}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
            {faqs.map((faq) => (
              <div key={faq.id} className="border-b border-gray-100 last:border-0">
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-800">{faq.question}</span>
                  <ChevronRight
                    size={18}
                    className={`text-gray-400 transition-transform ${activeFaq === faq.id ? 'rotate-90' : ''}`}
                  />
                </button>
                {activeFaq === faq.id && (
                  <div className="px-6 pb-4 text-gray-600 text-sm border-t border-gray-100 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Help Center Link */}
        <div className="text-center">
          <p className="text-gray-600 mb-4">Looking for answers? Check out our Help Center.</p>
          <button
            onClick={() => navigate('/help')}
            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors inline-flex items-center gap-2"
          >
            <HelpCircle size={18} />
            Visit Help Center
            <ArrowRight size={16} />
          </button>
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
              <h4 className="text-white font-medium mb-3 text-xs uppercase tracking-wider">Company</h4>
              <ul className="space-y-1.5 text-xs">
                <li><button onClick={() => navigate('/about')} className="hover:text-white transition-colors">About Us</button></li>
                <li><button onClick={() => navigate('/careers')} className="hover:text-white transition-colors">Careers</button></li>
                <li><button onClick={() => navigate('/press')} className="hover:text-white transition-colors">Press</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-3 text-xs uppercase tracking-wider">Support</h4>
              <ul className="space-y-1.5 text-xs">
                <li><button onClick={() => navigate('/help')} className="hover:text-white transition-colors">Help Center</button></li>
                <li><button onClick={() => navigate('/contact')} className="hover:text-white transition-colors">Contact</button></li>
                <li><button onClick={() => navigate('/status')} className="hover:text-white transition-colors">System Status</button></li>
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

export default ContactUs;