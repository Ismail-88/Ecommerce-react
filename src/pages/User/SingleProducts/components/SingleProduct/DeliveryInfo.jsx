
import React, { useState } from 'react';
import { Truck, RotateCcw, Shield } from 'lucide-react';

const DeliveryInfo = () => {
  const [pincode, setPincode] = useState('');
  const [deliveryDate, setDeliveryDate] = useState(null);

  const checkDelivery = () => {
    if (pincode.length === 6) {
      const date = new Date();
      date.setDate(date.getDate() + 3);
      setDeliveryDate(date);
    }
  };

  const services = [
    { icon: Truck, title: 'Free Express Delivery', desc: 'On orders over $50' },
    { icon: RotateCcw, title: '7 Days Easy Return', desc: 'Hassle-free returns' },
    { icon: Shield, title: 'Premium Warranty', desc: 'Covered under warranty' }
  ];

  return (
    <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-3xl p-6">
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5"></div>
      <div className="relative">
        <h3 className="text-sm font-bold mb-4 uppercase tracking-wider text-gray-400">Delivery Options</h3>
        
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Enter Pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
            className="flex-1 px-4 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none"
          />
          <button
            onClick={checkDelivery}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 font-bold hover:opacity-90 transition-all"
          >
            Check
          </button>
        </div>

        {deliveryDate && (
          <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30">
            <div className="flex items-center gap-3 text-emerald-400 mb-2">
              <Truck className="w-5 h-5" />
              <span className="font-semibold">
                Delivery by {deliveryDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
              </span>
            </div>
            <p className="text-xs text-gray-400 ml-8">Free delivery on orders above $50</p>
          </div>
        )}

        <div className="space-y-4">
          {services.map((service, i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center">
                <service.icon className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <p className="font-semibold text-sm">{service.title}</p>
                <p className="text-xs text-gray-400">{service.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeliveryInfo;