// components/orders/OrderCard.jsx
import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Truck, CheckCircle2, XCircle, Clock, Package } from 'lucide-react';

import Badge from '../../../../components/ui/Badge';
import Button from '../../../../components/ui/Button';
import ConfirmDialog from '../../../../components/ui/ConfirmDialog';
import { formatINR } from '../../../../utils/formatCurrency';

const OrderCard = ({ order, formatDate, onCancelOrder }) => {
  const navigate = useNavigate();
  const [cancelOpen, setCancelOpen] = useState(false);
  const [cancelling, setCancelling] = useState(false);

  const handleCancel = async () => {
    setCancelling(true);
    const result = await onCancelOrder(order.orderId);
    setCancelling(false);
    if (result?.success) {
      setCancelOpen(false);
    }
  };

  const statusConfig = useMemo(() => ({
    pending: {
      icon: Clock,
      tone: "warning",
      label: "Pending"
    },
    processing: {
      icon: Package,
      tone: "info",
      label: "Processing"
    },
    shipped: {
      icon: Truck,
      tone: "brand",
      label: "Shipped"
    },
    delivered: {
      icon: CheckCircle2,
      tone: "success",
      label: "Delivered"
    },
    cancelled: {
      icon: XCircle,
      tone: "danger",
      label: "Cancelled"
    }
  }), []);

  const statusStyle = statusConfig[order.status?.toLowerCase()] || statusConfig.pending;
  const StatusIcon = statusStyle.icon;
  const statusKey = order.status?.toLowerCase() || "pending";

  // Safely handle items array
  const orderItems = useMemo(() => {
    if (!order.items || !Array.isArray(order.items)) {
      return [];
    }
    return order.items;
  }, [order.items]);

  // Get image URL safely
  const getImageUrl = (item) => {
    if (!item) return '/placeholder-image.jpg';

    if (Array.isArray(item.images)) {
      return item.images[0] || '/placeholder-image.jpg';
    }

    if (typeof item.images === 'string') {
      return item.images;
    }

    if (item.image) {
      return Array.isArray(item.image) ? item.image[0] : item.image;
    }

    return '/placeholder-image.jpg';
  };

  const estimateDate = useMemo(() => {
    const base = new Date(order.orderDate);
    base.setDate(base.getDate() + (orderItems.length || 1) + 2);
    return formatDate(base.toISOString());
  }, [order.orderDate, orderItems.length, formatDate]);

  const grandTotal = order.pricing?.grandTotal || 0;

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden">
      {/* Order Header */}
      <div className="bg-surface-alt/60 border-b border-border px-5 py-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-text-muted mb-0.5">
              Order Placed
            </p>
            <p className="text-sm font-semibold text-foreground">
              {formatDate(order.orderDate)}
            </p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-text-muted mb-0.5">
              Total
            </p>
            <p className="text-sm font-semibold text-foreground">
              {formatINR(grandTotal)}
            </p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-text-muted mb-0.5">
              Ship To
            </p>
            <p className="text-sm font-semibold text-foreground line-clamp-1">
              {order.shippingInfo?.fullName || "—"}
              {order.shippingInfo?.city ? `, ${order.shippingInfo.city}` : ""}
            </p>
          </div>
          <div className="md:text-right">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-text-muted mb-0.5">
              Order #{order.orderId}
            </p>
            <Badge tone={statusStyle.tone}>
              <StatusIcon size={13} aria-hidden />
              {statusStyle.label}
            </Badge>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="divide-y divide-border">
        {orderItems.length > 0 ? (
          orderItems.slice(0, 2).map((item, index) => (
            <div key={index} className="flex gap-4 p-5">
              <div className="w-24 h-24 rounded-lg bg-surface-alt border border-border overflow-hidden flex-shrink-0">
                <img
                  src={getImageUrl(item)}
                  alt={item.title || 'Product'}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.src = '/placeholder-image.jpg';
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-[15px] font-semibold text-foreground line-clamp-2">
                  {item.title || 'Product'}
                </h4>
                <p className="text-xs text-text-muted mt-0.5">
                  Seller: {item.seller || "ShopSphere"}
                </p>
                <p className="text-sm text-text-muted mt-1">
                  Qty: <span className="font-semibold text-foreground">{item.quantity || 1}</span>
                </p>
                <p className={`text-xs mt-2 font-semibold ${
                  statusKey === "delivered"
                    ? "text-success"
                    : statusKey === "cancelled"
                      ? "text-danger"
                      : "text-brand-600"
                }`}>
                  {statusKey === "delivered"
                    ? `Delivered on ${estimateDate}`
                    : statusKey === "cancelled"
                      ? "Order cancelled"
                      : `Arriving by ${estimateDate}`}
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="font-bold text-foreground">
                  {formatINR((item.price || 0) * (item.quantity || 1))}
                </p>
                <p className="text-xs text-text-muted mt-0.5">Free</p>
              </div>
            </div>
          ))
        ) : (
          <div className="py-8 px-5 text-center">
            <p className="text-text-muted">No items found in this order</p>
          </div>
        )}
        {orderItems.length > 2 && (
          <button
            onClick={() => navigate(`/order/${order.orderId}`)}
            className="w-full text-center py-2.5 text-sm font-bold text-brand-600 hover:bg-brand-50 transition-colors"
          >
            +{orderItems.length - 2} more items
          </button>
        )}
      </div>

      {/* Action Strip */}
      <div className="border-t border-border bg-surface-alt/50 px-5 py-3 flex flex-wrap items-center gap-3">
        <p className="text-xs text-text-muted hidden sm:block">
          {order.paymentMethod === "cod" ? "Cash on Delivery" : (order.paymentMethod || "Paid")} · {orderItems.length} item{orderItems.length !== 1 ? "s" : ""}
        </p>
        <div className="flex flex-wrap gap-2 ml-auto">
          {statusKey === "delivered" && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const productId = orderItems[0]?._id;
                if (productId) {
                  navigate(`/products/${productId}#reviews`);
                } else {
                  navigate("/products");
                }
              }}
            >
              Write Review
            </Button>
          )}
          {(statusKey === "pending" || statusKey === "processing") && (
            <Button variant="dangerOutline" size="sm" onClick={() => setCancelOpen(true)}>
              Cancel Order
            </Button>
          )}
          {statusKey !== "cancelled" && (
            <Button
              size="sm"
              onClick={() => navigate("/track-order", { state: { orderId: order.orderId } })}
            >
              Track Package
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={() => navigate(`/order/${order.orderId}`)}>
            View Details
          </Button>
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

export default OrderCard;
