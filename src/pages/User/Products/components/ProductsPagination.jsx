import { ChevronLeft, ChevronRight } from "lucide-react";

const ProductsPagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const btnBase =
    "inline-flex items-center justify-center min-w-9 h-9 px-2 text-sm font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed";

  return (
    <nav
      className="flex justify-center items-center gap-1 mt-8 bg-surface border border-border rounded-lg p-1.5 shadow-card"
      aria-label="Pagination"
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className={`${btnBase} text-text-secondary hover:text-brand-600 dark:hover:text-brand-400 disabled:hover:text-text-secondary`}
      >
        <ChevronLeft size={16} aria-hidden />
      </button>

      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          onClick={() => onPageChange(i + 1)}
          aria-current={currentPage === i + 1 ? "page" : undefined}
          aria-label={`Page ${i + 1}`}
          className={`${btnBase} rounded-md ${
            currentPage === i + 1
              ? "bg-brand-600 text-white shadow-sm shadow-brand-600/20"
              : "text-text-secondary hover:bg-surface-alt hover:text-brand-600 dark:hover:text-brand-400"
          }`}
        >
          {i + 1}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className={`${btnBase} text-text-secondary hover:text-brand-600 dark:hover:text-brand-400 disabled:hover:text-text-secondary`}
      >
        <ChevronRight size={16} aria-hidden />
      </button>
    </nav>
  );
};

export default ProductsPagination;
