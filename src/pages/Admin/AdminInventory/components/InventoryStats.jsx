import { AlertTriangle, Package, TrendingDown, DollarSign } from 'lucide-react'
import React from 'react'
import { formatINR } from '../../../../utils/formatCurrency'

export const InventoryStats = ({ stats }) => {
  const statsConfig = [
    { label: 'Total Products', value: stats.totalProducts, icon: Package, iconClass: 'text-info bg-info-soft' },
    { label: 'Low Stock Items', value: stats.lowStockProducts, icon: TrendingDown, iconClass: 'text-warning bg-warning-soft' },
    { label: 'Out of Stock', value: stats.outOfStockProducts, icon: AlertTriangle, iconClass: 'text-danger bg-danger-soft' },
    {
      label: 'Stock Value',
      value: formatINR(stats.totalStockValue, 2),
      icon: DollarSign,
      iconClass: 'text-success bg-success-soft',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {statsConfig.map((stat, index) => (
        <div key={index} className="bg-surface p-6 rounded-2xl border border-border shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-muted text-sm font-medium">{stat.label}</p>
              <h3 className="text-3xl font-bold text-foreground mt-2">{stat.value}</h3>
            </div>
            <span className={`p-3 rounded-xl ${stat.iconClass}`}>
              <stat.icon size={28} aria-hidden />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InventoryStats
