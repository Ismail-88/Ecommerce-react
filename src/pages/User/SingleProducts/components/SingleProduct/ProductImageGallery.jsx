import React, { useState } from "react";
import { Heart, Share2, Tag, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";

const ProductImageGallery = ({
  currentImages,
  selectedImage,
  setSelectedImage,
  productTitle,
  discount,
  isWishlisted,
  setIsWishlisted,
  showShareMenu,
  setShowShareMenu,
  handleShare,
}) => {
  const [zoom, setZoom] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const shareOptions = [
    { key: "facebook", label: "Facebook" },
    { key: "twitter", label: "Twitter" },
    { key: "whatsapp", label: "WhatsApp" },
    { key: "copy", label: "Copy Link" },
  ];

  const images = currentImages?.length ? currentImages : [];
  const activeImage = images[selectedImage] || images[0];
  const showArrows = images.length > 1;

  const step = (dir) => {
    if (!showArrows) return;
    const next = (selectedImage + dir + images.length) % images.length;
    setSelectedImage(next);
    setImageLoaded(false);
  };

  return (
    <div className="lg:sticky lg:top-24">
      <div className="flex gap-3">
        {/* Vertical Thumbnail Rail - Desktop */}
        {images.length > 1 && (
          <div className="hidden lg:flex flex-col gap-2.5">
            {images.map((url, index) => (
              <button
                key={index}
                onClick={() => {
                  setSelectedImage(index);
                  setImageLoaded(false);
                }}
                aria-label={`View image ${index + 1}`}
                aria-current={selectedImage === index}
                className={`relative w-[76px] h-[76px] rounded-xl overflow-hidden transition-all border-2 ${
                  selectedImage === index
                    ? "border-brand-600 ring-2 ring-brand-600/20"
                    : "border-border hover:border-border-strong"
                }`}
              >
                <img src={url} alt={`${productTitle} ${index + 1}`} className="w-full h-full object-cover" />
                {selectedImage === index && (
                  <span className="absolute inset-0 bg-brand-600/10" aria-hidden />
                )}
              </button>
            ))}
          </div>
        )}

        {/* Main Image */}
        <div
          className="relative flex-1 rounded-2xl border border-border bg-surface overflow-hidden group/main"
          onMouseEnter={() => setZoom(true)}
          onMouseLeave={() => setZoom(false)}
        >
          <div className="p-4 sm:p-6">
            <img
              src={activeImage}
              alt={productTitle}
              onLoad={() => setImageLoaded(true)}
              className={`w-full h-[320px] lg:h-[440px] object-contain rounded-xl transition-transform duration-300 ${
                zoom ? "scale-125 cursor-zoom-in" : "scale-100 cursor-zoom-out"
              }`}
            />
          </div>

          {/* Prev / Next arrows */}
          {showArrows && (
            <>
              <button
                onClick={() => step(-1)}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-surface-alt/90 backdrop-blur border border-border text-text-muted hover:text-foreground hover:border-border-strong transition-all opacity-0 group-hover/main:opacity-100 active:scale-90"
              >
                <ChevronLeft size={18} aria-hidden />
              </button>
              <button
                onClick={() => step(1)}
                aria-label="Next image"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-surface-alt/90 backdrop-blur border border-border text-text-muted hover:text-foreground hover:border-border-strong transition-all opacity-0 group-hover/main:opacity-100 active:scale-90"
              >
                <ChevronRight size={18} aria-hidden />
              </button>
            </>
          )}

          {/* Zoom hint */}
          <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-surface/90 backdrop-blur border border-border px-2.5 py-1 text-[11px] font-semibold text-text-muted">
            <ZoomIn size={12} aria-hidden />
            Hover to zoom
          </span>

          {/* Image counter */}
          {images.length > 1 && (
            <span className="absolute bottom-3 left-3 rounded-full bg-foreground/90 backdrop-blur text-background px-2.5 py-1 text-[11px] font-bold tabular-nums">
              {selectedImage + 1} / {images.length}
            </span>
          )}

          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              aria-pressed={isWishlisted}
              className={`p-2.5 rounded-xl border backdrop-blur transition-all active:scale-90 ${
                isWishlisted
                  ? "bg-danger-soft border-danger/40 text-danger"
                  : "bg-surface-alt border-border text-text-secondary hover:text-foreground hover:border-border-strong"
              }`}
            >
              <Heart size={18} className={isWishlisted ? "fill-current" : ""} aria-hidden />
            </button>

            <div className="relative">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                aria-label="Share product"
                aria-expanded={showShareMenu}
                className="p-2.5 rounded-xl border border-border bg-surface-alt text-text-secondary hover:text-foreground hover:border-border-strong transition-all active:scale-90"
              >
                <Share2 size={18} aria-hidden />
              </button>

              {showShareMenu && (
                <div className="absolute right-0 mt-2 rounded-xl border border-border bg-surface shadow-overlay p-1.5 w-44 z-20 animate-scale-in">
                  {shareOptions.map(({ key, label }) => (
                    <button
                      key={key}
                      onClick={() => handleShare(key)}
                      className="w-full text-left px-3.5 py-2 hover:bg-surface-hover rounded-lg text-sm transition capitalize"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Discount Badge */}
          {discount > 0 && (
            <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-brand-600 to-info text-white text-xs font-bold shadow-sm">
              <Tag size={13} aria-hidden />
              {discount}% OFF
            </div>
          )}
        </div>
      </div>

      {/* Horizontal Thumbnails - Mobile / Tablet */}
      {images.length > 1 && (
        <div className="lg:hidden flex gap-3 overflow-x-auto pb-1.5 mt-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {images.map((url, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedImage(index);
                setImageLoaded(false);
              }}
              aria-label={`View image ${index + 1}`}
              aria-current={selectedImage === index}
              className={`flex-shrink-0 rounded-xl border-2 overflow-hidden transition-all ${
                selectedImage === index
                  ? "border-brand-600 ring-2 ring-brand-600/20"
                  : "border-border hover:border-border-strong"
              }`}
            >
              <img src={url} alt={`${productTitle} ${index + 1}`} className="w-16 h-16 object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;
