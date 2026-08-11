import { forwardRef, useId } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";

const Input = forwardRef(function Input(
  { label, error, hint, success = false, className = "", required = false, id, ...props },
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
      <div className="relative">
        <input
          ref={ref}
          id={inputId}
          required={required}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          className={`w-full rounded-lg border bg-input-bg px-3.5 py-2.5 text-sm text-foreground placeholder:text-text-faint transition-colors ${
            error
              ? "border-danger focus:border-danger focus:ring-danger/20"
              : success
              ? "border-success focus:border-success focus:ring-success/20 pr-9"
              : "border-border focus:border-brand-500 focus:ring-brand-500/15"
          }`}
          {...props}
        />
        {success && !error && (
          <CheckCircle2
            size={16}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-success pointer-events-none"
            aria-hidden
          />
        )}
      </div>
      {error ? (
        <p id={`${inputId}-error`} className="mt-1.5 text-xs text-danger flex items-center gap-1">
          <AlertCircle size={12} aria-hidden />
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
