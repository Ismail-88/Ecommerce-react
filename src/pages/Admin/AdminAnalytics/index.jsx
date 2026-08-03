import { BarChart3 } from "lucide-react";
import AnalyticsStats from "./components/AnalyticsStats";
import CategoryPieChart from "./components/CategoryPieChart";
import RecentOrdersList from "./components/RecentOrdersList";
import SalesTrendChart from "./components/SalesTrendChart";
import TopProductsList from "./components/TopProductsList";
import useAnalytics from "./hooks/useAnalytics";
import { FullPageSpinner } from "../../../components/ui/Spinner";

const Analytics = () => {
  const {
    stats,
    loading,
    salesData,
    categoryData,
    topProducts,
    recentOrders,
  } = useAnalytics();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <FullPageSpinner label="Loading analytics..." />
      </div>
    );
  }

  return (
    <div className="p-6 bg-background min-h-screen">
      <div className="flex items-center gap-3 mb-6">
        <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-brand-soft text-brand-600 dark:text-brand-400">
          <BarChart3 size={24} aria-hidden />
        </span>
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Analytics Dashboard</h1>
          <p className="text-sm text-text-muted">Track performance and sales trends</p>
        </div>
      </div>

      {/* Stats Cards */}
      <AnalyticsStats stats={stats} />

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Sales Trend */}
        <SalesTrendChart data={salesData} />
        {/* Category Distribution */}
        <CategoryPieChart data={categoryData} />
      </div>

      {/* Top Products and Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <TopProductsList products={topProducts} />
        {/* Recent Orders */}
        <RecentOrdersList orders={recentOrders} />
      </div>
    </div>
  );
};

export default Analytics;
