import React from 'react';
import { FaFilter } from 'react-icons/fa';

const FilterSection = ({ 
  search, 
  setSearch, 
  category, 
  setCategory, 
  brand, 
  setBrand, 
  priceRange, 
  setPriceRange, 
  categoryNames, 
  brandNames,
  onReset,
  setPage
}) => {
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setPage(1);
  };

  const handleBrandChange = (e) => {
    setBrand(e.target.value);
    setPage(1);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-4 border border-gray-100">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
        <div className="p-2 bg-red-50 rounded-lg">
          <FaFilter className="text-red-500" size={18} />
        </div>
        <h2 className="text-xl font-bold text-gray-800">Filters</h2>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-100 focus:outline-none transition-all text-sm"
          />
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Category */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3 text-gray-700 text-sm uppercase tracking-wide">Category</h3>
        <div className="space-y-1.5 max-h-60 overflow-y-auto custom-scrollbar">
          {categoryNames?.map((item, index) => (
            <label 
              key={index} 
              className="flex items-center gap-2.5 p-2.5 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors group"
            >
              <div className="relative">
                <input
                  type="radio"
                  name="category"
                  checked={category === item}
                  value={item}
                  onChange={handleCategoryChange}
                  className="w-4 h-4 text-red-500 border-gray-300 focus:ring-red-500 focus:ring-2 cursor-pointer"
                />
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 flex-1">{item}</span>
              {category === item && (
                <span className="text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-full font-semibold">
                  Active
                </span>
              )}
            </label>
          ))}
        </div>
      </div>

      {/* Brand */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3 text-gray-700 text-sm uppercase tracking-wide">Brand</h3>
        <div className="relative">
          <select
            value={brand}
            onChange={handleBrandChange}
            className="w-full p-3 border border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-100 focus:outline-none transition-all font-medium text-sm appearance-none bg-white cursor-pointer"
          >
            {brandNames?.map((item, index) => (
              <option key={index} value={item}>{item}</option>
            ))}
          </select>
          <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3 text-gray-700 text-sm uppercase tracking-wide">Price Range</h3>
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-gray-600">Min</span>
            <span className="text-lg font-bold text-gray-800">
              ${priceRange[0]} - ${priceRange[1]}
            </span>
            <span className="text-xs font-semibold text-gray-600">Max</span>
          </div>
          <input
            type="range"
            min="0"
            max="5000"
            step="50"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
            className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #ef4444 0%, #ef4444 ${(priceRange[1] / 5000) * 100}%, #e5e7eb ${(priceRange[1] / 5000) * 100}%, #e5e7eb 100%)`
            }}
          />
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>$0</span>
            <span>$5000</span>
          </div>
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={onReset}
        className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all shadow-sm hover:shadow-md active:scale-95 text-sm"
      >
        Reset All Filters
      </button>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #ef4444;
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }
        .slider::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #ef4444;
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
};

export default FilterSection;