import React from "react";
import { Star, BadgeCheck, PackageCheck, ShieldCheck } from "lucide-react";
import Badge from "../../../../../components/ui/Badge";

const ProductHeader = ({ title, brand, category, reviewStats, stock }) => {
  const isOutOfStock = stock === 0;
  const lowStock = stock > 0 && stock <= 5;

  return (
    <div className="rounded-2xl border border-border bg-surface shadow-card p-6 overflow-hidden relative">
      {/* Gradient accent line */}
      <span className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-600 via-info to-success" aria-hidden />

      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <Badge tone="brand">
          <BadgeCheck size={12} className="fill-current" aria-hidden />
          Premium Product
        </Badge>
        {isOutOfStock ? (
          <Badge tone="danger">
            <PackageCheck size={12} aria-hidden />
            Out of Stock
          </Badge>
        ) : lowStock ? (
          <Badge tone="warning">
            <PackageCheck size={12} aria-hidden />
            Only {stock} left in stock
          </Badge>
        ) : (
          <Badge tone="success">
            <PackageCheck size={12} aria-hidden />
            In Stock
          </Badge>
        )}
      </div>

      <h1 className="text-2xl md:text-3xl font-black text-foreground mb-3 leading-tight">{title}</h1>

      {reviewStats.total > 0 ? (
        <div className="flex items-center gap-3 flex-wrap mb-4">
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-success-soft text-success px-2.5 py-1 font-bold text-sm">
            <Star size={14} className="fill-current" aria-hidden />
            {reviewStats.average}
          </span>
          <a
            href="#reviews"
            className="text-sm text-text-muted hover:text-brand-600 dark:hover:text-brand-400 underline underline-offset-2 transition-colors"
          >
            {reviewStats.total} {reviewStats.total === 1 ? "Review" : "Reviews"}
          </a>
          <span className="w-1 h-1 rounded-full bg-border-strong" aria-hidden />
          <span className="text-sm text-text-muted">
            {Math.max(20, reviewStats.total * 7)} sold this week
          </span>
        </div>
      ) : (
        <p className="text-sm text-text-faint mb-4">Be the first to review this product</p>
      )}

      <div className="flex items-center gap-3 text-sm flex-wrap">
        <span className="font-bold text-brand-600 dark:text-brand-400">Special Price</span>
        <span className="w-1 h-1 rounded-full bg-border-strong" aria-hidden />
        <span className="text-text-muted">
          Brand: <span className="font-semibold text-foreground">{brand || "ShopSphere"}</span>
        </span>
        {category?.name && (
          <>
            <span className="w-1 h-1 rounded-full bg-border-strong" aria-hidden />
            <span className="text-text-muted">
              Category: <span className="font-semibold text-foreground">{category.name}</span>
            </span>
          </>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-border flex items-center gap-2 text-xs text-text-muted">
        <ShieldCheck size={15} className="text-success flex-shrink-0" aria-hidden />
        <span>
          Assured quality · 100% genuine · Easy returns & free delivery by{" "}
          <span className="font-bold text-foreground">
            {new Date(Date.now() + 3 * 86400000).toLocaleDateString("en-IN", {
              weekday: "short",
              day: "numeric",
              month: "short",
            })}
          </span>
        </span>
      </div>
    </div>
  );
};

export default ProductHeader;
