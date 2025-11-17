import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Store, X, LogOut, Sparkles } from 'lucide-react';
import { MenuItems } from '../data/MenuItems';

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
    <>
      {/* Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden animate-fadeIn"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-gray-900 via-black to-gray-900 border-r border-white/10 text-white transform transition-all duration-300 ease-out lg:translate-x-0 lg:static ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo Section */}
        <div className="relative flex items-center justify-between p-6 border-b border-white/10">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-purple-500/5"></div>
          <div className="relative flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-2xl blur-lg opacity-60"></div>
              <div className="relative bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 p-3 rounded-2xl">
                <Store className="w-6 h-6" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                ShopSphere
              </h1>
              <p className="text-xs text-gray-500 font-medium">Admin Portal</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden relative p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Admin Profile Card */}
        <div className="p-6 border-b border-white/10">
          <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl p-4">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5"></div>
            <div className="relative flex items-center gap-3">
              {hasValidProfileImage() ? (
                <img
                  src={adminInfo.profileImage}
                  alt={getAdminName()}
                  className="w-12 h-12 rounded-xl object-cover border-2 border-white/20"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
              ) : null}
              <div
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg"
                style={{ display: hasValidProfileImage() ? "none" : "flex" }}
              >
                {getAdminInitials()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm truncate">{getAdminName()}</p>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  {getAdminRole()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-1 overflow-y-auto" style={{ maxHeight: "calc(100vh - 300px)" }}>
          {MenuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive(item.path)
                  ? "bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 border border-cyan-500/30 text-white shadow-lg shadow-cyan-500/20"
                  : "text-gray-400 hover:bg-white/5 hover:text-white border border-transparent"
              }`}
            >
              {isActive(item.path) && (
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10"></div>
              )}
              <span className={`relative text-xl transition-transform group-hover:scale-110 ${isActive(item.path) ? 'text-cyan-400' : ''}`}>
                {item.icon}
              </span>
              <span className="relative font-semibold text-sm">{item.title}</span>
            </Link>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="absolute bottom-0 w-full p-4 border-t border-white/10 bg-black/50 backdrop-blur-xl space-y-2">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white border border-white/10 hover:border-white/20 transition-all"
          >
            <Store className="w-5 h-5" />
            <span className="font-semibold text-sm">View Store</span>
          </button>
          <button
            onClick={onLogout}
            className="relative overflow-hidden group w-full rounded-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-600"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative flex items-center justify-center gap-3 px-4 py-3 text-white font-semibold text-sm">
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </div>
          </button>
        </div>
      </aside>
    </>
  );
};