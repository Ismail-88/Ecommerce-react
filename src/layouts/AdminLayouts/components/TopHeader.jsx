import { Menu, Search, Bell, Mail, Sun, Moon, User } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../../../context/ThemeContext';

export const TopHeader = ({ 
  onMenuClick, 
  adminInfo,
  getAdminName,
  getAdminInitials,
  hasValidProfileImage,
  
}) => {
  const [notifications] = useState(5);
  const [messages] = useState(3);

  const {isDark,toggleTheme} = useTheme()

  return (
    <header className={`sticky top-0 z-30 border-b transition-colors ${
      isDark 
        ? 'bg-black/80 backdrop-blur-2xl border-white/10' 
        : 'bg-white/80 backdrop-blur-2xl border-gray-200'
    }`}>
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={onMenuClick}
            className={`lg:hidden p-2.5 rounded-xl border transition-all ${
              isDark
                ? 'bg-white/5 border-white/10 hover:bg-white/10 text-white'
                : 'bg-gray-100 border-gray-200 hover:bg-gray-200 text-gray-700'
            }`}
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Search Bar */}
          <div className="hidden md:block relative w-96">
            <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
              isDark ? 'text-gray-500' : 'text-gray-400'
            }`} />
            <input
              type="text"
              placeholder="Search anything..."
              className={`w-full pl-12 pr-4 py-3 rounded-2xl border text-sm font-medium transition-all focus:outline-none ${
                isDark
                  ? 'bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-cyan-500/50 focus:bg-white/10'
                  : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-cyan-500 focus:bg-white'
              }`}
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`relative p-2.5 rounded-xl border transition-all ${
              isDark
                ? 'bg-white/5 border-white/10 hover:bg-white/10 text-cyan-400'
                : 'bg-gray-100 border-gray-200 hover:bg-gray-200 text-gray-700'
            }`}
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Notifications */}
          <button className={`relative p-2.5 rounded-xl border transition-all ${
            isDark
              ? 'bg-white/5 border-white/10 hover:bg-white/10 text-white'
              : 'bg-gray-100 border-gray-200 hover:bg-gray-200 text-gray-700'
          }`}>
            <Bell className="w-5 h-5" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg">
                {notifications}
              </span>
            )}
          </button>

          {/* Messages */}
          <button className={`relative p-2.5 rounded-xl border transition-all ${
            isDark
              ? 'bg-white/5 border-white/10 hover:bg-white/10 text-white'
              : 'bg-gray-100 border-gray-200 hover:bg-gray-200 text-gray-700'
          }`}>
            <Mail className="w-5 h-5" />
            {messages > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg">
                {messages}
              </span>
            )}
          </button>

          {/* Profile */}
          <div className={`hidden md:flex items-center gap-3 pl-3 ml-3 border-l ${
            isDark ? 'border-white/10' : 'border-gray-200'
          }`}>
            {hasValidProfileImage() ? (
              <img
                src={adminInfo.profileImage}
                alt={getAdminName()}
                className="w-10 h-10 rounded-xl object-cover border-2 border-cyan-500/50"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
            ) : null}
            <div
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg"
              style={{ display: hasValidProfileImage() ? "none" : "flex" }}
            >
              {getAdminInitials()}
            </div>
            <div className="text-sm">
              <p className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {getAdminName()}
              </p>
              <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                Administrator
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};