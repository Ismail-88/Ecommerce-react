import React, { useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShoppingBag, Zap } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { useCart } from "../../../context/CartContext";
import { useSingleProduct } from "./hooks/useSingleProduct";
import { useShare } from "./hooks/useShare";
import ProductImageGallery from "./components/SingleProduct/ProductImageGallery";
import ProductHeader from "./components/SingleProduct/ProductHeader";
import PurchasePanel from "./components/SingleProduct/PurchasePanel";
import ColorSelector from "./components/SingleProduct/ColorSelector";
import QuantitySelector from "./components/SingleProduct/QuantitySelector";
import DeliveryInfo from "./components/SingleProduct/DeliveryInfo";
import TrustBadges from "./components/SingleProduct/TrustBadges";
import ProductDescription from "./components/SingleProduct/ProductDescription";
import RelatedProducts from "./components/SingleProduct/RelatedProducts";
import ProductReviews from "./components/review/ProductReviews";
import BreadCrumbs from "../../../components/BreadCrumbs";
import Button from "../../../components/ui/Button";
import { FullPageSpinner } from "../../../components/ui/Spinner";
import { formatINR } from "../../../utils/formatCurrency";

const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useUser();

  const {
    singleProduct,
    selectedColor,
    currentImages,
    selectedImage,
    setSelectedImage,
    quantity,
    setQuantity,
    isWishlisted,
    setIsWishlisted,
    reviewStats,
    handleColorChange,
    pricing,
    relatedProducts,
  } = useSingleProduct(id);

  const { showShareMenu, setShowShareMenu, handleShare } = useShare(singleProduct);

  const handleAddToCart = useCallback(() => {
    const productWithQuantity = {
      ...singleProduct,
      quantity,
      selectedColor: selectedColor?.name || "Default",
    };
    addToCart(productWithQuantity);
  }, [singleProduct, quantity, selectedColor, addToCart]);

  const handleBuyNow = useCallback(() => {
    handleAddToCart();
    navigate("/cart");
  }, [handleAddToCart, navigate]);

  if (!singleProduct) {
    return (
      <div className="min-h-[60vh] bg-background flex items-center justify-center">
        <FullPageSpinner />
      </div>
    );
  }

  const cartButton = (
    <Button
      onClick={handleAddToCart}
      size="lg"
      disabled={singleProduct.stock === 0}
      className="w-full justify-center"
    >
      <ShoppingBag size={18} aria-hidden />
      Add to Cart
    </Button>
  );

  const buyNowButton = (
    <Button
      onClick={handleBuyNow}
      size="lg"
      variant="secondary"
      disabled={singleProduct.stock === 0}
      className="w-full justify-center"
    >
      <Zap size={18} aria-hidden />
      Buy Now
    </Button>
  );

  return (
    <div className="min-h-screen bg-background text-foreground pb-44 lg:pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <BreadCrumbs
          title={singleProduct.title}
          parent={singleProduct.category?.name || singleProduct.category}
          parentPath="/products"
        />

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

          {/* Middle - Product Details */}
          <div className="lg:col-span-4 space-y-5">
            <ProductHeader
              title={singleProduct.title}
              brand={singleProduct.brand}
              category={singleProduct.category}
              reviewStats={reviewStats}
              stock={singleProduct.stock}
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
              stock={singleProduct.stock}
              discount={singleProduct.discount}
            />
          </div>

          {/* Right - Sticky Purchase Panel */}
          <div className="lg:col-span-3">
            <PurchasePanel
              product={singleProduct}
              pricing={pricing}
              quantity={quantity}
              setQuantity={setQuantity}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
            />
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 lg:hidden">
          <TrustBadges />
        </div>

        {/* Related Products */}
        <RelatedProducts products={relatedProducts} />

        {/* Reviews */}
        <div id="reviews" className="scroll-mt-28">
          <ProductReviews productId={id} productTitle={singleProduct.title} currentUser={user} />
        </div>

        {/* Mobile Action Buttons */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 border-t border-border bg-background/95 backdrop-blur-xl p-4 z-50 animate-slide-down">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-1.5">
                Quantity
              </p>
              <QuantitySelector
                quantity={quantity}
                setQuantity={setQuantity}
                max={Math.max(1, singleProduct.stock || 10)}
              />
            </div>
            <div className="text-right">
              <p className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-1">
                Total
              </p>
              <p className="font-extrabold text-foreground text-xl">{formatINR(singleProduct.price * quantity)}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {cartButton}
            {buyNowButton}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
