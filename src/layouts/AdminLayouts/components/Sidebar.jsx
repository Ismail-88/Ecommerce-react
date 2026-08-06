import { Link, useLocation, useNavigate } from "react-router-dom";
import { Store, X, LogOut, Sparkles } from "lucide-react";
import { MenuSections } from "../data/MenuItems";

export const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
  adminInfo,
  getAdminName,
  getAdminRole,
  getAdminInitials,
  hasValidProfileImage,
  onLogout,
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
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden animate-fade-in"
          aria-hidden
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-surface border-r border-border text-foreground transform transition-all duration-300 ease-out lg:translate-x-0 lg:static flex flex-col ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <Link to="/admin/dashboard" className="flex items-center gap-3" onClick={() => setSidebarOpen(false)}>
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 shadow-sm shadow-brand-600/30">
              <Store className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-extrabold tracking-tight text-foreground">ShopSphere</h1>
              <p className="text-xs text-text-muted font-medium">Admin Portal</p>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
            className="lg:hidden p-2 rounded-lg text-text-muted hover:bg-surface-hover hover:text-foreground transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Admin Profile Card */}
        <div className="px-6 py-5 border-b border-border">
          <div className="rounded-xl border border-border bg-surface-alt p-4">
            <div className="flex items-center gap-3">
              {hasValidProfileImage() ? (
                <img
                  src={adminInfo.profileImage}
                  alt={getAdminName()}
                  className="w-11 h-11 rounded-full object-cover border-2 border-brand-500/50"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
              ) : null}
              <div
                className="w-11 h-11 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white font-bold text-base"
                style={{ display: hasValidProfileImage() ? "none" : "flex" }}
              >
                {getAdminInitials()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">{getAdminName()}</p>
                <p className="text-xs text-text-muted flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-brand-500" />
                  {getAdminRole()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-4 py-4 space-y-6 overflow-y-auto" aria-label="Admin navigation">
          {MenuSections.map((section) => (
            <div key={section.label}>
              <p className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-text-faint">
                {section.label}
              </p>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={`group relative flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition-all duration-200 ${
                        active
                          ? "bg-brand-600 text-white shadow-sm shadow-brand-600/25"
                          : "text-text-secondary hover:bg-surface-hover hover:text-foreground"
                      }`}
                    >
                      {active && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-brand-400" aria-hidden />
                      )}
                      <Icon
                        size={18}
                        className={`transition-transform group-hover:scale-110 ${
                          active ? "text-white" : "text-text-muted group-hover:text-brand-600 dark:group-hover:text-brand-400"
                        }`}
                        aria-hidden
                      />
                      <span className="font-medium text-sm">{item.title}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="px-4 py-4 border-t border-border space-y-2">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-3 w-full px-3.5 py-2.5 rounded-lg text-text-secondary hover:bg-surface-hover hover:text-foreground transition-all"
          >
            <Store size={18} aria-hidden />
            <span className="font-medium text-sm">View Store</span>
          </button>
          <button
            onClick={onLogout}
            className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg bg-danger text-white font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            <LogOut size={16} aria-hidden />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};
