import { useNavigate } from "react-router-dom";
import { Save } from "lucide-react";

import Button from "../../../../components/ui/Button";

export const FormActionButtons = ({ loading, isEditMode }) => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-4 sticky bottom-4 bg-surface rounded-2xl border border-border shadow-overlay p-4">
      <Button
        type="button"
        variant="secondary"
        className="flex-1"
        onClick={() => navigate("/admin/products")}
        disabled={loading}
      >
        Cancel
      </Button>
      <Button
        type="submit"
        className="flex-1"
        loading={loading}
        disabled={loading}
      >
        <Save size={20} aria-hidden />
        {isEditMode ? "Update Product" : "Create Product"}
      </Button>
    </div>
  );
};
