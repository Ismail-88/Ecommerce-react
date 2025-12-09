import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { api, getData } from "../../../../context/DataContext";

export const useOrders = ()=>{
    const { orders, fetchAllOrders, loadingOrders } = getData();
      const [filteredOrders, setFilteredOrders] = useState([]);
      const [searchTerm, setSearchTerm] = useState("");
      const [statusFilter, setStatusFilter] = useState("all");
      const [currentPage, setCurrentPage] = useState(1);

      const productsPerPage = 6;

      useEffect(()=>{fetchAllOrders()},[]);

       useEffect(() => {
    filterOrders();
  }, [orders, searchTerm, statusFilter]);

    const filterOrders = () => {
    let filtered = orders;

    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.orderId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.shippingInfo?.fullName
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          order.shippingInfo?.email
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    setFilteredOrders(filtered);
     setCurrentPage(1);
  };

   const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await api.put(`/orders/${orderId}`, {
        status: newStatus,
      });
      toast.success(`Order ${orderId} status updated to ${newStatus}!`);
      fetchAllOrders();
      return { success: true };
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status!");
      return { success: false };
    }
  };

   const deleteOrder = async (orderId) => {
    try {
      await api.delete(`/orders/${orderId}`);
      toast.success("Order deleted successfully!");
      fetchAllOrders();
      return { success: true };
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error("Failed to delete order");
      return { success: false };
    }
  };

  const exportOrders = () => {
    const csv = [
      ["Order ID", "Customer", "Date", "Status", "Total"],
      ...filteredOrders.map((order) => [
        order.orderId,
        order.shippingInfo.fullName,
        new Date(order.orderDate).toLocaleDateString(),
        order.status,
        `$${order.pricing.grandTotal.toFixed(2)}`,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `orders-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

   const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentOrders = filteredOrders.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );
    const totalPages = Math.ceil(filteredOrders.length / productsPerPage);

     return {
    orders: filteredOrders,
    currentOrders,
    loading: loadingOrders,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    currentPage,
    setCurrentPage,
    totalPages,
    updateOrderStatus,
    deleteOrder,
    exportOrders,
  };
}