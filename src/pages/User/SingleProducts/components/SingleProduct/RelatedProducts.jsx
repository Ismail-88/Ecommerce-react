import { useNavigate } from "react-router-dom";
import { Star, ShoppingBag, ArrowRight } from "lucide-react";
import { getData } from "../../../../../context/DataContext";
import { useCart } from "../../../../../context/CartContext";

const RelatedProducts = ({ products }) => {
  const navigate = useNavigate();
  const { getProductImageUrl } = getData();
  const { addToCart, cartItem } = useCart();

  if (!products || products.length === 0) return null;

  return (
    <div className="mt-16">
      <div className="flex items-end justify-between mb-6 flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-bold text-foreground">You may also like</h2>
          <p className="text-sm text-text-muted mt-1">
            {products.length} similar products from this category
          </p>
        </div>
        <button
          onClick={() => navigate("/products")}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 dark:text-brand-400 hover:gap-2.5 transition-all"
        >
          View all products
          <ArrowRight size={15} aria-hidden />
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {products.map((product) => {
          const inCart = cartItem?.some((item) => item._id === product._id);
          const rating = product.rating || 4.5;
          const originalPrice = Math.round(product.price * 1.2);

          return (
            <div
              key={product._id}
              onClick={() => navigate(`/products/${product._id}`)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && navigate(`/products/${product._id}`)}
              className="group bg-surface border border-border rounded-xl overflow-hidden hover:shadow-raised hover:border-border-strong hover:-translate-y-1 transition-all cursor-pointer flex flex-col"
            >
              <div className="relative h-44 bg-surface-alt p-4">
                <img
                  src={getProductImageUrl(product)}
                  alt={product.title}
                  loading="lazy"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
                {product.discount > 0 && (
                  <div className="absolute top-2.5 left-2.5 rounded-full bg-brand-600 text-white text-xs font-bold px-2.5 py-1 shadow-sm">
                    {product.discount}% OFF
                  </div>
                )}
              </div>
              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-sm font-semibold text-foreground line-clamp-2 mb-2 min-h-[2.5rem] group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                  {product.title}
                </h3>
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="inline-flex items-center gap-1 rounded-md bg-success-soft px-1.5 py-0.5 text-xs font-bold text-success">
                    <Star size={11} className="fill-current" aria-hidden />
                    {rating}
                  </span>
                  <span className="text-[11px] text-text-faint">({product.ratingCount || 40} ratings)</span>
                </div>
                <div className="flex items-baseline gap-2 mt-auto">
                  <span className="text-lg font-bold text-foreground">₹{product.price}</span>
                  <span className="text-xs text-text-faint line-through">₹{originalPrice}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
                  disabled={inCart}
                  className={`mt-3 w-full inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold transition-all active:scale-95 ${
                    inCart
                      ? "bg-success-soft text-success cursor-not-allowed"
                      : "bg-brand-600 text-white hover:bg-brand-700 shadow-sm shadow-brand-600/20"
                  }`}
                >
                  <ShoppingBag size={14} aria-hidden />
                  {inCart ? "Added ✓" : "Add to Cart"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RelatedProducts;
