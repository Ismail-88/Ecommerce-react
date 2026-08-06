import React from 'react'
import { formatINR } from '../../../../utils/formatCurrency';

import Modal from '../../../../components/ui/Modal';

export const OrderDetailsModal = ({ order, onClose, onStatusChange }) => {
  if (!order) return null;

  const statusSelectClass =
    "w-full px-4 py-2.5 border border-border bg-background text-foreground rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 focus:outline-none transition-all";

  return (
    <Modal open onClose={onClose} size="lg" title="Order Details">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-4 rounded-xl border border-border bg-surface-alt">
            <h3 className="font-semibold text-foreground mb-2">Order Information</h3>
            <p className="text-sm text-text-muted">
              Order ID:{" "}
              <span className="font-mono text-foreground">{order.orderId}</span>
            </p>
            <p className="text-sm text-text-muted">
              Date:{" "}
              {new Date(order.orderDate).toLocaleDateString()}
            </p>
            <p className="text-sm text-text-muted">
              Payment: {order.paymentMethod.toUpperCase()}
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-surface-alt">
            <h3 className="font-semibold text-foreground mb-2">Customer Information</h3>
            <p className="text-sm text-text-muted">{order.shippingInfo.fullName}</p>
            <p className="text-sm text-text-muted">{order.shippingInfo.email}</p>
            <p className="text-sm text-text-muted">{order.shippingInfo.phone}</p>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-border bg-surface-alt">
          <h3 className="font-semibold text-foreground mb-2">Shipping Address</h3>
          <p className="text-sm text-text-muted">
            {order.shippingInfo.address},{" "}
            {order.shippingInfo.city},{" "}
            {order.shippingInfo.state}{" "}
            {order.shippingInfo.zipCode}
            <br />
            {order.shippingInfo.country}
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-foreground mb-3">Order Items</h3>
          <div className="space-y-3">
            {order.items.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 bg-surface-alt p-3 rounded-xl border border-border"
              >
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded-lg bg-surface"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground text-sm line-clamp-1">{item.title}</p>
                  <p className="text-xs text-text-muted">Qty: {item.quantity}</p>
                </div>
                <span className="font-bold text-brand-600 dark:text-brand-400">
                  {formatINR(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface-alt rounded-xl border border-border p-4">
          <h3 className="font-semibold text-foreground mb-3">Order Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-text-muted">Subtotal</span>
              <span className="text-foreground">{formatINR(order.pricing.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Delivery Fee</span>
              <span className="text-foreground">
                {order.pricing.deliveryFee === 0
                  ? "FREE"
                  : formatINR(order.pricing.deliveryFee)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Handling Fee</span>
              <span className="text-foreground">{formatINR(order.pricing.handlingFee)}</span>
            </div>
            <hr className="my-2 border-border" />
            <div className="flex justify-between font-bold text-lg">
              <span className="text-foreground">Total</span>
              <span className="text-brand-600 dark:text-brand-400">
                {formatINR(order.pricing.grandTotal)}
              </span>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Update Order Status
          </label>
          <select
            value={order.status?.toLowerCase() || 'pending'}
            onChange={(e) => onStatusChange(order.orderId, e.target.value)}
            className={statusSelectClass}
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>
    </Modal>
  )
}
