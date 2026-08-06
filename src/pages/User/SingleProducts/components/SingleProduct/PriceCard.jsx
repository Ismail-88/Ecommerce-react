import React, { useMemo } from "react";
import { Tag, Zap, Star, ShieldCheck, CreditCard, Truck, Sparkles, Gift } from "lucide-react";
import LiveCountdownTimer from "./LiveCountdownTimer";

const formatINR = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

const PriceCard = ({ price, originalPrice, discount, stock }) => {
  const savings = Math.max(0, originalPrice - price);
  const isOutOfStock = stock === 0;
  const lowStock = stock > 0 && stock <= 10;
  const stockPercent = isOutOfStock
    ? 100
    : Math.min(100, Math.max(8, Math.round((stock / 50) * 100)));

  const offers = useMemo(
    () => [
      {
        icon: Tag,
        title: "Bank Offer",
        desc: `10% instant discount on HDFC Bank Cards, up to ${formatINR(150)}`,
      },
      {
        icon: Zap,
        title: "Partner Offer",
        desc: `Sign-up for ShopSphere Pay & get benefits worth ${formatINR(1000)}`,
      },
      {
        icon: Star,
        title: "Special Price",
        desc: `Save ${formatINR(savings)} with this exclusive deal`,
      },
    ],
    [savings]
  );

  return (
    <div className="rounded-xl border border-border bg-surface p-5 space-y-4">
      {/* Flash sale countdown */}
      <div className="lg:hidden">
        <LiveCountdownTimer />
      </div>
      <div className="hidden lg:block">
        <LiveCountdownTimer compact />
      </div>

      {/* Price row */}
      <div className="flex items-baseline gap-3 flex-wrap">
        <span className="text-3xl font-extrabold text-foreground">{formatINR(price)}</span>
        <span className="text-base text-text-faint line-through">{formatINR(originalPrice)}</span>
        <span className="text-sm font-bold text-success">{discount}% off</span>
      </div>

      {/* Savings */}
      {savings > 0 && (
        <p className="inline-flex items-center gap-1.5 rounded-lg bg-success-soft text-success text-sm font-semibold px-3 py-1.5">
          <ShieldCheck size={15} aria-hidden />
          You save {formatINR(savings)} on this order
        </p>
      )}

      <p className="text-xs text-text-faint -mt-1">
        Inclusive of all taxes. EMI from {formatINR(Math.ceil(price / 6))}/mo.
      </p>

      {/* Reward points line */}
      <div className="flex items-center gap-2 rounded-lg bg-brand-soft border border-brand-500/30 px-3 py-2.5">
        <Sparkles size={15} className="text-brand-600 flex-shrink-0" aria-hidden />
        <p className="text-xs text-foreground">
          Earn <span className="font-extrabold text-brand-600">{Math.floor(price / 10)} points</span> on this order
          <span className="text-text-muted"> · Redeem at checkout</span>
        </p>
      </div>

      {/* Stock urgency bar */}
      {!isOutOfStock && (
        <div>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-bold text-danger inline-flex items-center gap-1">
              <Truck size={13} aria-hidden />
              {lowStock ? `Hurry! Only ${stock} left` : `${stock} in stock`}
            </span>
            <span className="font-semibold text-text-muted">Selling fast</span>
          </div>
          <div className="h-2 rounded-full bg-border-strong overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-danger to-orange-500 transition-all"
              style={{ width: `${stockPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* Available Offers */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="inline-flex items-center gap-1.5 text-xs font-bold text-success uppercase tracking-wider">
            <Gift size={13} aria-hidden />
            Available Offers
          </h3>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-info">
            <CreditCard size={12} aria-hidden />
            3 offers
          </span>
        </div>

        <div className="rounded-lg border border-success/30 bg-success-soft/50 p-3 mb-2">
          <p className="text-xs font-semibold text-success flex items-center gap-1.5">
            <Tag size={13} aria-hidden />
            Extra 5% off with coupon code at checkout
          </p>
        </div>

        <div className="space-y-2.5">
          {offers.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-3 rounded-lg border border-border bg-surface-alt hover:border-brand-400 transition-colors"
            >
              <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary-soft text-brand-600 dark:text-brand-400 flex-shrink-0">
                <Icon size={17} aria-hidden />
              </span>
              <div>
                <p className="font-semibold text-sm text-foreground mb-0.5">{title}</p>
                <p className="text-xs text-text-muted">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PriceCard;
