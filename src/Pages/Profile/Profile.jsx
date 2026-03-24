import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { toast } from 'react-hot-toast';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  Calendar,
  Camera,
  Save,
  Edit2,
  Loader,
  CheckCircle,
  Award,
  Users,
  TrendingUp,
  Star,
  Github,
  Linkedin,
  Twitter,
  Plus,
  X,
  Globe,
  PenTool,
  BookOpen,
  Code,
  Coffee,
  Shield,
  Sparkles,
  Zap,
  Rocket,
  Target,
  Crown,
  Medal,
  Trophy,
  Brain,
  Heart,
  Wind,
  Compass,
  Building2,
  GraduationCap,
  Network,
  Clock,
  MailCheck,
  PhoneCall,
  MapPinned,
  BadgeCheck,
  CalendarDays,
  FolderOpen,
  Lightbulb,
  Users2,
  Target as TargetIcon
} from 'lucide-react';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const fileInputRef = useRef(null);
  
  // Profile state from actual user data with additional business fields
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    mobile: user?.mobile || '',
    address: user?.address || '',
    addressLine2: user?.addressLine2 || '',
    city: user?.city || '',
    state: user?.state || '',
    country: user?.country || '',
    postalCode: user?.postalCode || '',
    company: user?.company || '',
    industry: user?.industry || '',
    department: user?.department || '',
    position: user?.position || '',
    bio: user?.bio || 'No bio provided yet.',
    avatar: user?.avatar || null,
    avatarInitial: user?.name ? user.name.charAt(0).toUpperCase() : 'U',
    joinDate: user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    }) : 'Not available',
    role: user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1) || 'Member',
    expertise: user?.expertise || [],
    languages: user?.languages || [],
    education: user?.education || '',
    certifications: user?.certifications || [],
    professionalSummary: user?.professionalSummary || '',
    yearsOfExperience: user?.yearsOfExperience || '',
    availability: user?.availability || 'Available',
    preferredWorkMode: user?.preferredWorkMode || 'Hybrid',
    social: user?.social || {
      github: '',
      linkedin: '',
      twitter: '',
      website: ''
    }
  });

  const [formData, setFormData] = useState({ ...profile });
  const [newExpertise, setNewExpertise] = useState('');
  const [newLanguage, setNewLanguage] = useState('');
  const [newCertification, setNewCertification] = useState('');

  // Update profile when user data changes from context
  useEffect(() => {
    if (user) {
      const updatedProfile = {
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        mobile: user?.mobile || '',
        address: user?.address || '',
        addressLine2: user?.addressLine2 || '',
        city: user?.city || '',
        state: user?.state || '',
        country: user?.country || '',
        postalCode: user?.postalCode || '',
        company: user?.company || '',
        industry: user?.industry || '',
        department: user?.department || '',
        position: user?.position || '',
        bio: user?.bio || 'No bio provided yet.',
        avatar: user?.avatar || null,
        avatarInitial: user?.name ? user.name.charAt(0).toUpperCase() : 'U',
        joinDate: user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { 
          month: 'long', 
          year: 'numeric' 
        }) : 'Not available',
        role: user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1) || 'Member',
        expertise: user?.expertise || [],
        languages: user?.languages || [],
        education: user?.education || '',
        certifications: user?.certifications || [],
        professionalSummary: user?.professionalSummary || '',
        yearsOfExperience: user?.yearsOfExperience || '',
        availability: user?.availability || 'Available',
        preferredWorkMode: user?.preferredWorkMode || 'Hybrid',
        social: user?.social || {
          github: '',
          linkedin: '',
          twitter: '',
          website: ''
        }
      };
      setProfile(updatedProfile);
      setFormData(updatedProfile);
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Handle nested social fields
    if (name.startsWith('social.')) {
      const socialField = name.split('.')[1];
      setFormData({
        ...formData,
        social: {
          ...formData.social,
          [socialField]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
    setUpdateSuccess(false);
  };

  // Handle profile picture upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match(/image\/(jpeg|jpg|png|gif)/)) {
      toast.error('Please upload a valid image file (JPEG, PNG, or GIF)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('avatar', file);

      const response = await api.post('/user/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setFormData({
        ...formData,
        avatar: response.data.avatarUrl
      });

      toast.success('Profile picture uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image. Please try again.');
    } finally {
      setUploadingImage(false);
    }
  };

  // Add expertise
  const handleAddExpertise = () => {
    if (newExpertise.trim() && !formData.expertise.includes(newExpertise.trim())) {
      setFormData({
        ...formData,
        expertise: [...formData.expertise, newExpertise.trim()]
      });
      setNewExpertise('');
    }
  };

  // Remove expertise
  const handleRemoveExpertise = (skillToRemove) => {
    setFormData({
      ...formData,
      expertise: formData.expertise.filter(skill => skill !== skillToRemove)
    });
  };

  // Add language
  const handleAddLanguage = () => {
    if (newLanguage.trim() && !formData.languages.includes(newLanguage.trim())) {
      setFormData({
        ...formData,
        languages: [...formData.languages, newLanguage.trim()]
      });
      setNewLanguage('');
    }
  };

  // Remove language
  const handleRemoveLanguage = (langToRemove) => {
    setFormData({
      ...formData,
      languages: formData.languages.filter(lang => lang !== langToRemove)
    });
  };

  // Add certification
  const handleAddCertification = () => {
    if (newCertification.trim() && !formData.certifications.includes(newCertification.trim())) {
      setFormData({
        ...formData,
        certifications: [...formData.certifications, newCertification.trim()]
      });
      setNewCertification('');
    }
  };

  // Remove certification
  const handleRemoveCertification = (certToRemove) => {
    setFormData({
      ...formData,
      certifications: formData.certifications.filter(cert => cert !== certToRemove)
    });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const updateData = {
        name: formData.name,
        phone: formData.phone,
        mobile: formData.mobile,
        address: formData.address,
        addressLine2: formData.addressLine2,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        postalCode: formData.postalCode,
        company: formData.company,
        industry: formData.industry,
        department: formData.department,
        position: formData.position,
        bio: formData.bio,
        expertise: formData.expertise,
        languages: formData.languages,
        education: formData.education,
        certifications: formData.certifications,
        professionalSummary: formData.professionalSummary,
        yearsOfExperience: formData.yearsOfExperience,
        availability: formData.availability,
        preferredWorkMode: formData.preferredWorkMode,
        social: formData.social,
        avatar: formData.avatar
      };

      const response = await api.put('/user/profile', updateData);
      
      setProfile(formData);
      updateUser(updateData);
      
      setUpdateSuccess(true);
      toast.success('Profile updated successfully!');
      
      setTimeout(() => setUpdateSuccess(false), 3000);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({ ...profile });
    setNewExpertise('');
    setNewLanguage('');
    setNewCertification('');
    setIsEditing(false);
    setUpdateSuccess(false);
  };

  const getInitials = () => {
    if (!profile.name) return 'U';
    return profile.name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Get icon for expertise based on keyword
  const getExpertiseIcon = (skill) => {
    const skillLower = skill.toLowerCase();
    if (skillLower.includes('react') || skillLower.includes('vue') || skillLower.includes('angular')) 
      return <Code className="w-3 h-3" />;
    if (skillLower.includes('design') || skillLower.includes('ui') || skillLower.includes('ux')) 
      return <PenTool className="w-3 h-3" />;
    if (skillLower.includes('business') || skillLower.includes('management')) 
      return <Briefcase className="w-3 h-3" />;
    if (skillLower.includes('security') || skillLower.includes('security')) 
      return <Shield className="w-3 h-3" />;
    if (skillLower.includes('ai') || skillLower.includes('machine')) 
      return <Brain className="w-3 h-3" />;
    if (skillLower.includes('creative') || skillLower.includes('art')) 
      return <Heart className="w-3 h-3" />;
    return <Zap className="w-3 h-3" />;
  };

  return (
    <div className="min-h-screen bg-white py-8 relative overflow-hidden">
      {/* Simple Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-30" />
        
        {/* Simple Dot Pattern */}
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(circle at 1px 1px, #e5e7eb 1px, transparent 0)',
          backgroundSize: '40px 40px',
          opacity: 0.5
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-md p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Professional Profile
                  </h1>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-yellow-500" />
                    Your complete business identity
                  </p>
                </div>
              </div>
              
              {/* Profile Strength Meter */}
              <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12">
                    <svg className="w-12 h-12 transform -rotate-90">
                      <circle
                        cx="24"
                        cy="24"
                        r="20"
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="none"
                        className="text-gray-200"
                      />
                      <circle
                        cx="24"
                        cy="24"
                        r="20"
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="none"
                        strokeDasharray={2 * Math.PI * 20}
                        strokeDashoffset={2 * Math.PI * 20 * 0.25}
                        className="text-blue-600"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-600">75%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-700">Profile Strength</p>
                    <p className="text-xs text-gray-500">Complete to stand out</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Success Message */}
            {updateSuccess && (
              <div className="mt-3 bg-green-500 text-white rounded-lg p-3 flex items-center gap-2 shadow-md animate-slide-down">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                  <CheckCircle size={14} className="text-white" />
                </div>
                <span className="text-sm font-medium">✨ Profile updated successfully!</span>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6 flex flex-wrap gap-2">
          {['overview', 'business', 'expertise', 'social'].map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all transform hover:scale-105 ${
                activeSection === section
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm border border-gray-200'
              }`}
            >
              {section === 'overview' && 'Overview'}
              {section === 'business' && 'Business Details'}
              {section === 'expertise' && 'Skills & Qualifications'}
              {section === 'social' && 'Social'}
            </button>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-4 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 relative group hover:shadow-xl transition-all duration-500">
              {/* Avatar Section */}
              <div className="relative flex justify-center mb-6">
                <div className="relative group/avatar">
                  <div className="relative w-32 h-32 rounded-full bg-blue-600 p-1">
                    <div className="w-full h-full rounded-full bg-white overflow-hidden">
                      {profile.avatar ? (
                        <img 
                          src={profile.avatar} 
                          alt={profile.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-blue-600 text-white text-3xl font-bold">
                          {getInitials()}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Camera Button */}
                  {(isEditing || !profile.avatar) && (
                    <>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/jpeg,image/png,image/gif"
                        className="hidden"
                      />
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploadingImage}
                        className="absolute bottom-2 right-2 p-2.5 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all transform hover:scale-110 disabled:opacity-50"
                      >
                        {uploadingImage ? (
                          <Loader size={16} className="animate-spin" />
                        ) : (
                          <Camera size={16} />
                        )}
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Name and Role */}
              <div className="text-center mb-4">
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="text-xl font-bold text-gray-900 text-center border-b-2 border-blue-500 pb-1 w-full focus:outline-none bg-transparent"
                    placeholder="Your Name"
                  />
                ) : (
                  <h2 className="text-xl font-bold text-gray-900">{profile.name}</h2>
                )}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 mt-2 bg-blue-50 rounded-full">
                  <Medal className="w-3 h-3 text-blue-600" />
                  <span className="text-xs font-medium text-gray-700">{profile.position || 'Professional'}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mb-6">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all transform hover:scale-105 shadow-md text-sm"
                  >
                    <Edit2 size={16} />
                    Edit Profile
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleSave}
                      disabled={loading}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all transform hover:scale-105 disabled:opacity-50 shadow-md text-sm"
                    >
                      {loading ? <Loader size={16} className="animate-spin" /> : <Save size={16} />}
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      disabled={loading}
                      className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all transform hover:scale-105 disabled:opacity-50 text-sm"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>

              {/* Contact Information Cards */}
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Mail size={16} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-sm font-semibold text-gray-900 truncate">{profile.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-9 h-9 bg-purple-600 rounded-lg flex items-center justify-center">
                    <CalendarDays size={16} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">Member Since</p>
                    <p className="text-sm font-semibold text-gray-900">{profile.joinDate}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-9 h-9 bg-green-600 rounded-lg flex items-center justify-center">
                    <Building2 size={16} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">Company</p>
                    {isEditing ? (
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="text-sm font-semibold text-gray-900 bg-transparent border-b border-gray-200 focus:outline-none focus:border-blue-500 w-full"
                        placeholder="Company name"
                      />
                    ) : (
                      <p className="text-sm font-semibold text-gray-900 truncate">{profile.company || 'Not specified'}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-9 h-9 bg-amber-600 rounded-lg flex items-center justify-center">
                    <Clock size={16} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">Availability</p>
                    {isEditing ? (
                      <select
                        name="availability"
                        value={formData.availability}
                        onChange={handleInputChange}
                        className="text-sm font-semibold text-gray-900 bg-transparent border-b border-gray-200 focus:outline-none focus:border-blue-500 w-full"
                      >
                        <option value="Available">Available</option>
                        <option value="Busy">Busy</option>
                        <option value="Open to offers">Open to offers</option>
                        <option value="Not available">Not available</option>
                      </select>
                    ) : (
                      <p className="text-sm font-semibold text-gray-900">{profile.availability}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Summary Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-5">
              <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-blue-600" />
                Professional Summary
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Building2 className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span className="text-gray-600"><span className="font-medium">Company:</span> {profile.company || 'Not specified'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <TargetIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span className="text-gray-600"><span className="font-medium">Industry:</span> {profile.industry || 'Not specified'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <GraduationCap className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span className="text-gray-600"><span className="font-medium">Education:</span> {profile.education || 'Not specified'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span className="text-gray-600"><span className="font-medium">Experience:</span> {profile.yearsOfExperience || 'Not specified'} years</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CalendarDays className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span className="text-gray-600"><span className="font-medium">Member since:</span> {profile.joinDate}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Dynamic Content */}
          <div className="lg:col-span-8 space-y-6">
            {activeSection === 'overview' && (
              <>
                {/* Bio Card */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-5">
                  <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-yellow-500" />
                    About Me
                  </h3>
                  {isEditing ? (
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                      placeholder="Tell us about yourself, your professional background, and what drives you..."
                    />
                  ) : (
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-sm text-gray-700 leading-relaxed">{profile.bio}</p>
                    </div>
                  )}
                </div>

                {/* Address Card - Expanded */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-5">
                  <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <MapPinned className="w-4 h-4 text-red-500" />
                    Address & Location
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1 md:col-span-2">
                      <p className="text-xs text-gray-500">Street Address</p>
                      {isEditing ? (
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          placeholder="Street address"
                        />
                      ) : (
                        <p className="text-sm font-medium text-gray-900">{formData.address || 'Not specified'}</p>
                      )}
                    </div>
                    
                    <div className="space-y-1 md:col-span-2">
                      <p className="text-xs text-gray-500">Address Line 2</p>
                      {isEditing ? (
                        <input
                          type="text"
                          name="addressLine2"
                          value={formData.addressLine2}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          placeholder="Apt, Suite, Unit, etc."
                        />
                      ) : (
                        <p className="text-sm font-medium text-gray-900">{formData.addressLine2 || 'Not specified'}</p>
                      )}
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">City</p>
                      {isEditing ? (
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          placeholder="City"
                        />
                      ) : (
                        <p className="text-sm font-medium text-gray-900">{formData.city || 'Not specified'}</p>
                      )}
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">State/Province</p>
                      {isEditing ? (
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          placeholder="State"
                        />
                      ) : (
                        <p className="text-sm font-medium text-gray-900">{formData.state || 'Not specified'}</p>
                      )}
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">Country</p>
                      {isEditing ? (
                        <input
                          type="text"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          placeholder="Country"
                        />
                      ) : (
                        <p className="text-sm font-medium text-gray-900">{formData.country || 'Not specified'}</p>
                      )}
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">Postal Code</p>
                      {isEditing ? (
                        <input
                          type="text"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          placeholder="Postal code"
                        />
                      ) : (
                        <p className="text-sm font-medium text-gray-900">{formData.postalCode || 'Not specified'}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Contact Details Card - Expanded */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-5">
                  <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <PhoneCall className="w-4 h-4 text-green-600" />
                    Contact Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">Work Phone</p>
                      {isEditing ? (
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          placeholder="Work phone"
                        />
                      ) : (
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <p className="text-sm font-medium text-gray-900">{formData.phone || 'Not provided'}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">Mobile</p>
                      {isEditing ? (
                        <input
                          type="tel"
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          placeholder="Mobile number"
                        />
                      ) : (
                        <div className="flex items-center gap-2">
                          <PhoneCall className="w-4 h-4 text-gray-400" />
                          <p className="text-sm font-medium text-gray-900">{formData.mobile || 'Not provided'}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-1 md:col-span-2">
                      <p className="text-xs text-gray-500">Email</p>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <p className="text-sm font-medium text-gray-900">{formData.email}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-1 md:col-span-2">
                      <p className="text-xs text-gray-500">Website</p>
                      {isEditing ? (
                        <input
                          type="url"
                          name="social.website"
                          value={formData.social.website}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          placeholder="https://yourwebsite.com"
                        />
                      ) : (
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4 text-gray-400" />
                          <p className="text-sm font-medium text-gray-900">{formData.social.website || 'Not provided'}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeSection === 'business' && (
              <div className="space-y-6">
                {/* Company Details Card - Expanded */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-5">
                  <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-blue-600" />
                    Company Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1 md:col-span-2">
                      <p className="text-xs text-gray-500">Company Name</p>
                      {isEditing ? (
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          placeholder="Company name"
                        />
                      ) : (
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-gray-400" />
                          <p className="text-sm font-medium text-gray-900">{formData.company || 'Not specified'}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-1 md:col-span-2">
                      <p className="text-xs text-gray-500">Industry</p>
                      {isEditing ? (
                        <input
                          type="text"
                          name="industry"
                          value={formData.industry}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          placeholder="e.g., Technology, Finance, Healthcare"
                        />
                      ) : (
                        <div className="flex items-center gap-2">
                          <TargetIcon className="w-4 h-4 text-gray-400" />
                          <p className="text-sm font-medium text-gray-900">{formData.industry || 'Not specified'}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">Department</p>
                      {isEditing ? (
                        <input
                          type="text"
                          name="department"
                          value={formData.department}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          placeholder="Department"
                        />
                      ) : (
                        <p className="text-sm font-medium text-gray-900">{formData.department || 'Not specified'}</p>
                      )}
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">Position</p>
                      {isEditing ? (
                        <input
                          type="text"
                          name="position"
                          value={formData.position}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          placeholder="Your Role"
                        />
                      ) : (
                        <p className="text-sm font-medium text-gray-900">{formData.position || 'Not specified'}</p>
                      )}
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">Years of Experience</p>
                      {isEditing ? (
                        <input
                          type="text"
                          name="yearsOfExperience"
                          value={formData.yearsOfExperience}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          placeholder="e.g., 5+ years"
                        />
                      ) : (
                        <p className="text-sm font-medium text-gray-900">{formData.yearsOfExperience || 'Not specified'}</p>
                      )}
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">Work Mode</p>
                      {isEditing ? (
                        <select
                          name="preferredWorkMode"
                          value={formData.preferredWorkMode}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        >
                          <option value="Remote">Remote</option>
                          <option value="Hybrid">Hybrid</option>
                          <option value="On-site">On-site</option>
                          <option value="Flexible">Flexible</option>
                        </select>
                      ) : (
                        <p className="text-sm font-medium text-gray-900">{formData.preferredWorkMode}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Education & Certifications Card - Expanded */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-5">
                  <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-purple-600" />
                    Education & Certifications
                  </h3>
                  
                  {/* Education */}
                  <div className="mb-6">
                    <p className="text-xs text-gray-500 mb-2">Education</p>
                    {isEditing ? (
                      <input
                        type="text"
                        name="education"
                        value={formData.education}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                        placeholder="e.g., MBA, B.Sc. Computer Science"
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-2 bg-purple-50 rounded-lg">
                        <GraduationCap className="w-4 h-4 text-purple-600" />
                        <p className="text-sm font-medium text-gray-900">{formData.education || 'Not specified'}</p>
                      </div>
                    )}
                  </div>

                  {/* Certifications */}
                  <div>
                    <p className="text-xs text-gray-500 mb-2">Professional Certifications</p>
                    {isEditing ? (
                      <div>
                        <div className="flex flex-wrap gap-2 mb-3 min-h-[60px] p-3 bg-gray-50 rounded-xl">
                          {formData.certifications.length > 0 ? (
                            formData.certifications.map((cert, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center gap-1 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-xs font-medium"
                              >
                                <Award size={12} />
                                {cert}
                                <button
                                  onClick={() => handleRemoveCertification(cert)}
                                  className="ml-1 hover:bg-purple-200 rounded-full p-0.5 transition-colors"
                                >
                                  <X size={12} />
                                </button>
                              </span>
                            ))
                          ) : (
                            <p className="text-gray-400 text-sm italic">No certifications added yet. Add your professional certifications below.</p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={newCertification}
                            onChange={(e) => setNewCertification(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleAddCertification()}
                            placeholder="Add certification (e.g., PMP, AWS, CPA)..."
                            className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                          />
                          <button
                            onClick={handleAddCertification}
                            className="px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all transform hover:scale-105 shadow text-sm"
                          >
                            <Plus size={18} />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2 min-h-[60px] p-3 bg-gray-50 rounded-xl">
                        {formData.certifications.length > 0 ? (
                          formData.certifications.map((cert, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center gap-1 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-xs font-medium"
                            >
                              <Award size={12} />
                              {cert}
                            </span>
                          ))
                        ) : (
                          <p className="text-gray-500 text-sm w-full text-center py-2">No certifications added</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Professional Summary Card */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-5">
                  <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-blue-600" />
                    Professional Summary
                  </h3>
                  {isEditing ? (
                    <textarea
                      name="professionalSummary"
                      value={formData.professionalSummary}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                      placeholder="Summarize your professional background, key achievements, and career goals..."
                    />
                  ) : (
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-sm text-gray-700 leading-relaxed">{formData.professionalSummary || 'No professional summary added yet.'}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeSection === 'expertise' && (
              <div className="space-y-6">
                {/* Expertise Card - Expanded */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-5">
                  <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Brain className="w-4 h-4 text-blue-600" />
                    Skills & Expertise
                  </h3>
                  {isEditing ? (
                    <div>
                      <div className="flex flex-wrap gap-2 mb-3 min-h-[100px] p-4 bg-gray-50 rounded-xl">
                        {formData.expertise.length > 0 ? (
                          formData.expertise.map((skill, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium shadow"
                            >
                              {getExpertiseIcon(skill)}
                              {skill}
                              <button
                                onClick={() => handleRemoveExpertise(skill)}
                                className="ml-1 hover:bg-white/20 rounded-full p-0.5 transition-colors"
                              >
                                <X size={12} />
                              </button>
                            </span>
                          ))
                        ) : (
                          <p className="text-gray-400 text-sm italic w-full text-center py-4">No skills added yet. Add your professional skills below.</p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newExpertise}
                          onChange={(e) => setNewExpertise(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleAddExpertise()}
                          placeholder="Add a skill (e.g., Project Management, React, Leadership)..."
                          className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        />
                        <button
                          onClick={handleAddExpertise}
                          className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all transform hover:scale-105 shadow text-sm"
                        >
                          <Plus size={18} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2 min-h-[100px] p-4 bg-gray-50 rounded-xl">
                      {formData.expertise.length > 0 ? (
                        formData.expertise.map((skill, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium shadow"
                          >
                            {getExpertiseIcon(skill)}
                            {skill}
                          </span>
                        ))
                      ) : (
                        <p className="text-gray-500 text-sm w-full text-center py-4">No skills added yet</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Languages Card - Expanded */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-5">
                  <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-green-600" />
                    Languages
                  </h3>
                  {isEditing ? (
                    <div>
                      <div className="flex flex-wrap gap-2 mb-3 min-h-[80px] p-4 bg-gray-50 rounded-xl">
                        {formData.languages.length > 0 ? (
                          formData.languages.map((lang, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white rounded-lg text-xs font-medium shadow"
                            >
                              <Globe size={12} />
                              {lang}
                              <button
                                onClick={() => handleRemoveLanguage(lang)}
                                className="ml-1 hover:bg-white/20 rounded-full p-0.5 transition-colors"
                              >
                                <X size={12} />
                              </button>
                            </span>
                          ))
                        ) : (
                          <p className="text-gray-400 text-sm italic w-full text-center py-4">No languages added yet. Add languages you speak.</p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newLanguage}
                          onChange={(e) => setNewLanguage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleAddLanguage()}
                          placeholder="Add a language (e.g., English, Spanish, French)..."
                          className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                        />
                        <button
                          onClick={handleAddLanguage}
                          className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all transform hover:scale-105 shadow text-sm"
                        >
                          <Plus size={18} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2 min-h-[80px] p-4 bg-gray-50 rounded-xl">
                      {formData.languages.length > 0 ? (
                        formData.languages.map((lang, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white rounded-lg text-xs font-medium shadow"
                          >
                            <Globe size={12} />
                            {lang}
                          </span>
                        ))
                      ) : (
                        <p className="text-gray-500 text-sm w-full text-center py-4">No languages added yet</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeSection === 'social' && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-5">
                <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Users className="w-4 h-4 text-pink-600" />
                  Social & Professional Networks
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Github size={20} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-900">GitHub</p>
                      {isEditing ? (
                        <input
                          type="text"
                          name="social.github"
                          value={formData.social.github}
                          onChange={handleInputChange}
                          className="w-full bg-transparent border-b border-gray-200 py-1 focus:outline-none focus:border-blue-500 text-sm"
                          placeholder="username"
                        />
                      ) : (
                        <p className="text-sm text-gray-600">{formData.social.github || 'Not connected'}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Linkedin size={20} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-900">LinkedIn</p>
                      {isEditing ? (
                        <input
                          type="text"
                          name="social.linkedin"
                          value={formData.social.linkedin}
                          onChange={handleInputChange}
                          className="w-full bg-transparent border-b border-gray-200 py-1 focus:outline-none focus:border-blue-500 text-sm"
                          placeholder="profile-url"
                        />
                      ) : (
                        <p className="text-sm text-gray-600">{formData.social.linkedin || 'Not connected'}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-sky-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Twitter size={20} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-900">Twitter</p>
                      {isEditing ? (
                        <input
                          type="text"
                          name="social.twitter"
                          value={formData.social.twitter}
                          onChange={handleInputChange}
                          className="w-full bg-transparent border-b border-gray-200 py-1 focus:outline-none focus:border-blue-500 text-sm"
                          placeholder="@handle"
                        />
                      ) : (
                        <p className="text-sm text-gray-600">{formData.social.twitter || 'Not connected'}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Profile;