// pages/User/Wishlist/index.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { useWishlist } from "../../../context/WishlistContext";
import { useCart } from "../../../context/CartContext";

import ProductCard from "../Products/components/ProductCard";
import PageHeader from "../../../components/ui/PageHeader";
import EmptyState from "../../../components/ui/EmptyState";
import Button from "../../../components/ui/Button";

const Wishlist = () => {
  const navigate = useNavigate();
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div className="min-h-screen text-foreground">
      <div className="border-b border-border bg-surface-alt">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <PageHeader
              icon={Heart}
              title="My Wishlist"
              description={`${wishlist.length} item${wishlist.length === 1 ? "" : "s"} saved for later`}
            />
            {wishlist.length > 0 && (
              <Button variant="outline" onClick={() => navigate("/products")}>
                Continue Shopping
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        {wishlist.length === 0 ? (
          <EmptyState
            icon={Heart}
            title="Your wishlist is empty"
            description="Tap the heart icon on any product to save it here for later."
            action={
              <Button size="lg" onClick={() => navigate("/products")}>
                Explore Products
              </Button>
            }
          />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {wishlist.map((product) => (
              <ProductCard key={product._id} product={product} viewMode="grid" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
