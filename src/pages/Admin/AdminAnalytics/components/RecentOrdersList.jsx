import React from 'react'
import { Clock } from 'lucide-react';
import { formatINR } from '../../../../utils/formatCurrency';

import Badge from '../../../../components/ui/Badge';

const statusTones = {
  delivered: 'success',
  shipped: 'brand',
  cancelled: 'danger',
  pending: 'warning',
  processing: 'info',
};

const RecentOrdersList = ({ orders }) => {
  return (
    <div className="bg-surface border border-border shadow-card p-6 rounded-2xl">
      <div className="flex items-center gap-2 mb-4">
        <Clock size={18} className="text-warning" aria-hidden />
        <h3 className="text-lg font-semibold text-foreground">Recent Orders</h3>
      </div>
      <div className="space-y-3">
        {orders.map((order) => (
          <div key={order.orderId} className="flex items-center justify-between p-3 bg-surface-alt border border-border rounded-xl">
            <div className="min-w-0">
              <p className="font-semibold text-foreground text-sm">{order.orderId}</p>
              <p className="text-xs text-text-muted">{order.shippingInfo?.fullName}</p>
              <p className="text-xs text-text-muted">
                {new Date(order.orderDate).toLocaleDateString()}
              </p>
            </div>
            <div className="text-right flex-shrink-0 ml-2">
              <p className="font-bold text-foreground">{formatINR(order.pricing?.grandTotal)}</p>
              <Badge tone={statusTones[order.status?.toLowerCase()] || 'neutral'}>
                {order.status?.toLowerCase()}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecentOrdersList
