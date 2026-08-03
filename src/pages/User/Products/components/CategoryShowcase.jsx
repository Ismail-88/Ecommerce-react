import { useMemo } from "react";
import { ChevronRight, LayoutGrid } from "lucide-react";
import { getData } from "../../../../context/DataContext";

const CategoryShowcase = ({ products, categories, onSelect, activeCategory }) => {
  const { getProductImageUrl } = getData();

  const tiles = useMemo(() => {
    if (!products || !categories) return [];
    const seen = new Set();
    const result = [];
    for (const cat of categories) {
      if (!cat || seen.has(cat)) continue;
      seen.add(cat);
      const items = products.filter((p) => p.category?.name === cat);
      if (items.length === 0) continue;
      result.push({ name: cat, count: items.length, image: getProductImageUrl(items[0]) });
    }
    return result.slice(0, 6);
  }, [products, categories, getProductImageUrl]);

  if (tiles.length === 0) return null;

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary-soft text-brand-600 dark:text-brand-400">
              <LayoutGrid size={18} aria-hidden />
            </span>
            <h2 className="text-xl md:text-2xl font-black text-foreground tracking-tight">
              Shop by Category
            </h2>
          </div>
          <p className="text-sm text-text-muted">Find exactly what you need</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {tiles.map((tile) => {
          const active = activeCategory === tile.name;
          return (
            <button
              key={tile.name}
              onClick={() => onSelect(tile.name)}
              aria-pressed={active}
              className={`group relative aspect-[4/5] rounded-2xl overflow-hidden border transition-all text-left ${
                active
                  ? "border-brand-500 ring-2 ring-brand-500/30"
                  : "border-border hover:border-brand-400 hover:shadow-raised"
              }`}
            >
              <img
                src={tile.image}
                alt={tile.name}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" aria-hidden />
              <div className="absolute bottom-0 inset-x-0 p-3">
                <p className="text-sm font-bold text-white leading-tight">{tile.name}</p>
                <p className="text-[11px] text-white/70 font-medium">{tile.count} items</p>
              </div>
              <span
                className="absolute top-2.5 right-2.5 flex items-center justify-center w-7 h-7 rounded-full bg-white/20 backdrop-blur text-white opacity-0 group-hover:opacity-100 transition-opacity"
                aria-hidden
              >
                <ChevronRight size={14} />
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default CategoryShowcase;
