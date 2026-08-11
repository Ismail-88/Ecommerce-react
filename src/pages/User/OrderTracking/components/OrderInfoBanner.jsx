// components/tracking/OrderInfoBanner.jsx
import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

import Badge from '../../../../components/ui/Badge';

const OrderInfoBanner = ({ orderData, trackingStatus }) => {
  const completedSteps = trackingStatus.filter((status) => status.completed);
  const currentStatus = completedSteps[completedSteps.length - 1]?.status || "Pending";
  const lastStep = trackingStatus[trackingStatus.length - 1];

  const delivered = currentStatus === "Delivered";
  const StatusChip = delivered ? CheckCircle2 : XCircle;

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden">
      <div className="bg-surface-alt/60 border-b border-border px-5 py-3 flex items-center justify-between">
        <h2 className="font-bold text-foreground">Order Summary</h2>
        <Badge tone={delivered ? "success" : "brand"}>
          <StatusChip size={13} aria-hidden />
          {currentStatus}
        </Badge>
      </div>
      <div className="px-5 py-4 grid grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-text-muted mb-0.5">
            Order Placed
          </p>
          <p className="text-sm font-semibold text-foreground">
            {new Date(orderData.orderDate).toLocaleDateString()}
          </p>
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-text-muted mb-0.5">
            Order ID
          </p>
          <p className="text-sm font-semibold text-foreground truncate">
            {orderData.orderId}
          </p>
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-text-muted mb-0.5">
            Est. Delivery
          </p>
          <p className="text-sm font-semibold text-success">
            {lastStep.date.toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderInfoBanner;
