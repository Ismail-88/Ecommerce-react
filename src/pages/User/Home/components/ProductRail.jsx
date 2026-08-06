// pages/User/Home/components/ProductRail.jsx
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "../../Products/components/ProductCard";
import { SkeletonCard } from "../../../../components/ui/Skeleton";
import Reveal from "../../../../components/ui/Reveal";

const ProductRail = ({ title, eyebrow, to, products }) => {
  const scrollRef = useRef(null);

  const scrollBy = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 280, behavior: "smooth" });
  };

  return (
    <section className="py-8 md:py-10">
      <Reveal className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-end justify-between mb-4">
          <div>
            {eyebrow && (
              <p className="text-[11px] font-bold uppercase tracking-widest text-brand-600 mb-1">
                {eyebrow}
              </p>
            )}
            <h2 className="text-lg md:text-xl font-extrabold text-foreground tracking-tight">
              {title}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollBy(-1)}
              aria-label="Scroll left"
              className="hidden md:flex w-8 h-8 rounded-full border border-border bg-surface items-center justify-center text-text-muted hover:text-brand-600 hover:border-brand-600 transition-colors"
            >
              <ChevronLeft size={16} aria-hidden />
            </button>
            <button
              onClick={() => scrollBy(1)}
              aria-label="Scroll right"
              className="hidden md:flex w-8 h-8 rounded-full border border-border bg-surface items-center justify-center text-text-muted hover:text-brand-600 hover:border-brand-600 transition-colors"
            >
              <ChevronRight size={16} aria-hidden />
            </button>
            <Link
              to={to}
              className="inline-flex items-center gap-1 text-sm font-bold text-brand-600 hover:text-brand-700 transition-colors"
            >
              View All
              <ArrowRight size={15} aria-hidden />
            </Link>
          </div>
        </div>

        {!products || products.length === 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2"
          >
            {products.map((product) => (
              <div key={product._id} className="w-[45vw] sm:w-[220px] lg:w-[216px] shrink-0 snap-start">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </Reveal>
    </section>
  );
};

export default ProductRail;
