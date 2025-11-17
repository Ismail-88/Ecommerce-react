import React, { useEffect, useState } from "react";
import { getData } from "../../context/DataContext";
import { IoGridOutline, IoListOutline, IoSearchOutline } from "react-icons/io5";
import { SlidersHorizontal, Sparkles, Crown, TrendingUp } from "lucide-react";
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
    <div className="min-h-screen bg-black text-white ">
      {/* Premium Hero Banner */}
      <div className="relative py-20 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[150px]"></div>
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[150px]"></div>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.05),transparent_70%)]"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-2xl px-5 py-2.5 mb-6">
            <Crown className="w-5 h-5 text-yellow-400 animate-pulse" />
            <span className="text-sm font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              EXCLUSIVE COLLECTION
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-4">
            <span className="block mb-2">Premium</span>
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 blur-2xl opacity-50"></span>
              <span className="relative bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Products
              </span>
            </span>
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Discover our curated collection of luxury items
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        {/* Mobile Filter Toggle */}
        <div className="md:hidden mb-6">
          <button
            onClick={() => setOpenFilter(!openFilter)}
            className="w-full rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-2xl p-5 flex items-center justify-between transition-all hover:border-cyan-500/30"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 flex items-center justify-center">
                <SlidersHorizontal className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg">Filters & Sort</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">{filterData?.length} items</span>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-xs font-bold">
                {filterData?.length}
              </div>
            </div>
          </button>
        </div>

        {/* Mobile Filter Panel */}
        {openFilter && (
          <div className="md:hidden mb-6 rounded-3xl border border-white/10 bg-gradient-to-br from-gray-900/98 to-black/98 backdrop-blur-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5"></div>
            <div className="relative p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">Refine Search</h3>
                <button 
                  onClick={() => setOpenFilter(false)}
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all"
                >
                  ✕
                </button>
              </div>

              <div className="relative mb-6">
                <IoSearchOutline className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search luxury items..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none transition-all"
                />
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-gray-400 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    Category
                  </h4>
                  <div className="space-y-2">
                    {categoryNames?.map((item, index) => (
                      <label key={index} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-all group">
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={category === item}
                            value={item}
                            onChange={handleCategoryChange}
                            className="sr-only"
                          />
                          <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${
                            category === item 
                              ? 'border-cyan-500 bg-gradient-to-br from-cyan-500 to-blue-500' 
                              : 'border-white/20 group-hover:border-cyan-500/50'
                          }`}>
                            {category === item && <span className="text-white text-xs">✓</span>}
                          </div>
                        </div>
                        <span className="font-medium">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-gray-400">Brand</h4>
                  <select
                    value={brand}
                    onChange={handleBrandChange}
                    className="w-full p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl text-white focus:border-cyan-500/50 focus:outline-none transition-all"
                  >
                    {brandNames?.map((item, index) => (
                      <option key={index} value={item} className="bg-black">{item}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-gray-400">Price Range</h4>
                  <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                        ${priceRange[0]}
                      </span>
                      <span className="text-gray-500">-</span>
                      <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                        ${priceRange[1]}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="5000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="w-full h-3 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-cyan-500 [&::-webkit-slider-thumb]:to-blue-500 [&::-webkit-slider-thumb]:shadow-lg"
                    />
                  </div>
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
                className="relative w-full mt-6 overflow-hidden group rounded-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative block py-4 font-bold text-white">
                  Reset All Filters
                </span>
              </button>
            </div>
          </div>
        )}

        {data?.length > 0 ? (
          <div className="flex gap-8">
            {/* Desktop Sidebar - Premium Design */}
            <div className="hidden md:block w-96 flex-shrink-0">
              <div className="sticky top-28 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-3xl p-8 shadow-2xl">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5"></div>
                
                <div className="relative">
                  <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 flex items-center justify-center">
                      <SlidersHorizontal className="w-5 h-5 text-white" />
                    </div>
                    Filters
                  </h2>

                  <div className="relative mb-6">
                    <IoSearchOutline className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-8">
                    <div>
                      <h3 className="font-bold mb-4 text-sm uppercase tracking-wider text-gray-400 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-cyan-400" />
                        Category
                      </h3>
                      <div className="space-y-2">
                        {categoryNames?.map((item, index) => (
                          <label key={index} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-all group">
                            <div className="relative">
                              <input
                                type="checkbox"
                                checked={category === item}
                                value={item}
                                onChange={handleCategoryChange}
                                className="sr-only"
                              />
                              <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${
                                category === item 
                                  ? 'border-cyan-500 bg-gradient-to-br from-cyan-500 to-blue-500' 
                                  : 'border-white/20 group-hover:border-cyan-500/50'
                              }`}>
                                {category === item && <span className="text-white text-xs">✓</span>}
                              </div>
                            </div>
                            <span className="font-medium">{item}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-bold mb-4 text-sm uppercase tracking-wider text-gray-400">Brand</h3>
                      <select
                        value={brand}
                        onChange={handleBrandChange}
                        className="w-full p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl text-white focus:border-cyan-500/50 focus:outline-none transition-all"
                      >
                        {brandNames?.map((item, index) => (
                          <option key={index} value={item} className="bg-black">{item}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <h3 className="font-bold mb-4 text-sm uppercase tracking-wider text-gray-400">Price Range</h3>
                      <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                            ${priceRange[0]}
                          </span>
                          <span className="text-gray-500">-</span>
                          <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                            ${priceRange[1]}
                          </span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="5000"
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                          className="w-full h-3 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-cyan-500 [&::-webkit-slider-thumb]:to-blue-500 [&::-webkit-slider-thumb]:shadow-lg"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSearch("");
                      setBrand("All");
                      setCategory("All");
                      setPriceRange([0, 5000]);
                    }}
                    className="relative w-full mt-8 overflow-hidden group rounded-2xl"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <span className="relative block py-4 font-bold text-white">
                      Reset All Filters
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Products Section */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="rounded-3xl border w-[100%] border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-3xl p-6 mb-8 shadow-xl">
                <div className="absolute inset-0 rounded-3xl md:w-[100%] bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5"></div>
                <div className="relative flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <TrendingUp className="w-6 h-6 text-cyan-400" />
                    <div>
                      <span className="font-black text-2xl bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                        {filterData?.length}
                      </span>
                      <span className="text-gray-400 font-medium ml-2">Premium Items</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="p-3 pr-10 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl text-white focus:border-cyan-500/50 focus:outline-none font-medium"
                    >
                      <option value="featured" className="bg-black">Featured</option>
                      <option value="price-low" className="bg-black">Price: Low to High</option>
                      <option value="price-high" className="bg-black">Price: High to Low</option>
                      <option value="newest" className="bg-black">Newest First</option>
                    </select>

                    <div className="hidden md:flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-1.5">
                      <button
                        onClick={() => setViewMode("grid")}
                        className={`p-2.5 rounded-lg transition-all ${
                          viewMode === "grid" 
                            ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white" 
                            : "text-gray-500 hover:text-white"
                        }`}
                      >
                        <IoGridOutline size={20} />
                      </button>
                      <button
                        onClick={() => setViewMode("list")}
                        className={`p-2.5 rounded-lg transition-all ${
                          viewMode === "list" 
                            ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white" 
                            : "text-gray-500 hover:text-white"
                        }`}
                      >
                        <IoListOutline size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              {filterData?.length > 0 ? (
                <>
                  <div className={viewMode === "grid" 
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "flex flex-col gap-6"
                  }>
                    {filterData?.slice(page * 8 - 8, page * 8).map((product) => (
                      <ProductCard
                        key={product._id}
                        product={product}
                        viewMode={viewMode}
                      />
                    ))}
                  </div>

                  {/* Premium Pagination */}
                  {dynamicPage > 1 && (
                    <div className="flex justify-center items-center gap-3 mt-12">
                      <button
                        onClick={() => pageHandler(page - 1)}
                        disabled={page === 1}
                        className="px-6 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:border-cyan-500/50 transition-all"
                      >
                        Previous
                      </button>
                      <div className="flex gap-2">
                        {[...Array(dynamicPage)].map((_, i) => (
                          <button
                            key={i}
                            onClick={() => pageHandler(i + 1)}
                            className={`w-12 h-12 rounded-xl font-bold transition-all ${
                              page === i + 1
                                ? "bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white scale-110 shadow-lg shadow-cyan-500/50"
                                : "border border-white/10 bg-white/5 backdrop-blur-xl hover:border-cyan-500/50"
                            }`}
                          >
                            {i + 1}
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={() => pageHandler(page + 1)}
                        disabled={page === dynamicPage}
                        className="px-6 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:border-cyan-500/50 transition-all"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-24 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-3xl">
                  <div className="text-7xl mb-6">🔍</div>
                  <h3 className="text-3xl font-bold mb-3">No Products Found</h3>
                  <p className="text-gray-400 mb-8 text-lg">Try adjusting your filters</p>
                  <button
                    onClick={() => {
                      setSearch("");
                      setBrand("All");
                      setCategory("All");
                      setPriceRange([0, 5000]);
                    }}
                    className="relative overflow-hidden group rounded-2xl"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600"></div>
                    <span className="relative block px-8 py-4 font-bold text-white">
                      Clear All Filters
                    </span>
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