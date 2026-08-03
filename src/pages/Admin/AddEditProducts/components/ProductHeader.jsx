import { useNavigate } from "react-router-dom";
import { ArrowLeft, Package } from "lucide-react";

export const ProductHeader = ({ isEditMode }) => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-brand-soft via-surface to-surface shadow-card p-8">
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-brand-500/10 rounded-full blur-3xl"></div>

      <div className="relative">
        <button
          onClick={() => navigate("/admin/products")}
          className="flex items-center gap-2 text-text-muted hover:text-brand-600 mb-4 transition-colors group"
        >
          <ArrowLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
            aria-hidden
          />
          <span className="font-semibold">Back to Products</span>
        </button>

        <div className="flex items-center gap-4">
          <span className="flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-600 text-white shadow-card">
            <Package size={30} aria-hidden />
          </span>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              {isEditMode ? "Edit Product" : "Add New Product"}
            </h1>
            <p className="text-text-muted mt-1">
              {isEditMode
                ? "Update product information"
                : "Fill in the details to create a new product"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
