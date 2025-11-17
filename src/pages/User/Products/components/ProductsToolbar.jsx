// components/products/ProductsToolbar.jsx
import React from 'react';
import { IoGridOutline, IoListOutline } from 'react-icons/io5';
import { TrendingUp } from 'lucide-react';

const ProductsToolbar = ({ itemCount, sortBy, setSortBy, viewMode, setViewMode }) => {
  return (
    <div className="relative rounded-3xl border w-full border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-3xl p-6 mb-8 shadow-xl">
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5"></div>
      <div className="relative flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <TrendingUp className="w-6 h-6 text-cyan-400" />
          <div>
            <span className="font-black text-2xl bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {itemCount}
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
  );
};

export default ProductsToolbar;