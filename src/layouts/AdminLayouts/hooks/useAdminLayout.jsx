import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useTheme } from '../../../context/ThemeContext';

export const useAdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminInfo, setAdminInfo] = useState(null);
  const navigate = useNavigate();
   const {isDark} = useTheme();

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
        <div style="font-size: 1rem; color: #9ca3af;">
          Are you sure you want to log out?
        </div>
      `,
      icon: "question",
      iconColor: "#ef4444",
      showCancelButton: true,
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      background: isDark ? "#111827" : "#fff",
      color: isDark ? "#fff" : "#1f2937",
      customClass: {
        popup: "rounded-3xl shadow-2xl border border-white/10",
        title: "text-2xl font-bold",
        confirmButton:
          "bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:opacity-90 transition-all",
        cancelButton:
          "bg-white/10 text-white px-6 py-3 rounded-xl font-bold hover:bg-white/20 transition-all border border-white/20",
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
          text: "See you soon!",
          icon: "success",
          iconColor: "#10b981",
          showConfirmButton: false,
          timer: 1500,
          background: isDark ? "#111827" : "#fff",
          color: isDark ? "#fff" : "#111827",
          customClass: {
            popup: "rounded-3xl shadow-lg border border-white/10",
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