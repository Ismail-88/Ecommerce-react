// components/products/ProductsPagination.jsx
import React from 'react';

const ProductsPagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-3 mt-12">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-6 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:border-cyan-500/50 transition-all"
      >
        Previous
      </button>
      <div className="flex gap-2">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => onPageChange(i + 1)}
            className={`w-12 h-12 rounded-xl font-bold transition-all ${
              currentPage === i + 1
                ? "bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white scale-110 shadow-lg shadow-cyan-500/50"
                : "border border-white/10 bg-white/5 backdrop-blur-xl hover:border-cyan-500/50"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-6 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:border-cyan-500/50 transition-all"
      >
        Next
      </button>
    </div>
  );
};

export default ProductsPagination;