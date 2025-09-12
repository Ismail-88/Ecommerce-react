
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

