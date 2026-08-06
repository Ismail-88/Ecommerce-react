import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ShoppingBag, Heart, Star, TrendingUp, BadgeCheck } from "lucide-react";
import { getData } from "../../../../context/DataContext";
import { useCart } from "../../../../context/CartContext";
import { useWishlist } from "../../../../context/WishlistContext";
import { formatINR } from "../../../../utils/formatCurrency";

const ProductCard = ({ product, viewMode, featured = false }) => {
  const navigate = useNavigate();
  const { addToCart, cartItem } = useCart();
  const { getProductImageUrl } = getData();
  const { toggleWishlist, isWishlisted: isInWishlist } = useWishlist();
  const imageUrl = getProductImageUrl(product);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isWishlisted = isInWishlist(product._id);

  const isInCart = cartItem?.some((item) => item._id === product._id);
  const stock = product.stock ?? 10;
  const isOutOfStock = stock <= 0;
  const isBestSeller = (product.rating ?? 0) >= 4.5;

  const goToProduct = () => navigate(`/products/${product._id}`);

  const originalPrice = Math.round(product.price * 1.2);
  const discountPercent = product.discount || Math.round(((originalPrice - product.price) / originalPrice) * 100);
  const rating = product.rating || 4.5;
  const ratingCount = product.ratingCount || (Math.floor(120 + rating * 137) % 300) + 24;

  const wishlistButton = (
    <button
      onClick={(e) => {
        e.stopPropagation();
        toggleWishlist(product);
      }}
      aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={isWishlisted}
      className={`flex items-center justify-center w-8 h-8 rounded-full backdrop-blur border transition-all hover:scale-110 active:scale-90 ${
        isWishlisted
          ? "bg-danger-soft border-danger/40 text-danger"
          : "bg-surface/90 border-border text-text-muted hover:text-danger"
      }`}
    >
      <Heart size={15} className={isWishlisted ? "fill-current" : ""} aria-hidden />
    </button>
  );

  const ratingChip = (
    <span className="inline-flex items-center gap-1 rounded bg-success px-1.5 py-0.5 text-[11px] font-bold text-white">
      <Star size={10} className="fill-current" aria-hidden />
      {rating}
    </span>
  );

  const priceRow = (
    <div className="flex items-baseline gap-1.5 flex-wrap">
      <span className="text-base font-extrabold text-foreground">{formatINR(product.price)}</span>
      <span className="text-[11px] text-text-faint line-through">{formatINR(originalPrice)}</span>
      {discountPercent > 0 && (
        <span className="text-[11px] font-bold text-success">{discountPercent}% off</span>
      )}
    </div>
  );

  const addButton = (
    <button
      onClick={(e) => {
        e.stopPropagation();
        addToCart(product);
      }}
      disabled={isInCart || isOutOfStock}
      className={`w-full flex items-center justify-center gap-1.5 rounded-lg px-3 py-2.5 text-sm font-bold transition-all active:scale-[0.98] ${
        isInCart
          ? "bg-success-soft text-success cursor-not-allowed"
          : isOutOfStock
          ? "bg-surface-alt text-text-faint cursor-not-allowed"
          : "bg-brand-600 text-white hover:bg-brand-700"
      }`}
    >
      <ShoppingBag size={15} aria-hidden />
      {isInCart ? "In Bag ✓" : isOutOfStock ? "Sold Out" : "Add to Bag"}
    </button>
  );

  /* ---------- FEATURED (wide) variant ---------- */
  if (featured) {
    return (
      <div
        className="group bg-surface border border-border rounded-lg overflow-hidden hover:border-brand-600 hover:shadow-soft transition-all flex flex-col md:flex-row"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="relative md:w-[46%] aspect-[4/3] md:aspect-auto md:min-h-[260px] bg-surface-alt overflow-hidden cursor-pointer"
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
            } ${isHovered ? "scale-105" : "scale-100"}`}
          />
          {isBestSeller && (
            <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded bg-brand-600 px-2 py-1 text-[11px] font-bold text-white">
              <TrendingUp size={11} aria-hidden />
              Bestseller
            </span>
          )}
          <div className="absolute top-3 right-3">{wishlistButton}</div>
          {isOutOfStock && (
            <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] flex items-center justify-center">
              <span className="px-3 py-1 rounded bg-danger text-white text-xs font-bold uppercase tracking-wide">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        <div className="flex-1 p-5 md:p-7 flex flex-col gap-1.5">
          <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-brand-600">
            <BadgeCheck size={12} aria-hidden />
            {product.category?.name || "Premium"}
          </span>
          <h3
            onClick={goToProduct}
            className="text-lg md:text-xl font-bold text-foreground leading-snug cursor-pointer hover:text-brand-600 transition-colors"
          >
            {product.title}
          </h3>
          <p className="text-sm text-text-muted line-clamp-2">{product.description}</p>

          <div className="flex items-center gap-2 mt-1">
            {ratingChip}
            <span className="text-xs text-text-muted">
              {ratingCount} ratings · {Math.max(20, ratingCount / 3) | 0} reviews
            </span>
          </div>

          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-foreground">{formatINR(product.price)}</span>
            <span className="text-sm text-text-faint line-through">{formatINR(originalPrice)}</span>
            <span className="text-sm font-bold text-success">{discountPercent}% off</span>
          </div>

          <div className="mt-auto flex flex-wrap gap-2 pt-4">
            <div className="flex-1 min-w-[160px]">{addButton}</div>
            <button
              onClick={goToProduct}
              className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border bg-surface px-5 py-2.5 text-sm font-bold text-foreground hover:border-brand-600 hover:text-brand-600 transition-all"
            >
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
        className="group bg-surface border border-border rounded-lg overflow-hidden hover:border-brand-600 hover:shadow-soft transition-all flex flex-col sm:flex-row"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="relative sm:w-52 h-48 sm:h-auto flex-shrink-0 bg-surface-alt overflow-hidden cursor-pointer"
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
          {isOutOfStock && (
            <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] flex items-center justify-center">
              <span className="px-3 py-1 rounded bg-danger text-white text-xs font-bold uppercase tracking-wide">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col p-4 gap-1.5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-wider text-brand-600 mb-0.5">
                {product.category?.name || "Premium"}
              </p>
              <h3
                onClick={goToProduct}
                className="font-semibold text-foreground text-base line-clamp-2 cursor-pointer hover:text-brand-600 transition-colors"
              >
                {product.title}
              </h3>
              <p className="text-sm text-text-muted line-clamp-2 mt-0.5">{product.description}</p>
              <div className="flex items-center gap-2 mt-1.5">
                {ratingChip}
                <span className="text-xs text-text-muted">({ratingCount} ratings)</span>
              </div>
            </div>
            {wishlistButton}
          </div>

          <div className="mt-auto flex items-center justify-between gap-3 pt-2">
            <div>{priceRow}</div>
            <div className="w-36 flex-shrink-0">{addButton}</div>
          </div>
        </div>
      </div>
    );
  }

  /* ---------- GRID variant (default) ---------- */
  return (
    <div
      className="group bg-surface border border-border rounded-lg overflow-hidden hover:border-brand-600 hover:shadow-raised hover:-translate-y-1 transition-all duration-300 flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div className="relative aspect-square bg-surface-alt overflow-hidden cursor-pointer" onClick={goToProduct}>
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

        {discountPercent > 0 && (
          <span className="absolute top-2 left-2 rounded bg-brand-600 px-1.5 py-0.5 text-[11px] font-bold text-white">
            -{discountPercent}%
          </span>
        )}
        <div className="absolute top-2 right-2">{wishlistButton}</div>

        {isOutOfStock && (
          <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] flex items-center justify-center">
            <span className="px-3 py-1 rounded bg-danger text-white text-xs font-bold uppercase tracking-wide">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col flex-1 gap-1">
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-[11px] font-bold uppercase tracking-widest text-brand-600">
            {product.category?.name || "Premium"}
          </span>
          {ratingChip}
        </div>

        <h3
          onClick={goToProduct}
          className="font-medium text-foreground text-sm line-clamp-2 min-h-[2.25rem] cursor-pointer hover:text-brand-600 transition-colors"
        >
          {product.title}
        </h3>

        {priceRow}

        {isOutOfStock ? (
          <p className="text-[11px] font-semibold text-danger">● Out of Stock</p>
        ) : (
          <p className="text-[11px] font-semibold text-success">● In Stock</p>
        )}

        <div className="mt-auto pt-2">{addButton}</div>
      </div>
    </div>
  );
};

export default ProductCard;
