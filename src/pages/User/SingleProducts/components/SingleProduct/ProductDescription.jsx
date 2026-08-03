import React, { useMemo } from "react";
import { PackageCheck, Tag } from "lucide-react";
import Badge from "../../../../../components/ui/Badge";

const ProductDescription = ({ description, brand, category, stock, discount }) => {
  const isOutOfStock = stock === 0;
  const lowStock = stock > 0 && stock <= 5;

  const specifications = useMemo(
    () => [
      { label: "Brand", value: brand || "ShopSphere" },
      { label: "Category", value: category?.name || category || "General" },
      { label: "Condition", value: "Brand New" },
      { label: "Warranty", value: "1 Year Manufacturer Warranty" },
      { label: "Delivery", value: "3-5 Business Days" },
      { label: "Discount", value: discount > 0 ? `${discount}% OFF` : "No current offer" },
    ],
    [brand, category, discount]
  );

  return (
    <div className="rounded-2xl border border-border bg-surface shadow-card p-6" id="description">
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <h3 className="text-lg font-bold text-foreground">Product Description</h3>
        {isOutOfStock ? (
          <Badge tone="danger">Out of Stock</Badge>
        ) : lowStock ? (
          <Badge tone="warning">Only {stock} left</Badge>
        ) : (
          <Badge tone="success">In Stock</Badge>
        )}
      </div>
      <p className="text-text-muted leading-relaxed mb-6">{description}</p>

      <div className="flex items-center gap-2 mb-4">
        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary-soft text-brand-600 dark:text-brand-400">
          <PackageCheck size={16} aria-hidden />
        </span>
        <h3 className="text-lg font-bold text-foreground">Specifications</h3>
      </div>
      <div className="space-y-3">
        {specifications.map((spec) => (
          <div
            key={spec.label}
            className="flex border-b border-border pb-3 last:border-b-0 last:pb-0"
          >
            <span className="text-text-muted w-2/5 text-sm">{spec.label}</span>
            <span className="font-semibold text-foreground text-sm w-3/5 flex items-center gap-1.5">
              {spec.label === "Discount" && spec.value !== "No current offer" && (
                <Tag size={13} className="text-success flex-shrink-0" aria-hidden />
              )}
              {spec.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDescription;
