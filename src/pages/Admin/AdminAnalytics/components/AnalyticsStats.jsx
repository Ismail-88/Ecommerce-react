import { ArrowUp, ArrowDown, DollarSign, Package, ShoppingCart, Users } from 'lucide-react';
import React from 'react'

const AnalyticsStats = ({ stats }) => {
  const statsConfig = [
    {
      label: 'Total Revenue',
      value: `$${stats.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      growth: stats.revenueGrowth,
      icon: DollarSign,
      iconClass: 'text-info bg-info-soft',
    },
    {
      label: 'Total Orders',
      value: stats.totalOrders,
      growth: stats.ordersGrowth,
      icon: ShoppingCart,
      iconClass: 'text-success bg-success-soft',
    },
    {
      label: 'Total Customers',
      value: stats.totalCustomers,
      icon: Users,
      iconClass: 'text-brand-600 dark:text-brand-400 bg-brand-soft',
    },
    {
      label: 'Avg Order Value',
      value: `$${stats.avgOrderValue.toFixed(2)}`,
      icon: Package,
      iconClass: 'text-warning bg-warning-soft',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statsConfig.map((stat, index) => (
        <div key={index} className="bg-surface border border-border shadow-card p-6 rounded-2xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-muted text-sm font-medium">{stat.label}</p>
              <h3 className="text-2xl font-bold text-foreground mt-2">
                {stat.value}
              </h3>
              {stat.growth !== undefined ? (
                <div className={`flex items-center mt-2 text-sm ${stat.growth >= 0 ? 'text-success' : 'text-danger'}`}>
                  {stat.growth >= 0 ? <ArrowUp size={16} aria-hidden /> : <ArrowDown size={16} aria-hidden />}
                  <span className="ml-1">{Math.abs(stat.growth).toFixed(1)}% from last month</span>
                </div>
              ) : (
                <p className="text-sm text-text-muted mt-2">
                  {stat.label === 'Total Customers' ? 'Active users' : `${stats.totalProducts} products`}
                </p>
              )}
            </div>
            <span className={`p-3 rounded-full ${stat.iconClass}`}>
              <stat.icon size={24} aria-hidden />
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnalyticsStats
