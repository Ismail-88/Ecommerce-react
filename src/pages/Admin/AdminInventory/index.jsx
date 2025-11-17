import React, { useState, useEffect } from 'react';
import useInventory from './hooks/useInventory';
import { ToastContainer } from 'react-toastify';
import InventoryStats from './components/InventoryStats';
import InventoryFilters from './components/InventoryFilters';
import InventoryTable from './components/InventoryTable';
import UpdateStockModal from './components/UpdateStockModal';
import AdminPagination from '../../../components/Admin/AdminPagination';

const Inventory = () => {
  
    const {
    products,
    loading,
    searchTerm,
    setSearchTerm,
    stockFilter,
    setStockFilter,
    currentPage,
    setCurrentPage,
    totalPages,
    updateStock,
    stats
  } = useInventory();
 
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleUpdateStock = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-gray-600">Loading inventory...</div>
      </div>
    );
  }

  return (
     <div className="p-6 bg-gray-50 min-h-screen">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <h1 className="text-3xl font-bold text-gray-800 mb-8">Inventory Management</h1>

      <InventoryStats stats={stats} />

      <InventoryFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        stockFilter={stockFilter}
        setStockFilter={setStockFilter}
      />

      <InventoryTable
        products={products}
        onUpdateStock={handleUpdateStock}
      />

      <AdminPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {showModal && (
        <UpdateStockModal
          product={selectedProduct}
          onClose={() => setShowModal(false)}
          onUpdate={updateStock}
        />
      )}
    </div>
  );
};

export default Inventory;