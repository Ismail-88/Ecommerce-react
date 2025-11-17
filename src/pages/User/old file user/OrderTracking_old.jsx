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
  const { fetchOrderById } = getData();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(trackingSchema),
  });

  // Auto-fill if coming from order confirmation
  useEffect(() => {
    if (location.state?.orderId) {
      setValue("orderId", location.state.orderId);
      handleTrackOrder({ orderId: location.state.orderId });
    }
  }, [location.state]);

  // Dynamic tracking statuses based on backend order status
  const getTrackingStatuses = (order) => {
    const date = new Date(order.orderDate);
    const statusMap = ["pending", "processing", "shipped", "out for delivery", "delivered"];
    const statusDescriptions = {
      pending: "Your order has been received.",
      processing: "We are preparing your order.",
      shipped: "Your order has been shipped.",
      "out for delivery": "Your order is out for delivery.",
      delivered: "Your order has been delivered.",
    };
    const statusIcons = {
      pending: <FaBox />,
      processing: <FaShippingFast />,
      shipped: <FaTruck />,
      "out for delivery": <MdLocalShipping />,
      delivered: <FaCheckCircle />,
    };

    const currentIndex = statusMap.indexOf(order.status);

    return statusMap.map((status, i) => ({
      id: i + 1,
      status: status.charAt(0).toUpperCase() + status.slice(1),
      description: statusDescriptions[status],
      icon: statusIcons[status],
      date: new Date(date.getTime() + i * 24 * 60 * 60 * 1000),
      completed: i <= currentIndex,
    }));
  };

  const handleTrackOrder = async (data) => {
    setLoading(true);
    try {
      const order = await fetchOrderById(data.orderId);

      if (order) {
        setOrderData(order);
        setTrackingStatus(getTrackingStatuses(order));
      } else {
        setOrderData(null);
        setTrackingStatus(null);
        alert("Order not found! Please check your Order ID.");
      }
    } catch (error) {
      console.error(error);
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
              <p className="text-red-500 text-sm mt-1">{errors.orderId.message}</p>
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
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
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
          {/* Order Info */}
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
                  {trackingStatus[trackingStatus.length - 1].date.toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-8">Order Status</h2>
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-300 md:left-8"></div>
              {trackingStatus.map((status) => (
                <div key={status.id} className="relative mb-8 last:mb-0">
                  <div className="flex items-start gap-4 md:gap-6">
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
                    <div className="flex-1 pb-8">
                      <div className="bg-gray-50 rounded-lg p-4 md:p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                          <h3
                            className={`text-lg font-bold ${
                              status.completed ? "text-green-600" : "text-gray-600"
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
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* No Results */}
      {trackingStatus === null && !loading && orderData === null && (
        <div className="text-center py-12">
          <FaSearch className="text-6xl text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600">Enter your Order ID above to track your order</p>
        </div>
      )}
    </div>
  );
};

export default OrderTracking;
