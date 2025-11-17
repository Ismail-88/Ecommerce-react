// components/checkout/ShippingForm.jsx
import React from 'react';
import { MdLocalShipping } from 'react-icons/md';

const ShippingForm = ({ register, errors }) => {
  return (
    <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-3xl p-8 shadow-2xl">
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5"></div>
      
      <div className="relative">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 flex items-center justify-center">
            <MdLocalShipping className="text-2xl text-white" />
          </div>
          <h2 className="text-2xl font-bold">Shipping Information</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
              Full Name *
            </label>
            <input
              type="text"
              {...register("fullName")}
              className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none transition-all"
              placeholder="John Doe"
            />
            {errors.fullName && (
              <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
                <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
              Email Address *
            </label>
            <input
              type="email"
              {...register("email")}
              className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none transition-all"
              placeholder="john@example.com"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
                <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
              Phone Number *
            </label>
            <input
              type="tel"
              {...register("phone")}
              className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none transition-all"
              placeholder="+1 234 567 8900"
            />
            {errors.phone && (
              <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
                <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                {errors.phone.message}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
              Street Address *
            </label>
            <input
              type="text"
              {...register("address")}
              className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none transition-all"
              placeholder="123 Main Street, Apt 4B"
            />
            {errors.address && (
              <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
                <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                {errors.address.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
              City *
            </label>
            <input
              type="text"
              {...register("city")}
              className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none transition-all"
              placeholder="New York"
            />
            {errors.city && (
              <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
                <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                {errors.city.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
              State *
            </label>
            <input
              type="text"
              {...register("state")}
              className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none transition-all"
              placeholder="NY"
            />
            {errors.state && (
              <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
                <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                {errors.state.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
              Zip Code *
            </label>
            <input
              type="text"
              {...register("zipCode")}
              className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none transition-all"
              placeholder="10001"
            />
            {errors.zipCode && (
              <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
                <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                {errors.zipCode.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
              Country *
            </label>
            <input
              type="text"
              {...register("country")}
              className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none transition-all"
              placeholder="United States"
            />
            {errors.country && (
              <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
                <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                {errors.country.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingForm;