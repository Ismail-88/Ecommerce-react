// components/PaymentMethodSelector.jsx
import React from 'react';
import { FaMoneyBillWave } from 'react-icons/fa';
import { SiRazorpay } from 'react-icons/si';

const PaymentMethodSelector = ({ register, errors, paymentMethod }) => {
  return (
    <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-3xl p-8 shadow-2xl">
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5"></div>
      
      <div className="relative">
        <h2 className="text-2xl font-bold mb-8">Payment Method</h2>

        <div className="space-y-4">
          {/* Razorpay - All Online Methods */}
          <label
            className={`relative flex items-center gap-4 p-5 border-2 rounded-2xl cursor-pointer transition-all group ${
              paymentMethod === "razorpay"
                ? "border-cyan-500 bg-gradient-to-r from-cyan-500/10 to-blue-500/10"
                : "border-white/10 hover:border-white/30 bg-white/5"
            }`}
          >
            <input
              type="radio"
              value="razorpay"
              {...register("paymentMethod")}
              className="sr-only"
            />
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
              paymentMethod === "razorpay"
                ? "border-cyan-500 bg-gradient-to-br from-cyan-500 to-blue-500"
                : "border-white/30"
            }`}>
              {paymentMethod === "razorpay" && (
                <div className="w-2 h-2 bg-white rounded-full"></div>
              )}
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
              <SiRazorpay className="text-2xl text-blue-400" />
            </div>
            <div className="flex-1">
              <span className="font-bold text-lg block">Pay Online</span>
              <span className="text-xs text-gray-400">Card • UPI • Net Banking • Wallets</span>
            </div>
          </label>

          {/* Razorpay Info */}
          {paymentMethod === "razorpay" && (
            <div className="ml-16 p-6 rounded-2xl border border-white/10 bg-white/5 animate-fadeIn">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-2">Secure Payment Gateway</h4>
                  <p className="text-sm text-gray-400 leading-relaxed mb-3">
                    You'll be redirected to Razorpay's secure payment page. Choose from:
                  </p>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span>
                      💳 Credit/Debit Cards (Visa, Mastercard, RuPay)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span>
                      📱 UPI (PhonePe, Google Pay, Paytm, BHIM)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span>
                      🏦 Net Banking (All major banks)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span>
                      👛 Wallets (Paytm, PhonePe, Mobikwik)
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

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
            <div className="flex-1">
              <span className="font-bold text-lg block">Cash on Delivery</span>
              <span className="text-xs text-gray-400">Pay when you receive</span>
            </div>
          </label>

          {/* COD Info */}
          {paymentMethod === "cod" && (
            <div className="ml-16 p-6 rounded-2xl border border-white/10 bg-white/5 animate-fadeIn">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                  <FaMoneyBillWave className="text-emerald-400" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-2">Pay on Delivery</h4>
                  <p className="text-sm text-gray-400">
                    💰 Pay with cash when your order is delivered. Additional handling fee may apply.
                  </p>
                </div>
              </div>
            </div>
          )}
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