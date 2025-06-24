import { Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import SplashScreen from './components/SplashScreen'
import WelcomeScreen from './components/WelcomeScreen'
import LoginScreen from './components/LoginScreen'
import SignupScreen from './components/SignupScreen'
import HomeDashboard from './components/HomeDashboard'
import RunnerDashboard from './components/RunnerDashboard'
import RunnerEarnings from './components/RunnerEarnings'
import RunnerNotifications from './components/RunnerNotifications'
import PostErrand from './components/PostErrand'
import ChatScreen from './components/ChatScreen'
import MessagesScreen from './components/MessagesScreen'
import WalletScreen from './components/WalletScreen'
import ProfileScreen from './components/ProfileScreen'
import RatingScreen from './components/RatingScreen'
import RequestsScreen from './components/RequestsScreen'
import { AuthProvider, useAuth } from './context/AuthContext'

function AppContent() {
  const { isAuthenticated, isLoading, user } = useAuth();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading || showSplash) {
    return <SplashScreen />;
  }

  const isRunnerMode = user?.role === 'runner';

  return (
    <div className="min-h-screen bg-background">
      <Routes>
        {!isAuthenticated ? (
          <>
            <Route path="/" element={<WelcomeScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/signup" element={<SignupScreen />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        ) : (
          <>
            {/* Common routes for both user and runner */}
            <Route path="/messages" element={<MessagesScreen />} />
            <Route path="/chat/:id" element={<ChatScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/rating/:id" element={<RatingScreen />} />
            
            {/* Runner-specific routes */}
            {isRunnerMode ? (
              <>
                <Route path="/" element={<RunnerDashboard />} />
                <Route path="/runner-dashboard" element={<RunnerDashboard />} />
                <Route path="/runner-earnings" element={<RunnerEarnings />} />
                <Route path="/runner-notifications" element={<RunnerNotifications />} />
                <Route path="*" element={<Navigate to="/runner-dashboard" replace />} />
              </>
            ) : (
              <>
                {/* User-specific routes */}
                <Route path="/" element={<HomeDashboard />} />
                <Route path="/home" element={<HomeDashboard />} />
                <Route path="/requests" element={<RequestsScreen />} />
                <Route path="/post-errand" element={<PostErrand />} />
                <Route path="/wallet" element={<WalletScreen />} />
                <Route path="*" element={<Navigate to="/home" replace />} />
              </>
            )}
          </>
        )}
      </Routes>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;