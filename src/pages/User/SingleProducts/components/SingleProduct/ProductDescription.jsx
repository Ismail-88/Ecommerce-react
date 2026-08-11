import React, { useMemo } from "react";
import { PackageCheck, Tag } from "lucide-react";

const ProductDescription = ({ description, brand, category, stock, discount }) => {
  const isOutOfStock = stock === 0;

  const highlights = useMemo(() => {
    const sentences = String(description || "")
      .split(/(?<=[.!?])\s+/)
      .map((s) => s.trim())
      .filter(Boolean);
    return sentences.slice(0, 4);
  }, [description]);

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
    <div id="description" className="bg-surface border border-border rounded-lg p-4 space-y-5">
      {/* Highlights */}
      <div>
        <h3 className="text-lg font-bold text-foreground mb-3">Highlights</h3>
        <ul className="space-y-2">
          {highlights.length > 0 ? (
            highlights.map((point, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-text-secondary leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-600 mt-2 flex-shrink-0" aria-hidden />
                <span>{point}</span>
              </li>
            ))
          ) : (
            <li className="text-sm text-text-muted">{description}</li>
          )}
        </ul>
      </div>

      {/* Full description */}
      {highlights.length > 0 && (
        <div className="pt-4 border-t border-border">
          <h3 className="text-lg font-bold text-foreground mb-2">Product Description</h3>
          <p className="text-sm text-text-secondary leading-relaxed">{description}</p>
        </div>
      )}

      {/* Specifications */}
      <div className="pt-4 border-t border-border">
        <div className="flex items-center gap-2 mb-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-md bg-primary-soft text-brand-600 dark:text-brand-400">
            <PackageCheck size={16} aria-hidden />
          </span>
          <h3 className="text-lg font-bold text-foreground">Specifications</h3>
          {isOutOfStock && (
            <span className="ml-auto text-xs font-semibold text-danger">Out of Stock</span>
          )}
        </div>
        <div>
          {specifications.map((spec) => (
            <div
              key={spec.label}
              className="grid grid-cols-2 gap-3 py-2 border-b border-border last:border-b-0"
            >
              <span className="text-sm text-text-muted">{spec.label}</span>
              <span className="font-semibold text-foreground text-sm flex items-center gap-1.5">
                {spec.label === "Discount" && spec.value !== "No current offer" && (
                  <Tag size={13} className="text-success flex-shrink-0" aria-hidden />
                )}
                {spec.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
