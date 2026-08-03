import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { PieChart as PieIcon } from 'lucide-react';
import { useState, useEffect } from 'react';

const CategoryDistributionChart = ({ categoryData }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="rounded-2xl border border-border bg-surface shadow-card p-6">
      <div className="flex items-center gap-2 mb-6">
        <PieIcon size={20} className="text-brand-600 dark:text-brand-400" aria-hidden />
        <div>
          <h2 className="text-xl font-bold text-foreground">Top Categories</h2>
          <p className="text-sm text-text-muted">Products by category</p>
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
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
                  color: 'var(--foreground)',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {categoryData.slice(0, 4).map((cat, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.fill }}></div>
                  <span className="text-sm text-text-muted">{cat.name}</span>
                </div>
                <span className="text-sm font-bold text-foreground">{cat.value}</span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-64">
          <p className="text-text-faint">No data available</p>
        </div>
      )}
    </div>
  );
};

export default CategoryDistributionChart;
