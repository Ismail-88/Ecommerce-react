import React, { useState } from "react";

import AdminPagination from "../../../components/Admin/AdminPagination";
import { useOrders } from "./hooks/useOrders";
import { OrdersHeader } from "./components/OrdersHeader";
import { OrdersFilters } from "./components/OrdersFilters";
import { OrdersTable } from "./components/OrdersTable";
import { OrderDetailsModal } from "./components/OrderDetailsModal";
import { FullPageSpinner } from "../../../components/ui/Spinner";

const AdminOrders = () => {
  const {
    orders,
    currentOrders,
    loading,
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
  } = useOrders();

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    const result = await updateOrderStatus(orderId, newStatus);
    if (result.success && selectedOrder) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const handleDelete = async (orderId) => {
    await deleteOrder(orderId);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <FullPageSpinner label="Loading orders..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent p-4 md:p-8">
      {/* Header */}
      <OrdersHeader totalOrders={orders.length} onExport={exportOrders} />

      {/* Filters */}
      <OrdersFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      {/* Orders Table */}
      <OrdersTable
        orders={currentOrders}
        onViewOrder={handleViewOrder}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
      />

      <AdminPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {/* Modal */}
      {showModal && selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setShowModal(false)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
};

export default AdminOrders;
