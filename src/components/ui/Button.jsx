import { forwardRef } from "react";
import { Loader2 } from "lucide-react";

const baseStyles =
  "inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 disabled:opacity-60 disabled:cursor-not-allowed select-none whitespace-nowrap";

const variants = {
  primary:
    "bg-brand-600 text-white hover:bg-brand-700 active:bg-brand-800 shadow-sm shadow-brand-600/20",
  secondary: "bg-surface-alt text-foreground border border-border hover:bg-surface-hover hover:border-border-strong",
  outline: "bg-transparent text-brand-600 border border-brand-300 hover:bg-brand-50 dark:border-brand-700 dark:text-brand-400 dark:hover:bg-brand-950",
  ghost: "bg-transparent text-text-secondary hover:bg-surface-hover hover:text-foreground",
  danger: "bg-danger text-white hover:opacity-90 shadow-sm shadow-danger/20",
  dangerOutline: "bg-transparent text-danger border border-danger/40 hover:bg-danger-soft",
  success: "bg-success text-white hover:opacity-90 shadow-sm shadow-success/20",
};

const sizes = {
  xs: "text-xs px-2.5 py-1.5",
  sm: "text-sm px-3 py-2",
  md: "text-sm px-4 py-2.5",
  lg: "text-base px-6 py-3",
  icon: "p-2.5",
};

const Button = forwardRef(function Button(
  { variant = "primary", size = "md", loading = false, className = "", children, disabled, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 size={size === "sm" ? 14 : 16} className="animate-spin" aria-hidden />}
      {children}
    </button>
  );
});

export default Button;
