import { Package, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../../context/ThemeContext';

const TopProductsGrids = ({ topProducts }) => {
  const navigate = useNavigate();

   const {isDark} = useTheme();

  return (
    <div className={`rounded-3xl border p-6 ${
      isDark ? 'bg-gradient-to-br from-white/[0.07] to-white/[0.02] border-white/10' : 'bg-white border-gray-200 shadow-lg'
    }`}>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Package className={`w-5 h-5 ${isDark ? 'text-pink-400' : 'text-pink-600'}`} />
          <div>
            <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Top Products</h2>
            <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>Best selling items</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/admin/products')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all ${
            isDark ? 'bg-white/5 border border-white/10 text-cyan-400 hover:bg-white/10' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
          }`}
        >
          View All
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {topProducts.map((product, index) => (
          <div
            key={index}
            onClick={() => navigate(`/products/${product._id}`)}
            className={`group rounded-2xl overflow-hidden cursor-pointer transition-all hover:scale-[1.02] ${
              isDark ? 'bg-white/5 border border-white/10 hover:border-cyan-500/30' : 'bg-gray-50 border border-gray-200 hover:shadow-xl'
            }`}
          >
            <div className="relative overflow-hidden aspect-square bg-gradient-to-br from-white/5 to-transparent p-3">
              <img
                src={Array.isArray(product.images) ? product.images[0] : product.images}
                alt={product.title}
                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
              />
              {product.discount > 0 && (
                <div className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-pink-600 text-white px-2 py-1 rounded-lg text-xs font-bold">
                  -{product.discount}%
                </div>
              )}
            </div>
            <div className="p-3">
              <h3 className={`font-bold text-sm line-clamp-2 mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {product.title}
              </h3>
              <div className="flex items-center justify-between">
                <span className={`font-bold ${isDark ? 'text-cyan-400' : 'text-blue-600'}`}>
                  ${product.price}
                </span>
                <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                  Stock: {product.stock || 0}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProductsGrids;