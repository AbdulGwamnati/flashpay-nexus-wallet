import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { AlertTriangle, CreditCard, CheckCircle, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ActivationPage: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const { payActivationFee } = useAuth();
  const { toast } = useToast();

  const paymentDetails = {
    accountNumber: '9163110673',
    accountName: 'Abdullahi',
    bankName: 'Opay',
    amount: '₦6,000'
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: "Account number copied to clipboard",
    });
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(async () => {
      const success = await payActivationFee();
      if (success) {
        toast({
          title: "Activation Successful!",
          description: "Your FlashPay wallet is now active with ₦100,000",
        });
      }
      setIsProcessing(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-warning/5 via-background to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Warning Card */}
        <Card className="border-warning/20 bg-warning/5">
          <CardHeader className="text-center">
            <AlertTriangle className="h-12 w-12 text-warning mx-auto mb-2" />
            <CardTitle className="text-warning">Wallet Activation Required</CardTitle>
            <CardDescription>
              To use FlashPay services, you need to activate your wallet by paying the one-time activation fee.
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Payment Instructions */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              Activation Payment
            </CardTitle>
            <CardDescription>
              Pay ₦6,000 to activate your wallet and receive ₦100,000 balance
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {!showPaymentDetails ? (
              <Button 
                onClick={() => setShowPaymentDetails(true)}
                variant="wallet" 
                size="lg" 
                className="w-full"
              >
                Show Payment Details
              </Button>
            ) : (
              <div className="space-y-4">
                <div className="bg-balance-card p-4 rounded-lg space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Account Number:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-semibold">{paymentDetails.accountNumber}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(paymentDetails.accountNumber)}
                        className="h-6 w-6 p-0"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Account Name:</span>
                    <span className="font-semibold">{paymentDetails.accountName}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Bank:</span>
                    <span className="font-semibold">{paymentDetails.bankName}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Amount:</span>
                    <span className="font-bold text-lg text-primary">{paymentDetails.amount}</span>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-4">
                    After making the payment, click the button below to activate your wallet
                  </p>
                  
                  <Button 
                    onClick={handlePayment}
                    variant="success" 
                    size="lg" 
                    className="w-full"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Verifying Payment...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        I Have Made the Payment
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Benefits Card */}
        <Card className="bg-gradient-to-r from-success/10 to-primary/10 border-success/20">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-success mb-2">After Activation You Get:</h3>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• ₦100,000 wallet balance</li>
              <li>• Transfer to all Nigerian banks</li>
              <li>• Withdraw to any wallet</li>
              <li>• Transaction history</li>
              <li>• Digital receipts</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ActivationPage;