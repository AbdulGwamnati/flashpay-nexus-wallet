import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  phoneNumber: string;
  balance: number;
  isConnected: boolean;
  hasActivated: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (phoneNumber: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (phoneNumber: string, password: string) => Promise<boolean>;
  payActivationFee: () => Promise<boolean>;
  updateBalance: (amount: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (phoneNumber: string, password: string): Promise<boolean> => {
    // Simulate login validation
    if (phoneNumber && password.length >= 4) {
      const userData = {
        id: Math.random().toString(36).substr(2, 9),
        phoneNumber,
        balance: 100000, // ₦100,000 default balance
        isConnected: false,
        hasActivated: false,
      };
      setUser(userData);
      return true;
    }
    return false;
  };

  const register = async (phoneNumber: string, password: string): Promise<boolean> => {
    // Simulate registration
    if (phoneNumber && password.length >= 4) {
      const userData = {
        id: Math.random().toString(36).substr(2, 9),
        phoneNumber,
        balance: 0, // New users start with 0 balance
        isConnected: false,
        hasActivated: false,
      };
      setUser(userData);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const payActivationFee = async (): Promise<boolean> => {
    if (user) {
      // Simulate payment of ₦6,000 to Opay account
      setUser(prev => prev ? {
        ...prev,
        hasActivated: true,
        isConnected: true,
        balance: 100000 // Give user ₦100,000 after activation
      } : null);
      return true;
    }
    return false;
  };

  const updateBalance = (amount: number) => {
    if (user) {
      setUser(prev => prev ? { ...prev, balance: prev.balance + amount } : null);
    }
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    register,
    payActivationFee,
    updateBalance,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};