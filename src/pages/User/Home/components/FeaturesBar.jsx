// // components/home/FeaturesBar.jsx
// import React, { useMemo } from 'react';
// import { Truck, Shield, Award, Zap } from 'lucide-react';

// const FeaturesBar = () => {
//   const features = useMemo(() => [
//     { icon: Truck, text: 'Free Express Delivery', gradient: 'from-cyan-400 to-blue-500' },
//     { icon: Shield, text: '100% Secure Payments', gradient: 'from-blue-400 to-purple-500' },
//     { icon: Award, text: 'Premium Quality Guaranteed', gradient: 'from-purple-400 to-pink-500' },
//     { icon: Zap, text: '24/7 Priority Support', gradient: 'from-pink-400 to-rose-500' },
//   ], []);

//   return (
//     <div className="relative border-y border-white/5 bg-gradient-to-r from-white/[0.02] to-white/[0.05] backdrop-blur-xl py-6 overflow-hidden">
//       <div className="flex items-center gap-16 animate-scroll-smooth whitespace-nowrap">
//         {[...Array(3)].map((_, index) => (
//           <div key={index} className="flex items-center gap-16">
//             {features.map((feature, i) => (
//               <div key={i} className="flex items-center gap-4 group">
//                 <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center group-hover:scale-110 transition-transform`}>
//                   <feature.icon className="w-6 h-6 text-white" />
//                 </div>
//                 <span className="text-sm font-bold text-gray-300 group-hover:text-white transition-colors">
//                   {feature.text}
//                 </span>
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FeaturesBar;

import { Truck, Shield, Award, Zap, Package, Clock } from 'lucide-react';

const FeaturesBar = () => {
  const features = [
    { 
      icon: Truck, 
      text: 'Free Express Delivery', 
      subtext: 'On orders over $50',
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10'
    },
    { 
      icon: Shield, 
      text: '100% Secure Payments', 
      subtext: 'SSL Encrypted',
      color: 'text-purple-400',
      bg: 'bg-purple-500/10'
    },
    { 
      icon: Award, 
      text: 'Premium Quality', 
      subtext: 'Guaranteed',
      color: 'text-pink-400',
      bg: 'bg-pink-500/10'
    },
    { 
      icon: Clock, 
      text: '24/7 Support', 
      subtext: 'Always here to help',
      color: 'text-orange-400',
      bg: 'bg-orange-500/10'
    },
  ];

  return (
    <div className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-y border-white/10 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-cyan-500/30 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-purple-500/30 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group flex items-center gap-4 cursor-pointer"
            >
              <div className={`relative ${feature.bg} ${feature.color} w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-7 h-7" />
                <div className={`absolute inset-0 ${feature.bg} rounded-2xl blur-xl opacity-0 group-hover:opacity-75 transition-opacity`}></div>
              </div>
              <div>
                <div className="text-white font-bold text-sm group-hover:text-cyan-400 transition-colors">
                  {feature.text}
                </div>
                <div className="text-gray-500 text-xs">
                  {feature.subtext}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesBar;