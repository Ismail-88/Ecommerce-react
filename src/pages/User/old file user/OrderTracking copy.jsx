import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  FaBox,
  FaShippingFast,
  FaTruck,
  FaCheckCircle,
  FaSearch,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
import { getData } from "../../context/DataContext";

// Zod validation for order tracking
const trackingSchema = z.object({
  orderId: z
    .string()
    .min(10, "Order ID must be at least 10 characters")
    .regex(/^ORD-/, "Order ID must start with 'ORD-'"),
  email: z.string().email("Invalid email address").optional(),
});

const OrderTracking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);
  const [trackingStatus, setTrackingStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const {fetchOrderById}= getData()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(trackingSchema),
  });

  // If coming from order confirmation, auto-fill order ID
  useEffect(() => {
    if (location.state?.orderId) {
      setValue("orderId", location.state.orderId);
      handleTrackOrder({ orderId: location.state.orderId });
    }
  }, [location.state]);

  // Tracking statuses with dates
  const getTrackingStatuses = (orderDate) => {
    const date = new Date(orderDate);
    
    return [
      {
        id: 1,
        status: "Order Placed",
        description: "Your order has been received and confirmed",
        icon: <FaBox />,
        date: new Date(date),
        completed: true,
      },
      {
        id: 2,
        status: "Processing",
        description: "Your order is being prepared for shipment",
        icon: <FaShippingFast />,
        date: new Date(date.getTime() + 1 * 24 * 60 * 60 * 1000), // +1 day
        completed: true,
      },
      {
        id: 3,
        status: "Shipped",
        description: "Your order is on the way",
        icon: <FaTruck />,
        date: new Date(date.getTime() + 2 * 24 * 60 * 60 * 1000), // +2 days
        completed: true,
      },
      {
        id: 4,
        status: "Out for Delivery",
        description: "Your order is out for delivery",
        icon: <MdLocalShipping />,
        date: new Date(date.getTime() + 5 * 24 * 60 * 60 * 1000), // +5 days
        completed: false,
      },
      {
        id: 5,
        status: "Delivered",
        description: "Your order has been delivered",
        icon: <FaCheckCircle />,
        date: new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000), // +7 days
        completed: false,
      },
    ];
  };



const handleTrackOrder = async (data) => {
  setLoading(true);
  try {
    const order = await fetchOrderById(data.orderId);

    if (order) {
      setOrderData(order);
      setTrackingStatus(getTrackingStatuses(order.orderDate));
    } else {
      setOrderData(null);
      setTrackingStatus(null);
      alert("Order not found! Please check your Order ID.");
    }
  } catch (error) {
    setOrderData(null);
    setTrackingStatus(null);
    alert("Order not found! Please check your Order ID.");
  } finally {
    setLoading(false);
  }
};

  const onSubmit = (data) => {
    handleTrackOrder(data);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 mb-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Track Your Order</h1>

      {/* Search Form */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-8 max-w-2xl mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Order ID *
            </label>
            <input
              type="text"
              {...register("orderId")}
              placeholder="Enter your Order ID (e.g., ORD-1234567890)"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            {errors.orderId && (
              <p className="text-red-500 text-sm mt-1">
                {errors.orderId.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address (Optional)
            </label>
            <input
              type="email"
              {...register("email")}
              placeholder="Enter your email for additional verification"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-md transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <FaSearch />
            {loading ? "Tracking..." : "Track Order"}
          </button>
        </form>
      </div>

      {/* Tracking Results */}
      {trackingStatus && orderData && (
        <div className="space-y-8">
          {/* Order Info Card */}
          <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg p-6 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-red-100 text-sm">Order ID</p>
                <p className="font-bold text-lg">{orderData.orderId}</p>
              </div>
              <div>
                <p className="text-red-100 text-sm">Order Date</p>
                <p className="font-bold text-lg">
                  {new Date(orderData.orderDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-red-100 text-sm">Estimated Delivery</p>
                <p className="font-bold text-lg">
                  {trackingStatus[4].date.toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-8">Order Status</h2>

            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-300 md:left-8"></div>

              {trackingStatus.map((status, index) => (
                <div key={status.id} className="relative mb-8 last:mb-0">
                  <div className="flex items-start gap-4 md:gap-6">
                    {/* Icon */}
                    <div
                      className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-4 md:w-16 md:h-16 ${
                        status.completed
                          ? "bg-green-500 border-green-200"
                          : "bg-gray-300 border-gray-200"
                      }`}
                    >
                      <span
                        className={`text-xl md:text-2xl ${
                          status.completed ? "text-white" : "text-gray-600"
                        }`}
                      >
                        {status.icon}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-8">
                      <div className="bg-gray-50 rounded-lg p-4 md:p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                          <h3
                            className={`text-lg font-bold ${
                              status.completed
                                ? "text-green-600"
                                : "text-gray-600"
                            }`}
                          >
                            {status.status}
                          </h3>
                          <span className="text-sm text-gray-600 mt-1 md:mt-0">
                            {status.completed
                              ? status.date.toLocaleDateString()
                              : "Expected: " + status.date.toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm md:text-base">
                          {status.description}
                        </p>
                        
                        {/* Show tracking details for shipped status */}
                        {status.id === 3 && status.completed && (
                          <div className="mt-3 p-3 bg-blue-50 rounded-md border border-blue-200">
                            <p className="text-sm text-blue-800 font-semibold flex items-center gap-2">
                              <FaTruck />
                              Tracking Number: TRACK{orderData.orderId.slice(-8)}
                            </p>
                            <p className="text-xs text-blue-600 mt-1">
                              Carrier: FastShip Express
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <FaMapMarkerAlt className="text-red-500" />
                Shipping Address
              </h3>
              <div className="space-y-2 text-gray-700">
                <p className="font-semibold">{orderData.shippingInfo.fullName}</p>
                <p>{orderData.shippingInfo.address}</p>
                <p>
                  {orderData.shippingInfo.city}, {orderData.shippingInfo.state}{" "}
                  {orderData.shippingInfo.zipCode}
                </p>
                <p>{orderData.shippingInfo.country}</p>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Order Items</h3>
              <div className="space-y-3">
                {orderData.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium line-clamp-2">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-red-500">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
              <hr className="my-4" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-red-500">
                  ${orderData.pricing.grandTotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Help Section */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="font-semibold text-yellow-800 mb-2">
              Need Help with Your Order?
            </h3>
            <p className="text-yellow-700 text-sm mb-4">
              If you have any questions or concerns about your order, please
              don't hesitate to contact us.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate("/contact")}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md text-sm font-semibold transition cursor-pointer"
              >
                Contact Support
              </button>
              <button
                onClick={() => navigate("/order-confirmation", { state: { orderData } })}
                className="bg-white hover:bg-gray-50 text-yellow-800 border border-yellow-300 px-4 py-2 rounded-md text-sm font-semibold transition cursor-pointer"
              >
                View Order Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* No Results */}
      {trackingStatus === null && !loading && orderData === null && (
        <div className="text-center py-12">
          <FaSearch className="text-6xl text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600">
            Enter your Order ID above to track your order
          </p>
        </div>
      )}
    </div>
  );
};

export default OrderTracking;