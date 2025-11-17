// components/tracking/TrackingTimeline.jsx
import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

const TrackingTimeline = ({ trackingStatus }) => {
  return (
    <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-3xl p-8 shadow-2xl">
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5"></div>
      
      <div className="relative">
        <h2 className="text-3xl font-black mb-12 flex items-center gap-3">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Order Status
          </span>
        </h2>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500/30 via-blue-500/30 to-purple-500/30 md:left-10"></div>

          {trackingStatus.map((status, index) => {
            const StatusIcon = status.icon;
            const isCompleted = status.completed;
            const isLast = index === trackingStatus.length - 1;

            return (
              <div key={status.id} className={`relative ${!isLast ? 'mb-12' : ''}`}>
                <div className="flex items-start gap-6 md:gap-8">
                  {/* Icon Circle */}
                  <div className="relative z-10 flex-shrink-0">
                    <div
                      className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl border-4 flex items-center justify-center transition-all ${
                        isCompleted
                          ? 'bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 border-cyan-500/30 shadow-lg shadow-cyan-500/50'
                          : 'bg-white/5 border-white/10'
                      }`}
                    >
                      <StatusIcon
                        className={`text-2xl md:text-3xl ${
                          isCompleted ? 'text-white' : 'text-gray-600'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-2">
                    <div className={`relative rounded-2xl border overflow-hidden transition-all ${
                      isCompleted 
                        ? 'border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10' 
                        : 'border-white/10 bg-white/5'
                    }`}>
                      <div className="p-6 md:p-8">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                          <h3
                            className={`text-xl md:text-2xl font-black flex items-center gap-3 ${
                              isCompleted 
                                ? 'text-white' 
                                : 'text-gray-500'
                            }`}
                          >
                            {isCompleted && (
                              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                            )}
                            {!isCompleted && (
                              <Circle className="w-6 h-6 text-gray-600" />
                            )}
                            {status.status}
                          </h3>
                          <span
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold ${
                              isCompleted
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : 'bg-white/5 text-gray-500 border border-white/10'
                            }`}
                          >
                            {isCompleted
                              ? status.date.toLocaleDateString()
                              : `Expected: ${status.date.toLocaleDateString()}`}
                          </span>
                        </div>
                        <p className={`text-base md:text-lg leading-relaxed ${
                          isCompleted ? 'text-gray-300' : 'text-gray-500'
                        }`}>
                          {status.description}
                        </p>

                        {/* Progress bar for completed status */}
                        {isCompleted && (
                          <div className="mt-4 h-2 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-full animate-pulse"></div>
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
    </div>
  );
};

export default TrackingTimeline;