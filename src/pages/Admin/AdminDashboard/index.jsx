import { TrendingUp, Package, ShoppingCart, Users, DollarSign } from 'lucide-react';
import { formatINR } from '../../../utils/formatCurrency';

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
import { FullPageSpinner } from '../../../components/ui/Spinner';

const AdminDashboard = () => {
  const { stats, recentOrders, topProducts, loading, categoryData, salesData } = useDashboardData();

  const statsCards = [
    {
      title: 'Total Revenue',
      value: formatINR(stats.totalRevenue, 2),
      growth: stats.revenueGrowth,
      icon: <DollarSign className="w-6 h-6" />,
      gradient: 'from-brand-500 via-brand-600 to-brand-800',
      link: '/admin/orders',
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      growth: stats.ordersGrowth,
      icon: <ShoppingCart className="w-6 h-6" />,
      gradient: 'from-rose-500 via-brand-600 to-brand-800',
      link: '/admin/orders',
    },
    {
      title: 'Total Products',
      value: stats.totalProducts,
      growth: stats.productsGrowth,
      icon: <Package className="w-6 h-6" />,
      gradient: 'from-brand-400 via-brand-600 to-rose-600',
      link: '/admin/products',
    },
    {
      title: 'Total Customers',
      value: stats.totalCustomers,
      growth: stats.customersGrowth,
      icon: <Users className="w-6 h-6" />,
      gradient: 'from-rose-400 via-rose-500 to-brand-700',
      link: '/admin/customers',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <FullPageSpinner label="Loading Dashboard..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <DashboardHeader />

      {/* Alerts */}
      <AlertsBanner
        pendingOrders={stats?.pendingOrders || 0}
        lowStock={stats?.lowStock || 0}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((card, index) => (
          <StatsCard key={index} card={card} />
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SaleOverviewChart salesData={salesData} />
        <WeeklyRevenueChart />
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <CategoryDistributionChart categoryData={categoryData} />
        <PerformanceChart stats={stats} />
        <RecentOrdersList recentOrders={recentOrders} />
      </div>

      {/* Top Products */}
      <TopProductsGrids topProducts={topProducts} />
    </div>
  );
};

export default AdminDashboard;
