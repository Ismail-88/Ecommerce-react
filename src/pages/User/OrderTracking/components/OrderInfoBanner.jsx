// components/tracking/OrderInfoBanner.jsx
import React from 'react';
import { Package, Calendar, Truck } from 'lucide-react';

const OrderInfoBanner = ({ orderData, trackingStatus }) => {
  return (
    <div className="rounded-2xl border border-border bg-surface shadow-card overflow-hidden">
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-4 p-4 rounded-xl border border-border bg-surface-alt">
            <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-brand-soft text-brand-600 dark:text-brand-400 flex-shrink-0">
              <Package size={24} aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="text-sm text-text-muted mb-1">Order ID</p>
              <p className="font-bold text-foreground truncate">{orderData.orderId}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl border border-border bg-surface-alt">
            <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-info-soft text-info flex-shrink-0">
              <Calendar size={24} aria-hidden />
            </span>
            <div>
              <p className="text-sm text-text-muted mb-1">Order Date</p>
              <p className="font-bold text-foreground">
                {new Date(orderData.orderDate).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl border border-success/20 bg-success-soft">
            <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-success text-white flex-shrink-0">
              <Truck size={24} aria-hidden />
            </span>
            <div>
              <p className="text-sm text-success mb-1">Est. Delivery</p>
              <p className="font-bold text-success">
                {trackingStatus[trackingStatus.length - 1].date.toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderInfoBanner;
