import { TrendingUp, Package, ShoppingCart, Users, DollarSign, ArrowUpRight, Sparkles } from 'lucide-react';

import useDashboardData from './hooks/useDashboardData';
import DashboardHeader from './components/DashboardHeader';
import AlertsBanner from './components/AlertsBanner';
import StatsCard from './components/StatsCard';
import SaleOverviewChart from './components/SaleOverviewChart';
import { WeeklyRevenueChart } from './components/WeeklyRevenueChart';
import CategoryDistributionChart from './components/CategoryDistributionChart';
import PerformanceChart from './components/PerformanceChart';
import RecentOrdersList from './components/RecentOrdersList';
import TopProductsGrids from './components/TopProductsGrids';
import { useTheme } from '../../../context/ThemeContext';

const AdminDashboard = () => {
  const { stats, recentOrders, topProducts, loading, categoryData, salesData } = useDashboardData();
   const { isDark } = useTheme();

  const statsCards = [
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toFixed(2)}`,
      growth: stats.revenueGrowth,
      icon: <DollarSign className="w-6 h-6" />,
      gradient: 'from-emerald-500 via-green-500 to-teal-600',
      link: '/admin/orders',
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      growth: stats.ordersGrowth,
      icon: <ShoppingCart className="w-6 h-6" />,
      gradient: 'from-cyan-500 via-blue-500 to-indigo-600',
      link: '/admin/orders',
    },
    {
      title: 'Total Products',
      value: stats.totalProducts,
      growth: stats.productsGrowth,
      icon: <Package className="w-6 h-6" />,
      gradient: 'from-purple-500 via-pink-500 to-rose-600',
      link: '/admin/products',
    },
    {
      title: 'Total Customers',
      value: stats.totalCustomers,
      growth: stats.customersGrowth,
      icon: <Users className="w-6 h-6" />,
      gradient: 'from-orange-500 via-red-500 to-pink-600',
      link: '/admin/customers',
    },
  ];

  if (loading) {
    return (
      <div className={`flex items-center justify-center ${
        isDark ? 'bg-black' : 'bg-gray-50'
      }`}>
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-cyan-500/30 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-t-cyan-500 rounded-full animate-spin"></div>
          </div>
          <p className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Loading Dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <DashboardHeader  />

      {/* Alerts */}
      <AlertsBanner
        pendingOrders={stats?.pendingOrders || 0}
        lowStock={stats?.lowStock || 0}
        
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((card, index) => (
          <StatsCard key={index} card={card}  />
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SaleOverviewChart salesData={salesData}  />
        <WeeklyRevenueChart  />
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <CategoryDistributionChart categoryData={categoryData}  />
        <PerformanceChart stats={stats}  />
        <RecentOrdersList recentOrders={recentOrders}  />
      </div>

      {/* Top Products */}
      <TopProductsGrids topProducts={topProducts}  />
    </div>
  );
};

export default AdminDashboard;
