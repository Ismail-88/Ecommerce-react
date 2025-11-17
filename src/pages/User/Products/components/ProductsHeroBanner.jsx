// components/products/ProductsHeroBanner.jsx
import React from 'react';
import { Crown } from 'lucide-react';

const ProductsHeroBanner = () => {
  return (
    <div className="relative py-20 overflow-hidden border-b border-white/5">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[150px]"></div>
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.05),transparent_70%)]"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 md:px-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-2xl px-5 py-2.5 mb-6">
          <Crown className="w-5 h-5 text-yellow-400 animate-pulse" />
          <span className="text-sm font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            EXCLUSIVE COLLECTION
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black mb-4">
          <span className="block mb-2">Premium</span>
          <span className="relative inline-block">
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 blur-2xl opacity-50"></span>
            <span className="relative bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Products
            </span>
          </span>
        </h1>
        <p className="text-gray-400 text-xl max-w-2xl mx-auto">
          Discover our curated collection of luxury items
        </p>
      </div>
    </div>
  );
};

export default ProductsHeroBanner;