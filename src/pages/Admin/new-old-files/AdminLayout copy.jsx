import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaShoppingCart,
  FaUsers,
  FaChartBar,
  FaCog,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaStore,
} from 'react-icons/fa';
// import { useUser } from '@clerk/clerk-react';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  // const { user } = useUser();

  const handleLogout = () => {
    // Show confirmation
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    
    if (confirmLogout) {
      // Clear all admin data
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminInfo');
      localStorage.removeItem('rememberAdmin');
      
      // Optional: Clear any other admin-related data
      sessionStorage.clear();
      
      // Log for debugging
      console.log('✅ Logged out successfully');
      
      // Force redirect to login
      navigate('/admin/login', { replace: true });
      
      // Optional: Reload page to clear any cached state
      window.location.href = '/admin/login';
    }
  };

  // Admin menu items
  const menuItems = [
    {
      title: 'Dashboard',
      icon: <FaTachometerAlt />,
      path: '/admin/dashboard',
    },
    {
      title: 'Products',
      icon: <FaBoxOpen />,
      path: '/admin/products',
    },
    {
      title: 'Orders',
      icon: <FaShoppingCart />,
      path: '/admin/orders',
    },
    {
      title: 'Customers',
      icon: <FaUsers />,
      path: '/admin/customers',
    },
    {
      title: 'Analytics',
      icon: <FaChartBar />,
      path: '/admin/analytics',
    },
    {
      title: 'Settings',
      icon: <FaCog />,
      path: '/admin/settings',
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      {/* min-h-screen bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center px-4 py-10 */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="bg-red-500 p-2 rounded-lg">
              <FaStore className="text-2xl" />
            </div>
            <div>
              <h1 className="text-xl font-bold">ShopSphere</h1>
              <p className="text-xs text-gray-400">Admin Panel</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Admin Info */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <img
              src={user?.imageUrl || 'https://via.placeholder.com/40'}
              alt="Admin"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-semibold text-sm">{user?.fullName || 'Admin'}</p>
              <p className="text-xs text-gray-400">Administrator</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive(item.path)
                  ? 'bg-red-500 text-white shadow-lg'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.title}</span>
            </Link>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-700">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-3 w-full px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-all"
          >
            <FaStore className="text-xl" />
            <span className="font-medium">View Store</span>
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 mt-2 text-gray-300 hover:bg-red-600 hover:text-white rounded-lg transition-all"
          >
            <FaSignOutAlt className="text-xl" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between p-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-600 hover:text-gray-900"
            >
              <FaBars className="text-2xl" />
            </button>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-4 hidden md:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products, orders, customers..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  🔍
                </div>
              </div>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                <span className="text-xl">🔔</span>
                <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  5
                </span>
              </button>

              {/* Messages */}
              <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                <span className="text-xl">💬</span>
                <span className="absolute top-0 right-0 w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </button>

              {/* Profile Dropdown */}
              <div className="hidden md:flex items-center gap-2">
                <img
                  src={user?.imageUrl || 'https://via.placeholder.com/40'}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-gray-200"
                />
                <div className="text-sm">
                  <p className="font-semibold text-gray-800">{user?.fullName || 'Admin'}</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-100">
          <Outlet />
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        />
      )}
    </div>
  );
};

export default AdminLayout;