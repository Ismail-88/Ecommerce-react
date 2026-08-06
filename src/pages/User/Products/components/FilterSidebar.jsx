import { SlidersHorizontal, Search, RotateCcw, X } from "lucide-react";

const FilterSidebar = ({
  search,
  setSearch,
  category,
  categoryNames,
  handleCategoryChange,
  brand,
  brandNames,
  handleBrandChange,
  priceRange,
  setPriceRange,
  resetFilters,
  isMobile = false,
  onClose,
  products,
}) => {
  const sectionTitle = "text-[11px] font-black uppercase tracking-widest text-text-muted mb-3";

  const counts = (products || []).reduce((acc, p) => {
    const name = p.category?.name;
    if (name) acc[name] = (acc[name] || 0) + 1;
    return acc;
  }, {});

  return (
    <div
      className={`${isMobile ? "relative" : "sticky top-20"} rounded-xl border border-border bg-surface overflow-hidden`}
    >
      {/* Header */}
      <div className="px-4 py-3.5 border-b border-border flex items-center justify-between bg-surface-alt">
        <h2 className="flex items-center gap-2 text-sm font-bold text-foreground">
          <SlidersHorizontal size={15} className="text-brand-600" aria-hidden />
          Filters
        </h2>
        {isMobile && (
          <button
            onClick={onClose}
            aria-label="Close filters"
            className="p-1.5 rounded-lg text-text-muted hover:bg-surface-hover hover:text-foreground transition-colors"
          >
            <X size={18} aria-hidden />
          </button>
        )}
      </div>

      <div className="p-4">
        {/* Search */}
        <div className="mb-5">
          <label htmlFor="filter-search" className="sr-only">
            Search products
          </label>
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-faint"
              aria-hidden
            />
            <input
              id="filter-search"
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-border bg-input-bg pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-text-faint focus:border-brand-500"
            />
          </div>
        </div>

        <div className="space-y-5">
          {/* Category */}
          <div>
            <h4 className={sectionTitle}>Category</h4>
            <div className="space-y-1">
              {categoryNames?.filter(Boolean).map((item) => {
                const active = category === item;
                return (
                  <label
                    key={item}
                    className="flex items-center justify-between gap-2 p-2 rounded-lg hover:bg-surface-hover cursor-pointer transition-colors group"
                  >
                    <span className="flex items-center gap-2.5 min-w-0">
                      <input
                        type="checkbox"
                        checked={active}
                        value={item}
                        onChange={handleCategoryChange}
                        className="sr-only"
                      />
                      <span
                        className={`flex items-center justify-center w-4 h-4 rounded border transition-all flex-shrink-0 ${
                          active
                            ? "border-brand-600 bg-brand-600 text-white"
                            : "border-border-strong group-hover:border-brand-400"
                        }`}
                        aria-hidden
                      >
                        {active && (
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                        )}
                      </span>
                      <span className="text-sm font-medium text-foreground truncate">{item}</span>
                    </span>
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${
                        active ? "bg-brand-600 text-white" : "bg-surface-alt text-text-muted"
                      }`}
                    >
                      {counts[item] || 0}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Brand */}
          <div>
            <h4 className={sectionTitle}>Brand</h4>
            <select
              value={brand}
              onChange={handleBrandChange}
              className="w-full rounded-lg border border-border bg-input-bg px-3 py-2.5 text-sm text-foreground focus:border-brand-500 appearance-none"
            >
              {brandNames?.filter(Boolean).map((item) => (
                <option key={item} value={item} className="bg-surface text-foreground">
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div>
            <h4 className={sectionTitle}>Price Range</h4>
            <div className="rounded-lg border border-border bg-surface-alt p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-foreground">₹{priceRange[0]}</span>
                <span className="text-text-faint">—</span>
                <span className="font-bold text-brand-600 dark:text-brand-400">₹{priceRange[1]}</span>
              </div>
              <label htmlFor="price-range" className="sr-only">
                Max price
              </label>
              <input
                id="price-range"
                type="range"
                min="0"
                max="5000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="w-full h-2 bg-border-strong rounded-full appearance-none cursor-pointer accent-brand-600"
              />
              <div className="flex justify-between text-[10px] font-semibold text-text-faint mt-1.5">
                <span>₹0</span>
                <span>₹5,000</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reset */}
        <button
          onClick={() => {
            resetFilters();
            if (isMobile && onClose) onClose();
          }}
          className="w-full mt-5 inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-700 transition-colors"
        >
          <RotateCcw size={15} aria-hidden />
          Reset All Filters
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;
