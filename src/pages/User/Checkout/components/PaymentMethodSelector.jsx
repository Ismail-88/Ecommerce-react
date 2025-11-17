// components/checkout/PaymentMethodSelector.jsx
import React from 'react';
import { FaCreditCard, FaPaypal, FaMoneyBillWave } from 'react-icons/fa';

const PaymentMethodSelector = ({ register, errors, paymentMethod }) => {
  return (
    <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-3xl p-8 shadow-2xl">
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5"></div>
      
      <div className="relative">
        <h2 className="text-2xl font-bold mb-8">Payment Method</h2>

        <div className="space-y-4">
          {/* Credit Card */}
          <label
            className={`relative flex items-center gap-4 p-5 border-2 rounded-2xl cursor-pointer transition-all group ${
              paymentMethod === "card"
                ? "border-cyan-500 bg-gradient-to-r from-cyan-500/10 to-blue-500/10"
                : "border-white/10 hover:border-white/30 bg-white/5"
            }`}
          >
            <input
              type="radio"
              value="card"
              {...register("paymentMethod")}
              className="sr-only"
            />
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
              paymentMethod === "card"
                ? "border-cyan-500 bg-gradient-to-br from-cyan-500 to-blue-500"
                : "border-white/30"
            }`}>
              {paymentMethod === "card" && (
                <div className="w-2 h-2 bg-white rounded-full"></div>
              )}
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
              <FaCreditCard className="text-2xl text-cyan-400" />
            </div>
            <span className="font-bold text-lg">Credit/Debit Card</span>
          </label>

          {/* Card Details Form */}
          {paymentMethod === "card" && (
            <div className="ml-16 space-y-6 animate-fadeIn p-6 rounded-2xl border border-white/10 bg-white/5">
              <div>
                <label className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
                  Card Number *
                </label>
                <input
                  type="text"
                  {...register("cardNumber")}
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none transition-all"
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                />
                {errors.cardNumber && (
                  <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
                    <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                    {errors.cardNumber.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
                  Cardholder Name *
                </label>
                <input
                  type="text"
                  {...register("cardName")}
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
                    Expiry Date *
                  </label>
                  <input
                    type="text"
                    {...register("expiryDate")}
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none transition-all"
                    placeholder="MM/YY"
                    maxLength="5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
                    CVV *
                  </label>
                  <input
                    type="text"
                    {...register("cvv")}
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none transition-all"
                    placeholder="123"
                    maxLength="3"
                  />
                </div>
              </div>
            </div>
          )}

          {/* PayPal */}
          <label
            className={`relative flex items-center gap-4 p-5 border-2 rounded-2xl cursor-pointer transition-all group ${
              paymentMethod === "paypal"
                ? "border-cyan-500 bg-gradient-to-r from-cyan-500/10 to-blue-500/10"
                : "border-white/10 hover:border-white/30 bg-white/5"
            }`}
          >
            <input
              type="radio"
              value="paypal"
              {...register("paymentMethod")}
              className="sr-only"
            />
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
              paymentMethod === "paypal"
                ? "border-cyan-500 bg-gradient-to-br from-cyan-500 to-blue-500"
                : "border-white/30"
            }`}>
              {paymentMethod === "paypal" && (
                <div className="w-2 h-2 bg-white rounded-full"></div>
              )}
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
              <FaPaypal className="text-2xl text-blue-400" />
            </div>
            <span className="font-bold text-lg">PayPal</span>
          </label>

          {/* Cash on Delivery */}
          <label
            className={`relative flex items-center gap-4 p-5 border-2 rounded-2xl cursor-pointer transition-all group ${
              paymentMethod === "cod"
                ? "border-cyan-500 bg-gradient-to-r from-cyan-500/10 to-blue-500/10"
                : "border-white/10 hover:border-white/30 bg-white/5"
            }`}
          >
            <input
              type="radio"
              value="cod"
              {...register("paymentMethod")}
              className="sr-only"
            />
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
              paymentMethod === "cod"
                ? "border-cyan-500 bg-gradient-to-br from-cyan-500 to-blue-500"
                : "border-white/30"
            }`}>
              {paymentMethod === "cod" && (
                <div className="w-2 h-2 bg-white rounded-full"></div>
              )}
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center">
              <FaMoneyBillWave className="text-2xl text-emerald-400" />
            </div>
            <span className="font-bold text-lg">Cash on Delivery</span>
          </label>
        </div>

        {errors.paymentMethod && (
          <p className="text-red-400 text-sm mt-4 flex items-center gap-2">
            <span className="w-1 h-1 bg-red-400 rounded-full"></span>
            {errors.paymentMethod.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default PaymentMethodSelector;