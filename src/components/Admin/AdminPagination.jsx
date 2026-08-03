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

    if (currentPage > 3) {
      pages.push(1);
      if (currentPage > 4) pages.push("...");
    }

    for (let i = currentPage - 2; i <= currentPage + 2; i++) {
      if (i > 0 && i <= totalPages) pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      if (currentPage < totalPages - 3) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  const btnBase =
    "inline-flex items-center justify-center min-w-9 h-9 rounded-lg border text-sm font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed";

  return (
    <nav className="flex justify-center items-center gap-1.5 pt-8 flex-wrap" aria-label="Pagination">
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className={`${btnBase} border-border bg-surface text-text-secondary hover:border-brand-500 hover:text-brand-600 dark:hover:text-brand-400 disabled:hover:border-border`}
      >
        <ChevronLeft size={16} />
      </button>

      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => page !== "..." && onPageChange(page)}
          disabled={page === "..."}
          aria-current={currentPage === page ? "page" : undefined}
          aria-label={page === "..." ? undefined : `Page ${page}`}
          className={`${btnBase} ${
            currentPage === page
              ? "bg-brand-600 border-brand-600 text-white shadow-sm shadow-brand-600/20"
              : "border-border bg-surface text-text-secondary hover:border-brand-500 hover:text-brand-600 dark:hover:text-brand-400"
          } ${page === "..." ? "cursor-default border-transparent" : ""}`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className={`${btnBase} border-border bg-surface text-text-secondary hover:border-brand-500 hover:text-brand-600 dark:hover:text-brand-400 disabled:hover:border-border`}
      >
        <ChevronRight size={16} />
      </button>
    </nav>
  );
};

export default AdminPagination;
