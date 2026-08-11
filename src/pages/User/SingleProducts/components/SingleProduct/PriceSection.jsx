import React, { useMemo } from "react";
import { Tag, Zap, Star, ShieldCheck, CreditCard, Gift, Sparkles } from "lucide-react";
import { formatINR } from "../../../../../utils/formatCurrency";

const PriceSection = ({ price, originalPrice, discount, stock }) => {
  const savings = Math.max(0, originalPrice - price);

  const offers = useMemo(
    () => [
      {
        icon: Tag,
        title: "Bank Offer",
        desc: `10% instant discount on HDFC Bank Credit and Debit Cards, up to ${formatINR(150)}`,
      },
      {
        icon: CreditCard,
        title: "No Cost EMI",
        desc: `Starting from ${formatINR(Math.ceil(price / 6))}/month. No cost EMI available on this product`,
      },
      {
        icon: Zap,
        title: "Partner Offer",
        desc: `Sign-up for ShopSphere Pay & get benefits worth ${formatINR(1000)} on this purchase`,
      },
      {
        icon: Star,
        title: "Special Price",
        desc: `Get extra 5% off on payments made with ShopSphere Wallet`,
      },
    ],
    [price]
  );

  return (
    <div className="bg-surface border border-border rounded-lg p-4 space-y-3">
      {/* Price row */}
      <div className="flex items-baseline gap-2.5 flex-wrap">
        <span className="text-3xl font-bold text-foreground">{formatINR(price)}</span>
        <span className="text-base text-text-faint line-through">{formatINR(originalPrice)}</span>
        <span className="text-lg font-semibold text-success">{discount}% off</span>
      </div>

      {savings > 0 && (
        <p className="text-xs text-text-muted">
          <span className="font-semibold text-success">You save {formatINR(savings)}</span> with this exclusive deal
        </p>
      )}

      <p className="text-xs text-text-faint">Inclusive of all taxes</p>

      {/* Reward points */}
      <div className="flex items-center gap-2 rounded-md bg-brand-soft border border-brand-500/30 px-3 py-2">
        <Sparkles size={14} className="text-brand-600 flex-shrink-0" aria-hidden />
        <p className="text-xs text-foreground">
          Earn <span className="font-bold text-brand-600">{Math.floor(price / 10)} points</span> on this order
          <span className="text-text-muted"> · Redeem at checkout</span>
        </p>
      </div>

      {/* Available Offers */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="inline-flex items-center gap-1.5 text-sm font-bold text-foreground">
            <Gift size={16} className="text-success" aria-hidden />
            Available Offers
          </h3>
          <span className="text-xs font-semibold text-info">
            {offers.length} offers
          </span>
        </div>

        <div className="space-y-2.5">
          {offers.map((offer) => {
            const OfferIcon = offer.icon;
            return (
              <div key={offer.title} className="flex items-start gap-2.5">
                <OfferIcon size={15} className="text-success mt-0.5 flex-shrink-0" aria-hidden />
                <p className="text-xs leading-relaxed text-text-secondary">
                  <span className="font-bold text-foreground">{offer.title}: </span>
                  {offer.desc}
                  <span className="text-info font-medium"> T&C</span>
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Assurance strip */}
      <div className="flex items-center gap-2 pt-1 text-xs text-text-muted">
        <ShieldCheck size={14} className="text-success flex-shrink-0" aria-hidden />
        <span>
          Assured quality · 100% genuine products · Easy 7-day returns
          {!stock && <span className="text-danger font-semibold"> · Out of stock</span>}
        </span>
      </div>
    </div>
  );
};

export default PriceSection;
