// pages/User/Home/components/CategoryRibbon.jsx
import React from "react";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "Electronics",
    img: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300",
  },
  {
    name: "Men's Fashion",
    img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=300",
  },
  {
    name: "Women's Fashion",
    img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300",
  },
  {
    name: "Beauty",
    img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300",
  },
  {
    name: "Home & Living",
    img: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300",
  },
  {
    name: "Sports",
    img: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=300",
  },
  {
    name: "Footwear",
    img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=300",
  },
  {
    name: "Accessories",
    img: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=300",
  },
];

const CategoryRibbon = () => {
  return (
    <section className="bg-surface border-b border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
        <div className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to="/products"
              className="flex flex-col items-center gap-2 shrink-0 snap-start group"
            >
              <span className="block w-16 h-16 md:w-[72px] md:h-[72px] rounded-full overflow-hidden ring-1 ring-border bg-surface-alt group-hover:ring-brand-600 transition-all">
                <img
                  src={cat.img}
                  alt={cat.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </span>
              <span className="text-[11px] md:text-xs font-semibold text-text-muted group-hover:text-brand-600 transition-colors text-center leading-tight">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryRibbon;
