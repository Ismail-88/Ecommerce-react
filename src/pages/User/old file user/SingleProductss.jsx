import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IoCartOutline } from 'react-icons/io5';
import Loading from "./../../assets/Loading4.webm";
import { getData } from '../../context/DataContext';
import { useCart } from '../../context/CartContext';
import BreadCrumbs from '../../components/BreadCrumbs';

// Import Components
import ProductImageGallery from '../../components/product/ProductImageGallery';
import ProductHeader from '../../components/product/ProductHeader';
import PriceCard from '../../components/product/PriceCard';
import ColorSelector from '../../components/product/ColorSelector';
import DeliveryInfo from '../../components/product/DeliveryInfo';
import ProductDescription from '../../components/product/ProductDescription';
import RelatedProducts from '../../components/product/RelatedProducts';
import ProductReviews from '../../components/product/review/ProductReviews';
import { useUser } from '@clerk/clerk-react';
import axios from 'axios';

const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useUser();
  const { singleProduct, getSingleProduct, data: products, getProductImagesUrls, getImageUrl } = getData();

  // State Management
  const [selectedColor, setSelectedColor] = useState(null);
  const [currentImages, setCurrentImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
   const [reviewStats, setReviewStats] = useState({ average: 0, total: 0 });

  // Process color images
  const processColorImages = (images) => {
    if (!images || images.length === 0) return [];
    return images.map(img => getImageUrl(img)).filter(img => img !== null);
  };

  useEffect(() => {
    const fetchReviewStats = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}/reviews/stats`);
        setReviewStats(res.data);
      } catch (error) {
        console.error("Error fetching review stats:", error);
      }
    };

    if (id) fetchReviewStats();
  }, [id]);

  // Initialize images and colors
  useEffect(() => {
    if (singleProduct) {
      if (singleProduct.colors && singleProduct.colors.length > 0) {
        const firstColor = singleProduct.colors[0];
        setSelectedColor(firstColor);
        const processedImages = processColorImages(firstColor.images);
        setCurrentImages(processedImages);
      } else {
        const defaultImages = getProductImagesUrls(singleProduct);
        setCurrentImages(defaultImages);
      }
      setSelectedImage(0);
    }
  }, [singleProduct]);

  useEffect(() => {
    getSingleProduct(id);
    window.scrollTo(0, 0);
  }, [id]);

  const handleColorChange = (color) => {
    setSelectedColor(color);
    const processedImages = processColorImages(color.images);
    setCurrentImages(processedImages);
    setSelectedImage(0);
  };

  // Share functionality
  const handleShare = (platform) => {
    const url = window.location.href;
    const text = `Check out ${singleProduct?.title}`;
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      whatsapp: `https://wa.me/?text=${text} ${url}`,
      copy: url
    };

    if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    } else {
      window.open(shareUrls[platform], '_blank');
    }
    setShowShareMenu(false);
  };

  // Cart actions
  const handleAddToCart = () => {
    const productWithQuantity = {
      ...singleProduct,
      quantity: quantity,
      selectedColor: selectedColor?.name || 'Default',
    };
    addToCart(productWithQuantity);
    // alert('Added to cart!');
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  // Get related products
  const getCategoryId = (category) => {
    if (typeof category === 'string') return category;
    return category?._id || category?.id;
  };

  const relatedProducts = products
    ?.filter((p) => {
      const pCategoryId = getCategoryId(p.category);
      const currentCategoryId = getCategoryId(singleProduct?.category);
      return pCategoryId === currentCategoryId && p._id !== singleProduct?._id;
    })
    .slice(0, 8);

  // Calculate pricing
  const discountPercentage = singleProduct?.discount || 10;
  const originalPrice = Math.round(
    singleProduct?.price + (singleProduct?.price * discountPercentage) / 100
  );

  

  // Loading state
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
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left Column - Images (40%) */}
          <div className="lg:col-span-5">
            <ProductImageGallery
              currentImages={currentImages}
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
              productTitle={singleProduct.title}
              discount={singleProduct.discount}
              isWishlisted={isWishlisted}
              toggleWishlist={() => setIsWishlisted(!isWishlisted)}
              showShareMenu={showShareMenu}
              setShowShareMenu={setShowShareMenu}
              handleShare={handleShare}
            />
          </div>

          {/* Right Column - Details (60%) */}
          <div className="lg:col-span-7">
             <ProductHeader
        product={singleProduct}
        rating={reviewStats.average}
        totalReviews={reviewStats.total}
      />

            <PriceCard
              price={singleProduct.price}
              originalPrice={originalPrice}
              discount={singleProduct.discount}
            />

            <ColorSelector
              colors={singleProduct.colors}
              selectedColor={selectedColor}
              onColorChange={handleColorChange}
            />

            <DeliveryInfo />

            <ProductDescription
              description={singleProduct.description}
              specifications={[
                { label: 'Brand', value: singleProduct.brand },
                { label: 'Category', value: singleProduct.category?.name || singleProduct.category },
                { label: 'In Stock', value: 'Yes' }
              ]}
            />

            {/* Mobile Action Buttons */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t  border-gray-200 shadow-xl p-3 flex gap-3 z-50">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-gradient-to-r from-red-500 to-purple-500 text-white font-semibold py-3 rounded shadow-md transition"
              >
                <IoCartOutline className="inline w-5 h-5 mr-2" />
                ADD TO CART
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 bg-gradient-to-r from-red-500 to-purple-500 text-white font-semibold py-3 rounded shadow-md transition"
              >
                ⚡ BUY NOW
              </button>
            </div>
          </div>
        </div>

       
        <RelatedProducts products={relatedProducts} />

        
        <ProductReviews
          productId={id} 
          productTitle={singleProduct.title}
          currentUser={user} 
        />
      </div>
    </div>
  );
};

