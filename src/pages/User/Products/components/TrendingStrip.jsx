import { useRef } from "react";
import { ChevronLeft, ChevronRight, Flame } from "lucide-react";
import TrendingCard from "./TrendingCard";

const TrendingStrip = ({ products }) => {
  const scrollerRef = useRef(null);

  if (!products || products.length === 0) return null;

  const scrollBy = (dir) => {
    scrollerRef.current?.scrollBy({ left: dir * 240, behavior: "smooth" });
  };

  return (
    <section id="trending" className="mb-10 scroll-mt-24">
      <div className="flex items-end justify-between mb-4 flex-wrap gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-brand-600 text-white shadow-sm shadow-orange-500/25">
              <Flame size={18} aria-hidden />
            </span>
            <h2 className="text-xl md:text-2xl font-black text-foreground tracking-tight">
              Trending Now
            </h2>
          </div>
          <p className="text-sm text-text-muted">Most loved picks this week</p>
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={() => scrollBy(-1)}
            aria-label="Scroll trending left"
            className="p-2.5 rounded-xl border border-border bg-surface text-text-muted hover:text-foreground hover:border-border-strong transition-all"
          >
            <ChevronLeft size={18} aria-hidden />
          </button>
          <button
            onClick={() => scrollBy(1)}
            aria-label="Scroll trending right"
            className="p-2.5 rounded-xl border border-border bg-surface text-text-muted hover:text-foreground hover:border-border-strong transition-all"
          >
            <ChevronRight size={18} aria-hidden />
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {products.map((product) => (
          <TrendingCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default TrendingStrip;
