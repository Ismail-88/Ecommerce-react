import { useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Star, ShoppingBag, ArrowRight, Sparkles, TrendingUp } from "lucide-react";
import { getData } from "../../../../../context/DataContext";
import { useCart } from "../../../../../context/CartContext";
import { getYouMayAlsoLike, getFrequentlyBoughtTogether } from "../../../../../utils/aiEngine";
import { formatINR } from "../../../../../utils/formatCurrency";

const RelatedCard = ({ product, onNavigate, onAddToCart, inCart }) => {
  const rating = product.rating || 4.5;
  const originalPrice = Math.round(product.price * 1.2);

  return (
    <div
      onClick={() => onNavigate(product._id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onNavigate(product._id)}
      className="group bg-surface border border-border rounded-xl overflow-hidden hover:shadow-raised hover:border-border-strong hover:-translate-y-1 transition-all cursor-pointer flex flex-col"
    >
      <div className="relative h-44 bg-surface-alt p-4">
        <img
          src={product.imageUrl}
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
          <span className="text-lg font-bold text-foreground">{formatINR(product.price)}</span>
          <span className="text-xs text-text-faint line-through">{formatINR(originalPrice)}</span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart();
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
};

const Section = ({ icon: Icon, label, subtitle, children }) => (
  <div className="mt-16">
    <div className="flex items-end justify-between mb-6 flex-wrap gap-3">
      <div className="flex items-center gap-2.5">
        <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-soft text-brand-600 dark:text-brand-400">
          <Icon size={18} aria-hidden />
        </span>
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-foreground">{label}</h2>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 bg-brand-soft rounded-full px-2 py-0.5">
              <Sparkles size={10} aria-hidden />
              AI
            </span>
          </div>
          <p className="text-sm text-text-muted mt-1">{subtitle}</p>
        </div>
      </div>
      <Link
        to="/products"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 dark:text-brand-400 hover:gap-2.5 transition-all"
      >
        View all products
        <ArrowRight size={15} aria-hidden />
      </Link>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">{children}</div>
  </div>
);

const RelatedProducts = ({ product, products }) => {
  const navigate = useNavigate();
  const { data: allProducts, orders, getProductImageUrl } = getData();
  const { addToCart, cartItem } = useCart();

  const boughtTogether = useMemo(
    () => getFrequentlyBoughtTogether(orders, product, allProducts || [], 4),
    [orders, product, allProducts]
  );

  const alsoLike = useMemo(
    () => getYouMayAlsoLike(products?.length ? products : allProducts || [], product, 4),
    [products, allProducts, product]
  );

  const renderCards = (list) =>
    list.map((p) => (
      <RelatedCard
        key={p._id}
        product={{ ...p, imageUrl: getProductImageUrl(p) }}
        onNavigate={(id) => navigate(`/products/${id}`)}
        onAddToCart={() => addToCart(p)}
        inCart={cartItem?.some((item) => item._id === p._id)}
      />
    ));

  if (!boughtTogether.length && !alsoLike.length) return null;

  return (
    <div>
      {boughtTogether.length > 0 && (
        <Section
          icon={TrendingUp}
          label="Frequently bought together"
          subtitle="Pairs well with this item based on customer orders"
        >
          {renderCards(boughtTogether)}
        </Section>
      )}
      {alsoLike.length > 0 && (
        <Section
          icon={Sparkles}
          label="You may also like"
          subtitle="AI-ranked picks based on product similarity"
        >
          {renderCards(alsoLike)}
        </Section>
      )}
    </div>
  );
};

export default RelatedProducts;
