import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import flashpayLogo from '@/assets/flashpay-logo.png';
import { 
  Eye, 
  EyeOff, 
  Send, 
  Download, 
  History, 
  User, 
  LogOut,
  Wallet,
  CreditCard,
  Plus
} from 'lucide-react';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const [showBalance, setShowBalance] = useState(true);
  const { user, logout } = useAuth();

  const formatBalance = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(amount);
  };

  const quickActions = [
    {
      title: 'Transfer',
      description: 'Send money to banks & wallets',
      icon: Send,
      action: () => onNavigate('transfer'),
      variant: 'transfer' as const,
    },
    {
      title: 'Withdraw',
      description: 'Withdraw to your bank',
      icon: Download,
      action: () => onNavigate('withdraw'),
      variant: 'success' as const,
    },
    {
      title: 'Add Money',
      description: 'Fund your wallet',
      icon: Plus,
      action: () => onNavigate('fund'),
      variant: 'wallet' as const,
    },
    {
      title: 'History',
      description: 'View transactions',
      icon: History,
      action: () => onNavigate('history'),
      variant: 'outline' as const,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-40">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={flashpayLogo} alt="FlashPay" className="h-8 w-8" />
            <div>
              <h1 className="font-bold text-lg text-foreground">FlashPay</h1>
              <p className="text-xs text-muted-foreground">{user?.phoneNumber}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => onNavigate('profile')}>
              <User className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={logout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto p-4 space-y-6">
        {/* Balance Card */}
        <Card className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground shadow-lg border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-primary-foreground/80 text-sm font-medium">Wallet Balance</span>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            
            <div className="space-y-1">
              <p className="text-3xl font-bold">
                {showBalance ? formatBalance(user?.balance || 0) : '₦••••••'}
              </p>
              <p className="text-primary-foreground/80 text-sm">
                Available Balance
              </p>
            </div>
            
            {user?.isConnected && (
              <div className="mt-4 flex items-center gap-2">
                <div className="h-2 w-2 bg-success rounded-full" />
                <span className="text-sm text-primary-foreground/90">Wallet Active</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Quick Actions</h2>
          
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => (
              <Card 
                key={action.title}
                className="cursor-pointer hover:shadow-md transition-all duration-200 border-border/50"
                onClick={action.action}
              >
                <CardContent className="p-4 text-center">
                  <action.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <h3 className="font-medium text-sm text-foreground">{action.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{action.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Activity</CardTitle>
            <CardDescription>Your latest transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <Wallet className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
              <p className="text-muted-foreground">No transactions yet</p>
              <p className="text-sm text-muted-foreground mt-1">Start by making your first transfer</p>
            </div>
          </CardContent>
        </Card>

        {/* Feature Cards */}
        <div className="grid gap-3">
          <Card className="bg-gradient-to-r from-success/10 to-secondary/10 border-success/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <CreditCard className="h-8 w-8 text-success" />
                <div>
                  <h3 className="font-medium text-foreground">All Banks Supported</h3>
                  <p className="text-sm text-muted-foreground">Transfer to 200+ Nigerian banks</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-primary/10 to-warning/10 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Wallet className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-medium text-foreground">Instant Transfers</h3>
                  <p className="text-sm text-muted-foreground">Lightning-fast transactions</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;