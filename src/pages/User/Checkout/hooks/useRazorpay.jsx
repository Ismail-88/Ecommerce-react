import { useState, useEffect } from 'react';

const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID ;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ;

// Load Razorpay script
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const useRazorpay = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    loadRazorpayScript().then(setScriptLoaded);
  }, []);

  const initiatePayment = async ({
    amount,
    orderData,
    customerDetails,
    onSuccess,
    onFailure
  }) => {
    if (!scriptLoaded) {
      alert('Payment system is loading. Please try again.');
      return;
    }

    setIsLoading(true);

    try {
      // Step 1: Create order on backend
      const orderResponse = await fetch(`${API_BASE_URL}/api/payment/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: amount,
          currency: 'INR',
          receipt: `receipt_${Date.now()}`,
          orderData: orderData
        })
      });

      const orderResult = await orderResponse.json();

      if (!orderResult.success) {
        throw new Error(orderResult.message || 'Failed to create order');
      }

      // Step 2: Open Razorpay checkout
      const options = {
        key: RAZORPAY_KEY_ID,
        amount: orderResult.amount,
        currency: orderResult.currency,
        name: 'Your Store Name',
        description: 'Purchase from Your Store',
        image: '/logo.png',
        order_id: orderResult.orderId,
        
        prefill: {
          name: customerDetails.name,
          email: customerDetails.email,
          contact: customerDetails.phone
        },

        theme: {
          color: '#06b6d4'
        },

        // Payment success handler
        handler: async function (response) {
          try {
            // Step 3: Verify payment on backend
            const verifyResponse = await fetch(`${API_BASE_URL}/api/payment/verify`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                dbOrderId: orderResult.dbOrderId
              })
            });

            const verifyResult = await verifyResponse.json();

            if (verifyResult.success) {
              setIsLoading(false);
              onSuccess(verifyResult.order);
            } else {
              throw new Error(verifyResult.message || 'Payment verification failed');
            }
          } catch (error) {
            setIsLoading(false);
            onFailure(error);
          }
        },

        modal: {
          ondismiss: function() {
            setIsLoading(false);
            onFailure(new Error('Payment cancelled by user'));
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (error) {
      setIsLoading(false);
      onFailure(error);
    }
  };

  const createCODOrder = async (orderData, onSuccess, onFailure) => {
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/payment/cod-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderData })
      });

      const result = await response.json();

      if (result.success) {
        setIsLoading(false);
        onSuccess(result.order);
      } else {
        throw new Error(result.message || 'Failed to create order');
      }
    } catch (error) {
      setIsLoading(false);
      onFailure(error);
    }
  };

  return {
    initiatePayment,
    createCODOrder,
    isLoading,
    scriptLoaded
  };
};