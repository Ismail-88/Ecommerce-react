import React, { useMemo } from "react";
import { Tag, Zap, Star, ShieldCheck, CreditCard, Truck } from "lucide-react";
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
    <div className="rounded-2xl border border-border bg-surface shadow-card p-6 space-y-4">
      {/* Flash sale countdown */}
      <div className="lg:hidden">
        <LiveCountdownTimer />
      </div>
      <div className="hidden lg:block">
        <LiveCountdownTimer compact />
      </div>

      {/* Price row */}
      <div className="flex items-baseline gap-3 flex-wrap">
        <span className="text-4xl font-extrabold text-foreground">{formatINR(price)}</span>
        <span className="text-lg text-text-faint line-through">{formatINR(originalPrice)}</span>
        <span className="text-base font-bold text-success">{discount}% off</span>
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

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider">
            Available Offers
          </h3>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-info">
            <CreditCard size={12} aria-hidden />
            3 offers
          </span>
        </div>

        {offers.map(({ icon: Icon, title, desc }, i) => (
          <div
            key={i}
            className="flex items-start gap-3 p-3 rounded-xl border border-border bg-surface-alt hover:border-brand-400 transition-colors"
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
  );
};

export default PriceCard;
