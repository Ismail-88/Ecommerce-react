import { useState } from "react";
import { useProductsFilter } from "./hooks/useProductsFilter";
import MobileFilterToggle from "./components/MobileFilterToggle";
import FilterSidebar from "./components/FilterSidebar";
import ProductsToolbar from "./components/ProductsToolbar";
import ProductsGrid from "./components/ProductsGrid";
import ProductsPagination from "./components/ProductsPagination";
import ProductsHeroBanner from "./components/ProductsHeroBanner";
import CategoryPills from "./components/CategoryPills";
import CategoryShowcase from "./components/CategoryShowcase";
import TrendingStrip from "./components/TrendingStrip";
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

  const trending = (data || []).slice(0, 10);
  const categoryCount = (categoryNames || []).filter(Boolean).length;

  const selectCategoryPill = (value) => {
    handleCategoryChange({ target: { value } });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <BreadCrumbs title="All Products" parent="Shop" parentPath="/products" />

      <div className="px-4 md:px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Hero */}
          <ProductsHeroBanner itemCount={data?.length || 0} categoryCount={categoryCount} />

          {/* Trending carousel */}
          <TrendingStrip products={trending} />

          {/* Category showcase tiles */}
          <CategoryShowcase
            products={data || []}
            categories={categoryNames}
            onSelect={selectCategoryPill}
            activeCategory={category}
          />

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
            <div className="hidden md:block flex-shrink-0 w-72">
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
