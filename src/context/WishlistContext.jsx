// context/WishlistContext.jsx
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

const WishlistContext = createContext(null);

const STORAGE_KEY = "shopsphere_wishlist";

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist));
    } catch {
      // storage full / unavailable — ignore
    }
  }, [wishlist]);

  const toggleWishlist = (product) => {
    if (!product?._id) return;
    setWishlist((prev) => {
      const exists = prev.some((item) => item._id === product._id);
      if (exists) {
        toast.info("Removed from wishlist");
        return prev.filter((item) => item._id !== product._id);
      }
      toast.success("Added to wishlist");
      return [product, ...prev];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter((item) => item._id !== productId));
  };

  const isWishlisted = (productId) => wishlist.some((item) => item._id === productId);

  const value = useMemo(
    () => ({
      wishlist,
      wishlistCount: wishlist.length,
      toggleWishlist,
      removeFromWishlist,
      isWishlisted,
    }),
    [wishlist]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
};
