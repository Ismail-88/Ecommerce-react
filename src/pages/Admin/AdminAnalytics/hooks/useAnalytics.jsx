import React, { useEffect, useState } from 'react'

const useAnalytics = () => {
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
      
      // Fetch all data
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

      // Calculate growth (comparing this month vs last month)
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

      setLoading(false);
    } catch (error) {
      console.error('Error fetching analytics:', error);
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
  }
}

export default useAnalytics
