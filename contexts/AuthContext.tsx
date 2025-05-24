import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user is already authenticated
    const token = localStorage.getItem('adminToken');
    if (token) {
      // Verify token (in production, validate with backend)
      setIsAuthenticated(true);
      setIsAdmin(true);
    }
  }, []);

  const login = async (password: string): Promise<boolean> => {
    // In production, this would be an API call
    // For now, using a hardcoded password (change this!)
    const ADMIN_PASSWORD = 'password'; // Change this password!
    
    if (password === ADMIN_PASSWORD) {
      const token = btoa(password + Date.now()); // Simple token generation
      localStorage.setItem('adminToken', token);
      setIsAuthenticated(true);
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    setIsAdmin(false);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};