import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { MapPin, ShoppingBag, Heart, Menu, ChevronDown, Moon, Sun, User, Boxes, Truck, Gift, Zap } from "lucide-react";
import ResponsiveMenu from "./ResponsiveMenu";
import MobileTabBar from "./MobileTabBar";
import SmartSearch from "./SmartSearch";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useTheme } from "../context/ThemeContext";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/deals", label: "Deals" },
  { to: "/rewards", label: "Rewards" },
  { to: "/track-order", label: "Track Order" },
  { to: "/contact", label: "Contact" },
];

const HeaderAction = ({ label, onClick, children }) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center gap-0.5 px-2.5 py-1 rounded-md text-text-muted hover:text-brand-600 transition-colors"
  >
    {children}
    <span className="text-[10px] font-semibold uppercase tracking-wide">{label}</span>
  </button>
);

const Navbar = ({ location, getLocation, openDropDown, setOpenDropDown }) => {
  const [openNav, setOpenNav] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const { cartItem } = useCart();
  const { wishlistCount } = useWishlist();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const profileRef = useRef(null);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setOpenProfile(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const toggleDrop = () => setOpenDropDown(!openDropDown);

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-brand-700 via-brand-600 to-brand-500 text-white text-center">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-1.5 flex items-center justify-center gap-2 text-[11px] sm:text-xs font-bold uppercase tracking-wide">
          <Zap size={12} className="shrink-0" aria-hidden />
          <p>Free Shipping Over ₹499 · Extra 10% Off on First Order</p>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 left-0 right-0 z-50 bg-surface border-b border-border">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="flex items-center gap-3 md:gap-6 h-16">
            {/* Mobile menu */}
            <button
              onClick={() => setOpenNav(!openNav)}
              aria-label={openNav ? "Close menu" : "Open menu"}
              aria-expanded={openNav}
              className="lg:hidden p-2 -ml-1 rounded-lg text-foreground hover:bg-surface-hover transition-colors"
            >
              {openNav ? <Menu size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
            </button>

            {/* Logo */}
            <Link to="/" aria-label="ShopSphere home" className="flex items-center gap-1.5 shrink-0">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-600 text-white">
                <ShoppingBag size={17} aria-hidden />
              </span>
              <span className="hidden sm:block text-xl font-extrabold tracking-tight text-brand-600">
                ShopSphere
              </span>
            </Link>

            {/* Search — dominant, centered */}
            <div className="flex-1 max-w-xl mx-auto">
              <SmartSearch placeholder="Search for products, brands and more" />
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-0.5 md:gap-1">
              {/* Theme */}
              <button
                onClick={toggleTheme}
                aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                className="hidden md:flex flex-col items-center gap-0.5 px-2.5 py-1 rounded-md text-text-muted hover:text-brand-600 transition-colors"
              >
                {isDark ? <Moon size={19} aria-hidden /> : <Sun size={19} aria-hidden />}
                <span className="text-[10px] font-semibold uppercase tracking-wide">Theme</span>
              </button>

              {/* Profile dropdown */}
              <div className="relative" ref={profileRef}>
                <HeaderAction
                  label="Profile"
                  onClick={() => setOpenProfile((v) => !v)}
                >
                  <div className="flex items-center">
                    <User size={19} aria-hidden />
                    <ChevronDown size={12} className={openProfile ? "rotate-180" : ""} aria-hidden />
                  </div>
                </HeaderAction>

                {openProfile && (
                  <div className="absolute right-0 top-full mt-1 w-56 rounded-xl border border-border bg-surface shadow-overlay p-2 z-50 animate-slide-down">
                    <SignedOut>
                      <div className="px-3 py-2.5">
                        <p className="text-xs text-text-muted mb-2">Login for offers &amp; tracking</p>
                        <SignInButton mode="modal">
                          <span className="flex items-center justify-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2 text-sm font-bold text-white hover:bg-brand-700 transition-colors cursor-pointer">
                            Login
                          </span>
                        </SignInButton>
                      </div>
                    </SignedOut>
                    <SignedIn>
                      <div className="px-3 py-2.5 border-b border-border">
                        <p className="text-sm font-bold text-foreground">My Account</p>
                        <p className="text-xs text-text-muted truncate">Track orders, rewards &amp; more</p>
                      </div>
                    </SignedIn>
                    <div className="py-1">
                      <NavLink
                        to="/my-orders"
                        onClick={() => setOpenProfile(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-surface-hover transition-colors"
                      >
                        <Boxes size={15} className="text-text-muted" aria-hidden />
                        My Orders
                      </NavLink>
                      <NavLink
                        to="/rewards"
                        onClick={() => setOpenProfile(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-surface-hover transition-colors"
                      >
                        <Gift size={15} className="text-text-muted" aria-hidden />
                        Rewards
                      </NavLink>
                      <NavLink
                        to="/wishlist"
                        onClick={() => setOpenProfile(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-surface-hover transition-colors"
                      >
                        <Heart size={15} className="text-text-muted" aria-hidden />
                        Wishlist
                      </NavLink>
                      <SignedIn>
                        <div className="px-3 py-2 mt-1 border-t border-border">
                          <UserButton afterSignOutUrl="/" showName />
                        </div>
                      </SignedIn>
                    </div>
                  </div>
                )}
              </div>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                aria-label={`Wishlist with ${wishlistCount} items`}
                className="hidden sm:flex flex-col items-center gap-0.5 px-2.5 py-1 rounded-md text-text-muted hover:text-brand-600 transition-colors relative"
              >
                <span className="relative">
                  <Heart size={19} aria-hidden />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 flex items-center justify-center min-w-[16px] h-4 px-1 rounded-full bg-brand-600 text-[9px] font-bold text-white">
                      {wishlistCount}
                    </span>
                  )}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wide">Wishlist</span>
              </Link>

              {/* Bag */}
              <button
                onClick={() => navigate("/cart")}
                aria-label={`Bag with ${cartItem.length} items`}
                className="flex flex-col items-center gap-0.5 px-2.5 py-1 rounded-md text-text-muted hover:text-brand-600 transition-colors relative"
              >
                <span className="relative">
                  <ShoppingBag size={19} aria-hidden />
                  {cartItem.length > 0 && (
                    <span className="absolute -top-1.5 -right-2 flex items-center justify-center min-w-[16px] h-4 px-1 rounded-full bg-brand-600 text-[9px] font-bold text-white">
                      {cartItem.length}
                    </span>
                  )}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wide">Bag</span>
              </button>
            </div>
          </div>
        </div>

        {/* Category / utility row */}
        <div className="border-t border-border bg-background hidden lg:block">
          <div className="mx-auto max-w-7xl px-6 flex items-center gap-1 h-11">
            {/* Location chip */}
            <div className="relative mr-2">
              <button
                type="button"
                onClick={toggleDrop}
                aria-haspopup="true"
                aria-expanded={openDropDown}
                className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-semibold text-text-muted hover:text-foreground hover:bg-surface-hover transition-colors"
              >
                <MapPin size={14} className="text-brand-600" aria-hidden />
                {location ? (
                  <span className="max-w-[120px] truncate">{location.county}</span>
                ) : (
                  <span>Deliver to</span>
                )}
                <ChevronDown size={12} className="text-text-faint" aria-hidden />
              </button>

              {openDropDown && (
                <div className="absolute left-0 top-full mt-2 w-72 rounded-xl border border-border bg-surface shadow-overlay p-4 z-50 animate-slide-down">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-sm text-foreground">Choose Location</h3>
                    <button
                      onClick={toggleDrop}
                      aria-label="Close location picker"
                      className="p-1 rounded-lg text-text-muted hover:bg-surface-hover transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                  <button
                    onClick={getLocation}
                    className="w-full flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 transition-colors"
                  >
                    <MapPin size={15} aria-hidden />
                    Detect My Location
                  </button>
                </div>
              )}
            </div>

            <nav className="flex items-center gap-0.5 flex-1" aria-label="Main navigation">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `relative px-3 py-1.5 text-xs font-bold uppercase tracking-wide rounded-md transition-colors ${
                      isActive ? "text-brand-600" : "text-text-secondary hover:text-foreground"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-success">
              <Truck size={14} aria-hidden />
              Fast Delivery
            </span>
          </div>
        </div>
      </header>

      <ResponsiveMenu openNav={openNav} setOpenNav={setOpenNav} />
      <MobileTabBar />
    </>
  );
};

export default Navbar;