export default SingleProduct;



// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { ShoppingBag, Heart, Share2, Star, Truck, RotateCcw, Shield, Zap, Tag, Crown } from 'lucide-react';
// import Loading from "./../../assets/Loading4.webm";
// import { getData } from '../../context/DataContext';
// import { useCart } from '../../context/CartContext';
// import { useUser } from '@clerk/clerk-react';
// import ProductReviews from '../../components/product/review/ProductReviews';
// import axios from 'axios';

// const SingleProduct = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { addToCart } = useCart();
//   const { user } = useUser();
//   const { singleProduct, getSingleProduct, data: products, getProductImagesUrls, getImageUrl } = getData();

//   const [selectedColor, setSelectedColor] = useState(null);
//   const [currentImages, setCurrentImages] = useState([]);
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [quantity, setQuantity] = useState(1);
//   const [isWishlisted, setIsWishlisted] = useState(false);
//   const [showShareMenu, setShowShareMenu] = useState(false);
//   const [reviewStats, setReviewStats] = useState({ average: 0, total: 0 });
//   const [pincode, setPincode] = useState('');
//   const [deliveryDate, setDeliveryDate] = useState(null);

//   const processColorImages = (images) => {
//     if (!images || images.length === 0) return [];
//     return images.map(img => getImageUrl(img)).filter(img => img !== null);
//   };

//   useEffect(() => {
//     const fetchReviewStats = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/products/${id}/reviews/stats`);
//         setReviewStats(res.data);
//       } catch (error) {
//         console.error("Error fetching review stats:", error);
//       }
//     };
//     if (id) fetchReviewStats();
//   }, [id]);

//   useEffect(() => {
//     if (singleProduct) {
//       if (singleProduct.colors && singleProduct.colors.length > 0) {
//         const firstColor = singleProduct.colors[0];
//         setSelectedColor(firstColor);
//         const processedImages = processColorImages(firstColor.images);
//         setCurrentImages(processedImages);
//       } else {
//         const defaultImages = getProductImagesUrls(singleProduct);
//         setCurrentImages(defaultImages);
//       }
//       setSelectedImage(0);
//     }
//   }, [singleProduct]);

