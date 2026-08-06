import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaPinterestP, FaXTwitter } from "react-icons/fa6";
import { Mail, Phone, MapPin, Send, Truck, Shield, Award, Headphones } from "lucide-react";

const socials = [
  { icon: FaFacebookF, label: "Facebook" },
  { icon: FaInstagram, label: "Instagram" },
  { icon: FaXTwitter, label: "Twitter" },
  { icon: FaPinterestP, label: "Pinterest" },
];

const shopLinks = [
  { name: "Products", path: "/products" },
  { name: "Deals", path: "/deals" },
  { name: "Rewards", path: "/rewards" },
  { name: "Wishlist", path: "/wishlist" },
  { name: "My Bag", path: "/cart" },
];

const helpLinks = [
  { name: "My Orders", path: "/my-orders" },
  { name: "Track Order", path: "/track-order" },
  { name: "Contact Us", path: "/contact" },
  { name: "Shipping & Returns", path: "/about" },
  { name: "FAQs", path: "/about" },
];

const companyLinks = [
  { name: "About Us", path: "/about" },
  { name: "Careers", path: "/about" },
  { name: "Press", path: "/about" },
  { name: "Privacy Policy", path: "/about" },
  { name: "Terms of Service", path: "/about" },
];

const payments = ["VISA", "Mastercard", "UPI", "RuPay", "PayPal", "COD"];

const features = [
  { icon: Truck, title: "Free Shipping", desc: "On orders over ₹50" },
  { icon: Shield, title: "Secure Payment", desc: "100% protected" },
  { icon: Award, title: "Quality Products", desc: "Premium selection" },
  { icon: Headphones, title: "24/7 Support", desc: "Always here to help" },
];

const Footer = () => {
  return (
    <footer className="bg-surface border-t border-border">
      {/* Features Bar */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-soft text-brand-600 flex-shrink-0">
                <Icon size={18} aria-hidden />
              </div>
              <div>
                <p className="font-semibold text-sm text-foreground">{title}</p>
                <p className="text-xs text-text-muted">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight text-brand-600">ShopSphere</span>
            </Link>
            <p className="text-sm text-text-muted leading-relaxed max-w-xs">
              Powering Your World with the Best in Electronics. Experience luxury shopping redefined.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2.5 text-text-muted">
                <MapPin size={15} className="text-brand-500 mt-0.5 flex-shrink-0" aria-hidden />
                <span>123 Electronics St, Style City, NY 10001</span>
              </div>
              <div className="flex items-center gap-2.5 text-text-muted">
                <Mail size={15} className="text-brand-500 flex-shrink-0" aria-hidden />
                <a href="mailto:support@shopsphere.com" className="hover:text-foreground transition-colors">
                  support@shopsphere.com
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-text-muted">
                <Phone size={15} className="text-brand-500 flex-shrink-0" aria-hidden />
                <a href="tel:+11234567890" className="hover:text-foreground transition-colors">
                  (123) 456-7890
                </a>
              </div>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">Shop</h3>
            <ul className="space-y-2.5">
              {shopLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm text-text-muted hover:text-brand-600 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">Help</h3>
            <ul className="space-y-2.5">
              {helpLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm text-text-muted hover:text-brand-600 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">Company</h3>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm text-text-muted hover:text-brand-600 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter + Social */}
        <div className="mt-10 pt-8 border-t border-border flex flex-col lg:flex-row lg:items-center gap-6 justify-between">
          <form onSubmit={(e) => e.preventDefault()} className="flex w-full max-w-md gap-2">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="Enter email for exclusive offers"
              className="flex-1 rounded-lg border border-border bg-input-bg pl-4 pr-4 py-2.5 text-sm text-foreground placeholder:text-text-faint focus:border-brand-500 focus:outline-none"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 transition-colors"
            >
              <Send size={15} aria-hidden />
              Subscribe
            </button>
          </form>

          <div className="flex items-center gap-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-text-muted mr-1">Follow Us</span>
            {socials.map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="flex items-center justify-center w-9 h-9 rounded-lg border border-border bg-surface text-text-secondary hover:text-white hover:bg-brand-600 hover:border-brand-600 transition-all"
              >
                <Icon size={15} aria-hidden />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p className="text-text-muted">
              © {new Date().getFullYear()} ShopSphere. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {payments.map((label) => (
                <span
                  key={label}
                  className="px-2.5 py-1 rounded border border-border bg-surface text-[11px] font-bold uppercase tracking-wide text-text-secondary"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
