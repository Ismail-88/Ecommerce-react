import React, { useEffect, useState } from "react";
import { getData } from "../../context/DataContext";
import { IoCartOutline, IoCloseOutline, IoGridOutline, IoListOutline, IoHeartOutline, IoHeart } from "react-icons/io5";
import { FaFilter, FaStar } from "react-icons/fa";
import Loading from "./../../assets/Loading4.webm";
import ProductCard from "../../components/ProductCard";

const Products = () => {
  const { data, fetchAllProducts, categoryNames, brandNames } = getData();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [page, setPage] = useState(1);
  const [openFilter, setOpenFilter] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("featured");

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setPage(1);
    setOpenFilter(false);
  };

  const handleBrandChange = (e) => {
    setBrand(e.target.value);
    setPage(1);
    setOpenFilter(false);
  };

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

  const dynamicPage = Math.ceil(filterData?.length / 8);

  const pageHandler = (selectedPage) => {
    setPage(selectedPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    fetchAllProducts();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className=" min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>

      <div className="max-w-[85%] mx-auto px-4 py-8">
        {/* Hero Header */}
        {/* <div className="mb-8 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2 bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
            Discover Amazing Products
          </h1>
          <p className="text-gray-600 text-lg">Explore our curated collection of premium quality items</p>
        </div> */}

        {/* Mobile Filter Toggle */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setOpenFilter(!openFilter)}
            className="w-full bg-white border-2 border-gray-200 rounded-xl p-4 flex items-center justify-between shadow-md hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-3">
              <FaFilter className="text-red-500" size={20} />
              <span className="font-bold text-lg">Filters & Sort</span>
            </div>
            <span className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-sm font-bold">
              {filterData?.length} items
            </span>
          </button>
        </div>

        {/* Mobile Filter Panel */}
        {openFilter && (
          <div className="md:hidden mb-6 bg-white rounded-xl shadow-2xl overflow-hidden border-2 border-gray-200 animate-fadeIn">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-xl text-gray-800">Filters</h3>
                <button 
                  onClick={() => setOpenFilter(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <IoCloseOutline size={28} className="text-gray-600" />
                </button>
              </div>

              <input
                type="text"
                placeholder="🔍 Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full p-4 border-2 border-gray-300 rounded-xl mb-4 focus:border-red-500 focus:outline-none transition-all"
              />

              <div className="mb-5">
                <h4 className="font-bold mb-3 text-gray-700 text-lg">Category</h4>
                <div className="space-y-2">
                  {categoryNames?.map((item, index) => (
                    <label key={index} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                      <input
                        type="checkbox"
                        checked={category === item}
                        value={item}
                        onChange={handleCategoryChange}
                        className="w-5 h-5 text-red-500 accent-red-500"
                      />
                      <span className="font-medium">{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-5">
                <h4 className="font-bold mb-3 text-gray-700 text-lg">Brand</h4>
                <select
                  value={brand}
                  onChange={handleBrandChange}
                  className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-red-500 focus:outline-none transition-all font-medium"
                >
                  {brandNames?.map((item, index) => (
                    <option key={index} value={item}>{item}</option>
                  ))}
                </select>
              </div>

              <div className="mb-5">
                <h4 className="font-bold mb-3 text-gray-700 text-lg">Price Range</h4>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-center text-xl font-bold text-gray-800 mb-3">
                    ${priceRange[0]} - ${priceRange[1]}
                  </p>
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-red-500"
                  />
                </div>
              </div>

              <button
                onClick={() => {
                  setSearch("");
                  setBrand("All");
                  setCategory("All");
                  setPriceRange([0, 5000]);
                  setOpenFilter(false);
                }}
                className="w-full bg-red-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-red-600 transition-colors shadow-lg"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        )}

        {data?.length > 0 ? (
          <div className="flex gap-6">
            {/* Desktop Sidebar */}
            <div className="hidden md:block w-72 flex-shrink-0">
              <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-4 border border-gray-200">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                  <FaFilter className="text-red-500" />
                  Filters
                </h2>

                <input
                  type="text"
                  placeholder="🔍 Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full p-4 border-2 border-gray-300 rounded-xl mb-6 focus:border-red-500 focus:outline-none transition-all"
                />

                <div className="mb-6">
                  <h3 className="font-bold mb-4 text-gray-700 text-lg">Category</h3>
                  <div className="space-y-2">
                    {categoryNames?.map((item, index) => (
                      <label key={index} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                        <input
                          type="checkbox"
                          checked={category === item}
                          value={item}
                          onChange={handleCategoryChange}
                          className="w-5 h-5 text-red-500 accent-red-500"
                        />
                        <span className="font-medium">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-bold mb-4 text-gray-700 text-lg">Brand</h3>
                  <select
                    value={brand}
                    onChange={handleBrandChange}
                    className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-red-500 focus:outline-none transition-all font-medium"
                  >
                    {brandNames?.map((item, index) => (
                      <option key={index} value={item}>{item}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-6">
                  <h3 className="font-bold mb-4 text-gray-700 text-lg">Price Range</h3>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-center text-xl font-bold text-gray-800 mb-3">
                      ${priceRange[0]} - ${priceRange[1]}
                    </p>
                    <input
                      type="range"
                      min="0"
                      max="5000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-red-500"
                    />
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSearch("");
                    setBrand("All");
                    setCategory("All");
                    setPriceRange([0, 5000]);
                  }}
                  className="w-full bg-red-500 text-white py-4 rounded-xl font-bold hover:bg-red-600 transition-colors shadow-lg"
                >
                  Reset All Filters
                </button>
              </div>
            </div>

            {/* Products Section */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 mb-6 border border-gray-200">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className="text-gray-800 font-bold text-lg">
                      {filterData?.length} <span className="text-gray-500 font-normal">Products</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="p-3 border-2 border-gray-300 rounded-xl focus:border-red-500 focus:outline-none font-medium"
                    >
                      <option value="featured">Featured</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="newest">Newest First</option>
                    </select>

                    <div className="hidden md:flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
                      <button
                        onClick={() => setViewMode("grid")}
                        className={`p-3 rounded-lg transition-all ${
                          viewMode === "grid" ? "bg-white shadow-md text-red-500" : "text-gray-500"
                        }`}
                      >
                        <IoGridOutline size={22} />
                      </button>
                      <button
                        onClick={() => setViewMode("list")}
                        className={`p-3 rounded-lg transition-all ${
                          viewMode === "list" ? "bg-white shadow-md text-red-500" : "text-gray-500"
                        }`}
                      >
                        <IoListOutline size={22} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Products Grid/List */}
              {filterData?.length > 0 ? (
                <>
                  <div className={viewMode === "grid" 
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    : "flex flex-col gap-4"
                  }>
                    {filterData?.slice(page * 8 - 8, page * 8).map((product, index) => (
                      <ProductCard
                        key={product._id}
                        product={product}
                        viewMode={viewMode}
                      />
                    ))}
                  </div>

                  {/* Pagination */}
                  {dynamicPage > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-10">
                      <button
                        onClick={() => pageHandler(page - 1)}
                        disabled={page === 1}
                        className="px-6 py-3 border-2 border-gray-300 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-all"
                      >
                        Previous
                      </button>
                      {[...Array(dynamicPage)].map((_, i) => (
                        <button
                          key={i}
                          onClick={() => pageHandler(i + 1)}
                          className={`w-12 h-12 rounded-xl font-bold transition-all ${
                            page === i + 1
                              ? "bg-red-500 text-white shadow-lg scale-110"
                              : "border-2 border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                      <button
                        onClick={() => pageHandler(page + 1)}
                        disabled={page === dynamicPage}
                        className="px-6 py-3 border-2 border-gray-300 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-all"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow-lg">
                  <div className="text-8xl mb-6">🔍</div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-3">No Products Found</h3>
                  <p className="text-gray-600 mb-8 text-lg">Try adjusting your filters or search terms</p>
                  <button
                    onClick={() => {
                      setSearch("");
                      setBrand("All");
                      setCategory("All");
                      setPriceRange([0, 5000]);
                    }}
                    className="bg-red-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-red-600 transition-colors shadow-lg"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-[500px]">
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