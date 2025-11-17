import { AlertCircle, X } from "lucide-react";

export const ErrorAlert = ({ error, onClose }) => {
  if (!error) return null;

  return (
    <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 flex items-start gap-3">
      <AlertCircle className="text-red-500 flex-shrink-0" size={24} />
      <div>
        <h4 className="font-bold text-red-900">Error</h4>
        <p className="text-red-700 text-sm">{error}</p>
      </div>
      <button
        onClick={onClose}
        className="ml-auto text-red-500 hover:text-red-700"
      >
        <X size={20} />
      </button>
    </div>
  );
};