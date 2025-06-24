import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, ArrowLeft, MapPin, ChevronDown } from 'lucide-react';

const SignupScreen = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    state: '',
    city: '',
    useCurrentLocation: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { signup } = useAuth();
  const navigate = useNavigate();

  const nigerianStates = [
    'Lagos', 'Abuja', 'Kano', 'Rivers', 'Oyo', 'Delta', 'Imo', 'Anambra',
    'Kaduna', 'Katsina', 'Ogun', 'Cross River', 'Kwara', 'Sokoto', 'Kebbi'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleLocationStep = () => {
    if (!formData.state || !formData.city) {
      setError('Please select your location');
      return;
    }
    setStep(2);
  };

  const handleUseCurrentLocation = () => {
    setFormData({
      ...formData,
      state: 'Lagos',
      city: 'Ikeja',
      useCurrentLocation: true
    });
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await signup({
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        location: `${formData.city}, ${formData.state}`,
      });
      
      if (result.success) {
        navigate('/home');
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (step === 1) {
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="flex items-center p-6 pb-4">
          <Link to="/" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </Link>
          <h1 className="text-xl font-semibold text-gray-800 ml-4">Choose Location</h1>
        </div>

        <div className="px-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Where are you located?
            </h2>
            <p className="text-gray-600">
              This helps us find the best runners near you
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State
              </label>
              <div className="relative">
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="input-field appearance-none pr-10"
                  required
                >
                  <option value="">Select State</option>
                  {nigerianStates.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City/Institution
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="input-field"
                placeholder="e.g., Victoria Island, University of Lagos"
                required
              />
            </div>

            <button
              onClick={handleUseCurrentLocation}
              className="w-full flex items-center justify-center gap-2 bg-gray-50 border border-gray-200 py-4 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <MapPin className="w-5 h-5" />
              Use Current Location
            </button>

            <button
              onClick={handleLocationStep}
              className="w-full btn-primary text-lg py-4"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center p-6 pb-4">
        <button 
          onClick={() => setStep(1)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="text-xl font-semibold text-gray-800 ml-4">Create Account</h1>
      </div>

      <div className="px-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Almost there!
          </h2>
          <p className="text-gray-600">
            Fill in your details to get started
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input-field pr-12"
                placeholder="Create a password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="input-field"
              placeholder="+234 800 000 0000"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              value={`${formData.city}, ${formData.state}`}
              className="input-field bg-gray-50"
              disabled
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Creating Account...
              </div>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div className="text-center mt-8 text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-primary font-medium hover:text-primary-dark">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupScreen;