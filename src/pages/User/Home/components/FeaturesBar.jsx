// components/home/FeaturesBar.jsx
import React, { useMemo } from 'react';
import { Truck, Shield, Award, Zap } from 'lucide-react';

const FeaturesBar = () => {
  const features = useMemo(() => [
    { icon: Truck, text: 'Free Express Delivery', gradient: 'from-cyan-400 to-blue-500' },
    { icon: Shield, text: '100% Secure Payments', gradient: 'from-blue-400 to-purple-500' },
    { icon: Award, text: 'Premium Quality Guaranteed', gradient: 'from-purple-400 to-pink-500' },
    { icon: Zap, text: '24/7 Priority Support', gradient: 'from-pink-400 to-rose-500' },
  ], []);

  return (
    <div className="relative border-y border-white/5 bg-gradient-to-r from-white/[0.02] to-white/[0.05] backdrop-blur-xl py-6 overflow-hidden">
      <div className="flex items-center gap-16 animate-scroll-smooth whitespace-nowrap">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="flex items-center gap-16">
            {features.map((feature, i) => (
              <div key={i} className="flex items-center gap-4 group">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-bold text-gray-300 group-hover:text-white transition-colors">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesBar;