import { useNavigate } from "react-router-dom";
import { ChevronRight, Save } from "lucide-react";

import Button from "../../../../components/ui/Button";

export const FormActionButtons = ({
  activeStep,
  totalSteps,
  onBack,
  onNext,
  loading,
  isEditMode,
}) => {
  const navigate = useNavigate();
  const isLastStep = activeStep === totalSteps - 1;

  return (
    <div className="flex items-center justify-between gap-4 sticky bottom-4 rounded-xl border border-border bg-surface shadow-overlay px-5 py-3.5">
      <div className="text-xs text-text-muted hidden sm:block">
        Step {activeStep + 1} of {totalSteps}
      </div>
      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="secondary"
          onClick={() => (activeStep === 0 ? navigate("/admin/products") : onBack())}
          disabled={loading}
        >
          {activeStep === 0 ? "Cancel" : "Back"}
        </Button>
        {isLastStep ? (
          <Button type="submit" loading={loading} disabled={loading}>
            <Save size={16} aria-hidden />
            {isEditMode ? "Update Product" : "Create Product"}
          </Button>
        ) : (
          <Button type="button" onClick={onNext}>
            Next
            <ChevronRight size={16} aria-hidden />
          </Button>
        )}
      </div>
    </div>
  );
};
