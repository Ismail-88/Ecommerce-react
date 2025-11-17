
import { SlidersHorizontal } from 'lucide-react';

const MobileFilterToggle = ({ openFilter, setOpenFilter, itemCount }) => {
  return (
    <div className="md:hidden mb-6">
      <button
        onClick={() => setOpenFilter(!openFilter)}
        className="w-full rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-2xl p-5 flex items-center justify-between transition-all hover:border-cyan-500/30"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 flex items-center justify-center">
            <SlidersHorizontal className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg">Filters & Sort</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">{itemCount} items</span>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-xs font-bold">
            {itemCount}
          </div>
        </div>
      </button>
    </div>
  );
};

export default MobileFilterToggle;