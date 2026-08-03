// components/Admin/ProductsStats.jsx
import React from 'react';
import { AlertCircle, Box, DollarSign, Tag } from 'lucide-react';

const ProductsStats = ({ products, categories }) => {
  const lowStockCount = products.filter((p) => (p.stock || 0) < 10).length;
  const avgPrice = products.length > 0
    ? (products.reduce((sum, p) => sum + p.price, 0) / products.length).toFixed(2)
    : "0.00";

  const stats = [
    {
      label: "Total Products",
      value: products.length,
      icon: Box,
      iconBg: "bg-info-soft text-info",
    },
    {
      label: "Average Price",
      value: `$${avgPrice}`,
      icon: DollarSign,
      iconBg: "bg-success-soft text-success",
    },
    {
      label: "Low Stock Alert",
      value: lowStockCount,
      icon: AlertCircle,
      iconBg: "bg-warning-soft text-warning",
    },
    {
      label: "Categories",
      value: categories.length,
      icon: Tag,
      iconBg: "bg-brand-soft text-brand-600 dark:text-brand-400",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="group relative rounded-2xl border border-border bg-surface shadow-card p-6 hover:border-border-strong hover:shadow-overlay transition-all"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-text-muted">
                {stat.label}
              </p>
              <p className="text-3xl font-bold mt-2 text-foreground">
                {stat.value}
              </p>
            </div>
            <span className={`p-3 rounded-xl ${stat.iconBg} group-hover:scale-110 transition-transform`}>
              <stat.icon size={24} aria-hidden />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsStats;
