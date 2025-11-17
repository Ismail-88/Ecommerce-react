
import React, { useMemo } from 'react';
import { Tag, Zap, Star } from 'lucide-react';

const PriceCard = ({ price, originalPrice, discount }) => {
  const offers = useMemo(() => [
    { icon: Tag, title: 'Bank Offer', desc: '10% instant discount on HDFC Bank Cards, up to $150' },
    { icon: Zap, title: 'Partner Offer', desc: 'Sign-up for ShopSphere Pay & get benefits worth $1000' },
    { icon: Star, title: 'Special Price', desc: `Save $${originalPrice - price} with this exclusive deal` }
  ], [originalPrice, price]);

  return (
    <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-3xl p-6">
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5"></div>
      <div className="relative">
        <div className="flex items-baseline gap-4 mb-6">
          <span className="text-5xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            ${price}
          </span>
          <span className="text-2xl text-gray-600 line-through">
            ${originalPrice}
          </span>
          <span className="text-xl font-bold text-cyan-400">
            {discount}% off
          </span>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Available Offers</h3>
          {offers.map((offer, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
                <offer.icon className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <p className="font-semibold text-sm mb-1">{offer.title}</p>
                <p className="text-xs text-gray-400">{offer.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PriceCard;