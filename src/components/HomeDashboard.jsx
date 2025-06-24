import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import BottomNavigation from "./BottomNavigation";
import {
  Search,
  Plus,
  MapPin,
  ShoppingCart,
  Pill,
  ClipboardList,
  CreditCard,
  Package,
  FileText,
} from "lucide-react";

const HomeDashboard = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const categories = [
    {
      id: "grocery",
      name: "Grocery",
      icon: <ShoppingCart className="w-6 h-6" />,
      color: "bg-green-500",
    },
    {
      id: "pharmacy",
      name: "Pharmacy Pickup",
      icon: <Pill className="w-6 h-6" />,
      color: "bg-blue-500",
    },
    {
      id: "queue",
      name: "Queue Services",
      icon: <ClipboardList className="w-6 h-6" />,
      color: "bg-red-500",
    },
    {
      id: "bills",
      name: "Bill Payment",
      icon: <CreditCard className="w-6 h-6" />,
      color: "bg-purple-500",
    },
    {
      id: "delivery",
      name: "Pickup/Delivery",
      icon: <Package className="w-6 h-6" />,
      color: "bg-orange-500",
    },
    {
      id: "custom",
      name: "Custom Errand",
      icon: <FileText className="w-6 h-6" />,
      color: "bg-gray-500",
    },
  ];

  const nearbyRunners = [
    {
      id: 1,
      name: "Sarah M.",
      rating: 4.9,
      distance: "0.5km",
      available: true,
    },
    {
      id: 2,
      name: "David O.",
      rating: 4.8,
      distance: "0.8km",
      available: true,
    },
    {
      id: 3,
      name: "Fatima A.",
      rating: 4.7,
      distance: "1.2km",
      available: false,
    },
  ];

  const recentRequests = [
    {
      id: 1,
      type: "Grocery",
      status: "completed",
      runner: "Sarah M.",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "Pharmacy",
      status: "in-progress",
      runner: "David O.",
      time: "30 mins ago",
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-semibold text-gray-800">
                {getGreeting()}, {user?.name?.split(" ")[0]}!
              </h1>
              <div className="flex items-center text-gray-600 mt-1">
                <MapPin className="w-4 h-4 mr-1" />
                <span className="text-sm">{user?.location}</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">
                {user?.name?.charAt(0)}
              </span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What do you want to get done today?"
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-8">
        {/* Categories */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Services</h2>
          <div className="grid grid-cols-2 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/post-errand?category=${category.id}`}
                className="category-card">
                <div
                  className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center text-white mb-3`}>
                  {category.icon}
                </div>
                <h3 className="font-medium text-gray-800 text-sm">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Action */}
        <div className="gradient2 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Need something urgent?</h3>
          <p className="text-white/90 mb-4 text-sm">
            Post a custom request and get it done fast
          </p>
          <Link to="/post-errand">
            <button className="bg-white text-green-600 font-medium px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Post New Request
            </button>
          </Link>
        </div>

        {/* Nearby Runners */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Nearby Runners
          </h2>
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            {nearbyRunners.map((runner, index) => (
              <div
                key={runner.id}
                className={`p-4 ${
                  index !== nearbyRunners.length - 1
                    ? "border-b border-gray-100"
                    : ""
                }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-sm">
                        {runner.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-800">
                          {runner.name}
                        </span>
                        <div
                          className={`w-2 h-2 rounded-full ${
                            runner.available ? "bg-green-500" : "bg-gray-400"
                          }`}></div>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <span>⭐ {runner.rating}</span>
                        <span className="mx-2">•</span>
                        <span>{runner.distance} away</span>
                      </div>
                    </div>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      runner.available
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}>
                    {runner.available ? "Available" : "Busy"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        {recentRequests.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Recent Activity
            </h2>
            <div className="space-y-3">
              {recentRequests.map((request) => (
                <div
                  key={request.id}
                  className="bg-white rounded-lg border border-gray-100 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-800">
                        {request.type}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Runner: {request.runner}
                      </p>
                      <p className="text-xs text-gray-500">{request.time}</p>
                    </div>
                    <span
                      className={`text-xs px-3 py-1 rounded-full ${
                        request.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}>
                      {request.status === "completed"
                        ? "Completed"
                        : "In Progress"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default HomeDashboard;
