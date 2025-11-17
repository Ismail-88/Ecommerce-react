
import { useEffect, useState, useMemo, useCallback } from 'react';
import { useUser } from '@clerk/clerk-react';
import { getData } from '../../../../context/DataContext';

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
    
    const count = orders.filter((o) => 
      o.status?.toLowerCase() === status.toLowerCase()
    ).length;
    
    return count;
  }, [orders]);

  return {
    user,
    isLoaded,
    orders: orders || [],
    filteredOrders,
    loadingOrders,
    filter,
    setFilter,
    formatDate,
    getOrderCount
  };
};