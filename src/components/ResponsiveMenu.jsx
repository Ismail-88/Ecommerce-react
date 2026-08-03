import { UserButton, useUser, SignedIn, SignedOut } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { Home, Package, ShoppingBag, Info, Mail, LogIn } from "lucide-react";
import { Link } from "react-router-dom";

const items = [
  { to: "/", label: "Home", icon: Home },
  { to: "/products", label: "Products", icon: Package },
  { to: "/my-orders", label: "My Orders", icon: ShoppingBag },
  { to: "/about", label: "About", icon: Info },
  { to: "/contact", label: "Contact", icon: Mail },
];

const ResponsiveMenu = ({ openNav, setOpenNav }) => {
  const { user } = useUser();
  const navigate = useNavigate();

  const handleNavigate = (to) => {
    setOpenNav(false);
    navigate(to);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          openNav ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpenNav(false)}
        aria-hidden
      />
      {/* Drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-50 flex w-[80%] max-w-sm flex-col bg-surface border-r border-border transition-transform duration-300 ease-in-out lg:hidden ${
          openNav ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile menu"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <span className="text-lg font-extrabold bg-gradient-to-r from-brand-600 to-brand-500 bg-clip-text text-transparent">
            ShopSphere
          </span>
          <button
            onClick={() => setOpenNav(false)}
            aria-label="Close menu"
            className="p-2 rounded-lg text-text-muted hover:bg-surface-hover hover:text-foreground transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>

        {/* User */}
        <div className="px-5 py-5 border-b border-border">
          <SignedIn>
            <div className="flex items-center gap-3">
              <UserButton />
              <div>
                <p className="font-semibold text-foreground text-sm">Hello, {user?.firstName || "there"}</p>
                <p className="text-xs text-text-muted">Welcome back</p>
              </div>
            </div>
          </SignedIn>
          <SignedOut>
            <button
              onClick={() => {
                setOpenNav(false);
                window.location.assign("/sign-in");
              }}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white hover:bg-brand-700 transition-colors"
            >
              <LogIn size={16} aria-hidden />
              Sign In
            </button>
          </SignedOut>
        </div>

        {/* Links */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto" aria-label="Mobile navigation">
          <ul className="space-y-1">
            {items.map(({ to, label, icon: Icon }) => (
              <li key={to}>
                <Link
                  to={to}
                  onClick={() => setOpenNav(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-text-secondary hover:bg-surface-hover hover:text-foreground transition-colors"
                >
                  <Icon size={18} aria-hidden />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-border">
          <p className="text-xs text-text-faint">© {new Date().getFullYear()} ShopSphere</p>
        </div>
      </div>
    </>
  );
};

export default ResponsiveMenu;
