import React, { useState } from 'react';
import { Boxes } from 'lucide-react';
import useInventory from './hooks/useInventory';
import InventoryStats from './components/InventoryStats';
import InventoryFilters from './components/InventoryFilters';
import InventoryTable from './components/InventoryTable';
import UpdateStockModal from './components/UpdateStockModal';
import Pagination from '../../../components/ui/erp/Pagination';
import { FullPageSpinner } from '../../../components/ui/Spinner';

const Inventory = () => {
  const {
    products,
    filteredCount,
    loading,
    searchTerm,
    setSearchTerm,
    stockFilter,
    setStockFilter,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
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
    <div className="p-6 bg-transparent min-h-screen">
      <div className="flex items-center gap-3 mb-6">
        <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-brand-600 text-white">
          <Boxes size={20} aria-hidden />
        </span>
        <div>
          <h1 className="text-xl font-bold text-foreground leading-tight">Inventory Management</h1>
          <p className="text-sm text-text-muted mt-0.5">Monitor and update stock levels</p>
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
        currentPage={currentPage}
        pageSize={pageSize}
        onUpdateStock={handleUpdateStock}
      />

      <Pagination
        page={currentPage}
        limit={pageSize}
        total={filteredCount}
        onPageChange={setCurrentPage}
        onLimitChange={(limit) => {
          setPageSize(limit);
          setCurrentPage(1);
        }}
        className="mt-5"
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
