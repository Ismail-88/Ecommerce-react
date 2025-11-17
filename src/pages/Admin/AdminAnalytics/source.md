// ============================================
// FILE: src/pages/admin/Analytics/hooks/useAnalytics.js
// ============================================
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export const useAnalytics = () => {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalProducts: 0,
    revenueGrowth: 0,
    ordersGrowth: 0,
    avgOrderValue: 0
  });
  const [loading, setLoading] = useState(true);
  const [salesData, setSalesData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      
      // Fetch all data in parallel
      const [ordersRes, usersRes, productsRes, categoriesRes] = await Promise.all([
        fetch('http://localhost:5000/orders', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('http://localhost:5000/api/admin/users', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('http://localhost:5000/products'),
        fetch('http://localhost:5000/categories')
      ]);

      const orders = await ordersRes.json();
      const users = await usersRes.json();
      const products = await productsRes.json();
      const categories = await categoriesRes.json();

      // Calculate stats
      const totalRevenue = orders.reduce((sum, order) => sum + (order.pricing?.grandTotal || 0), 0);
      const totalOrders = orders.length;
      const totalCustomers = users.users?.filter(u => u.role === 'user').length || 0;
      const totalProducts = products.length;
      const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

      // Calculate growth
      const now = new Date();
      const thisMonth = now.getMonth();
      const thisYear = now.getFullYear();
      
      const thisMonthOrders = orders.filter(o => {
        const orderDate = new Date(o.orderDate);
        return orderDate.getMonth() === thisMonth && orderDate.getFullYear() === thisYear;
      });
      
      const lastMonthOrders = orders.filter(o => {
        const orderDate = new Date(o.orderDate);
        const lastMonth = thisMonth === 0 ? 11 : thisMonth - 1;
        const lastMonthYear = thisMonth === 0 ? thisYear - 1 : thisYear;
        return orderDate.getMonth() === lastMonth && orderDate.getFullYear() === lastMonthYear;
      });

      const thisMonthRevenue = thisMonthOrders.reduce((sum, o) => sum + (o.pricing?.grandTotal || 0), 0);
      const lastMonthRevenue = lastMonthOrders.reduce((sum, o) => sum + (o.pricing?.grandTotal || 0), 0);
      
      const revenueGrowth = lastMonthRevenue > 0 
        ? ((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100 
        : 0;
      const ordersGrowth = lastMonthOrders.length > 0 
        ? ((thisMonthOrders.length - lastMonthOrders.length) / lastMonthOrders.length) * 100 
        : 0;

      setStats({
        totalRevenue,
        totalOrders,
        totalCustomers,
        totalProducts,
        revenueGrowth,
        ordersGrowth,
        avgOrderValue
      });

      // Generate sales data for last 7 days
      const last7Days = [];
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        
        const dayOrders = orders.filter(o => {
          const orderDate = new Date(o.orderDate);
          return orderDate.toDateString() === date.toDateString();
        });
        
        const revenue = dayOrders.reduce((sum, o) => sum + (o.pricing?.grandTotal || 0), 0);
        
        last7Days.push({
          date: dateStr,
          revenue: revenue,
          orders: dayOrders.length
        });
      }
      setSalesData(last7Days);

      // Category sales data
      const categorySales = {};
      orders.forEach(order => {
        order.items?.forEach(item => {
          const categoryName = item.category?.name || 'Uncategorized';
          if (!categorySales[categoryName]) {
            categorySales[categoryName] = 0;
          }
          categorySales[categoryName] += item.price * item.quantity;
        });
      });

      const categoryChartData = Object.entries(categorySales).map(([name, value]) => ({
        name,
        value: Math.round(value)
      }));
      setCategoryData(categoryChartData);

      // Top selling products
      const productSales = {};
      orders.forEach(order => {
        order.items?.forEach(item => {
          if (!productSales[item.title]) {
            productSales[item.title] = {
              title: item.title,
              quantity: 0,
              revenue: 0,
              image: item.images?.[0]
            };
          }
          productSales[item.title].quantity += item.quantity;
          productSales[item.title].revenue += item.price * item.quantity;
        });
      });

      const topProductsList = Object.values(productSales)
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 5);
      setTopProducts(topProductsList);

      // Recent orders
      const recent = orders
        .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
        .slice(0, 5);
      setRecentOrders(recent);

      toast.success('Analytics data loaded successfully!');
      setLoading(false);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      toast.error('Failed to load analytics data');
      setLoading(false);
    }
  };

  return {
    stats,
    loading,
    salesData,
    categoryData,
    topProducts,
    recentOrders,
  };
};

