import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { MapPin, ShoppingBag, Menu, X, ChevronDown, Zap } from "lucide-react";
import ResponsiveMenu from "./ResponsiveMenu";
import { useCart } from "../context/CartContext";

const NavItem = ({ to, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `relative px-4 py-2 font-medium text-sm transition-all group ${
        isActive 
          ? "text-white" 
          : "text-gray-400 hover:text-white"
      }`
    }
  >
    {label}
    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 w-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 group-hover:w-full transition-all duration-300" />
  </NavLink>
);

const Navbar = ({ location, getLocation, openDropDown, setOpenDropDown }) => {
  const [openNav, setOpenNav] = useState(false);
  const { cartItem } = useCart();

  const toggleDrop = () => setOpenDropDown(!openDropDown);

  return (
    <>
      {/* Premium Top Bar */}
      <div className="relative overflow-hidden bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0YzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-2.5">
          <div className="flex items-center justify-center gap-3 text-white text-sm font-medium">
            <Zap className="w-4 h-4 animate-pulse" />
            <p className="animate-shimmer bg-gradient-to-r from-white via-cyan-100 to-white bg-[length:200%_100%] bg-clip-text text-transparent">
              ✨ Limited Offer: Free Premium Shipping on Orders Over $75
            </p>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 left-0 right-0 z-50 border-b border-white/5 bg-gradient-to-b from-gray-900/95 via-black/95 to-black/95 backdrop-blur-3xl shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-purple-500/5"></div>
        <div className="relative mx-auto max-w-7xl px-4 md:px-6">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo with Premium Effect */}
            <div className="flex items-center gap-8">
              <Link to="/" className="group relative">
                <div className="absolute -inset-3 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
                <h1 className="relative text-2xl md:text-3xl font-black tracking-tight flex items-center gap-2">
                  <span className="relative">
                    <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 blur-lg opacity-70"></span>
                    <span className="relative bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                      ShopSphere
                    </span>
                  </span>
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 animate-pulse"></div>
                </h1>
              </Link>

              {/* Premium Location Selector */}
              <div className="hidden lg:block relative">
                <button
                  type="button"
                  onClick={toggleDrop}
                  className="group relative overflow-hidden flex items-center gap-3 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-2xl px-4 py-3 transition-all hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/10"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-blue-500/0 to-purple-500/0 group-hover:from-cyan-500/5 group-hover:via-blue-500/5 group-hover:to-purple-500/5 transition-all"></div>
                  <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 shadow-lg group-hover:scale-110 transition-transform">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  {location ? (
                    <div className="relative text-left">
                      <div className="text-xs text-gray-500 font-medium">Deliver to</div>
                      <div className="font-bold text-white">{location.county}</div>
                    </div>
                  ) : (
                    <span className="relative text-sm font-semibold text-gray-300">Add Location</span>
                  )}
                  <ChevronDown className={`relative w-4 h-4 text-gray-400 transition-transform ${openDropDown ? 'rotate-180' : ''}`} />
                </button>

                {openDropDown && (
                  <div className="absolute left-0 top-full mt-3 w-96 rounded-3xl border border-white/10 bg-gradient-to-br from-gray-900/98 via-black/98 to-black/98 backdrop-blur-3xl p-6 shadow-2xl shadow-black/50 animate-slideDown">
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5"></div>
                    <div className="relative flex items-center justify-between mb-5">
                      <h3 className="text-xl font-bold text-white">Choose Location</h3>
                      <button 
                        onClick={toggleDrop} 
                        className="rounded-xl p-2 text-gray-400 transition hover:bg-white/5 hover:text-white"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <button
                      onClick={getLocation}
                      className="relative w-full overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-2xl"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="relative flex items-center justify-center gap-2 px-5 py-4 text-white font-bold">
                        <MapPin className="w-5 h-5" />
                        Detect My Location
                      </div>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              <NavItem to="/" label="Home" />
              <NavItem to="/products" label="Products" />
              <NavItem to="/about" label="About" />
              <NavItem to="/contact" label="Contact" />
              <NavItem to="/my-orders" label="My Orders" />
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Premium Cart */}
              <Link to="/cart">
                <button className="relative group  rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-2xl p-3 transition-all hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/10">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-blue-500/0 to-purple-500/0 group-hover:from-cyan-500/5 group-hover:via-blue-500/5 group-hover:to-purple-500/5 transition-all"></div>
                  <ShoppingBag className="relative w-5 h-5 text-white" />
                  {cartItem.length > 0 && (
                    <span className="absolute -right-1.5 -top-1.5 flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-xs font-bold text-white ">
                      {cartItem.length}
                    </span>
                  )}
                </button>
              </Link>

              {/* Auth */}
              <div>
                <SignedOut>
                  <SignInButton>
                    <button className="relative overflow-hidden group rounded-2xl">
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <span className="relative block px-6 py-2.5 text-sm font-bold text-white">
                        Sign In
                      </span>
                    </button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-2xl p-1.5">
                    <UserButton afterSignOutUrl="/" />
                  </div>
                </SignedIn>
              </div>

              {/* Mobile Menu */}
              <button
                onClick={() => setOpenNav(!openNav)}
                className="lg:hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-2xl p-3 text-white transition hover:border-cyan-500/30"
              >
                {openNav ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <ResponsiveMenu openNav={openNav} setOpenNav={setOpenNav} />

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
        .animate-shimmer {
          animation: shimmer 3s linear infinite;
        }
      `}</style>
    </>
  );
};

export default Navbar;