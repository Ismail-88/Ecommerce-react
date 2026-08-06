import { Outlet } from "react-router-dom";
import { useAdminLayout } from "./hooks/useAdminLayout";
import { Sidebar } from "./components/Sidebar";
import { TopHeader } from "./components/TopHeader";
import { useTheme } from "../../context/ThemeContext";

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

  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="flex h-screen overflow-hidden bg-background">
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
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Top Header */}
        <TopHeader
          onMenuClick={() => setSidebarOpen(true)}
          adminInfo={adminInfo}
          getAdminName={getAdminName}
          getAdminInitials={getAdminInitials}
          hasValidProfileImage={hasValidProfileImage}
          toggleTheme={toggleTheme}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-surface-alt/70">
          <div className="p-4 md:p-6">
            <Outlet context={{ isDark }} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
