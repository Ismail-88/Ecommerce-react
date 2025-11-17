// components/products/EmptyProductsState.jsx
import React from 'react';

const EmptyProductsState = ({ onReset }) => {
  return (
    <div className="flex flex-col items-center justify-center py-24 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-3xl">
      <div className="text-7xl mb-6">🔍</div>
      <h3 className="text-3xl font-bold mb-3">No Products Found</h3>
      <p className="text-gray-400 mb-8 text-lg">Try adjusting your filters</p>
      <button
        onClick={onReset}
        className="relative overflow-hidden group rounded-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <span className="relative block px-8 py-4 font-bold text-white">
          Clear All Filters
        </span>
      </button>
    </div>
  );
};

export default EmptyProductsState;