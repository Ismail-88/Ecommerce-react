
import { IoSearchOutline } from 'react-icons/io5';
import { SlidersHorizontal, Sparkles } from 'lucide-react';

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
  onClose
}) => {
  return (
    <div className={`${isMobile ? 'relative' : 'sticky top-28'} rounded-3xl border border-white/10 bg-gradient-to-br ${isMobile ? 'from-gray-900/98 to-black/98' : 'from-white/[0.07] to-white/[0.02]'} backdrop-blur-3xl p-${isMobile ? '6' : '8'} shadow-2xl`}>
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5"></div>
      
      <div className="relative">
        {isMobile && (
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold">Refine Search</h3>
            <button 
              onClick={onClose}
              className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all"
            >
              ✕
            </button>
          </div>
        )}

        {!isMobile && (
          <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 flex items-center justify-center">
              <SlidersHorizontal className="w-5 h-5 text-white" />
            </div>
            Filters
          </h2>
        )}

        <div className="relative mb-6">
          <IoSearchOutline className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input
            type="text"
            placeholder={isMobile ? "Search luxury items..." : "Search products..."}
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
            resetFilters();
            if (isMobile && onClose) onClose();
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
  );
};

export default FilterSidebar;