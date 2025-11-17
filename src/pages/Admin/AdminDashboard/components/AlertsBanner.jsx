import { AlertTriangle, Package, ShoppingCart } from 'lucide-react';
import { useTheme } from '../../../../context/ThemeContext';

const AlertsBanner = ({ pendingOrders, lowStock }) => {

   const {isDark} = useTheme();

  if (pendingOrders === 0 && lowStock === 0) return null;

  return (
    <div className={`rounded-2xl border p-6 ${
      isDark 
        ? 'bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/30' 
        : 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200'
    }`}>
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-xl ${
          isDark ? 'bg-yellow-500/20' : 'bg-yellow-100'
        }`}>
          <AlertTriangle className={`w-6 h-6 ${
            isDark ? 'text-yellow-400' : 'text-yellow-600'
          }`} />
        </div>
        <div className="flex-1">
          <h3 className={`font-bold text-lg mb-2 ${
            isDark ? 'text-yellow-400' : 'text-yellow-800'
          }`}>
            Attention Required!
          </h3>
          <div className="flex flex-wrap gap-4">
            {pendingOrders > 0 && (
              <div className="flex items-center gap-2">
                <ShoppingCart className={`w-5 h-5 ${
                  isDark ? 'text-yellow-400' : 'text-yellow-700'
                }`} />
                <span className={`font-semibold ${
                  isDark ? 'text-gray-300' : 'text-yellow-900'
                }`}>
                  {pendingOrders} pending orders
                </span>
              </div>
            )}
            {lowStock > 0 && (
              <div className="flex items-center gap-2">
                <Package className={`w-5 h-5 ${
                  isDark ? 'text-yellow-400' : 'text-yellow-700'
                }`} />
                <span className={`font-semibold ${
                  isDark ? 'text-gray-300' : 'text-yellow-900'
                }`}>
                  {lowStock} products low in stock
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertsBanner;