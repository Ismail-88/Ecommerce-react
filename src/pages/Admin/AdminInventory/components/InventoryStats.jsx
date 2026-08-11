import { AlertTriangle, Package, TrendingDown, DollarSign } from 'lucide-react'
import React from 'react'
import { formatINR } from '../../../../utils/formatCurrency'

export const InventoryStats = ({ stats }) => {
  const statsConfig = [
    { label: 'Total Products', value: stats.totalProducts, icon: Package, iconClass: 'bg-info/10 text-info' },
    { label: 'Low Stock Items', value: stats.lowStockProducts, icon: TrendingDown, iconClass: 'bg-warning/10 text-warning' },
    { label: 'Out of Stock', value: stats.outOfStockProducts, icon: AlertTriangle, iconClass: 'bg-danger/10 text-danger' },
    {
      label: 'Stock Value',
      value: formatINR(stats.totalStockValue, 2),
      icon: DollarSign,
      iconClass: 'bg-success/10 text-success',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
      {statsConfig.map((stat, index) => (
        <div key={index} className="rounded-xl border border-border bg-surface p-4 shadow-card">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-wider text-text-muted">{stat.label}</p>
              <p className="mt-2 text-[26px] font-bold tracking-tight text-foreground tabular-nums leading-none truncate">
                {stat.value}
              </p>
            </div>
            <span className={`flex items-center justify-center w-10 h-10 rounded-lg shrink-0 ${stat.iconClass}`}>
              <stat.icon size={20} aria-hidden />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InventoryStats
