// components/tracking/TrackingSearchForm.jsx
import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { Package, Mail } from 'lucide-react';

const TrackingSearchForm = ({ register, errors, onSubmit, loading }) => {
  return (
    <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-3xl p-8 shadow-2xl max-w-2xl mx-auto">
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5"></div>
      
      <div className="relative">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 flex items-center justify-center">
            <Package className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold">Track Your Order</h2>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
              Order ID *
            </label>
            <input
              type="text"
              {...register("orderId")}
              placeholder="Enter your Order ID (e.g., ORD-1234567890)"
              className="w-full px-4 py-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none transition-all"
            />
            {errors.orderId && (
              <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
                <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                {errors.orderId.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
              Email Address (Optional)
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="email"
                {...register("email")}
                placeholder="Enter your email for verification"
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none transition-all"
              />
            </div>
            {errors.email && (
              <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
                <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                {errors.email.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`relative w-full overflow-hidden group rounded-2xl ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="relative flex items-center justify-center gap-3 py-4 text-white font-bold text-lg">
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Tracking...
                </>
              ) : (
                <>
                  <FaSearch />
                  Track Order
                </>
              )}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default TrackingSearchForm;