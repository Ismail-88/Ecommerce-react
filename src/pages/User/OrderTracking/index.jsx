// pages/OrderTracking/index.jsx
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useOrderTracking } from "./hooks/useOrderTracking";
import { MapPin, TrendingUp } from "lucide-react";

// Components
import TrackingSearchForm from "./components/TrackingSearchForm";
import OrderInfoBanner from "./components/OrderInfoBanner";
import TrackingTimeline from "./components/TrackingTimeline";
import EmptyTrackingState from "./components/EmptyTrackingState";
import PageHeader from "../../../components/ui/PageHeader";

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
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border bg-surface-alt">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
          <PageHeader
            icon={MapPin}
            title="Track Your Order"
            description="Real-time delivery updates at your fingertips"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-10">
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
          <div className="space-y-6">
            {/* Order Info Banner */}
            <OrderInfoBanner orderData={orderData} trackingStatus={trackingStatus} />

            {/* Timeline */}
            <TrackingTimeline trackingStatus={trackingStatus} />

            {/* Additional Info */}
            <div className="rounded-2xl border border-border bg-surface shadow-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-success-soft text-success">
                  <TrendingUp size={24} aria-hidden />
                </span>
                <h3 className="text-xl font-bold text-foreground">Delivery Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl border border-border bg-surface-alt">
                  <p className="text-sm text-text-muted mb-2">Delivery Address</p>
                  <p className="font-semibold text-foreground mb-1">{orderData.shippingInfo.address}</p>
                  <p className="text-text-muted">
                    {orderData.shippingInfo.city}, {orderData.shippingInfo.state} {orderData.shippingInfo.zipCode}
                  </p>
                  <p className="text-text-muted">{orderData.shippingInfo.country}</p>
                </div>

                <div className="p-5 rounded-xl border border-border bg-surface-alt">
                  <p className="text-sm text-text-muted mb-2">Contact Information</p>
                  <p className="font-semibold text-foreground mb-1">{orderData.shippingInfo.fullName}</p>
                  <p className="text-text-muted">{orderData.shippingInfo.phone}</p>
                  <p className="text-text-muted">{orderData.shippingInfo.email}</p>
                </div>
              </div>

              <div className="mt-5 p-4 rounded-xl bg-info-soft text-info border border-info/20 flex items-center gap-2 text-sm">
                <span className="w-2 h-2 bg-info rounded-full animate-pulse" aria-hidden></span>
                Need help? Contact our support team 24/7
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
