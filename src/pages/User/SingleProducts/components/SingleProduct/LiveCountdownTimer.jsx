import React, { useEffect, useState } from "react";
import { Clock, Flame } from "lucide-react";

const getTimeLeft = () => {
  const now = new Date();
  const endOfDay = new Date(now);
  endOfDay.setHours(23, 59, 59, 999);
  const diff = Math.max(0, endOfDay - now);

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return {
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
  };
};

const pad = (value) => String(value).padStart(2, "0");

const LiveCountdownTimer = ({ compact = false }) => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const units = [
    { label: "Hrs", value: timeLeft.hours },
    { label: "Min", value: timeLeft.minutes },
    { label: "Sec", value: timeLeft.seconds },
  ];

  if (compact) {
    return (
      <div className="inline-flex items-center gap-2 rounded-full bg-danger-soft border border-danger/30 px-3 py-1.5">
        <Flame size={14} className="text-danger animate-pulse" aria-hidden />
        <span className="text-xs font-black text-danger whitespace-nowrap">
          Deal ends in {pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}
        </span>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-danger/30 bg-danger-soft px-4 py-3 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2 min-w-0">
        <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-surface border border-danger/20 text-danger flex-shrink-0">
          <Clock size={18} aria-hidden />
        </span>
        <div className="min-w-0">
          <p className="text-xs font-black text-danger uppercase tracking-wide leading-none mb-1">
            Flash Sale Ends In
          </p>
          <p className="text-[11px] text-text-muted font-medium truncate">
            Today's mega deals expire at midnight
          </p>
        </div>
      </div>

        <div className="flex items-center gap-1.5" aria-live="polite">
          {units.map((unit, i) => (
            <React.Fragment key={unit.label}>
              <div className="flex flex-col items-center rounded-lg bg-foreground px-2 py-1.5 min-w-[46px]">
                <span className="text-lg font-black text-background tabular-nums leading-none">
                  {unit.value}
                </span>
                <span className="text-[9px] font-bold text-text-muted dark:text-text-faint uppercase mt-0.5">
                  {unit.label}
                </span>
              </div>
              {i < units.length - 1 && (
                <span className="text-lg font-black text-danger animate-pulse" aria-hidden>
                  :
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
    </div>
  );
};

export default LiveCountdownTimer;
