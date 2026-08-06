// components/orders/OrderCard.jsx
import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, CreditCard, Package, Truck, CheckCircle2, XCircle, Clock, Eye } from 'lucide-react';

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

  return (
    <div className="rounded-xl border border-border bg-surface overflow-hidden">
      {/* Order Header */}
      <div className="flex flex-wrap justify-between items-start gap-4 p-6 pb-5 border-b border-border bg-surface-alt">
        <div>
          <h3 className="font-bold text-xl text-foreground mb-1">
            #{order.orderId}
          </h3>
          <p className="text-sm text-text-muted">
            {formatDate(order.orderDate)}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Badge tone={statusStyle.tone}>
            <StatusIcon size={13} aria-hidden />
            {statusStyle.label}
          </Badge>
          <Button variant="outline" size="sm" onClick={() => navigate(`/order/${order.orderId}`)}>
            <Eye size={15} aria-hidden />
            View
          </Button>
        </div>
      </div>

      {/* Order Items */}
      <div className="p-6 pb-4 space-y-3">
        {orderItems.length > 0 ? (
          <>
            {orderItems.slice(0, 2).map((item, index) => (
              <div key={index} className="flex gap-4 p-3 rounded-xl border border-border bg-surface-alt">
                <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-surface flex-shrink-0">
                  <img
                    src={getImageUrl(item)}
                    alt={item.title || 'Product'}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/placeholder-image.jpg';
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-foreground line-clamp-1">
                    {item.title || 'Product'}
                  </h4>
                  <p className="text-sm text-text-muted mb-1">
                    Quantity: <span className="text-foreground font-bold">{item.quantity || 1}</span>
                  </p>
                  <p className="font-bold text-brand-600 dark:text-brand-400">
                    {formatINR((item.price || 0) * (item.quantity || 1))}
                  </p>
                </div>
              </div>
            ))}
            {orderItems.length > 2 && (
              <div className="text-center py-2 px-4 rounded-xl border border-dashed border-border bg-surface-alt">
                <p className="text-sm text-text-muted">
                  +{orderItems.length - 2} more items
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-8 px-4 rounded-xl border border-dashed border-border">
            <p className="text-text-muted">No items found in this order</p>
          </div>
        )}
      </div>

      {/* Order Footer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 pt-5 border-t border-border">
        <div className="p-4 rounded-xl border border-border bg-surface-alt">
          <div className="flex items-center gap-2 text-text-muted text-sm mb-2">
            <CreditCard size={15} aria-hidden />
            Payment
          </div>
          <p className="font-semibold text-foreground capitalize">
            {order.paymentMethod === "cod" ? "Cash on Delivery" : order.paymentMethod || "N/A"}
          </p>
        </div>

        <div className="p-4 rounded-xl border border-border bg-surface-alt">
          <div className="flex items-center gap-2 text-text-muted text-sm mb-2">
            <MapPin size={15} aria-hidden />
            Delivery
          </div>
          <p className="font-semibold text-foreground">
            {order.shippingInfo?.city || 'N/A'}, {order.shippingInfo?.state || 'N/A'}
          </p>
        </div>

        <div className="p-4 rounded-xl border border-border bg-surface-alt">
          <p className="text-text-muted text-sm mb-2">Total Amount</p>
          <p className="text-2xl font-extrabold text-foreground">
            {formatINR(order.pricing?.grandTotal || 0)}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 p-6 pt-0">
        {statusKey === "delivered" && (
          <button
            onClick={() => {
              const productId = orderItems[0]?._id;
              if (productId) {
                navigate(`/products/${productId}#reviews`);
              } else {
                navigate("/products");
              }
            }}
            className="flex-1 min-w-[160px] rounded-xl border border-border bg-surface-alt px-4 py-3 text-sm font-bold text-foreground hover:border-brand-500/50 hover:text-brand-600 transition-all"
          >
            Write Review
          </button>
        )}
        {(statusKey === "pending" || statusKey === "processing") && (
          <button
            onClick={() => setCancelOpen(true)}
            className="flex-1 min-w-[160px] rounded-xl border border-danger/40 px-4 py-3 text-sm font-bold text-danger hover:bg-danger/10 transition-all"
          >
            Cancel Order
          </button>
        )}
        {statusKey !== "cancelled" && (
          <button
            onClick={() => navigate("/track-order", { state: { orderId: order.orderId } })}
            className="flex-1 min-w-[160px] rounded-xl bg-brand-600 px-4 py-3 text-sm font-bold text-white hover:bg-brand-700 transition-all"
          >
            Track Order
          </button>
        )}
        <button
          onClick={() => navigate(`/order/${order.orderId}`)}
          className="flex-1 min-w-[160px] rounded-xl border border-border bg-surface px-4 py-3 text-sm font-bold text-foreground hover:border-brand-500/50 hover:text-brand-600 transition-all"
        >
          View Details
        </button>
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
