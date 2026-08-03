import { useNavigate } from 'react-router-dom';
import { Package, Plus } from 'lucide-react';

const ProductsHeader = ({ productsCount }) => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-brand-soft via-surface to-surface shadow-card p-8">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-72 h-72 bg-brand-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-brand-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-3 flex-1">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-600 text-white shadow-card">
              <Package size={28} aria-hidden />
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Product Management
            </h1>
          </div>

          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-sm font-bold text-text-muted">
            <Package size={14} className="text-brand-600 dark:text-brand-400" aria-hidden />
            {productsCount} {productsCount === 1 ? "product" : "products"} in catalog
          </span>
        </div>

        <button
          onClick={() => navigate("/admin/products/add")}
          className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-brand-600 text-white font-bold shadow-card hover:bg-brand-700 hover:scale-[1.02] transition-all"
        >
          <Plus size={20} aria-hidden />
          Add Product
        </button>
      </div>
    </div>
  );
};

export default ProductsHeader;
