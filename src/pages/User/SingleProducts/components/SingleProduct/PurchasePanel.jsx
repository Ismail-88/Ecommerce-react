import React, { useState } from "react";
import { ShoppingBag, Zap, Truck, MapPin, ShieldCheck, RotateCcw, Star } from "lucide-react";
import QuantitySelector from "./QuantitySelector";
import { formatINR } from "../../../../../utils/formatCurrency";

const PurchasePanel = ({
  product,
  pricing,
  quantity,
  setQuantity,
  onAddToCart,
  onBuyNow,
}) => {
  const [pincode, setPincode] = useState("");
  const [applied, setApplied] = useState(false);

  const isOutOfStock = product.stock === 0;
  const isValid = pincode.length === 6;

  const deliveryDate = new Date(Date.now() + 3 * 86400000).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  const ctaBase =
    "w-full inline-flex items-center justify-center gap-2 rounded-md py-3 text-sm font-bold uppercase tracking-wide transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <div className="lg:sticky lg:top-24 bg-surface border border-border rounded-lg overflow-hidden shadow-card">
      {/* Delivery by */}
      <div className="px-4 py-3.5 border-b border-border flex items-center justify-between gap-3">
        <p className="flex items-center gap-1.5 text-sm text-text-secondary">
          <Truck size={16} className="text-success flex-shrink-0" aria-hidden />
          Delivery by <span className="font-bold text-foreground">{deliveryDate}</span>
        </p>
        <span className="text-xs font-bold text-success flex-shrink-0">FREE</span>
      </div>

      {/* Delivery to (pincode) */}
      <div className="px-4 py-3 border-b border-border">
        <label className="block text-[11px] font-bold text-text-muted uppercase tracking-wide mb-1.5">
          Delivery to
        </label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <MapPin size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-faint" aria-hidden />
            <input
              type="text"
              inputMode="numeric"
              placeholder="Enter pincode"
              value={pincode}
              onChange={(e) => {
                setPincode(e.target.value.replace(/\D/g, "").slice(0, 6));
                setApplied(false);
              }}
              className="w-full rounded-md border border-border bg-input-bg pl-8 pr-2.5 py-2 text-sm text-foreground placeholder:text-text-faint focus:border-brand-500"
            />
          </div>
          <button
            onClick={() => setApplied(isValid)}
            disabled={!isValid}
            className="rounded-md bg-brand-600 px-4 py-2 text-sm font-bold text-white hover:bg-brand-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Apply
          </button>
        </div>
        {applied && (
          <p role="status" className="mt-2 text-xs font-semibold text-success animate-fade-in">
            Delivery by {deliveryDate} · FREE · COD available
          </p>
        )}
      </div>

      {/* Price summary + quantity */}
      <div className="px-4 py-4 border-b border-border">
        <div className="flex items-baseline gap-2 mb-3 flex-wrap">
          <span className="text-2xl font-bold text-foreground">{formatINR(product.price)}</span>
          <span className="text-sm text-text-faint line-through">{formatINR(pricing.originalPrice)}</span>
          <span className="text-sm font-bold text-success">{product.discount}% off</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-text-muted">Quantity</span>
          <QuantitySelector quantity={quantity} setQuantity={setQuantity} max={Math.max(1, product.stock || 10)} />
        </div>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
          <span className="text-sm font-medium text-text-muted">Total</span>
          <span className="text-base font-bold text-foreground tabular-nums">
            {formatINR(product.price * quantity)}
          </span>
        </div>
      </div>

      {/* CTA buttons */}
      <div className="p-4 space-y-3">
        <button
          onClick={onAddToCart}
          disabled={isOutOfStock}
          className={`${ctaBase} bg-brand-600 text-white hover:bg-brand-700 shadow-sm shadow-brand-600/20`}
        >
          <ShoppingBag size={17} aria-hidden />
          Add to Cart
        </button>
        <button
          onClick={onBuyNow}
          disabled={isOutOfStock}
          className={`${ctaBase} bg-foreground text-background hover:opacity-90`}
        >
          <Zap size={17} aria-hidden />
          Buy Now
        </button>
        {isOutOfStock && (
          <p className="text-xs font-semibold text-danger text-center">
            This product is currently out of stock
          </p>
        )}
      </div>

      {/* Seller + secure */}
      <div className="px-4 pb-4 space-y-3">
        <div className="flex items-center justify-between rounded-md bg-surface-alt px-3 py-2.5">
          <span className="text-xs text-text-muted">
            Sold by <span className="font-semibold text-foreground">ShopSphere Retail</span>
          </span>
          <span className="inline-flex items-center gap-1 rounded bg-success px-1.5 py-0.5 text-[11px] font-bold text-white">
            4.6
            <Star size={10} className="fill-current" aria-hidden />
          </span>
        </div>
        <div className="flex items-center justify-center gap-4 text-[11px] text-text-muted">
          <span className="inline-flex items-center gap-1">
            <ShieldCheck size={12} className="text-success flex-shrink-0" aria-hidden />
            Secure Payment
          </span>
          <span className="inline-flex items-center gap-1">
            <RotateCcw size={12} className="text-success flex-shrink-0" aria-hidden />
            7-Day Returns
          </span>
        </div>
      </div>
    </div>
  );
};

export default PurchasePanel;
