// components/Admin/SearchAndFilters.jsx
import React from 'react';
import { ChevronDown, Filter, Grid3x3, List, Search } from 'lucide-react';

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
  const selectClass =
    "w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-all appearance-none cursor-pointer";

  return (
    <div className="rounded-2xl border border-border bg-surface shadow-card p-5 space-y-4">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative group">
          <Search
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-faint group-focus-within:text-brand-500 transition-colors"
            size={20}
            aria-hidden
          />
          <input
            type="text"
            placeholder="Search products by name or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-border bg-background text-foreground placeholder:text-text-faint focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-all"
          />
        </div>

        {/* View Toggle */}
        <div className="flex gap-2 p-1.5 rounded-xl bg-surface-alt border border-border">
          <button
            onClick={() => setViewMode("grid")}
            aria-pressed={viewMode === "grid"}
            className={`p-2.5 rounded-lg transition-all ${
              viewMode === "grid"
                ? 'bg-brand-600 text-white shadow-card'
                : 'text-text-muted hover:text-foreground'
            }`}
          >
            <Grid3x3 size={20} aria-hidden />
          </button>
          <button
            onClick={() => setViewMode("list")}
            aria-pressed={viewMode === "list"}
            className={`p-2.5 rounded-lg transition-all ${
              viewMode === "list"
                ? 'bg-brand-600 text-white shadow-card'
                : 'text-text-muted hover:text-foreground'
            }`}
          >
            <List size={20} aria-hidden />
          </button>
        </div>

        {/* Filter Toggle - Mobile */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold transition-all bg-brand-600 text-white hover:bg-brand-700"
        >
          <Filter size={20} aria-hidden />
          Filters
        </button>
      </div>

      {/* Filters */}
      <div
        className={`${
          showFilters ? "block" : "hidden"
        } lg:block grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border`}
      >
        {/* Category */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-text-muted uppercase tracking-wider">
            Category
          </label>
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={selectClass}
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
            <ChevronDown
              className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-text-muted"
              size={20}
              aria-hidden
            />
          </div>
        </div>

        {/* Sort */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-text-muted uppercase tracking-wider">
            Sort By
          </label>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={selectClass}
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
              className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-text-muted"
              size={20}
              aria-hidden
            />
          </div>
        </div>

        {/* Results */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-text-muted uppercase tracking-wider">
            Results
          </label>
          <div className="px-4 py-3 rounded-xl border border-border bg-brand-soft">
            <p className="text-sm font-semibold text-foreground">
              Showing{" "}
              <span className="text-brand-600 dark:text-brand-400">{currentProductsCount}</span>{" "}
              of{" "}
              <span className="text-brand-600 dark:text-brand-400">{filteredProductsCount}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilters;
