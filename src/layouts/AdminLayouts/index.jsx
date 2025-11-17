import { Outlet } from 'react-router-dom';
import { useAdminLayout } from './hooks/useAdminLayout';
import { Sidebar } from './components/Sidebar';
import { TopHeader } from './components/TopHeader';
import { useTheme } from '../../context/ThemeContext';

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
    <div className={`flex h-screen overflow-hidden ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-black to-gray-900' 
        : 'bg-gray-50'
    }`}>
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
          getAdminInitials={getAdminInitials}
          hasValidProfileImage={hasValidProfileImage}
          toggleTheme={toggleTheme}
         
        />

        {/* Page Content */}
        <main className={`flex-1 overflow-y-auto overflow-x-hidden ${
          isDark ? 'bg-transparent' : 'bg-gray-50'
        }`}>
          <div className="p-6">
            <Outlet context={{ isDark }} />
          </div>
        </main>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AdminLayout;