import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BarChart3 } from 'lucide-react';

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

  return (
    <div className="rounded-2xl border border-border bg-surface shadow-card p-6">
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 size={20} className="text-success" aria-hidden />
        <div>
          <h2 className="text-xl font-bold text-foreground">Weekly Revenue</h2>
          <p className="text-sm text-text-muted">Revenue vs Target</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={revenueData}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="day" stroke="var(--text-muted)" style={{ fontSize: '12px' }} />
          <YAxis stroke="var(--text-muted)" style={{ fontSize: '12px' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
              color: 'var(--foreground)',
            }}
          />
          <Legend />
          <Bar dataKey="revenue" fill="#FF3F6C" radius={[8, 8, 0, 0]} />
          <Bar dataKey="target" fill="#FB7185" opacity={0.35} radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
