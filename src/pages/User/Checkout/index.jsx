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
import { useCheckout } from "./hooks/useCheckout";
import { useRazorpay } from "./hooks/useRazorpay";
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

  // Handle form submission
  const onSubmit = async (formData) => {
    setIsProcessing(true);

    try {
      // Prepare order data
      const orderData = {
        userId: user?.id || 'guest',
        items: cartItem.map(item => ({
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
          subtotal: pricing.subtotal,
          deliveryFee: pricing.deliveryFee,
          handlingFee: pricing.handlingFee,
          grandTotal: pricing.grandTotal
        }
      };

      if (formData.paymentMethod === 'razorpay') {
        // Razorpay Payment
        await initiatePayment({
          amount: pricing.grandTotal,
          orderData: orderData,
          customerDetails: {
            name: formData.fullName,
            email: formData.email,
            phone: formData.phone
          },
          onSuccess: (order) => {
            toast.success('Payment successful! 🎉');
            // Clear cart here if you have cart context
            navigate(`/order-success?orderId=${order.id}`);
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
            navigate(`/order-success?orderId=${order.id}`);
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
    <div className="min-h-screen bg-background text-foreground">
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
            <OrderSummary
              cartItem={cartItem}
              pricing={pricing}
              isSubmitting={isProcessing || isLoading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;