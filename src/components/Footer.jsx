import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaPinterestP, FaXTwitter } from "react-icons/fa6";
import { Mail, Phone, MapPin, Send, Shield, Truck, Award, Headphones } from "lucide-react";

const socials = [
  { icon: FaFacebookF, label: "Facebook" },
  { icon: FaInstagram, label: "Instagram" },
  { icon: FaXTwitter, label: "Twitter" },
  { icon: FaPinterestP, label: "Pinterest" },
];

const quickLinks = [
  { name: "Products", path: "/products" },
  { name: "My Orders", path: "/my-orders" },
  { name: "Track Order", path: "/track-order" },
  { name: "Cart", path: "/cart" },
  { name: "About Us", path: "/about" },
];

const customerService = ["Contact Us", "Shipping & Returns", "FAQs", "Order Tracking", "Size Guide"];

const features = [
  { icon: Truck, title: "Free Shipping", desc: "On orders over ₹50" },
  { icon: Shield, title: "Secure Payment", desc: "100% protected" },
  { icon: Award, title: "Quality Products", desc: "Premium selection" },
  { icon: Headphones, title: "24/7 Support", desc: "Always here to help" },
];

const Footer = () => {
  return (
    <footer className="bg-surface-alt border-t border-border">
      {/* Features Bar */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="flex items-center gap-3.5 rounded-xl border border-border bg-surface p-4 hover:border-border-strong hover:shadow-card transition-all"
            >
              <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-primary-soft text-brand-600 dark:text-brand-400 flex-shrink-0">
                <Icon size={20} aria-hidden />
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
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-14 border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-5">
            <Link to="/" className="inline-flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-brand-600 to-brand-500 dark:from-brand-400 dark:to-brand-500 bg-clip-text text-transparent">
                ShopSphere
              </span>
            </Link>
            <p className="text-sm text-text-muted leading-relaxed">
              Powering Your World with the Best in Electronics. Experience luxury shopping redefined.
            </p>
            <div className="space-y-2.5 text-sm">
              <div className="flex items-start gap-2.5 text-text-muted">
                <MapPin size={16} className="text-brand-500 mt-0.5 flex-shrink-0" aria-hidden />
                <span>123 Electronics St, Style City, NY 10001</span>
              </div>
              <div className="flex items-center gap-2.5 text-text-muted">
                <Mail size={16} className="text-brand-500 flex-shrink-0" aria-hidden />
                <a href="mailto:support@shopsphere.com" className="hover:text-foreground transition-colors">
                  support@shopsphere.com
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-text-muted">
                <Phone size={16} className="text-brand-500 flex-shrink-0" aria-hidden />
                <a href="tel:+11234567890" className="hover:text-foreground transition-colors">
                  (123) 456-7890
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-5">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm text-text-muted hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-5">Customer Service</h3>
            <ul className="space-y-3">
              {customerService.map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-text-muted hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-5">Stay in the Loop</h3>
            <p className="text-sm text-text-muted mb-5 leading-relaxed">
              Subscribe to get special offers, free giveaways, and exclusive updates.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-faint" aria-hidden />
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="Your email address"
                  className="w-full rounded-lg border border-border bg-input-bg pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-text-faint focus:border-brand-500 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 transition-colors"
              >
                <Send size={15} aria-hidden />
                Subscribe
              </button>
            </form>
            <div className="mt-6">
              <p className="text-xs font-bold uppercase tracking-wider text-text-muted mb-3">Follow Us</p>
              <div className="flex gap-2.5">
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
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p className="text-text-muted">
              © {new Date().getFullYear()} ShopSphere. All rights reserved.
            </p>
            <div className="flex items-center gap-5 text-text-muted">
              <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
              <span className="w-1 h-1 rounded-full bg-border-strong" aria-hidden />
              <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
              <span className="w-1 h-1 rounded-full bg-border-strong" aria-hidden />
              <a href="#" className="hover:text-foreground transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
