import { Download, Package } from "lucide-react";

import Button from "../../../../components/ui/Button";

export const OrdersHeader = ({ totalOrders, onExport }) => {
  return (
    <div className="rounded-2xl border border-border bg-surface shadow-card p-6 flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <div className="flex items-center gap-3">
        <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-brand-soft text-brand-600 dark:text-brand-400">
          <Package size={24} aria-hidden />
        </span>
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1">
            Order Management
          </h1>
          <p className="text-text-muted">Total Orders: {totalOrders}</p>
        </div>
      </div>
      <Button variant="success" onClick={onExport}>
        <Download size={17} aria-hidden />
        Export Orders
      </Button>
    </div>
  );
};
