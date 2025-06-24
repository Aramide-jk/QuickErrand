import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import BottomNavigation from './BottomNavigation';
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Shield, 
  Star, 
  Settings, 
  HelpCircle, 
  LogOut, 
  ChevronRight,
  Camera,
  Bell,
  Lock,
  CreditCard,
  Edit3,
  Save,
  X,
  TrendingUp,
  Clock,
  Award,
  DollarSign
} from 'lucide-react';

const ProfileScreen = () => {
  const { user, logout, updateUser } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isRunnerMode, setIsRunnerMode] = useState(user?.role === 'runner');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || ''
  });

  const handleLogout = () => {
    logout();
    setShowLogoutModal(false);
  };

  const toggleRunnerMode = () => {
    const newRole = isRunnerMode ? 'user' : 'runner';
    setIsRunnerMode(!isRunnerMode);
    updateUser({ role: newRole });
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      updateUser(editForm);
      setIsEditing(false);
    } else {
      // Start editing
      setEditForm({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        location: user?.location || ''
      });
      setIsEditing(true);
    }
  };

  const handleCancelEdit = () => {
    setEditForm({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      location: user?.location || ''
    });
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleProfilePictureUpload = () => {
    // Create a file input element
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        // In a real app, you would upload this to a server
        // For now, we'll just show an alert
        alert('Profile picture upload functionality would be implemented here');
      }
    };
    input.click();
  };

  // Different stats based on user role
  const userStats = [
    { label: 'Completed Orders', value: '12', icon: '✅' },
    { label: 'Average Rating', value: '4.8', icon: '⭐' },
    { label: 'Money Saved', value: '₦15,000', icon: '💰' }
  ];

  const runnerStats = [
    { label: 'Orders Completed', value: '47', icon: '✅' },
    { label: 'Runner Rating', value: '4.9', icon: '⭐' },
    { label: 'Total Earned', value: '₦85,000', icon: '💰' },
    { label: 'This Month', value: '₦12,500', icon: '📈' },
    { label: 'Response Time', value: '3 mins', icon: '⚡' },
    { label: 'Success Rate', value: '98%', icon: '🎯' }
  ];

  const profileStats = isRunnerMode ? runnerStats : userStats;

  const userMenuSections = [
    {
      title: 'Account',
      items: [
        { icon: Shield, label: 'KYC Verification', action: () => {}, badge: user?.isVerified ? 'Verified' : 'Pending' },
        { icon: Bell, label: 'Notifications', action: () => {} },
        { icon: Lock, label: 'Privacy & Security', action: () => {} }
      ]
    },
    {
      title: 'Payments',
      items: [
        { icon: CreditCard, label: 'Payment Methods', action: () => {} },
        { icon: Star, label: 'Referral Program', action: () => {} }
      ]
    },
    {
      title: 'Support',
      items: [
        { icon: HelpCircle, label: 'Help Center', action: () => {} },
        { icon: Settings, label: 'Settings', action: () => {} }
      ]
    }
  ];

  const runnerMenuSections = [
    {
      title: 'Runner Dashboard',
      items: [
        { icon: TrendingUp, label: 'Earnings Analytics', action: () => {} },
        { icon: Clock, label: 'Working Hours', action: () => {} },
        { icon: Award, label: 'Performance Metrics', action: () => {} },
        { icon: DollarSign, label: 'Payout Settings', action: () => {} }
      ]
    },
    {
      title: 'Account',
      items: [
        { icon: Shield, label: 'Runner Verification', action: () => {}, badge: user?.isVerified ? 'Verified' : 'Pending' },
        { icon: Bell, label: 'Job Notifications', action: () => {} },
        { icon: Lock, label: 'Privacy & Security', action: () => {} }
      ]
    },
    {
      title: 'Support',
      items: [
        { icon: HelpCircle, label: 'Runner Support', action: () => {} },
        { icon: Settings, label: 'Settings', action: () => {} }
      ]
    }
  ];

  const menuSections = isRunnerMode ? runnerMenuSections : userMenuSections;

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-800">
              {isRunnerMode ? 'Runner Profile' : 'Profile'}
            </h1>
            <button
              onClick={isEditing ? handleEditToggle : handleEditToggle}
              className="flex items-center space-x-2 px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              {isEditing ? (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </>
              ) : (
                <>
                  <Edit3 className="w-4 h-4" />
                  <span>Edit</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Profile Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-4 mb-4">
            <div className="relative">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                isRunnerMode ? 'bg-green-500' : 'bg-primary'
              }`}>
                <span className="text-white font-semibold text-xl">
                  {user?.name?.charAt(0)}
                </span>
              </div>
              <button 
                onClick={handleProfilePictureUpload}
                className="absolute -bottom-1 -right-1 w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <Camera className="w-3 h-3 text-white" />
              </button>
              {isRunnerMode && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">🏃</span>
                </div>
              )}
            </div>
            
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full text-lg font-semibold bg-gray-50 border border-gray-200 rounded-lg px-3 py-2"
                    placeholder="Full Name"
                  />
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-2"
                    placeholder="Email"
                  />
                  <input
                    type="tel"
                    value={editForm.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-2"
                    placeholder="Phone"
                  />
                  <input
                    type="text"
                    value={editForm.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-full text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-2"
                    placeholder="Location"
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={handleCancelEdit}
                      className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center space-x-2 mb-1">
                    <h2 className="text-lg font-semibold text-gray-800">{user?.name}</h2>
                    {isRunnerMode && (
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                        Active Runner
                      </span>
                    )}
                  </div>
                  <div className="flex items-center text-gray-600 text-sm space-x-4">
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-1" />
                      <span>{user?.email}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm mt-1">
                    <Phone className="w-4 h-4 mr-1" />
                    <span>{user?.phone}</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{user?.location}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Runner Mode Toggle */}
          <div className={`rounded-lg p-4 mb-4 ${
            isRunnerMode ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-800">Runner Mode</h3>
                <p className="text-sm text-gray-600">
                  {isRunnerMode ? 'You are currently accepting errand requests' : 'Start earning by running errands'}
                </p>
              </div>
              <button
                onClick={toggleRunnerMode}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isRunnerMode ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isRunnerMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            {isRunnerMode && (
              <div className="mt-3 p-3 bg-green-100 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <p className="text-sm text-green-700 font-medium">Online & Available</p>
                </div>
                <p className="text-xs text-green-600">You're visible to customers looking for runners in your area</p>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className={`grid gap-4 ${isRunnerMode ? 'grid-cols-2' : 'grid-cols-3'}`}>
            {profileStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className="font-semibold text-gray-800">{stat.value}</div>
                <div className="text-xs text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Runner-specific quick actions */}
          {isRunnerMode && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-3">
                <button className="bg-green-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors">
                  View Available Jobs
                </button>
                <button className="bg-blue-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
                  Earnings Report
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Menu Sections */}
        {menuSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
              <h3 className="font-medium text-gray-800 text-sm">{section.title}</h3>
            </div>
            
            {section.items.map((item, itemIndex) => (
              <button
                key={itemIndex}
                onClick={item.action}
                className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${
                  itemIndex !== section.items.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-800">{item.label}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {item.badge && (
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      item.badge === 'Verified' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </button>
            ))}
          </div>
        ))}

        {/* Logout Button */}
        <button
          onClick={() => setShowLogoutModal(true)}
          className="w-full bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center space-x-3 hover:bg-red-50 hover:border-red-200 transition-colors"
        >
          <LogOut className="w-5 h-5 text-red-500" />
          <span className="text-red-500 font-medium">Logout</span>
        </button>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Logout</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to logout?</p>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNavigation />
    </div>
  );
};

export default ProfileScreen;