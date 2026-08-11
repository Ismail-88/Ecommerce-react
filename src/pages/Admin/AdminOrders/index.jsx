import React, { useState } from "react";

import Pagination from "../../../components/ui/erp/Pagination";
import { useOrders } from "./hooks/useOrders";
import { OrdersHeader } from "./components/OrdersHeader";
import { OrdersFilters } from "./components/OrdersFilters";
import { OrdersTable } from "./components/OrdersTable";
import { OrderDetailsModal } from "./components/OrderDetailsModal";
import { FullPageSpinner } from "../../../components/ui/Spinner";

const AdminOrders = () => {
  const {
    orders,
    loading,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
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
        orders={orders}
        currentPage={currentPage}
        pageSize={pageSize}
        onViewOrder={handleViewOrder}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
      />

      <Pagination
        page={currentPage}
        limit={pageSize}
        total={orders.length}
        onPageChange={setCurrentPage}
        onLimitChange={(limit) => {
          setPageSize(limit);
          setCurrentPage(1);
        }}
        className="mt-5"
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
