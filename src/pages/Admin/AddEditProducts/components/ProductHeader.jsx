import { useNavigate } from "react-router-dom";
import { ArrowLeft, Package } from "lucide-react";

export const ProductHeader = ({ isEditMode }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-border bg-surface px-5 py-4">
      <div className="flex items-center gap-3">
        <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-brand-600 text-white shrink-0">
          <Package size={20} aria-hidden />
        </span>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            {isEditMode ? "Edit Product" : "Add New Product"}
          </h1>
          <p className="text-sm text-text-muted mt-0.5">
            {isEditMode
              ? "Update product information"
              : "Fill in the details to create a new product"}
          </p>
        </div>
      </div>
      <button
        onClick={() => navigate("/admin/products")}
        className="inline-flex items-center gap-2 self-start sm:self-auto rounded-lg border border-border bg-surface-alt px-3 py-2 text-sm font-medium text-text-secondary hover:bg-surface-hover hover:text-foreground transition-colors"
      >
        <ArrowLeft size={15} aria-hidden />
        Back to Products
      </button>
    </div>
  );
};
