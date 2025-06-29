import { Link, useLocation } from "react-router-dom";
import { Home, List, MessageCircle, Wallet, User } from "lucide-react";

const BottomNavigation = () => {
  const location = useLocation();

  const navItems = [
    { path: "/home", icon: Home, label: "Home" },
    { path: "/requests", icon: List, label: "Requests" },
    { path: "/messages", icon: MessageCircle, label: "Messages" },
    { path: "/wallet", icon: Wallet, label: "Wallet" },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-2 safe-area-pb">
      <div className="flex items-center justify-between">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive =
            location.pathname === path ||
            (path === "/messages" && location.pathname.startsWith("/chat/"));
          return (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "text-primary bg-primary/10 bg-green-900/10"
                  : "text-gray-600 hover:text-primary hover:bg-gray-50"
              }`}>
              <Icon
                className={`w-5 h-5 mb-1 ${isActive ? "text-primary" : ""}`}
              />
              <span
                className={`text-xs font-medium ${
                  isActive ? "text-primary" : ""
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
