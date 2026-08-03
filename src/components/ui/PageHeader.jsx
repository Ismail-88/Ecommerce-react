const PageHeader = ({ title, description, icon: Icon, actions, className = "" }) => (
  <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 ${className}`}>
    <div className="flex items-start gap-3">
      {Icon && (
        <div className="hidden sm:flex items-center justify-center w-11 h-11 rounded-xl bg-primary-soft text-brand-600 dark:text-brand-400 flex-shrink-0">
          <Icon size={22} aria-hidden />
        </div>
      )}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">{title}</h1>
        {description && <p className="text-sm text-text-muted mt-1 max-w-xl">{description}</p>}
      </div>
    </div>
    {actions && <div className="flex items-center gap-3 flex-wrap">{actions}</div>}
  </div>
);

export default PageHeader;
