// components/tracking/TrackingTimeline.jsx
import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const TrackingTimeline = ({ trackingStatus }) => {
  const completedCount = trackingStatus.filter((status) => status.completed).length;

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <h2 className="text-lg font-bold text-foreground mb-6">Order Status</h2>

      <ol className="relative">
        {/* Vertical Line */}
        <span className="absolute left-[19px] top-3 bottom-3 w-0.5 bg-border" aria-hidden></span>

        {trackingStatus.map((status, index) => {
          const StatusIcon = status.icon;
          const isCompleted = status.completed;
          const isLatest = index === completedCount - 1;
          const isLast = index === trackingStatus.length - 1;

          return (
            <li key={status.id} className={`relative flex gap-4 ${isLast ? "" : "pb-7"}`}>
              {/* Node */}
              <span
                className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full border-2 flex-shrink-0 ${
                  isCompleted
                    ? "bg-success border-success text-white"
                    : "bg-surface-alt border-border text-text-faint"
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-5 h-5 text-white" aria-hidden />
                ) : (
                  <StatusIcon className="w-4 h-4" aria-hidden />
                )}
              </span>

              {/* Content */}
              <div className="pt-1 min-w-0">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <h3
                    className={`text-sm font-bold uppercase tracking-wide ${
                      isCompleted ? "text-foreground" : "text-text-muted"
                    }`}
                  >
                    {status.status}
                  </h3>
                  {isLatest && (
                    <span className="text-[11px] font-bold uppercase text-brand-600 bg-brand-50 px-2 py-0.5 rounded-md">
                      Latest Update
                    </span>
                  )}
                </div>
                <p className="text-xs text-text-muted mt-0.5">
                  {isCompleted
                    ? status.date.toLocaleDateString()
                    : `Expected: ${status.date.toLocaleDateString()}`}
                </p>
                <p className={`text-sm mt-1 ${isCompleted ? "text-text-secondary" : "text-text-muted"}`}>
                  {status.description}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default TrackingTimeline;
