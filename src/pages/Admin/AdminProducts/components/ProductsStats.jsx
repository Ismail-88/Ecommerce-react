// components/Admin/ProductsStats.jsx
import React from 'react';
import { AlertCircle, Box, DollarSign, Tag } from 'lucide-react';
import { useTheme } from '../../../../context/ThemeContext';

const ProductsStats = ({ products, categories }) => {
  const { isDark } = useTheme();
  
  const lowStockCount = products.filter((p) => (p.stock || 0) < 10).length;
  const avgPrice = products.length > 0
    ? (products.reduce((sum, p) => sum + p.price, 0) / products.length).toFixed(2)
    : "0.00";

  const stats = [
    {
      label: "Total Products",
      value: products.length,
      icon: Box,
      color: "cyan",
      bg: isDark ? "from-cyan-500/20 to-blue-500/20" : "from-blue-500 to-blue-600",
      iconBg: isDark ? "from-cyan-500/20 to-blue-500/20" : "bg-blue-100",
      iconColor: isDark ? "text-cyan-400" : "text-blue-600",
    },
    {
      label: "Average Price",
      value: `$${avgPrice}`,
      icon: DollarSign,
      color: "emerald",
      bg: isDark ? "from-emerald-500/20 to-teal-500/20" : "from-green-500 to-emerald-600",
      iconBg: isDark ? "from-emerald-500/20 to-teal-500/20" : "bg-green-100",
      iconColor: isDark ? "text-emerald-400" : "text-green-600",
    },
    {
      label: "Low Stock Alert",
      value: lowStockCount,
      icon: AlertCircle,
      color: "amber",
      bg: isDark ? "from-amber-500/20 to-orange-500/20" : "from-yellow-500 to-orange-500",
      iconBg: isDark ? "from-amber-500/20 to-orange-500/20" : "bg-yellow-100",
      iconColor: isDark ? "text-amber-400" : "text-yellow-600",
    },
    {
      label: "Categories",
      value: categories.length,
      icon: Tag,
      color: "purple",
      bg: isDark ? "from-purple-500/20 to-pink-500/20" : "from-purple-500 to-pink-600",
      iconBg: isDark ? "from-purple-500/20 to-pink-500/20" : "bg-purple-100",
      iconColor: isDark ? "text-purple-400" : "text-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`group relative rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden ${
            isDark 
              ? 'bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-cyan-500/30' 
              : 'bg-white'
          }`}
        >
          {/* Hover Gradient Overlay */}
          {!isDark && (
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
          )}
          
          {/* Dark Mode Hover Effect */}
          {isDark && (
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-blue-500/0 to-purple-500/0 group-hover:from-cyan-500/5 group-hover:via-blue-500/5 group-hover:to-purple-500/5 transition-all"></div>
          )}

          <div className="relative p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className={`text-sm font-medium transition-colors ${
                  isDark 
                    ? 'text-gray-400 group-hover:text-gray-300' 
                    : 'text-gray-600 group-hover:text-white'
                }`}>
                  {stat.label}
                </p>
                <p className={`text-3xl font-bold mt-2 transition-colors ${
                  isDark 
                    ? 'bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent' 
                    : 'text-gray-900 group-hover:text-white'
                }`}>
                  {stat.value}
                </p>
              </div>
              <div className={`p-3 rounded-xl transition-all ${
                isDark 
                  ? `bg-gradient-to-br ${stat.iconBg} backdrop-blur-xl` 
                  : `${stat.iconBg} group-hover:bg-white/20`
              }`}>
                <stat.icon
                  className={`${stat.iconColor} ${!isDark && 'group-hover:text-white'} transition-colors`}
                  size={24}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsStats;