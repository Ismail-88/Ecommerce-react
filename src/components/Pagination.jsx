import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ page, pageHandler, dynamicPage }) => {
  const total = Math.max(1, dynamicPage || 1);

  const getPages = (current, totalPages) => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (current <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (current >= totalPages - 3) {
        pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", current - 1, current, current + 1, "...", totalPages);
      }
    }
    return pages;
  };

  const btnBase =
    "inline-flex items-center justify-center min-w-9 h-9 rounded-lg border text-sm font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed";

  return (
    <nav className="flex items-center justify-center gap-1.5 mt-10 flex-wrap" aria-label="Pagination">
      <button
        disabled={page <= 1}
        onClick={() => pageHandler(page - 1)}
        aria-label="Previous page"
        className={`${btnBase} border-border bg-surface text-text-secondary hover:border-border-strong hover:text-foreground disabled:hover:border-border`}
      >
        <ChevronLeft size={16} aria-hidden />
      </button>

      {getPages(page, total).map((item, index) =>
        item === "..." ? (
          <span key={`e-${index}`} className="px-1 text-text-faint select-none" aria-hidden>
            …
          </span>
        ) : (
          <button
            key={item}
            onClick={() => pageHandler(item)}
            aria-current={item === page ? "page" : undefined}
            aria-label={`Page ${item}`}
            className={`${btnBase} ${
              item === page
                ? "bg-brand-600 border-brand-600 text-white shadow-sm shadow-brand-600/20"
                : "border-border bg-surface text-text-secondary hover:border-border-strong hover:text-foreground"
            }`}
          >
            {item}
          </button>
        )
      )}

      <button
        disabled={page >= total}
        onClick={() => pageHandler(page + 1)}
        aria-label="Next page"
        className={`${btnBase} border-border bg-surface text-text-secondary hover:border-border-strong hover:text-foreground disabled:hover:border-border`}
      >
        <ChevronRight size={16} aria-hidden />
      </button>
    </nav>
  );
};

export default Pagination;
