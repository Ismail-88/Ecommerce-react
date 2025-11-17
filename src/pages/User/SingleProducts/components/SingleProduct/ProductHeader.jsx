
import React from 'react';
import { Crown, Star } from 'lucide-react';

const ProductHeader = ({ title, brand, category, reviewStats }) => {
  return (
    <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-3xl p-6">
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5"></div>
      <div className="relative">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl px-4 py-2 mb-4">
          <Crown className="w-4 h-4 text-yellow-400" />
          <span className="text-sm font-bold text-gray-300">PREMIUM PRODUCT</span>
        </div>
        
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        
        <div className="flex items-center gap-4 mb-4">
          {reviewStats.total > 0 ? (
            <>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/30">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-bold text-yellow-400">{reviewStats.average}</span>
              </div>
              <span className="text-gray-400">
                {reviewStats.total} Reviews
              </span>
            </>
          ) : (
            <span className="text-gray-500">No reviews yet</span>
          )}
        </div>
        
        <div className="flex items-center gap-4 text-sm">
          <span className="text-cyan-400 font-semibold">Special Price</span>
          <span className="text-gray-500">•</span>
          <span className="text-gray-400">Brand: {brand}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductHeader;
