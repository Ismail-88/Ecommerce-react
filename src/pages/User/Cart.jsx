import React from "react";
import { useCart } from "../../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck, Tag, TicketPercent, ShieldCheck } from "lucide-react";
import EmptyState from "../../components/ui/EmptyState";
import Button from "../../components/ui/Button";
import { formatINR } from "../../utils/formatCurrency";

const Cart = () => {
  const { cartItem, updatedQuantity, deleteCartItem } = useCart();
  const navigate = useNavigate();

  const subtotal = cartItem.reduce((total, item) => total + item.price * item.quantity, 0);
  const deliveryFee = 0;
  const handlingFee = 5;
  const discount = 0;
  const grandTotal = subtotal + deliveryFee + handlingFee - discount;
  const savings = Math.round(subtotal * 0.2);

  if (cartItem.length === 0) {
    return (
      <div className="min-h-[70vh] bg-background flex items-center justify-center px-4">
        <EmptyState
          icon={ShoppingBag}
          title="Your Cart is Empty"
          description="Discover amazing products and start shopping."
          action={
            <Button size="lg" onClick={() => navigate("/products")}>
              <ArrowRight size={17} aria-hidden />
              Start Shopping
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen text-foreground">
      {/* Header */}
      <div className="border-b border-border bg-surface-alt">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <h1 className="text-xl md:text-2xl font-extrabold text-foreground tracking-tight">
            My Bag ({cartItem.length})
          </h1>
          <p className="text-xs text-text-muted mt-0.5">
            Review items, apply offers and checkout securely.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Items + offers */}
          <div className="lg:col-span-2 space-y-4">
            {/* Offers note */}
            <div className="flex items-center gap-3 rounded-lg border border-success/30 bg-success-soft px-4 py-3">
              <TicketPercent size={18} className="text-success flex-shrink-0" aria-hidden />
              <p className="text-sm text-foreground">
                Extra savings at checkout — apply{" "}
                <span className="font-bold text-success">coupon codes</span> &amp;{" "}
                <span className="font-bold text-success">reward points</span> before paying.
              </p>
            </div>

            {cartItem.map((item, index) => (
              <div
                key={index}
                className="bg-surface border border-border rounded-xl p-4 hover:border-brand-600 transition-all flex flex-col sm:flex-row gap-4"
              >
                {/* Product Image */}
                <div className="relative w-full sm:w-24 h-40 sm:h-24 rounded-lg overflow-hidden bg-surface-alt flex-shrink-0">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 flex flex-col justify-between gap-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <Link
                        to={`/products/${item._id}`}
                        className="font-semibold text-foreground text-sm line-clamp-2 hover:text-brand-600 transition-colors"
                      >
                        {item.title}
                      </Link>
                      <p className="text-xs text-text-muted mt-1">
                        Color: <span className="text-foreground font-medium">{item.selectedColor || "Default"}</span>
                      </p>
                    </div>
                    <button
                      onClick={() => deleteCartItem(item._id)}
                      aria-label={`Remove ${item.title} from cart`}
                      className="p-2 rounded-lg text-text-muted hover:text-danger hover:bg-danger-soft transition-colors flex-shrink-0"
                    >
                      <Trash2 size={16} aria-hidden />
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <p className="text-lg font-extrabold text-foreground">
                        {formatINR(item.price * item.quantity)}
                      </p>
                      <p className="text-xs text-text-faint">{formatINR(item.price)} each</p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center rounded-lg border border-border bg-surface-alt overflow-hidden">
                      <button
                        onClick={() => updatedQuantity(cartItem, item._id, "decrement")}
                        aria-label="Decrease quantity"
                        className="px-3 py-2 hover:bg-surface-hover transition-colors"
                      >
                        <Minus size={13} aria-hidden />
                      </button>
                      <span className="min-w-10 px-3 py-2 font-semibold text-center border-x border-border" aria-live="polite">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updatedQuantity(cartItem, item._id, "increment")}
                        aria-label="Increase quantity"
                        className="px-3 py-2 hover:bg-surface-hover transition-colors"
                      >
                        <Plus size={13} aria-hidden />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={() => navigate("/products")}
              className="text-sm font-bold text-brand-600 hover:text-brand-700 transition-colors"
            >
              ← Continue Shopping
            </button>
          </div>

          {/* Right: Price Details */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-20 space-y-4">
              <div className="bg-surface border border-border rounded-xl p-5">
                <h2 className="text-xs font-bold uppercase tracking-widest text-text-muted border-b border-border pb-3 mb-3">
                  Price Details
                </h2>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-text-secondary">
                    <span>Price ({cartItem.length} items)</span>
                    <span className="font-semibold text-foreground">{formatINR(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-text-secondary">
                    <span>Discount</span>
                    <span className="font-semibold text-success">− {formatINR(discount)}</span>
                  </div>
                  <div className="flex justify-between items-center text-text-secondary">
                    <span className="flex items-center gap-1.5">
                      <Truck size={15} aria-hidden />
                      Delivery Fee
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="text-text-faint line-through">₹25</span>
                      <span className="rounded bg-success-soft text-success text-xs font-bold px-2 py-0.5">FREE</span>
                    </span>
                  </div>
                  <div className="flex justify-between text-text-secondary">
                    <span>Handling Fee</span>
                    <span className="font-semibold text-foreground">{formatINR(handlingFee)}</span>
                  </div>
                </div>

                <div className="border-t border-border my-3" aria-hidden />

                <div className="flex justify-between items-center">
                  <span className="font-bold text-foreground">Total Payable</span>
                  <span className="text-xl font-extrabold text-foreground">{formatINR(grandTotal)}</span>
                </div>

                <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-success">
                  <ShieldCheck size={13} aria-hidden />
                  You will save {formatINR(savings)} on this order
                </p>

                <button
                  onClick={() => navigate("/checkout")}
                  className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-3.5 text-white font-bold hover:bg-brand-700 transition-colors"
                >
                  Place Order
                  <ArrowRight size={16} aria-hidden />
                </button>

                <p className="text-xs text-text-muted text-center mt-4 flex items-center justify-center gap-1.5">
                  <ShieldCheck size={13} aria-hidden />
                  Secure checkout powered by ShopSphere
                </p>
              </div>

              {/* Benefits */}
              <div className="bg-surface border border-border rounded-xl p-4">
                <div className="space-y-2.5">
                  {[
                    { icon: Truck, text: "Free Express Delivery" },
                    { icon: Tag, text: "Best Price Guarantee" },
                    { icon: ShieldCheck, text: "7-Day Easy Returns" },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-2.5 text-sm text-text-secondary">
                      <Icon size={16} className="text-brand-600" aria-hidden />
                      <span>{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
