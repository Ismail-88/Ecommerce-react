import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  X,
  AlertCircle,
  Package,
  Grid3x3,
  List,
} from "lucide-react";
import { getData } from "../../../context/DataContext";
import axios from "axios";
import AdminPagination from "../../../components/Admin/AdminPagination";

const AdminProducts = () => {
  const navigate = useNavigate();
  const { data, fetchAllProducts, categories, fetchCategories } = getData();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState("grid");

  const productsPerPage = 12;

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    setProducts(data);
  }, [data]);

  useEffect(() => {
    filterAndSortProducts();
  }, [products, searchQuery, selectedCategory, sortBy]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      await fetchAllProducts();
      await fetchCategories();
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortProducts = () => {
    let filtered = [...products];

    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category?.name === selectedCategory
      );
    }

    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "oldest":
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name-az":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "name-za":
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "stock-low":
        filtered.sort((a, b) => (a.stock || 0) - (b.stock || 0));
        break;
      case "stock-high":
        filtered.sort((a, b) => (b.stock || 0) - (a.stock || 0));
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const handleDeleteProduct = async () => {
    if (!productToDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/products/${productToDelete._id}`
      );
      await fetchAllProducts();
      setShowDeleteModal(false);
      setProductToDelete(null);
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product. Please try again.");
    }
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const lowStockCount = products.filter((p) => (p.stock || 0) < 10).length;
  const avgPrice =
    products.length > 0
      ? (
          products.reduce((sum, p) => sum + p.price, 0) / products.length
        ).toFixed(2)
      : "0.00";

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://via.placeholder.com/300x300?text=No+Image";
    if (imagePath.startsWith("http")) return imagePath;
    return `http://localhost:5000${imagePath}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-gray-200 mx-auto"></div>
            <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-red-500 mx-auto absolute top-0 left-1/2 transform -translate-x-1/2"></div>
          </div>
          <p className="text-gray-700 font-semibold text-lg mt-6">
            Loading Products...
          </p>
          <p className="text-gray-500 text-sm mt-2">Please wait</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="relative overflow-hidden bg-gradient-to-br from-red-600 via-red-500 to-pink-600 rounded-3xl shadow-2xl">
          <div className="absolute inset-0 bg-black opacity-5"></div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-pink-300 opacity-10 rounded-full blur-3xl"></div>

          <div className="relative p-8 md:p-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
                    <Package className="text-white" size={32} />
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white">
                    Product Management
                  </h1>
                </div>
                <p className="text-red-100 text-lg">
                  {filteredProducts.length}{" "}
                  {filteredProducts.length === 1 ? "product" : "products"} in
                  your catalog
                </p>
              </div>
              <button
                onClick={() => navigate("/admin/products/add")}
                className="group relative bg-white text-red-600 px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-all duration-300 flex items-center gap-3 shadow-xl hover:shadow-2xl"
              >
                <Plus
                  size={24}
                  className="group-hover:rotate-90 transition-transform duration-300"
                />
                <span>Add Product</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[
            {
              label: "Total Products",
              value: products.length,
              icon: Box,
              color: "blue",
              bg: "from-blue-500 to-blue-600",
            },
            {
              label: "Average Price",
              value: `$${avgPrice}`,
              icon: DollarSign,
              color: "green",
              bg: "from-green-500 to-emerald-600",
            },
            {
              label: "Low Stock Alert",
              value: lowStockCount,
              icon: AlertCircle,
              color: "yellow",
              bg: "from-yellow-500 to-orange-500",
            },
            {
              label: "Categories",
              value: categories.length,
              icon: Tag,
              color: "purple",
              bg: "from-purple-500 to-pink-600",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${stat.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              ></div>
              <div className="relative p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 group-hover:text-white transition-colors">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 group-hover:text-white transition-colors mt-2">
                      {stat.value}
                    </p>
                  </div>
                  <div
                    className={`bg-${stat.color}-100 group-hover:bg-white/20 p-3 rounded-xl transition-all`}
                  >
                    <stat.icon
                      className={`text-${stat.color}-600 group-hover:text-white transition-colors`}
                      size={24}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl shadow-xl p-6 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative group">
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors"
                size={20}
              />
              <input
                type="text"
                placeholder="Search products by name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all outline-none"
              />
            </div>

            {/* View Toggle */}
            <div className="flex gap-2 bg-gray-100 p-1.5 rounded-xl">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-3 rounded-lg transition-all ${
                  viewMode === "grid"
                    ? "bg-white text-red-500 shadow-md"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Grid3x3 size={20} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-3 rounded-lg transition-all ${
                  viewMode === "list"
                    ? "bg-white text-red-500 shadow-md"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <List size={20} />
              </button>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 px-6 py-3.5 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-all"
            >
              <Filter size={20} />
              Filters
            </button>
          </div>

          {/* Filters */}
          <div
            className={`${
              showFilters ? "block" : "hidden"
            } lg:block grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200`}
          >
            {/* Category */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">
                Category
              </label>
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none appearance-none bg-white cursor-pointer transition-all"
                >
                  <option value="all">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <ChevronLeft
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 rotate-[-90deg] text-gray-400 pointer-events-none"
                  size={20}
                />
              </div>
            </div>

            {/* Sort */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">
                Sort By
              </label>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none appearance-none bg-white cursor-pointer transition-all"
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
                <ChevronLeft
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 rotate-[-90deg] text-gray-400 pointer-events-none"
                  size={20}
                />
              </div>
            </div>

            {/* Results */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">
                Results
              </label>
              <div className="bg-gradient-to-r from-red-50 to-pink-50 px-4 py-3 rounded-xl border-2 border-red-200">
                <p className="text-sm font-semibold text-gray-700">
                  Showing{" "}
                  <span className="text-red-600">{currentProducts.length}</span>{" "}
                  of{" "}
                  <span className="text-red-600">
                    {filteredProducts.length}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid/List */}
        {currentProducts.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-xl p-16 text-center">
            <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <Box className="text-gray-400" size={48} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              No Products Found
            </h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              {searchQuery || selectedCategory !== "all"
                ? "Try adjusting your filters or search query to find what you're looking for"
                : "Start building your catalog by adding your first product"}
            </p>
            <button
              onClick={() => navigate("/admin/products/add")}
              className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-8 py-4 rounded-xl font-bold hover:scale-105 transition-all inline-flex items-center gap-3 shadow-xl"
            >
              <Plus size={20} /> Add Your First Product
            </button>
          </div>
        ) : (
          <>
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "space-y-4"
              }
            >
              {currentProducts.map((product) => {
                // Extract and process image URL
                const firstImage = Array.isArray(product.images)
                  ? product.images[0]
                  : product.images;
                const imageUrl = getImageUrl(firstImage);

                return (
                  <div
                    key={product._id}
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                  >
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden bg-gray-100">
                      <img
                        src={imageUrl}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          console.error("❌ Failed to load image:", imageUrl);
                          e.target.src =
                            "https://via.placeholder.com/300x300?text=No+Image";
                        }}
                      />

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {product.discount > 0 && (
                          <span className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-bold shadow-lg">
                            -{product.discount}%
                          </span>
                        )}
                        {(product.stock || 0) < 10 && (
                          <span className="bg-yellow-500 text-white px-3 py-1 rounded-lg text-xs font-bold shadow-lg">
                            Low Stock
                          </span>
                        )}
                      </div>

                      {/* Hover Actions */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3">
                        <button
                          onClick={() => navigate(`/product/${product._id}`)}
                          className="bg-white text-gray-800 p-3 rounded-xl hover:scale-110 transition-transform shadow-xl"
                          title="View"
                        >
                          <Eye size={20} />
                        </button>
                        <button
                          onClick={() =>
                            navigate(`/admin/products/edit/${product._id}`)
                          }
                          className="bg-blue-500 text-white p-3 rounded-xl hover:scale-110 transition-transform shadow-xl"
                          title="Edit"
                        >
                          <Edit2 size={20} />
                        </button>
                        <button
                          onClick={() => {
                            setProductToDelete(product);
                            setShowDeleteModal(true);
                          }}
                          className="bg-red-500 text-white p-3 rounded-xl hover:scale-110 transition-transform shadow-xl"
                          title="Delete"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 space-y-4">
                      <div>
                        <span className="inline-block text-xs font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full mb-2">
                          {product.category?.name || "Uncategorized"}
                        </span>
                        <h3 className="text-lg font-bold text-gray-900 line-clamp-2 mb-2">
                          {product.title}
                        </h3>
                        <p className="text-sm text-gray-500 line-clamp-2">
                          {product.description}
                        </p>
                      </div>

                      <div className="flex items-end justify-between pt-4 border-t border-gray-100">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Price</p>
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-red-600">
                              ${product.price}
                            </span>
                            {product.discount > 0 && (
                              <span className="text-sm text-gray-400 line-through">
                                $
                                {(
                                  product.price /
                                  (1 - product.discount / 100)
                                ).toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500 mb-1">Stock</p>
                          <p
                            className={`text-xl font-bold ${
                              (product.stock || 0) < 10
                                ? "text-red-500"
                                : "text-green-500"
                            }`}
                          >
                            {product.stock || 0}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <button
                          onClick={() =>
                            navigate(`/admin/products/edit/${product._id}`)
                          }
                          className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2.5 rounded-xl font-bold hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-lg"
                        >
                          <Edit2 size={16} /> Edit
                        </button>
                        <button
                          onClick={() => {
                            setProductToDelete(product);
                            setShowDeleteModal(true);
                          }}
                          className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2.5 rounded-xl font-bold hover:scale-105 transition-all shadow-lg"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            <AdminPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={paginate}
            />
          </>
        )}
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-in zoom-in duration-200">
            <div className="text-center">
              <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trash2 className="text-red-500" size={40} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Delete Product?
              </h3>
              <p className="text-gray-600 mb-2">
                Are you sure you want to delete
              </p>
              <p className="font-bold text-gray-900 mb-6">
                "{productToDelete?.title}"?
              </p>
              <p className="text-sm text-red-600 mb-8">
                This action cannot be undone.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setProductToDelete(null);
                  }}
                  className="flex-1 px-6 py-3.5 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteProduct}
                  className="flex-1 px-6 py-3.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-bold hover:scale-105 transition-all shadow-lg"
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
