import { SlidersHorizontal } from "lucide-react";

const MobileFilterToggle = ({ openFilter, setOpenFilter, itemCount }) => {
  return (
    <div className="md:hidden mb-5">
      <button
        onClick={() => setOpenFilter(!openFilter)}
        aria-expanded={openFilter}
        className="w-full rounded-2xl border border-border bg-surface p-4 flex items-center justify-between transition-all hover:border-border-strong active:scale-[0.99]"
      >
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-brand-600 to-info text-white">
            <SlidersHorizontal size={17} aria-hidden />
          </span>
          <span className="font-black text-foreground">Filters & Sort</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-text-muted font-medium">{itemCount} items</span>
          <span className="flex items-center justify-center min-w-7 h-7 px-1.5 rounded-lg bg-gradient-to-r from-brand-600 to-info text-white text-xs font-black">
            {itemCount}
          </span>
        </div>
      </button>
    </div>
  );
};

export default MobileFilterToggle;
