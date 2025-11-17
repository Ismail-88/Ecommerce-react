import AnalyticsStats from "./components/AnalyticsStats";
import CategoryPieChart from "./components/CategoryPieChart";
import RecentOrdersList from "./components/RecentOrdersList";
import SalesTrendChart from "./components/SalesTrendChart";
import TopProductsList from "./components/TopProductsList";
import useAnalytics from "./hooks/useAnalytics";

const Analytics = () => {
  
    const {
        stats,
    loading,
    salesData,
    categoryData,
    topProducts,
    recentOrders,
    } = useAnalytics()


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-gray-600">Loading analytics...</div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Analytics Dashboard</h1>

      {/* Stats Cards */}
       <AnalyticsStats stats={stats}/>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Sales Trend */}
        <SalesTrendChart data={salesData}/>
        {/* Category Distribution */}
        <CategoryPieChart data= {categoryData}/>
      </div>

      {/* Top Products and Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <TopProductsList products={topProducts}/>
        {/* Recent Orders */}
        <RecentOrdersList orders={recentOrders}/>
      </div>
    </div>
  );
};

export default Analytics;