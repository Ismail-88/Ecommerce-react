import React, { useEffect, useState } from "react";
import { getData } from "../../context/DataContext";
import { useCart } from "../../context/CartContext";
import { FaFilter } from "react-icons/fa";
import Loading from "./../../assets/Loading4.webm";
import FilterSection from "../../components/FilterSection";
import ProductToolbar from "../../components/ProductToolbar";
// import MobileFilterPanel from "../../components/MobileFilterPanel";
import ProductCard from "../../components/ProductCard";
import Pagination from "../../components/Pagination";
// import EmptyState from "../../components/EmptyState";

const Products = () => {
  const { data, fetchAllProducts, categoryNames, brandNames, getProductImageUrl } = getData();
  const { addToCart, cartItem } = useCart();
  
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [page, setPage] = useState(1);
  const [openFilter, setOpenFilter] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("featured");

  // Filter data
  let filterData = data?.filter((item) => {
    return (
      item.title.toLowerCase().includes(search.toLowerCase()) &&
      (category === 'All' || item.category.name === category) &&
      (brand === 'All' || item.brand.toLowerCase() === brand.toLowerCase()) &&
      item.price >= priceRange[0] && item.price <= priceRange[1]
    );
  });

  // Sorting
  if (sortBy === "price-low") {
    filterData = [...filterData].sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high") {
    filterData = [...filterData].sort((a, b) => b.price - a.price);
  } else if (sortBy === "newest") {
    filterData = [...filterData].reverse();
  }

  const itemsPerPage = 8;
  const totalPages = Math.ceil(filterData?.length / itemsPerPage);

  const pageHandler = (selectedPage) => {
    setPage(selectedPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetFilters = () => {
    setSearch("");
    setBrand("All");
    setCategory("All");
    setPriceRange([0, 5000]);
    setPage(1);
  };

  const isInCart = (productId) => {
    return cartItem?.some(item => item._id === productId);
  };

  useEffect(() => {
    fetchAllProducts();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mobile Filter Toggle Button */}
        <div className="md:hidden mb-6">
          <button
            onClick={() => setOpenFilter(true)}
            className="w-full bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-all active:scale-98"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-50 rounded-lg">
                <FaFilter className="text-red-500" size={18} />
              </div>
              <span className="font-bold text-base">Filters & Sort</span>
            </div>
            <span className="px-3 py-1.5 bg-red-50 text-red-600 rounded-full text-sm font-bold">
              {filterData?.length}
            </span>
          </button>
        </div>

        {/* Mobile Filter Panel */}
        {/* <MobileFilterPanel
          isOpen={openFilter}
          onClose={() => setOpenFilter(false)}
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          brand={brand}
          setBrand={setBrand}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          categoryNames={categoryNames}
          brandNames={brandNames}
          onReset={resetFilters}
          setPage={setPage}
        /> */}

        {data?.length > 0 ? (
          <div className="flex gap-8">
            {/* Desktop Sidebar */}
            <aside className="hidden md:block w-72 flex-shrink-0">
              <FilterSection
                search={search}
                setSearch={setSearch}
                category={category}
                setCategory={setCategory}
                brand={brand}
                setBrand={setBrand}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                categoryNames={categoryNames}
                brandNames={brandNames}
                onReset={resetFilters}
                setPage={setPage}
              />
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-w-0">
              {/* Toolbar */}
              <ProductToolbar
                totalProducts={filterData?.length || 0}
                sortBy={sortBy}
                setSortBy={setSortBy}
                viewMode={viewMode}
                setViewMode={setViewMode}
              />

              {/* Products Grid/List */}
              {filterData?.length > 0 ? (
                <>
                  <div className={
                    viewMode === "grid" 
                      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
                      : "flex flex-col gap-4"
                  }>
                    {filterData?.slice(page * itemsPerPage - itemsPerPage, page * itemsPerPage).map((product) => (
                      <ProductCard
                        key={product._id}
                        product={product}
                        viewMode={viewMode}
                        addToCart={addToCart}
                        isInCart={isInCart(product._id)}
                        getProductImageUrl={getProductImageUrl}
                      />
                    ))}
                  </div>

                  {/* Pagination */}
                  <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={pageHandler}
                  />
                </>
              ) : (
                <EmptyState onReset={resetFilters} />
              )}
            </main>
          </div>
        ) : (
          <div className="flex items-center justify-center h-96">
            <video muted autoPlay loop className="w-40 h-40">
              <source src={Loading} type="video/webm" />
            </video>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;