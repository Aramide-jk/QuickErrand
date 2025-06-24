import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Camera } from 'lucide-react';

const RatingScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock data for the completed errand
  const errand = {
    id: parseInt(id),
    type: 'Grocery Shopping',
    runner: {
      name: 'Sarah M.',
      phone: '+234 803 123 4567',
      rating: 4.9,
      completedOrders: 156
    },
    completedAt: '2024-01-15T11:30:00',
    totalAmount: 3500
  };

  const reviewPrompts = [
    'Great service!',
    'Very professional',
    'Quick delivery',
    'Friendly and helpful',
    'Would recommend',
    'Excellent communication'
  ];

  const handleStarClick = (starIndex) => {
    setRating(starIndex + 1);
  };

  const handlePromptClick = (prompt) => {
    if (review.includes(prompt)) {
      setReview(review.replace(prompt, '').replace(/,\s*,/g, ',').replace(/^,\s*|,\s*$/g, '').trim());
    } else {
      const newReview = review ? `${review}, ${prompt}` : prompt;
      setReview(newReview);
    }
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/requests');
    }, 1500);
  };

  const getRatingText = (rating) => {
    switch (rating) {
      case 1: return 'Poor';
      case 2: return 'Fair';
      case 3: return 'Good';
      case 4: return 'Very Good';
      case 5: return 'Excellent';
      default: return 'Rate your experience';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="flex items-center p-6">
          <Link to="/requests" className="p-2 hover:bg-gray-100 rounded-full transition-colors mr-4">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </Link>
          <h1 className="text-xl font-semibold text-gray-800">Rate Your Runner</h1>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Completion Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">✅</span>
          </div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Order Completed!</h2>
          <p className="text-gray-600 text-sm">Your {errand.type.toLowerCase()} has been successfully completed</p>
        </div>

        {/* Runner Info */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-xl">
                {errand.runner.name.charAt(0)}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">{errand.runner.name}</h3>
              <div className="flex items-center text-sm text-gray-600">
                <Star className="w-4 h-4 text-yellow-400 mr-1" />
                <span>{errand.runner.rating} • {errand.runner.completedOrders} orders</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Service:</span>
              <span className="font-medium text-gray-800">{errand.type}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Amount:</span>
              <span className="font-medium text-gray-800">₦{errand.totalAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Completed:</span>
              <span className="font-medium text-gray-800">
                {new Date(errand.completedAt).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Rating Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-4 text-center">How was your experience?</h3>
          
          <div className="text-center mb-6">
            <div className="flex justify-center space-x-2 mb-3">
              {[0, 1, 2, 3, 4].map((starIndex) => (
                <button
                  key={starIndex}
                  onClick={() => handleStarClick(starIndex)}
                  className="transition-all duration-200 hover:scale-110"
                >
                  <Star
                    className={`w-10 h-10 ${
                      starIndex < rating
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            <p className="text-lg font-medium text-gray-800">{getRatingText(rating)}</p>
          </div>

          {/* Review Prompts */}
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-700 mb-3">Quick feedback:</p>
            <div className="flex flex-wrap gap-2">
              {reviewPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handlePromptClick(prompt)}
                  className={`text-sm px-3 py-2 rounded-full border transition-colors ${
                    review.includes(prompt)
                      ? 'bg-primary text-white border-primary'
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-primary hover:text-primary'
                  }`}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Review Text */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Comments (Optional)
            </label>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              placeholder="Share more details about your experience..."
            />
          </div>

          {/* Photo Upload */}
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-700 mb-3">Add photos (Optional)</p>
            <button className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary hover:bg-gray-50 transition-colors">
              <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Tap to add photos</p>
            </button>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={rating === 0 || isSubmitting}
            className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Submitting Rating...
              </div>
            ) : (
              'Submit Rating'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RatingScreen;