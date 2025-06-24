import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BottomNavigation from './BottomNavigation';
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Navigation, 
  MessageCircle, 
  CheckCircle,
  Star,
  TrendingUp,
  Filter
} from 'lucide-react';

const RunnerDashboard = () => {
  const { user } = useAuth();
  const [isAvailable, setIsAvailable] = useState(true);
  const [activeTab, setActiveTab] = useState('requests');

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Ready to run';
    if (hour < 17) return 'Good afternoon';
    return 'Evening runs';
  };

  // Mock incoming requests
  const incomingRequests = [
    {
      id: 1,
      type: 'Grocery Shopping',
      title: 'Buy items from Shoprite',
      description: 'Milk, bread, eggs, and fruits',
      pickupAddress: 'Shoprite, Victoria Island',
      deliveryAddress: '15 Admiralty Way, Lekki',
      itemPrice: 2700,
      runnerFee: 800,
      totalBudget: 3500,
      distance: '2.3 km',
      estimatedTime: '45 mins',
      postedTime: '5 mins ago',
      urgency: 'normal'
    },
    {
      id: 2,
      type: 'Pharmacy Pickup',
      title: 'Collect prescription',
      description: 'Prescription for diabetes medication',
      pickupAddress: 'Healthplus Pharmacy, Ikeja',
      deliveryAddress: '23 Allen Avenue, Ikeja',
      itemPrice: 0,
      runnerFee: 600,
      totalBudget: 600,
      distance: '1.8 km',
      estimatedTime: '30 mins',
      postedTime: '2 mins ago',
      urgency: 'urgent'
    },
    {
      id: 3,
      type: 'Bill Payment',
      title: 'Pay electricity bill',
      description: 'NEPA bill payment at Ikeja Electric',
      pickupAddress: 'Ikeja Electric Office',
      deliveryAddress: 'Bill payment service',
      itemPrice: 15000,
      runnerFee: 500,
      totalBudget: 15500,
      distance: '3.1 km',
      estimatedTime: '1 hour',
      postedTime: '8 mins ago',
      urgency: 'normal'
    }
  ];

  // Mock active errands
  const activeErrands = [
    {
      id: 4,
      type: 'Grocery Shopping',
      title: 'Shoprite grocery run',
      customer: 'Sarah M.',
      status: 'picked-up',
      pickupAddress: 'Shoprite, VI',
      deliveryAddress: '12 Banana Island',
      totalAmount: 4200,
      startTime: '10:30 AM',
      estimatedDelivery: '11:15 AM'
    },
    {
      id: 5,
      type: 'Delivery',
      title: 'Document delivery',
      customer: 'David O.',
      status: 'on-the-way',
      pickupAddress: 'Corporate Office, Ikoyi',
      deliveryAddress: '45 Lekki Phase 1',
      totalAmount: 1500,
      startTime: '9:45 AM',
      estimatedDelivery: '10:30 AM'
    }
  ];

  const todayStats = {
    earnings: 8500,
    completedJobs: 6,
    activeJobs: 2,
    rating: 4.9
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'picked-up':
        return 'bg-blue-100 text-blue-700';
      case 'on-the-way':
        return 'bg-orange-100 text-orange-700';
      case 'delivered':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getUrgencyColor = (urgency) => {
    return urgency === 'urgent' 
      ? 'border-l-4 border-red-500 bg-red-50' 
      : 'border-l-4 border-green-500 bg-white';
  };

  const handleAcceptRequest = (requestId) => {
    alert(`Request ${requestId} accepted! You can now start the errand.`);
  };

  const handleMarkDelivered = (errandId) => {
    alert(`Errand ${errandId} marked as delivered! Payment will be processed.`);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-semibold text-gray-800">
                {getGreeting()}, {user?.name?.split(' ')[0]}! 🏃‍♂️
              </h1>
              <div className="flex items-center text-gray-600 mt-1">
                <MapPin className="w-4 h-4 mr-1" />
                <span className="text-sm">{user?.location}</span>
              </div>
            </div>
            
            {/* Availability Toggle */}
            <div className="text-right">
              <button
                onClick={() => setIsAvailable(!isAvailable)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-colors ${
                  isAvailable 
                    ? 'bg-green-100 text-green-700 border border-green-200' 
                    : 'bg-red-100 text-red-700 border border-red-200'
                }`}
              >
                <div className={`w-3 h-3 rounded-full ${
                  isAvailable ? 'bg-green-500 animate-pulse' : 'bg-red-500'
                }`}></div>
                <span className="text-sm">
                  {isAvailable ? 'Available' : 'Unavailable'}
                </span>
              </button>
              <p className="text-xs text-gray-500 mt-1">
                {isAvailable ? 'Receiving requests' : 'Not receiving requests'}
              </p>
            </div>
          </div>

          {/* Today's Stats */}
          <div className="grid grid-cols-4 gap-3 mb-4">
            <div className="bg-green-50 rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-green-600">₦{todayStats.earnings.toLocaleString()}</div>
              <div className="text-xs text-green-700">Today's Earnings</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-blue-600">{todayStats.completedJobs}</div>
              <div className="text-xs text-blue-700">Completed</div>
            </div>
            <div className="bg-orange-50 rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-orange-600">{todayStats.activeJobs}</div>
              <div className="text-xs text-orange-700">Active</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-purple-600">{todayStats.rating}</div>
              <div className="text-xs text-purple-700">Rating</div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('requests')}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all duration-200 ${
                activeTab === 'requests'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Available ({incomingRequests.length})
            </button>
            <button
              onClick={() => setActiveTab('active')}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all duration-200 ${
                activeTab === 'active'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Active ({activeErrands.length})
            </button>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        {!isAvailable && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-yellow-600">⚠️</span>
              </div>
              <div>
                <h3 className="font-medium text-yellow-800">You're currently unavailable</h3>
                <p className="text-sm text-yellow-700">Turn on availability to start receiving errand requests</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'requests' ? (
          <div className="space-y-4">
            {incomingRequests.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">No requests available</h3>
                <p className="text-gray-600">Check back soon for new errand opportunities</p>
              </div>
            ) : (
              incomingRequests.map((request) => (
                <div key={request.id} className={`rounded-xl p-4 shadow-sm border ${getUrgencyColor(request.urgency)}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-gray-800">{request.type}</h3>
                        {request.urgency === 'urgent' && (
                          <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-medium">
                            Urgent
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{request.title}</p>
                      <p className="text-xs text-gray-500">{request.description}</p>
                    </div>
                    <span className="text-xs text-gray-500">{request.postedTime}</span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2 text-green-500" />
                      <span className="flex-1">{request.pickupAddress}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2 text-red-500" />
                      <span className="flex-1">{request.deliveryAddress}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Navigation className="w-4 h-4 mr-1" />
                        <span>{request.distance}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{request.estimatedTime}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600 text-lg">
                        ₦{request.totalBudget.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">
                        Fee: ₦{request.runnerFee.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleAcceptRequest(request.id)}
                    disabled={!isAvailable}
                    className="w-full bg-primary text-white font-medium py-3 rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Accept Request
                  </button>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {activeErrands.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">No active errands</h3>
                <p className="text-gray-600">Accept requests to start earning</p>
              </div>
            ) : (
              activeErrands.map((errand) => (
                <div key={errand.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">{errand.title}</h3>
                      <p className="text-sm text-gray-600">Customer: {errand.customer}</p>
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full mt-2 ${getStatusColor(errand.status)}`}>
                        {errand.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">₦{errand.totalAmount.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">Started: {errand.startTime}</div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2 text-green-500" />
                      <span className="flex-1">{errand.pickupAddress}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2 text-red-500" />
                      <span className="flex-1">{errand.deliveryAddress}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Link 
                      to={`/chat/${errand.id}`}
                      className="flex-1 bg-blue-500 text-white text-center py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Contact
                    </Link>
                    <button className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center gap-2">
                      <Navigation className="w-4 h-4" />
                      Navigate
                    </button>
                    <button
                      onClick={() => handleMarkDelivered(errand.id)}
                      className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Complete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default RunnerDashboard;