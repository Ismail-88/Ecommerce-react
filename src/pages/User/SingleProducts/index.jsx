// pages/SingleProduct.jsx
import React, { useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingBag, Zap } from 'lucide-react';
// import { useCart } from '../.././context/CartContext';
import { useUser } from '@clerk/clerk-react';
import { useCart } from '../../../context/CartContext';
import { useSingleProduct } from './hooks/useSingleProduct';
import { useShare } from './hooks/useShare';
import Loading from '../../../assets/Loading4.webm'
import ProductImageGallery from './components/SingleProduct/ProductImageGallery';
import ProductHeader from './components/SingleProduct/ProductHeader';
import PriceCard from './components/SingleProduct/PriceCard';
import ColorSelector from './components/SingleProduct/ColorSelector';
import DeliveryInfo from './components/SingleProduct/DeliveryInfo';
import ProductDescription from './components/SingleProduct/ProductDescription';
import RelatedProducts from './components/SingleProduct/RelatedProducts';
import ProductReviews from './components/review/ProductReviews';

const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useUser();

  // Custom hooks
  const {
    singleProduct,
    selectedColor,
    currentImages,
    selectedImage,
    setSelectedImage,
    quantity,
    isWishlisted,
    setIsWishlisted,
    reviewStats,
    handleColorChange,
    pricing,
    relatedProducts
  } = useSingleProduct(id);

  const { showShareMenu, setShowShareMenu, handleShare } = useShare(singleProduct);

  // Cart handlers
  const handleAddToCart = useCallback(() => {
    const productWithQuantity = {
      ...singleProduct,
      quantity: quantity,
      selectedColor: selectedColor?.name || 'Default',
    };
    addToCart(productWithQuantity);
  }, [singleProduct, quantity, selectedColor, addToCart]);

  const handleBuyNow = useCallback(() => {
    handleAddToCart();
    navigate('/cart');
  }, [handleAddToCart, navigate]);

  // Loading state
  if (!singleProduct) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <video muted autoPlay loop className="w-40 h-40">
          <source src={Loading} type="video/webm" />
        </video>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          {/* Breadcrumb */}
          <div className="text-sm text-gray-500 mb-6">
            <span className="hover:text-cyan-400 cursor-pointer transition">Home</span>
            <span className="mx-2">›</span>
            <span className="hover:text-cyan-400 cursor-pointer transition">
              {singleProduct.category?.name || singleProduct.category}
            </span>
            <span className="mx-2">›</span>
            <span className="text-gray-400">{singleProduct.title}</span>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left - Image Gallery */}
            <div className="lg:col-span-5">
              <ProductImageGallery
                currentImages={currentImages}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                productTitle={singleProduct.title}
                discount={singleProduct.discount}
                isWishlisted={isWishlisted}
                setIsWishlisted={setIsWishlisted}
                showShareMenu={showShareMenu}
                setShowShareMenu={setShowShareMenu}
                handleShare={handleShare}
              />
            </div>

            {/* Right - Product Details */}
            <div className="lg:col-span-7 space-y-6">
              <ProductHeader
                title={singleProduct.title}
                brand={singleProduct.brand}
                category={singleProduct.category}
                reviewStats={reviewStats}
              />

              <PriceCard
                price={singleProduct.price}
                originalPrice={pricing.originalPrice}
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
                brand={singleProduct.brand}
                category={singleProduct.category}
              />

              {/* Action Buttons - Desktop */}
              <div className="hidden lg:flex gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 relative overflow-hidden group rounded-2xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span className="relative flex items-center justify-center gap-3 py-4 text-white font-bold">
                    <ShoppingBag className="w-5 h-5" />
                    ADD TO CART
                  </span>
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 rounded-2xl border border-white/20 bg-white text-black font-bold py-4 hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
                >
                  <Zap className="w-5 h-5" />
                  BUY NOW
                </button>
              </div>
            </div>
          </div>

          {/* Related Products */}
          <RelatedProducts products={relatedProducts} />

          {/* Reviews */}
          <ProductReviews
            productId={id}
            productTitle={singleProduct.title}
            currentUser={user}
          />

          {/* Mobile Action Buttons */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 border-t border-white/10 bg-black/95 backdrop-blur-3xl p-4 flex gap-3 z-50">
            <button
              onClick={handleAddToCart}
              className="flex-1 relative overflow-hidden group rounded-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600"></div>
              <span className="relative flex items-center justify-center gap-2 py-3 text-white font-bold">
                <ShoppingBag className="w-5 h-5" />
                ADD
              </span>
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 rounded-xl bg-white text-black font-bold py-3 flex items-center justify-center gap-2"
            >
              <Zap className="w-5 h-5" />
              BUY NOW
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;