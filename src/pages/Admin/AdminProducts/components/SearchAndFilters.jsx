// components/Admin/SearchAndFilters.jsx
import React from 'react';
import { ChevronDown, Filter, Grid3x3, List, Search } from 'lucide-react';
import { useTheme } from '../../../../context/ThemeContext';

const SearchAndFilters = ({
  searchQuery,
  setSearchQuery,
  setShowFilters,
  viewMode,
  setViewMode,
  showFilters,
  selectedCategory,
  setSelectedCategory,
  categories,
  sortBy,
  setSortBy,
  currentProductsCount,
  filteredProductsCount
}) => {
  const { isDark } = useTheme();

  return (
    <div className={`rounded-3xl shadow-xl p-6 space-y-4 transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 backdrop-blur-3xl' 
        : 'bg-white'
    }`}>
      {isDark && (
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5 pointer-events-none"></div>
      )}
      
      <div className="relative">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative group">
            <Search
              className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors ${
                isDark 
                  ? 'text-gray-500 group-focus-within:text-cyan-400' 
                  : 'text-gray-400 group-focus-within:text-red-500'
              }`}
              size={20}
            />
            <input
              type="text"
              placeholder="Search products by name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-12 pr-4 py-3.5 rounded-xl transition-all outline-none ${
                isDark 
                  ? 'border border-white/10 bg-white/5 backdrop-blur-xl text-white placeholder-gray-500 focus:border-cyan-500/50' 
                  : 'border-2 border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-red-500'
              }`}
            />
          </div>

          {/* View Toggle */}
          <div className={`flex gap-2 p-1.5 rounded-xl ${
            isDark ? 'bg-white/5 border border-white/10' : 'bg-gray-100'
          }`}>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-3 rounded-lg transition-all ${
                viewMode === "grid"
                  ? isDark 
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg' 
                    : 'bg-white text-red-500 shadow-md'
                  : isDark 
                    ? 'text-gray-400 hover:text-white' 
                    : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Grid3x3 size={20} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-3 rounded-lg transition-all ${
                viewMode === "list"
                  ? isDark 
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg' 
                    : 'bg-white text-red-500 shadow-md'
                  : isDark 
                    ? 'text-gray-400 hover:text-white' 
                    : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <List size={20} />
            </button>
          </div>

          {/* Filter Toggle - Mobile */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`lg:hidden flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold transition-all ${
              isDark 
                ? 'bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white hover:opacity-90' 
                : 'bg-gray-900 text-white hover:bg-gray-800'
            }`}
          >
            <Filter size={20} />
            Filters
          </button>
        </div>

        {/* Filters */}
        <div
          className={`${
            showFilters ? "block" : "hidden"
          } lg:block grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t ${
            isDark ? 'border-white/10' : 'border-gray-200'
          }`}
        >
          {/* Category */}
          <div className="space-y-2">
            <label className={`block text-sm font-bold ${
              isDark ? 'text-gray-400 uppercase tracking-wider' : 'text-gray-700'
            }`}>
              Category
            </label>
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl outline-none appearance-none cursor-pointer transition-all ${
                  isDark 
                    ? 'border border-white/10 bg-gray-800 backdrop-blur-xl text-white focus:border-cyan-500/50' 
                    : 'border-2 border-gray-200 bg-white focus:ring-2 focus:ring-red-500 focus:border-red-500'
                }`}
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <ChevronDown
                className={`absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none ${
                  isDark ? 'text-gray-400' : 'text-gray-400'
                }`}
                size={20}
              />
            </div>
          </div>

          {/* Sort */}
          <div className="space-y-2">
            <label className={`block text-sm font-bold ${
              isDark ? 'text-gray-400 uppercase tracking-wider' : 'text-gray-700'
            }`}>
              Sort By
            </label>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl  outline-none appearance-none cursor-pointer transition-all ${
                  isDark 
                    ? 'border border-white/10 bg-gray-800 backdrop-blur-xl text-white focus:border-cyan-500/50' 
                    : 'border-2 border-gray-200 bg-white focus:ring-2 focus:ring-red-500 focus:border-red-500'
                }`}
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
              <ChevronDown
                className={`absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none ${
                  isDark ? 'text-gray-400' : 'text-gray-400'
                }`}
                size={20}
              />
            </div>
          </div>

          {/* Results */}
          <div className="space-y-2">
            <label className={`block text-sm font-bold ${
              isDark ? 'text-gray-400 uppercase tracking-wider' : 'text-gray-700'
            }`}>
              Results
            </label>
            <div className={`px-4 py-3 rounded-xl border ${
              isDark 
                ? 'bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-cyan-500/30' 
                : 'bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200'
            }`}>
              <p className={`text-sm font-semibold ${
                isDark ? 'text-white' : 'text-gray-700'
              }`}>
                Showing
                <span className={isDark ? 'text-cyan-400' : 'text-red-600'}>
                  {currentProductsCount}
                </span> 
                 of

                <span className={isDark ? 'text-cyan-400' : 'text-red-600'}>
                  {filteredProductsCount}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilters;