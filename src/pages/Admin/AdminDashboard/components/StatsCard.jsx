import { TrendingUp, TrendingDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const tones = {
  brand: 'bg-brand-500/10 text-brand-600 dark:text-brand-400',
  info: 'bg-info/10 text-info',
  warning: 'bg-warning/10 text-warning',
  success: 'bg-success/10 text-success',
};

const Sparkline = ({ data, toneClass }) => {
  const w = 96;
  const h = 32;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data.map((d, i) => ({
    x: (i / (data.length - 1)) * w,
    y: h - ((d - min) / range) * (h - 8) - 4,
  }));

  const line = points.map((p) => `${p.x},${p.y}`).join(' ');
  const area = `0,${h} ${line} ${w},${h}`;
  const last = points[points.length - 1];

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className={`w-24 h-8 shrink-0 ${toneClass}`}
      preserveAspectRatio="none"
      aria-hidden
    >
      <polygon points={area} className="fill-current opacity-10" />
      <polyline
        points={line}
        className="fill-none stroke-current"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={last.x} cy={last.y} r="2.25" className="fill-current" />
    </svg>
  );
};

const StatsCard = ({ card }) => {
  const navigate = useNavigate();
  const tone = tones[card.tone] || tones.brand;
  const positive = card.growth >= 0;

  return (
    <div
      onClick={() => navigate(card.link)}
      className="group relative rounded-xl border border-border bg-surface p-5 cursor-pointer transition-all duration-150 hover:border-border-strong hover:shadow-card"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-wider text-text-muted">
            {card.title}
          </p>
          <p className="mt-2 text-[26px] font-bold tracking-tight text-foreground tabular-nums leading-none">
            {card.value}
          </p>
        </div>
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-lg shrink-0 ${tone}`}
        >
          {card.icon}
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between gap-3">
        <div>
          <div
            className={`inline-flex items-center gap-1 text-xs font-bold ${
              positive ? 'text-success' : 'text-danger'
            }`}
          >
            {positive ? (
              <TrendingUp size={13} aria-hidden />
            ) : (
              <TrendingDown size={13} aria-hidden />
            )}
            {Math.abs(card.growth)}%
          </div>
          <p className="text-[11px] text-text-faint mt-0.5">vs last month</p>
        </div>
        <Sparkline data={card.spark} toneClass={tone} />
      </div>
    </div>
  );
};

export default StatsCard;
