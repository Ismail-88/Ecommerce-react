// ============================================
// FILE: src/layouts/AdminLayout/hooks/useAdminLayout.js
// ============================================
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const useAdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminInfo, setAdminInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getAdminInfo = () => {
      try {
        const info = localStorage.getItem("adminInfo");
        if (info) {
          setAdminInfo(JSON.parse(info));
        }
      } catch (error) {
        console.error("Error parsing admin info:", error);
      }
    };

    getAdminInfo();
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: "Logout Confirmation",
      html: `
        <div style="font-size: 1rem; color: #555;">
          Are you sure you want to log out?<br/>
          <span style="color:#777; font-size:0.9rem;">You can log back in anytime.</span>
        </div>
      `,
      icon: "question",
      iconColor: "#ef4444",
      showCancelButton: true,
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      background: "#fff",
      color: "#1f2937",
      allowOutsideClick: false,
      focusCancel: true,
      customClass: {
        popup: "rounded-3xl shadow-2xl",
        title: "text-2xl font-bold text-gray-800",
        confirmButton:
          "bg-gradient-to-r from-red-500 to-pink-600 text-white px-5 py-2 rounded-lg font-semibold shadow-lg hover:from-red-600 hover:to-pink-700 transition-all duration-200",
        cancelButton:
          "bg-gray-200 text-gray-800 px-5 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-200",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminInfo");
        localStorage.removeItem("rememberAdmin");
        sessionStorage.clear();

        Swal.fire({
          title: "Logged Out",
          text: "You have been safely logged out.",
          icon: "success",
          iconColor: "#10b981",
          showConfirmButton: false,
          timer: 1500,
          background: "#ffffff",
          color: "#111827",
          customClass: {
            popup: "rounded-3xl shadow-lg",
            title: "text-xl font-semibold text-gray-800",
          },
        });

        setTimeout(() => {
          navigate("/admin/login", { replace: true });
        }, 1500);
      }
    });
  };

  const getAdminName = () => {
    return adminInfo?.name || "Admin";
  };

  const getAdminRole = () => {
    const role = adminInfo?.role || "admin";
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  const getAdminInitials = () => {
    const name = getAdminName();
    return name.charAt(0).toUpperCase();
  };

  const hasValidProfileImage = () => {
    return !!adminInfo?.profileImage;
  };

  return {
    sidebarOpen,
    setSidebarOpen,
    adminInfo,
    handleLogout,
    getAdminName,
    getAdminRole,
    getAdminInitials,
    hasValidProfileImage,
  };
};

// ============================================
// FILE: src/layouts/AdminLayout/data/menuItems.js
// ============================================
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaShoppingCart,
  FaUsers,
  FaChartBar,
  FaCog,
  FaBoxes,
  FaTags,
} from "react-icons/fa";

export const menuItems = [
  {
    title: "Dashboard",
    icon: <FaTachometerAlt />,
    path: "/admin/dashboard",
  },
  {
    title: "Products",
    icon: <FaBoxOpen />,
    path: "/admin/products",
  },
  {
    title: "Orders",
    icon: <FaShoppingCart />,
    path: "/admin/orders",
  },
  {
    title: "Customers",
    icon: <FaUsers />,
    path: "/admin/customers",
  },
  {
    title: "Analytics",
    icon: <FaChartBar />,
    path: "/admin/analytics",
  },
  {
    title: "Inventory",
    icon: <FaBoxes />,
    path: "/admin/inventory",
  },
  {
    title: "Category",
    icon: <FaTags />,
    path: "/admin/category",
  },
  {
    title: "Settings",
    icon: <FaCog />,
    path: "/admin/settings",
  },
];

// ============================================
// FILE: src/layouts/AdminLayout/components/Sidebar.jsx
// ============================================
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaStore, FaTimes, FaSignOutAlt } from 'react-icons/fa';
import { menuItems } from '../data/menuItems';

