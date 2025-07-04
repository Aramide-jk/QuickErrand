import { Link } from "react-router-dom";
import { Users, Shield, Clock, MapPin } from "lucide-react";

const WelcomeScreen = () => {
  const features = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Trusted Runners",
      description: "Verified and rated professionals",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure Payments",
      description: "Safe escrow system",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Real-time Tracking",
      description: "Track your errands live",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Location Based",
      description: "Find runners near you",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient">
      <div className="px-6 py-8">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-2xl font-bold text-white">QE</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome to QuickErran
          </h1>
          <p className="text-lg text-gray-600 font-medium">
            Run errands fast & safe.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-sm border border-white">
              <div className="text-primary mb-2 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-gray-800 text-sm mb-1">
                {feature.title}
              </h3>
              <p className="text-xs text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Illustration Placeholder */}
        <div className="mb-8">
          <div className="bg-gradient2 rounded-2xl p-8 text-center text-white">
            <div className="w-32 h-32 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
              <div className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center">
                <span className="text-2xl">🏃‍♂️</span>
              </div>
            </div>
            <p className="text-white/90">Your personal errand assistant</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link to="/signup" className="block">
            <button className="w-full btn-primary text-lg py-4 shadow-lg">
              Sign Up
            </button>
          </Link>

          <Link to="/login" className="block">
            <button className="w-full btn-secondary text-lg py-4">Login</button>
          </Link>

          <button className="w-full btn-google text-lg py-4 shadow-sm">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>
        </div>

        <div className="text-center mt-6 text-sm text-gray-600">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
