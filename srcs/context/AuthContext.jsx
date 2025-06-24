import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing auth state
    const checkAuth = () => {
      const savedUser = localStorage.getItem('quickerran_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    // Simulate API call
    const mockUser = {
      id: '1',
      name: 'John Doe',
      email: email,
      phone: '+234 803 123 4567',
      location: 'Lagos, Nigeria',
      isVerified: true,
      role: 'user', // 'user' or 'runner'
      balance: 5000,
    };

    localStorage.setItem('quickerran_user', JSON.stringify(mockUser));
    setUser(mockUser);
    setIsAuthenticated(true);
    return { success: true };
  };

  const signup = async (userData) => {
    // Simulate API call
    const newUser = {
      id: Date.now().toString(),
      ...userData,
      isVerified: false,
      role: 'user',
      balance: 0,
    };

    localStorage.setItem('quickerran_user', JSON.stringify(newUser));
    setUser(newUser);
    setIsAuthenticated(true);
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem('quickerran_user');
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    localStorage.setItem('quickerran_user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    signup,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};