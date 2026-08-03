const EmptyState = ({
  icon: Icon,
  eyebrow,
  title,
  description,
  action,
  footer,
  className = "",
}) => (
  <div className={`flex flex-col items-center justify-center text-center py-16 px-6 ${className}`}>
    {eyebrow && <div className="mb-5">{eyebrow}</div>}
    {Icon && (
      <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-surface-alt border border-border mb-5">
        <Icon size={28} className="text-text-faint" aria-hidden />
      </div>
    )}
    <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
    {description && <p className="text-sm text-text-muted max-w-sm leading-relaxed mb-6">{description}</p>}
    {action && <div>{action}</div>}
    {footer && <div className="mt-6">{footer}</div>}
  </div>
);

export default EmptyState;
