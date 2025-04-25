import { Button, Modal, Text, Box, Group, Image } from '@mantine/core';
import React, { useState, useEffect } from 'react';
import { useDisclosure } from '@mantine/hooks';

// Base64 encoded UPI icon
const UPI_ICON = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgiIGhlaWdodD0iMjgiIHZpZXdCb3g9IjAgMCAyOCAyOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTAgNkMwIDIuNjg2MjkgMi42ODYyOSAwIDYgMEgyMkMyNS4zMTM3IDAgMjggMi42ODYyOSAyOCA2VjIyQzI4IDI1LjMxMzcgMjUuMzEzNyAyOCAyMiAyOEg2QzIuNjg2MjkgMjggMCAyNS4zMTM3IDAgMjJWNloiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0xOC4wNDI2IDQuMjA2NzlMMTAuNzIyMyA0LjE5OTQ3QzEwLjQ2MTcgNC4xOTk0NyAxMC4yMzY4IDQuMzczMTkgMTAuMTc1OSA0LjYyNjQ5TDYuODA5NzEgMTYuMzIzN0M2LjczODU0IDE2LjYyMjUgNi45NTk0NCAxNi45MTYxIDcuMjY5MDYgMTYuOTEzM0wxMC43MjEyIDE2Ljg5NzVDMTAuOTg3NCAxNi44OTY0IDExLjIxNTIgMTYuNzE2NCAxMS4yNzMzIDE2LjQ1NjdMMTIuNjQxNiAxMS4yODg0QzEyLjY5OTcgMTEuMDI5OSAxMi45MjY1IDEwLjg0ODkgMTMuMTkzNyAxMC44NDc4TDE0Ljg4MjUgMTAuODM3M0MxNy44MTY2IDEwLjgyMjYgMTkuNjQ0IDkuNDUwNTcgMjAuMDg1MiA2LjYwNjI1QzIwLjI5OTQgNS4yNTQwNSAyMC4wMTQ2IDQuMjE5NiAxOS4yMzgyIDMuNTQ4ODlDMTguODk0NCAzLjI0MjIgMTguNDY5MSAzLjIwMzMzIDE4LjA0MjYgNC4yMDY3OVoiIGZpbGw9IiMwMDZBRjkiLz4KPHBhdGggZD0iTTE4LjA0MjYgNC4yMDY3OUwxMC43MjIzIDQuMTk5NDdDMTAuNDYxNyA0LjE5OTQ3IDEwLjIzNjggNC4zNzMxOSAxMC4xNzU5IDQuNjI2NDlMNi44MDk3MSAxNi4zMjM3QzYuNzM4NTQgMTYuNjIyNSA2Ljk1OTQ0IDE2LjkxNjEgNy4yNjkwNiAxNi45MTMzTDEwLjcyMTIgMTYuODk3NUMxMC45ODc0IDE2Ljg5NjQgMTEuMjE1MiAxNi43MTY0IDExLjI3MzMgMTYuNDU2N0wxMi42NDE2IDExLjI4ODRDMTIuNjk5NyAxMS4wMjk5IDEyLjkyNjUgMTAuODQ4OSAxMy4xOTM3IDEwLjg0NzhMMTQuODgyNSAxMC44MzczQzE3LjgxNjYgMTAuODIyNiAxOS42NDQgOS40NTA1NyAyMC4wODUyIDYuNjA2MjVDMjAuMjk5NCA1LjI1NDA1IDIwLjAxNDYgNC4yMTk2IDE5LjIzODIgMy41NDg4OUMxOC44OTQ0IDMuMjQyMiAxOC40NjkxIDMuMjAzMzMgMTguMDQyNiA0LjIwNjc5WiIgZmlsbD0iIzAwNkFGOSIvPgo8cGF0aCBkPSJNNy43NDIxOSAxMS4zMjQyTDUuNDUyMzQgMTcuNzk0N0M1LjM4NzMgMTguMDUzMiA1LjU3ODEzIDE4LjMwMiA1Ljg0NTQgMTguMzAxTDkuMDc3MDkgMTguMjg2MkM5LjM0MzMyIDE4LjI4NTEgOS41NzEwNSAxOC4xMDUxIDkuNjI5MTYgMTcuODQ2NkwxMC45NzUzIDEyLjc1MjVDMTEuMDMyMyAxMi40OTQgMTEuMjU5IDEyLjMxNDEgMTEuNTI1MiAxMi4zMTI5TDEzLjEyMjQgMTIuMzAzM0MxNi4wNTU0IDEyLjI4ODYgMTcuODgyOCAxMC45MDYxIDE4LjMyMzggOC4wNjMwNkMxOC41NDU1IDYuNzEwOTYgMTguMjYgNS42NzU0MSAxNy40ODQxIDUuMDA0NjlDMTYuNzA3IDQuMzMzOTggMTUuNTQ3MyA0LjAyMDcgMTMuOTQ1MyA0LjAxMDE1TDcuNzk0NSA0LjAwMDY0QzcuNTM0IDMuOTk5NjggNy4zMDgwOCA0LjE3MjQ0IDcuMjQ2MDkgNC40MjY3N0w3LjEwMTQ3IDUuMDEwMTdDNy4wMzA0NyA1LjMwODQ5IDcuMjUxMiA1LjYwMjM1IDcuNTYwNzYgNS41OTk1NUwxMy40NzY2IDUuNTYzNUMxNS42NDc1IDUuNTYzNSAxNi41ODAzIDYuNTEzNTkgMTYuNTEzMiA4LjE5OThDMTYuNDQxMSAxMC4wNzExIDE1LjE4MTYgMTAuNzYzNCAxMy4xNzU4IDEwLjc1MjhMMTEuNDUxOSAxMC43NDMzQzExLjE4NiAxMC43NDI0IDEwLjk1NzEgMTAuOTE2NCAxMC44OTUyIDExLjE3MTdMNy43NDIxOSAxMS4zMjQyWiIgZmlsbD0iIzViQzU0MyIvPgo8cGF0aCBkPSJNMTMuMTE4MyAxOC4yOTU3QzEzLjM4NDYgMTguMjk0NiAxMy42MTIzIDE4LjExNDYgMTMuNjcwNCAxNy44NTYxTDE0Ljk5NDYgMTIuNzYyQzE1LjA1MTYgMTIuNTAzNSAxNS4yNzgzIDE4LjE1MzUgMTUuNTQ0NSAxOC4xNTI0TDE3LjE0NzYgMTguMTQyOEMyMC4wODk3IDE4LjEyODEgMjEuOTI0OCAxNi43MzUyIDIyLjM2NjggMTMuODk0MUMyMi41ODg2IDEyLjU0MiAyMi4zMDM4IDExLjUwNjkgMjEuNTI3NyAxMC44MzYyQzIwLjc1MDYgMTAuMTY1NSAxOS41OTA5IDkuODUyMiAxNy45ODg4IDkuODQxNjVMMTEuODMxNyA5LjgzMTY1QzExLjU3MTIgOS44MzE2NSAxMS4zNDUzIDEwLjAwNTQgMTEuMjgzMyAxMC4yNTg3TDExLjE0MDcgMTAuODQwN0MxMS4wNjk3IDExLjEzOSAxMS4yOTA0IDExLjQzMjkgMTEuNiAxMS40MzAxTDE3LjUxOTkgMTEuMzk0MUMxOS42OTA3IDExLjM5NDEgMjAuNjIzNSAxMi4zNDQyIDIwLjU1NjQgMTQuMDI5OEMyMC40ODQzIDE1LjkwMTEgMTkuMjI0OCAxNi41OTM0IDE3LjIxOSAxNi41ODI4TDE1LjQ5OTIgMTYuNTczM0MxNS4yMzMzIDE2LjU3MjQgMTUuMDA0NCAxNi43NDYzIDE0Ljk0MjUgMTcuMDAxN0wxNC44MDQgMTcuNDA3NkMxNC43MzI4IDE3LjcwNTkgMTQuOTUzNiAxNy45OTk4IDE1LjI2MzEgMTcuOTk3TDEzLjExODMgMTguMjk1N1oiIGZpbGw9IiNFMzFCMjMiLz4KPC9zdmc+Cg==';

