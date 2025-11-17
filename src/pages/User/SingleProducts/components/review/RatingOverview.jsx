import { Star } from 'lucide-react';
 const RatingOverview = ({ stats, onFilterChange, activeFilter }) => (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-3xl p-8 mb-6">
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5"></div>
      <div className="relative">
        <h3 className="text-2xl font-bold mb-6">Ratings & Reviews</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-6xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-3">
                {stats.average}
              </div>
              <div className="flex items-center justify-center gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <div className="text-sm text-gray-400">{stats.total.toLocaleString()} ratings</div>
            </div>
          </div>
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((star, index) => (
              <button
                key={star}
                onClick={() => onFilterChange(star)}
                className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all ${
                  activeFilter === star ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30' : 'hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2 w-20">
                  <span className="text-sm font-bold">{star}</span>
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                </div>
                <div className="flex-1 bg-white/10 rounded-full h-2 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600" style={{ width: `${stats.total > 0 ? (stats.distribution[index] / stats.total) * 100 : 0}%` }} />
                </div>
                <span className="text-sm text-gray-400 w-16 text-right font-semibold">{stats.distribution[index]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );


export default RatingOverview;