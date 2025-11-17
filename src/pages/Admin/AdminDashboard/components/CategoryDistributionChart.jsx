import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { PieChart as PieIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTheme } from '../../../../context/ThemeContext';

const CategoryDistributionChart = ({ categoryData}) => {
  const [mounted, setMounted] = useState(false);
  
   const {isDark} = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={`rounded-3xl border p-6 ${
      isDark ? 'bg-gradient-to-br from-white/[0.07] to-white/[0.02] border-white/10' : 'bg-white border-gray-200 shadow-lg'
    }`}>
      <div className="flex items-center gap-2 mb-6">
        <PieIcon className={`w-5 h-5 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
        <div>
          <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Top Categories</h2>
          <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>Products by category</p>
        </div>
      </div>
      {categoryData.length > 0 ? (
        <>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? '#1f2937' : '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
                  color: isDark ? '#fff' : '#1f2937',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {categoryData.slice(0, 4).map((cat, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.fill }}></div>
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{cat.name}</span>
                </div>
                <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{cat.value}</span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-64">
          <p className={isDark ? 'text-gray-600' : 'text-gray-400'}>No data available</p>
        </div>
      )}
    </div>
  );
};

export default CategoryDistributionChart;