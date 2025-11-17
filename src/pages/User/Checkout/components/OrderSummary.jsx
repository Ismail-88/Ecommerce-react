// components/checkout/OrderSummary.jsx
import React from 'react';
import { ShoppingBag, Tag, Sparkles } from 'lucide-react';

const OrderSummary = ({ cartItem, pricing, isSubmitting }) => {
  return (
    <div className="lg:col-span-1">
      <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-3xl p-8 shadow-2xl sticky top-4">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5"></div>
        
        <div className="relative">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold">Order Summary</h2>
          </div>

          {/* Items List */}
          <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto custom-scrollbar">
            {cartItem.map((item, index) => (
              <div key={index} className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 hover:border-cyan-500/30 transition-all">
                <div className="flex gap-4">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-white/5">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold line-clamp-2 mb-2 group-hover:text-cyan-400 transition-colors">
                      {item.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">
                        Qty: <span className="text-white font-bold">{item.quantity}</span>
                      </span>
                      <span className="text-lg font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-6"></div>

          {/* Price Breakdown */}
          <div className="space-y-4">
            <div className="flex justify-between text-gray-400">
              <span className="text-sm font-medium">Subtotal</span>
              <span className="font-bold text-white">${pricing.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-400">Delivery Fee</span>
              <div className="flex items-center gap-2">
                <span className="text-sm line-through text-gray-600">$25</span>
                <span className="px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 text-emerald-400 font-bold text-xs flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  FREE
                </span>
              </div>
            </div>
            <div className="flex justify-between text-gray-400">
              <span className="text-sm font-medium">Handling Fee</span>
              <span className="font-bold text-white">${pricing.handlingFee.toFixed(2)}</span>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-6"></div>

            <div className="flex justify-between items-center p-4 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-cyan-500/20">
              <span className="font-bold text-lg">Total</span>
              <span className="text-3xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                ${pricing.grandTotal.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Place Order Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`relative w-full overflow-hidden group rounded-2xl mt-8 ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="relative flex items-center justify-center gap-3 py-4 text-white font-bold text-lg">
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Processing...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Place Order
                </>
              )}
            </span>
          </button>

          <p className="text-xs text-gray-500 text-center mt-6 flex items-center justify-center gap-2">
            <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
            By placing your order, you agree to our terms
            <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
          </p>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #06b6d4, #3b82f6);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default OrderSummary;