export const Sidebar = ({ 
  sidebarOpen, 
  setSidebarOpen, 
  adminInfo,
  getAdminName,
  getAdminRole,
  getAdminInitials,
  hasValidProfileImage,
  onLogout 
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center justify-between p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-red-500 to-pink-600 p-2.5 rounded-xl shadow-lg">
            <FaStore className="text-2xl" />
          </div>
          <div>
            <h1 className="text-xl font-bold">ShopSphere</h1>
            <p className="text-xs text-gray-400">Admin Panel</p>
          </div>
        </div>
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden text-gray-400 hover:text-white transition"
        >
          <FaTimes className="text-xl" />
        </button>
      </div>

      {/* Admin Info */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          {hasValidProfileImage() ? (
            <img
              src={adminInfo.profileImage}
              alt={getAdminName()}
              className="w-12 h-12 rounded-full object-cover"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
          ) : null}
          <div
            className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center text-white font-bold text-lg border-2 border-red-400 shadow-lg"
            style={{ display: hasValidProfileImage() ? "none" : "flex" }}
          >
            {getAdminInitials()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm truncate">{getAdminName()}</p>
            <p className="text-xs text-gray-400">{getAdminRole()}</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav
        className="p-4 space-y-2 overflow-y-auto"
        style={{ maxHeight: "calc(100vh - 280px)" }}
      >
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setSidebarOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              isActive(item.path)
                ? "bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg shadow-red-500/50"
                : "text-gray-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.title}</span>
          </Link>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="absolute bottom-0 w-full p-4 border-t border-white/10 bg-slate-900/50 backdrop-blur">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-3 w-full px-4 py-3 text-gray-300 hover:bg-white/10 hover:text-white rounded-lg transition-all"
        >
          <FaStore className="text-xl" />
          <span className="font-medium">View Store</span>
        </button>
        <button
          onClick={onLogout}
          className="flex items-center gap-3 w-full px-4 py-3 mt-2 text-gray-300 hover:bg-red-600 hover:text-white rounded-lg transition-all"
        >
          <FaSignOutAlt className="text-xl" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

// ============================================
// FILE: src/layouts/AdminLayout/components/TopHeader.jsx
// ============================================
import React from 'react';
import { FaBars } from 'react-icons/fa';

export const TopHeader = ({ 
  onMenuClick, 
  adminInfo,
  getAdminName,
  getAdminRole,
  getAdminInitials,
  hasValidProfileImage 
}) => {
  return (
    <header className="bg-white shadow-sm z-10">
      <div className="flex items-center justify-between p-4">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden text-gray-600 hover:text-gray-900 transition"
        >
          <FaBars className="text-2xl" />
        </button>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl mx-4 hidden md:block">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products, orders, customers..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </div>
          </div>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
            <span className="text-xl">🔔</span>
            <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-semibold">
              5
            </span>
          </button>

          {/* Messages */}
          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
            <span className="text-xl">💬</span>
            <span className="absolute top-0 right-0 w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center font-semibold">
              3
            </span>
          </button>

          {/* Profile Dropdown */}
          <div className="hidden md:flex items-center gap-3 pl-4 border-l border-gray-200">
            {hasValidProfileImage() ? (
              <img
                src={adminInfo.profileImage}
                alt={getAdminName()}
                className="w-10 h-10 rounded-full border-2 border-gray-200 object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
            ) : null}
            <div
              className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center text-white font-bold border-2 border-gray-200 shadow"
              style={{ display: hasValidProfileImage() ? "none" : "flex" }}
            >
              {getAdminInitials()}
            </div>
            <div className="text-sm">
              <p className="font-semibold text-gray-800">{getAdminName()}</p>
              <p className="text-xs text-gray-500">{getAdminRole()}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

// ============================================
// FILE: src/layouts/AdminLayout/index.jsx
// ============================================
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAdminLayout } from './hooks/useAdminLayout';
import { Sidebar } from './components/Sidebar';
import { TopHeader } from './components/TopHeader';

const AdminLayout = () => {
  const {
    sidebarOpen,
    setSidebarOpen,
    adminInfo,
    handleLogout,
    getAdminName,
    getAdminRole,
    getAdminInitials,
    hasValidProfileImage,
  } = useAdminLayout();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        adminInfo={adminInfo}
        getAdminName={getAdminName}
        getAdminRole={getAdminRole}
        getAdminInitials={getAdminInitials}
        hasValidProfileImage={hasValidProfileImage}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <TopHeader
          onMenuClick={() => setSidebarOpen(true)}
          adminInfo={adminInfo}
          getAdminName={getAdminName}
          getAdminRole={getAdminRole}
          getAdminInitials={getAdminInitials}
          hasValidProfileImage={hasValidProfileImage}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
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