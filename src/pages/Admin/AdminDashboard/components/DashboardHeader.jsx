import { Sparkles, Calendar } from 'lucide-react';
import { useTheme } from '../../../../context/ThemeContext';

const DashboardHeader = () => {

 const {isDark} = useTheme();

  return (
    <div className={`relative overflow-hidden rounded-3xl p-8 ${
      isDark 
        ? 'bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-purple-500/20 border border-white/10' 
        : 'bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600'
    }`}>
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10"></div>
      <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className={`w-6 h-6 ${isDark ? 'text-cyan-400' : 'text-white'}`} />
            <span className={`text-sm font-bold uppercase tracking-wider ${
              isDark ? 'text-cyan-400' : 'text-white/90'
            }`}>
              Admin Dashboard
            </span>
          </div>
          <h1 className={`text-3xl md:text-4xl font-black mb-2 ${
            isDark ? 'text-white' : 'text-white'
          }`}>
            Welcome back, Admin! 👋
          </h1>
          <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-white/80'}`}>
            Here's what's happening with your store today
          </p>
        </div>
        <div className={`rounded-2xl border p-6 text-center backdrop-blur-xl ${
          isDark 
            ? 'bg-white/5 border-white/10' 
            : 'bg-white/20 border-white/30'
        }`}>
          <Calendar className={`w-6 h-6 mx-auto mb-2 ${isDark ? 'text-cyan-400' : 'text-white'}`} />
          <p className={`text-sm mb-1 ${isDark ? 'text-gray-400' : 'text-white/80'}`}>
            Today's Date
          </p>
          <p className={`text-xl font-black ${isDark ? 'text-white' : 'text-white'}`}>
            {new Date().toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;