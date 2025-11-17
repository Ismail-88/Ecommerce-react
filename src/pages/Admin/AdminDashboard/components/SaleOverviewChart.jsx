import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { useTheme } from '../../../../context/ThemeContext';

const SaleOverviewChart = ({ salesData }) => {

   const {isDark} = useTheme();

  return (
    <div className={`rounded-3xl border p-6 ${
      isDark 
        ? 'bg-gradient-to-br from-white/[0.07] to-white/[0.02] border-white/10' 
        : 'bg-white border-gray-200 shadow-lg'
    }`}>
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5"></div>
      <div className="relative">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className={`w-5 h-5 ${isDark ? 'text-cyan-400' : 'text-blue-600'}`} />
              <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Sales Overview
              </h2>
            </div>
            <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
              Monthly sales performance
            </p>
          </div>
          <div className="flex gap-2">
            <button className={`px-4 py-2 text-xs rounded-xl font-bold ${
              isDark 
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white' 
                : 'bg-blue-600 text-white'
            }`}>
              6M
            </button>
            <button className={`px-4 py-2 text-xs rounded-xl font-bold ${
              isDark 
                ? 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}>
              1Y
            </button>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={salesData}>
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#ffffff10' : '#f0f0f0'} />
            <XAxis 
              dataKey="month" 
              stroke={isDark ? '#9ca3af' : '#6b7280'} 
              style={{ fontSize: '12px' }} 
            />
            <YAxis 
              stroke={isDark ? '#9ca3af' : '#6b7280'} 
              style={{ fontSize: '12px' }} 
            />
            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? '#1f2937' : '#fff',
                border: 'none',
                borderRadius: '12px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
                color: isDark ? '#fff' : '#1f2937',
              }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#06b6d4"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorSales)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SaleOverviewChart;