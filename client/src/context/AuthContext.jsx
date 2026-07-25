import React, { createContext, useContext, useState, useEffect } from 'react';
import { signupAPI, loginAPI, getMeAPI } from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('auth_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem('auth_token') || null);
  const [loading, setLoading] = useState(true);

  // Validate session on mount
  useEffect(() => {
    async function checkAuth() {
      if (token) {
        try {
          const res = await getMeAPI();
          if (res.success && res.user) {
            setUser(res.user);
            localStorage.setItem('auth_user', JSON.stringify(res.user));
          } else {
            logout();
          }
        } catch (err) {
          console.warn('Session verification failed, logging out:', err.message);
          logout();
        }
      }
      setLoading(false);
    }
    checkAuth();
  }, []);

  const signup = async (email, password, fullName) => {
    const res = await signupAPI({ email, password, fullName });
    if (res.success && res.session?.access_token) {
      setSession(res.user, res.session.access_token);
    }
    return res;
  };

  const login = async (email, password) => {
    const res = await loginAPI({ email, password });
    if (res.success && res.token) {
      setSession(res.user, res.token);
    }
    return res;
  };

  const setSession = (userData, accessToken) => {
    setUser(userData);
    setToken(accessToken);
    localStorage.setItem('auth_user', JSON.stringify(userData));
    localStorage.setItem('auth_token', accessToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('auth_user');
    localStorage.removeItem('auth_token');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
