import { Star } from 'lucide-react';

const ReviewFilters = ({ activeFilter, onFilterChange, activeSort, onSortChange }) => {
  const filters = [
    { value: 0, label: 'All' },
    { value: 5, label: '5★' },
    { value: 4, label: '4★' },
    { value: 3, label: '3★' },
    { value: 2, label: '2★' },
    { value: 1, label: '1★' }
  ];
  const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'helpful', label: 'Most Helpful' },
    { value: 'highest', label: 'Highest Rating' },
    { value: 'lowest', label: 'Lowest Rating' }
  ];

  return (
    <div className="rounded-2xl border border-border bg-surface shadow-card p-5 mb-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-sm font-bold text-text-muted uppercase tracking-wider">Filter:</span>
          <div className="flex gap-2 flex-wrap">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => onFilterChange(filter.value)}
                className={`px-3.5 py-1.5 rounded-lg text-sm font-bold transition-all border ${
                  activeFilter === filter.value
                    ? 'bg-brand-600 text-white border-brand-600'
                    : 'bg-surface border-border text-text-muted hover:text-foreground hover:border-brand-500/50'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
        <div className="h-8 w-px bg-border hidden md:block" aria-hidden />
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-text-muted uppercase tracking-wider">Sort:</span>
          <select
            value={activeSort}
            onChange={(e) => onSortChange(e.target.value)}
            className="px-3.5 py-2 rounded-lg border border-border bg-background text-foreground focus:border-brand-500 focus:outline-none font-medium"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ReviewFilters;
