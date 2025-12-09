// hooks/useCheckout.js
import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import axios from 'axios';
import { useCart } from '../../../../context/CartContext';
import { api, getData } from '../../../../context/DataContext'; // ensure this path is correct

export const useCheckout = () => {
  const { cartItem } = useCart();
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // DataContext helpers (placeOrder updates context, fetchOrdersByUser refreshes)
  const { placeOrder, fetchOrdersByUser } = getData();

  const pricing = useMemo(() => {
    const subtotal = cartItem.reduce(
      (total, item) => total + (item.price || 0) * (item.quantity || 1),
      0
    );
    const deliveryFee = 0;
    const handlingFee = 5;
    const grandTotal = subtotal + deliveryFee + handlingFee;

    return { subtotal, deliveryFee, handlingFee, grandTotal };
  }, [cartItem]);

  const submitOrder = useCallback(async (formData) => {
    if (!isLoaded) {
      console.warn('Auth not loaded yet — please try again in a moment.');
      return;
    }
    if (!user) {
      console.error('No authenticated user found — cannot place order.');
      return;
    }
    setIsSubmitting(true);

    try {
      // Get MongoDB user (backend mapping)
      const mongoUserRes = await api.get(`/users/clerk/${user.id}`);
      const mongoUser = mongoUserRes.data;

      if (!mongoUser) {
        throw new Error("Mongo user not found");
      }

      // IMPORTANT: store Clerk id as userId (used by frontend fetch) AND store mongo id
      const orderData = {
  userId: user.id,             // Clerk ID
  mongoUserId: mongoUser.id,   // MongoDB ID
  orderId: `ORD-${Date.now()}`,
  items: cartItem,
  shippingInfo: {
    fullName: formData.fullName,
    email: formData.email,
    phone: formData.phone,
    address: formData.address,
    city: formData.city,
    state: formData.state,
    zipCode: formData.zipCode,
    country: formData.country,
  },
  paymentMethod: formData.paymentMethod,
  pricing,
  orderDate: new Date().toISOString(),
  status: "Pending",
};

      // Use placeOrder from DataContext if available (it should update context.orders)
      let createdOrder;
      if (typeof placeOrder === 'function') {
        createdOrder = await placeOrder(orderData);
      } else {
        const res = await api.post("/orders", orderData);
        createdOrder = res.data;
      }

      console.log("Order placed:", createdOrder);

      // Ensure DataContext is in sync — refetch user's orders (Clerk id)
      if (typeof fetchOrdersByUser === 'function') {
        try {
          await fetchOrdersByUser(user.id);
        } catch (e) {
          console.warn("Refetch after order failed:", e);
        }
      }

      // Navigate to confirmation with server returned order
      navigate("/order-confirmation", { state: { orderData: createdOrder } });
    } catch (err) {
      console.error("Error placing order:", err);
      // TODO: show user-facing error (toast/modal)
    } finally {
      setIsSubmitting(false);
    }
  }, [cartItem, pricing, user, isLoaded, navigate, placeOrder, fetchOrdersByUser]);

  return {
    cartItem,
    user,
    pricing,
    isSubmitting,
    submitOrder
  };
};
