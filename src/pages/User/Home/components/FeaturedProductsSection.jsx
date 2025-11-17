// components/home/FeaturedProductsSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Crown } from 'lucide-react';

const FeaturedProductsSection = ({ products }) => {
  if (!products || products.length === 0) return null;

  return (
    <div className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-2xl px-4 py-2 mb-4">
              <Crown className="w-4 h-4 text-yellow-400" />
              <span className="text-xs font-bold text-gray-300">HANDPICKED</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-2">Featured Products</h2>
            <p className="text-gray-400">Excellence in every detail</p>
          </div>
          <Link to="/products">
            <button className="hidden md:flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-2xl px-6 py-3 font-bold hover:border-cyan-500/30 transition-all">
              View All
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div
              key={index}
              className="group relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-2xl overflow-hidden hover:border-cyan-500/30 hover:scale-[1.02] transition-all"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-blue-500/0 to-purple-500/0 group-hover:from-cyan-500/5 group-hover:via-blue-500/5 group-hover:to-purple-500/5 transition-all"></div>
              <div className="relative h-64 bg-gradient-to-br from-white/5 to-transparent p-6 flex items-center justify-center overflow-hidden">
                <img
                  src={product.images}
                  alt={product.title}
                  className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 px-3 py-1.5 text-xs font-bold shadow-lg">
                  NEW
                </div>
              </div>
              <div className="relative p-6">
                <h3 className="text-base font-bold mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors">
                  {product.title}
                </h3>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    ${product.price}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-bold text-gray-400">4.9</span>
                  </div>
                </div>
                <Link to={`/products/${product._id}`}>
                  <button className="relative w-full overflow-hidden group/btn rounded-xl">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                    <span className="relative block py-3 text-sm font-bold text-white">
                      Add to Collection
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProductsSection;