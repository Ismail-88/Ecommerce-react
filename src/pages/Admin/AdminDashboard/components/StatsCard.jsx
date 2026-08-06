import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StatsCard = ({ card }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(card.link)}
      className="group relative overflow-hidden rounded-2xl border border-border bg-surface shadow-card cursor-pointer transition-all hover:scale-[1.02] hover:border-border-strong hover:shadow-overlay"
    >
      <div className="relative p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider mb-2 text-text-muted">
              {card.title}
            </p>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">
              {card.value}
            </h3>
          </div>
          <div className={`p-4 rounded-2xl bg-gradient-to-br ${card.gradient} shadow-card group-hover:scale-110 transition-transform`}>
            <div className="text-white">{card.icon}</div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {card.growth >= 0 ? (
              <TrendingUp size={16} className="text-success" aria-hidden />
            ) : (
              <TrendingDown size={16} className="text-danger" aria-hidden />
            )}
            <span className={`text-sm font-bold ${card.growth >= 0 ? 'text-success' : 'text-danger'}`}>
              {Math.abs(card.growth)}%
            </span>
            <span className="text-xs text-text-muted">
              vs last month
            </span>
          </div>
          <ArrowRight
            size={20}
            className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-brand-600 dark:text-brand-400"
            aria-hidden
          />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
