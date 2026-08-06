// components/checkout/DiscountPanel.jsx
import React, { useState } from "react";
import { Tag, X, Sparkles, Loader2 } from "lucide-react";
import { formatINR } from "../../../../utils/formatCurrency";

const DiscountPanel = ({
  rewardPoints,
  coupon,
  couponDiscount,
  pointsUsed,
  pointsDiscount,
  totalDiscount,
  validating,
  onApplyCoupon,
  onRemoveCoupon,
  onPointsChange,
}) => {
  const [code, setCode] = useState("");

  return (
    <div className="rounded-2xl border border-border bg-surface shadow-card p-6 lg:sticky lg:top-24 space-y-5">
      <h2 className="text-xl font-bold text-foreground">Discounts &amp; Offers</h2>

      {/* Coupon */}
      <div>
        <label htmlFor="couponCode" className="block text-sm font-bold text-text-muted uppercase tracking-wider mb-2">
          Coupon Code
        </label>
        {coupon ? (
          <div className="flex items-center justify-between gap-2 rounded-xl border border-success/30 bg-success-soft px-4 py-3">
            <div className="flex items-center gap-2 min-w-0">
              <Tag size={16} className="text-success flex-shrink-0" aria-hidden />
              <div className="min-w-0">
                <p className="font-bold text-success">{coupon.code}</p>
                <p className="text-xs text-success">You saved {formatINR(couponDiscount)}</p>
              </div>
            </div>
            <button
              onClick={onRemoveCoupon}
              aria-label="Remove coupon"
              className="p-1.5 rounded-lg text-success hover:bg-success/10 transition-colors"
            >
              <X size={16} aria-hidden />
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <input
              id="couponCode"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter coupon code"
              className="flex-1 min-w-0 px-4 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-text-faint focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-sm transition-all"
            />
            <button
              onClick={() => {
                onApplyCoupon(code).then((ok) => {
                  if (ok) setCode("");
                });
              }}
              disabled={validating}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-700 transition-colors flex-shrink-0"
            >
              {validating ? <Loader2 size={15} className="animate-spin" aria-hidden /> : <Tag size={15} aria-hidden />}
              Apply
            </button>
          </div>
        )}
      </div>

      {/* Reward Points */}
      <div>
        <label htmlFor="pointsUsed" className="block text-sm font-bold text-text-muted uppercase tracking-wider mb-2">
          Redeem Reward Points
        </label>
        <div className="rounded-xl border border-border bg-surface-alt p-3 space-y-2">
          <p className="text-xs text-text-muted flex items-center gap-1.5">
            <Sparkles size={13} className="text-brand-600 dark:text-brand-400" aria-hidden />
            Available: <span className="font-bold text-foreground">{rewardPoints} pts</span>
            <span className="text-text-faint">(1 pt = ₹1)</span>
          </p>
          <div className="flex items-center gap-2">
            <input
              id="pointsUsed"
              type="number"
              min="0"
              max={rewardPoints}
              value={pointsUsed}
              onChange={(e) => onPointsChange(e.target.value)}
              disabled={rewardPoints <= 0}
              placeholder="0"
              className="flex-1 min-w-0 px-4 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-text-faint focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-sm transition-all disabled:opacity-50"
            />
            <span className="text-sm font-bold text-foreground flex-shrink-0">{formatINR(pointsDiscount)}</span>
          </div>
        </div>
      </div>

      {/* Total discount summary */}
      {totalDiscount > 0 && (
        <div className="flex items-center justify-between rounded-xl border border-success/30 bg-success-soft px-4 py-3">
          <span className="text-sm font-bold text-success">Total Discount</span>
          <span className="text-lg font-extrabold text-success">- {formatINR(totalDiscount)}</span>
        </div>
      )}
    </div>
  );
};

export default DiscountPanel;
