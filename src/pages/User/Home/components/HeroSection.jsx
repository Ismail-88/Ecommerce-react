import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ShoppingCart, Heart, Star, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = ({ heroProduct }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const products = [
    {
      id: 1,
      image: heroProduct?.images || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
      title: heroProduct?.title || "Wireless Headphones Pro",
      price: heroProduct?.price || 299,
      category: "Audio",
      rating: 4.8,
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
      title: "Smart Watch Ultra",
      price: 449,
      category: "Wearables",
      rating: 4.9,
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800",
      title: "Designer Sunglasses",
      price: 199,
      category: "Fashion",
      rating: 4.7,
    },
  ];

  const currentProduct = products[activeSlide];

  useEffect(() => {
    if (!isAutoPlay) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % products.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlay, products.length]);

  const nextSlide = () => {
    setIsAutoPlay(false);
    setActiveSlide((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setIsAutoPlay(false);
    setActiveSlide((prev) => (prev - 1 + products.length) % products.length);
  };

  return (
    <section className="relative overflow-hidden bg-hero-bg">
      {/* Decorative glows */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-500/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-32 -right-24 w-[480px] h-[480px] bg-brand-600/10 rounded-full blur-[140px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — Content */}
          <div className="space-y-8">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brand-200 dark:border-brand-800 bg-primary-soft text-sm font-semibold text-brand-700 dark:text-brand-300">
              <Sparkles size={15} aria-hidden />
              2025 Collection
            </span>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1]">
                Elevate Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-brand-500 dark:from-brand-400 dark:to-brand-500">
                  Lifestyle
                </span>
              </h1>
              <p className="text-lg text-text-secondary leading-relaxed max-w-xl">
                Discover premium products handpicked by experts. Quality, innovation, and style in perfect harmony.
              </p>
            </div>

            {/* Current Product Quick Info */}
            <div className="bg-surface border border-border rounded-2xl shadow-card p-5 space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs text-text-muted mb-0.5">Now Showing</p>
                  <h3 className="text-lg font-bold text-foreground truncate">{currentProduct.title}</h3>
                </div>
                <span className="shrink-0 rounded-full bg-brand-600 text-white text-xs font-bold px-3 py-1.5">
                  {currentProduct.category}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-2xl font-extrabold text-foreground">${currentProduct.price}</p>
                    <p className="text-xs text-text-muted">Best Price</p>
                  </div>
                  <div className="w-px h-10 bg-border" aria-hidden />
                  <div>
                    <p className="flex items-center gap-1 font-bold text-foreground">
                      {currentProduct.rating}
                      <Star size={14} className="fill-warning text-warning" aria-hidden />
                    </p>
                    <p className="text-xs text-text-muted">Rating</p>
                  </div>
                </div>

                <Link
                  to="/cart"
                  className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 transition-colors"
                >
                  <ShoppingCart size={16} aria-hidden />
                  Add to Cart
                </Link>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-5 py-3 text-sm font-semibold text-foreground hover:border-border-strong hover:bg-surface-hover transition-colors"
              >
                <ArrowRight size={16} aria-hidden />
                View All Products
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center justify-center w-11 h-11 rounded-lg border border-border bg-surface text-text-secondary hover:text-brand-600 dark:hover:text-brand-400 hover:border-border-strong transition-colors"
                aria-label="Browse featured"
              >
                <Heart size={18} aria-hidden />
              </Link>
            </div>

            {/* Stats */}
            <dl className="flex items-center gap-8 pt-2">
              <div>
                <dt className="sr-only">Products</dt>
                <dd className="text-2xl font-extrabold text-foreground">15K+</dd>
                <dd className="text-sm text-text-muted">Products</dd>
              </div>
              <div className="w-px h-10 bg-border" aria-hidden />
              <div>
                <dt className="sr-only">Customers</dt>
                <dd className="text-2xl font-extrabold text-foreground">50K+</dd>
                <dd className="text-sm text-text-muted">Customers</dd>
              </div>
              <div className="w-px h-10 bg-border" aria-hidden />
              <div>
                <dt className="sr-only">Rating</dt>
                <dd className="text-2xl font-extrabold text-foreground">4.9★</dd>
                <dd className="text-sm text-text-muted">Rating</dd>
              </div>
            </dl>
          </div>

          {/* Right — Carousel */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-full max-w-lg">
              <div className="absolute inset-0 bg-brand-500/10 blur-[100px] rounded-full transition-colors duration-700" aria-hidden />

              <div className="relative aspect-[4/4]">
                {products.map((product, index) => {
                  const offset = index - activeSlide;
                  const isActive = index === activeSlide;
                  const distance = Math.abs(offset);
                  return (
                    <div
                      key={product.id}
                      className="absolute inset-0 transition-all duration-700"
                      style={{
                        transform: `translateX(${offset * 60}px) translateY(${distance * 16}px) scale(${isActive ? 1 : 0.88})`,
                        opacity: distance > 1 ? 0 : isActive ? 1 : 0.4,
                        zIndex: isActive ? 30 : 10,
                        pointerEvents: isActive ? "auto" : "none",
                      }}
                      aria-hidden={!isActive}
                    >
                      <div className="relative h-full bg-surface border border-border rounded-3xl shadow-overlay p-5 overflow-hidden">
                        <div className="relative h-[75%] rounded-2xl overflow-hidden bg-surface-alt">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-cover"
                            loading={isActive ? "eager" : "lazy"}
                          />
                          <div className="absolute top-3 right-3 rounded-full bg-brand-600 text-white text-xs font-bold px-3 py-1.5 shadow-sm">
                            NEW
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold text-foreground truncate">{product.title}</h3>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-xl font-extrabold text-foreground">${product.price}</span>
                            <span className="flex items-center gap-1 text-sm font-medium text-text-muted">
                              <Star size={13} className="fill-warning text-warning" aria-hidden />
                              {product.rating}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Arrows */}
              <button
                onClick={prevSlide}
                aria-label="Previous product"
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-40 w-11 h-11 rounded-full bg-surface border border-border shadow-card text-foreground hover:bg-surface-hover hover:border-border-strong transition-all flex items-center justify-center"
              >
                <ChevronLeft size={20} aria-hidden />
              </button>
              <button
                onClick={nextSlide}
                aria-label="Next product"
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-40 w-11 h-11 rounded-full bg-surface border border-border shadow-card text-foreground hover:bg-surface-hover hover:border-border-strong transition-all flex items-center justify-center"
              >
                <ChevronRight size={20} aria-hidden />
              </button>

              {/* Dots */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-40">
                {products.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setActiveSlide(index);
                      setIsAutoPlay(false);
                    }}
                    aria-label={`Go to slide ${index + 1}`}
                    aria-current={index === activeSlide}
                    className={`h-2 rounded-full transition-all ${
                      index === activeSlide ? "w-7 bg-brand-600" : "w-2 bg-border-strong hover:bg-text-faint"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
