// pages/Checkout.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ShoppingBag, Crown, Sparkles } from "lucide-react";

// Components
import PaymentMethodSelector from "./components/PaymentMethodSelector";
import OrderSummary from "./components/OrderSummary";
import { useCheckout } from "./hooks/useCheckout";
import ShippingForm from "./components/ShippingForm";

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
  paymentMethod: z.enum(["card", "paypal", "cod"], {
    required_error: "Please select a payment method",
  }),
  cardNumber: z.string().optional(),
  cardName: z.string().optional(),
  expiryDate: z.string().optional(),
  cvv: z.string().optional(),
}).refine(
  (data) => {
    if (data.paymentMethod === "card") {
      return (
        data.cardNumber &&
        data.cardNumber.replace(/\s/g, "").length === 16 &&
        data.cardName &&
        data.cardName.length >= 3 &&
        data.expiryDate &&
        /^\d{2}\/\d{2}$/.test(data.expiryDate) &&
        data.cvv &&
        data.cvv.length === 3
      );
    }
    return true;
  },
  {
    message: "Please fill in all card details correctly",
    path: ["cardNumber"],
  }
);

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItem, user, pricing, isSubmitting, submitOrder } = useCheckout();

 const { register, handleSubmit, formState: { errors }, watch, reset } = useForm({
  resolver: zodResolver(checkoutSchema),
  defaultValues: {
    fullName: "",
    email: "",
    paymentMethod: "card",
  },
});

// populate when user loads
useEffect(() => {
  if (user) {
    reset({
      fullName: user.fullName || "",
      email: user.primaryEmailAddress?.emailAddress || user.emailAddresses?.[0]?.emailAddress || "",
      paymentMethod: "card",
    });
  }
}, [user, reset]);

  const paymentMethod = watch("paymentMethod");

  // Empty cart state
  if (cartItem.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <div className="text-center">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 rounded-full blur-3xl"></div>
            <ShoppingBag className="relative w-32 h-32 text-gray-600" />
          </div>
          <h1 className="text-4xl font-black mb-4">Your Cart is Empty</h1>
          <p className="text-gray-400 text-lg mb-8">
            Add items to your cart before checkout
          </p>
          <button
            onClick={() => navigate("/products")}
            className="group relative overflow-hidden rounded-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="relative block px-8 py-4 text-white font-bold">
              Continue Shopping
            </span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Premium Header */}
      <div className="relative py-16 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.05),transparent_70%)]"></div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-2xl px-5 py-2 mb-6">
            <Crown className="w-5 h-5 text-yellow-400 animate-pulse" />
            <span className="text-sm font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              SECURE CHECKOUT
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-4">
            <span className="block mb-2">Complete Your</span>
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Premium Order
            </span>
          </h1>
          <p className="text-gray-400 text-xl">
            Just a few steps away from luxury
          </p>
        </div>
      </div>

      {/* Checkout Form */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <form onSubmit={handleSubmit(submitOrder)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Section - Forms */}
            <div className="lg:col-span-2 space-y-8">
              <ShippingForm register={register} errors={errors} />
              <PaymentMethodSelector 
                register={register} 
                errors={errors} 
                paymentMethod={paymentMethod} 
              />
            </div>

            {/* Right Section - Order Summary */}
            <OrderSummary 
              cartItem={cartItem} 
              pricing={pricing} 
              isSubmitting={isSubmitting}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;