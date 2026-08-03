const SectionHeading = ({ eyebrow, title, description, action, align = "center", className = "" }) => {
  const alignClasses = {
    center: "text-center mx-auto",
    left: "text-left",
  };

  return (
    <div className={`max-w-2xl mb-10 ${alignClasses[align]} ${className}`}>
      {eyebrow && (
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-200 dark:border-brand-800 bg-primary-soft text-xs font-bold uppercase tracking-wider text-brand-700 dark:text-brand-300 mb-4">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
        {title}
      </h2>
      {description && <p className="mt-3 text-text-secondary leading-relaxed">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
};

export default SectionHeading;
