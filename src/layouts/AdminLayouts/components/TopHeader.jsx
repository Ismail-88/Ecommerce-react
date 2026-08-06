import { Menu, Search, Bell, Mail, Sun, Moon } from "lucide-react";
import { useState } from "react";
import { useTheme } from "../../../context/ThemeContext";

export const TopHeader = ({
  onMenuClick,
  adminInfo,
  getAdminName,
  getAdminInitials,
  hasValidProfileImage,
}) => {
  const [notifications] = useState(5);
  const [messages] = useState(3);

  const { isDark, toggleTheme } = useTheme();

  const iconBtn =
    "relative p-2.5 rounded-xl border border-border bg-surface-alt text-text-secondary hover:text-foreground hover:border-border-strong transition-all";

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70">
      <div aria-hidden className="h-0.5 w-full bg-gradient-to-r from-brand-600 via-brand-400 to-brand-700" />
      <div className="flex items-center justify-between px-4 md:px-6 py-3.5 gap-4">
        {/* Left Section */}
        <div className="flex items-center gap-3 flex-1">
          {/* Mobile Menu Button */}
          <button onClick={onMenuClick} aria-label="Open menu" className={`${iconBtn} lg:hidden`}>
            <Menu className="w-5 h-5" />
          </button>

          {/* Search Bar */}
          <div className="hidden md:block relative max-w-md w-full">
            <label htmlFor="admin-search" className="sr-only">
              Search
            </label>
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-text-faint"
              aria-hidden
            />
            <input
              id="admin-search"
              type="search"
              placeholder="Search anything..."
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-border bg-input-bg text-sm text-foreground placeholder:text-text-faint focus:border-brand-500 focus:ring-brand-500/15 focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2.5">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className={iconBtn}
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Notifications */}
          <button className={iconBtn} aria-label={`${notifications} notifications`}>
            <Bell className="w-5 h-5" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-danger text-white text-[11px] rounded-full flex items-center justify-center font-bold shadow-sm">
                {notifications}
              </span>
            )}
          </button>

          {/* Messages */}
          <button className={`${iconBtn} hidden sm:block`} aria-label={`${messages} messages`}>
            <Mail className="w-5 h-5" />
            {messages > 0 && (
              <span className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-brand-600 text-white text-[11px] rounded-full flex items-center justify-center font-bold shadow-sm">
                {messages}
              </span>
            )}
          </button>

          {/* Profile */}
          <div className="hidden md:flex items-center gap-3 pl-3 ml-1 border-l border-border">
            {hasValidProfileImage() ? (
              <img
                src={adminInfo.profileImage}
                alt={getAdminName()}
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
            <div className="text-sm leading-tight">
              <p className="font-semibold text-foreground">{getAdminName()}</p>
              <p className="text-xs text-text-muted">Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