//   useEffect(() => {
//     getSingleProduct(id);
//     window.scrollTo(0, 0);
//   }, [id]);

//   const handleColorChange = (color) => {
//     setSelectedColor(color);
//     const processedImages = processColorImages(color.images);
//     setCurrentImages(processedImages);
//     setSelectedImage(0);
//   };

//   const handleShare = (platform) => {
//     const url = window.location.href;
//     const text = `Check out ${singleProduct?.title}`;
//     const shareUrls = {
//       facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
//       twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
//       whatsapp: `https://wa.me/?text=${text} ${url}`,
//       copy: url
//     };
//     if (platform === 'copy') {
//       navigator.clipboard.writeText(url);
//       alert('Link copied!');
//     } else {
//       window.open(shareUrls[platform], '_blank');
//     }
//     setShowShareMenu(false);
//   };

//   const handleAddToCart = () => {
//     const productWithQuantity = {
//       ...singleProduct,
//       quantity: quantity,
//       selectedColor: selectedColor?.name || 'Default',
//     };
//     addToCart(productWithQuantity);
//   };

//   const handleBuyNow = () => {
//     handleAddToCart();
//     navigate('/cart');
//   };

//   const checkDelivery = () => {
//     if (pincode.length === 6) {
//       const date = new Date();
//       date.setDate(date.getDate() + 3);
//       setDeliveryDate(date);
//     }
//   };

//   const getCategoryId = (category) => {
//     if (typeof category === 'string') return category;
//     return category?._id || category?.id;
//   };

//   const relatedProducts = products
//     ?.filter((p) => {
//       const pCategoryId = getCategoryId(p.category);
//       const currentCategoryId = getCategoryId(singleProduct?.category);
//       return pCategoryId === currentCategoryId && p._id !== singleProduct?._id;
//     })
//     .slice(0, 8);

//   const discountPercentage = singleProduct?.discount || 10;
//   const originalPrice = Math.round(
//     singleProduct?.price + (singleProduct?.price * discountPercentage) / 100
//   );

//   if (!singleProduct) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-black">
//         <video muted autoPlay loop className="w-40 h-40">
//           <source src={Loading} type="video/webm" />
//         </video>
//       </div>
//     );
//   }

//   return (
//     <>
//     <div className="min-h-screen bg-black text-white">
//       <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
//         {/* Breadcrumb */}
//         <div className="text-sm text-gray-500 mb-6">
//           <span className="hover:text-cyan-400 cursor-pointer transition">Home</span>
//           <span className="mx-2">›</span>
//           <span className="hover:text-cyan-400 cursor-pointer transition">
//             {singleProduct.category?.name || singleProduct.category}
//           </span>
//           <span className="mx-2">›</span>
//           <span className="text-gray-400">{singleProduct.title}</span>
//         </div>

//         {/* Main Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
//           {/* Left - Image Gallery */}
//           <div className="lg:col-span-5">
//             <div className="lg:sticky lg:top-28">
//               {/* Main Image */}
//               <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02]  overflow-hidden p-8 mb-6">
//                 <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5"></div>
//                 <img
//                   src={currentImages[selectedImage] || currentImages[0]}
//                   alt={singleProduct.title}
//                   className="relative w-full h-[400px] lg:h-[500px] object-contain"
//                 />
                
//                 {/* Action Buttons */}
//                 <div className="absolute top-6 right-6 flex gap-3">
//                   <button
//                     onClick={() => setIsWishlisted(!isWishlisted)}
//                     className={`p-3 rounded-xl border backdrop-blur-2xl transition-all ${
//                       isWishlisted 
//                         ? 'bg-gradient-to-r from-pink-500/30 to-rose-500/30 border-pink-500/50' 
//                         : 'bg-black/50 border-white/10 hover:border-white/30'
//                     }`}
//                   >
//                     <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-pink-500 text-pink-500' : ''}`} />
//                   </button>
                  