// ============================================
// FILE: src/pages/admin/Analytics/components/AnalyticsStats.jsx
// ============================================
import React from 'react';
import { DollarSign, ShoppingCart, Users, Package, ArrowUp, ArrowDown } from 'lucide-react';

export const AnalyticsStats = ({ stats }) => {
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
      {statsConfig.map((stat, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-2">
                {stat.value}
              </h3>
              {stat.growth !== undefined ? (
                <div className={`flex items-center mt-2 text-sm ${stat.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.growth >= 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                  <span className="ml-1">{Math.abs(stat.growth).toFixed(1)}% {stat.subtitle}</span>
                </div>
              ) : (
                <p className="text-sm text-gray-500 mt-2">{stat.subtitle}</p>
              )}
            </div>
            <div className={`${stat.bgColor} p-3 rounded-full`}>
              <stat.icon className={stat.iconColor} size={24} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// ============================================
// FILE: src/pages/admin/Analytics/components/SalesTrendChart.jsx
// ============================================
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const SalesTrendChart = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Sales Trend (Last 7 Days)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2} name="Revenue (₹)" />
          <Line type="monotone" dataKey="orders" stroke="#10B981" strokeWidth={2} name="Orders" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

// ============================================
// FILE: src/pages/admin/Analytics/components/CategoryPieChart.jsx
// ============================================
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

export const CategoryPieChart = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Sales by Category</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

// ============================================
// FILE: src/pages/admin/Analytics/components/TopProductsList.jsx
// ============================================
import React from 'react';

export const TopProductsList = ({ products }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Selling Products</h3>
      <div className="space-y-4">
        {products.map((product, index) => (
          <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
            <img
              src={product.image || 'https://via.placeholder.com/60'}
              alt={product.title}
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div className="flex-1">
              <p className="font-semibold text-gray-800 text-sm">{product.title}</p>
              <p className="text-xs text-gray-600">Sold: {product.quantity} units</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-green-600">₹{product.revenue.toLocaleString('en-IN')}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================
// FILE: src/pages/admin/Analytics/components/RecentOrdersList.jsx
// ============================================
import React from 'react';

export const RecentOrdersList = ({ orders }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Orders</h3>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.orderId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-semibold text-gray-800 text-sm">{order.orderId}</p>
              <p className="text-xs text-gray-600">{order.shippingInfo?.fullName}</p>
              <p className="text-xs text-gray-500">
                {new Date(order.orderDate).toLocaleDateString()}
              </p>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-800">₹{order.pricing?.grandTotal.toFixed(0)}</p>
              <span className={`text-xs px-2 py-1 rounded-full ${
                order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================
// FILE: src/pages/admin/Analytics/index.jsx
// ============================================
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAnalytics } from './hooks/useAnalytics';
import { AnalyticsStats } from './components/AnalyticsStats';
import { SalesTrendChart } from './components/SalesTrendChart';
import { CategoryPieChart } from './components/CategoryPieChart';
import { TopProductsList } from './components/TopProductsList';
import { RecentOrdersList } from './components/RecentOrdersList';

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
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-gray-600">Loading analytics...</div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <h1 className="text-3xl font-bold text-gray-800 mb-8">Analytics Dashboard</h1>

      {/* Stats Cards */}
      <AnalyticsStats stats={stats} />

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <SalesTrendChart data={salesData} />
        <CategoryPieChart data={categoryData} />
      </div>

      {/* Top Products and Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopProductsList products={topProducts} />
        <RecentOrdersList orders={recentOrders} />
      </div>
    </div>
  );
};

export default Analytics;