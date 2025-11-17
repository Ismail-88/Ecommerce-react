import { Clock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../../context/ThemeContext';

const RecentOrdersList = ({ recentOrders }) => {
  const navigate = useNavigate();

   const {isDark} = useTheme();

  return (
    <div className={`rounded-3xl border p-6 ${
      isDark ? 'bg-gradient-to-br from-white/[0.07] to-white/[0.02] border-white/10' : 'bg-white border-gray-200 shadow-lg'
    }`}>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Clock className={`w-5 h-5 ${isDark ? 'text-orange-400' : 'text-orange-600'}`} />
          <div>
            <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Recent Orders</h2>
            <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>Latest 5 orders</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/admin/orders')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all ${
            isDark ? 'bg-white/5 border border-white/10 text-cyan-400 hover:bg-white/10' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
          }`}
        >
          View All
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      <div className="space-y-3">
        {recentOrders.length > 0 ? (
          recentOrders.map((order, index) => (
            <div
              key={index}
              onClick={() => navigate('/admin/orders')}
              className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all ${
                isDark ? 'bg-white/5 border border-white/10 hover:bg-white/10' : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-bold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {order.orderId || `#${order._id?.slice(-8)}`}
                </p>
                <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                  {new Date(order.orderDate || order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right ml-2">
                <p className={`text-sm font-bold ${isDark ? 'text-cyan-400' : 'text-blue-600'}`}>
                  ${(order.pricing?.grandTotal || order.totalAmount || 0).toFixed(2)}
                </p>
                <span className={`text-xs px-2 py-1 rounded-lg ${
                  order.status === 'pending'
                    ? isDark ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' : 'bg-yellow-100 text-yellow-800'
                    : order.status === 'delivered'
                    ? isDark ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-emerald-100 text-emerald-800'
                    : isDark ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-blue-100 text-blue-800'
                }`}>
                  {order.status || 'pending'}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <p className={isDark ? 'text-gray-600' : 'text-gray-400'}>No recent orders</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentOrdersList;