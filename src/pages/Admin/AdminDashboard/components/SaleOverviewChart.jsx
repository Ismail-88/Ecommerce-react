import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { TrendingUp } from 'lucide-react';

const SaleOverviewChart = ({ salesData }) => {
  return (
    <div className="rounded-2xl border border-border bg-surface shadow-card p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={20} className="text-brand-600 dark:text-brand-400" aria-hidden />
            <h2 className="text-xl font-bold text-foreground">
              Sales Overview
            </h2>
          </div>
          <p className="text-sm text-text-muted">
            Monthly sales performance
          </p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 text-xs rounded-lg font-bold bg-brand-600 text-white">
            6M
          </button>
          <button className="px-4 py-2 text-xs rounded-lg font-bold bg-surface-alt border border-border text-text-muted hover:text-foreground transition-colors">
            1Y
          </button>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={salesData}>
          <defs>
            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--brand)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="var(--brand)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis
            dataKey="month"
            stroke="var(--text-muted)"
            style={{ fontSize: '12px' }}
          />
          <YAxis
            stroke="var(--text-muted)"
            style={{ fontSize: '12px' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
              color: 'var(--foreground)',
            }}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="var(--brand)"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorSales)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SaleOverviewChart;
