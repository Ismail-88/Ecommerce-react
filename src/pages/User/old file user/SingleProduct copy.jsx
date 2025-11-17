import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "./../../assets/Loading4.webm";
import { getData } from "../../context/DataContext";
import BreadCrumbs from "../../components/BreadCrumbs";
import { IoCartOutline, IoHeartOutline, IoHeart } from "react-icons/io5";
import {
  FaShippingFast,
  FaUndo,
  FaShieldAlt,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaCheckCircle,
  FaShareAlt,
  FaCheck,
} from "react-icons/fa";
import { MdLocalOffer } from "react-icons/md";
import { useCart } from "../../context/CartContext";

const SingleProduct = () => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [currentImages, setCurrentImages] = useState([]);

  const {
    singleProduct,
    getSingleProduct,
    data: products,
    getProductImagesUrls,
    getImageUrl,
  } = getData();

  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  // ✨ FIXED: Process color images with proper URLs
  const processColorImages = (images) => {
    if (!images || images.length === 0) return [];
    return images.map((img) => getImageUrl(img)).filter((img) => img !== null);
  };

  useEffect(() => {
    if (singleProduct) {
      if (singleProduct.colors && singleProduct.colors.length > 0) {
        const firstColor = singleProduct.colors[0];
        setSelectedColor(firstColor);
        // Process color images through getImageUrl
        const processedImages = processColorImages(firstColor.images);
        setCurrentImages(processedImages);
      } else {
        // Use the context's getProductImagesUrls for default images
        const defaultImages = getProductImagesUrls(singleProduct);
        setCurrentImages(defaultImages);
      }
      setSelectedImage(0);
    }
  }, [singleProduct]);

  // ✨ ADD THIS FUNCTION
  const handleColorChange = (color) => {
    setSelectedColor(color);
    const processedImages = processColorImages(color.images);
    setCurrentImages(processedImages);
    setSelectedImage(0);
  };

  useEffect(() => {
    getSingleProduct(id);
    window.scrollTo(0, 0);
  }, [id]);

  const discountPercentage = singleProduct?.discount || 10;
  const originalPrice = Math.round(
    singleProduct?.price + (singleProduct?.price * discountPercentage) / 100
  );

  // Handle quantity change
  const handleQuantityChange = (type) => {
    if (type === "increment") {
      setQuantity(quantity + 1);
    } else if (type === "decrement" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Add to cart with quantity
  const handleAddToCart = () => {
    const productWithQuantity = {
      ...singleProduct,
      quantity: quantity,
      selectedColor: selectedColor?.name || "Default",
    };
    addToCart(productWithQuantity);
  };

  // Buy now - add to cart and go to cart page
  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/cart");
  };

  // Toggle wishlist
  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    // You can add wishlist context here
  };

  // Render star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-yellow-400" />);
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-400" />);
    }
    return stars;
  };

  // Share functionality
  const handleShare = (platform) => {
    const url = window.location.href;
    const text = `Check out ${singleProduct?.title}`;

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      whatsapp: `https://wa.me/?text=${text} ${url}`,
      copy: url,
    };

    if (platform === "copy") {
      navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    } else {
      window.open(shareUrls[platform], "_blank");
    }
    setShowShareMenu(false);
  };

  // Get related products - handle both object and string category
  const getCategoryId = (category) => {
    if (typeof category === "string") return category;
    return category?._id || category?.id;
  };

  const relatedProducts = products
    ?.filter((p) => {
      const pCategoryId = getCategoryId(p.category);
      const currentCategoryId = getCategoryId(singleProduct?.category);
      return pCategoryId === currentCategoryId && p._id !== singleProduct?._id;
    })
    .slice(0, 4);

  // console.log('Products length:', products?.length);
  // console.log('Current category ID:', getCategoryId(singleProduct?.category));
  // console.log('Related products found:', relatedProducts?.length);

  if (!singleProduct) {
    return (
      <div className="flex items-center justify-center h-screen">
        <video muted autoPlay loop>
          <source src={Loading} type="video/webm" />
        </video>
      </div>
    );
  }

  return (
    <div className="px-4 pb-10 md:px-0">
      <BreadCrumbs title={singleProduct.title} />

      <div className="max-w-6xl mx-auto md:p-6 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Product Images Section */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative rounded-2xl overflow-hidden bg-gray-100 group">
            <img
              // src={imageUrls[selectedImage] || imageUrls[0]}
              // alt={singleProduct.title}
              src={currentImages[selectedImage] || currentImages[0]}
              alt={singleProduct?.title}
              className="w-full h-[400px] md:h-[500px] object-cover"
            />

            {/* Wishlist & Share buttons on image */}
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={toggleWishlist}
                className="bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition"
              >
                {isWishlisted ? (
                  <IoHeart className="text-red-500 text-xl" />
                ) : (
                  <IoHeartOutline className="text-gray-700 text-xl" />
                )}
              </button>
              <div className="relative">
                <button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition"
                >
                  <FaShareAlt className="text-gray-700 text-xl" />
                </button>

                {/* Share Menu */}
                {showShareMenu && (
                  <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-xl p-2 w-40 z-10">
                    <button
                      onClick={() => handleShare("facebook")}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded text-sm"
                    >
                      Facebook
                    </button>
                    <button
                      onClick={() => handleShare("twitter")}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded text-sm"
                    >
                      Twitter
                    </button>
                    <button
                      onClick={() => handleShare("whatsapp")}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded text-sm"
                    >
                      WhatsApp
                    </button>
                    <button
                      onClick={() => handleShare("copy")}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded text-sm"
                    >
                      Copy Link
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Discount Badge */}
            {singleProduct.discount > 0 && (
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full font-semibold text-sm">
                {singleProduct.discount}% OFF
              </div>
            )}
          </div>

          {/* Thumbnail Images */}
          {currentImages.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {currentImages.map((url, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`cursor-pointer rounded-lg overflow-hidden border-2 transition ${
                    selectedImage === index
                      ? "border-red-500"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <img
                    src={url}
                    alt={`${singleProduct.title} ${index + 1}`}
                    className="w-full h-20 object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Details Section */}
        <div className="flex flex-col gap-4">
          {/* Title */}
          <h1 className="md:text-3xl text-2xl font-bold text-gray-800">
            {singleProduct.title}
          </h1>

          {/* Brand */}
          <div className="text-gray-600 text-sm uppercase tracking-wide">
            {/* {singleProduct.brand} / {singleProduct.category} */}
            {singleProduct.brand} /{" "}
            {singleProduct.category?.name || singleProduct.category}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {renderStars(singleProduct.rating || 4.5)}
            </div>
            <span className="text-gray-600 text-sm">
              ({singleProduct.rating || 4.5}) • 234 reviews
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-3xl font-bold text-red-500">
              ${singleProduct.price}
            </span>
            <span className="text-xl text-gray-500 line-through">
              ${originalPrice}
            </span>
            <span className="bg-red-500 text-white rounded-full px-4 py-1 text-sm font-semibold">
              {singleProduct.discount}% discount
            </span>
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-2 text-green-600">
            <FaCheckCircle />
            <span className="font-semibold">In Stock</span>
          </div>

          {/* // ✨ ADD THIS SECTION (after Stock Status, before Description) */}
          {singleProduct.colors && singleProduct.colors.length > 0 && (
            <div className="border-t border-gray-200 pt-4">
              <label className="text-sm font-semibold text-gray-700 mb-3 block">
                Color:{" "}
                <span className="text-gray-600 font-normal">
                  {selectedColor?.name}
                </span>
              </label>
              <div className="flex flex-wrap gap-3">
                {singleProduct.colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => handleColorChange(color)}
                    className={`relative w-12 h-12 rounded-full border-2 transition-all ${
                      selectedColor?.name === color.name
                        ? "border-red-500 scale-110"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  >
                    {selectedColor?.name === color.name && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <FaCheck className="text-white text-sm drop-shadow-lg" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <div className="border-t border-b border-gray-200 py-4">
            <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed">
              {singleProduct.description}
            </p>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <label className="text-sm font-semibold text-gray-700">
              Quantity:
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => handleQuantityChange("decrement")}
                className="px-4 py-2 hover:bg-gray-100 transition"
              >
                -
              </button>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="w-16 text-center border-x border-gray-300 py-2 focus:outline-none"
              />
              <button
                onClick={() => handleQuantityChange("increment")}
                className="px-4 py-2 hover:bg-gray-100 transition"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 cursor-pointer px-6 flex items-center justify-center gap-2 py-3 text-lg bg-white border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition font-semibold"
            >
              <IoCartOutline className="w-6 h-6" /> Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 cursor-pointer px-6 py-3 text-lg bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-semibold"
            >
              Buy Now
            </button>
          </div>

          {/* Features/Benefits */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-3 mt-4">
            <div className="flex items-center gap-3 text-gray-700">
              <FaShippingFast className="text-red-500 text-xl" />
              <div>
                <p className="font-semibold text-sm">Free Delivery</p>
                <p className="text-xs text-gray-600">On orders over $50</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <FaUndo className="text-red-500 text-xl" />
              <div>
                <p className="font-semibold text-sm">30 Days Return</p>
                <p className="text-xs text-gray-600">Easy returns policy</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <FaShieldAlt className="text-red-500 text-xl" />
              <div>
                <p className="font-semibold text-sm">Secure Payment</p>
                <p className="text-xs text-gray-600">100% secure checkout</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <MdLocalOffer className="text-red-500 text-xl" />
              <div>
                <p className="font-semibold text-sm">Best Price</p>
                <p className="text-xs text-gray-600">Guaranteed lowest price</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts && relatedProducts.length > 0 && (
        <div className="max-w-6xl mx-auto mt-16 px-4 md:px-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Related Products
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map((product) => (
              <div
                key={product._id}
                onClick={() => navigate(`/product/${product._id}`)}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={
                      Array.isArray(product.images)
                        ? product.images[0]
                        : product.images
                    }
                    alt={product.title}
                    className="w-full h-40 md:h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {product.discount > 0 && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                      -{product.discount}%
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-sm line-clamp-2 mb-2">
                    {product.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-red-500 font-bold">
                      ${product.price}
                    </span>
                    <span className="text-xs text-gray-500 line-through">
                      ${Math.round(product.price * 1.2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleProduct;







// import React, { useEffect } from 'react'
// import { useParams } from 'react-router-dom'
// import Loading from '../assets/Loading4.webm'
// import { getData } from '../../context/DataContext'
// import BreadCrumbs from '../../components/BreadCrumbs'
// import { IoCartOutline } from 'react-icons/io5'
// import { useCart } from '../../context/CartContext'
// const SingleProduct = () => {

//   const {singleProduct, getSingleProduct}=getData();

//   const {id}= useParams()
// //   console.log(id)
//   const {addToCart} = useCart();
  

//   useEffect(()=>{getSingleProduct(id)},[id])
// const discountPercentage = 10; // you can set this dynamically
// const OriginalPrice = Math.round(
//   singleProduct?.price + (singleProduct?.price * discountPercentage / 100)
// );  return (
//     <>
//     {
//         singleProduct ? 
//         <div className='px-4 pb-4 md:px-0'>
//             <BreadCrumbs title={singleProduct.title}/>
//             <div className='max-w-6xl mx-auto md:p-6 grid grid-cols-1 md:grid-cols-2 gap-10'>
//                 {/* product image */}
//                 <div className="w-full">
//                     <img src={singleProduct.images} alt={singleProduct.title} className='rounded-2xl w-full object-cover'/>
//                 </div>
//                 {/* product details */}
//                 <div className="flex flex-col gap-6">
//                    <h1 className='md:text-3xl text-xl font-bold text-gray-800'>{singleProduct.title}</h1>
//                    <div className="text-gray-700">{singleProduct.brand.toUpperCase()} / {singleProduct.brand.toUpperCase()}</div>
//                    <p className='text-xl text-red-500 font-bold'>${singleProduct?.price} <span className='text-gray-700 line-through'>${OriginalPrice}</span> <span className='bg-red-500 text-white rounded-full px-4 py-2'>{singleProduct.discount}% discount</span></p>
//                     <p className='text-gray-600 mt-3'>{singleProduct.description}</p>

//                     {/* Quantity selector */}
//                 <div className="flex items-center gap-4">
//                    <label htmlFor="" className='text-sm font-medium text-gray-700'>Quantity:</label>
//                    <input type="number" min={1} value={1} className='w-20 border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-red-500' />
//                 </div>

//                 <div className="flex gap-4 mt-4">
//                     <button onClick={()=>addToCart(singleProduct)} className='cursor-pointer px-6 flex gap-2 py-2 text-lg bg-red-500 text-white rounded-md'><IoCartOutline className='w-6 h-6'/> Add to Cart</button>
//                 </div>
//                 </div>
//             </div>
//         </div> :  
//         <div className="flex items-center justify-center h-screen">
//             <video muted autoPlay loop>
//                 <source src={Loading} type="video/webm" />
//             </video>
//         </div>
//     }
//     </>
//   )
// }

// export default SingleProduct
