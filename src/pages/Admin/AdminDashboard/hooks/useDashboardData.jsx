import { useState, useEffect } from 'react';
import axios from 'axios';
import { api, getData } from '../../../../context/DataContext';

const useDashboardData = () => {
  const {fetchCategories } = getData();
  
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
  const [productsData, setProductsData] = useState([]);

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
        revenue: 0
      };
    }

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

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch all data in parallel
      const [categoriesRes, productsRes, ordersRes] = await Promise.all([
        fetchCategories(),
        api.get("/products"),
        api.get("/orders")
      ]);

      const productsData = productsRes.data;
      const ordersData = ordersRes.data;
      
      setProductsData(productsData);
      setAllOrders(ordersData);

      const totalRevenue = ordersData.reduce((sum, order) => {
        const orderTotal = order.pricing?.grandTotal || order.totalAmount || 0;
        return sum + orderTotal;
      }, 0);

      const pendingOrders = ordersData.filter((o) => o.status === "pending").length;
      const lowStock = productsData.filter((p) => (p.stock || 0) < 10).length;

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
        totalProducts: productsData.length,
        productsGrowth: 5.4,
        totalCustomers: uniqueCustomers,
        customersGrowth: 15.3,
        pendingOrders: pendingOrders,
        lowStock: lowStock,
      });

      const sortedOrders = ordersData.sort(
        (a, b) =>
          new Date(b.orderDate || b.createdAt) -
          new Date(a.orderDate || a.createdAt)
      );
      setRecentOrders(sortedOrders.slice(0, 5));

      setTopProducts(productsData.slice(0, 5));

      const categoryCount = {};
      productsData.forEach((product) => {
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

      const monthlySales = calculateMonthlySales(ordersData);
      setSalesData(monthlySales);

    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []); 

  return {
    stats,
    allOrders,
    recentOrders,
    topProducts,
    loading,
    categoryData,
    salesData,
  };
};

export default useDashboardData