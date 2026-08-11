import { useState, useEffect } from 'react';
import { api } from '../../../../context/DataContext';

const DAY = 24 * 60 * 60 * 1000;

const growthPct = (current, previous) => {
  if (previous === 0) return current === 0 ? 0 : 100;
  return Math.round(((current - previous) / previous) * 1000) / 10;
};

const useDashboardData = () => {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    revenueGrowth: 0,
    totalOrders: 0,
    ordersGrowth: 0,
    totalProducts: 0,
    productsGrowth: 0,
    totalCustomers: 0,
    customersGrowth: 0,
    pendingOrders: 0,
    lowStock: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryData, setCategoryData] = useState([]);
  const [salesData, setSalesData] = useState([]);

  const calculateMonthlySales = (orders) => {
    const monthlyData = {};
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
      monthlyData[monthKey] = {
        month: months[date.getMonth()],
        sales: 0,
        orders: 0,
        revenue: 0,
      };
    }

    orders.forEach((order) => {
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

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem('adminToken');
      const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

      const [productsRes, ordersRes, usersRes] = await Promise.all([
        api.get('/products'),
        api.get('/orders'),
        api.get('/api/admin/users?limit=500', { headers: authHeaders }).catch(() => null),
      ]);
      const productsData = productsRes.data;
      const ordersData = ordersRes.data;
      const usersData = usersRes?.data?.users || [];

      const now = Date.now();
      const curStart = now - 30 * DAY;
      const prevStart = now - 60 * DAY;

      const totalRevenue = ordersData.reduce(
        (sum, order) => sum + (order.pricing?.grandTotal || order.totalAmount || 0),
        0
      );

      let revenueCur = 0;
      let revenuePrev = 0;
      let ordersCur = 0;
      let ordersPrev = 0;
      ordersData.forEach((order) => {
        const amount = order.pricing?.grandTotal || order.totalAmount || 0;
        const ts = new Date(order.orderDate || order.createdAt).getTime();
        if (ts >= curStart && ts < now) {
          revenueCur += amount;
          ordersCur += 1;
        } else if (ts >= prevStart && ts < curStart) {
          revenuePrev += amount;
          ordersPrev += 1;
        }
      });

      let productsCur = 0;
      let productsPrev = 0;
      productsData.forEach((product) => {
        const ts = new Date(product.createdAt).getTime();
        if (ts >= curStart && ts < now) productsCur += 1;
        else if (ts >= prevStart && ts < curStart) productsPrev += 1;
      });

      let customersCur = 0;
      let customersPrev = 0;
      usersData.forEach((user) => {
        const ts = new Date(user.createdAt).getTime();
        if (ts >= curStart && ts < now) customersCur += 1;
        else if (ts >= prevStart && ts < curStart) customersPrev += 1;
      });

      const pendingOrders = ordersData.filter((o) => o.status?.toLowerCase() === 'pending').length;
      const lowStock = productsData.filter((p) => (p.stock || 0) < 10).length;

      setStats({
        totalRevenue,
        revenueGrowth: growthPct(revenueCur, revenuePrev),
        totalOrders: ordersData.length,
        ordersGrowth: growthPct(ordersCur, ordersPrev),
        totalProducts: productsData.length,
        productsGrowth: growthPct(productsCur, productsPrev),
        totalCustomers: usersData.length,
        customersGrowth: growthPct(customersCur, customersPrev),
        pendingOrders,
        lowStock,
      });

      const sortedOrders = [...ordersData].sort(
        (a, b) => new Date(b.orderDate || b.createdAt) - new Date(a.orderDate || a.createdAt)
      );
      setRecentOrders(sortedOrders.slice(0, 5));

      setTopProducts(productsData.slice(0, 5));

      const categoryCount = {};
      productsData.forEach((product) => {
        const catName = product.category?.name || 'Other';
        categoryCount[catName] = (categoryCount[catName] || 0) + 1;
      });

      const categoryChartData = Object.entries(categoryCount).map(([name, value], index) => ({
        name,
        value,
        fill: [
          '#FF3F6C',
          '#FB7185',
          '#FF8AA7',
          '#EC4899',
          '#F43F5E',
          '#E0285C',
        ][index % 6],
      }));
      setCategoryData(categoryChartData);

      setSalesData(calculateMonthlySales(ordersData));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return {
    stats,
    recentOrders,
    topProducts,
    loading,
    categoryData,
    salesData,
  };
};

export default useDashboardData;
