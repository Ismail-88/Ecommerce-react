import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import {
  FaShippingFast,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaBox,
  FaEye
} from "react-icons/fa";
import { getData } from "../../context/DataContext";

const MyOrders = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");
  const {orders, fetchOrdersByUser, loadingOrders} = getData()

  useEffect(() => {
    if (isLoaded && user) {
      fetchOrdersByUser(user.id);
    }
  }, [isLoaded, user]);

  

  const statusConfig = {
    pending: {
      icon: FaClock,
      color: "text-yellow-600",
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      label: "Pending"
    },
    processing: {
      icon: FaBox,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200",
      label: "Processing"
    },
    shipped: {
      icon: FaShippingFast,
      color: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-200",
      label: "Shipped"
    },
    delivered: {
      icon: FaCheckCircle,
      color: "text-green-600",
      bg: "bg-green-50",
      border: "border-green-200",
      label: "Delivered"
    },
    cancelled: {
      icon: FaTimesCircle,
      color: "text-red-600",
      bg: "bg-red-50",
      border: "border-red-200",
      label: "Cancelled"
    }
  };

  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter((order) => order.status === filter);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
 if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  //  User not logged in
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-[600px] px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Please Login</h1>
        <p className="text-gray-600 mb-6">
          You need to be logged in to view your orders
        </p>
        <button
          onClick={() => navigate("/sign-in")}
          className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 transition cursor-pointer"
        >
          Login
        </button>
      </div>
    );
  }

  // Orders loading
  if (loadingOrders) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }


  return (
    <div className="max-w-7xl mx-auto px-4 py-8 mb-10">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 pb-4">
        {["all", "pending", "processing", "shipped", "delivered", "cancelled"].map(
          (status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium transition capitalize ${
                filter === status
                  ? "bg-red-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {status}
              {status === "all" && ` (${orders.length})`}
              {status !== "all" &&
                ` (${orders.filter((o) => o.status === status).length})`}
            </button>
          )
        )}
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[400px] bg-gray-50 rounded-lg">
          <FaBox className="text-6xl text-gray-300 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-600 mb-2">
            No Orders Found
          </h2>
          <p className="text-gray-500 mb-6">
            {filter === "all"
              ? "You haven't placed any orders yet"
              : `No ${filter} orders`}
          </p>
          <button
            onClick={() => navigate("/products")}
            className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 transition cursor-pointer"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((order) => {
            const StatusIcon =
              statusConfig[order.status]?.icon || FaClock;
            const statusStyle =
              statusConfig[order.status] || statusConfig.pending;

            return (
              <div
                key={order._id}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition"
              >
                {/* Order Header */}
                <div className="flex flex-wrap justify-between items-start gap-4 mb-4 pb-4 border-b border-gray-200">
                  <div>
                    <h3 className="font-bold text-lg mb-1">
                      Order #{order.orderId}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Placed on {formatDate(order.orderDate)}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div
                      className={`flex items-center gap-2 px-4 py-2 rounded-full ${statusStyle.bg} ${statusStyle.border} border`}
                    >
                      <StatusIcon className={statusStyle.color} />
                      <span
                        className={`font-semibold text-sm ${statusStyle.color}`}
                      >
                        {statusStyle.label}
                      </span>
                    </div>
                    <button
                      onClick={() => navigate(`/order/${order._id}`)}
                      className="flex items-center gap-2 text-red-500 hover:text-red-600 font-medium"
                    >
                      <FaEye />
                      View Details
                    </button>
                  </div>
                </div>

                {/* Order Items */}
                <div className="space-y-4 mb-4">
                  {order.items.slice(0, 2).map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <img
                        src={
                          Array.isArray(item.images)
                            ? item.images[0]
                            : item.images
                        }
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 line-clamp-1">
                          {item.title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          Quantity: {item.quantity}
                        </p>
                        <p className="text-sm font-semibold text-red-500">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                  {order.items.length > 2 && (
                    <p className="text-sm text-gray-500 italic">
                      +{order.items.length - 2} more items
                    </p>
                  )}
                </div>

                {/* Order Footer */}
                <div className="flex flex-wrap justify-between items-center pt-4 border-t border-gray-200">
                  <div>
                    <p className="text-sm text-gray-600">Payment Method</p>
                    <p className="font-semibold capitalize">
                      {order.paymentMethod === "cod"
                        ? "Cash on Delivery"
                        : order.paymentMethod}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Delivery Address</p>
                    <p className="font-semibold">
                      {order.shippingInfo.city}, {order.shippingInfo.state}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Total Amount</p>
                    <p className="text-2xl font-bold text-red-500">
                      ${order.pricing.grandTotal.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-4">
                  {order.status === "delivered" && (
                    <button className="flex-1 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition cursor-pointer">
                      Write Review
                    </button>
                  )}
                  {(order.status === "pending" ||
                    order.status === "processing") && (
                    <button className="flex-1 px-4 py-2 border-2 border-red-500 text-red-500 rounded-md hover:bg-red-50 transition cursor-pointer">
                      Cancel Order
                    </button>
                  )}
                  {order.status === "shipped" && (
                    <button className="flex-1 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition cursor-pointer">
                      Track Order
                    </button>
                  )}
                  <button
                    onClick={() => navigate(`/order/${order._id}`)}
                    className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition cursor-pointer"
                  >
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
