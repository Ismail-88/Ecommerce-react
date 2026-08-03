import { forwardRef, useId } from "react";

const Input = forwardRef(function Input(
  { label, error, hint, className = "", required = false, id, ...props },
  ref
) {
  const autoId = useId();
  const inputId = id || autoId;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-text-secondary mb-1.5">
          {label}
          {required && <span className="text-danger ml-0.5" aria-hidden>*</span>}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        required={required}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
        className={`w-full rounded-lg border bg-input-bg px-3.5 py-2.5 text-sm text-foreground placeholder:text-text-faint transition-colors ${
          error
            ? "border-danger focus:border-danger focus:ring-danger/20"
            : "border-border focus:border-brand-500 focus:ring-brand-500/15"
        }`}
        {...props}
      />
      {error ? (
        <p id={`${inputId}-error`} className="mt-1.5 text-xs text-danger">
          {error}
        </p>
      ) : hint ? (
        <p id={`${inputId}-hint`} className="mt-1.5 text-xs text-text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
});

export default Input;
