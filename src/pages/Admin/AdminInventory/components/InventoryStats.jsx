import { AlertTriangle, Package, TrendingDown } from 'lucide-react'
import React from 'react'

export const InventoryStats = ({ stats }) => {
  const statsConfig = [
    {
      label: 'Total Products',
      value: stats.totalProducts,
      icon: Package,
      color: 'blue',
      borderColor: 'border-blue-500',
      textColor: 'text-blue-500'
    },
    {
      label: 'Low Stock Items',
      value: stats.lowStockProducts,
      icon: TrendingDown,
      color: 'yellow',
      borderColor: 'border-yellow-500',
      textColor: 'text-yellow-500'
    },
    {
      label: 'Out of Stock',
      value: stats.outOfStockProducts,
      icon: AlertTriangle,
      color: 'red',
      borderColor: 'border-red-500',
      textColor: 'text-red-500'
    },
    {
      label: 'Stock Value',
      value: stats.totalStockValue.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
      icon: Package,
      color: 'green',
      borderColor: 'border-green-500',
      textColor: 'text-green-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {statsConfig.map((stat, index) => (
        <div key={index} className={`bg-white p-6 rounded-lg shadow-md border-l-4 ${stat.borderColor}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</h3>
            </div>
            <stat.icon className={stat.textColor} size={32} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default InventoryStats
