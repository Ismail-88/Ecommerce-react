// components/tracking/EmptyTrackingState.jsx
import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { Package, Sparkles } from 'lucide-react';

const EmptyTrackingState = () => {
  return (
    <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-3xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5"></div>
      
      <div className="relative flex flex-col items-center justify-center py-32 px-6 text-center">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="relative w-32 h-32 rounded-full border-4 border-white/10 bg-white/5 backdrop-blur-xl flex items-center justify-center">
            <FaSearch className="text-6xl text-gray-600" />
          </div>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-2xl px-5 py-2 mb-6">
          <Package className="w-5 h-5 text-cyan-400" />
          <span className="text-sm font-bold text-gray-300">READY TO TRACK</span>
        </div>

        <h2 className="text-4xl font-black mb-4">
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Track Your Order
          </span>
        </h2>
        <p className="text-gray-400 text-lg mb-8 max-w-md">
          Enter your Order ID above to get real-time updates on your premium delivery
        </p>

        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Real-time Updates</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-cyan-400" />
            <span>Detailed Timeline</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default EmptyTrackingState;