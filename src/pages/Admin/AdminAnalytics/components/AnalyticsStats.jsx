import { ArrowUp,ArrowDown,  DollarSign, Package, ShoppingCart, Users } from 'lucide-react';
import React from 'react'

const AnalyticsStats = ({stats}) => {
    const statsConfig = [
    {
      label: 'Total Revenue',
      value: `₹${stats.totalRevenue.toLocaleString('en-IN')}`,
      growth: stats.revenueGrowth,
      icon: DollarSign,
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
      subtitle: 'from last month'
    },
    {
      label: 'Total Orders',
      value: stats.totalOrders,
      growth: stats.ordersGrowth,
      icon: ShoppingCart,
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600',
      subtitle: 'from last month'
    },
    {
      label: 'Total Customers',
      value: stats.totalCustomers,
      icon: Users,
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600',
      subtitle: 'Active users'
    },
    {
      label: 'Avg Order Value',
      value: `₹${stats.avgOrderValue.toFixed(0)}`,
      icon: Package,
      bgColor: 'bg-orange-100',
      iconColor: 'text-orange-600',
      subtitle: `${stats.totalProducts} products`
    }
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsConfig.map((stat, index)=>(
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                  <h3 className="text-2xl font-bold text-gray-800 mt-2">
                   {stat.value}
                  </h3>
                  {stat.growth !== undefined ? (
                    <div className={`flex items-center mt-2 text-sm ${stats.revenueGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.growth >= 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                    <span className="ml-1">{Math.abs(stat.growth).toFixed(1)}% from last month</span>
                  </div>
                  ) : (
                     <p className="text-sm text-gray-500 mt-2">{stat.subtitle}</p>
                  )}
                  
                </div>
                {/* <div className="bg-blue-100 p-3 rounded-full">
                  <DollarSign className="text-blue-600" size={24} />
                </div> */}
                <div className={`${stat.bgColor} p-3 rounded-full`}>
              <stat.icon className={stat.iconColor} size={24} />
            </div>
              </div>
            </div>
        ))}
        </div>  
  )
}

export default AnalyticsStats

