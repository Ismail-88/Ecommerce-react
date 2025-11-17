// hooks/useOrderTracking.js
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { FaBox, FaShippingFast, FaTruck, FaCheckCircle } from 'react-icons/fa';
import { MdLocalShipping } from 'react-icons/md';
import { getData } from '../../../../context/DataContext';

export const useOrderTracking = (setValue) => {
  const location = useLocation();
  const [orderData, setOrderData] = useState(null);
  const [trackingStatus, setTrackingStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const { fetchOrderById } = getData();

  // Auto-fill if coming from order confirmation
  useEffect(() => {
    if (location.state?.orderId) {
      setValue("orderId", location.state.orderId);
      handleTrackOrder({ orderId: location.state.orderId });
    }
  }, [location.state, setValue]);

  // Dynamic tracking statuses
  const getTrackingStatuses = useCallback((order) => {
    const date = new Date(order.orderDate);
    const statusMap = ["pending", "processing", "shipped", "out for delivery", "delivered"];
    const statusDescriptions = {
      pending: "Your order has been received and is being processed.",
      processing: "We are preparing your premium items with care.",
      shipped: "Your order is on its way to you.",
      "out for delivery": "Your order is out for delivery today.",
      delivered: "Your order has been successfully delivered.",
    };
    const statusIcons = {
      pending: FaBox,
      processing: FaShippingFast,
      shipped: FaTruck,
      "out for delivery": MdLocalShipping,
      delivered: FaCheckCircle,
    };

    const currentIndex = statusMap.indexOf(order.status);

    return statusMap.map((status, i) => ({
      id: i + 1,
      status: status.charAt(0).toUpperCase() + status.slice(1),
      description: statusDescriptions[status],
      icon: statusIcons[status],
      date: new Date(date.getTime() + i * 24 * 60 * 60 * 1000),
      completed: i <= currentIndex,
    }));
  }, []);

  const handleTrackOrder = useCallback(async (data) => {
    setLoading(true);
    try {
      const order = await fetchOrderById(data.orderId);

      if (order) {
        setOrderData(order);
        setTrackingStatus(getTrackingStatuses(order));
      } else {
        setOrderData(null);
        setTrackingStatus(null);
        alert("Order not found! Please check your Order ID.");
      }
    } catch (error) {
      console.error(error);
      setOrderData(null);
      setTrackingStatus(null);
      alert("Order not found! Please check your Order ID.");
    } finally {
      setLoading(false);
    }
  }, [fetchOrderById, getTrackingStatuses]);

  return {
    orderData,
    trackingStatus,
    loading,
    handleTrackOrder
  };
};