//                   <div className="relative">
//                     <button
//                       onClick={() => setShowShareMenu(!showShareMenu)}
//                       className="p-3 rounded-xl border border-white/10 bg-black/50 backdrop-blur-2xl hover:border-white/30 transition-all"
//                     >
//                       <Share2 className="w-5 h-5" />
//                     </button>
                    
//                     {showShareMenu && (
//                       <div className="absolute right-0 mt-3 rounded-2xl border border-white/10 bg-black/95 backdrop-blur-3xl p-3 w-48 z-20 shadow-2xl">
//                         {['facebook', 'twitter', 'whatsapp', 'copy'].map((platform) => (
//                           <button
//                             key={platform}
//                             onClick={() => handleShare(platform)}
//                             className="w-full text-left px-4 py-2 hover:bg-white/5 rounded-xl text-sm transition capitalize"
//                           >
//                             {platform === 'copy' ? 'Copy Link' : platform}
//                           </button>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Discount Badge */}
//                 {singleProduct.discount > 0 && (
//                   <div className="absolute top-6 left-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white text-sm font-bold shadow-lg">
//                     <Tag className="w-4 h-4" />
//                     {singleProduct.discount}% OFF
//                   </div>
//                 )}
//               </div>

//               {/* Thumbnails */}
//               {currentImages.length > 1 && (
//                 <div className="flex gap-4 overflow-x-auto pb-2">
//                   {currentImages.map((url, index) => (
//                     <button
//                       key={index}
//                       onClick={() => setSelectedImage(index)}
//                       className={`flex-shrink-0 rounded-2xl border-2 overflow-hidden transition-all ${
//                         selectedImage === index
//                           ? "border-cyan-500 scale-105"
//                           : "border-white/10 hover:border-white/30"
//                       }`}
//                     >
//                       <img
//                         src={url}
//                         alt={`${singleProduct.title} ${index + 1}`}
//                         className="w-20 h-20 object-cover"
//                       />
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Right - Product Details */}
//           <div className="lg:col-span-7 space-y-6">
//             {/* Product Header */}
//             <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-3xl p-6">
//               <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5"></div>
//               <div className="relative">
//                 <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl px-4 py-2 mb-4">
//                   <Crown className="w-4 h-4 text-yellow-400" />
//                   <span className="text-sm font-bold text-gray-300">PREMIUM PRODUCT</span>
//                 </div>
                
//                 <h1 className="text-3xl font-bold mb-4">{singleProduct.title}</h1>
                
//                 <div className="flex items-center gap-4 mb-4">
//                   {reviewStats.total > 0 ? (
//                     <>
//                       <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/30">
//                         <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
//                         <span className="font-bold text-yellow-400">{reviewStats.average}</span>
//                       </div>
//                       <span className="text-gray-400">
//                         {reviewStats.total} Reviews
//                       </span>
//                     </>
//                   ) : (
//                     <span className="text-gray-500">No reviews yet</span>
//                   )}
//                 </div>
                
//                 <div className="flex items-center gap-4 text-sm">
//                   <span className="text-cyan-400 font-semibold">Special Price</span>
//                   <span className="text-gray-500">•</span>
//                   <span className="text-gray-400">Brand: {singleProduct.brand}</span>
//                 </div>
//               </div>
//             </div>

//             {/* Price Card */}
//             <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-3xl p-6">
//               <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5"></div>
//               <div className="relative">
//                 <div className="flex items-baseline gap-4 mb-6">
//                   <span className="text-5xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
//                     ${singleProduct.price}
//                   </span>
//                   <span className="text-2xl text-gray-600 line-through">
//                     ${originalPrice}
//                   </span>
//                   <span className="text-xl font-bold text-cyan-400">
//                     {singleProduct.discount}% off
//                   </span>
//                 </div>

