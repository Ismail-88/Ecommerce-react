// pages/User/Home/components/DealsOfTheDaySection.jsx
import { Link } from "react-router-dom";
import { ArrowRight, Zap } from "lucide-react";
import SectionHeading from "../../../../components/ui/SectionHeading";
import ProductCard from "../../Products/components/ProductCard";
import { getDealProducts } from "../../../../utils/deals";

const DealsOfTheDaySection = ({ products }) => {
  const deals = getDealProducts(products).slice(0, 4);

  if (deals.length === 0) return null;

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-surface-alt to-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <SectionHeading
            align="left"
            eyebrow="Limited time only"
            title="Deals of the Day"
            description="Unbeatable prices on premium products"
            className="mb-0"
          />
          <Link
            to="/deals"
            className="hidden lg:inline-flex items-center gap-2 shrink-0 rounded-lg border border-danger/30 bg-danger-soft px-5 py-2.5 text-sm font-semibold text-danger hover:bg-danger/10 transition-colors"
          >
            <Zap size={16} aria-hidden />
            Shop All Deals
            <ArrowRight size={16} aria-hidden />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {deals.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        <div className="lg:hidden mt-8 text-center">
          <Link
            to="/deals"
            className="inline-flex items-center gap-2 rounded-lg border border-danger/30 bg-danger-soft px-6 py-3 text-sm font-semibold text-danger hover:bg-danger/10 transition-colors"
          >
            <Zap size={16} aria-hidden />
            Shop All Deals
            <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DealsOfTheDaySection;
