import { Star } from 'lucide-react';

const RatingOverview = ({ stats, onFilterChange, activeFilter }) => (
  <div className="rounded-2xl border border-border bg-surface shadow-card p-6 mb-6">
    <h3 className="text-xl font-bold text-foreground mb-6">Ratings & Reviews</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl font-black text-foreground mb-3">
            {stats.average}
          </div>
          <div className="flex items-center justify-center gap-1 mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={20}
                className={`${star <= Math.round(stats.average) ? "fill-warning text-warning" : "text-border"}`}
                aria-hidden
              />
            ))}
          </div>
          <div className="text-sm text-text-muted">{stats.total.toLocaleString()} ratings</div>
        </div>
      </div>
      <div className="space-y-2.5">
        {[5, 4, 3, 2, 1].map((star, index) => (
          <button
            key={star}
            onClick={() => onFilterChange(star)}
            className={`w-full flex items-center gap-4 p-2.5 rounded-lg transition-all border ${
              activeFilter === star
                ? 'bg-brand-soft border-brand-500/30'
                : 'border-transparent hover:bg-surface-hover'
            }`}
          >
            <div className="flex items-center gap-2 w-20">
              <span className="text-sm font-bold text-foreground">{star}</span>
              <Star className="w-4 h-4 fill-warning text-warning" aria-hidden />
            </div>
            <div className="flex-1 bg-border rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-brand-500"
                style={{ width: `${stats.total > 0 ? (stats.distribution[index] / stats.total) * 100 : 0}%` }}
              />
            </div>
            <span className="text-sm text-text-muted w-16 text-right font-semibold">{stats.distribution[index]}</span>
          </button>
        ))}
      </div>
    </div>
  </div>
);

export default RatingOverview;