//                 <div className="space-y-4">
//                   <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Available Offers</h3>
//                   {[
//                     { icon: Tag, title: 'Bank Offer', desc: '10% instant discount on HDFC Bank Cards, up to $150' },
//                     { icon: Zap, title: 'Partner Offer', desc: 'Sign-up for ShopSphere Pay & get benefits worth $1000' },
//                     { icon: Star, title: 'Special Price', desc: `Save $${originalPrice - singleProduct.price} with this exclusive deal` }
//                   ].map((offer, i) => (
//                     <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
//                       <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
//                         <offer.icon className="w-5 h-5 text-cyan-400" />
//                       </div>
//                       <div>
//                         <p className="font-semibold text-sm mb-1">{offer.title}</p>
//                         <p className="text-xs text-gray-400">{offer.desc}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Color Selector */}
//             {singleProduct.colors && singleProduct.colors.length > 0 && (
//               <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-3xl p-6">
//                 <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5"></div>
//                 <div className="relative">
//                   <h3 className="text-sm font-bold mb-4">
//                     Select Color: <span className="text-cyan-400">{selectedColor?.name}</span>
//                   </h3>
//                   <div className="flex flex-wrap gap-4">
//                     {singleProduct.colors.map((color, index) => (
//                       <button
//                         key={index}
//                         onClick={() => handleColorChange(color)}
//                         className={`relative w-16 h-16 rounded-xl border-2 transition-all ${
//                           selectedColor?.name === color.name
//                             ? 'border-cyan-500 scale-110 shadow-lg shadow-cyan-500/50'
//                             : 'border-white/20 hover:border-white/40'
//                         }`}
//                         style={{ backgroundColor: color.hex }}
//                       >
//                         {selectedColor?.name === color.name && (
//                           <div className="absolute inset-0 flex items-center justify-center">
//                             <div className="w-6 h-6 rounded-full bg-white/90 flex items-center justify-center">
//                               <span className="text-black text-xs">✓</span>
//                             </div>
//                           </div>
//                         )}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Delivery Info */}
//             <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-3xl p-6">
//               <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5"></div>
//               <div className="relative">
//                 <h3 className="text-sm font-bold mb-4 uppercase tracking-wider text-gray-400">Delivery Options</h3>
                
//                 <div className="flex gap-3 mb-6">
//                   <input
//                     type="text"
//                     placeholder="Enter Pincode"
//                     value={pincode}
//                     onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
//                     className="flex-1 px-4 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none"
//                   />
//                   <button
//                     onClick={checkDelivery}
//                     className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 font-bold hover:opacity-90 transition-all"
//                   >
//                     Check
//                   </button>
//                 </div>

//                 {deliveryDate && (
//                   <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30">
//                     <div className="flex items-center gap-3 text-emerald-400 mb-2">
//                       <Truck className="w-5 h-5" />
//                       <span className="font-semibold">
//                         Delivery by {deliveryDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
//                       </span>
//                     </div>
//                     <p className="text-xs text-gray-400 ml-8">Free delivery on orders above $50</p>
//                   </div>
//                 )}

//                 <div className="space-y-4">
//                   {[
//                     { icon: Truck, title: 'Free Express Delivery', desc: 'On orders over $50' },
//                     { icon: RotateCcw, title: '7 Days Easy Return', desc: 'Hassle-free returns' },
//                     { icon: Shield, title: 'Premium Warranty', desc: 'Covered under warranty' }
//                   ].map((service, i) => (
//                     <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/10">
//                       <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center">
//                         <service.icon className="w-6 h-6 text-cyan-400" />
//                       </div>
//                       <div>
//                         <p className="font-semibold text-sm">{service.title}</p>
//                         <p className="text-xs text-gray-400">{service.desc}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Description */}
//             <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-3xl p-6">
//               <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5"></div>
//               <div className="relative">
//                 <h3 className="text-lg font-bold mb-4">Product Description</h3>
//                 <p className="text-gray-400 leading-relaxed mb-6">{singleProduct.description}</p>
                
