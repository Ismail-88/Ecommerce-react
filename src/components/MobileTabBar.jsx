// components/MobileTabBar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { Home, LayoutGrid, Heart, ShoppingBag, User } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

const tabs = [
  { to: "/", label: "Home", icon: Home },
  { to: "/products", label: "Categories", icon: LayoutGrid },
  { to: "/wishlist", label: "Wishlist", icon: Heart },
  { to: "/cart", label: "Bag", icon: ShoppingBag },
];

const MobileTabBar = () => {
  const { cartItem } = useCart();
  const { wishlistCount } = useWishlist();

  const badgeFor = (to) => {
    if (to === "/cart" && cartItem.length > 0) return cartItem.length;
    if (to === "/wishlist" && wishlistCount > 0) return wishlistCount;
    return null;
  };

  return (
    <nav
      aria-label="Mobile navigation"
      className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-surface border-t border-border shadow-overlay"
    >
      <div className="grid grid-cols-5">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const badge = badgeFor(tab.to);
          return (
            <NavLink
              key={tab.to}
              to={tab.to}
              className={({ isActive }) =>
                `relative flex flex-col items-center gap-0.5 py-2.5 text-[10px] font-semibold uppercase tracking-wide transition-colors ${
                  isActive ? "text-brand-600" : "text-text-muted"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className="relative">
                    <Icon size={20} aria-hidden />
                    {badge != null && (
                      <span className="absolute -top-1.5 -right-2.5 flex items-center justify-center min-w-[16px] h-4 px-1 rounded-full bg-brand-600 text-[9px] font-bold text-white">
                        {badge}
                      </span>
                    )}
                  </span>
                  {tab.label}
                  {isActive && <span className="absolute inset-x-4 -top-px h-0.5 rounded-full bg-brand-600" aria-hidden />}
                </>
              )}
            </NavLink>
          );
        })}
        <SignedOut>
          <NavLink
            to="/about"
            className="flex flex-col items-center gap-0.5 py-2.5 text-[10px] font-semibold uppercase tracking-wide text-text-muted"
          >
            <User size={20} aria-hidden />
            Account
          </NavLink>
        </SignedOut>
        <SignedIn>
          <NavLink
            to="/my-orders"
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 py-2.5 text-[10px] font-semibold uppercase tracking-wide transition-colors ${
                isActive ? "text-brand-600" : "text-text-muted"
              }`
            }
          >
            <User size={20} aria-hidden />
            Profile
          </NavLink>
        </SignedIn>
      </div>
    </nav>
  );
};

export default MobileTabBar;
