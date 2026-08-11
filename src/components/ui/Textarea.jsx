import { forwardRef, useId } from "react";

const Textarea = forwardRef(function Textarea(
  { label, error, hint, success = false, className = "", required = false, id, rows = 4, ...props },
  ref
) {
  const autoId = useId();
  const textareaId = id || autoId;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={textareaId} className="block text-sm font-medium text-text-secondary mb-1.5">
          {label}
          {required && <span className="text-danger ml-0.5" aria-hidden>*</span>}
        </label>
      )}
      <textarea
        ref={ref}
        id={textareaId}
        rows={rows}
        required={required}
        aria-invalid={error ? "true" : undefined}
        className={`w-full rounded-lg border bg-input-bg px-3.5 py-2.5 text-sm text-foreground placeholder:text-text-faint transition-colors resize-y ${
          error
            ? "border-danger focus:border-danger"
            : success
            ? "border-success focus:border-success"
            : "border-border focus:border-brand-500"
        }`}
        {...props}
      />
      {error ? (
        <p className="mt-1.5 text-xs text-danger">{error}</p>
      ) : hint ? (
        <p className="mt-1.5 text-xs text-text-muted">{hint}</p>
      ) : null}
    </div>
  );
});

export default Textarea;
