
import React, { useState } from "react";
import Slider from "react-slick";
import { IoCartOutline } from "react-icons/io5";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const ProductCard = ({ product }) => {
  const [wishlist, setWishlist] = useState(false);
  const [showCarousel, setShowCarousel] = useState(false);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: false, // ❌ No autoplay
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div
      className="border relative border-gray-100 rounded-2xl cursor-pointer hover:scale-105 hover:shadow-2xl transition-all p-2"
      onClick={() => setShowCarousel(true)} // enable carousel on click
    >
      {/* Wishlist Heart */}
      <div
        className="absolute top-3 right-3 z-20 bg-white p-2 rounded-full shadow-md"
        onClick={(e) => {
          e.stopPropagation(); // prevent triggering carousel toggle
          setWishlist(!wishlist);
        }}
      >
        {wishlist ? (
          <FaHeart className="text-red-500 h-5 w-5" />
        ) : (
          <FaRegHeart className="text-gray-500 h-5 w-5" />
        )}
      </div>

      {/* Image / Carousel */}
      <div className="aspect-square overflow-hidden rounded-xl">
        {showCarousel ? (
          <Slider {...settings}>
            {product.images.map((img, idx) => (
              <div key={idx} className="flex items-center justify-center">
                <img
                  src={img}
                  alt={`${product.title}-${idx}`}
                  className="h-48 w-full object-contain bg-gray-100 rounded-xl"
                />
              </div>
            ))}
          </Slider>
        ) : (
          <img
            src={product.images[0]}
            alt={product.title}
            className="h-48 w-full object-contain bg-gray-100 rounded-xl"
          />
        )}
      </div>

      {/* Details */}
      <h1 className="line-clamp-2 mt-2 font-semibold">{product.title}</h1>
      <p className="my-1 text-lg text-gray-800 font-bold">${product.price}</p>

      {/* Add to Cart Button */}
      <button
        className="bg-red-500 px-3 py-2 text-lg rounded-md text-white w-full cursor-pointer flex gap-2 items-center justify-center font-semibold"
        onClick={(e) => e.stopPropagation()} // prevent carousel toggle
      >
        <IoCartOutline className="h-6 w-6" />
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;







import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { getData } from "../context/DataContext";
import { useState } from "react";
import { IoCartOutline, IoHeart, IoHeartOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { BiTrendingUp } from "react-icons/bi";
import { MdOutlineLocalOffer } from "react-icons/md";

const ProductCard = ({ product, viewMode }) => {
  const navigate = useNavigate();
  const { addToCart, cartItem } = useCart();
  const { getProductImageUrl } = getData();
  const imageUrl = getProductImageUrl(product);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const isInCart = cartItem?.some(item => item._id === product._id);

  if (viewMode === "list") {
    return (
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 flex gap-4 p-4 animate-fadeIn">
        <div className="w-40 h-40 flex-shrink-0 rounded-xl bg-white border border-gray-200 overflow-hidden flex items-center justify-center">
  {!imageLoaded && (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-gray-300 border-t-red-500 rounded-full animate-spin"></div>
    </div>
  )}
  <img
    src={imageUrl}
    alt={product.title}
    className={`max-w-full max-h-full object-contain transition-transform duration-500 cursor-pointer ${
      imageLoaded ? "opacity-100" : "opacity-0"
    } group-hover:scale-105`}
    onClick={() => navigate(`/products/${product._id}`)}
    onLoad={() => setImageLoaded(true)}
  />
</div>
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <h3 
                  className="font-bold text-lg mb-1 hover:text-red-500 cursor-pointer transition-colors line-clamp-2"
                  onClick={() => navigate(`/products/${product._id}`)}
                >
                  {product.title}
                </h3>
                <p className="text-sm text-gray-500">{product.brand || product.category?.name}</p>
              </div>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`p-2 rounded-full hover:bg-gray-100 transition-all ${isWishlisted ? 'text-red-500' : 'text-gray-400'}`}
              >
                {isWishlisted ? <IoHeart size={22} /> : <IoHeartOutline size={22} />}
              </button>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
              <span className="flex items-center gap-1">
                <FaStar className="text-yellow-400" size={14} />
                <span className="font-semibold">{product.rating || '4.5'}</span>
              </span>
              <span className="px-2 py-1 bg-green-50 text-green-600 rounded-md text-xs font-semibold">
                In Stock
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-3xl font-bold text-gray-800">${product.price}</p>
              <p className="text-xs text-gray-500 line-through">${ (product.price * 1.2).toFixed(2)}</p>
            </div>
            <button
              onClick={() => addToCart(product)}
              disabled={isInCart}
              className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                isInCart 
                  ? 'bg-green-500 text-white cursor-not-allowed' 
                  : 'bg-red-500 text-white hover:bg-red-600 hover:shadow-lg'
              }`}
            >
              <IoCartOutline size={20} />
              {isInCart ? 'Added' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group relative animate-fadeIn">
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className={`p-2 rounded-full bg-white shadow-lg hover:scale-110 transition-all ${
            isWishlisted ? 'text-red-500' : 'text-gray-400'
          }`}
        >
          {isWishlisted ? <IoHeart size={20} /> : <IoHeartOutline size={20} />}
        </button>
      </div>

      <div className="absolute top-3 left-3 z-10">
        <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full shadow-lg">
          SALE 20%
        </span>
      </div>

      
        <div className="relative overflow-hidden aspect-square bg-gray-100">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 border-4 border-gray-300 border-t-red-500 rounded-full animate-spin"></div>
            </div>
          )}
          <img
            src={imageUrl}
            alt={product.title}
            className={`w-full h-full object-cover cursor-pointer transition-all duration-500 group-hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={() => navigate(`/products/${product._id}`)}
            onLoad={() => setImageLoaded(true)}
          />
        </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500 font-semibold uppercase tracking-wide">
            {product.category?.name || 'Product'}
          </span>
          <div className="flex items-center gap-1 text-sm">
            <FaStar className="text-yellow-400" size={14} />
            <span className="font-semibold text-gray-700">{product.rating || '4.5'}</span>
          </div>
        </div>

        <h3 
          className="font-bold text-base mb-2 line-clamp-2 h-12 cursor-pointer hover:text-red-500 transition-colors"
          onClick={() => navigate(`/products/${product._id}`)}
        >
          {product.title}
        </h3>

        <div className="flex items-baseline gap-2 mb-3">
          <p className="text-2xl font-bold text-gray-800">${product.price}</p>
          <p className="text-sm text-gray-400 line-through">${(product.price * 1.2).toFixed(2)}</p>
        </div>

        <div className="flex items-center gap-2 mb-3 text-xs text-gray-600">
          <span className="flex items-center gap-1 px-2 py-1 bg-green-50 text-green-600 rounded-md font-semibold">
            <BiTrendingUp size={14} />
            Trending
          </span>
          <span className="flex items-center gap-1 px-2 py-1 bg-orange-50 text-orange-600 rounded-md font-semibold">
            <MdOutlineLocalOffer size={14} />
            Limited
          </span>
        </div>

        <button
          onClick={() => addToCart(product)}
          disabled={isInCart}
          className={`w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
            isInCart 
              ? 'bg-green-500 text-white cursor-not-allowed' 
              : 'bg-red-500 text-white hover:bg-red-600 hover:shadow-lg transform hover:-translate-y-1'
          }`}
        >
          <IoCartOutline size={20} />
          {isInCart ? 'Added to Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard
