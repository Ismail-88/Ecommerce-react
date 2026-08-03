import { AlertTriangle } from "lucide-react";

const ErrorState = ({ title = "Something went wrong", message, onRetry, className = "" }) => (
  <div
    role="alert"
    className={`flex flex-col items-center justify-center text-center py-16 px-6 ${className}`}
  >
    <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-danger-soft border border-danger/20 mb-5">
      <AlertTriangle size={28} className="text-danger" aria-hidden />
    </div>
    <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
    {message && <p className="text-sm text-text-muted max-w-sm leading-relaxed mb-6">{message}</p>}
    {onRetry && (
      <button
        onClick={onRetry}
        className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 transition-colors"
      >
        Try Again
      </button>
    )}
  </div>
);

export default ErrorState;
