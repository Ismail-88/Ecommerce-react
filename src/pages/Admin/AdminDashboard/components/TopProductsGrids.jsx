import { Package, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TopProductsGrids = ({ topProducts }) => {
  const navigate = useNavigate();

  return (
    <div className="rounded-2xl border border-border bg-surface shadow-card p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Package size={20} className="text-brand-600 dark:text-brand-400" aria-hidden />
          <div>
            <h2 className="text-xl font-bold text-foreground">Top Products</h2>
            <p className="text-sm text-text-muted">Best selling items</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/admin/products')}
          className="flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all bg-surface-alt border border-border text-brand-600 dark:text-brand-400 hover:border-brand-500/50"
        >
          View All
          <ArrowRight size={16} aria-hidden />
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {topProducts.map((product, index) => (
          <div
            key={index}
            onClick={() => navigate(`/products/${product._id}`)}
            className="group rounded-xl overflow-hidden cursor-pointer transition-all hover:scale-[1.02] bg-surface-alt border border-border hover:border-brand-500/40 hover:shadow-card"
          >
            <div className="relative overflow-hidden aspect-square bg-surface p-3">
              <img
                src={Array.isArray(product.images) ? product.images[0] : product.images}
                alt={product.title}
                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
              />
              {product.discount > 0 && (
                <div className="absolute top-2 left-2 bg-danger text-white px-2 py-1 rounded-lg text-xs font-bold">
                  -{product.discount}%
                </div>
              )}
            </div>
            <div className="p-3">
              <h3 className="font-bold text-sm line-clamp-2 mb-2 text-foreground">
                {product.title}
              </h3>
              <div className="flex items-center justify-between">
                <span className="font-bold text-brand-600 dark:text-brand-400">
                  ${product.price}
                </span>
                <span className="text-xs text-text-muted">
                  Stock: {product.stock || 0}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProductsGrids;