// Define global interfaces
declare global {
  interface Window {
    Razorpay: any;
  }
}

// Define Razorpay response interface
interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayQRButtonProps {
  amount: number;
  name: string;
  description: string;
  className?: string;
  buttonText?: string;
  children?: React.ReactNode;
}

const RazorpayQRButton: React.FC<RazorpayQRButtonProps> = ({
  amount,
  name,
  description,
  className,
  buttonText = "Pay with UPI",
  children
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [qrImage, setQrImage] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [checkInterval, setCheckInterval] = useState<ReturnType<typeof setInterval> | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'paid' | 'failed'>('pending');
  const [error, setError] = useState<string | null>(null);
  
  // Load Razorpay script on component mount
  useEffect(() => {
    const loadRazorpayScript = () => {
      if (document.getElementById('razorpay-script')) {
        setScriptLoaded(true);
        return;
      }
      
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.id = 'razorpay-script';
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        script.onload = () => {
          resolve(true);
          setScriptLoaded(true);
        };
        script.onerror = () => {
          console.error("Failed to load Razorpay script");
          setError("Failed to load payment provider script. Please try again later.");
          resolve(false);
        };
        document.body.appendChild(script);
      });
    };
    
    loadRazorpayScript();
  }, []);

  // Clear interval when component unmounts or modal closes
  useEffect(() => {
    return () => {
      if (checkInterval) {
        clearInterval(checkInterval);
      }
    };
  }, [checkInterval]);

  // Reset state when modal closes
  useEffect(() => {
    if (!opened && checkInterval) {
      clearInterval(checkInterval);
      setCheckInterval(null);
    }
  }, [opened, checkInterval]);
  
  // Function to check payment status
  const checkPaymentStatus = async (orderId: string) => {
    try {
      const response = await fetch(`/api/payment-status?orderId=${orderId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        console.error('Failed to check payment status');
        return false;
      }
      
      const data = await response.json();
      console.log('Payment status:', data);
      
      // Update UI based on payment status
      setPaymentStatus(data.status);
      
      // If payment is successful, clear interval and close modal
      if (data.status === 'paid') {
        if (checkInterval) {
          clearInterval(checkInterval);
          setCheckInterval(null);
        }
        
        // Show success message and close modal after a delay
        setTimeout(() => {
          alert('Payment successful! Thank you for your purchase.');
          close();
        }, 1000);
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error checking payment status:', error);
      setError("Failed to check payment status. Please contact support if payment was made.");
      return false;
    }
  };
  
  // Function to handle QR code generation
  const handleGenerateQR = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setPaymentStatus('pending');
      
      // Check if script is loaded
      if (!scriptLoaded) {
        setError('Payment system is still loading. Please try again in a moment.');
        setIsLoading(false);
        return;
      }
      
      // Create order on the server using API route
      const response = await fetch('/api/razorpay-qr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          currency: 'INR',
          name,
          description,
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }
      
      const orderData = await response.json();
      console.log("QR order created:", orderData);
      
      if (orderData.warning) {
        console.warn(orderData.warning);
      }
      
      // Set QR image and open modal
      setQrImage(orderData.qrImage);
      setOrderId(orderData.id);
      
      // Open modal after ensuring QR is set
      setTimeout(() => {
        open();
        
        // Poll for payment status every 3 seconds
        const intervalId = setInterval(() => {
          checkPaymentStatus(orderData.id);
        }, 3000);
        
        setCheckInterval(intervalId);
      }, 100);
      
    } catch (error) {
      console.error('QR code generation failed:', error);
      setError('QR code generation failed: ' + (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <>
      <div className="relative">
        <Button
          className={className || "bg-[#528FF0] text-white hover:bg-[#4169E1]"}
          radius="xs"
          onClick={handleGenerateQR}
          disabled={isLoading || !scriptLoaded}
          leftSection={
            <img 
              src={UPI_ICON}
              alt="UPI" 
              className="h-4 w-auto"
            />
          }
        >
          {children || buttonText}
        </Button>
        
        {isLoading && (
          <div className="absolute inset-0 bg-black bg-opacity-25 flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
          </div>
        )}
      </div>
      
      <Modal opened={opened} onClose={close} title="Pay with UPI" centered size="md">
        <Box className="mx-auto">
          {error && (
            <Text color="red" className="text-center mb-4">
              {error}
            </Text>
          )}
          
          {qrImage ? (
            <div className="text-center">
              <div className="mb-3">
                <Text className="text-sm font-semibold text-blue-600">Scan with any UPI app to pay</Text>
              </div>
              <Image src={qrImage} alt="UPI QR Code" width={200} mx="auto" />
              <Text className="mt-4 text-sm text-gray-500">
                Scan this QR code with any UPI app (Google Pay, PhonePe, Paytm, etc.)
              </Text>
              <Text className="mt-2 text-xs text-gray-400">
                Amount: ₹{amount.toLocaleString('en-IN')}
              </Text>
              <Text className="mt-2 text-xs text-gray-400">
                Order ID: {orderId}
              </Text>
              
              {paymentStatus === 'pending' && (
                <>
                  <Text className="mt-6 text-sm font-medium">
                    Waiting for payment...
                  </Text>
                  <div className="mt-3 animate-pulse">
                    <div className="h-2 w-16 bg-blue-200 rounded mx-auto"></div>
                  </div>
                </>
              )}
              
              {paymentStatus === 'paid' && (
                <div className="mt-4 text-center">
                  <Text className="text-green-600 font-medium">Payment successful!</Text>
                  <Text className="text-sm text-gray-600">Thank you for your purchase.</Text>
                </div>
              )}
              
              {paymentStatus === 'failed' && (
                <div className="mt-4 text-center">
                  <Text className="text-red-600 font-medium">Payment failed</Text>
                  <Text className="text-sm text-gray-600">Please try again or use a different payment method.</Text>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center p-4">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <Text>Loading QR code...</Text>
            </div>
          )}
          
          <Group justify="center" mt="xl">
            <Button variant="outline" onClick={close} color="gray">
              Cancel
            </Button>
          </Group>
        </Box>
      </Modal>
    </>
  );
};

export default RazorpayQRButton; 