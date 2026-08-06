// hooks/useDiscounts.jsx
import { useState, useCallback, useEffect, useMemo } from "react";
import { useUser } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import { api } from "../../../../context/DataContext";

const POINT_VALUE = 1; // 1 point = ₹1

export const useDiscounts = (basePricing) => {
  const { user } = useUser();
  const [mongoUserId, setMongoUserId] = useState(null);
  const [rewardPoints, setRewardPoints] = useState(0);
  const [coupon, setCoupon] = useState(null); // { code, discount }
  const [pointsUsed, setPointsUsed] = useState(0);
  const [validating, setValidating] = useState(false);

  // Load mongo user + reward points
  useEffect(() => {
    if (!user?.id) return;
    let mounted = true;

    const load = async () => {
      try {
        const mongoRes = await api.get(`/users/clerk/${user.id}`);
        if (mounted) setMongoUserId(mongoRes.data?.id || mongoRes.data?._id || null);
      } catch (error) {
        console.error("Error fetching mongo user:", error);
      }

      try {
        const rewardsRes = await api.get(`/api/users/${user.id}/rewards`);
        if (mounted) setRewardPoints(rewardsRes.data?.rewardPoints || 0);
      } catch (error) {
        console.error("Error fetching rewards:", error);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, [user?.id]);

  const applyCoupon = useCallback(
    async (code) => {
      const trimmed = (code || "").trim();
      if (!trimmed) {
        toast.error("Please enter a coupon code");
        return false;
      }
      setValidating(true);
      try {
        const res = await api.post("/api/coupons/validate", {
          code: trimmed,
          amount: basePricing?.grandTotal || 0,
        });
        if (res.data?.valid) {
          setCoupon({ code: res.data.code, discount: res.data.discount });
          toast.success(`Coupon applied! You saved ${formatINRish(res.data.discount)}`);
          return true;
        }
        toast.error(res.data?.message || "Invalid coupon code");
        return false;
      } catch (error) {
        toast.error(error.response?.data?.message || "Invalid coupon code");
        return false;
      } finally {
        setValidating(false);
      }
    },
    [basePricing?.grandTotal]
  );

  const removeCoupon = useCallback(() => {
    setCoupon(null);
  }, []);

  const couponDiscount = coupon?.discount || 0;

  const pointsDiscount = useMemo(() => {
    const maxUsable = Math.min(rewardPoints, basePricing?.grandTotal || 0);
    return Math.min(pointsUsed, maxUsable) * POINT_VALUE;
  }, [pointsUsed, rewardPoints, basePricing?.grandTotal]);

  const handlePointsChange = useCallback(
    (value) => {
      const maxUsable = Math.min(rewardPoints, basePricing?.grandTotal || 0);
      const parsed = Math.max(0, Math.min(parseInt(value || "0", 10) || 0, maxUsable));
      setPointsUsed(parsed);
    },
    [rewardPoints, basePricing?.grandTotal]
  );

  const totalDiscount = couponDiscount + pointsDiscount;

  const effectivePricing = useMemo(() => {
    const subtotal = basePricing?.subtotal || 0;
    const deliveryFee = basePricing?.deliveryFee || 0;
    const handlingFee = basePricing?.handlingFee || 0;
    const grandTotal = Math.max(
      0,
      subtotal + deliveryFee + handlingFee - totalDiscount
    );
    return { subtotal, deliveryFee, handlingFee, discount: totalDiscount, grandTotal };
  }, [basePricing, totalDiscount]);

  return {
    mongoUserId,
    rewardPoints,
    coupon,
    couponDiscount,
    pointsUsed,
    pointsDiscount,
    totalDiscount,
    effectivePricing,
    validating,
    applyCoupon,
    removeCoupon,
    handlePointsChange,
  };
};

const formatINRish = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
