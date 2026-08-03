import React from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const tooltipStyle = {
  backgroundColor: 'var(--surface)',
  border: '1px solid var(--border)',
  borderRadius: '12px',
  color: 'var(--foreground)',
};

const SalesTrendChart = ({ data }) => {
  return (
    <div className="bg-surface border border-border shadow-card p-6 rounded-2xl">
      <h3 className="text-lg font-semibold text-foreground mb-4">Sales Trend (Last 7 Days)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="date" stroke="var(--text-muted)" style={{ fontSize: '12px' }} />
          <YAxis stroke="var(--text-muted)" style={{ fontSize: '12px' }} />
          <Tooltip contentStyle={tooltipStyle} />
          <Legend />
          <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2} name="Revenue ($)" />
          <Line type="monotone" dataKey="orders" stroke="#10B981" strokeWidth={2} name="Orders" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default SalesTrendChart
