import { ChevronLeft, ChevronRight } from "lucide-react";

const ProductsPagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const btnBase =
    "inline-flex items-center justify-center min-w-10 h-10 rounded-lg border text-sm font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed";

  return (
    <nav className="flex justify-center items-center gap-1.5 mt-10 flex-wrap" aria-label="Pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className={`${btnBase} border-border bg-surface text-text-secondary hover:border-brand-500 hover:text-brand-600 dark:hover:text-brand-400 disabled:hover:border-border`}
      >
        <ChevronLeft size={16} aria-hidden />
      </button>

      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          onClick={() => onPageChange(i + 1)}
          aria-current={currentPage === i + 1 ? "page" : undefined}
          aria-label={`Page ${i + 1}`}
          className={`${btnBase} ${
            currentPage === i + 1
              ? "bg-brand-600 border-brand-600 text-white shadow-sm shadow-brand-600/20"
              : "border-border bg-surface text-text-secondary hover:border-brand-500 hover:text-brand-600 dark:hover:text-brand-400"
          }`}
        >
          {i + 1}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className={`${btnBase} border-border bg-surface text-text-secondary hover:border-brand-500 hover:text-brand-600 dark:hover:text-brand-400 disabled:hover:border-border`}
      >
        <ChevronRight size={16} aria-hidden />
      </button>
    </nav>
  );
};

export default ProductsPagination;
