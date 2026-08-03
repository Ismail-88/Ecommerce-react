import { AlertTriangle, Package, ShoppingCart } from 'lucide-react';

const AlertsBanner = ({ pendingOrders, lowStock }) => {
  if (pendingOrders === 0 && lowStock === 0) return null;

  return (
    <div className="rounded-2xl border border-warning/30 bg-warning-soft p-5">
      <div className="flex items-start gap-4">
        <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-warning/20 text-warning flex-shrink-0">
          <AlertTriangle size={22} aria-hidden />
        </span>
        <div>
          <h3 className="font-bold text-lg mb-2 text-warning">
            Attention Required!
          </h3>
          <div className="flex flex-wrap gap-4">
            {pendingOrders > 0 && (
              <div className="flex items-center gap-2">
                <ShoppingCart size={18} className="text-warning" aria-hidden />
                <span className="font-semibold text-foreground">
                  {pendingOrders} pending orders
                </span>
              </div>
            )}
            {lowStock > 0 && (
              <div className="flex items-center gap-2">
                <Package size={18} className="text-warning" aria-hidden />
                <span className="font-semibold text-foreground">
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
