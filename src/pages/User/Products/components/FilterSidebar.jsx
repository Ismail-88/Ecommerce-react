import { Search, RotateCcw, X, ChevronDown } from "lucide-react";
import { useState } from "react";

const sectionTitle = "text-[12px] font-bold text-text-secondary uppercase tracking-wide mb-3";

const PRICE_BUCKETS = [
  { label: "Under ₹500", max: 500 },
  { label: "₹500 – ₹1,000", max: 1000 },
  { label: "₹1,000 – ₹3,000", max: 3000 },
  { label: "₹3,000 – ₹5,000", max: 5000 },
];

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
  const [collapsed, setCollapsed] = useState({ category: false, brand: false, price: false });
  const counts = (products || []).reduce((acc, p) => {
    const name = p.category?.name;
    if (name) acc[name] = (acc[name] || 0) + 1;
    return acc;
  }, {});

  const toggle = (key) => setCollapsed((c) => ({ ...c, [key]: !c[key] }));

  const Section = ({ title, openKey, children }) => (
    <div className="border-b border-border last:border-b-0">
      <button
        type="button"
        onClick={() => toggle(openKey)}
        aria-expanded={!collapsed[openKey]}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-surface-hover transition-colors"
      >
        <span className={sectionTitle}>{title}</span>
        <ChevronDown
          size={14}
          className={`text-text-faint transition-transform ${collapsed[openKey] ? "-rotate-90" : ""}`}
          aria-hidden
        />
      </button>
      {!collapsed[openKey] && <div className="px-4 pb-4">{children}</div>}
    </div>
  );

  const checkClass = (active) =>
    `flex items-center justify-center w-4 h-4 rounded border transition-all flex-shrink-0 ${
      active ? "border-brand-600 bg-brand-600 text-white" : "border-border-strong group-hover:border-brand-400"
    }`;

  const checkMark = (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );

  return (
    <div className={`${isMobile ? "relative" : "sticky top-24"} bg-surface border border-border rounded-lg overflow-hidden shadow-card`}>
      {/* Header */}
      <div className="px-4 py-3 border-b border-border flex items-center justify-between">
        <h2 className="text-sm font-bold text-foreground">Filters</h2>
        <div className="flex items-center gap-1.5">
          <button
            onClick={resetFilters}
            className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
          >
            <RotateCcw size={12} aria-hidden />
            Clear all
          </button>
          {isMobile && (
            <button
              onClick={onClose}
              aria-label="Close filters"
              className="p-1.5 rounded-lg text-text-muted hover:bg-surface-hover hover:text-foreground transition-colors"
            >
              <X size={16} aria-hidden />
            </button>
          )}
        </div>
      </div>

      {/* Search */}
      <div className="px-4 py-3 border-b border-border">
        <label htmlFor="filter-search" className="sr-only">
          Search products
        </label>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-faint" aria-hidden />
          <input
            id="filter-search"
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-border bg-input-bg pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-text-faint focus:border-brand-500"
          />
        </div>
      </div>

      {/* Category */}
      <Section title="Category" openKey="category">
        <div className="space-y-1">
          {categoryNames?.filter(Boolean).map((item) => {
            const active = category === item;
            return (
              <label
                key={item}
                className="flex items-center justify-between gap-2 p-1.5 rounded hover:bg-surface-hover cursor-pointer transition-colors group"
              >
                <span className="flex items-center gap-2.5 min-w-0">
                  <input
                    type="checkbox"
                    checked={active}
                    value={item}
                    onChange={handleCategoryChange}
                    className="sr-only"
                  />
                  <span className={checkClass(active)} aria-hidden>{active && checkMark}</span>
                  <span className={`text-sm truncate ${active ? "font-semibold text-brand-600 dark:text-brand-400" : "font-normal text-foreground"}`}>
                    {item}
                  </span>
                </span>
                <span className="text-[11px] text-text-faint flex-shrink-0">({counts[item] || 0})</span>
              </label>
            );
          })}
        </div>
      </Section>

      {/* Brand */}
      <Section title="Brand" openKey="brand">
        <div className="space-y-1">
          {["All", ...(brandNames?.filter(Boolean) || [])].map((item) => {
            const active = brand === item;
            return (
              <label
                key={item}
                className="flex items-center gap-2.5 p-1.5 rounded hover:bg-surface-hover cursor-pointer transition-colors group"
              >
                <input
                  type="checkbox"
                  checked={active}
                  value={item}
                  onChange={() => handleBrandChange({ target: { value: item } })}
                  className="sr-only"
                />
                <span className={checkClass(active)} aria-hidden>{active && checkMark}</span>
                <span className={`text-sm truncate ${active ? "font-semibold text-brand-600 dark:text-brand-400" : "font-normal text-foreground"}`}>
                  {item}
                </span>
              </label>
            );
          })}
        </div>
      </Section>

      {/* Price */}
      <Section title="Price" openKey="price">
        <div className="space-y-1">
          {PRICE_BUCKETS.map((bucket) => {
            const active = priceRange[1] === bucket.max;
            return (
              <label
                key={bucket.max}
                className="flex items-center gap-2.5 p-1.5 rounded hover:bg-surface-hover cursor-pointer transition-colors group"
              >
                <input
                  type="checkbox"
                  checked={active}
                  onChange={() => setPriceRange([0, bucket.max])}
                  className="sr-only"
                />
                <span className={checkClass(active)} aria-hidden>{active && checkMark}</span>
                <span className={`text-sm ${active ? "font-semibold text-brand-600 dark:text-brand-400" : "text-foreground"}`}>
                  {bucket.label}
                </span>
              </label>
            );
          })}
        </div>
      </Section>
    </div>
  );
};

export default FilterSidebar;
