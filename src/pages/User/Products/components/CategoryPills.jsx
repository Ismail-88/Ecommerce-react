import { LayoutGrid } from "lucide-react";

const CategoryPills = ({ categories, activeCategory, onSelect }) => {
  const list = categories?.filter(Boolean) || [];

  return (
    <div className="mb-5">
      <div className="flex items-center gap-2.5 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <button
          onClick={() => onSelect("All")}
          aria-pressed={activeCategory === "All"}
          className={`inline-flex items-center gap-1.5 flex-shrink-0 rounded-lg px-4 py-2 text-sm font-bold border transition-all active:scale-95 ${
            activeCategory === "All"
              ? "bg-brand-600 border-brand-600 text-white"
              : "border-border bg-surface text-text-muted hover:border-brand-400 hover:text-brand-600 dark:hover:text-brand-400"
          }`}
        >
          <LayoutGrid size={14} aria-hidden />
          All
        </button>

        {list.map((cat) => {
          const active = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onSelect(cat)}
              aria-pressed={active}
              className={`inline-flex items-center flex-shrink-0 rounded-lg px-4 py-2 text-sm font-bold border transition-all active:scale-95 ${
                active
                  ? "bg-brand-600 border-brand-600 text-white"
                  : "border-border bg-surface text-text-muted hover:border-brand-400 hover:text-brand-600 dark:hover:text-brand-400"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryPills;
