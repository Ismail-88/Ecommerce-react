const tones = {
  neutral: "bg-surface-strong text-text-secondary border-border",
  brand: "bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 border-brand-200 dark:border-brand-800",
  success: "bg-success-soft text-success border-success/20",
  warning: "bg-warning-soft text-warning border-warning/20",
  danger: "bg-danger-soft text-danger border-danger/20",
  info: "bg-info-soft text-info border-info/20",
};

const Badge = ({ tone = "neutral", children, className = "", dot = false, ...props }) => (
  <span
    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${tones[tone]} ${className}`}
    {...props}
  >
    {dot && <span className="w-1.5 h-1.5 rounded-full bg-current" aria-hidden />}
    {children}
  </span>
);

export default Badge;
