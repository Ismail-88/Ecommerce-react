// ============================================
// FILE: src/pages/admin/Inventory/hooks/useInventory.js
// ============================================
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export const useInventory = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [stockFilter, setStockFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, searchTerm, stockFilter]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/products');
      const data = await response.json();
      setProducts(data);
      toast.success('Inventory loaded successfully!');
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load inventory');
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.brand?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (stockFilter === 'low') {
      filtered = filtered.filter((product) => product.stock <= 10 && product.stock > 0);
    } else if (stockFilter === 'out') {
      filtered = filtered.filter((product) => product.stock === 0);
    } else if (stockFilter === 'instock') {
      filtered = filtered.filter((product) => product.stock > 10);
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const updateStock = async (productId, newStock) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5000/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ stock: parseInt(newStock) })
      });

      if (response.ok) {
        toast.success('Stock updated successfully!');
        fetchProducts();
        return { success: true };
      }
    } catch (error) {
      console.error('Error updating stock:', error);
      toast.error('Failed to update stock');
      return { success: false };
    }
  };

  // Stats
  const totalProducts = filteredProducts.length;
  const lowStockProducts = filteredProducts.filter(p => p.stock <= 10 && p.stock > 0).length;
  const outOfStockProducts = filteredProducts.filter(p => p.stock === 0).length;
  const totalStockValue = filteredProducts.reduce((sum, p) => sum + (p.price * p.stock), 0);

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return {
    products: currentProducts,
    loading,
    searchTerm,
    setSearchTerm,
    stockFilter,
    setStockFilter,
    currentPage,
    setCurrentPage,
    totalPages,
    updateStock,
    stats: {
      totalProducts,
      lowStockProducts,
      outOfStockProducts,
      totalStockValue
    }
  };
};

// ============================================
// FILE: src/pages/admin/Inventory/components/InventoryStats.jsx
// ============================================
import React from 'react';
import { Package, TrendingDown, AlertTriangle } from 'lucide-react';

export const InventoryStats = ({ stats }) => {
  const statsConfig = [
    {
      label: 'Total Products',
      value: stats.totalProducts,
      icon: Package,
      color: 'blue',
      borderColor: 'border-blue-500',
      textColor: 'text-blue-500'
    },
    {
      label: 'Low Stock Items',
      value: stats.lowStockProducts,
      icon: TrendingDown,
      color: 'yellow',
      borderColor: 'border-yellow-500',
      textColor: 'text-yellow-500'
    },
    {
      label: 'Out of Stock',
      value: stats.outOfStockProducts,
      icon: AlertTriangle,
      color: 'red',
      borderColor: 'border-red-500',
      textColor: 'text-red-500'
    },
    {
      label: 'Stock Value',
      value: stats.totalStockValue.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
      icon: Package,
      color: 'green',
      borderColor: 'border-green-500',
      textColor: 'text-green-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {statsConfig.map((stat, index) => (
        <div key={index} className={`bg-white p-6 rounded-lg shadow-md border-l-4 ${stat.borderColor}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</h3>
            </div>
            <stat.icon className={stat.textColor} size={32} />
          </div>
        </div>
      ))}
    </div>
  );
};

// ============================================
// FILE: src/pages/admin/Inventory/components/InventoryFilters.jsx
// ============================================
import React from 'react';
import { Search } from 'lucide-react';

export const InventoryFilters = ({ searchTerm, setSearchTerm, stockFilter, setStockFilter }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by product name or brand..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          value={stockFilter}
          onChange={(e) => setStockFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Products</option>
          <option value="instock">In Stock</option>
          <option value="low">Low Stock</option>
          <option value="out">Out of Stock</option>
        </select>
      </div>
    </div>
  );
};

// ============================================
// FILE: src/pages/admin/Inventory/components/InventoryTable.jsx
// ============================================
import React from 'react';
import { Edit } from 'lucide-react';

export const InventoryTable = ({ products, onUpdateStock }) => {
  const getStockStatus = (stock) => {
    if (stock === 0) return { text: 'Out of Stock', color: 'bg-red-100 text-red-800' };
    if (stock <= 10) return { text: 'Low Stock', color: 'bg-yellow-100 text-yellow-800' };
    return { text: 'In Stock', color: 'bg-green-100 text-green-800' };
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Product</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Brand</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Category</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Price</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Stock</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Stock Value</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.length === 0 ? (
              <tr>
                <td colSpan="8" className="px-6 py-8 text-center text-gray-500">No products found</td>
              </tr>
            ) : (
              products.map((product) => {
                const status = getStockStatus(product.stock);
                const stockValue = product.price * product.stock;
                const imageUrl = product.images?.[0]?.startsWith('http') 
                  ? product.images[0] 
                  : `http://localhost:5000${product.images?.[0]}`;

                return (
                  <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={imageUrl || 'https://via.placeholder.com/50'}
                          alt={product.title}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <span className="text-sm font-medium text-gray-800 max-w-xs truncate">
                          {product.title}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{product.brand || 'N/A'}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{product.category?.name || 'N/A'}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                      {product.price?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-lg font-bold ${
                        product.stock === 0 ? 'text-red-600' :
                        product.stock <= 10 ? 'text-yellow-600' : 'text-green-600'
                      }`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                      {stockValue.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${status.color}`}>
                        {status.text}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => onUpdateStock(product)}
                        className="flex items-center gap-1 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit size={16} />
                        Update
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ============================================
// FILE: src/pages/admin/Inventory/components/UpdateStockModal.jsx
// ============================================
import React, { useState, useEffect } from 'react';

export const UpdateStockModal = ({ product, onClose, onUpdate }) => {
  const [newStock, setNewStock] = useState(0);

  useEffect(() => {
    if (product) {
      setNewStock(product.stock);
    }
  }, [product]);

  if (!product) return null;

  const handleUpdate = async () => {
    const result = await onUpdate(product._id, newStock);
    if (result.success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Update Stock</h2>
        </div>
        <div className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product: {product.title}
            </label>
            <p className="text-sm text-gray-600">Current Stock: {product.stock}</p>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Stock Quantity
            </label>
            <input
              type="number"
              min="0"
              value={newStock}
              onChange={(e) => setNewStock(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleUpdate}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              Update Stock
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// FILE: src/pages/admin/Inventory/index.jsx
// ============================================
import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useInventory } from './hooks/useInventory';
import { InventoryStats } from './components/InventoryStats';
import { InventoryFilters } from './components/InventoryFilters';
import { InventoryTable } from './components/InventoryTable';
import { UpdateStockModal } from './components/UpdateStockModal';
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

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

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