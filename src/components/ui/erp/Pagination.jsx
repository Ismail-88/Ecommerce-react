import { useState } from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

const pageBtn =
  "inline-flex items-center justify-center min-w-8 h-8 rounded-md border text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed";

const Pagination = ({
  page = 1,
  limit = 10,
  total = 0,
  onPageChange,
  onLimitChange,
  options = [10, 20, 50, 100],
  className = "",
}) => {
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const startItem = total === 0 ? 0 : (safePage - 1) * limit + 1;
  const endItem = Math.min(safePage * limit, total);
  const [jumpValue, setJumpValue] = useState(String(safePage));

  const goto = (p) => {
    const clamped = Math.min(Math.max(1, Number(p) || 1), totalPages);
    if (onPageChange) onPageChange(clamped);
  };

  const handleJump = (e) => {
    if (e.key === "Enter") {
      goto(jumpValue);
      e.target.blur();
    }
  };

  const handleJumpBlur = () => {
    if (Number(jumpValue) && Number(jumpValue) !== safePage) goto(jumpValue);
    setJumpValue(String(safePage));
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (safePage > 3) pages.push("...");
      const start = Math.max(2, safePage - 1);
      const end = Math.min(totalPages - 1, safePage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (safePage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  const showPager = total > limit;

  return (
    <div className={`flex flex-col gap-3 sm:flex-row sm:items-center justify-between ${className}`}>
      {/* Rows per page + summary */}
      <div className="flex items-center gap-3 text-xs text-text-muted">
        <label htmlFor="rows-per-page" className="hidden sm:block">
          Rows per page
        </label>
        {onLimitChange && (
          <select
            id="rows-per-page"
            value={limit}
            onChange={(e) => onLimitChange(Number(e.target.value))}
            className="h-8 rounded-md border border-border bg-input-bg px-2 pr-7 text-xs font-medium text-foreground appearance-none bg-no-repeat focus:border-brand-500 focus:outline-none transition-colors"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m4 5 3 3 3-3'/%3E%3C/svg%3E\")",
              backgroundPosition: "right 0.5rem center",
            }}
          >
            {options.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        )}
        <span className="tabular-nums">
          Showing {startItem}–{endItem} of {total}
        </span>
      </div>

      {/* Pager */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => goto(1)}
          disabled={!showPager || safePage === 1}
          aria-label="First page"
          className={`${pageBtn} border-border bg-surface text-text-secondary hover:border-brand-500 hover:text-brand-600 dark:hover:text-brand-400 disabled:hover:border-border disabled:hover:text-text-secondary`}
        >
          <ChevronsLeft size={14} />
        </button>
        <button
          onClick={() => goto(safePage - 1)}
          disabled={!showPager || safePage === 1}
          aria-label="Previous page"
          className={`${pageBtn} border-border bg-surface text-text-secondary hover:border-brand-500 hover:text-brand-600 dark:hover:text-brand-400 disabled:hover:border-border disabled:hover:text-text-secondary`}
        >
          <ChevronLeft size={14} />
        </button>

        {showPager &&
          getPageNumbers().map((p, i) =>
            p === "..." ? (
              <span key={`ellipsis-${i}`} className="px-1 text-xs text-text-faint">
                …
              </span>
            ) : (
              <button
                key={p}
                onClick={() => goto(p)}
                aria-current={safePage === p ? "page" : undefined}
                className={`${pageBtn} ${
                  safePage === p
                    ? "bg-brand-600 border-brand-600 text-white shadow-sm shadow-brand-600/20"
                    : "border-border bg-surface text-text-secondary hover:border-brand-500 hover:text-brand-600 dark:hover:text-brand-400"
                }`}
              >
                {p}
              </button>
            )
          )}

        <button
          onClick={() => goto(safePage + 1)}
          disabled={!showPager || safePage >= totalPages}
          aria-label="Next page"
          className={`${pageBtn} border-border bg-surface text-text-secondary hover:border-brand-500 hover:text-brand-600 dark:hover:text-brand-400 disabled:hover:border-border disabled:hover:text-text-secondary`}
        >
          <ChevronRight size={14} />
        </button>
        <button
          onClick={() => goto(totalPages)}
          disabled={!showPager || safePage >= totalPages}
          aria-label="Last page"
          className={`${pageBtn} border-border bg-surface text-text-secondary hover:border-brand-500 hover:text-brand-600 dark:hover:text-brand-400 disabled:hover:border-border disabled:hover:text-text-secondary`}
        >
          <ChevronsRight size={14} />
        </button>

        {totalPages > 1 && (
          <div className="flex items-center gap-1.5 ml-1.5">
            <label htmlFor="page-jump" className="text-xs text-text-muted">
              Go to
            </label>
            <input
              id="page-jump"
              type="number"
              min={1}
              max={totalPages}
              value={jumpValue}
              onChange={(e) => setJumpValue(e.target.value)}
              onKeyDown={handleJump}
              onBlur={handleJumpBlur}
              className="w-14 h-8 rounded-md border border-border bg-input-bg px-2 text-xs font-medium text-foreground text-center tabular-nums focus:border-brand-500 focus:outline-none transition-colors"
            />
            <span className="text-xs text-text-faint">/ {totalPages}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pagination;
