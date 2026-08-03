import { Loader2 } from "lucide-react";

const Spinner = ({ size = 20, className = "", label = "Loading" }) => (
  <span role="status" aria-label={label} className={`inline-flex items-center justify-center ${className}`}>
    <Loader2 size={size} className="animate-spin text-brand-500" aria-hidden />
  </span>
);

export const FullPageSpinner = ({ label = "Loading…" }) => (
  <div className="flex flex-col items-center justify-center gap-3 py-20" role="status" aria-live="polite">
    <Spinner size={32} />
    <span className="text-sm text-text-muted">{label}</span>
  </div>
);

export default Spinner;
