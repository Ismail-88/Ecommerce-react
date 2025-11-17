import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../../context/ThemeContext';

const StatsCard = ({ card }) => {
  const navigate = useNavigate();

   const {isDark} = useTheme();

  return (
    <div
      onClick={() => navigate(card.link)}
      className={`group relative overflow-hidden rounded-3xl border cursor-pointer transition-all hover:scale-[1.02] ${
        isDark 
          ? 'bg-gradient-to-br from-white/[0.07] to-white/[0.02] border-white/10 hover:border-white/20' 
          : 'bg-white border-gray-200 hover:shadow-2xl'
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      <div className="relative p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className={`text-sm font-bold uppercase tracking-wider mb-2 ${
              isDark ? 'text-gray-500' : 'text-gray-600'
            }`}>
              {card.title}
            </p>
            <h3 className={`text-3xl md:text-4xl font-black ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {card.value}
            </h3>
          </div>
          <div className={`p-4 rounded-2xl bg-gradient-to-br ${card.gradient} shadow-lg group-hover:scale-110 transition-transform`}>
            <div className="text-white">{card.icon}</div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {card.growth >= 0 ? (
              <TrendingUp className="w-4 h-4 text-emerald-500" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500" />
            )}
            <span className={`text-sm font-bold ${
              card.growth >= 0 ? 'text-emerald-500' : 'text-red-500'
            }`}>
              {Math.abs(card.growth)}%
            </span>
            <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
              vs last month
            </span>
          </div>
          <ArrowRight className={`w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all ${
            isDark ? 'text-cyan-400' : 'text-blue-600'
          }`} />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;