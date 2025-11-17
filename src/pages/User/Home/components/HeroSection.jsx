// components/home/HeroSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Award, Sparkles, Crown, Eye } from 'lucide-react';

const HeroSection = ({ heroProduct }) => {
  return (
    <div className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Animated Background Layers */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(6,182,212,0.15),transparent_50%)]"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_30%,rgba(59,130,246,0.15),transparent_50%)]"></div>
        <div className="absolute bottom-0 left-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_80%,rgba(168,85,247,0.15),transparent_50%)]"></div>
      </div>

      {/* Floating Grid Animation */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)] animate-grid"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-gradient-to-r from-white/5 to-white/[0.02] backdrop-blur-2xl px-5 py-3 mb-8 group hover:border-cyan-500/30 transition-all">
              <Crown className="w-5 h-5 text-yellow-400 animate-pulse" />
              <span className="text-sm font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                EXCLUSIVE COLLECTION 2025
              </span>
            </div>

            {/* Animated Title */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-[1.05]">
              <span className="block mb-2">Experience</span>
              <span className="relative inline-block">
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 blur-2xl opacity-50 animate-pulse-slow"></span>
                <span className="relative bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
                  Luxury
                </span>
              </span>
              <span className="block">Shopping</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Discover premium products curated exclusively for the discerning shopper. Elevate your lifestyle today.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Link to="/products">
                <button className="group relative overflow-hidden rounded-2xl">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.3),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span className="relative flex items-center justify-center gap-3 px-8 py-4 text-white font-bold">
                    Explore Collection
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </Link>
              <button className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-2xl px-8 py-4 font-bold hover:border-cyan-500/30 transition-all">
                <span className="relative flex items-center justify-center gap-2">
                  <Eye className="w-5 h-5" />
                  Watch Video
                </span>
              </button>
            </div>

            {/* Stats with Glassmorphism */}
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
              {[
                { value: '15K+', label: 'Products', icon: Sparkles },
                { value: '100K+', label: 'Happy Customers', icon: Award },
                { value: '5.0', label: 'Rating', icon: Star }
              ].map((stat, i) => (
                <div key={i} className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-2xl p-4 text-center group-hover:border-cyan-500/30 transition-all">
                    <stat.icon className="w-5 h-5 mx-auto mb-2 text-cyan-400" />
                    <div className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-500 font-medium">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3D Product Showcase */}
          <div className="relative hidden lg:block">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 via-blue-500/30 to-purple-500/30 rounded-full blur-[100px] animate-pulse-slow"></div>
              {heroProduct && (
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all"></div>
                  <img 
                    src={heroProduct.images} 
                    alt="Featured Product"
                    className="relative w-full h-[550px] object-contain drop-shadow-2xl animate-float transform group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full animate-scroll"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;