import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ShoppingBag, Heart, Star, Eye, TrendingUp, BadgeCheck } from "lucide-react";
import { getData } from "../../../../context/DataContext";
import { useCart } from "../../../../context/CartContext";

const ProductCard = ({ product, viewMode, featured = false }) => {
  const navigate = useNavigate();
  const { addToCart, cartItem } = useCart();
  const { getProductImageUrl } = getData();
  const imageUrl = getProductImageUrl(product);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isInCart = cartItem?.some((item) => item._id === product._id);
  const stock = product.stock ?? 10;
  const isOutOfStock = stock <= 0;
  const lowStock = stock > 0 && stock <= 5;
  const isBestSeller = (product.rating ?? 0) >= 4.5;

  const goToProduct = () => navigate(`/products/${product._id}`);

  const originalPrice = Math.round(product.price * 1.2);
  const discountPercent = product.discount || Math.round(((originalPrice - product.price) / originalPrice) * 100);
  const rating = product.rating || 4.5;
  const ratingCount = product.ratingCount || (Math.floor(120 + rating * 137) % 300) + 24;

  const wishlistButton = (
    <button
      onClick={() => setIsWishlisted(!isWishlisted)}
      aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={isWishlisted}
      className={`flex items-center justify-center w-9 h-9 rounded-full backdrop-blur border transition-all hover:scale-110 active:scale-90 ${
        isWishlisted
          ? "bg-danger-soft border-danger/40 text-danger"
          : "bg-surface/90 border-border text-text-muted hover:text-danger"
      }`}
    >
      <Heart size={16} className={isWishlisted ? "fill-current" : ""} aria-hidden />
    </button>
  );

  const ratingChip = (
    <span className="inline-flex items-center gap-1 rounded-md bg-success-soft px-1.5 py-0.5 text-xs font-bold text-success">
      <Star size={11} className="fill-current" aria-hidden />
      {rating}
    </span>
  );

  const badges = (
    <div className="absolute top-3 left-3 flex flex-col items-start gap-1.5 z-10">
      {isBestSeller && (
        <span className="inline-flex items-center gap-1 rounded-full bg-warning-soft border border-warning/30 text-warning text-[11px] font-bold px-2.5 py-1 shadow-sm">
          <TrendingUp size={11} aria-hidden />
          Bestseller
        </span>
      )}
      <span className="rounded-full bg-gradient-to-r from-brand-600 to-info text-white text-[11px] font-bold px-2.5 py-1 shadow-sm">
        -{discountPercent}%
      </span>
    </div>
  );

  const stockLine = (
    <p className="flex items-center gap-1.5 text-[11px] font-semibold mt-1.5">
      {isOutOfStock ? (
        <span className="text-danger">● Out of Stock</span>
      ) : lowStock ? (
        <span className="text-warning animate-pulse-soft">● Only {stock} left — order soon</span>
      ) : (
        <span className="text-success">● In Stock</span>
      )}
    </p>
  );

  const addButton = (
    <button
      onClick={(e) => {
        e.stopPropagation();
        addToCart(product);
      }}
      disabled={isInCart || isOutOfStock}
      className={`flex items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-bold transition-all active:scale-95 ${
        isInCart
          ? "bg-success-soft text-success cursor-not-allowed"
          : isOutOfStock
          ? "bg-surface-alt text-text-faint cursor-not-allowed"
          : "bg-brand-600 text-white hover:bg-brand-700 shadow-sm shadow-brand-600/25"
      }`}
    >
      <ShoppingBag size={15} aria-hidden />
      {isInCart ? "Added ✓" : isOutOfStock ? "Sold Out" : "Add to Cart"}
    </button>
  );

  /* ---------- FEATURED (wide) variant ---------- */
  if (featured) {
    return (
      <div
        className="group bg-surface border border-border rounded-2xl overflow-hidden hover:shadow-raised hover:border-border-strong transition-all flex flex-col md:flex-row animate-fade-in-up"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="relative md:w-[46%] aspect-[4/3] md:aspect-auto md:min-h-[300px] bg-surface-alt overflow-hidden cursor-pointer"
          onClick={goToProduct}
        >
          {!imageLoaded && <div className="absolute inset-0 animate-pulse bg-surface-strong" aria-hidden />}
          <img
            src={imageUrl}
            alt={product.title}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            } ${isHovered ? "scale-110" : "scale-100"}`}
          />
          {badges}
          <div className="absolute top-3 right-3">{wishlistButton}</div>
          {isOutOfStock && (
            <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] flex items-center justify-center">
              <span className="px-3.5 py-1.5 rounded-lg bg-danger text-white text-xs font-bold uppercase tracking-wide">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        <div className="flex-1 p-6 md:p-8 flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
              <BadgeCheck size={13} aria-hidden />
              {product.category?.name || "Premium"}
            </span>
            <span className="w-1 h-1 rounded-full bg-border-strong" aria-hidden />
            <span className="text-[11px] font-semibold text-text-muted">{product.brand || "ShopSphere"}</span>
          </div>

          <h3
            onClick={goToProduct}
            className="text-xl md:text-2xl font-black text-foreground leading-snug mb-3 cursor-pointer hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
          >
            {product.title}
          </h3>
          <p className="text-sm text-text-muted line-clamp-3 mb-4">{product.description}</p>

          <div className="flex items-center gap-3 mb-5">
            {ratingChip}
            <span className="text-xs text-text-muted">
              {ratingCount} ratings · {Math.max(20, ratingCount / 3) | 0} reviews
            </span>
            {stockLine}
          </div>

          <div className="flex items-baseline gap-2.5 mb-2">
            <span className="text-3xl font-black text-foreground">₹{product.price}</span>
            <span className="text-base text-text-faint line-through">₹{originalPrice}</span>
            <span className="text-sm font-bold text-success">{discountPercent}% off</span>
          </div>
          <p className="text-xs text-text-muted mb-6">
            Inclusive of all taxes · EMI from ₹{Math.ceil(product.price / 6)}/mo
          </p>

          <div className="mt-auto flex flex-wrap gap-3">
            {addButton}
            <button
              onClick={goToProduct}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-border bg-surface-alt px-5 py-2.5 text-sm font-bold text-foreground hover:border-border-strong transition-all"
            >
              <Eye size={15} aria-hidden />
              View Details
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ---------- LIST variant ---------- */
  if (viewMode === "list") {
    return (
      <div
        className="group bg-surface border border-border rounded-xl overflow-hidden hover:shadow-raised hover:border-border-strong transition-all flex flex-col sm:flex-row animate-fade-in-up"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="relative sm:w-56 h-52 sm:h-auto flex-shrink-0 bg-surface-alt overflow-hidden cursor-pointer"
          onClick={goToProduct}
        >
          {!imageLoaded && <div className="absolute inset-0 animate-pulse bg-surface-strong" aria-hidden />}
          <img
            src={imageUrl}
            alt={product.title}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover transition-transform duration-500 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            } ${isHovered ? "scale-105" : "scale-100"}`}
          />
          {badges}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] flex items-center justify-center">
              <span className="px-3 py-1.5 rounded-lg bg-danger text-white text-xs font-bold uppercase tracking-wide">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col p-5 gap-2.5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                  {product.category?.name || "Premium"}
                </span>
                <span className="text-xs text-text-faint">•</span>
                <span className="text-xs text-text-muted">{product.brand || "ShopSphere"}</span>
              </div>
              <h3
                onClick={goToProduct}
                className="font-semibold text-foreground text-base line-clamp-2 cursor-pointer hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
              >
                {product.title}
              </h3>
              <p className="text-sm text-text-muted line-clamp-2 mt-1">{product.description}</p>
              <div className="flex items-center gap-3 mt-2 flex-wrap">
                {ratingChip}
                <span className="text-xs text-text-muted">({ratingCount} ratings)</span>
              </div>
            </div>
            {wishlistButton}
          </div>

          <div className="mt-auto flex items-center justify-between gap-3 pt-2">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-extrabold text-foreground">₹{product.price}</span>
                <span className="text-sm text-text-faint line-through">₹{originalPrice}</span>
                <span className="text-xs font-bold text-success">{discountPercent}% off</span>
              </div>
              {stockLine}
            </div>
            <div className="flex gap-2">
              <button
                onClick={goToProduct}
                aria-label="View product"
                className="p-2.5 rounded-lg border border-border bg-surface-alt text-text-secondary hover:text-brand-600 dark:hover:text-brand-400 hover:border-border-strong transition-all"
              >
                <Eye size={16} aria-hidden />
              </button>
              {addButton}
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ---------- GRID variant (default) ---------- */
  return (
    <div
      className="group bg-surface border border-border rounded-2xl overflow-hidden hover:shadow-raised hover:border-border-strong hover:-translate-y-1 transition-all duration-300 flex flex-col animate-fade-in-up"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div
        className="relative aspect-square bg-surface-alt overflow-hidden cursor-pointer"
        onClick={goToProduct}
      >
        {!imageLoaded && <div className="absolute inset-0 animate-pulse bg-surface-strong" aria-hidden />}
        <img
          src={imageUrl}
          alt={product.title}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-transform duration-700 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          } ${isHovered ? "scale-110" : "scale-100"}`}
        />

        {badges}
        <div className="absolute top-3 right-3">{wishlistButton}</div>

        {/* Hover add-to-cart bar */}
        <div
          className={`absolute inset-x-3 bottom-3 transition-all duration-300 z-10 ${
            isHovered && !isOutOfStock ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            disabled={isInCart}
            className={`w-full py-2.5 rounded-xl text-sm font-bold transition-colors backdrop-blur ${
              isInCart
                ? "bg-success-soft text-success cursor-not-allowed"
                : "bg-foreground/95 text-background hover:bg-brand-600 hover:text-white"
            }`}
          >
            <span className="flex items-center justify-center gap-1.5">
              <ShoppingBag size={14} aria-hidden />
              {isInCart ? "Added to Cart ✓" : "Quick Add"}
            </span>
          </button>
        </div>

        {/* Out of stock */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] flex items-center justify-center">
            <span className="px-3.5 py-1.5 rounded-lg bg-danger text-white text-xs font-bold uppercase tracking-wide">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400 truncate">
            <BadgeCheck size={12} aria-hidden />
            {product.category?.name || "Premium"}
          </span>
          {ratingChip}
        </div>

        <h3
          onClick={goToProduct}
          className="font-semibold text-foreground text-sm line-clamp-2 min-h-[2.5rem] cursor-pointer hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
        >
          {product.title}
        </h3>

        {stockLine}

        <div className="mt-auto pt-2.5">
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="text-lg font-extrabold text-foreground">₹{product.price}</span>
            <span className="text-xs text-text-faint line-through">₹{originalPrice}</span>
          </div>
          <div className="mt-2">{addButton}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
