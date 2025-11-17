
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
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-3xl p-6 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Filter:</span>
            <div className="flex gap-2 flex-wrap">
              {filters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => onFilterChange(filter.value)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                    activeFilter === filter.value ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white' : 'bg-white/5 border border-white/10 hover:bg-white/10'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
          <div className="h-8 w-px bg-white/20 hidden md:block" />
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Sort:</span>
            <select value={activeSort} onChange={(e) => onSortChange(e.target.value)} className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl text-white focus:border-cyan-500/50 focus:outline-none font-medium">
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value} className="bg-black">{option.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    );
  };

export default ReviewFilters;