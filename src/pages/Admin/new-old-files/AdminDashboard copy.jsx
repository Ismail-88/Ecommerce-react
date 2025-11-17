import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaBoxOpen,
  FaShoppingCart,
  FaUsers,
  FaDollarSign,
  FaArrowUp,
  FaArrowDown,
  FaEye,
} from 'react-icons/fa';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar,
} from 'recharts';
import { getData } from '../../../context/DataContext';
import axios from 'axios';

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  // Get data from your DataContext
  const { 
    data, 
    fetchAllProducts,
    fetchCategories
  } = getData();
  
  const [stats, setStats] = useState({
    totalRevenue: 0,
    revenueGrowth: 12.5,
    totalOrders: 0,
    ordersGrowth: 8.2,
    totalProducts: 0,
    productsGrowth: 5.4,
    totalCustomers: 0,
    customersGrowth: 15.3,
    pendingOrders: 0,
    lowStock: 0,
  });

  const [allOrders, setAllOrders] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryData, setCategoryData] = useState([]);
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
  const fetchDashboardsData = async () => {
    await fetchDashboardData(); // only call dashboard function once
  };

  fetchDashboardsData();
}, []);

  const fetchDashboardData = async () => {
  try {
    setLoading(true);

    // ✅ Fetch categories and products once
    await fetchCategories();
    await fetchAllProducts();

    // Now data and categories are available in context
    const ordersResponse = await axios.get("http://localhost:5000/orders");
    const ordersData = ordersResponse.data;
    setAllOrders(ordersData);

    // Calculate total revenue
    const totalRevenue = ordersData.reduce((sum, order) => {
      const orderTotal = order.pricing?.grandTotal || order.totalAmount || 0;
      return sum + orderTotal;
    }, 0);

    // Count pending orders
    const pendingOrders = ordersData.filter((o) => o.status === "pending").length;

    // Count low stock products
    const lowStock = data.filter((p) => (p.stock || 0) < 10).length;

    // Unique customers
    const uniqueCustomers = new Set(
      ordersData.map(
        (order) =>
          order.shippingInfo?.email || order.userId || order.customerEmail
      )
    ).size;

    setStats({
      totalRevenue: totalRevenue,
      revenueGrowth: 12.5,
      totalOrders: ordersData.length,
      ordersGrowth: 8.2,
      totalProducts: data.length,
      productsGrowth: 5.4,
      totalCustomers: uniqueCustomers,
      customersGrowth: 15.3,
      pendingOrders: pendingOrders,
      lowStock: lowStock,
    });

    // Recent orders
    const sortedOrders = ordersData.sort(
      (a, b) =>
        new Date(b.orderDate || b.createdAt) -
        new Date(a.orderDate || a.createdAt)
    );
    setRecentOrders(sortedOrders.slice(0, 5));

    // Top products
    setTopProducts(data.slice(0, 5));

    // Category distribution
    const categoryCount = {};
    data.forEach((product) => {
      const catName = product.category?.name || "Other";
      categoryCount[catName] = (categoryCount[catName] || 0) + 1;
    });

    const categoryChartData = Object.entries(categoryCount).map(
      ([name, value], index) => ({
        name,
        value,
        fill: [
          "#ef4444",
          "#f59e0b",
          "#10b981",
          "#3b82f6",
          "#8b5cf6",
          "#ec4899",
        ][index % 6],
      })
    );
    setCategoryData(categoryChartData);

    // Monthly sales
    const monthlySales = calculateMonthlySales(ordersData);
    setSalesData(monthlySales);

  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    setStats({
      totalRevenue: 0,
      revenueGrowth: 0,
      totalOrders: 0,
      ordersGrowth: 0,
      totalProducts: data.length,
      productsGrowth: 0,
      totalCustomers: 0,
      customersGrowth: 0,
      pendingOrders: 0,
      lowStock: 0,
    });
  } finally {
    setLoading(false);
  }
};


  // Calculate monthly sales from orders
  const calculateMonthlySales = (orders) => {
    const monthlyData = {};
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // Initialize last 6 months
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
      monthlyData[monthKey] = {
        month: months[date.getMonth()],
        sales: 0,
        orders: 0,
        revenue: 0
      };
    }

    // Aggregate order data
    orders.forEach(order => {
      const orderDate = new Date(order.orderDate || order.createdAt);
      const monthKey = `${orderDate.getFullYear()}-${orderDate.getMonth()}`;
      
      if (monthlyData[monthKey]) {
        monthlyData[monthKey].orders += 1;
        monthlyData[monthKey].revenue += order.pricing?.grandTotal || order.totalAmount || 0;
        monthlyData[monthKey].sales += order.items?.length || 1;
      }
    });

    return Object.values(monthlyData);
  };

  // Weekly revenue data (from last 7 days of orders)
  const revenueData = [
    { day: 'Mon', revenue: 1200, target: 1000 },
    { day: 'Tue', revenue: 1500, target: 1200 },
    { day: 'Wed', revenue: 1800, target: 1400 },
    { day: 'Thu', revenue: 1600, target: 1300 },
    { day: 'Fri', revenue: 2200, target: 1800 },
    { day: 'Sat', revenue: 2800, target: 2200 },
    { day: 'Sun', revenue: 2500, target: 2000 },
  ];

  const performanceData = [
    { name: 'Sales', value: Math.min(((stats.totalOrders / 200) * 100), 100), fill: '#ef4444' },
    { name: 'Orders', value: Math.min(((stats.totalOrders / 150) * 100), 100), fill: '#10b981' },
    { name: 'Products', value: Math.min(((stats.totalProducts / 100) * 100), 100), fill: '#3b82f6' },
  ];

  // Stats cards configuration
  const statsCards = [
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toFixed(2)}`,
      growth: stats.revenueGrowth,
      icon: <FaDollarSign />,
      bgGradient: 'from-green-500 to-emerald-600',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      link: '/admin/orders',
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      growth: stats.ordersGrowth,
      icon: <FaShoppingCart />,
      bgGradient: 'from-blue-500 to-cyan-600',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      link: '/admin/orders',
    },
    {
      title: 'Total Products',
      value: stats.totalProducts,
      growth: stats.productsGrowth,
      icon: <FaBoxOpen />,
      bgGradient: 'from-purple-500 to-pink-600',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      link: '/admin/products',
    },
    {
      title: 'Total Customers',
      value: stats.totalCustomers,
      growth: stats.customersGrowth,
      icon: <FaUsers />,
      bgGradient: 'from-orange-500 to-red-600',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
      link: '/admin/orders',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold text-lg">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Welcome Header */}
      <div className="space-y-4">
        <div className="bg-gradient-to-r from-red-500 via-pink-500 to-red-600 rounded-2xl p-6 md:p-8 text-white shadow-xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                Welcome back, Admin! 👋
              </h1>
              <p className="text-red-100">
                Here's what's happening with your store today
              </p>
            </div>
            <div className="bg-white/20 backdrop-blur-lg rounded-xl p-4 text-center">
              <p className="text-sm text-red-100">Today's Date</p>
              <p className="text-lg md:text-xl font-bold">
                {new Date().toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Alerts */}
        {(stats.pendingOrders > 0 || stats.lowStock > 0) && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg shadow">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <span className="text-2xl">⚠️</span>
              </div>
              <div>
                <h3 className="text-yellow-800 font-semibold mb-1">
                  Attention Required!
                </h3>
                <p className="text-yellow-700 text-sm">
                  {stats.pendingOrders > 0 && (
                    <span className="mr-3">
                      📦 {stats.pendingOrders} pending orders
                    </span>
                  )}
                  {stats.lowStock > 0 && (
                    <span>
                      📉 {stats.lowStock} products low in stock
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {statsCards.map((card, index) => (
          <div
            key={index}
            onClick={() => navigate(card.link)}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer group"
          >
            <div className={`bg-gradient-to-br ${card.bgGradient} p-6`}>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-white/90 text-sm font-medium mb-2">
                    {card.title}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    {card.value}
                  </h3>
                  <div className="flex items-center gap-1">
                    {card.growth >= 0 ? (
                      <FaArrowUp className="text-white text-xs" />
                    ) : (
                      <FaArrowDown className="text-white text-xs" />
                    )}
                    <span className="text-white text-sm font-semibold">
                      {Math.abs(card.growth)}%
                    </span>
                    <span className="text-white/80 text-xs">vs last month</span>
                  </div>
                </div>
                <div className={`${card.iconBg} p-3 md:p-4 rounded-xl group-hover:scale-110 transition-transform`}>
                  <span className={`${card.iconColor} text-2xl md:text-3xl`}>
                    {card.icon}
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-gray-50 to-white p-3">
              <button className="text-sm text-gray-600 hover:text-gray-900 font-medium flex items-center gap-2">
                View Details
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Overview */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Sales Overview</h2>
              <p className="text-sm text-gray-500">Monthly sales performance</p>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-xs bg-red-500 text-white rounded-lg font-medium">
                6M
              </button>
              <button className="px-3 py-1 text-xs bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 font-medium">
                1Y
              </button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={salesData.length > 0 ? salesData : revenueData}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#ef4444"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorSales)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue vs Target */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800">Weekly Revenue</h2>
            <p className="text-sm text-gray-500">Revenue vs Target comparison</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                }}
              />
              <Legend />
              <Bar dataKey="revenue" fill="#10b981" radius={[8, 8, 0, 0]} />
              <Bar dataKey="target" fill="#e5e7eb" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Distribution */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800">Top Categories</h2>
            <p className="text-sm text-gray-500">Products by category</p>
          </div>
          {categoryData.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {categoryData.slice(0, 4).map((cat, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{ backgroundColor: cat.fill }}
                      ></div>
                      <span className="text-sm text-gray-600 truncate">
                        {cat.name}
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-gray-800">
                      {cat.value}
                    </span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-64">
              <p className="text-gray-400">No category data</p>
            </div>
          )}
        </div>

        {/* Performance Metrics */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800">Performance</h2>
            <p className="text-sm text-gray-500">Monthly targets achieved</p>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="20%"
              outerRadius="100%"
              data={performanceData}
              startAngle={90}
              endAngle={-270}
            >
              <RadialBar
                minAngle={15}
                label={{ position: 'insideStart', fill: '#fff', fontSize: 14 }}
                background
                clockWise
                dataKey="value"
              />
              <Tooltip />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {performanceData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.fill }}
                  ></div>
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
                <span className="text-sm font-semibold text-gray-800">
                  {Math.round(item.value)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Recent Orders</h2>
              <p className="text-sm text-gray-500">Latest 5 orders</p>
            </div>
            <button
              onClick={() => navigate('/admin/orders')}
              className="text-sm text-red-500 hover:text-red-600 font-semibold flex items-center gap-1"
            >
              View All
              <FaEye />
            </button>
          </div>
          <div className="space-y-3">
            {recentOrders.length > 0 ? (
              recentOrders.map((order, index) => (
                <div
                  key={index}
                  onClick={() => navigate('/admin/orders')}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition cursor-pointer"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">
                      {order.orderId || `#${order._id?.slice(-8)}`}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(order.orderDate || order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right ml-2">
                    <p className="text-sm font-bold text-red-500">
                      ${(order.pricing?.grandTotal || order.totalAmount || 0).toFixed(2)}
                    </p>
                    <span
                      className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${
                        order.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : order.status === 'delivered'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {order.status || 'pending'}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 text-sm">No recent orders</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Top Products */}
      {topProducts.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Top Products</h2>
              <p className="text-sm text-gray-500">Best selling products</p>
            </div>
            <button
              onClick={() => navigate('/admin/products')}
              className="text-sm text-red-500 hover:text-red-600 font-semibold"
            >
              View All →
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {topProducts.map((product, index) => (
              <div
                key={index}
                onClick={() => navigate(`/product/${product._id}`)}
                className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition cursor-pointer group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={
                      Array.isArray(product.images)
                        ? product.images[0]
                        : product.images
                    }
                    alt={product.title}
                    className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {product.discount > 0 && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold">
                      -{product.discount}%
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-sm text-gray-800 line-clamp-2 mb-1">
                    {product.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-red-500 font-bold text-sm">${product.price}</span>
                    <span className="text-xs text-gray-500">
                      Stock: {product.stock || 0}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;