// components/tracking/TrackingTimeline.jsx
import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

const TrackingTimeline = ({ trackingStatus }) => {
  return (
    <div className="rounded-xl border border-border bg-surface p-6 md:p-8">
      <h2 className="text-2xl font-bold text-foreground mb-10">
        Order Status
      </h2>

      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border md:left-8"></div>

        {trackingStatus.map((status, index) => {
          const StatusIcon = status.icon;
          const isCompleted = status.completed;
          const isLast = index === trackingStatus.length - 1;

          return (
            <div key={status.id} className={`relative ${!isLast ? 'mb-8' : ''}`}>
              <div className="flex items-start gap-5 md:gap-8">
                {/* Icon Circle */}
                <div className="relative z-10 flex-shrink-0">
                  <div
                    className={`w-12 h-12 md:w-14 md:h-14 rounded-xl border-2 flex items-center justify-center transition-all ${
                      isCompleted
                        ? 'bg-brand-600 border-brand-600 shadow-card'
                        : 'bg-surface-alt border-border'
                    }`}
                  >
                    <StatusIcon
                      className={`w-5 h-5 md:w-6 md:h-6 ${
                        isCompleted ? 'text-white' : 'text-text-faint'
                      }`}
                      aria-hidden
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pb-2">
                  <div
                    className={`rounded-xl border overflow-hidden transition-all ${
                      isCompleted
                        ? 'border-brand-500/30 bg-brand-soft'
                        : 'border-border bg-surface-alt'
                    }`}
                  >
                    <div className="p-5 md:p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-3">
                        <h3
                          className={`text-lg font-bold flex items-center gap-2 ${
                            isCompleted ? 'text-foreground' : 'text-text-muted'
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="w-5 h-5 text-success" aria-hidden />
                          ) : (
                            <Circle className="w-5 h-5 text-text-faint" aria-hidden />
                          )}
                          {status.status}
                        </h3>
                        <span
                          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold ${
                            isCompleted
                              ? 'bg-success-soft text-success border border-success/20'
                              : 'bg-surface text-text-muted border border-border'
                          }`}
                        >
                          {isCompleted
                            ? status.date.toLocaleDateString()
                            : `Expected: ${status.date.toLocaleDateString()}`}
                        </span>
                      </div>
                      <p className={`text-sm leading-relaxed ${
                        isCompleted ? 'text-foreground/80' : 'text-text-muted'
                      }`}>
                        {status.description}
                      </p>

                      {/* Progress bar for completed status */}
                      {isCompleted && (
                        <div className="mt-4 h-1.5 bg-border rounded-full overflow-hidden">
                          <div className="h-full bg-brand-500 rounded-full animate-pulse"></div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrackingTimeline;
