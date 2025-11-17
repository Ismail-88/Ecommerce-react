import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FaCreditCard, FaPaypal, FaMoneyBillWave } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
import { getData } from "../../context/DataContext"; // <-- import context
import axios from "axios";

// Zod validation schema
const checkoutSchema = z.object({
  // Shipping Information
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[0-9+\-\s()]+$/, "Invalid phone number format"),
  address: z.string().min(10, "Address must be at least 10 characters"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zipCode: z.string().min(4, "Valid zip code is required"),
  country: z.string().min(2, "Country is required"),

  // Payment Information
  paymentMethod: z.enum(["card", "paypal", "cod"], {
    required_error: "Please select a payment method",
  }),
  
  // Card Details (conditional - only if payment method is card)
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
  const { cartItem } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState("card");
 const { fetchOrdersByUser } = getData(); // Context function
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: user?.fullName || "",
      email: user?.primaryEmailAddress?.emailAddress || "",
      paymentMethod: "card",
    },
  });

  const paymentMethod = watch("paymentMethod");

  // Calculate totals
  const subtotal = cartItem.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const deliveryFee = 0; // Free delivery
  const handlingFee = 5;
  const grandTotal = subtotal + deliveryFee + handlingFee;

  // Form submission
  const onSubmit = async (data) => {

   const mongoUserRes = await axios.get(`http://localhost:5000/users/clerk/${user.id}`);
    const mongoUser = mongoUserRes.data;

      if (!mongoUser) {
        console.error("Mongo user not found");
        return;
      }
    const orderData = {
      userId: mongoUser.id,
      orderId: `ORD-${Date.now()}`,
      items: cartItem,
      
      shippingInfo: {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        country: data.country,
      },
      paymentMethod: data.paymentMethod,
      pricing: {
        subtotal,
        deliveryFee,
        handlingFee,
        grandTotal,
      },
      orderDate: new Date().toISOString(),
      status: "Pending",
    };

   try {
  const res = await axios.post("http://localhost:5000/orders", orderData);
  console.log("Order placed:", res.data);
  navigate("/order-confirmation", { state: { orderData } });
} catch (err) {
  console.error("Error placing order:", err);
}
  };
    

 // Save to localStorage or send to backend
    // localStorage.setItem("lastOrder", JSON.stringify(orderData));

    // Navigate to order confirmation
    // navigate("/order-confirmation", { state: { orderData } });
  if (cartItem.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[600px] px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Your cart is empty
        </h1>
        <p className="text-gray-600 mb-6">
          Add items to your cart before checkout
        </p>
        <button
          onClick={() => navigate("/products")}
          className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 transition cursor-pointer"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 mb-10">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Information */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <MdLocalShipping className="text-2xl text-red-500" />
                <h2 className="text-xl font-semibold">Shipping Information</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    {...register("fullName")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="John Doe"
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    {...register("phone")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="+1 234 567 8900"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    {...register("address")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="123 Main Street, Apt 4B"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.address.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    {...register("city")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="New York"
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.city.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State *
                  </label>
                  <input
                    type="text"
                    {...register("state")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="NY"
                  />
                  {errors.state && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.state.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Zip Code *
                  </label>
                  <input
                    type="text"
                    {...register("zipCode")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="10001"
                  />
                  {errors.zipCode && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.zipCode.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country *
                  </label>
                  <input
                    type="text"
                    {...register("country")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="United States"
                  />
                  {errors.country && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.country.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-6">Payment Method</h2>

              <div className="space-y-4">
                {/* Credit Card */}
                <label
                  className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition ${
                    paymentMethod === "card"
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    value="card"
                    {...register("paymentMethod")}
                    className="w-5 h-5 text-red-500"
                  />
                  <FaCreditCard className="text-2xl text-gray-700" />
                  <span className="font-medium">Credit/Debit Card</span>
                </label>

                {/* Card Details Form */}
                {paymentMethod === "card" && (
                  <div className="pl-12 space-y-4 animate-fadeIn">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Card Number *
                      </label>
                      <input
                        type="text"
                        {...register("cardNumber")}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                      />
                      {errors.cardNumber && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.cardNumber.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cardholder Name *
                      </label>
                      <input
                        type="text"
                        {...register("cardName")}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="John Doe"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expiry Date *
                        </label>
                        <input
                          type="text"
                          {...register("expiryDate")}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="MM/YY"
                          maxLength="5"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVV *
                        </label>
                        <input
                          type="text"
                          {...register("cvv")}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="123"
                          maxLength="3"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* PayPal */}
                <label
                  className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition ${
                    paymentMethod === "paypal"
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    value="paypal"
                    {...register("paymentMethod")}
                    className="w-5 h-5 text-red-500"
                  />
                  <FaPaypal className="text-2xl text-blue-600" />
                  <span className="font-medium">PayPal</span>
                </label>

                {/* Cash on Delivery */}
                <label
                  className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition ${
                    paymentMethod === "cod"
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    value="cod"
                    {...register("paymentMethod")}
                    className="w-5 h-5 text-red-500"
                  />
                  <FaMoneyBillWave className="text-2xl text-green-600" />
                  <span className="font-medium">Cash on Delivery</span>
                </label>
              </div>

              {errors.paymentMethod && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.paymentMethod.message}
                </p>
              )}
            </div>
          </div>

          {/* Right Section - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm sticky top-4">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

              {/* Items List */}
              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto">
                {cartItem.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h3 className="text-sm font-medium line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-sm font-semibold text-red-500">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <hr className="my-4" />

              {/* Price Breakdown */}
              <div className="space-y-3">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Delivery Fee</span>
                  <span className="text-red-500 font-semibold">
                    <span className="line-through text-gray-400">$25</span> FREE
                  </span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Handling Fee</span>
                  <span>${handlingFee.toFixed(2)}</span>
                </div>

                <hr className="my-4" />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                type="submit"
                className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-md mt-6 transition cursor-pointer"
              >
                Place Order
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                By placing your order, you agree to our terms and conditions
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;