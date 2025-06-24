import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SplashScreen from "./components/SplashScreen";
import WelcomeScreen from "./components/WelcomeScreen";
import LoginScreen from "./components/LoginScreen";
import SignupScreen from "./components/SignupScreen";
import HomeDashboard from "./components/HomeDashboard";
import PostErrand from "./components/PostErrand";
import ChatScreen from "./components/ChatScreen";
import MessagesScreen from "./components/MessagesScreen";
import WalletScreen from "./components/WalletScreen";
import ProfileScreen from "./components/ProfileScreen";
import RatingScreen from "./components/RatingScreen";
import RequestsScreen from "./components/RequestsScreen";
import { AuthProvider, useAuth } from "./context/AuthContext";
import "./App.css";
import RunnerDashboard from "./components/RunnerDashboard";

// function AppContent() {
//   const { isAuthenticated, isLoading, user } = useAuth();
//   const [showSplash, setShowSplash] = useState(true);
//   const [isRunnerMode, setIsRunnerMode] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setShowSplash(false);
//     }, 3000);

//     return () => clearTimeout(timer);
//   }, []);

//   if (isLoading || showSplash) {
//     return <SplashScreen />;
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <Routes>
//         {!isAuthenticated ? (
//           <>
//             <Route path="/" element={<WelcomeScreen />} />
//             <Route path="/login" element={<LoginScreen />} />
//             <Route path="/signup" element={<SignupScreen />} />
//             <Route path="*" element={<Navigate to="/" replace />} />
//           </>
//         ) : (
//           <>
//             <Route path="/" element={<HomeDashboard />} />
//             <Route path="/home" element={<HomeDashboard />} />
//             <Route path="/requests" element={<RequestsScreen />} />
//             <Route path="/messages" element={<MessagesScreen />} />
//             <Route path="/post-errand" element={<PostErrand />} />
//             <Route path="/chat/:id" element={<ChatScreen />} />
//             <Route path="/wallet" element={<WalletScreen />} />
//             <Route path="/profile" element={<ProfileScreen />} />
//             <Route path="/rating/:id" element={<RatingScreen />} />
//             <Route path="*" element={<Navigate to="/home" replace />} />
//           </>
//         )}
//       </Routes>
//     </div>
//   );
// }

// function App() {
//   return (
//     <AuthProvider>
//       <AppContent />
//     </AuthProvider>
//   );
// }

// export default App;

function AppContent() {
  const { isAuthenticated, isLoading, user } = useAuth();
  const [showSplash, setShowSplash] = useState(true);
  const [isRunnerMode, setIsRunnerMode] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading || showSplash) {
    return <SplashScreen />;
  }

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
            <Route
              path="/"
              element={
                isRunnerMode ? (
                  <RunnerDashboard
                    user={user}
                    setIsRunnerMode={setIsRunnerMode}
                  />
                ) : (
                  <HomeDashboard />
                )
              }
            />
            <Route
              path="/home"
              element={
                isRunnerMode ? (
                  <RunnerDashboard
                    user={user}
                    setIsRunnerMode={setIsRunnerMode}
                  />
                ) : (
                  <HomeDashboard />
                )
              }
            />
            <Route path="/requests" element={<RequestsScreen />} />
            <Route path="/messages" element={<MessagesScreen />} />
            <Route path="/post-errand" element={<PostErrand />} />
            <Route path="/chat/:id" element={<ChatScreen />} />
            <Route path="/wallet" element={<WalletScreen />} />
            <Route
              path="/profile"
              element={
                <ProfileScreen
                  user={user}
                  isRunnerMode={isRunnerMode}
                  setIsRunnerMode={setIsRunnerMode}
                />
              }
            />
            <Route path="/rating/:id" element={<RatingScreen />} />
            <Route
              path="/runner-dashboard"
              element={
                <RunnerDashboard
                  user={user}
                  setIsRunnerMode={setIsRunnerMode}
                />
              }
            />
            <Route path="*" element={<Navigate to="/home" replace />} />
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
