// pages/OrderTracking.jsx
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useOrderTracking } from "./hooks/useOrderTracking";
import { Crown, MapPin, TrendingUp } from "lucide-react";

// Components
import TrackingSearchForm from "./components/TrackingSearchForm";
import OrderInfoBanner from "./components/OrderInfoBanner";
import TrackingTimeline from "./components/TrackingTimeline";
import EmptyTrackingState from "./components/EmptyTrackingState";

// Zod validation
const trackingSchema = z.object({
  orderId: z
    .string()
    .min(10, "Order ID must be at least 10 characters")
    .regex(/^ORD-/, "Order ID must start with 'ORD-'"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
});

const OrderTracking = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(trackingSchema),
  });

  const { orderData, trackingStatus, loading, handleTrackOrder } = useOrderTracking(setValue);

  const onSubmit = (data) => {
    handleTrackOrder(data);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Premium Header */}
      <div className="relative py-20 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[150px] animate-pulse-slow"></div>
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[150px] animate-pulse-slow"></div>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.05),transparent_70%)]"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-2xl px-5 py-2 mb-6">
            <Crown className="w-5 h-5 text-yellow-400 animate-pulse" />
            <span className="text-sm font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              ORDER TRACKING
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-4">
            <span className="block mb-2">Track Your</span>
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 blur-2xl opacity-50 animate-pulse-slow"></span>
              <span className="relative bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Premium Order
              </span>
            </span>
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto flex items-center justify-center gap-2">
            <MapPin className="w-5 h-5 text-cyan-400" />
            Real-time delivery updates at your fingertips
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-12">
        {/* Search Form */}
        <div className="mb-12">
          <TrackingSearchForm
            register={register}
            errors={errors}
            onSubmit={handleSubmit(onSubmit)}
            loading={loading}
          />
        </div>

        {/* Tracking Results */}
        {trackingStatus && orderData ? (
          <div className="space-y-8">
            {/* Order Info Banner */}
            <OrderInfoBanner orderData={orderData} trackingStatus={trackingStatus} />

            {/* Timeline */}
            <TrackingTimeline trackingStatus={trackingStatus} />

            {/* Additional Info */}
            <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-3xl p-8">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5"></div>
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-bold">Delivery Information</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
                    <p className="text-sm text-gray-400 mb-2">Delivery Address</p>
                    <p className="font-bold text-lg mb-1">{orderData.shippingInfo.address}</p>
                    <p className="text-gray-300">
                      {orderData.shippingInfo.city}, {orderData.shippingInfo.state} {orderData.shippingInfo.zipCode}
                    </p>
                    <p className="text-gray-300">{orderData.shippingInfo.country}</p>
                  </div>

                  <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
                    <p className="text-sm text-gray-400 mb-2">Contact Information</p>
                    <p className="font-bold text-lg mb-1">{orderData.shippingInfo.fullName}</p>
                    <p className="text-gray-300">{orderData.shippingInfo.phone}</p>
                    <p className="text-gray-300">{orderData.shippingInfo.email}</p>
                  </div>
                </div>

                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30">
                  <p className="text-sm text-cyan-400 flex items-center gap-2">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                    Need help? Contact our support team 24/7
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : !loading && !orderData && (
          <EmptyTrackingState />
        )}
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

export default OrderTracking;