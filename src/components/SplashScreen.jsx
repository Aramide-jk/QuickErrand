import { useEffect, useState } from "react";

const SplashScreen = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient flex items-center justify-center px-8">
      <div
        className={`text-center transform transition-all duration-1000 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}>
        <div className="mb-8">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto shadow-lg animate-bounce-gentle">
            <span className="text-3xl font-bold text-primary">QE</span>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-white mb-4">QuickErran</h1>

        <p className="text-xl text-white/90 font-medium">
          Get Things Done. Instantly.
        </p>

        <div className="mt-8">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <div
              className="w-2 h-2 bg-white/70 rounded-full animate-pulse"
              style={{ animationDelay: "0.2s" }}></div>
            <div
              className="w-2 h-2 bg-white/50 rounded-full animate-pulse"
              style={{ animationDelay: "0.4s" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
