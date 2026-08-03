import React, { useState } from 'react'
import { Eye, Trash2 } from 'lucide-react';
import { formatINR } from '../../../../utils/formatCurrency';

import Badge from '../../../../components/ui/Badge';
import ConfirmDialog from '../../../../components/ui/ConfirmDialog';

const statusTones = {
  pending: 'warning',
  processing: 'info',
  shipped: 'brand',
  delivered: 'success',
  cancelled: 'danger',
};

const statusOptions = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

export const OrdersTable = ({ orders, onViewOrder, onStatusChange, onDelete }) => {
  const [orderToDelete, setOrderToDelete] = useState(null);

  const handleConfirmDelete = () => {
    if (orderToDelete) {
      onDelete(orderToDelete);
      setOrderToDelete(null);
    }
  };

  return (
    <div className="bg-surface rounded-2xl border border-border shadow-card overflow-hidden">
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-surface-alt border-b border-border">
            <tr>
              <th className="text-left py-4 px-6 font-semibold text-text-muted">Order ID</th>
              <th className="text-left py-4 px-6 font-semibold text-text-muted">Customer</th>
              <th className="text-left py-4 px-6 font-semibold text-text-muted">Date</th>
              <th className="text-left py-4 px-6 font-semibold text-text-muted">Items</th>
              <th className="text-left py-4 px-6 font-semibold text-text-muted">Total</th>
              <th className="text-left py-4 px-6 font-semibold text-text-muted">Status</th>
              <th className="text-center py-4 px-6 font-semibold text-text-muted">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.orderId} className="border-b border-border hover:bg-surface-alt transition">
                  <td className="py-4 px-6 font-mono text-sm font-semibold text-foreground">
                    {order.orderId}
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-semibold text-foreground">{order.shippingInfo.fullName}</p>
                      <p className="text-sm text-text-muted">{order.shippingInfo.email}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-foreground">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6 text-foreground">
                    {order.items.length} item(s)
                  </td>
                  <td className="py-4 px-6 font-bold text-brand-600 dark:text-brand-400">
                    {formatINR(order.pricing.grandTotal)}
                  </td>
                  <td className="py-4 px-6">
                    <select
                      value={order.status}
                      onChange={(e) => onStatusChange(order.orderId, e.target.value)}
                      className={`px-3 py-1 rounded-full text-sm font-semibold cursor-pointer border border-transparent ${
                        statusTones[order.status] === 'success'
                          ? 'bg-success-soft text-success'
                          : statusTones[order.status] === 'warning'
                          ? 'bg-warning-soft text-warning'
                          : statusTones[order.status] === 'danger'
                          ? 'bg-danger-soft text-danger'
                          : statusTones[order.status] === 'info'
                          ? 'bg-info-soft text-info'
                          : 'bg-brand-soft text-brand-600 dark:text-brand-400'
                      }`}
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => onViewOrder(order)}
                        className="p-2 text-info hover:bg-info-soft rounded-lg transition cursor-pointer"
                        title="View Details"
                      >
                        <Eye size={17} aria-hidden />
                      </button>
                      <button
                        onClick={() => setOrderToDelete(order._id)}
                        className="p-2 text-danger hover:bg-danger-soft rounded-lg transition cursor-pointer"
                        title="Delete Order"
                      >
                        <Trash2 size={17} aria-hidden />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-12">
                  <p className="text-text-muted">No orders found</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        open={Boolean(orderToDelete)}
        onClose={() => setOrderToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Order?"
        message="You won't be able to revert this!"
        confirmText="Yes, delete it"
      />
    </div>
  )
}
