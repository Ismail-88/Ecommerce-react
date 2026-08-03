import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SectionHeading from "../../../../components/ui/SectionHeading";
import ProductCard from "../../Products/components/ProductCard";
import { SkeletonCard } from "../../../../components/ui/Skeleton";

const FeaturedProductsSection = ({ products }) => {
  return (
    <section className="py-16 md:py-20 bg-surface-alt">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <SectionHeading
            align="left"
            eyebrow="Handpicked for you"
            title="Featured Products"
            description="Excellence in every detail"
            className="mb-0"
          />
          <Link
            to="/products"
            className="hidden lg:inline-flex items-center gap-2 shrink-0 rounded-lg border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-foreground hover:border-border-strong hover:bg-surface-hover transition-colors"
          >
            View All
            <ArrowRight size={16} aria-hidden />
          </Link>
        </div>

        {!products || products.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {products.slice(0, 8).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        <div className="lg:hidden mt-8 text-center">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground hover:border-border-strong hover:bg-surface-hover transition-colors"
          >
            View All Products
            <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductsSection;
