import { useNavigate } from 'react-router-dom';
import { Package, Plus, Crown, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../../../context/ThemeContext';

const ProductsHeader = ({ productsCount }) => {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className={`relative overflow-hidden rounded-3xl shadow-2xl transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10' 
        : 'bg-gradient-to-br from-red-600 via-red-500 to-pink-600'
    }`}>
      {/* Background Effects */}
      <div className="absolute inset-0">
        {isDark ? (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-black opacity-5"></div>
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-pink-300 opacity-10 rounded-full blur-3xl"></div>
          </>
        )}
      </div>

      <div className="relative p-8 md:p-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-2xl backdrop-blur-xl transition-colors ${
                isDark 
                  ? 'bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600' 
                  : 'bg-white/20'
              }`}>
                <Package className="text-white" size={32} />
              </div>
              <h1 className={`text-3xl md:text-4xl font-bold transition-colors ${
                isDark ? 'bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent' : 'text-white'
              }`}>
                Product Management
              </h1>
            </div>
            
            <div className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 backdrop-blur-xl transition-colors ${
              isDark ? 'border-white/10 bg-white/5' : 'border-white/20 bg-white/10'
            }`}>
            
              <Crown className={`w-4 h-4 ${isDark ? 'text-yellow-400' : 'text-yellow-300'}`} />
              <span className={`text-sm font-bold ${isDark ? 'text-gray-300' : 'text-red-100'}`}>
                {productsCount} {productsCount === 1 ? "product" : "products"} in catalog
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-4 rounded-2xl font-bold backdrop-blur-xl transition-all group ${
                isDark 
                  ? 'border border-white/10 bg-white/5 hover:border-cyan-500/50' 
                  : 'bg-white/20 hover:bg-white/30'
              }`}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? (
                <Sun className="w-6 h-6 text-yellow-400 group-hover:rotate-180 transition-transform duration-500" />
              ) : (
                <Moon className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
              )}
            </button>

            {/* Add Product Button */}
            <button
              onClick={() => navigate("/admin/products/add")}
              className={`group relative overflow-hidden px-8 py-4 rounded-2xl font-bold transition-all duration-300 flex items-center gap-3 shadow-xl hover:scale-105 ${
                isDark 
                  ? '' 
                  : 'bg-white text-red-600'
              }`}
            >
              {isDark && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </>
              )}
              <Plus
                size={24}
                className={`group-hover:rotate-90 transition-transform duration-300 ${isDark ? 'relative z-10 text-white' : ''}`}
              />
              <span className={isDark ? 'relative z-10 text-white' : ''}>Add Product</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsHeader;