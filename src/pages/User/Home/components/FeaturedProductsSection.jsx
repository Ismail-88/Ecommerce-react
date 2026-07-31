// // components/home/FeaturedProductsSection.jsx
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { ArrowRight, Star, Crown } from 'lucide-react';

// const FeaturedProductsSection = ({ products }) => {
//   if (!products || products.length === 0) return null;

//   return (
//     <div className="py-24 relative">
//       <div className="max-w-7xl mx-auto px-4 md:px-6">
//         <div className="flex items-end justify-between mb-12">
//           <div>
//             <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-2xl px-4 py-2 mb-4">
//               <Crown className="w-4 h-4 text-yellow-400" />
//               <span className="text-xs font-bold text-gray-300">HANDPICKED</span>
//             </div>
//             <h2 className="text-4xl md:text-5xl font-black mb-2">Featured Products</h2>
//             <p className="text-gray-400">Excellence in every detail</p>
//           </div>
//           <Link to="/products">
//             <button className="hidden md:flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-2xl px-6 py-3 font-bold hover:border-cyan-500/30 transition-all">
//               View All
//               <ArrowRight className="w-5 h-5" />
//             </button>
//           </Link>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {products.map((product, index) => (
//             <div
//               key={index}
//               className="group relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-2xl overflow-hidden hover:border-cyan-500/30 hover:scale-[1.02] transition-all"
//             >
//               <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-blue-500/0 to-purple-500/0 group-hover:from-cyan-500/5 group-hover:via-blue-500/5 group-hover:to-purple-500/5 transition-all"></div>
//               <div className="relative h-64 bg-gradient-to-br from-white/5 to-transparent p-6 flex items-center justify-center overflow-hidden">
//                 <img
//                   src={product.images}
//                   alt={product.title}
//                   className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-700"
//                 />
//                 <div className="absolute top-4 right-4 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 px-3 py-1.5 text-xs font-bold shadow-lg">
//                   NEW
//                 </div>
//               </div>
//               <div className="relative p-6">
//                 <h3 className="text-base font-bold mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors">
//                   {product.title}
//                 </h3>
//                 <div className="flex items-center justify-between mb-4">
//                   <span className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
//                     ${product.price}
//                   </span>
//                   <div className="flex items-center gap-1">
//                     <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
//                     <span className="text-sm font-bold text-gray-400">4.9</span>
//                   </div>
//                 </div>
//                 <Link to={`/products/${product._id}`}>
//                   <button className="relative w-full overflow-hidden group/btn rounded-xl">
//                     <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600"></div>
//                     <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
//                     <span className="relative block py-3 text-sm font-bold text-white">
//                       Add to Collection
//                     </span>
//                   </button>
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FeaturedProductsSection;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Heart, Eye, ShoppingCart, Sparkles } from 'lucide-react';

const FeaturedProductsSection = ({ products }) => {
  const [hoveredId, setHoveredId] = useState(null);

  if (!products || products.length === 0) return null;

  return (
    <div className="py-24 relative bg-slate-950">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-40 left-20 w-96 h-96 bg-purple-500/30 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-cyan-500/30 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 mb-4">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-bold text-yellow-400">HANDPICKED FOR YOU</span>
            </div>
            <h2 className="text-5xl font-black text-white mb-3">
              Featured Products
            </h2>
            <p className="text-gray-400 text-lg">Excellence in every detail</p>
          </div>
          <Link to="/products">
            <button className="hidden lg:flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-full hover:scale-105 transition-all shadow-xl">
              View All
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 8).map((product, index) => (
            <div
              key={product._id || index}
              className="group relative"
              onMouseEnter={() => setHoveredId(product._id || index)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Card */}
              <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl overflow-hidden border border-white/10 hover:border-cyan-500/50 transition-all hover:shadow-2xl hover:shadow-cyan-500/20">
                {/* Product Image */}
                <div className="relative aspect-square bg-gradient-to-br from-slate-700 to-slate-800 overflow-hidden">
                  <img
                    src={product.images}
                    alt={product.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button className="w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform delay-75">
                      <Heart className="w-5 h-5 text-black" />
                    </button>
                    <button className="w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform delay-100">
                      <Eye className="w-5 h-5 text-black" />
                    </button>
                    <Link to={`/products/${product._id}`}>
                      <button className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform delay-150 shadow-lg">
                        <ShoppingCart className="w-5 h-5 text-white" />
                      </button>
                    </Link>
                  </div>

                  {/* Badges */}
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                    NEW
                  </div>
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-xl text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/20">
                    -30%
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-5 space-y-3">
                  <h3 className="text-base font-bold text-white line-clamp-2 group-hover:text-cyan-400 transition-colors min-h-[3rem]">
                    {product.title}
                  </h3>

                  {/* Rating & Category */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-3.5 h-3.5 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-600 text-gray-600'}`}
                        />
                      ))}
                      <span className="text-xs text-gray-400 ml-1">(4.9)</span>
                    </div>
                    <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded-full">
                      Electronics
                    </span>
                  </div>

                  {/* Price & Button */}
                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <div className="text-2xl font-black text-white">
                        ${product.price}
                      </div>
                      <div className="text-xs text-gray-500 line-through">
                        ${Math.round(product.price * 1.3)}
                      </div>
                    </div>
                    <Link to={`/products/${product._id}`}>
                      <button className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white text-sm font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-cyan-500/25 transition-all hover:scale-105">
                        Add
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Floating Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/10 group-hover:to-purple-500/10 rounded-3xl blur-2xl transition-all duration-500 -z-10"></div>
            </div>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="lg:hidden mt-8 text-center">
          <Link to="/products">
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-all shadow-xl">
              View All Products
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProductsSection;