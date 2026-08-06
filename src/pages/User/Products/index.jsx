import { useState } from "react";
import { useProductsFilter } from "./hooks/useProductsFilter";
import MobileFilterToggle from "./components/MobileFilterToggle";
import FilterSidebar from "./components/FilterSidebar";
import ProductsToolbar from "./components/ProductsToolbar";
import ProductsGrid from "./components/ProductsGrid";
import ProductsPagination from "./components/ProductsPagination";
import CategoryPills from "./components/CategoryPills";
import ProductsSkeleton from "./components/ProductsSkeleton";
import EmptyProductsState from "./components/EmptyProductsState";
import BreadCrumbs from "../../../components/BreadCrumbs";

const ITEMS_PER_PAGE = 8;
const MAX_PRICE = 5000;

const Products = () => {
  const {
    data,
    categoryNames,
    brandNames,
    filteredProducts,
    paginatedProducts,
    search,
    category,
    brand,
    priceRange,
    page,
    sortBy,
    totalPages,
    setSearch,
    setPriceRange,
    setSortBy,
    handleCategoryChange,
    handleBrandChange,
    handlePageChange,
    resetFilters,
  } = useProductsFilter();

  const [openFilter, setOpenFilter] = useState(false);
  const [viewMode, setViewMode] = useState("grid");

  const loading = !data || data.length === 0;

  const hasActiveFilters =
    search.trim() !== "" || category !== "All" || brand !== "All" || priceRange[1] !== MAX_PRICE;

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + (paginatedProducts?.length || 0);

  const selectCategoryPill = (value) => {
    handleCategoryChange({ target: { value } });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen text-foreground">
      <BreadCrumbs title="All Products" parent="Shop" parentPath="/products" />

      <div className="px-4 md:px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Page header */}
          <div className="flex items-center justify-between flex-wrap gap-3 mb-5 pt-2">
            <div>
              <h1 className="text-xl md:text-2xl font-extrabold text-foreground tracking-tight">
                All Products
              </h1>
              <p className="text-xs text-text-muted mt-0.5">
                {data?.length || 0} products · {categoryNames?.filter(Boolean).length || 0} categories
              </p>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-success-soft px-3 py-1 text-xs font-bold text-success">
              Free Shipping Over ₹499
            </span>
          </div>

          {/* Mobile Filter Toggle */}
          <MobileFilterToggle
            openFilter={openFilter}
            setOpenFilter={setOpenFilter}
            itemCount={filteredProducts?.length || 0}
          />

          {/* Mobile Filter Panel */}
          {openFilter && (
            <div className="md:hidden mb-6 animate-slide-down">
              <FilterSidebar
                search={search}
                setSearch={setSearch}
                category={category}
                categoryNames={categoryNames}
                handleCategoryChange={handleCategoryChange}
                brand={brand}
                brandNames={brandNames}
                handleBrandChange={handleBrandChange}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                resetFilters={resetFilters}
                isMobile={true}
                onClose={() => setOpenFilter(false)}
                products={data || []}
              />
            </div>
          )}

          <div className="flex gap-8">
            {/* Desktop Sidebar */}
            <div className="hidden md:block flex-shrink-0 w-64">
              <FilterSidebar
                search={search}
                setSearch={setSearch}
                category={category}
                categoryNames={categoryNames}
                handleCategoryChange={handleCategoryChange}
                brand={brand}
                brandNames={brandNames}
                handleBrandChange={handleBrandChange}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                resetFilters={resetFilters}
                isMobile={false}
                products={data || []}
              />
            </div>

            {/* Products Section */}
            <div className="flex-1 min-w-0">
              <CategoryPills
                categories={categoryNames}
                activeCategory={category}
                onSelect={selectCategoryPill}
              />

              <ProductsToolbar
                itemCount={filteredProducts?.length || 0}
                sortBy={sortBy}
                setSortBy={setSortBy}
                viewMode={viewMode}
                setViewMode={setViewMode}
                hasActiveFilters={hasActiveFilters}
                onClearFilters={resetFilters}
                startIndex={loading ? 0 : startIndex}
                endIndex={loading ? 0 : endIndex}
                total={filteredProducts?.length || 0}
              />

              {loading ? (
                <ProductsSkeleton />
              ) : filteredProducts && filteredProducts.length > 0 ? (
                <>
                  <ProductsGrid products={paginatedProducts} viewMode={viewMode} />
                  <ProductsPagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </>
              ) : (
                <EmptyProductsState onReset={resetFilters} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
