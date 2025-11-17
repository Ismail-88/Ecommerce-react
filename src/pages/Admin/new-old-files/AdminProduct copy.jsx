import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  Plus,
  Edit2,
  Trash2,
  Eye,
  Box,
  DollarSign,
  Tag,
  Image,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';

const AdminProducts = () => {
  // Mock data - replace with your actual data fetching
  const [products, setProducts] = useState([
    {
      _id: '1',
      title: 'Wireless Headphones',
      description: 'Premium noise-cancelling wireless headphones with 30hr battery',
      price: 299.99,
      discount: 15,
      stock: 45,
      images: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
      category: { name: 'Electronics' },
      createdAt: '2024-10-01'
    },
    {
      _id: '2',
      title: 'Smart Watch',
      description: 'Fitness tracking smartwatch with heart rate monitor',
      price: 199.99,
      discount: 0,
      stock: 8,
      images: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
      category: { name: 'Electronics' },
      createdAt: '2024-09-25'
    },
    {
      _id: '3',
      title: 'Running Shoes',
      description: 'Comfortable running shoes with excellent grip and cushioning',
      price: 89.99,
      discount: 20,
      stock: 120,
      images: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
      category: { name: 'Sports' },
      createdAt: '2024-09-20'
    },
    {
      _id: '4',
      title: 'Backpack',
      description: 'Durable travel backpack with laptop compartment',
      price: 59.99,
      discount: 10,
      stock: 75,
      images: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
      category: { name: 'Accessories' },
      createdAt: '2024-09-15'
    },
    {
      _id: '5',
      title: 'Coffee Maker',
      description: 'Automatic coffee maker with programmable timer',
      price: 129.99,
      discount: 0,
      stock: 5,
      images: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500',
      category: { name: 'Home' },
      createdAt: '2024-09-10'
    },
    {
      _id: '6',
      title: 'Desk Lamp',
      description: 'LED desk lamp with adjustable brightness and color temperature',
      price: 45.99,
      discount: 5,
      stock: 92,
      images: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500',
      category: { name: 'Home' },
      createdAt: '2024-09-05'
    },
  ]);

  const categories = [
    { _id: '1', name: 'Electronics' },
    { _id: '2', name: 'Sports' },
    { _id: '3', name: 'Accessories' },
    { _id: '4', name: 'Home' },
  ];

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const productsPerPage = 12;

  useEffect(() => {
    filterAndSortProducts();
  }, [products, searchQuery, selectedCategory, sortBy]);

  const filterAndSortProducts = () => {
    let filtered = [...products];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(
        (product) => product.category?.name === selectedCategory
      );
    }

    // Sorting
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name-az':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name-za':
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'stock-low':
        filtered.sort((a, b) => (a.stock || 0) - (b.stock || 0));
        break;
      case 'stock-high':
        filtered.sort((a, b) => (b.stock || 0) - (a.stock || 0));
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const handleDeleteProduct = () => {
    if (!productToDelete) return;
    setProducts(products.filter((p) => p._id !== productToDelete._id));
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate stats
  const lowStockCount = products.filter((p) => (p.stock || 0) < 10).length;
  const avgPrice = products.length > 0
    ? (products.reduce((sum, p) => sum + p.price, 0) / products.length).toFixed(2)
    : '0.00';

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold text-lg">Loading Products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 via-pink-500 to-red-600 rounded-2xl p-6 md:p-8 text-white shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Product Management
            </h1>
            <p className="text-red-100">
              Manage your product catalog - {filteredProducts.length} products found
            </p>
          </div>
          <button className="bg-white text-red-500 px-6 py-3 rounded-xl font-semibold hover:bg-red-50 transition flex items-center gap-2 shadow-lg">
            <Plus size={20} /> Add New Product
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Box className="text-blue-600" size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Products</p>
              <p className="text-2xl font-bold text-gray-800">{products.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-3 rounded-lg">
              <DollarSign className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Avg Price</p>
              <p className="text-2xl font-bold text-gray-800">${avgPrice}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Tag className="text-yellow-600" size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Low Stock</p>
              <p className="text-2xl font-bold text-gray-800">{lowStockCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Image className="text-purple-600" size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Categories</p>
              <p className="text-2xl font-bold text-gray-800">{categories.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products by name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          {/* Filter Toggle Button (Mobile) */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden bg-gray-100 px-4 py-3 rounded-xl font-semibold text-gray-700 flex items-center justify-center gap-2"
          >
            <Filter size={20} /> Filters
          </button>
        </div>

        {/* Filters */}
        <div className={`${showFilters ? 'block' : 'hidden'} md:block mt-4 grid grid-cols-1 md:grid-cols-3 gap-4`}>
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name-az">Name: A-Z</option>
              <option value="name-za">Name: Z-A</option>
              <option value="stock-low">Stock: Low to High</option>
              <option value="stock-high">Stock: High to Low</option>
            </select>
          </div>

          {/* Results Count */}
          <div className="flex items-end">
            <div className="w-full bg-gray-50 px-4 py-2 rounded-xl">
              <p className="text-sm text-gray-600">
                Showing <span className="font-bold text-gray-800">{currentProducts.length}</span> of{' '}
                <span className="font-bold text-gray-800">{filteredProducts.length}</span> products
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {currentProducts.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <Box className="text-gray-300 mx-auto mb-4" size={64} />
          <h3 className="text-xl font-bold text-gray-800 mb-2">No Products Found</h3>
          <p className="text-gray-500 mb-6">
            {searchQuery || selectedCategory !== 'all'
              ? 'Try adjusting your filters or search query'
              : 'Start by adding your first product'}
          </p>
          <button className="bg-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-600 transition inline-flex items-center gap-2">
            <Plus size={20} /> Add Product
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
              >
                {/* Product Image */}
                <div className="relative overflow-hidden h-48">
                  <img
                    src={Array.isArray(product.images) ? product.images[0] : product.images}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {product.discount > 0 && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-bold">
                      -{product.discount}%
                    </div>
                  )}
                  {(product.stock || 0) < 10 && (
                    <div className="absolute top-3 right-3 bg-yellow-500 text-white px-3 py-1 rounded-lg text-xs font-bold">
                      Low Stock
                    </div>
                  )}
                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                    <button
                      className="bg-white text-gray-800 p-3 rounded-lg hover:bg-gray-100 transition"
                      title="View Product"
                    >
                      <Eye size={20} />
                    </button>
                    <button
                      className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
                      title="Edit Product"
                    >
                      <Edit2 size={20} />
                    </button>
                    <button
                      onClick={() => {
                        setProductToDelete(product);
                        setShowDeleteModal(true);
                      }}
                      className="bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition"
                      title="Delete Product"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <div className="mb-2">
                    <span className="text-xs font-semibold text-red-500 bg-red-50 px-2 py-1 rounded">
                      {product.category?.name || 'Uncategorized'}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Price and Stock */}
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-2xl font-bold text-red-500">
                        ${product.price}
                      </span>
                      {product.discount > 0 && (
                        <span className="text-sm text-gray-400 line-through ml-2">
                          ${(product.price / (1 - product.discount / 100)).toFixed(2)}
                        </span>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Stock</p>
                      <p className={`text-sm font-bold ${(product.stock || 0) < 10 ? 'text-red-500' : 'text-green-500'}`}>
                        {product.stock || 0}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button className="flex-1 bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition flex items-center justify-center gap-2">
                      <Edit2 size={16} /> Edit
                    </button>
                    <button
                      onClick={() => {
                        setProductToDelete(product);
                        setShowDeleteModal(true);
                      }}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={20} />
              </button>
              
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${
                    currentPage === index + 1
                      ? 'bg-red-500 text-white'
                      : 'bg-white border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl">
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="text-red-500" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Delete Product</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete <span className="font-semibold">{productToDelete?.title}</span>? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setProductToDelete(null);
                  }}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteProduct}
                  className="flex-1 px-6 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;