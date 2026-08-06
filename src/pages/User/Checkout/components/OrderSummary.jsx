import React from "react";
import { ShoppingBag, Tag } from "lucide-react";
import Button from "../../../../components/ui/Button";
import { formatINR } from "../../../../utils/formatCurrency";

const OrderSummary = ({ cartItem, pricing, isSubmitting }) => {
  const discount = pricing.discount || 0;
  return (
    <div className="lg:col-span-1">
      <div className="rounded-xl border border-border bg-surface p-6 lg:sticky lg:top-24">
        <div className="flex items-center gap-3 mb-6">
          <span className="flex items-center justify-center w-11 h-11 rounded-lg bg-primary-soft text-brand-600 dark:text-brand-400">
            <ShoppingBag size={21} aria-hidden />
          </span>
          <h2 className="text-lg font-bold text-foreground">Order Summary</h2>
        </div>

        {/* Items List */}
        <div className="space-y-3 mb-5 max-h-[380px] overflow-y-auto pr-1">
          {cartItem.map((item, index) => (
            <div key={index} className="flex gap-3 rounded-xl border border-border bg-surface-alt p-3">
              <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-surface flex-shrink-0">
                <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold line-clamp-2 text-foreground">{item.title}</h3>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-text-muted">
                    Qty: <span className="font-semibold text-foreground">{item.quantity}</span>
                  </span>
                  <span className="text-sm font-bold text-foreground">
                    {formatINR(item.price * item.quantity)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-border my-4" aria-hidden />

        {/* Price Breakdown */}
        <div className="space-y-3 text-sm">
          <div className="flex justify-between text-text-muted">
            <span>Subtotal</span>
            <span className="font-semibold text-foreground">{formatINR(pricing.subtotal)}</span>
          </div>
          <div className="flex justify-between items-center text-text-muted">
            <span>Delivery Fee</span>
            <span className="flex items-center gap-1.5">
              <span className="line-through text-text-faint">₹25</span>
              <span className="inline-flex items-center gap-1 rounded bg-success-soft text-success text-xs font-bold px-2 py-0.5">
                <Tag size={10} aria-hidden />
                FREE
              </span>
            </span>
          </div>
          <div className="flex justify-between text-text-muted">
            <span>Handling Fee</span>
            <span className="font-semibold text-foreground">{formatINR(pricing.handlingFee)}</span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between items-center text-text-muted">
              <span className="flex items-center gap-1.5">
                <Tag size={13} aria-hidden />
                Discount
              </span>
              <span className="font-semibold text-success">- {formatINR(discount)}</span>
            </div>
          )}

          <div className="border-t border-border pt-3 flex justify-between items-center">
            <span className="font-bold text-foreground">Total</span>
            <span className="text-2xl font-extrabold text-foreground">{formatINR(pricing.grandTotal)}</span>
          </div>
        </div>

        {/* Place Order */}
        <Button type="submit" size="lg" className="w-full justify-center mt-6" loading={isSubmitting} disabled={isSubmitting}>
          {isSubmitting ? "Processing..." : "Place Order"}
        </Button>

        <p className="text-xs text-text-muted text-center mt-4">
          By placing your order, you agree to our terms &amp; conditions.
        </p>
      </div>
    </div>
  );
};

export default OrderSummary;
