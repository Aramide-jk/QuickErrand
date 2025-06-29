import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ToggleLeft,
  ToggleRight,
  MapPin,
  Clock,
  DollarSign,
  Star,
  TrendingUp,
  Package,
  CheckCircle,
  Menu,
} from "lucide-react";
import BottomNavigation from "./BottomNavigation";
// import DesktopSidebar from "./DesktopSidebar";

const RunnerDashboard = ({ user, setIsRunnerMode }) => {
  const [isOnline, setIsOnline] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const availableRequests = [
    {
      id: 1,
      title: "Grocery Shopping",
      description: "Pick up groceries from Shoprite Victoria Island",
      budget: 5000,
      distance: "2.3 km",
      estimatedTime: "45 min",
      pickupAddress: "Shoprite, Victoria Island",
      deliveryAddress: "Lekki Phase 1",
      postedTime: "5 min ago",
      customer: {
        name: "John Doe",
        rating: 4.7,
      },
    },
    {
      id: 2,
      title: "Document Delivery",
      description: "Urgent document delivery to client office",
      budget: 3500,
      distance: "4.1 km",
      estimatedTime: "30 min",
      pickupAddress: "Victoria Island",
      deliveryAddress: "Ikeja GRA",
      postedTime: "12 min ago",
      customer: {
        name: "Sarah Johnson",
        rating: 4.9,
      },
    },
    {
      id: 3,
      title: "Food Delivery",
      description: "Pick up lunch from restaurant and deliver",
      budget: 2500,
      distance: "1.8 km",
      estimatedTime: "25 min",
      pickupAddress: "The Place, Lekki",
      deliveryAddress: "Lekki Phase 2",
      postedTime: "18 min ago",
      customer: {
        name: "Mike Chen",
        rating: 4.6,
      },
    },
  ];

  const stats = {
    todayEarnings: 15750,
    completedToday: 8,
    rating: 4.8,
    totalEarnings: 125000,
  };

  const handleAcceptRequest = (requestId) => {
    alert(`Request ${requestId} accepted! Redirecting to chat...`);
    // In a real app, this would update the request status and navigate to chat
  };

  const RequestCard = ({ request }) => (
    <div className="bg-white rounded-xl p-4 lg:p-6 border shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-text-dark text-lg mb-1">
            {request.title}
          </h3>
          <p className="text-gray-600 text-sm mb-2">{request.description}</p>

          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{request.distance}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{request.estimatedTime}</span>
            </div>
            <span className="text-green-600">{request.postedTime}</span>
          </div>

          <div className="space-y-1 text-sm">
            <p>
              <span className="text-gray-500">Pickup:</span>{" "}
              {request.pickupAddress}
            </p>
            <p>
              <span className="text-gray-500">Delivery:</span>{" "}
              {request.deliveryAddress}
            </p>
          </div>
        </div>

        <div className="text-right ml-4">
          <span className="text-2xl font-bold text-primary">
            ₦{request.budget.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-2">
            <span className="text-white text-sm font-semibold">
              {request.customer.name.charAt(0)}
            </span>
          </div>
          <div>
            <p className="font-medium text-text-dark text-sm">
              {request.customer.name}
            </p>
            <div className="flex items-center">
              <Star className="w-3 h-3 text-yellow-500 mr-1" />
              <span className="text-sm text-gray-600">
                {request.customer.rating}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={() => handleAcceptRequest(request.id)}
          className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-colors">
          Accept
        </button>
      </div>
    </div>
  );

  return (
    <div className="desktop-layout">
      {/* Desktop Sidebar */}
      {/* <DesktopSidebar user={user} currentPage="runner-dashboard" /> */}

      {/* Mobile Sidebar Overlay */}

      <div className="container-responsive desktop-main">
        <div className="min-h-screen bg-bg-soft pb-20 lg:pb-0">
          {/* Header */}
          <div className="bg-primary text-white p-4 lg:p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 -ml-2 mr-2 hover:bg-white hover:bg-opacity-20 rounded-lg">
                  <Menu className="w-6 h-6" />
                </button>
                <button
                  onClick={() => setIsRunnerMode(false)}
                  className="lg:hidden p-2 hover:bg-white hover:bg-opacity-20 rounded-lg mr-2">
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <div>
                  <h1 className="text-xl lg:text-2xl font-bold">
                    Runner Dashboard
                  </h1>
                  <p className="text-white text-opacity-90 text-sm">
                    Welcome back, {user?.name?.split(" ")[0]}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsRunnerMode(false)}
                className="hidden lg:flex items-center bg-white bg-opacity-20 hover:bg-opacity-30 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                Switch to Customer
              </button>
            </div>

            {/* Online Status Toggle */}
            <div className="flex items-center justify-between bg-white bg-opacity-10 rounded-lg p-3">
              <div>
                <p className="font-medium">
                  You are {isOnline ? "Online" : "Offline"}
                </p>
                <p className="text-sm text-white text-opacity-80">
                  {isOnline
                    ? "Ready to accept requests"
                    : "Not accepting requests"}
                </p>
              </div>
              <button
                onClick={() => setIsOnline(!isOnline)}
                className="flex items-center">
                {isOnline ? (
                  <ToggleRight className="w-12 h-6 text-green-400" />
                ) : (
                  <ToggleLeft className="w-12 h-6 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="p-4 lg:p-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-xl p-4 border">
                <div className="flex items-center justify-between mb-2">
                  <DollarSign className="w-8 h-8 text-green-600" />
                  <span className="text-xs text-gray-500">Today</span>
                </div>
                <p className="text-2xl font-bold text-text-dark">
                  ₦{stats.todayEarnings.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">Earnings</p>
              </div>

              <div className="bg-white rounded-xl p-4 border">
                <div className="flex items-center justify-between mb-2">
                  <CheckCircle className="w-8 h-8 text-blue-600" />
                  <span className="text-xs text-gray-500">Today</span>
                </div>
                <p className="text-2xl font-bold text-text-dark">
                  {stats.completedToday}
                </p>
                <p className="text-sm text-gray-600">Completed</p>
              </div>

              <div className="bg-white rounded-xl p-4 border">
                <div className="flex items-center justify-between mb-2">
                  <Star className="w-8 h-8 text-yellow-500" />
                  <span className="text-xs text-gray-500">Rating</span>
                </div>
                <p className="text-2xl font-bold text-text-dark">
                  {stats.rating}
                </p>
                <p className="text-sm text-gray-600">Average</p>
              </div>

              <div className="bg-white rounded-xl p-4 border">
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp className="w-8 h-8 text-purple-600" />
                  <span className="text-xs text-gray-500">Total</span>
                </div>
                <p className="text-2xl font-bold text-text-dark">
                  ₦{stats.totalEarnings.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">All Time</p>
              </div>
            </div>

            {/* Available Requests */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl lg:text-2xl font-bold text-text-dark">
                  Available Requests
                </h2>
                <div className="flex items-center text-sm text-gray-600">
                  <Package className="w-4 h-4 mr-1" />
                  <span>{availableRequests.length} requests nearby</span>
                </div>
              </div>

              {isOnline ? (
                <div className="space-y-4 lg:space-y-6">
                  {availableRequests.map((request) => (
                    <RequestCard key={request.id} request={request} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-xl p-8 border text-center">
                  <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">
                    You're Offline
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Turn on your availability to see and accept requests
                  </p>
                  <button
                    onClick={() => setIsOnline(true)}
                    className="btn-primary">
                    Go Online
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <BottomNavigation currentPage="home" />
      </div>
    </div>
  );
};

export default RunnerDashboard;
