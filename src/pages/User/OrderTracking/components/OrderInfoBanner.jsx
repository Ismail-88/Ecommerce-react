// components/tracking/OrderInfoBanner.jsx
import React from 'react';
import { Package, Calendar, Truck } from 'lucide-react';

const OrderInfoBanner = ({ orderData, trackingStatus }) => {
  return (
    <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-3xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10"></div>
      
      <div className="relative p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-4 p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center flex-shrink-0">
              <Package className="w-7 h-7 text-cyan-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Order ID</p>
              <p className="font-black text-lg bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {orderData.orderId}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0">
              <Calendar className="w-7 h-7 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Order Date</p>
              <p className="font-black text-lg text-white">
                {new Date(orderData.orderDate).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl border border-white/10 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border-emerald-500/30">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center flex-shrink-0">
              <Truck className="w-7 h-7 text-emerald-400" />
            </div>
            <div>
              <p className="text-sm text-emerald-400 mb-1">Est. Delivery</p>
              <p className="font-black text-lg text-white">
                {trackingStatus[trackingStatus.length - 1].date.toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderInfoBanner;