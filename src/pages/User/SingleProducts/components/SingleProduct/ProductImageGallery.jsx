
import React from 'react';
import { Heart, Share2, Tag } from 'lucide-react';

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
  handleShare
}) => {
  return (
    <div className="lg:sticky lg:top-28">
      {/* Main Image */}
      <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] overflow-hidden p-8 mb-6">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5"></div>
        <img
          src={currentImages[selectedImage] || currentImages[0]}
          alt={productTitle}
          className="relative w-full h-[400px] lg:h-[500px] object-contain"
        />
        
        {/* Action Buttons */}
        <div className="absolute top-6 right-6 flex gap-3">
          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className={`p-3 rounded-xl border backdrop-blur-2xl transition-all ${
              isWishlisted 
                ? 'bg-gradient-to-r from-pink-500/30 to-rose-500/30 border-pink-500/50' 
                : 'bg-black/50 border-white/10 hover:border-white/30'
            }`}
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-pink-500 text-pink-500' : ''}`} />
          </button>
          
          <div className="relative">
            <button
              onClick={() => setShowShareMenu(!showShareMenu)}
              className="p-3 rounded-xl border border-white/10 bg-black/50 backdrop-blur-2xl hover:border-white/30 transition-all"
            >
              <Share2 className="w-5 h-5" />
            </button>
            
            {showShareMenu && (
              <div className="absolute right-0 mt-3 rounded-2xl border border-white/10 bg-black/95 backdrop-blur-3xl p-3 w-48 z-20 shadow-2xl">
                {['facebook', 'twitter', 'whatsapp', 'copy'].map((platform) => (
                  <button
                    key={platform}
                    onClick={() => handleShare(platform)}
                    className="w-full text-left px-4 py-2 hover:bg-white/5 rounded-xl text-sm transition capitalize"
                  >
                    {platform === 'copy' ? 'Copy Link' : platform}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-6 left-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white text-sm font-bold shadow-lg">
            <Tag className="w-4 h-4" />
            {discount}% OFF
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {currentImages.length > 1 && (
        <div className="flex gap-4 overflow-x-auto pb-2">
          {currentImages.map((url, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`flex-shrink-0 rounded-2xl border-2 overflow-hidden transition-all ${
                selectedImage === index
                  ? "border-cyan-500 scale-105"
                  : "border-white/10 hover:border-white/30"
              }`}
            >
              <img
                src={url}
                alt={`${productTitle} ${index + 1}`}
                className="w-20 h-20 object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;