import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BarChart3 } from 'lucide-react';
import { useTheme } from '../../../../context/ThemeContext';

export const WeeklyRevenueChart = () => {
  const revenueData = [
    { day: 'Mon', revenue: 1200, target: 1000 },
    { day: 'Tue', revenue: 1500, target: 1200 },
    { day: 'Wed', revenue: 1800, target: 1400 },
    { day: 'Thu', revenue: 1600, target: 1300 },
    { day: 'Fri', revenue: 2200, target: 1800 },
    { day: 'Sat', revenue: 2800, target: 2200 },
    { day: 'Sun', revenue: 2500, target: 2000 },
  ];

   const {isDark} = useTheme();

  return (
    <div className={`rounded-3xl border p-6 ${
      isDark ? 'bg-gradient-to-br from-white/[0.07] to-white/[0.02] border-white/10' : 'bg-white border-gray-200 shadow-lg'
    }`}>
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 className={`w-5 h-5 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
        <div>
          <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Weekly Revenue</h2>
          <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>Revenue vs Target</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={revenueData}>
          <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#ffffff10' : '#f0f0f0'} />
          <XAxis dataKey="day" stroke={isDark ? '#9ca3af' : '#6b7280'} style={{ fontSize: '12px' }} />
          <YAxis stroke={isDark ? '#9ca3af' : '#6b7280'} style={{ fontSize: '12px' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? '#1f2937' : '#fff',
              border: 'none',
              borderRadius: '12px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
              color: isDark ? '#fff' : '#1f2937',
            }}
          />
          <Legend />
          <Bar dataKey="revenue" fill="#10b981" radius={[8, 8, 0, 0]} />
          <Bar dataKey="target" fill={isDark ? '#ffffff20' : '#e5e7eb'} radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};