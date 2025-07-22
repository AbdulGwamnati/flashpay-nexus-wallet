import React, { useState } from 'react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import AuthPage from '@/components/AuthPage';
import ActivationPage from '@/components/ActivationPage';
import Dashboard from '@/components/Dashboard';
import TransferPage from '@/components/TransferPage';

const AppContent: React.FC = () => {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');

  // If user is not logged in, show auth page
  if (!user) {
    return <AuthPage />;
  }

  // If user hasn't activated wallet, show activation page
  if (!user.hasActivated) {
    return <ActivationPage />;
  }

  // Navigate between pages
  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  // Render current page
  switch (currentPage) {
    case 'transfer':
      return <TransferPage onNavigate={handleNavigate} />;
    case 'dashboard':
    default:
      return <Dashboard onNavigate={handleNavigate} />;
  }
};

const Index: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default Index;
