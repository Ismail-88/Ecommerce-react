// // components/home/CategoriesGrid.jsx
// import React, { useMemo } from 'react';
// import { Link } from 'react-router-dom';
// import { Sparkles, ChevronRight } from 'lucide-react';

// const CategoriesGrid = () => {
//   const categories = useMemo(() => [
//     { name: 'Premium Tech', icon: '💎', gradient: 'from-cyan-500/20 via-blue-500/20 to-purple-500/20', border: 'border-cyan-500/30' },
//     { name: 'Luxury Fashion', icon: '👑', gradient: 'from-purple-500/20 via-pink-500/20 to-rose-500/20', border: 'border-purple-500/30' },
//     { name: 'Elite Living', icon: '✨', gradient: 'from-blue-500/20 via-indigo-500/20 to-purple-500/20', border: 'border-blue-500/30' },
//     { name: 'Pro Sports', icon: '⚡', gradient: 'from-emerald-500/20 via-teal-500/20 to-cyan-500/20', border: 'border-emerald-500/30' },
//   ], []);

//   return (
//     <div className="py-24 md:py-32 relative overflow-hidden">
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_70%)]"></div>
//       <div className="relative max-w-7xl mx-auto px-4 md:px-6">
//         <div className="text-center mb-16">
//           <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-2xl px-5 py-2 mb-6">
//             <Sparkles className="w-4 h-4 text-cyan-400" />
//             <span className="text-sm font-bold text-gray-300">PREMIUM COLLECTIONS</span>
//           </div>
//           <h2 className="text-4xl md:text-6xl font-black mb-4">
//             Shop by
//             <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent"> Category</span>
//           </h2>
//           <p className="text-gray-400 text-lg">Curated selections for the elite</p>
//         </div>

//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
//           {categories.map((category, index) => (
//             <Link key={index} to="/products">
//               <div className={`group relative rounded-3xl border ${category.border} bg-gradient-to-br ${category.gradient} backdrop-blur-xl overflow-hidden aspect-square cursor-pointer transition-all hover:scale-[1.02]`}>
//                 <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
//                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
//                 <div className="relative h-full flex flex-col justify-between p-8">
//                   <div className="text-6xl group-hover:scale-110 transition-transform">{category.icon}</div>
//                   <div>
//                     <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
//                     <div className="flex items-center gap-2 text-sm text-gray-400 group-hover:text-cyan-400 transition-colors">
//                       Explore Collection
//                       <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CategoriesGrid;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp } from 'lucide-react';

const CategoriesGrid = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const categories = [
    { 
      name: 'Premium Tech', 
      icon: '💎',
      items: '2.5K+ Items',
      trending: true,
      image: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=800',
      gradient: 'from-cyan-500 to-blue-600',
      iconBg: 'bg-cyan-500/20'
    },
    { 
      name: 'Luxury Fashion', 
      icon: '👑',
      items: '1.8K+ Items',
      trending: true,
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800',
      gradient: 'from-purple-500 to-pink-600',
      iconBg: 'bg-purple-500/20'
    },
    { 
      name: 'Elite Living', 
      icon: '✨',
      items: '3.2K+ Items',
      trending: false,
      image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800',
      gradient: 'from-indigo-500 to-purple-600',
      iconBg: 'bg-indigo-500/20'
    },
    { 
      name: 'Pro Sports', 
      icon: '⚡',
      items: '1.5K+ Items',
      trending: false,
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800',
      gradient: 'from-emerald-500 to-teal-600',
      iconBg: 'bg-emerald-500/20'
    },
  ];

  return (
    <div className="py-24 relative bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 mb-4">
              <span className="text-sm font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                EXPLORE COLLECTIONS
              </span>
            </div>
            <h2 className="text-5xl font-black text-white mb-3">
              Shop by Category
            </h2>
            <p className="text-gray-400 text-lg">Curated selections for every lifestyle</p>
          </div>
          <Link to="/products">
            <button className="hidden lg:flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-full hover:scale-105 transition-all">
              View All
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link key={index} to="/products">
              <div 
                className="group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-20 group-hover:opacity-40 transition-opacity`}></div>
                </div>

                {/* Animated Border */}
                <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity border-2 border-transparent bg-gradient-to-r ${category.gradient} bg-clip-border`} style={{ WebkitMaskComposite: 'xor', maskComposite: 'exclude' }}></div>

                {/* Content */}
                <div className="relative h-full flex flex-col justify-between p-6">
                  {/* Top Badge */}
                  <div className="flex items-start justify-between">
                    <div className={`${category.iconBg} backdrop-blur-xl border border-white/20 w-16 h-16 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform`}>
                      {category.icon}
                    </div>
                    {category.trending && (
                      <div className="flex items-center gap-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                        <TrendingUp className="w-3 h-3" />
                        Trending
                      </div>
                    )}
                  </div>

                  {/* Bottom Info */}
                  <div>
                    <div className="mb-3">
                      <h3 className="text-2xl font-black text-white mb-1 group-hover:text-cyan-400 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-400">{category.items}</p>
                    </div>
                    <div className="flex items-center gap-2 text-white group-hover:gap-4 transition-all">
                      <span className="text-sm font-bold">Explore Now</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Hover Glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity`}></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesGrid;