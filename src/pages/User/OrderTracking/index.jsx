// pages/OrderTracking/index.jsx
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useOrderTracking } from "./hooks/useOrderTracking";
import { Headset } from "lucide-react";

// Components
import TrackingSearchForm from "./components/TrackingSearchForm";
import OrderInfoBanner from "./components/OrderInfoBanner";
import TrackingTimeline from "./components/TrackingTimeline";
import EmptyTrackingState from "./components/EmptyTrackingState";

// Zod validation
const trackingSchema = z.object({
  orderId: z
    .string()
    .min(10, "Order ID must be at least 10 characters"),
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

  const { orderData, trackingStatus, loading, live, handleTrackOrder } = useOrderTracking(setValue);

  const onSubmit = (data) => {
    handleTrackOrder(data);
  };

  return (
    <div className="min-h-screen text-foreground">
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            Track Your Order
          </h1>
          <p className="text-sm text-text-muted mt-1">
            Real-time delivery updates at your fingertips
          </p>
        </div>

        {/* Search Form */}
        <div className="mb-10">
          <TrackingSearchForm
            register={register}
            errors={errors}
            onSubmit={handleSubmit(onSubmit)}
            loading={loading}
          />
        </div>

        {/* Tracking Results */}
        {trackingStatus && orderData ? (
          <div className="space-y-5">
            {/* Live indicator */}
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
                  live
                    ? "bg-success-soft text-success"
                    : "bg-surface-alt text-text-muted border border-border"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${live ? "bg-success animate-pulse" : "bg-text-faint"}`}
                  aria-hidden
                />
                {live ? "LIVE — updates in real time" : "Tracking order"}
              </span>
            </div>

            {/* Order Info Banner */}
            <OrderInfoBanner orderData={orderData} trackingStatus={trackingStatus} />

            {/* Timeline */}
            <TrackingTimeline trackingStatus={trackingStatus} />

            {/* Additional Info */}
            <div className="bg-surface border border-border rounded-lg overflow-hidden">
              <div className="bg-surface-alt/60 border-b border-border px-5 py-3">
                <h2 className="font-bold text-foreground">Delivery Information</h2>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 rounded-lg border border-border bg-surface-alt">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-text-muted mb-2">
                      Delivery Address
                    </p>
                    <p className="font-semibold text-foreground mb-1">{orderData.shippingInfo.address}</p>
                    <p className="text-text-muted">
                      {orderData.shippingInfo.city}, {orderData.shippingInfo.state} {orderData.shippingInfo.zipCode}
                    </p>
                    <p className="text-text-muted">{orderData.shippingInfo.country}</p>
                  </div>

                  <div className="p-5 rounded-lg border border-border bg-surface-alt">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-text-muted mb-2">
                      Contact Information
                    </p>
                    <p className="font-semibold text-foreground mb-1">{orderData.shippingInfo.fullName}</p>
                    <p className="text-text-muted">{orderData.shippingInfo.phone}</p>
                    <p className="text-text-muted">{orderData.shippingInfo.email}</p>
                  </div>
                </div>

                <div className="mt-5 p-4 rounded-lg border border-border bg-brand-50 flex items-center gap-3 text-sm">
                  <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-brand-600 text-white flex-shrink-0">
                    <Headset size={18} aria-hidden />
                  </span>
                  <p className="text-text-secondary">
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
    </div>
  );
};

export default OrderTracking;
