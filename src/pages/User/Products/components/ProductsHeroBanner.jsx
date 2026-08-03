// components/products/ProductsHeroBanner.jsx
import React from 'react';
import { ArrowRight, Sparkles, Star, Boxes, Tags, Crown } from 'lucide-react';

const ProductsHeroBanner = ({ itemCount = 0, categoryCount = 0 }) => {
  return (
    <section className="relative overflow-hidden rounded-[2rem] mb-10">
      {/* Gradient backdrop */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-700 via-brand-600 to-info" aria-hidden />

      {/* Decorative blobs & grid */}
      <div className="absolute inset-0" aria-hidden>
        <div className="absolute -top-24 -left-16 w-96 h-96 bg-white/10 rounded-full blur-[110px]" />
        <div className="absolute -bottom-28 -right-16 w-96 h-96 bg-warning/20 rounded-full blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:44px_44px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-14 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left copy */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur border border-white/20 px-4 py-1.5 mb-6">
              <Crown size={14} className="text-warning" aria-hidden />
              <span className="text-xs font-bold text-white uppercase tracking-widest">
                ShopSphere Premium
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-white leading-[1.05] tracking-tight mb-5">
              Upgrade your
              <span className="block bg-gradient-to-r from-amber-200 via-white to-cyan-100 bg-clip-text text-transparent">
                everyday essentials
              </span>
            </h1>

            <p className="text-white/85 text-base md:text-lg max-w-lg leading-relaxed mb-8">
              Handpicked, verified, and loved by thousands. Free express delivery,
              7-day returns, and a promise of genuine products — always.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#shop-grid"
                className="inline-flex items-center gap-2 rounded-xl bg-white text-brand-700 px-7 py-3.5 text-sm font-bold shadow-lg shadow-black/10 hover:gap-3 hover:bg-white/95 transition-all"
              >
                Shop Now
                <ArrowRight size={16} aria-hidden />
              </a>
              <a
                href="#trending"
                className="inline-flex items-center gap-2 rounded-xl bg-white/10 backdrop-blur border border-white/25 text-white px-7 py-3.5 text-sm font-bold hover:bg-white/20 transition-all"
              >
                <Sparkles size={16} aria-hidden />
                Explore Deals
              </a>
            </div>
          </div>

          {/* Right floating stats */}
          <div className="lg:col-span-5 hidden md:block">
            <div className="relative h-64">
              <div className="absolute top-0 left-0 w-56 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-5 animate-float">
                <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-white/15 mb-3">
                  <Boxes size={20} className="text-white" aria-hidden />
                </span>
                <p className="text-3xl font-black text-white">{itemCount}+</p>
                <p className="text-xs font-semibold text-white/75 mt-1">Curated products</p>
              </div>

              <div
                className="absolute top-10 right-4 w-52 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-5 animate-float"
                style={{ animationDelay: "1.2s" }}
              >
                <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-white/15 mb-3">
                  <Tags size={20} className="text-white" aria-hidden />
                </span>
                <p className="text-3xl font-black text-white">{categoryCount}</p>
                <p className="text-xs font-semibold text-white/75 mt-1">Categories</p>
              </div>

              <div
                className="absolute bottom-0 left-16 w-48 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-5 animate-float"
                style={{ animationDelay: "2.1s" }}
              >
                <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-warning/30 mb-3">
                  <Star size={20} className="text-warning fill-current" aria-hidden />
                </span>
                <p className="text-3xl font-black text-white">4.8</p>
                <p className="text-xs font-semibold text-white/75 mt-1">Avg. rating</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsHeroBanner;
