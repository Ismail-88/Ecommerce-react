// components/home/CategoriesGrid.jsx
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ChevronRight } from 'lucide-react';

const CategoriesGrid = () => {
  const categories = useMemo(() => [
    { name: 'Premium Tech', icon: '💎', gradient: 'from-cyan-500/20 via-blue-500/20 to-purple-500/20', border: 'border-cyan-500/30' },
    { name: 'Luxury Fashion', icon: '👑', gradient: 'from-purple-500/20 via-pink-500/20 to-rose-500/20', border: 'border-purple-500/30' },
    { name: 'Elite Living', icon: '✨', gradient: 'from-blue-500/20 via-indigo-500/20 to-purple-500/20', border: 'border-blue-500/30' },
    { name: 'Pro Sports', icon: '⚡', gradient: 'from-emerald-500/20 via-teal-500/20 to-cyan-500/20', border: 'border-emerald-500/30' },
  ], []);

  return (
    <div className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_70%)]"></div>
      <div className="relative max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-2xl px-5 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-bold text-gray-300">PREMIUM COLLECTIONS</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-4">
            Shop by
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent"> Category</span>
          </h2>
          <p className="text-gray-400 text-lg">Curated selections for the elite</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link key={index} to="/products">
              <div className={`group relative rounded-3xl border ${category.border} bg-gradient-to-br ${category.gradient} backdrop-blur-xl overflow-hidden aspect-square cursor-pointer transition-all hover:scale-[1.02]`}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative h-full flex flex-col justify-between p-8">
                  <div className="text-6xl group-hover:scale-110 transition-transform">{category.icon}</div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-400 group-hover:text-cyan-400 transition-colors">
                      Explore Collection
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesGrid;