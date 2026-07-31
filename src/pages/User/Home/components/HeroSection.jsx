import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShoppingCart, Heart, Eye, Star, Sparkles, Package } from 'lucide-react';

const HeroSection = ({ heroProduct }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Mock products for carousel
  const products = [
    {
      id: 1,
      image: heroProduct?.images || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
      title: heroProduct?.title || 'Wireless Headphones Pro',
      price: heroProduct?.price || 299,
      category: 'Audio',
      rating: 4.8,
      color: 'from-indigo-600 to-purple-600'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800',
      title: 'Smart Watch Ultra',
      price: 449,
      category: 'Wearables',
      rating: 4.9,
      color: 'from-blue-600 to-cyan-600'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800',
      title: 'Designer Sunglasses',
      price: 199,
      category: 'Fashion',
      rating: 4.7,
      color: 'from-orange-600 to-pink-600'
    }
  ];

  const currentProduct = products[activeSlide];

  useEffect(() => {
    if (!isAutoPlay) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % products.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isAutoPlay, products.length]);

  const nextSlide = () => {
    setIsAutoPlay(false);
    setActiveSlide((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setIsAutoPlay(false);
    setActiveSlide((prev) => (prev - 1 + products.length) % products.length);
  };

  return (
    <div className="relative min-h-screen py-4 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/30 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/30 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative h-full max-w-[1800px] mx-auto">
        <div className="grid lg:grid-cols-2 h-full">
          {/* LEFT SIDE - Content */}
          <div className="relative flex flex-col justify-center px-12 xl:px-20 space-y-10">
            {/* Top Badge */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 backdrop-blur-xl">
                <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
                <span className="text-sm font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  2025 Collection
                </span>
              </div>

              {/* Main Headline */}
              <div>
                <h1 className="text-6xl xl:text-7xl font-black text-white leading-tight mb-6">
                  Elevate Your
                  <br />
                  <span className="relative inline-block mt-2">
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 blur-2xl opacity-50"></span>
                    <span className="relative bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                      Lifestyle
                    </span>
                  </span>
                </h1>
                <p className="text-xl text-gray-400 leading-relaxed max-w-xl">
                  Discover premium products handpicked by experts. Quality, innovation, and style in perfect harmony.
                </p>
              </div>
            </div>

            {/* Current Product Quick Info */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-400 mb-1">Now Showing</div>
                  <h3 className="text-2xl font-bold text-white">{currentProduct.title}</h3>
                </div>
                <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${currentProduct.color} text-white text-sm font-bold`}>
                  {currentProduct.category}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div>
                    <div className="text-3xl font-black text-white">{currentProduct.price}</div>
                    <div className="text-sm text-gray-500">Best Price</div>
                  </div>
                  <div className="w-px h-12 bg-white/20"></div>
                  <div>
                    <div className="flex items-center gap-1 text-lg font-bold text-white">
                      {currentProduct.rating} <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    </div>
                    <div className="text-sm text-gray-500">Rating</div>
                  </div>
                </div>

                <button className="group px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-2xl text-white font-bold flex items-center gap-2 shadow-lg shadow-blue-500/25 transition-all">
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button className="flex-1 px-8 py-4 bg-white hover:bg-gray-100 text-black font-bold rounded-2xl transition-all flex items-center justify-center gap-2 shadow-xl">
                <Package className="w-5 h-5" />
                View All Products
              </button>
              <button className="px-6 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/20 text-white font-bold rounded-2xl transition-all">
                <Eye className="w-5 h-5" />
              </button>
              <button className="px-6 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/20 text-white font-bold rounded-2xl transition-all">
                <Heart className="w-5 h-5" />
              </button>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 pt-4">
              <div>
                <div className="text-3xl font-black text-white">15K+</div>
                <div className="text-sm text-gray-500">Products</div>
              </div>
              <div className="w-px h-12 bg-white/20"></div>
              <div>
                <div className="text-3xl font-black text-white">50K+</div>
                <div className="text-sm text-gray-500">Customers</div>
              </div>
              <div className="w-px h-12 bg-white/20"></div>
              <div>
                <div className="text-3xl font-black text-white">4.9★</div>
                <div className="text-sm text-gray-500">Rating</div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - Product Carousel */}
          <div className="relative flex items-center justify-center p-8">
            {/* Carousel Container */}
            <div className="relative w-full max-w-2xl">
              {/* Background Glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${currentProduct.color} opacity-20 blur-[100px] rounded-full transition-all duration-700`}></div>

              {/* Main Carousel */}
              <div className="relative">
                {/* Product Cards Stack */}
                <div className="relative h-[600px] perspective-1000">
                  {products.map((product, index) => {
                    const offset = index - activeSlide;
                    const isActive = index === activeSlide;
                    
                    return (
                      <div
                        key={product.id}
                        className={`absolute inset-0 transition-all duration-700 ${
                          isActive ? 'z-30' : 'z-10'
                        }`}
                        style={{
                          transform: `
                            translateX(${offset * 100}px) 
                            translateY(${Math.abs(offset) * 20}px)
                            scale(${isActive ? 1 : 0.85})
                            rotateY(${offset * -15}deg)
                          `,
                          opacity: Math.abs(offset) > 1 ? 0 : isActive ? 1 : 0.5,
                          pointerEvents: isActive ? 'auto' : 'none'
                        }}
                      >
                        {/* Product Card */}
                        <div className="relative h-full group">
                          {/* Card Glow Effect */}
                          <div className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-0 group-hover:opacity-30 blur-2xl rounded-[40px] transition-opacity duration-500`}></div>
                          
                          {/* Card Content */}
                          <div className="relative h-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-[40px] p-8 shadow-2xl overflow-hidden">
                            {/* Animated Border on Hover */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className={`absolute inset-0 bg-gradient-to-r ${product.color} rounded-[40px] blur-xl`}></div>
                            </div>

                            {/* Product Image */}
                            <div className="relative mb-6 rounded-3xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 h-[400px]">
                              <img 
                                src={product.image}
                                alt={product.title}
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                              />
                              
                              {/* Floating Badges */}
                              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-xl rounded-2xl px-4 py-2 border border-white/20">
                                <div className="flex items-center gap-1">
                                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                  <span className="text-sm font-bold text-white">{product.rating}</span>
                                </div>
                              </div>

                              <div className={`absolute top-4 right-4 bg-gradient-to-r ${product.color} rounded-2xl px-4 py-2 text-white text-sm font-bold`}>
                                NEW
                              </div>

                              {/* Quick Actions */}
                              <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="w-12 h-12 bg-black/60 backdrop-blur-xl rounded-full flex items-center justify-center text-white border border-white/20 hover:bg-white/20 transition-all">
                                  <Heart className="w-5 h-5" />
                                </button>
                                <button className="w-12 h-12 bg-black/60 backdrop-blur-xl rounded-full flex items-center justify-center text-white border border-white/20 hover:bg-white/20 transition-all">
                                  <Eye className="w-5 h-5" />
                                </button>
                              </div>
                            </div>

                            {/* Product Info */}
                            <div className="relative">
                              <h3 className="text-2xl font-black text-white mb-2">
                                {product.title}
                              </h3>
                              <div className="flex items-center justify-between">
                                <div className="text-3xl font-black text-white">
                                  ${product.price}
                                </div>
                                <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${product.color} text-white text-sm font-bold`}>
                                  {product.category}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 z-40 w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center text-white transition-all group"
                >
                  <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 z-40 w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center text-white transition-all group"
                >
                  <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Dots Indicator */}
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-40">
                  {products.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setActiveSlide(index);
                        setIsAutoPlay(false);
                      }}
                      className={`transition-all ${
                        index === activeSlide
                          ? 'w-12 h-3 bg-gradient-to-r from-blue-500 to-purple-600'
                          : 'w-3 h-3 bg-white/30 hover:bg-white/50'
                      } rounded-full`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
};

export default HeroSection;