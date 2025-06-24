import { Link, useLocation } from 'react-router-dom';
import { Home, List, MessageCircle, Wallet, User, Navigation, TrendingUp, Bell } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const BottomNavigation = () => {
  const location = useLocation();
  const { user } = useAuth();
  const isRunnerMode = user?.role === 'runner';

  const userNavItems = [
    { path: '/home', icon: Home, label: 'Home' },
    { path: '/requests', icon: List, label: 'Requests' },
    { path: '/messages', icon: MessageCircle, label: 'Messages' },
    { path: '/wallet', icon: Wallet, label: 'Wallet' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  const runnerNavItems = [
    { path: '/runner-dashboard', icon: Navigation, label: 'Dashboard' },
    { path: '/runner-earnings', icon: TrendingUp, label: 'Earnings' },
    { path: '/messages', icon: MessageCircle, label: 'Messages' },
    { path: '/runner-notifications', icon: Bell, label: 'Alerts' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  const navItems = isRunnerMode ? runnerNavItems : userNavItems;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-2 safe-area-pb">
      <div className="flex items-center justify-between">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path || 
                          (path === '/messages' && location.pathname.startsWith('/chat/'));
          return (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 ${
                isActive 
                  ? `${isRunnerMode ? 'text-green-600 bg-green-50' : 'text-primary bg-primary/10'}` 
                  : 'text-gray-600 hover:text-primary hover:bg-gray-50'
              }`}
            >
              <Icon className={`w-5 h-5 mb-1 ${
                isActive ? (isRunnerMode ? 'text-green-600' : 'text-primary') : ''
              }`} />
              <span className={`text-xs font-medium ${
                isActive ? (isRunnerMode ? 'text-green-600' : 'text-primary') : ''
              }`}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;