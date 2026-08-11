// components/orders/OrderFilterTabs.jsx
import React from "react";

const OrderFilterTabs = ({ filter, setFilter, getOrderCount }) => {
  const statuses = [
    { key: "all", label: "All Orders" },
    { key: "transit", label: "In Transit" },
    { key: "delivered", label: "Delivered" },
    { key: "cancelled", label: "Cancelled" },
  ];

  return (
    <div className="flex items-center gap-6 border-b border-border mb-6 overflow-x-auto">
      {statuses.map(({ key, label }) => {
        const active = filter === key;
        return (
          <button
            key={key}
            onClick={() => setFilter(key)}
            aria-pressed={active}
            className={`relative flex items-center gap-2 px-1 py-3 text-sm font-bold whitespace-nowrap transition-colors border-b-2 -mb-px ${
              active
                ? "text-brand-600 border-brand-600"
                : "text-text-muted border-transparent hover:text-foreground"
            }`}
          >
            {label}
            <span
              className={`px-1.5 py-0.5 rounded-md text-xs font-bold ${
                active ? "bg-brand-50 text-brand-700" : "bg-surface-alt text-text-muted"
              }`}
            >
              {getOrderCount(key)}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default OrderFilterTabs;
