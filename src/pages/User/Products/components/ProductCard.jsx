import { useNavigate } from "react-router-dom";

import { useState } from "react";
import { ShoppingBag, Heart, Star, Zap, Tag, Eye, Sparkles } from "lucide-react";
import { getData } from "../../../../context/DataContext";
import { useCart } from "../../../../context/CartContext";

const ProductCard = ({ product, viewMode }) => {
  const navigate = useNavigate();
  const { addToCart, cartItem } = useCart();
  const { getProductImageUrl } = getData();
  const imageUrl = getProductImageUrl(product);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isInCart = cartItem?.some(item => item._id === product._id);

  if (viewMode === "list") {
    return (
      <div 
        className="group relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-3xl overflow-hidden hover:border-cyan-500/30 transition-all flex gap-6 p-6"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-blue-500/0 to-purple-500/0 group-hover:from-cyan-500/5 group-hover:via-blue-500/5 group-hover:to-purple-500/5 transition-all"></div>
        
        <div className="relative w-48 h-48 flex-shrink-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 border-4 border-white/10 border-t-cyan-500 rounded-full animate-spin"></div>
            </div>
          )}
          <img
            src={imageUrl}
            alt={product.title}
            className={`w-full h-full object-contain p-4 transition-all duration-700 cursor-pointer ${
              imageLoaded ? "opacity-100" : "opacity-0"
            } group-hover:scale-110`}
            onClick={() => navigate(`/products/${product._id}`)}
            onLoad={() => setImageLoaded(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>

        <div className="relative flex-1 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    {product.category?.name || 'Premium'}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-bold text-gray-400">{product.rating || '4.9'}</span>
                  </div>
                </div>
                <h3 
                  className="font-bold text-xl mb-2 line-clamp-2 cursor-pointer transition-all group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-500 group-hover:bg-clip-text group-hover:text-transparent"
                  onClick={() => navigate(`/products/${product._id}`)}
                >
                  {product.title}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
              </div>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`ml-4 p-3 rounded-xl border border-white/10 backdrop-blur-xl transition-all ${
                  isWishlisted 
                    ? 'bg-gradient-to-r from-pink-500/20 to-rose-500/20 border-pink-500/30' 
                    : 'bg-white/5 hover:bg-white/10'
                }`}
              >
                <Heart className={`w-5 h-5 transition-all ${
                  isWishlisted ? 'fill-pink-500 text-pink-500' : 'text-gray-400'
                }`} />
              </button>
            </div>
            
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                <Zap className="w-3 h-3" />
                In Stock
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/30 text-orange-400 text-xs font-bold">
                <Tag className="w-3 h-3" />
                20% OFF
              </span>
            </div>
          </div>
          
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-4xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                  ${product.price}
                </span>
                <span className="text-lg text-gray-600 line-through">${(product.price * 1.2).toFixed(2)}</span>
              </div>
              <span className="text-sm text-gray-500">Free Shipping</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => navigate(`/products/${product._id}`)}
                className="p-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl hover:border-cyan-500/30 transition-all"
              >
                <Eye className="w-5 h-5 text-gray-400" />
              </button>
              <button
                onClick={() => addToCart(product)}
                disabled={isInCart}
                className={`relative overflow-hidden group/btn px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${
                  isInCart 
                    ? 'border border-emerald-500/30 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-400 cursor-not-allowed' 
                    : ''
                }`}
              >
                {!isInCart && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                  </>
                )}
                <ShoppingBag className="relative w-5 h-5" />
                <span className="relative">{isInCart ? 'Added' : 'Add to Cart'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="group relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-3xl overflow-hidden hover:border-cyan-500/30 hover:scale-[1.02] transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient Overlay on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-blue-500/0 to-purple-500/0 group-hover:from-cyan-500/5 group-hover:via-blue-500/5 group-hover:to-purple-500/5 transition-all duration-500"></div>
      
      {/* Wishlist & Sale Badge */}
      <div className="absolute top-4 left-4 right-4 z-10 flex items-start justify-between">
        <div className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white text-xs font-bold shadow-lg backdrop-blur-xl">
          <Sparkles className="w-3 h-3" />
          SALE 20%
        </div>
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className={`p-2.5 rounded-full border backdrop-blur-2xl transition-all transform hover:scale-110 ${
            isWishlisted 
              ? 'bg-gradient-to-r from-pink-500/30 to-rose-500/30 border-pink-500/50' 
              : 'bg-black/30 border-white/10 hover:border-white/30'
          }`}
        >
          <Heart className={`w-5 h-5 transition-all ${
            isWishlisted ? 'fill-pink-500 text-pink-500' : 'text-white'
          }`} />
        </button>
      </div>

      {/* Product Image with 3D Effect */}
      <div className="relative h-72 bg-gradient-to-br from-white/5 to-transparent overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-white/10 border-t-cyan-500 rounded-full animate-spin"></div>
          </div>
        )}
        <img
          src={imageUrl}
          alt={product.title}
          className={`w-full h-full object-contain p-6 cursor-pointer transition-all duration-700 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          } ${isHovered ? 'scale-110' : 'scale-100'}`}
          onClick={() => navigate(`/products/${product._id}`)}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Gradient Reflection */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Quick View Button */}
        <div className={`absolute inset-x-0 bottom-0 p-4 transform transition-all duration-500 ${
          isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}>
          <button
            onClick={() => navigate(`/products/${product._id}`)}
            className="w-full py-3 rounded-xl border border-white/20 bg-black/50 backdrop-blur-2xl text-white font-bold hover:bg-black/70 transition-all flex items-center justify-center gap-2"
          >
            <Eye className="w-5 h-5" />
            Quick View
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="relative p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            {product.category?.name || 'Premium'}
          </span>
          <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/30">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-bold text-yellow-400">{product.rating || '4.9'}</span>
          </div>
        </div>

        <h3 
          className="font-bold text-base mb-3 line-clamp-2 h-12 cursor-pointer transition-all hover:text-cyan-400"
          onClick={() => navigate(`/products/${product._id}`)}
        >
          {product.title}
        </h3>

        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-3xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            ${product.price}
          </span>
          <span className="text-sm text-gray-600 line-through">${(product.price * 1.2).toFixed(2)}</span>
        </div>

        <div className="flex items-center gap-2 mb-4 text-xs">
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 text-emerald-400 font-bold">
            <Zap className="w-3 h-3" />
            Trending
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/30 text-orange-400 font-bold">
            <Tag className="w-3 h-3" />
            Limited
          </span>
        </div>

        <button
          onClick={() => addToCart(product)}
          disabled={isInCart}
          className={`relative w-full overflow-hidden group/btn rounded-xl transition-all ${
            isInCart ? 'cursor-not-allowed' : ''
          }`}
        >
          {isInCart ? (
            <div className="border border-emerald-500/30 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 py-3 flex items-center justify-center gap-2 text-emerald-400 font-bold">
              <span className="w-5 h-5 flex items-center justify-center">✓</span>
              Added to Cart
            </div>
          ) : (
            <>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.3),transparent_70%)] opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
              <span className="relative flex items-center justify-center gap-2 py-3 text-white font-bold">
                <ShoppingBag className="w-5 h-5" />
                Add to Cart
              </span>
            </>
          )}
        </button>
      </div>

      {/* Shine Effect on Hover */}
      <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 transition-all duration-1000 ${
        isHovered ? 'translate-x-full' : '-translate-x-full'
      }`}></div>
    </div>
  );
};

export default ProductCard;