import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { MapPin, ShoppingBag, Menu, X, ChevronDown, Zap, Moon, Sun } from "lucide-react";
import ResponsiveMenu from "./ResponsiveMenu";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";

const NavItem = ({ to, label, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `relative px-3 py-2 text-sm font-medium rounded-md transition-colors ${
        isActive ? "text-brand-600 dark:text-brand-400" : "text-text-secondary hover:text-foreground"
      }`
    }
  >
    {({ isActive }) => (
      <>
        {label}
        {isActive && (
          <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-brand-500" aria-hidden />
        )}
      </>
    )}
  </NavLink>
);

const Navbar = ({ location, getLocation, openDropDown, setOpenDropDown }) => {
  const [openNav, setOpenNav] = useState(false);
  const { cartItem } = useCart();
  const { isDark, toggleTheme } = useTheme();

  const toggleDrop = () => setOpenDropDown(!openDropDown);

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-brand-600 text-white text-center">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-2 flex items-center justify-center gap-2 text-xs sm:text-sm font-medium">
          <Zap size={14} className="shrink-0" aria-hidden />
          <p>Free Premium Shipping on Orders Over $75</p>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 left-0 right-0 z-50 border-b border-border bg-background/85 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70 shadow-soft">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="flex items-center justify-between h-[68px]">
            {/* Logo */}
            <div className="flex items-center gap-6">
              <Link to="/" aria-label="ShopSphere home" className="flex items-center gap-2 group">
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 shadow-sm shadow-brand-600/30 transition-transform group-hover:scale-105">
                  <ShoppingBag size={18} className="text-white" aria-hidden />
                </div>
                <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-brand-600 to-brand-500 dark:from-brand-400 dark:to-brand-500 bg-clip-text text-transparent">
                  ShopSphere
                </span>
              </Link>

              {/* Location Selector */}
              <div className="hidden lg:block relative">
                <button
                  type="button"
                  onClick={toggleDrop}
                  aria-haspopup="true"
                  aria-expanded={openDropDown}
                  className="flex items-center gap-2.5 rounded-xl border border-border bg-surface-alt hover:bg-surface-hover hover:border-border-strong px-3.5 py-2 transition-all"
                >
                  <MapPin size={16} className="text-brand-600 dark:text-brand-400" aria-hidden />
                  {location ? (
                    <span className="text-sm font-semibold text-foreground max-w-[140px] truncate">
                      {location.county}
                    </span>
                  ) : (
                    <span className="text-sm font-medium text-text-secondary">Add Location</span>
                  )}
                  <ChevronDown
                    size={14}
                    className={`text-text-faint transition-transform ${openDropDown ? "rotate-180" : ""}`}
                    aria-hidden
                  />
                </button>

                {openDropDown && (
                  <div className="absolute left-0 top-full mt-2.5 w-80 rounded-2xl border border-border bg-surface shadow-overlay p-5 animate-slide-down">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-foreground">Choose Location</h3>
                      <button
                        onClick={toggleDrop}
                        aria-label="Close location picker"
                        className="p-1.5 rounded-lg text-text-muted hover:bg-surface-hover hover:text-foreground transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <button
                      onClick={getLocation}
                      className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white hover:bg-brand-700 transition-colors"
                    >
                      <MapPin size={16} aria-hidden />
                      Detect My Location
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              <NavItem to="/" label="Home" />
              <NavItem to="/products" label="Products" />
              <NavItem to="/my-orders" label="My Orders" />
              <NavItem to="/about" label="About" />
              <NavItem to="/contact" label="Contact" />
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2.5">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                className="p-2.5 rounded-xl border border-border bg-surface-alt text-text-secondary hover:text-foreground hover:border-border-strong transition-all"
              >
                {isDark ? <Sun size={18} aria-hidden /> : <Moon size={18} aria-hidden />}
              </button>

              {/* Cart */}
              <Link
                to="/cart"
                aria-label={`Cart with ${cartItem.length} items`}
                className="relative p-2.5 rounded-xl border border-border bg-surface-alt text-text-secondary hover:text-foreground hover:border-border-strong transition-all"
              >
                <ShoppingBag size={18} aria-hidden />
                {cartItem.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-brand-600 text-[11px] font-bold text-white shadow-sm">
                    {cartItem.length}
                  </span>
                )}
              </Link>

              {/* Auth */}
              <div className="hidden sm:block">
                <SignedOut>
                  <SignInButton mode="modal">
                    <span className="inline-flex items-center rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 transition-colors cursor-pointer">
                      Sign In
                    </span>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <div className="p-1 rounded-full border border-border bg-surface-alt">
                    <UserButton afterSignOutUrl="/" />
                  </div>
                </SignedIn>
              </div>

              {/* Mobile Menu */}
              <button
                onClick={() => setOpenNav(!openNav)}
                aria-label={openNav ? "Close menu" : "Open menu"}
                aria-expanded={openNav}
                className="lg:hidden p-2.5 rounded-xl border border-border bg-surface-alt text-foreground transition-colors"
              >
                {openNav ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <ResponsiveMenu openNav={openNav} setOpenNav={setOpenNav} />
    </>
  );
};

export default Navbar;
