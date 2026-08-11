import React from "react";
import { LayoutGrid, List, ChevronDown } from "lucide-react";

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
    <div className="flex flex-wrap items-center justify-between gap-3 bg-surface border border-border rounded-lg px-4 py-3 mb-5">
      <div>
        <p className="font-bold text-foreground text-sm leading-tight">
          Showing {typeof startIndex === "number" && total > 0 ? `${startIndex + 1} – ${Math.min(endIndex, total)}` : itemCount} of {total} results
        </p>
        <p className="text-xs text-text-muted font-medium mt-0.5">
          {hasActiveFilters ? "Filters applied" : "All products"}
        </p>
      </div>

      <div className="flex items-center gap-2.5">
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="inline-flex items-center gap-1 rounded-lg border border-danger/30 bg-danger-soft px-3 py-2 text-xs font-bold text-danger hover:bg-danger/10 transition-colors"
          >
            Clear
          </button>
        )}

        <label className="sr-only" htmlFor="product-sort">
          Sort products
        </label>
        <div className="flex items-center gap-2 rounded-lg border border-border bg-input-bg px-3 py-2">
          <span className="text-xs font-semibold text-text-muted">Sort By:</span>
          <select
            id="product-sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-transparent border-0 p-0 text-sm text-foreground font-semibold focus:border-0 focus:outline-none cursor-pointer"
          >
            <option value="featured" className="bg-surface text-foreground">Popularity</option>
            <option value="price-low" className="bg-surface text-foreground">Price — Low to High</option>
            <option value="price-high" className="bg-surface text-foreground">Price — High to Low</option>
            <option value="newest" className="bg-surface text-foreground">Newest First</option>
          </select>
          <ChevronDown size={13} className="text-text-faint flex-shrink-0" aria-hidden />
        </div>

        <div className="hidden md:flex items-center gap-1 rounded-lg border border-border bg-surface-alt p-1">
          <button
            onClick={() => setViewMode("grid")}
            aria-label="Grid view"
            aria-pressed={viewMode === "grid"}
            className={`p-2 rounded transition-colors ${
              viewMode === "grid"
                ? "bg-brand-600 text-white"
                : "text-text-muted hover:text-foreground"
            }`}
          >
            <LayoutGrid size={16} aria-hidden />
          </button>
          <button
            onClick={() => setViewMode("list")}
            aria-label="List view"
            aria-pressed={viewMode === "list"}
            className={`p-2 rounded transition-colors ${
              viewMode === "list"
                ? "bg-brand-600 text-white"
                : "text-text-muted hover:text-foreground"
            }`}
          >
            <List size={16} aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductsToolbar;
