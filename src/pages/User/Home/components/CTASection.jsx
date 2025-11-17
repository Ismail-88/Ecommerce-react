// components/home/CTASection.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp } from 'lucide-react';

const CTASection = () => {
  return (
    <div className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10"></div>
      <div className="relative max-w-4xl mx-auto px-4 md:px-6 text-center">
        <TrendingUp className="w-16 h-16 mx-auto mb-6 text-cyan-400 animate-bounce" />
        <h2 className="text-4xl md:text-6xl font-black mb-6">
          Ready to Experience
          <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Luxury Shopping?
          </span>
        </h2>
        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
          Join thousands of satisfied customers and discover premium products curated just for you
        </p>
        <Link to="/products">
          <button className="group relative overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 animate-gradient"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.3),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="relative flex items-center justify-center gap-3 px-10 py-5 text-white font-bold text-lg">
              Start Shopping Now
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CTASection;