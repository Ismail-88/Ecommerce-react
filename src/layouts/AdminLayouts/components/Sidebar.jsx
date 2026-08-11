import { Link, useLocation, useNavigate } from "react-router-dom";
import { Store, X, LogOut, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { MenuSections } from "../data/MenuItems";
import lightLogo from "../../../../src/assets/lightmode-3.png";
import darkLogo from "./../../../assets/darkmode3.png";
export const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
  collapsed,
  toggleCollapsed,
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

  const linkBase =
    "group relative flex items-center gap-3 py-2 rounded-lg transition-colors duration-150";
  const iconBase =
    "transition-colors group-hover:text-brand-600 dark:group-hover:text-brand-400";

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
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-surface border-r border-border text-foreground transform transition-all duration-300 ease-out lg:translate-x-0 lg:static flex flex-col lg:transition-[width] ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ${collapsed ? "lg:w-[76px]" : "lg:w-60"}`}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-between p-[10.5px] border-b border-border">
           <Link
    to="/admin/dashboard"
    className={`flex items-center gap-3 ${collapsed ? "lg:justify-center lg:flex-1" : ""}`}
    onClick={() => setSidebarOpen(false)}
  >
    {collapsed ? (
      // Collapsed: show just the icon mark
      <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 shadow-sm shadow-brand-600/30">
        <Store className="w-4.5 h-4.5 text-white" />
      </div>
    ) : (
      // Expanded: show the full logo, theme-aware
      <>
        <img
          src={lightLogo}
          alt="ShopSphere"
          className="h-auto w-[150px] dark:hidden"
        />
        <img
          src={darkLogo}
          alt="ShopSphere"
          className="h-auto w-[150px] hidden dark:block"
        />
      </>
    )}
  </Link>
          <div className="flex items-center">
            <button
              onClick={toggleCollapsed}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              className="hidden lg:block p-1.5 rounded-lg text-text-faint hover:bg-surface-hover hover:text-foreground transition-colors"
            >
              {collapsed ? (
                <PanelLeftOpen className="w-4.5 h-4.5" />
              ) : (
                <PanelLeftClose className="w-4.5 h-4.5" />
              )}
            </button>
            <button
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
              className="lg:hidden p-1.5 rounded-lg text-text-muted hover:bg-surface-hover hover:text-foreground transition-colors"
            >
              <X className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>

        {/* Admin Profile Card */}
        {collapsed ? (
          <div className="hidden lg:flex justify-center py-4 border-b border-border">
            {hasValidProfileImage() ? (
              <img
                src={adminInfo.profileImage}
                alt={getAdminName()}
                title={getAdminName()}
                className="w-9 h-9 rounded-full object-cover border-2 border-brand-500/50"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
            ) : null}
            <div
              className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white font-bold text-sm"
              style={{ display: hasValidProfileImage() ? "none" : "flex" }}
            >
              {getAdminInitials()}
            </div>
          </div>
        ) : (
          <div className="px-4 py-4 border-b border-border">
            <div className="rounded-xl border border-border bg-surface-alt p-3">
              <div className="flex items-center gap-3">
                {hasValidProfileImage() ? (
                  <img
                    src={adminInfo.profileImage}
                    alt={getAdminName()}
                    className="w-10 h-10 rounded-full object-cover border-2 border-brand-500/50"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                ) : null}
                <div
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white font-bold text-sm"
                  style={{ display: hasValidProfileImage() ? "none" : "flex" }}
                >
                  {getAdminInitials()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{getAdminName()}</p>
                  <p className="text-xs text-text-muted truncate">{getAdminRole()}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Menu */}
        <nav
          className={`flex-1 px-3 py-3 overflow-y-auto ${collapsed ? "lg:space-y-1" : "space-y-5"}`}
          aria-label="Admin navigation"
        >
          {MenuSections.map((section) => (
            <div key={section.label}>
              {collapsed ? (
                <div className="hidden lg:block my-2 h-px bg-border" aria-hidden />
              ) : (
                <p className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-text-faint">
                  {section.label}
                </p>
              )}
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      aria-current={active ? "page" : undefined}
                      title={collapsed ? item.title : undefined}
                      className={`${linkBase} ${
                        collapsed ? "lg:justify-center lg:px-0" : "px-3.5"
                      } ${
                        active
                          ? "bg-brand-500/10 text-foreground"
                          : "text-text-secondary hover:bg-surface-hover hover:text-foreground"
                      }`}
                    >
                      {active && (
                        <span
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full bg-brand-500"
                          aria-hidden
                        />
                      )}
                      <Icon
                        size={18}
                        className={`${iconBase} ${
                          active
                            ? "text-brand-600 dark:text-brand-400"
                            : "text-text-muted"
                        }`}
                        aria-hidden
                      />
                      {!collapsed && (
                        <span className="font-medium text-sm">{item.title}</span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="px-3 py-3 border-t border-border space-y-1">
          <button
            onClick={() => navigate("/")}
            title={collapsed ? "View Store" : undefined}
            className={`flex items-center gap-3 w-full py-2 rounded-lg text-text-secondary hover:bg-surface-hover hover:text-foreground transition-colors ${
              collapsed ? "lg:justify-center" : "px-3.5"
            }`}
          >
            <Store size={18} aria-hidden />
            {!collapsed && <span className="font-medium text-sm">View Store</span>}
          </button>
          <button
            onClick={onLogout}
            title={collapsed ? "Logout" : undefined}
            className={`flex items-center gap-2 w-full py-2 rounded-lg bg-danger text-white font-semibold text-sm hover:opacity-90 transition-opacity ${
              collapsed ? "lg:justify-center" : "px-4"
            }`}
          >
            <LogOut size={16} aria-hidden />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};
