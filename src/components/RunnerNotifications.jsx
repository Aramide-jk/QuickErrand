import { useState } from 'react';
import { Link } from 'react-router-dom';
import BottomNavigation from './BottomNavigation';
import { 
  ArrowLeft, 
  Bell, 
  CheckCircle, 
  Clock, 
  DollarSign, 
  MessageCircle,
  Star,
  Settings,
  Filter
} from 'lucide-react';

const RunnerNotifications = () => {
  const [filter, setFilter] = useState('all');

  const notifications = [
    {
      id: 1,
      type: 'new-request',
      title: 'New Errand Request',
      message: 'Grocery shopping request near you - ₦1,200 fee',
      time: '2 mins ago',
      read: false,
      icon: Bell,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      id: 2,
      type: 'payment',
      title: 'Payment Received',
      message: 'You received ₦800 for pharmacy pickup',
      time: '15 mins ago',
      read: false,
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      id: 3,
      type: 'message',
      title: 'New Message',
      message: 'Sarah M. sent you a message about grocery list',
      time: '1 hour ago',
      read: true,
      icon: MessageCircle,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      id: 4,
      type: 'rating',
      title: 'New Rating',
      message: 'David O. rated you 5 stars with a great review!',
      time: '2 hours ago',
      read: true,
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      id: 5,
      type: 'completion',
      title: 'Errand Completed',
      message: 'Bill payment errand marked as completed',
      time: '3 hours ago',
      read: true,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      id: 6,
      type: 'verification',
      title: 'Verification Update',
      message: 'Your KYC verification is under review',
      time: '1 day ago',
      read: true,
      icon: Settings,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : filter === 'unread' 
      ? notifications.filter(n => !n.read)
      : notifications.filter(n => n.type === filter);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    // In a real app, this would update the notification status
    console.log(`Marking notification ${id} as read`);
  };

  const markAllAsRead = () => {
    // In a real app, this would mark all notifications as read
    console.log('Marking all notifications as read');
  };

  const getTimeColor = (time) => {
    if (time.includes('mins')) return 'text-green-600';
    if (time.includes('hour')) return 'text-blue-600';
    return 'text-gray-500';
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center">
            <Link to="/profile" className="p-2 hover:bg-gray-100 rounded-full transition-colors mr-4">
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </Link>
            <div>
              <h1 className="text-xl font-semibold text-gray-800">Notifications</h1>
              {unreadCount > 0 && (
                <p className="text-sm text-gray-600">{unreadCount} unread</p>
              )}
            </div>
          </div>
          
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-primary text-sm font-medium hover:text-primary-dark"
            >
              Mark all read
            </button>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="px-6 pb-4">
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            {[
              { key: 'all', label: 'All' },
              { key: 'unread', label: 'Unread' },
              { key: 'new-request', label: 'Requests' },
              { key: 'payment', label: 'Payments' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-all duration-200 ${
                  filter === tab.key
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              {filter === 'unread' ? 'No unread notifications' : 'No notifications'}
            </h3>
            <p className="text-gray-600">
              {filter === 'unread' 
                ? 'All caught up! Check back later for updates.'
                : 'You\'ll receive notifications about new requests, payments, and messages here.'
              }
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredNotifications.map((notification) => {
              const IconComponent = notification.icon;
              return (
                <div
                  key={notification.id}
                  onClick={() => markAsRead(notification.id)}
                  className={`bg-white rounded-xl p-4 shadow-sm border transition-all duration-200 cursor-pointer hover:shadow-md ${
                    notification.read 
                      ? 'border-gray-100' 
                      : 'border-primary/20 bg-primary/5'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-10 h-10 ${notification.bgColor} rounded-full flex items-center justify-center flex-shrink-0`}>
                      <IconComponent className={`w-5 h-5 ${notification.color}`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className={`font-medium ${
                          notification.read ? 'text-gray-800' : 'text-gray-900'
                        }`}>
                          {notification.title}
                        </h3>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                        )}
                      </div>
                      
                      <p className={`text-sm mb-2 ${
                        notification.read ? 'text-gray-600' : 'text-gray-700'
                      }`}>
                        {notification.message}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-medium ${getTimeColor(notification.time)}`}>
                          {notification.time}
                        </span>
                        
                        {notification.type === 'new-request' && (
                          <button className="text-xs bg-primary text-white px-3 py-1 rounded-full hover:bg-primary-dark transition-colors">
                            View Request
                          </button>
                        )}
                        
                        {notification.type === 'message' && (
                          <button className="text-xs bg-purple-500 text-white px-3 py-1 rounded-full hover:bg-purple-600 transition-colors">
                            Reply
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default RunnerNotifications;