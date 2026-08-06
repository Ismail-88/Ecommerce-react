// components/tracking/EmptyTrackingState.jsx
import React from 'react';
import { Search, Package, Sparkles } from 'lucide-react';

import EmptyState from '../../../../components/ui/EmptyState';

const EmptyTrackingState = () => {
  return (
    <EmptyState
      icon={Search}
      eyebrow={
        <span className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-1.5 text-xs font-bold text-text-muted">
          <Package size={14} aria-hidden />
          READY TO TRACK
        </span>
      }
      title="Track Your Order"
      description="Enter your Order ID above to get real-time updates on your delivery"
      footer={
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-text-muted">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-500" aria-hidden />
            <span>Real-time Updates</span>
          </div>
          <span aria-hidden>•</span>
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-brand-500" aria-hidden />
            <span>Detailed Timeline</span>
          </div>
        </div>
      }
    />
  );
};

export default EmptyTrackingState;
