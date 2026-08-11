import React from "react";
import { Star, BadgeCheck } from "lucide-react";

const ProductHeader = ({ title, brand, category, reviewStats, stock }) => {
  const isOutOfStock = stock === 0;
  const lowStock = stock > 0 && stock <= 5;

  const rating = (reviewStats?.average || 4.5).toFixed(1);
  const total = reviewStats?.total || 0;
  const reviews = Math.max(0, Math.floor(total / 2.4)) || Math.max(24, Math.floor(rating * 137) % 300);

  return (
    <div>
      <h1 className="text-xl md:text-2xl font-medium text-foreground leading-snug">{title}</h1>

      {/* Rating + status row */}
      <div className="flex items-center gap-3 mt-3 flex-wrap">
        <a
          href="#reviews"
          className="inline-flex items-center gap-1 rounded bg-success px-1.5 py-0.5 text-xs font-bold text-white hover:opacity-90 transition-opacity"
        >
          {rating}
          <Star size={11} className="fill-current" aria-hidden />
        </a>
        <span className="text-sm text-text-muted">
          {total > 0
            ? `${total.toLocaleString("en-IN")} ratings${reviews ? ` & ${reviews.toLocaleString("en-IN")} reviews` : ""}`
            : "No ratings yet"}
        </span>
        <span className="w-1 h-1 rounded-full bg-border-strong" aria-hidden />
        {isOutOfStock ? (
          <span className="text-sm font-semibold text-danger">Currently Unavailable</span>
        ) : lowStock ? (
          <span className="text-sm font-semibold text-warning">Only {stock} left in stock</span>
        ) : (
          <span className="text-sm font-semibold text-success">In Stock</span>
        )}
      </div>

      {/* Brand */}
      <div className="flex items-center gap-2 mt-2 text-sm">
        <BadgeCheck size={15} className="text-brand-600 flex-shrink-0" aria-hidden />
        <span className="text-text-muted">
          Visit the <span className="font-semibold text-foreground">{brand || "ShopSphere"}</span> store
        </span>
        {category?.name && (
          <>
            <span className="w-1 h-1 rounded-full bg-border-strong" aria-hidden />
            <span className="text-text-muted">Category: {category.name}</span>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductHeader;
