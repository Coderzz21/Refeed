import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../utils/api';

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
  const [loading, setLoading] = useState(true); // Start with true to check localStorage

  // Check for existing user on app start
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await api.post('/api/auth/login', { email, password });
      if (res.data && res.data.success) {
        const payload = res.data;
        // Backend returns token and user
        const userWithToken = { ...payload.user, token: payload.token };
        setUser(userWithToken);
        localStorage.setItem('user', JSON.stringify(userWithToken));
        return userWithToken;
      }
      throw new Error(res.data?.message || 'Login failed');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData) => {
    setLoading(true);
    try {
      const res = await api.post('/api/auth/register', userData);
      if (res.data && res.data.success) {
        const payload = res.data;
        const userWithToken = { ...payload.user, token: payload.token };
        setUser(userWithToken);
        localStorage.setItem('user', JSON.stringify(userWithToken));
        return userWithToken;
      }
      throw new Error(res.data?.message || 'Signup failed');
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Update user profile
  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    login,
    signup,
    logout,
    updateUser,
    loading,
    isAuthenticated: !!user // Helper to check if user is logged in
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};