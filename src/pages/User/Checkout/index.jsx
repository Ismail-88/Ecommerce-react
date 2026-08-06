// pages/Checkout.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ShoppingBag, ShieldCheck } from "lucide-react";
import toast from 'react-hot-toast';

// Components
import PaymentMethodSelector from "./components/PaymentMethodSelector";
import OrderSummary from "./components/OrderSummary";
import DiscountPanel from "./components/DiscountPanel";
import { useCheckout } from "./hooks/useCheckout";
import { useRazorpay } from "./hooks/useRazorpay";
import { useDiscounts } from "./hooks/useDiscounts";
import ShippingForm from "./components/ShippingForm";
import EmptyState from "../../../components/ui/EmptyState";
import Button from "../../../components/ui/Button";
import PageHeader from "../../../components/ui/PageHeader";

// Zod validation schema
const checkoutSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits").regex(/^[0-9+\-\s()]+$/, "Invalid phone number format"),
  address: z.string().min(10, "Address must be at least 10 characters"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zipCode: z.string().min(4, "Valid zip code is required"),
  country: z.string().min(2, "Country is required"),
  paymentMethod: z.enum(["razorpay", "cod"], {
    required_error: "Please select a payment method",
  }),
});

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItem, user, pricing } = useCheckout();
  const { initiatePayment, createCODOrder, isLoading } = useRazorpay();
  const {
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
  } = useDiscounts(pricing);
  const [isProcessing, setIsProcessing] = useState(false);

  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: "",
      email: "",
      paymentMethod: "razorpay",
    },
  });

  // Populate when user loads
  useEffect(() => {
    if (user) {
      reset({
        fullName: user.fullName || "",
        email: user.primaryEmailAddress?.emailAddress || user.emailAddresses?.[0]?.emailAddress || "",
        paymentMethod: "razorpay",
      });
    }
  }, [user, reset]);

  const paymentMethod = watch("paymentMethod");

  // Merge backend response with locally submitted order so the
  // confirmation page always has complete data (shippingInfo, items, pricing).
  const finalizeOrder = (order, orderData, paymentMethod) => {
    const fullOrder = {
      ...(order || {}),
      orderId: order?.orderId || order?._id || orderData.orderId,
      shippingInfo: order?.shippingInfo || orderData.shippingInfo,
      pricing: order?.pricing || orderData.pricing,
      items: order?.items || orderData.items,
      orderDate: order?.orderDate || new Date().toISOString(),
      paymentMethod: order?.paymentMethod || paymentMethod,
      status: order?.status || "pending",
    };
    navigate("/order-confirmation", { state: { orderData: fullOrder } });
  };

  // Handle form submission
  const onSubmit = async (formData) => {
    setIsProcessing(true);

    try {
      // Prepare order data
      const orderData = {
        userId: user?.id || 'guest',
        mongoUserId: mongoUserId || undefined,
        couponCode: coupon?.code || undefined,
        pointsUsed: pointsUsed || 0,
        items: cartItem.map(item => ({
          _id: item._id,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
          images: item.images || []
        })),
        shippingInfo: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country
        },
        pricing: {
          subtotal: effectivePricing.subtotal,
          deliveryFee: effectivePricing.deliveryFee,
          handlingFee: effectivePricing.handlingFee,
          discount: effectivePricing.discount,
          grandTotal: effectivePricing.grandTotal
        }
      };

      if (formData.paymentMethod === 'razorpay') {
        // Razorpay Payment
        await initiatePayment({
          amount: effectivePricing.grandTotal,
          orderData: orderData,
          customerDetails: {
            name: formData.fullName,
            email: formData.email,
            phone: formData.phone
          },
          onSuccess: (order) => {
            toast.success('Payment successful! 🎉');
            // Clear cart here if you have cart context
            finalizeOrder(order, orderData, formData.paymentMethod);
          },
          onFailure: (error) => {
            toast.error(error.message || 'Payment failed. Please try again.');
            setIsProcessing(false);
          }
        });
      } else if (formData.paymentMethod === 'cod') {
        // Cash on Delivery
        await createCODOrder(
          orderData,
          (order) => {
            toast.success('Order placed successfully! 🎉');
            // Clear cart here if you have cart context
            finalizeOrder(order, orderData, formData.paymentMethod);
          },
          (error) => {
            toast.error(error.message || 'Failed to place order. Please try again.');
            setIsProcessing(false);
          }
        );
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Something went wrong. Please try again.');
      setIsProcessing(false);
    }
  };

  // Empty cart state
  if (cartItem.length === 0) {
    return (
      <div className="min-h-[70vh] bg-background flex items-center justify-center px-4">
        <EmptyState
          icon={ShoppingBag}
          title="Your Cart is Empty"
          description="Add items to your cart before checkout."
          action={
            <Button size="lg" onClick={() => navigate("/products")}>
              Continue Shopping
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen text-foreground">
      {/* Header */}
      <div className="border-b border-border bg-surface-alt">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
          <PageHeader
            icon={ShieldCheck}
            title="Secure Checkout"
            description="Just a few steps away from completing your order."
          />
        </div>
      </div>

      {/* Checkout Form */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Section - Forms */}
            <div className="lg:col-span-2 space-y-6">
              <ShippingForm register={register} errors={errors} />
              <PaymentMethodSelector
                register={register}
                errors={errors}
                paymentMethod={paymentMethod}
              />
            </div>

            {/* Right Section - Order Summary */}
            <div className="lg:col-span-1 space-y-6">
              <DiscountPanel
                rewardPoints={rewardPoints}
                coupon={coupon}
                couponDiscount={couponDiscount}
                pointsUsed={pointsUsed}
                pointsDiscount={pointsDiscount}
                totalDiscount={totalDiscount}
                validating={validating}
                onApplyCoupon={applyCoupon}
                onRemoveCoupon={removeCoupon}
                onPointsChange={handlePointsChange}
              />
              <OrderSummary
                cartItem={cartItem}
                pricing={effectivePricing}
                isSubmitting={isProcessing || isLoading}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;