//                 <h3 className="text-lg font-bold mb-4">Specifications</h3>
//                 <div className="space-y-3">
//                   {[
//                     { label: 'Brand', value: singleProduct.brand },
//                     { label: 'Category', value: singleProduct.category?.name || singleProduct.category },
//                     { label: 'Availability', value: 'In Stock' }
//                   ].map((spec, i) => (
//                     <div key={i} className="flex border-b border-white/10 pb-3">
//                       <span className="text-gray-500 w-1/3">{spec.label}</span>
//                       <span className="font-semibold w-2/3">{spec.value}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Action Buttons - Desktop */}
//             <div className="hidden lg:flex gap-4">
//               <button
//                 onClick={handleAddToCart}
//                 className="flex-1 relative overflow-hidden group rounded-2xl"
//               >
//                 <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600"></div>
//                 <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
//                 <span className="relative flex items-center justify-center gap-3 py-4 text-white font-bold">
//                   <ShoppingBag className="w-5 h-5" />
//                   ADD TO CART
//                 </span>
//               </button>
//               <button
//                 onClick={handleBuyNow}
//                 className="flex-1 rounded-2xl border border-white/20 bg-white text-black font-bold py-4 hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
//               >
//                 <Zap className="w-5 h-5" />
//                 BUY NOW
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Related Products */}
//         {relatedProducts && relatedProducts.length > 0 && (
//           <div className="mt-16">
//             <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-3xl p-8">
//               <h2 className="text-2xl font-bold mb-6">Similar Products</h2>
//               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                 {relatedProducts.map((product) => (
//                   <div
//                     key={product._id}
//                     onClick={() => navigate(`/products/${product._id}`)}
//                     className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden hover:border-cyan-500/30 hover:scale-[1.02] transition-all cursor-pointer"
//                   >
//                     <div className="relative h-48 bg-gradient-to-br from-white/5 to-transparent p-4">
//                       <img
//                         src={Array.isArray(product.images) ? product.images[0] : product.images}
//                         alt={product.title}
//                         className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
//                       />
//                       {product.discount > 0 && (
//                         <div className="absolute top-2 left-2 px-2 py-1 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs font-bold">
//                           {product.discount}% OFF
//                         </div>
//                       )}
//                     </div>
//                     <div className="p-4">
//                       <h3 className="text-sm font-semibold line-clamp-2 mb-2 h-10">{product.title}</h3>
//                       <div className="flex items-center gap-2">
//                         <span className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
//                           ${product.price}
//                         </span>
//                         <span className="text-xs text-gray-600 line-through">
//                           ${Math.round(product.price * 1.2)}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}
//         <ProductReviews
//            productId={id} 
//            productTitle={singleProduct.title}
//           currentUser={user} 
//         />

//         {/* Mobile Action Buttons */}
//         <div className="lg:hidden fixed bottom-0 left-0 right-0 border-t border-white/10 bg-black/95 backdrop-blur-3xl p-4 flex gap-3 z-50">
//           <button
//             onClick={handleAddToCart}
//             className="flex-1 relative overflow-hidden group rounded-xl"
//           >
//             <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600"></div>
//             <span className="relative flex items-center justify-center gap-2 py-3 text-white font-bold">
//               <ShoppingBag className="w-5 h-5" />
//               ADD
//             </span>
//           </button>
//           <button
//             onClick={handleBuyNow}
//             className="flex-1 rounded-xl bg-white text-black font-bold py-3 flex items-center justify-center gap-2"
//           >
//             <Zap className="w-5 h-5" />
//             BUY NOW
//           </button>
//         </div>
//       </div>
//     </div>
//     {/* <ProductReviews/> */}
//     </>
//   );
// };

// export default SingleProduct;



