import React, { useState } from 'react';
import { Boxes } from 'lucide-react';
import useInventory from './hooks/useInventory';
import { ToastContainer } from 'react-toastify';
import InventoryStats from './components/InventoryStats';
import InventoryFilters from './components/InventoryFilters';
import InventoryTable from './components/InventoryTable';
import UpdateStockModal from './components/UpdateStockModal';
import AdminPagination from '../../../components/Admin/AdminPagination';
import { FullPageSpinner } from '../../../components/ui/Spinner';
import { useTheme } from '../../../context/ThemeContext';

const Inventory = () => {
  const { isDark } = useTheme();
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
    stats,
  } = useInventory();

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleUpdateStock = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <FullPageSpinner label="Loading inventory..." />
      </div>
    );
  }

  return (
    <div className="p-6 bg-background min-h-screen">
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
        theme={isDark ? "dark" : "light"}
      />

      <div className="flex items-center gap-3 mb-6">
        <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-brand-soft text-brand-600 dark:text-brand-400">
          <Boxes size={24} aria-hidden />
        </span>
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Inventory Management</h1>
          <p className="text-sm text-text-muted">Monitor and update stock levels</p>
        </div>
      </div>

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
