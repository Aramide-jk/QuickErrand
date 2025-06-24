import { useState } from 'react';
import { Link } from 'react-router-dom';
import BottomNavigation from './BottomNavigation';
import { Clock, MapPin, MessageCircle, Star, DollarSign, Filter } from 'lucide-react';

const RequestsScreen = () => {
  const [activeTab, setActiveTab] = useState('active');

  const requests = {
    active: [
      {
        id: 1,
        type: 'Grocery Shopping',
        description: 'Buy items from Shoprite - milk, bread, eggs',
        status: 'in-progress',
        runner: {
          name: 'Sarah M.',
          phone: '+234 803 123 4567',
          rating: 4.9
        },
        pickupAddress: 'Shoprite, Victoria Island',
        deliveryAddress: '15 Admiralty Way, Lekki',
        budget: 3500,
        runnerFee: 800,
        createdAt: '2024-01-15T10:30:00',
        estimatedTime: '45 mins'
      },
      {
        id: 2,
        type: 'Pharmacy Pickup',
        description: 'Collect prescription from Healthplus Pharmacy',
        status: 'pending',
        pickupAddress: 'Healthplus Pharmacy, Ikeja',
        deliveryAddress: '23 Allen Avenue, Ikeja',
        budget: 1200,
        runnerFee: 500,
        createdAt: '2024-01-15T14:20:00',
        estimatedTime: 'Waiting for runner'
      }
    ],
    completed: [
      {
        id: 3,
        type: 'Bill Payment',
        description: 'Pay NEPA bill at Ikeja Electric office',
        status: 'completed',
        runner: {
          name: 'David O.',
          phone: '+234 806 234 5678',
          rating: 4.8
        },
        pickupAddress: 'Ikeja Electric, Ikeja',
        deliveryAddress: 'Bill payment service',
        budget: 15000,
        runnerFee: 600,
        createdAt: '2024-01-14T09:15:00',
        completedAt: '2024-01-14T10:30:00',
        rating: 5
      }
    ]
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString();
  };

  const currentRequests = requests[activeTab] || [];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold text-gray-800">My Requests</h1>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Filter className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('active')}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all duration-200 ${
                activeTab === 'active'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Active ({requests.active.length})
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all duration-200 ${
                activeTab === 'completed'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Completed ({requests.completed.length})
            </button>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        {currentRequests.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              No {activeTab} requests
            </h3>
            <p className="text-gray-600 mb-6">
              {activeTab === 'active' 
                ? "You don't have any active requests at the moment"
                : "You haven't completed any requests yet"
              }
            </p>
            {activeTab === 'active' && (
              <Link to="/post-errand">
                <button className="btn-primary">
                  Post New Request
                </button>
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {currentRequests.map((request) => (
              <div key={request.id} className="card p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1">{request.type}</h3>
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(request.status)}`}>
                      {request.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">{formatTime(request.createdAt)}</span>
                </div>

                <p className="text-sm text-gray-600 mb-3">{request.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="flex-1">{request.pickupAddress}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="flex-1">{request.deliveryAddress}</span>
                  </div>
                </div>

                {request.runner && (
                  <div className="bg-gray-50 rounded-lg p-3 mb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                          <span className="text-white font-medium text-sm">
                            {request.runner.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-800 text-sm">{request.runner.name}</div>
                          <div className="flex items-center text-xs text-gray-600">
                            <Star className="w-3 h-3 text-yellow-400 mr-1" />
                            <span>{request.runner.rating}</span>
                          </div>
                        </div>
                      </div>
                      {request.status === 'in-progress' && (
                        <Link 
                          to={`/chat/${request.id}`}
                          className="p-2 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </Link>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center text-sm text-gray-600">
                    <DollarSign className="w-4 h-4 mr-1" />
                    <span>₦{request.budget.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{request.estimatedTime}</span>
                  </div>
                  {request.status === 'completed' && !request.rating && (
                    <Link 
                      to={`/rating/${request.id}`}
                      className="text-primary text-sm font-medium hover:text-primary-dark"
                    >
                      Rate Runner
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default RequestsScreen;