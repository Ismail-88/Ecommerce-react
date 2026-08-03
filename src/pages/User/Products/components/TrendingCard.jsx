import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Star, ShoppingBag, Plus } from "lucide-react";
import { getData } from "../../../../context/DataContext";
import { useCart } from "../../../../context/CartContext";

const TrendingCard = ({ product }) => {
  const navigate = useNavigate();
  const { getProductImageUrl } = getData();
  const { addToCart, cartItem } = useCart();

  const [loaded, setLoaded] = useState(false);
  const inCart = cartItem?.some((item) => item._id === product._id);
  const discount = product.discount || 10;
  const originalPrice = Math.round(product.price * 1.2);

  return (
    <div
      onClick={() => navigate(`/products/${product._id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && navigate(`/products/${product._id}`)}
      className="group flex-shrink-0 snap-start w-44 sm:w-52 rounded-2xl border border-border bg-surface overflow-hidden hover:shadow-raised hover:border-border-strong transition-all cursor-pointer flex flex-col"
    >
      <div className="relative aspect-square bg-surface-alt overflow-hidden">
        {!loaded && <div className="absolute inset-0 animate-pulse bg-surface-strong" aria-hidden />}
        <img
          src={getProductImageUrl(product)}
          alt={product.title}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
        <span className="absolute top-2 left-2 rounded-full bg-gradient-to-r from-brand-600 to-info text-white text-[10px] font-bold px-2 py-0.5 shadow-sm">
          -{discount}%
        </span>
      </div>

      <div className="p-3 flex-1 flex flex-col">
        <h3 className="text-xs font-semibold text-foreground line-clamp-1 mb-1.5">
          {product.title}
        </h3>
        <div className="flex items-center justify-between gap-1 mt-auto">
          <div>
            <p className="font-extrabold text-foreground text-sm">₹{product.price}</p>
            <p className="text-[10px] text-text-faint line-through">₹{originalPrice}</p>
          </div>
          <div className="flex items-center gap-1">
            <span className="inline-flex items-center gap-0.5 rounded-md bg-success-soft px-1.5 py-0.5 text-[11px] font-bold text-success">
              <Star size={10} className="fill-current" aria-hidden />
              {product.rating || 4.5}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
              disabled={inCart}
              aria-label={inCart ? "Added to cart" : "Add to cart"}
              className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all active:scale-90 ${
                inCart
                  ? "bg-success-soft text-success cursor-not-allowed"
                  : "bg-brand-600 text-white hover:bg-brand-700"
              }`}
            >
              {inCart ? <ShoppingBag size={14} aria-hidden /> : <Plus size={15} aria-hidden />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingCard;
