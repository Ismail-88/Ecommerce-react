const tones = {
  brand: "bg-brand-500/10 text-brand-600 dark:text-brand-400",
  info: "bg-info/10 text-info",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  danger: "bg-danger/10 text-danger",
};

const SectionCard = ({ icon: Icon, title, description, tone = "brand", action, children, className = "" }) => {
  return (
    <section className={`rounded-xl border border-border bg-surface shadow-card overflow-hidden ${className}`}>
      <header className="flex items-center justify-between gap-3 px-5 py-3.5 border-b border-border">
        <div className="flex items-center gap-3">
          <span className={`flex items-center justify-center w-9 h-9 rounded-lg shrink-0 ${tones[tone] || tones.brand}`}>
            <Icon size={18} aria-hidden />
          </span>
          <div>
            <h2 className="text-sm font-bold text-foreground leading-tight">{title}</h2>
            {description && (
              <p className="text-xs text-text-muted mt-0.5">{description}</p>
            )}
          </div>
        </div>
        {action}
      </header>
      <div className="p-5">{children}</div>
    </section>
  );
};

export default SectionCard;
