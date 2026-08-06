// pages/Admin/AdminProducts.jsx
import React, { useState } from "react";
import AdminPagination from "../../../components/Admin/AdminPagination";
import useProductsData from "./hooks/useProductsData";
import ProductsHeader from "./components/ProductsHeader";
import ProductsStats from "./components/ProductsStats";
import SearchAndFilters from "./components/SearchAndFilters";
import EmptyProductsState from "./components/EmptyProductsState";
import ProductCard from "./components/ProductCard";
import DeleteProductModal from "./components/DeleteProductModal";
import { FullPageSpinner } from "../../../components/ui/Spinner";

const AdminProducts = () => {
  const {
    products,
    filteredProducts,
    loading,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    categories,
    deleteProduct,
  } = useProductsData();

  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState("grid");

  const productsPerPage = 12;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;
    const result = await deleteProduct(productToDelete._id);
    if (result.success) {
      setShowDeleteModal(false);
      setProductToDelete(null);
    } else {
      alert("Failed to delete product. Please try again.");
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <FullPageSpinner label="Loading Products..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent">
      <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 space-y-6">
        {/* Header */}
        <ProductsHeader productsCount={filteredProducts.length} />

        {/* Stats Cards */}
        <ProductsStats products={products} categories={categories} />

        {/* Search & Filter Bar */}
        <SearchAndFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
          categories={categories}
          viewMode={viewMode}
          setViewMode={setViewMode}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          currentProductsCount={currentProducts.length}
          filteredProductsCount={filteredProducts.length}
        />

        {/* Products Grid/List */}
        {currentProducts.length === 0 ? (
          <EmptyProductsState
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
          />
        ) : (
          <>
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "space-y-4"
              }
            >
              {currentProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onDelete={handleDeleteClick}
                />
              ))}
            </div>

            {/* Pagination */}
            <AdminPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <DeleteProductModal
          product={productToDelete}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}
    </div>
  );
};

export default AdminProducts;
