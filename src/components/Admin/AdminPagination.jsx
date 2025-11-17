import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const AdminPagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const getPageNumbers = () => {
    const pages = [];

    // Always show first page
    if (currentPage > 3) {
      pages.push(1);
      if (currentPage > 4) pages.push("...");
    }

    // Show 2 pages before and after current page
    for (let i = currentPage - 2; i <= currentPage + 2; i++) {
      if (i > 0 && i <= totalPages) {
        pages.push(i);
      }
    }

    // Always show last page
    if (currentPage < totalPages - 2) {
      if (currentPage < totalPages - 3) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-2 pt-8 flex-wrap">
      {/* Prev Button */}
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="p-3 bg-white border-2 border-gray-200 rounded-xl hover:border-red-500 hover:text-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Page Numbers */}
      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => page !== "..." && onPageChange(page)}
          disabled={page === "..."}
          className={`px-4 py-2 rounded-xl font-bold transition-all ${
            currentPage === page
              ? "bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg scale-110"
              : "bg-white border-2 border-gray-200 hover:border-red-500 hover:text-red-500"
          } ${page === "..." ? "cursor-default border-none" : ""}`}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="p-3 bg-white border-2 border-gray-200 rounded-xl hover:border-red-500 hover:text-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default AdminPagination;
