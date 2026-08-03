import React from "react";
import { LayoutGrid, List, FilterX } from "lucide-react";

const ProductsToolbar = ({
  itemCount,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  hasActiveFilters,
  onClearFilters,
  startIndex,
  endIndex,
  total,
}) => {
  return (
    <div className="rounded-2xl border border-border bg-surface/90 backdrop-blur-xl shadow-card p-4 mb-6 sticky top-24 z-30">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-black text-foreground text-lg leading-tight">
            {itemCount} {itemCount === 1 ? "Product" : "Products"}
          </p>
          {typeof startIndex === "number" && total > 0 && (
            <p className="text-xs text-text-muted font-medium">
              Showing {startIndex + 1}–{Math.min(endIndex, total)} of {total}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2.5">
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="inline-flex items-center gap-1.5 rounded-xl border border-danger/30 bg-danger-soft px-3.5 py-2 text-xs font-bold text-danger hover:bg-danger/10 transition-colors"
            >
              <FilterX size={14} aria-hidden />
              Clear
            </button>
          )}

          <label className="sr-only" htmlFor="product-sort">
            Sort products
          </label>
          <select
            id="product-sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-xl border border-border bg-input-bg px-3 py-2 text-sm text-foreground focus:border-brand-500 font-semibold"
          >
            <option value="featured" className="bg-surface text-foreground">✨ Featured</option>
            <option value="price-low" className="bg-surface text-foreground">Price: Low to High</option>
            <option value="price-high" className="bg-surface text-foreground">Price: High to Low</option>
            <option value="newest" className="bg-surface text-foreground">Newest First</option>
          </select>

          <div className="hidden md:flex items-center gap-1 rounded-xl border border-border bg-surface-alt p-1">
            <button
              onClick={() => setViewMode("grid")}
              aria-label="Grid view"
              aria-pressed={viewMode === "grid"}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "grid"
                  ? "bg-brand-600 text-white shadow-sm shadow-brand-600/20"
                  : "text-text-muted hover:text-foreground"
              }`}
            >
              <LayoutGrid size={16} aria-hidden />
            </button>
            <button
              onClick={() => setViewMode("list")}
              aria-label="List view"
              aria-pressed={viewMode === "list"}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "list"
                  ? "bg-brand-600 text-white shadow-sm shadow-brand-600/20"
                  : "text-text-muted hover:text-foreground"
              }`}
            >
              <List size={16} aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsToolbar;
