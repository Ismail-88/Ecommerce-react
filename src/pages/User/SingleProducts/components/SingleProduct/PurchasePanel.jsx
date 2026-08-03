import React from "react";
import { ShoppingBag, Zap } from "lucide-react";
import Button from "../../../../../components/ui/Button";
import PriceCard from "./PriceCard";
import QuantitySelector from "./QuantitySelector";
import TrustBadges from "./TrustBadges";

const PurchasePanel = ({
  product,
  pricing,
  quantity,
  setQuantity,
  onAddToCart,
  onBuyNow,
}) => {
  const isOutOfStock = product.stock === 0;

  return (
    <div className="lg:sticky lg:top-24">
      <PriceCard
        price={product.price}
        originalPrice={pricing.originalPrice}
        discount={product.discount}
        stock={product.stock}
      />

      {/* Quantity + actions */}
      <div className="hidden lg:block rounded-2xl border border-border bg-surface shadow-card p-5 mt-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-1.5">
              Quantity
            </p>
            <QuantitySelector
              quantity={quantity}
              setQuantity={setQuantity}
              max={Math.max(1, product.stock || 10)}
            />
          </div>
          <div className="text-right">
            <p className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-1">
              Total
            </p>
            <p className="font-extrabold text-foreground text-lg tabular-nums">
              ₹{(product.price * quantity).toLocaleString("en-IN")}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={onAddToCart}
            size="lg"
            disabled={isOutOfStock}
            className="flex-1 justify-center"
          >
            <ShoppingBag size={18} aria-hidden />
            Add to Cart
          </Button>
          <Button
            onClick={onBuyNow}
            size="lg"
            variant="secondary"
            disabled={isOutOfStock}
            className="flex-1 justify-center"
          >
            <Zap size={18} aria-hidden />
            Buy Now
          </Button>
        </div>

        {isOutOfStock && (
          <p className="mt-3 text-xs font-semibold text-danger text-center">
            This product is currently out of stock
          </p>
        )}
      </div>

      <div className="hidden lg:block mt-4">
        <TrustBadges compact />
      </div>
    </div>
  );
};

export default PurchasePanel;
