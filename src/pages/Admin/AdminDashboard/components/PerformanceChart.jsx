import { RadialBarChart, RadialBar, ResponsiveContainer, Tooltip } from 'recharts';
import { Target } from 'lucide-react';
import { useTheme } from '../../../../context/ThemeContext';

const PerformanceChart = ({ stats }) => {
  const performanceData = [
    { name: 'Sales', value: Math.min(((stats.totalOrders / 200) * 100), 100), fill: '#06b6d4' },
    { name: 'Orders', value: Math.min(((stats.totalOrders / 150) * 100), 100), fill: '#10b981' },
    { name: 'Products', value: Math.min(((stats.totalProducts / 100) * 100), 100), fill: '#8b5cf6' },
  ];

   const {isDark} = useTheme();

  return (
    <div className={`rounded-3xl border p-6 ${
      isDark ? 'bg-gradient-to-br from-white/[0.07] to-white/[0.02] border-white/10' : 'bg-white border-gray-200 shadow-lg'
    }`}>
      <div className="flex items-center gap-2 mb-6">
        <Target className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
        <div>
          <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Performance</h2>
          <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>Targets achieved</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="100%" data={performanceData} startAngle={90} endAngle={-270}>
          <RadialBar minAngle={15} label={{ position: 'insideStart', fill: '#fff', fontSize: 14 }} background clockWise dataKey="value" />
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? '#1f2937' : '#fff',
              border: 'none',
              borderRadius: '12px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
              color: isDark ? '#fff' : '#1f2937',
            }}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="mt-4 space-y-2">
        {performanceData.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }}></div>
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{item.name}</span>
            </div>
            <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {Math.round(item.value)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerformanceChart;