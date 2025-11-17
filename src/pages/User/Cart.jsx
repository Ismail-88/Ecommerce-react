// pages/Cart.jsx
import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useUser } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Truck, Package, Sparkles, Crown, Gift } from "lucide-react";

const Cart = () => {
  const { cartItem, updatedQuantity, deleteCartItem } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState("");

  const subtotal = cartItem.reduce((total, item) => total + item.price * item.quantity, 0);
  const deliveryFee = 0; // Free delivery
  const handlingFee = 5;
  const discount = 0; // Apply promo code discount here
  const grandTotal = subtotal + deliveryFee + handlingFee - discount;

  const handleApplyPromo = () => {
    // Implement promo code logic
    console.log("Applying promo code:", promoCode);
  };

  if (cartItem.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <div className="text-center">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 rounded-full blur-3xl animate-pulse-slow"></div>
            <div className="relative w-32 h-32 rounded-full border-4 border-white/10 bg-white/5 backdrop-blur-xl flex items-center justify-center">
              <ShoppingBag className="w-16 h-16 text-gray-600" />
            </div>
          </div>
          <h1 className="text-5xl font-black mb-4">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Your Cart is Empty
            </span>
          </h1>
          <p className="text-gray-400 text-xl mb-8">
            Discover amazing products and start shopping
          </p>
          <button
            onClick={() => navigate('/products')}
            className="group relative overflow-hidden rounded-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="relative flex items-center justify-center gap-3 px-8 py-4 text-white font-bold text-lg">
              <Sparkles className="w-5 h-5" />
              Start Shopping
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
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
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="relative py-16 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.05),transparent_70%)]"></div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-2xl px-5 py-2 mb-6">
            <ShoppingBag className="w-5 h-5 text-cyan-400" />
            <span className="text-sm font-bold text-gray-300">SHOPPING CART</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-4">
            <span className="block mb-2">Your Shopping</span>
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Cart ({cartItem.length})
            </span>
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items - Left Side */}
          <div className="lg:col-span-2 space-y-4">
            {cartItem.map((item, index) => (
              <div
                key={index}
                className="group relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-3xl overflow-hidden hover:border-cyan-500/30 transition-all"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-blue-500/0 to-purple-500/0 group-hover:from-cyan-500/5 group-hover:via-blue-500/5 group-hover:to-purple-500/5 transition-all"></div>
                
                <div className="relative p-6 flex flex-col md:flex-row gap-6">
                  {/* Product Image */}
                  <div className="relative w-full md:w-32 h-32 rounded-2xl overflow-hidden bg-white/5 flex-shrink-0">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-lg line-clamp-2 mb-2 group-hover:text-cyan-400 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-400 mb-3">
                        Color: <span className="text-white">{item.selectedColor || 'Default'}</span>
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4">
                      {/* Price */}
                      <div>
                        <p className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                          ${item.price * item.quantity}
                        </p>
                        <p className="text-sm text-gray-400">${item.price} each</p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <div className="flex items-center rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
                          <button
                            onClick={() => updatedQuantity(cartItem, item._id, "decrement")}
                            className="px-4 py-3 hover:bg-white/10 transition-all"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-6 py-3 font-bold border-x border-white/10">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updatedQuantity(cartItem, item._id, "increment")}
                            className="px-4 py-3 hover:bg-white/10 transition-all"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Delete Button */}
                        <button
                          onClick={() => deleteCartItem(item._id)}
                          className="p-3 rounded-xl border border-white/10 bg-white/5 hover:border-red-500/50 hover:bg-red-500/10 transition-all group/delete"
                        >
                          <Trash2 className="w-5 h-5 text-red-400 group-hover/delete:scale-110 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary - Right Side */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              {/* Summary Card */}
              <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-3xl p-8 shadow-2xl">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5"></div>
                
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 flex items-center justify-center">
                      <Package className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold">Order Summary</h2>
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-gray-300">
                      <span>Subtotal ({cartItem.length} items)</span>
                      <span className="font-bold text-white">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 text-gray-300">
                        <Truck className="w-4 h-4" />
                        <span>Delivery Fee</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm line-through text-gray-600">$25</span>
                        <span className="px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 text-emerald-400 font-bold text-xs">
                          FREE
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Handling Fee</span>
                      <span className="font-bold text-white">${handlingFee.toFixed(2)}</span>
                    </div>

                    <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-6"></div>

                    <div className="flex justify-between items-center p-4 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-cyan-500/20">
                      <span className="font-bold text-xl">Total</span>
                      <span className="text-3xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                        ${grandTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Promo Code */}
                  <div className="mb-6">
                    <label className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
                      Promo Code
                    </label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Gift className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                          type="text"
                          placeholder="Enter code"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          className="w-full pl-12 pr-4 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none transition-all"
                        />
                      </div>
                      <button
                        onClick={handleApplyPromo}
                        className="px-6 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl font-bold hover:border-cyan-500/50 transition-all whitespace-nowrap"
                      >
                        Apply
                      </button>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={() => navigate('/checkout')}
                    className="relative w-full overflow-hidden group rounded-2xl"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <span className="relative flex items-center justify-center gap-3 py-4 text-white font-bold text-lg">
                      <Sparkles className="w-5 h-5" />
                      Proceed to Checkout
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>

                  <p className="text-xs text-gray-500 text-center mt-4 flex items-center justify-center gap-2">
                    <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                    Secure checkout powered by ShopSphere
                    <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                  </p>
                </div>
              </div>

              {/* Benefits Card */}
              <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-3xl p-6">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5"></div>
                <div className="relative space-y-3">
                  {[
                    { icon: Truck, text: 'Free Express Delivery' },
                    { icon: Package, text: 'Secure Packaging' },
                    { icon: Tag, text: 'Best Price Guarantee' }
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-gray-300">
                      <benefit.icon className="w-5 h-5 text-cyan-400" />
                      <span>{benefit.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;