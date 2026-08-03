import { Clock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatINR } from '../../../../utils/formatCurrency';

import Badge from '../../../../components/ui/Badge';

const statusTones = {
  pending: 'warning',
  delivered: 'success',
};

const RecentOrdersList = ({ recentOrders }) => {
  const navigate = useNavigate();

  return (
    <div className="rounded-2xl border border-border bg-surface shadow-card p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Clock size={20} className="text-warning" aria-hidden />
          <div>
            <h2 className="text-xl font-bold text-foreground">Recent Orders</h2>
            <p className="text-sm text-text-muted">Latest 5 orders</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/admin/orders')}
          className="flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all bg-surface-alt border border-border text-brand-600 dark:text-brand-400 hover:border-brand-500/50"
        >
          View All
          <ArrowRight size={16} aria-hidden />
        </button>
      </div>
      <div className="space-y-3">
        {recentOrders.length > 0 ? (
          recentOrders.map((order, index) => (
            <div
              key={index}
              onClick={() => navigate('/admin/orders')}
              className="flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all bg-surface-alt border border-border hover:border-border-strong"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate text-foreground">
                  {order.orderId || `#${order._id?.slice(-8)}`}
                </p>
                <p className="text-xs text-text-muted">
                  {new Date(order.orderDate || order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right ml-2">
                <p className="text-sm font-bold text-brand-600 dark:text-brand-400">
                  {formatINR(order.pricing?.grandTotal || order.totalAmount || 0)}
                </p>
                <Badge tone={statusTones[order.status] || 'info'}>
                  {order.status || 'pending'}
                </Badge>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-text-faint">No recent orders</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentOrdersList;
