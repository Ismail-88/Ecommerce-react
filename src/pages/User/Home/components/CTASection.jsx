import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-hero-bg">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-brand-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-brand-600/10 rounded-full blur-[120px]" />
      </div>
      <div className="relative max-w-4xl mx-auto px-4 md:px-6 text-center">
        <div className="mx-auto mb-6 flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-soft text-brand-600 dark:text-brand-400">
          <Sparkles size={28} className="animate-pulse-soft" aria-hidden />
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground mb-5">
          Ready to Experience{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-brand-500 dark:from-brand-400 dark:to-brand-500">
            Luxury Shopping?
          </span>
        </h2>
        <p className="text-lg text-text-secondary mb-9 max-w-2xl mx-auto leading-relaxed">
          Join thousands of satisfied customers and discover premium products curated just for you.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-3 rounded-xl bg-brand-600 px-8 py-4 text-base font-semibold text-white hover:bg-brand-700 transition-colors shadow-lg shadow-brand-600/25"
        >
          Start Shopping Now
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" aria-hidden />
        </Link>
      </div>
    </section>
  );
};

export default CTASection;
