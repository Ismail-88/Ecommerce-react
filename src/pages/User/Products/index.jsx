
import { useState } from "react";
import Loading from './../../../assets/Loading4.webm';
import { useProductsFilter } from "./hooks/useProductsFilter";
import ProductsHeroBanner from "./components/ProductsHeroBanner";
import MobileFilterToggle from "./components/MobileFilterToggle";
import FilterSidebar from "./components/FilterSidebar";
import ProductsToolbar from "./components/ProductsToolbar";
import ProductsGrid from "./components/ProductsGrid";
import ProductsPagination from "./components/ProductsPagination";
import EmptyProductsState from "./components/EmptyProductsState";

// Components


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
    resetFilters
  } = useProductsFilter();

  const [openFilter, setOpenFilter] = useState(false);
  const [viewMode, setViewMode] = useState("grid");

  // Loading state
  if (!data || data.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <video muted autoPlay loop className="w-40 h-40">
          <source src={Loading} type="video/webm" />
        </video>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Banner */}
      {/* <ProductsHeroBanner /> */}

      <div className=" px-4 md:px-6 py-12">
        {/* Mobile Filter Toggle */}
        <MobileFilterToggle 
          openFilter={openFilter}
          setOpenFilter={setOpenFilter}
          itemCount={filteredProducts?.length || 0}
        />

        {/* Mobile Filter Panel */}
        {openFilter && (
          <div className="md:hidden mb-6">
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
            />
          </div>
        )}

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden md:block flex-shrink-0">
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
            />
          </div>

          {/* Products Section */}
          <div className="flex-1">
            {/* Toolbar */}
            <ProductsToolbar
              itemCount={filteredProducts?.length || 0}
              sortBy={sortBy}
              setSortBy={setSortBy}
              viewMode={viewMode}
              setViewMode={setViewMode}
            />

            {/* Products Grid or Empty State */}
            {filteredProducts && filteredProducts.length > 0 ? (
              <>
                <ProductsGrid
                  products={paginatedProducts}
                  viewMode={viewMode}
                />

                {/* Pagination */}
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
  );
};

export default Products;