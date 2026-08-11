// pages/User/Home/components/BannerCarousel.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowRight, Zap, Flame } from "lucide-react";

// Set each slide's flash-sale end time (demo: a few hours from load).
// Replace with real ISO end times from your backend/CMS in production.
const HOURS_FROM_NOW = (h) => new Date(Date.now() + h * 60 * 60 * 1000).toISOString();

const slides = [
  {
    id: 1,
    title: "Big Fashion Sale",
    subtitle: "Up to 70% Off on Top Brands",
    cta: "Shop Now",
    to: "/products",
    image:
      "https://images.unsplash.com/photo-1760565030786-91526dff426c?q=80&w=1600&auto=format&fit=crop",
    gradient: "from-brand-900/90 via-brand-700/60 to-black/30",
    badge: "live",
    discount: "70% OFF",
    endsAt: HOURS_FROM_NOW(6),
  },
  {
    id: 2,
    title: "Electronics Fest",
    subtitle: "Gadgets at Unbeatable Prices",
    cta: "Explore Deals",
    to: "/deals",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1600&auto=format&fit=crop",
    gradient: "from-slate-900/90 via-indigo-900/60 to-black/30",
    badge: "flash",
    discount: "Up to 50% OFF",
    endsAt: HOURS_FROM_NOW(3),
  },
  {
    id: 3,
    title: "Rewards For You",
    subtitle: "Earn Points on Every Order",
    cta: "Check Rewards",
    to: "/rewards",
    image:
      "https://images.unsplash.com/photo-1647221598398-934ed5cb0e4f?q=80&w=1600&auto=format&fit=crop",
    gradient: "from-amber-900/90 via-orange-800/60 to-black/30",
    badge: null,
    discount: null,
    endsAt: null,
  },
];

// Small helper: ticking countdown to a target ISO timestamp
const useCountdown = (endsAt) => {
  const [remaining, setRemaining] = useState(() =>
    endsAt ? Math.max(0, new Date(endsAt).getTime() - Date.now()) : 0
  );

  useEffect(() => {
    if (!endsAt) return;
    const tick = () => setRemaining(Math.max(0, new Date(endsAt).getTime() - Date.now()));
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [endsAt]);

  const totalSec = Math.floor(remaining / 1000);
  const h = String(Math.floor(totalSec / 3600)).padStart(2, "0");
  const m = String(Math.floor((totalSec % 3600) / 60)).padStart(2, "0");
  const s = String(totalSec % 60).padStart(2, "0");
  return { h, m, s, expired: endsAt && remaining <= 0 };
};

const CountdownChip = ({ endsAt }) => {
  const { h, m, s, expired } = useCountdown(endsAt);
  if (!endsAt || expired) return null;
  return (
    <div className="inline-flex items-center gap-1.5 rounded-md bg-black/30 backdrop-blur-sm px-2.5 py-1 text-white text-xs font-semibold tracking-wide">
      <span className="opacity-80">Ends in</span>
      <span className="font-mono tabular-nums">{h}:{m}:{s}</span>
    </div>
  );
};

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
              {/* Background photo */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
                aria-hidden
              />
              {/* Brand-tinted gradient overlay for readability + brand consistency */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`}
                aria-hidden
              />

              <div className="relative z-10 text-white max-w-md" key={active === i ? "active" : "inactive"}>
                {/* Badge row: LIVE / FLASH SALE + discount tag */}
                {(slide.badge || slide.discount) && (
                  <div className={`flex items-center gap-2 mb-3 ${i === active ? "animate-fade-in-up" : ""}`}>
                    {slide.badge === "live" && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
                        </span>
                        Live Now
                      </span>
                    )}
                    {slide.badge === "flash" && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-black">
                        <Zap size={11} className="fill-black" aria-hidden />
                        Flash Sale
                      </span>
                    )}
                    {slide.discount && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-white/15 backdrop-blur-sm px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide">
                        <Flame size={11} aria-hidden />
                        {slide.discount}
                      </span>
                    )}
                  </div>
                )}

                <p className={`text-xs md:text-sm font-bold uppercase tracking-widest text-white/80 mb-2 ${i === active ? "animate-fade-in-up" : ""}`}>
                  ShopSphere Special
                </p>
                <h2 className={`font-display text-3xl md:text-5xl font-bold tracking-tight leading-tight mb-2 drop-shadow-md ${i === active ? "animate-fade-in-up" : ""}`} style={i === active ? { animationDelay: "80ms" } : undefined}>
                  {slide.title}
                </h2>
                <p className={`text-white/90 text-sm md:text-lg mb-4 drop-shadow ${i === active ? "animate-fade-in-up" : ""}`} style={i === active ? { animationDelay: "160ms" } : undefined}>
                  {slide.subtitle}
                </p>

                <div className={`flex items-center gap-3 flex-wrap ${i === active ? "animate-fade-in-up" : ""}`} style={i === active ? { animationDelay: "240ms" } : undefined}>
                  <Link
                    to={slide.to}
                    className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-brand-700 hover:bg-brand-50 transition-colors"
                  >
                    {slide.cta}
                    <ArrowRight size={15} aria-hidden />
                  </Link>
                  <CountdownChip endsAt={slide.endsAt} />
                </div>
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