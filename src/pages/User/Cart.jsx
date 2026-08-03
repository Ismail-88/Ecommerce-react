import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Truck, Package, Gift, ShieldCheck } from "lucide-react";
import EmptyState from "../../components/ui/EmptyState";
import Button from "../../components/ui/Button";
import PageHeader from "../../components/ui/PageHeader";
import { formatINR } from "../../utils/formatCurrency";

const Cart = () => {
  const { cartItem, updatedQuantity, deleteCartItem } = useCart();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState("");

  const subtotal = cartItem.reduce((total, item) => total + item.price * item.quantity, 0);
  const deliveryFee = 0;
  const handlingFee = 5;
  const discount = 0;
  const grandTotal = subtotal + deliveryFee + handlingFee - discount;

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
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border bg-surface-alt">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
          <PageHeader
            icon={ShoppingBag}
            title={`Your Shopping Cart (${cartItem.length})`}
            description="Review the items in your cart before proceeding to checkout."
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItem.map((item, index) => (
              <div
                key={index}
                className="bg-surface border border-border rounded-xl p-5 hover:shadow-raised hover:border-border-strong transition-all flex flex-col sm:flex-row gap-5"
              >
                {/* Product Image */}
                <div className="relative w-full sm:w-28 h-40 sm:h-28 rounded-lg overflow-hidden bg-surface-alt flex-shrink-0">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 flex flex-col justify-between gap-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <Link
                        to={`/products/${item._id}`}
                        className="font-semibold text-foreground text-base line-clamp-2 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                      >
                        {item.title}
                      </Link>
                      <p className="text-sm text-text-muted mt-1">
                        Color: <span className="text-foreground">{item.selectedColor || "Default"}</span>
                      </p>
                    </div>
                    <button
                      onClick={() => deleteCartItem(item._id)}
                      aria-label={`Remove ${item.title} from cart`}
                      className="p-2 rounded-lg text-text-muted hover:text-danger hover:bg-danger-soft transition-colors flex-shrink-0"
                    >
                      <Trash2 size={17} aria-hidden />
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4">
                    {/* Price */}
                    <div>
                      <p className="text-xl font-extrabold text-foreground">{formatINR(item.price * item.quantity)}</p>
                      <p className="text-xs text-text-muted">{formatINR(item.price)} each</p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center rounded-lg border border-border bg-surface-alt overflow-hidden">
                        <button
                          onClick={() => updatedQuantity(cartItem, item._id, "decrement")}
                          aria-label="Decrease quantity"
                          className="px-3.5 py-2.5 hover:bg-surface-hover transition-colors"
                        >
                          <Minus size={14} aria-hidden />
                        </button>
                        <span className="min-w-10 px-3 py-2.5 font-semibold text-center border-x border-border" aria-live="polite">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updatedQuantity(cartItem, item._id, "increment")}
                          aria-label="Increase quantity"
                          className="px-3.5 py-2.5 hover:bg-surface-hover transition-colors"
                        >
                          <Plus size={14} aria-hidden />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 space-y-5">
              {/* Summary Card */}
              <div className="bg-surface border border-border rounded-2xl shadow-card p-6">
                <div className="flex items-center gap-2.5 mb-5">
                  <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-soft text-brand-600 dark:text-brand-400">
                    <Package size={20} aria-hidden />
                  </span>
                  <h2 className="text-lg font-bold text-foreground">Order Summary</h2>
                </div>

                <div className="space-y-3.5 text-sm">
                  <div className="flex justify-between text-text-secondary">
                    <span>Subtotal ({cartItem.length} items)</span>
                    <span className="font-semibold text-foreground">{formatINR(subtotal)}</span>
                  </div>
                  <div className="flex justify-between items-center text-text-secondary">
                    <span className="flex items-center gap-1.5">
                      <Truck size={15} aria-hidden />
                      Delivery Fee
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="text-text-faint line-through">₹25</span>
                      <span className="rounded-full bg-success-soft text-success text-xs font-bold px-2.5 py-0.5">FREE</span>
                    </span>
                  </div>
                  <div className="flex justify-between text-text-secondary">
                    <span>Handling Fee</span>
                    <span className="font-semibold text-foreground">{formatINR(handlingFee)}</span>
                  </div>

                  <div className="border-t border-border my-2" aria-hidden />

                  <div className="flex justify-between items-center rounded-xl bg-primary-soft px-4 py-3">
                    <span className="font-bold text-foreground">Total</span>
                    <span className="text-2xl font-extrabold text-foreground">{formatINR(grandTotal)}</span>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="mt-5">
                  <label htmlFor="promo-code" className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-2">
                    Promo Code
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Gift
                        size={15}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-text-faint"
                        aria-hidden
                      />
                      <input
                        id="promo-code"
                        type="text"
                        placeholder="Enter code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="w-full rounded-lg border border-border bg-input-bg pl-9 pr-3 py-2.5 text-sm text-foreground placeholder:text-text-faint focus:border-brand-500"
                      />
                    </div>
                    <button
                      onClick={() => {}}
                      className="rounded-lg border border-border bg-surface-alt px-4 py-2.5 text-sm font-semibold text-text-secondary hover:text-foreground hover:border-border-strong transition-colors whitespace-nowrap"
                    >
                      Apply
                    </button>
                  </div>
                </div>

                {/* Checkout */}
                <button
                  onClick={() => navigate("/checkout")}
                  className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-3.5 text-white font-semibold hover:bg-brand-700 transition-colors shadow-sm shadow-brand-600/25"
                >
                  Proceed to Checkout
                  <ArrowRight size={17} aria-hidden />
                </button>

                <p className="text-xs text-text-muted text-center mt-4 flex items-center justify-center gap-1.5">
                  <ShieldCheck size={13} aria-hidden />
                  Secure checkout powered by ShopSphere
                </p>
              </div>

              {/* Benefits */}
              <div className="bg-surface border border-border rounded-2xl p-5">
                <div className="space-y-3">
                  {[
                    { icon: Truck, text: "Free Express Delivery" },
                    { icon: Package, text: "Secure Packaging" },
                    { icon: Tag, text: "Best Price Guarantee" },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-2.5 text-sm text-text-secondary">
                      <Icon size={17} className="text-brand-600 dark:text-brand-400" aria-hidden />
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
