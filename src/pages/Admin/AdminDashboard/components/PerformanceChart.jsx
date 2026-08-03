import { RadialBarChart, RadialBar, ResponsiveContainer, Tooltip } from 'recharts';
import { Target } from 'lucide-react';

const PerformanceChart = ({ stats }) => {
  const performanceData = [
    { name: 'Sales', value: Math.min(((stats.totalOrders / 200) * 100), 100), fill: '#06b6d4' },
    { name: 'Orders', value: Math.min(((stats.totalOrders / 150) * 100), 100), fill: '#10b981' },
    { name: 'Products', value: Math.min(((stats.totalProducts / 100) * 100), 100), fill: '#8b5cf6' },
  ];

  return (
    <div className="rounded-2xl border border-border bg-surface shadow-card p-6">
      <div className="flex items-center gap-2 mb-6">
        <Target size={20} className="text-brand-600 dark:text-brand-400" aria-hidden />
        <div>
          <h2 className="text-xl font-bold text-foreground">Performance</h2>
          <p className="text-sm text-text-muted">Targets achieved</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="100%" data={performanceData} startAngle={90} endAngle={-270}>
          <RadialBar minAngle={15} label={{ position: 'insideStart', fill: '#fff', fontSize: 14 }} background clockWise dataKey="value" />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
              color: 'var(--foreground)',
            }}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="mt-4 space-y-2">
        {performanceData.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }}></div>
              <span className="text-sm text-text-muted">{item.name}</span>
            </div>
            <span className="text-sm font-bold text-foreground">
              {Math.round(item.value)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerformanceChart;
