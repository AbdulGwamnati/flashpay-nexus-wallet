import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowLeft, Send, DollarSign, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TransferPageProps {
  onNavigate: (page: string) => void;
}

const TransferPage: React.FC<TransferPageProps> = ({ onNavigate }) => {
  const [accountNumber, setAccountNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const [amount, setAmount] = useState('');
  const [accountName, setAccountName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [transactionData, setTransactionData] = useState<any>(null);
  
  const { user, updateBalance } = useAuth();
  const { toast } = useToast();

  const nigerianBanks = [
    'Access Bank', 'GT Bank', 'UBA', 'Zenith Bank', 'First Bank', 'Fidelity Bank',
    'FCMB', 'Sterling Bank', 'Union Bank', 'Wema Bank', 'Polaris Bank', 'Stanbic IBTC',
    'Kuda Bank', 'Opay', 'PalmPay', 'Moniepoint', 'VBank', 'Ecobank'
  ];

  const formatBalance = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(amount);
  };

  const handleAccountLookup = () => {
    if (accountNumber.length === 10) {
      // Simulate account name lookup
      const names = ['John Doe', 'Jane Smith', 'Ahmad Ibrahim', 'Kemi Adebayo', 'David Okafor'];
      const randomName = names[Math.floor(Math.random() * names.length)];
      setAccountName(randomName);
    }
  };

  const handleTransfer = async () => {
    if (!accountNumber || !bankName || !amount || !accountName) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const transferAmount = parseFloat(amount);
    if (transferAmount <= 0) {
      toast({
        title: "Error",
        description: "Invalid amount",
        variant: "destructive",
      });
      return;
    }

    if (transferAmount > (user?.balance || 0)) {
      toast({
        title: "Error",
        description: "Insufficient balance",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate transfer processing
    setTimeout(() => {
      updateBalance(-transferAmount);
      
      const transaction = {
        id: `FP${Date.now()}`,
        type: 'Transfer',
        amount: transferAmount,
        recipient: accountName,
        accountNumber,
        bank: bankName,
        date: new Date(),
        status: 'Successful'
      };
      
      setTransactionData(transaction);
      setShowReceipt(true);
      setIsLoading(false);
      
      toast({
        title: "Transfer Successful",
        description: `₦${transferAmount.toLocaleString()} sent to ${accountName}`,
      });
    }, 3000);
  };

  if (showReceipt) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-success/5 via-background to-primary/5 p-4">
        <div className="max-w-md mx-auto">
          <Card className="bg-card shadow-lg">
            <CardHeader className="text-center bg-success text-success-foreground rounded-t-lg">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-2">
                <Send className="h-8 w-8 text-success" />
              </div>
              <CardTitle>Transfer Successful</CardTitle>
              <CardDescription className="text-success-foreground/80">
                Transaction Receipt
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-6 space-y-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-success">
                  {formatBalance(transactionData.amount)}
                </p>
                <p className="text-muted-foreground">Amount Sent</p>
              </div>
              
              <div className="border-t border-b border-border py-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Transaction ID:</span>
                  <span className="font-mono text-sm">{transactionData.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Recipient:</span>
                  <span className="font-medium">{transactionData.recipient}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Account Number:</span>
                  <span className="font-mono">{transactionData.accountNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Bank:</span>
                  <span>{transactionData.bank}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date:</span>
                  <span>{transactionData.date.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <span className="text-success font-medium">{transactionData.status}</span>
                </div>
              </div>
              
              <div className="text-center text-xs text-muted-foreground">
                Powered by FlashPay • Instant Transfer
              </div>
              
              <Button 
                onClick={() => onNavigate('dashboard')}
                variant="wallet" 
                size="lg" 
                className="w-full"
              >
                Back to Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" onClick={() => onNavigate('dashboard')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-foreground">Transfer Money</h1>
            <p className="text-sm text-muted-foreground">Send to any Nigerian bank</p>
          </div>
        </div>

        {/* Balance Display */}
        <Card className="mb-6 bg-balance-card">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Available Balance</p>
              <p className="text-2xl font-bold text-foreground">
                {formatBalance(user?.balance || 0)}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Transfer Form */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="h-5 w-5 text-primary" />
              Transfer Details
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Bank Name</label>
              <select
                className="w-full p-3 border border-input rounded-md bg-background focus:ring-2 focus:ring-ring focus:border-transparent"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
              >
                <option value="">Select Bank</option>
                {nigerianBanks.map((bank) => (
                  <option key={bank} value={bank}>{bank}</option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Account Number</label>
              <Input
                type="number"
                placeholder="0123456789"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                onBlur={handleAccountLookup}
                className="h-12"
                maxLength={10}
              />
            </div>
            
            {accountName && (
              <div className="p-3 bg-success/10 border border-success/20 rounded-md">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-success" />
                  <span className="font-medium text-success">{accountName}</span>
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Amount</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
            </div>
            
            <Button 
              onClick={handleTransfer}
              variant="transfer" 
              size="lg" 
              className="w-full"
              disabled={isLoading || !accountName}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Processing Transfer...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send Money
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TransferPage;