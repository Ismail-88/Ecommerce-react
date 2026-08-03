import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp } from "lucide-react";
import SectionHeading from "../../../../components/ui/SectionHeading";

const CategoriesGrid = () => {
  const categories = [
    {
      name: "Premium Tech",
      icon: "💎",
      items: "2.5K+ Items",
      trending: true,
      image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=800",
    },
    {
      name: "Luxury Fashion",
      icon: "👑",
      items: "1.8K+ Items",
      trending: true,
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800",
    },
    {
      name: "Elite Living",
      icon: "✨",
      items: "3.2K+ Items",
      trending: false,
      image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800",
    },
    {
      name: "Pro Sports",
      icon: "⚡",
      items: "1.5K+ Items",
      trending: false,
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800",
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <SectionHeading
            align="left"
            eyebrow="Explore Collections"
            title="Shop by Category"
            description="Curated selections for every lifestyle"
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((category) => (
            <Link
              key={category.name}
              to="/products"
              className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer bg-surface-strong"
            >
              <img
                src={category.image}
                alt={category.name}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" aria-hidden />
              {category.trending && (
                <span className="absolute top-4 right-4 inline-flex items-center gap-1 rounded-full bg-warning text-white text-xs font-bold px-3 py-1.5 shadow-sm">
                  <TrendingUp size={12} aria-hidden />
                  Trending
                </span>
              )}

              <div className="absolute inset-x-0 bottom-0 p-5">
                <span className="text-3xl block mb-2" aria-hidden>
                  {category.icon}
                </span>
                <h3 className="text-xl font-bold text-white">{category.name}</h3>
                <p className="text-sm text-white/70">{category.items}</p>
                <span className="inline-flex items-center gap-1.5 mt-2 text-sm font-semibold text-white group-hover:gap-2.5 transition-all">
                  Explore Now
                  <ArrowRight size={14} aria-hidden />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="lg:hidden mt-6 text-center">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground hover:border-border-strong hover:bg-surface-hover transition-colors"
          >
            View All Categories
            <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoriesGrid;
