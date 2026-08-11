
import { useEffect, useState, useMemo, useCallback } from 'react';
import { useUser } from '@clerk/clerk-react';
import { toast } from 'react-toastify';
import { api, getData } from '../../../../context/DataContext';

const TRANSIT_STATUSES = ["pending", "processing", "shipped"];

export const useOrders = () => {
  const { user, isLoaded } = useUser();
  const { orders, fetchOrdersByUser, loadingOrders } = getData();
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (isLoaded && user) {
      fetchOrdersByUser(user.id);
    }
  }, [isLoaded, user]);


  const filteredOrders = useMemo(() => {
    if (!orders || !Array.isArray(orders)) {
      return [];
    }

    if (filter === "all") {
      return orders;
    }

    if (filter === "transit") {
      return orders.filter((order) =>
        TRANSIT_STATUSES.includes(order.status?.toLowerCase())
      );
    }

    const filtered = orders.filter((order) => {
      const orderStatus = order.status?.toLowerCase();
      const filterStatus = filter.toLowerCase();
      return orderStatus === filterStatus;
    });

    return filtered;
  }, [orders, filter]);

  // Format date
  const formatDate = useCallback((dateString) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid Date";
    }
  }, []);

  // Get order count by status
  const getOrderCount = useCallback((status) => {
    if (!orders || !Array.isArray(orders)) return 0;
    
    if (status === "all") return orders.length;

    if (status === "transit") {
      return orders.filter((o) =>
        TRANSIT_STATUSES.includes(o.status?.toLowerCase())
      ).length;
    }

    const count = orders.filter((o) => 
      o.status?.toLowerCase() === status.toLowerCase()
    ).length;
    
    return count;
  }, [orders]);

  // Cancel an order (only allowed while pending/processing)
  const cancelOrder = useCallback(async (orderId) => {
    try {
      await api.put(`/orders/${orderId}`, { status: "cancelled" });
      toast.success("Order cancelled successfully");
      if (user?.id) {
        fetchOrdersByUser(user.id);
      }
      return { success: true };
    } catch (error) {
      console.error("Error cancelling order:", error);
      toast.error("Failed to cancel order!");
      return { success: false };
    }
  }, [fetchOrdersByUser, user?.id]);

  return {
    user,
    isLoaded,
    orders: orders || [],
    filteredOrders,
    loadingOrders,
    filter,
    setFilter,
    formatDate,
    getOrderCount,
    cancelOrder
  };
};