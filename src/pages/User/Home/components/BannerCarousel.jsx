// pages/User/Home/components/BannerCarousel.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const slides = [
  {
    id: 1,
    title: "Big Fashion Sale",
    subtitle: "Up to 70% Off on Top Brands",
    cta: "Shop Now",
    to: "/products",
    gradient: "from-brand-700 via-brand-600 to-brand-500",
  },
  {
    id: 2,
    title: "Electronics Fest",
    subtitle: "Gadgets at Unbeatable Prices",
    cta: "Explore Deals",
    to: "/deals",
    gradient: "from-indigo-700 via-indigo-600 to-purple-600",
  },
  {
    id: 3,
    title: "Rewards For You",
    subtitle: "Earn Points on Every Order",
    cta: "Check Rewards",
    to: "/rewards",
    gradient: "from-amber-600 via-orange-500 to-rose-500",
  },
];

const BannerCarousel = () => {
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;
    const t = setInterval(() => setActive((p) => (p + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, [autoplay]);

  const next = () => {
    setAutoplay(false);
    setActive((p) => (p + 1) % slides.length);
  };
  const prev = () => {
    setAutoplay(false);
    setActive((p) => (p - 1 + slides.length) % slides.length);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 pt-5 md:pt-6">
      <div className="relative overflow-hidden rounded-xl bg-surface border border-border">
        <div className="relative h-44 md:h-64">
          {slides.map((slide, i) => (
            <div
              key={slide.id}
              className={`absolute inset-0 flex items-center px-6 md:px-14 transition-opacity duration-500 ${
                i === active ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
              aria-hidden={i !== active}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} opacity-95`}
                aria-hidden
              />
              <div className="relative z-10 text-white max-w-md" key={active === i ? "active" : "inactive"}>
                <p className={`text-xs md:text-sm font-bold uppercase tracking-widest text-white/80 mb-2 ${i === active ? "animate-fade-in-up" : ""}`}>
                  ShopSphere Special
                </p>
                <h2 className={`text-3xl md:text-5xl font-extrabold tracking-tight leading-tight mb-2 ${i === active ? "animate-fade-in-up" : ""}`} style={i === active ? { animationDelay: "80ms" } : undefined}>
                  {slide.title}
                </h2>
                <p className={`text-white/90 text-sm md:text-lg mb-5 ${i === active ? "animate-fade-in-up" : ""}`} style={i === active ? { animationDelay: "160ms" } : undefined}>
                  {slide.subtitle}
                </p>
                <Link
                  to={slide.to}
                  className={`inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-brand-700 hover:bg-brand-50 transition-colors ${i === active ? "animate-fade-in-up" : ""}`}
                  style={i === active ? { animationDelay: "240ms" } : undefined}
                >
                  {slide.cta}
                  <ArrowRight size={15} aria-hidden />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Arrows */}
        <button
          onClick={prev}
          aria-label="Previous banner"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/90 text-foreground shadow-card hover:bg-white transition-colors flex items-center justify-center"
        >
          <ChevronLeft size={18} aria-hidden />
        </button>
        <button
          onClick={next}
          aria-label="Next banner"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/90 text-foreground shadow-card hover:bg-white transition-colors flex items-center justify-center"
        >
          <ChevronRight size={18} aria-hidden />
        </button>

        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setAutoplay(false);
                setActive(i);
              }}
              aria-label={`Go to banner ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === active ? "w-6 bg-white" : "w-1.5 bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BannerCarousel;
