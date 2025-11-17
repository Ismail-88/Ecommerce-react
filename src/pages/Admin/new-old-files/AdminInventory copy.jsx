import React, { useState, useEffect } from 'react';
import { Search, AlertTriangle, Package, TrendingDown, Edit, ChevronLeft, ChevronRight } from 'lucide-react';
import Pagination from '../../../components/Pagination';
import AdminPagination from '../../../components/Admin/AdminPagination';

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [stockFilter, setStockFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [newStock, setNewStock] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
//   const [itemsPerPage, setItemsPerPage] = useState(5);

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
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
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
  };

  const totalProducts = filteredProducts.length;
  const lowStockProducts = filteredProducts.filter(p => p.stock <= 10 && p.stock > 0).length;
  const outOfStockProducts = filteredProducts.filter(p => p.stock === 0).length;
  const totalStockValue = filteredProducts.reduce((sum, p) => sum + (p.price * p.stock), 0);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleUpdateStock = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5000/products/${selectedProduct._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ stock: parseInt(newStock) })
      });

      if (response.ok) {
        alert('Stock updated successfully!');
        setShowModal(false);
        fetchProducts();
      }
    } catch (error) {
      console.error('Error updating stock:', error);
      alert('Failed to update stock');
    }
  };

  const openStockModal = (product) => {
    setSelectedProduct(product);
    setNewStock(product.stock);
    setShowModal(true);
  };

  const getStockStatus = (stock) => {
    if (stock === 0) return { text: 'Out of Stock', color: 'bg-red-100 text-red-800' };
    if (stock <= 10) return { text: 'Low Stock', color: 'bg-yellow-100 text-yellow-800' };
    return { text: 'In Stock', color: 'bg-green-100 text-green-800' };
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
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Inventory Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Products</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-2">{totalProducts}</h3>
            </div>
            <Package className="text-blue-500" size={32} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Low Stock Items</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-2">{lowStockProducts}</h3>
            </div>
            <TrendingDown className="text-yellow-500" size={32} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Out of Stock</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-2">{outOfStockProducts}</h3>
            </div>
            <AlertTriangle className="text-red-500" size={32} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Stock Value</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-2">
              {totalStockValue
                        ? totalStockValue.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
                        : "$0.00"}
              </h3>
            </div>
            <Package className="text-green-500" size={32} />
          </div>
        </div>
      </div>

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
              {currentProducts.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-8 text-center text-gray-500">No products found</td>
                </tr>
              ) : (
                currentProducts.map((product) => {
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
                        {stockValue
                        ? stockValue.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
                        : "$0.00"}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${status.color}`}>
                          {status.text}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => openStockModal(product)}
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

      {/* Pagination */}
         <AdminPagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={paginate}
/>      

      {showModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">Update Stock</h2>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product: {selectedProduct.title}
                </label>
                <p className="text-sm text-gray-600">Current Stock: {selectedProduct.stock}</p>
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
                  onClick={handleUpdateStock}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                >
                  Update Stock
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-semibold transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;