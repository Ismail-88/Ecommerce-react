import { AlertTriangle } from "lucide-react";
import Modal from "./Modal";
import Button from "./Button";

const ConfirmDialog = ({
  open,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Confirm",
  confirmVariant = "danger",
  loading = false,
}) => (
  <Modal open={open} onClose={onClose} size="sm" closeOnBackdrop={!loading}>
    <div className="flex items-start gap-4">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-danger-soft flex-shrink-0">
        <AlertTriangle size={22} className="text-danger" aria-hidden />
      </div>
      <div>
        <h3 className="font-bold text-foreground mb-1">{title}</h3>
        <p className="text-sm text-text-muted leading-relaxed">{message}</p>
      </div>
    </div>
    <div className="flex justify-end gap-3 mt-6">
      <Button variant="secondary" onClick={onClose} disabled={loading}>
        Cancel
      </Button>
      <Button variant={confirmVariant} onClick={onConfirm} loading={loading}>
        {confirmText}
      </Button>
    </div>
  </Modal>
);

export default ConfirmDialog;
