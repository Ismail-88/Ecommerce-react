// pages/User/OrderDetails/index.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Package,
  MapPin,
  CreditCard,
  Calendar,
  Truck,
  ArrowLeft,
  XCircle,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { toast } from "react-toastify";
import { api, getData } from "../../../context/DataContext";

import Badge from "../../../components/ui/Badge";
import Button from "../../../components/ui/Button";
import ConfirmDialog from "../../../components/ui/ConfirmDialog";
import EmptyState from "../../../components/ui/EmptyState";
import { FullPageSpinner } from "../../../components/ui/Spinner";
import PageHeader from "../../../components/ui/PageHeader";
import { formatINR } from "../../../utils/formatCurrency";

const statusConfig = {
  pending: { tone: "warning", label: "Pending", icon: Clock },
  processing: { tone: "info", label: "Processing", icon: Package },
  shipped: { tone: "brand", label: "Shipped", icon: Truck },
  delivered: { tone: "success", label: "Delivered", icon: CheckCircle2 },
  cancelled: { tone: "danger", label: "Cancelled", icon: XCircle },
};

const getPaymentLabel = (method) => {
  if (method === "cod") return "Cash on Delivery";
  if (method === "razorpay") return "Razorpay";
  if (method === "paypal") return "PayPal";
  if (method === "card") return "Credit/Debit Card";
  if (method === "stripe") return "Stripe";
  return method || "N/A";
};

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { fetchOrderById } = getData();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    let mounted = true;
    const loadOrder = async () => {
      setLoading(true);
      try {
        const data = await fetchOrderById(orderId);
        if (mounted) {
          if (data) {
            setOrder(data);
            setNotFound(false);
          } else {
            setNotFound(true);
          }
        }
      } catch (error) {
        console.error("Error fetching order:", error);
        if (mounted) setNotFound(true);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    loadOrder();
    return () => {
      mounted = false;
    };
  }, [orderId, fetchOrderById]);

  const handleCancel = async () => {
    setCancelling(true);
    try {
      await api.put(`/orders/${order.orderId}`, { status: "cancelled" });
      toast.success("Order cancelled successfully");
      setOrder((prev) => (prev ? { ...prev, status: "cancelled" } : prev));
      setCancelOpen(false);
    } catch (error) {
      console.error("Error cancelling order:", error);
      toast.error("Failed to cancel order!");
    } finally {
      setCancelling(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] bg-background flex items-center justify-center">
        <FullPageSpinner label="Loading order details..." />
      </div>
    );
  }

  if (notFound || !order) {
    return (
      <div className="min-h-[70vh] bg-background flex items-center justify-center px-4">
        <EmptyState
          icon={Package}
          title="Order Not Found"
          description="We couldn't find an order with that ID"
          action={
            <Button size="lg" onClick={() => navigate("/my-orders")}>
              Back to Orders
            </Button>
          }
        />
      </div>
    );
  }

  const statusKey = order.status?.toLowerCase() || "pending";
  const statusStyle = statusConfig[statusKey] || statusConfig.pending;
  const StatusIcon = statusStyle.icon;
  const items = order.items || [];
  const shippingInfo = order.shippingInfo || {};
  const pricing = order.pricing || {};

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border bg-surface-alt">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <PageHeader
              icon={Package}
              title="Order Details"
              description={`Order #${order.orderId}`}
            />
            <div className="flex items-center gap-3">
              <Badge tone={statusStyle.tone}>
                <StatusIcon size={13} aria-hidden />
                {statusStyle.label}
              </Badge>
              <Button variant="outline" onClick={() => navigate("/my-orders")}>
                <ArrowLeft size={16} aria-hidden />
                Back to Orders
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        {/* Actions */}
        <div className="flex flex-wrap gap-3 mb-10">
          <Button variant="outline" onClick={() => navigate("/track-order", { state: { orderId: order.orderId } })}>
            <Truck size={17} aria-hidden />
            Track Order
          </Button>
          {(statusKey === "pending" || statusKey === "processing") && (
            <Button variant="dangerOutline" onClick={() => setCancelOpen(true)}>
              <XCircle size={17} aria-hidden />
              Cancel Order
            </Button>
          )}
        </div>

        {/* Shipping + Order Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          {/* Shipping Information */}
          <div className="rounded-2xl border border-border bg-surface shadow-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-brand-soft text-brand-600 dark:text-brand-400">
                <MapPin size={24} aria-hidden />
              </span>
              <h2 className="text-xl font-bold text-foreground">Shipping Information</h2>
            </div>
            <div className="space-y-2.5 text-foreground/90">
              <p>
                <span className="text-text-muted">Name:</span>{" "}
                <span className="font-semibold text-foreground">{shippingInfo.fullName || "N/A"}</span>
              </p>
              <p>
                <span className="text-text-muted">Email:</span>{" "}
                <span className="font-semibold text-foreground">{shippingInfo.email || "N/A"}</span>
              </p>
              <p>
                <span className="text-text-muted">Phone:</span>{" "}
                <span className="font-semibold text-foreground">{shippingInfo.phone || "N/A"}</span>
              </p>
              <div className="pt-3 border-t border-border">
                <p className="text-text-muted text-sm mb-2">Delivery Address</p>
                <p className="font-semibold text-foreground">{shippingInfo.address || "N/A"}</p>
                <p className="font-semibold text-foreground">
                  {shippingInfo.city || ""}{shippingInfo.city && shippingInfo.state ? ", " : ""}{shippingInfo.state || ""} {shippingInfo.zipCode || ""}
                </p>
                <p className="font-semibold text-foreground">{shippingInfo.country || ""}</p>
              </div>
            </div>
          </div>

          {/* Order Information */}
          <div className="rounded-2xl border border-border bg-surface shadow-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-info-soft text-info">
                <Package size={24} aria-hidden />
              </span>
              <h2 className="text-xl font-bold text-foreground">Order Information</h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-xl border border-border bg-surface-alt">
                <Calendar size={18} className="text-brand-600 dark:text-brand-400 flex-shrink-0" aria-hidden />
                <div>
                  <p className="text-sm text-text-muted">Order Date</p>
                  <p className="font-bold text-foreground">{new Date(order.orderDate).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl border border-border bg-surface-alt">
                <CreditCard size={18} className="text-brand-600 dark:text-brand-400 flex-shrink-0" aria-hidden />
                <div>
                  <p className="text-sm text-text-muted">Payment Method</p>
                  <p className="font-bold capitalize text-foreground">{getPaymentLabel(order.paymentMethod)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl border border-border bg-surface-alt">
                <Package size={18} className="text-brand-600 dark:text-brand-400 flex-shrink-0" aria-hidden />
                <div>
                  <p className="text-sm text-text-muted">Total Items</p>
                  <p className="font-bold text-foreground">{items.length} Products</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="rounded-2xl border border-border bg-surface shadow-card p-6 mb-10">
          <h2 className="text-xl font-bold text-foreground mb-6">Order Items</h2>
          <div className="space-y-3">
            {items.length > 0 ? (
              items.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-4 rounded-xl border border-border bg-surface-alt">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-surface flex-shrink-0">
                    <img
                      src={Array.isArray(item.images) ? item.images[0] : item.images}
                      alt={item.title || "Product"}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "/placeholder-image.jpg";
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground line-clamp-2 mb-1">{item.title || "Product"}</h3>
                    <p className="text-sm text-text-muted">Quantity: <span className="text-foreground font-bold">{item.quantity || 1}</span></p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-lg font-extrabold text-foreground">
                      {formatINR((item.price || 0) * (item.quantity || 1))}
                    </p>
                    <p className="text-sm text-text-muted">{formatINR(item.price || 0)} each</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 px-4 rounded-xl border border-dashed border-border">
                <p className="text-text-muted">No items found in this order</p>
              </div>
            )}
          </div>
        </div>

        {/* Price Summary */}
        <div className="rounded-2xl border border-border bg-surface shadow-card p-6 max-w-2xl mx-auto">
          <h2 className="text-xl font-bold text-foreground mb-6">Payment Summary</h2>
          <div className="space-y-3">
            <div className="flex justify-between text-foreground/90">
              <span className="text-text-muted">Subtotal</span>
              <span className="font-bold text-foreground">{formatINR(pricing.subtotal || 0)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-muted">Delivery Fee</span>
              <span className="text-success font-bold">
                {pricing.deliveryFee === 0 ? "FREE" : formatINR(pricing.deliveryFee || 0)}
              </span>
            </div>
            <div className="flex justify-between text-foreground/90">
              <span className="text-text-muted">Handling Fee</span>
              <span className="font-bold text-foreground">{formatINR(pricing.handlingFee || 0)}</span>
            </div>
            <div className="h-px bg-border my-4"></div>
            <div className="flex justify-between items-center p-4 rounded-xl bg-brand-soft border border-brand-500/20">
              <span className="text-lg font-bold text-foreground">Grand Total</span>
              <span className="text-3xl font-black text-brand-600 dark:text-brand-400">
                {formatINR(pricing.grandTotal || 0)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={cancelOpen}
        onClose={() => setCancelOpen(false)}
        onConfirm={handleCancel}
        title="Cancel this order?"
        message={`Order #${order.orderId} will be cancelled. This action cannot be undone.`}
        confirmText="Yes, Cancel Order"
        loading={cancelling}
      />
    </div>
  );
};

export default OrderDetails;
