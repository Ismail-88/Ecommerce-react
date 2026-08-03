import { AlertCircle, X } from "lucide-react";

export const ErrorAlert = ({ error, onClose }) => {
  if (!error) return null;

  return (
    <div className="bg-danger-soft border border-danger/20 rounded-2xl p-4 flex items-start gap-3">
      <AlertCircle className="text-danger flex-shrink-0" size={24} aria-hidden />
      <div>
        <h4 className="font-bold text-danger">Error</h4>
        <p className="text-danger text-sm">{error}</p>
      </div>
      <button
        onClick={onClose}
        className="ml-auto text-danger hover:opacity-80"
        aria-label="Close error"
      >
        <X size={20} aria-hidden />
      </button>
    </div>
  );
};
