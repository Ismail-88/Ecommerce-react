import { Truck, RotateCcw, ShieldCheck, BadgePercent, Banknote } from "lucide-react";

const TrustBadges = ({ compact = false }) => {
  const items = [
    { icon: Truck, label: "Free Delivery", sub: "On orders over ₹50" },
    { icon: RotateCcw, label: "7-Day Returns", sub: "No questions asked" },
    { icon: Banknote, label: "COD Available", sub: "Pay at your door" },
    { icon: ShieldCheck, label: "1-Year Warranty", sub: "Genuine products" },
    { icon: BadgePercent, label: "Secure Payments", sub: "UPI, Cards & more" },
  ];

  return (
    <div className={compact ? "grid grid-cols-2 gap-3" : "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3"}>
      {items.map(({ icon: Icon, label, sub }) => (
        <div
          key={label}
          className="flex items-center gap-2.5 p-3 rounded-xl border border-border bg-surface shadow-card"
        >
          <span className={`flex items-center justify-center rounded-lg bg-success-soft text-success flex-shrink-0 ${compact ? "w-8 h-8" : "w-9 h-9"}`}>
            <Icon size={compact ? 15 : 17} aria-hidden />
          </span>
          <div className="min-w-0">
            <p className="text-xs font-bold text-foreground truncate">{label}</p>
            <p className="text-[10px] text-text-muted truncate">{sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrustBadges;
