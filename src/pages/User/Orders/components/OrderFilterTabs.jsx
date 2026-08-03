// components/orders/OrderFilterTabs.jsx
import React from "react";

const OrderFilterTabs = ({ filter, setFilter, getOrderCount }) => {
  const statuses = ["all", "pending", "processing", "shipped", "delivered", "cancelled"];

  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {statuses.map((status) => {
        const active = filter === status;
        return (
          <button
            key={status}
            onClick={() => setFilter(status)}
            aria-pressed={active}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all capitalize border ${
              active
                ? "bg-brand-600 text-white border-brand-600 shadow-card"
                : "border-border bg-surface text-text-muted hover:text-foreground hover:border-brand-500/50"
            }`}
          >
            {status}
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                active ? "bg-white/20 text-white" : "bg-surface-alt text-text-muted"
              }`}
            >
              {getOrderCount(status)}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default OrderFilterTabs;
