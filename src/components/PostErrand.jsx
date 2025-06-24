import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, DollarSign, CreditCard } from 'lucide-react';

const PostErrand = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const categoryFromUrl = searchParams.get('category');

  const [formData, setFormData] = useState({
    serviceType: categoryFromUrl || '',
    itemName: '',
    description: '',
    pickupAddress: '',
    deliveryAddress: '',
    preferredTime: 'asap',
    scheduledTime: '',
    itemPrice: '',
    runnerFee: '500',
    paymentMethod: 'pay-now'
  });

  const [isLoading, setIsLoading] = useState(false);

  const serviceTypes = {
    grocery: 'Grocery Shopping',
    pharmacy: 'Pharmacy Pickup',
    queue: 'Queue Services',
    bills: 'Bill Payment',
    delivery: 'Pickup/Delivery',
    custom: 'Custom Errand'
  };

  const calculateTotal = () => {
    const itemPrice = parseFloat(formData.itemPrice) || 0;
    const runnerFee = parseFloat(formData.runnerFee) || 0;
    return itemPrice + runnerFee;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate('/requests');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="flex items-center p-6">
          <Link to="/home" className="p-2 hover:bg-gray-100 rounded-full transition-colors mr-4">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </Link>
          <h1 className="text-xl font-semibold text-gray-800">Post New Errand</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="px-6 py-6 space-y-6">
        {/* Service Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Service Type
          </label>
          <select
            name="serviceType"
            value={formData.serviceType}
            onChange={handleChange}
            className="input-field"
            required
          >
            <option value="">Select Service Type</option>
            {Object.entries(serviceTypes).map(([key, value]) => (
              <option key={key} value={key}>{value}</option>
            ))}
          </select>
        </div>

        {/* Item Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Item/Service Name
          </label>
          <input
            type="text"
            name="itemName"
            value={formData.itemName}
            onChange={handleChange}
            className="input-field"
            placeholder="e.g., Grocery shopping at Shoprite"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="input-field resize-none"
            placeholder="Provide detailed instructions for the runner..."
            required
          />
        </div>

        {/* Pickup Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pickup Address
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="pickupAddress"
              value={formData.pickupAddress}
              onChange={handleChange}
              className="input-field pl-12"
              placeholder="Enter pickup location"
              required
            />
          </div>
        </div>

        {/* Delivery Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Delivery Address
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="deliveryAddress"
              value={formData.deliveryAddress}
              onChange={handleChange}
              className="input-field pl-12"
              placeholder="Enter delivery location"
              required
            />
          </div>
        </div>

        {/* Preferred Time */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Time
          </label>
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="radio"
                name="preferredTime"
                value="asap"
                checked={formData.preferredTime === 'asap'}
                onChange={handleChange}
                className="mr-3 text-primary focus:ring-primary"
              />
              <Clock className="w-4 h-4 mr-2 text-gray-500" />
              <span>ASAP</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="preferredTime"
                value="scheduled"
                checked={formData.preferredTime === 'scheduled'}
                onChange={handleChange}
                className="mr-3 text-primary focus:ring-primary"
              />
              <Clock className="w-4 h-4 mr-2 text-gray-500" />
              <span>Schedule for later</span>
            </label>
          </div>
          
          {formData.preferredTime === 'scheduled' && (
            <div className="mt-3">
              <input
                type="datetime-local"
                name="scheduledTime"
                value={formData.scheduledTime}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>
          )}
        </div>

        {/* Pricing */}
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <h3 className="font-medium text-gray-800 mb-4">Pricing</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Item Price (₦) - Optional
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  name="itemPrice"
                  value={formData.itemPrice}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Runner Fee (₦)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  name="runnerFee"
                  value={formData.runnerFee}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="500"
                  min="100"
                  step="50"
                  required
                />
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center font-semibold text-lg">
                <span>Total Budget:</span>
                <span className="text-primary">₦{calculateTotal().toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Payment Method
          </label>
          <div className="space-y-3">
            <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="paymentMethod"
                value="pay-now"
                checked={formData.paymentMethod === 'pay-now'}
                onChange={handleChange}
                className="mr-3 text-primary focus:ring-primary"
              />
              <CreditCard className="w-4 h-4 mr-2 text-gray-500" />
              <span>Pay Now</span>
            </label>
            <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="paymentMethod"
                value="pay-on-delivery"
                checked={formData.paymentMethod === 'pay-on-delivery'}
                onChange={handleChange}
                className="mr-3 text-primary focus:ring-primary"
              />
              <CreditCard className="w-4 h-4 mr-2 text-gray-500" />
              <span>Pay on Delivery</span>
              <span className="ml-auto text-xs text-gray-500">Verified users only</span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Posting Request...
            </div>
          ) : (
            'Submit Request'
          )}
        </button>
      </form>
    </div>
  );
};

export default PostErrand;