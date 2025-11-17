// pages/OrderConfirmation.jsx
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCheckCircle, FaDownload, FaPrint } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useCart } from "../../context/CartContext";
import { ShoppingBag, MapPin, CreditCard, Package, Calendar, Sparkles, Crown, TrendingUp } from "lucide-react";

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const orderData = location.state?.orderData;

  useEffect(() => {
    if (orderData) {
      clearCart();
    }
  }, [orderData, clearCart]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadInvoice = () => {
    const invoice = `
ORDER CONFIRMATION
==================
Order ID: ${orderId}
Order Date: ${new Date(orderDate).toLocaleDateString()}

SHIPPING INFORMATION
--------------------
Name: ${shippingInfo.fullName}
Email: ${shippingInfo.email}
Phone: ${shippingInfo.phone}
Address: ${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state} ${shippingInfo.zipCode}, ${shippingInfo.country}

ITEMS ORDERED
-------------
${items.map((item, i) => `${i + 1}. ${item.title} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`).join('\n')}

PAYMENT SUMMARY
---------------
Subtotal: $${pricing.subtotal.toFixed(2)}
Delivery Fee: $${pricing.deliveryFee.toFixed(2)}
Handling Fee: $${pricing.handlingFee.toFixed(2)}
Total: $${pricing.grandTotal.toFixed(2)}

Payment Method: ${paymentMethod.toUpperCase()}

Thank you for shopping with us!
    `;

    const blob = new Blob([invoice], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Invoice-${orderId}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (!orderData) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <div className="text-center">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 rounded-full blur-3xl"></div>
            <Package className="relative w-32 h-32 text-gray-600" />
          </div>
          <h1 className="text-4xl font-black mb-4">No Order Found</h1>
          <p className="text-gray-400 text-lg mb-8">
            Please place an order to view confirmation
          </p>
          <button
            onClick={() => navigate("/products")}
            className="group relative overflow-hidden rounded-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600"></div>
            <span className="relative block px-8 py-4 text-white font-bold">
              Continue Shopping
            </span>
          </button>
        </div>
      </div>
    );
  }

  const { orderId, items, shippingInfo, paymentMethod, pricing, orderDate } = orderData;

  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 7);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Success Header */}
      <div className="relative py-20 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[150px] animate-pulse-slow"></div>
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[150px] animate-pulse-slow"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 md:px-6 text-center">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/30 to-teal-500/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="relative w-32 h-32 rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border-4 border-emerald-500/30 flex items-center justify-center">
              <FaCheckCircle className="w-16 h-16 text-emerald-400" />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-2xl px-5 py-2 mb-6">
            <Crown className="w-5 h-5 text-yellow-400" />
            <span className="text-sm font-bold text-emerald-400">
              ORDER CONFIRMED
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-black mb-4">
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Success!
            </span>
          </h1>
          <p className="text-gray-400 text-xl mb-8">
            Your premium order has been placed successfully
          </p>

          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur-xl"></div>
            <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-3xl p-6">
              <p className="text-sm text-gray-400 mb-2">Order ID</p>
              <p className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {orderId}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={handleDownloadInvoice}
            className="group relative overflow-hidden rounded-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="relative flex items-center justify-center gap-3 px-6 py-3 text-white font-bold">
              <FaDownload />
              Download Invoice
            </span>
          </button>
          <button
            onClick={handlePrint}
            className="px-6 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl font-bold hover:border-cyan-500/50 transition-all flex items-center gap-2"
          >
            <FaPrint />
            Print Order
          </button>
          <button
            onClick={() => navigate("/products")}
            className="px-6 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl font-bold hover:border-cyan-500/50 transition-all flex items-center gap-2"
          >
            <ShoppingBag className="w-5 h-5" />
            Continue Shopping
          </button>
        </div>

        {/* Order Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Shipping Information */}
          <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-3xl p-8">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5"></div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-cyan-400" />
                </div>
                <h2 className="text-2xl font-bold">Shipping Information</h2>
              </div>
              <div className="space-y-3 text-gray-300">
                <p><span className="text-gray-500">Name:</span> <span className="font-semibold">{shippingInfo.fullName}</span></p>
                <p><span className="text-gray-500">Email:</span> <span className="font-semibold">{shippingInfo.email}</span></p>
                <p><span className="text-gray-500">Phone:</span> <span className="font-semibold">{shippingInfo.phone}</span></p>
                <div className="pt-3 border-t border-white/10">
                  <p className="text-gray-500 text-sm mb-2">Delivery Address</p>
                  <p className="font-semibold">{shippingInfo.address}</p>
                  <p className="font-semibold">{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}</p>
                  <p className="font-semibold">{shippingInfo.country}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Information */}
          <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-3xl p-8">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5"></div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                  <Package className="w-6 h-6 text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold">Order Information</h2>
              </div>
              <div className="space-y-4 text-gray-300">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                  <Calendar className="w-5 h-5 text-cyan-400" />
                  <div>
                    <p className="text-sm text-gray-500">Order Date</p>
                    <p className="font-bold">{new Date(orderDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                  <CreditCard className="w-5 h-5 text-cyan-400" />
                  <div>
                    <p className="text-sm text-gray-500">Payment Method</p>
                    <p className="font-bold capitalize">
                      {paymentMethod === "card" ? "Credit/Debit Card" : paymentMethod === "paypal" ? "PayPal" : "Cash on Delivery"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                  <TrendingUp className="w-5 h-5 text-cyan-400" />
                  <div>
                    <p className="text-sm text-gray-500">Total Items</p>
                    <p className="font-bold">{items.length} Products</p>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30">
                  <p className="text-sm text-emerald-400 mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Estimated Delivery
                  </p>
                  <p className="font-black text-xl text-white">{estimatedDelivery.toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-3xl p-8 mb-12">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5"></div>
          <div className="relative">
            <h2 className="text-2xl font-bold mb-6">Order Items</h2>
            <div className="space-y-4">
              {items.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl hover:border-cyan-500/30 transition-all group">
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-white/5">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold line-clamp-2 mb-2 group-hover:text-cyan-400 transition-colors">{item.title}</h3>
                    <p className="text-sm text-gray-400">Quantity: <span className="text-white font-bold">{item.quantity}</span></p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Price Summary */}
        <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-3xl p-8 max-w-2xl mx-auto">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5"></div>
          <div className="relative">
            <h2 className="text-2xl font-bold mb-6">Payment Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between text-gray-300">
                <span>Subtotal</span>
                <span className="font-bold">${pricing.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Delivery Fee</span>
                <span className="text-emerald-400 font-bold">
                  {pricing.deliveryFee === 0 ? "FREE" : `$${pricing.deliveryFee}`}
                </span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Handling Fee</span>
                <span className="font-bold">${pricing.handlingFee.toFixed(2)}</span>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-6"></div>
              <div className="flex justify-between items-center p-4 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-cyan-500/20">
                <span className="text-xl font-bold">Grand Total</span>
                <span className="text-4xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                  ${pricing.grandTotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
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
};

export default OrderConfirmation;