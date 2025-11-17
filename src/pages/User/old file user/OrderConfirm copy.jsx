import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCheckCircle, FaDownload, FaPrint } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useCart } from "../../context/CartContext";

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const orderData = location.state?.orderData;

  useEffect(() => {
    // Clear cart after successful order
    if (orderData) {
       clearCart(); 
    }
  }, [orderData]);

  if (!orderData) {
    return (
      <div className="flex flex-col items-center justify-center h-[600px] px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          No Order Found
        </h1>
        <p className="text-gray-600 mb-6">
          Please place an order to view confirmation
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

  const { orderId, items, shippingInfo, paymentMethod, pricing, orderDate } =
    orderData;

  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 7);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadInvoice = () => {
    // Create a simple invoice text
    const invoice = `
ORDER CONFIRMATION
==================
Order ID: ${orderId}
Order Date: ${new Date(orderDate).toLocaleDateString()}

SHIPPING INFORMATION
--------------------
Name: ${shippingInfo.fullName}
Email: ${shippingInfo.email}
Phone: ${shippingInfo.phone}
Address: ${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state} ${shippingInfo.zipCode}, ${shippingInfo.country}

ITEMS ORDERED
-------------
${items.map((item, i) => `${i + 1}. ${item.title} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`).join('\n')}

PAYMENT SUMMARY
---------------
Subtotal: $${pricing.subtotal.toFixed(2)}
Delivery Fee: $${pricing.deliveryFee.toFixed(2)}
Handling Fee: $${pricing.handlingFee.toFixed(2)}
Total: $${pricing.grandTotal.toFixed(2)}

Payment Method: ${paymentMethod.toUpperCase()}

Thank you for shopping with us!
    `;

    const blob = new Blob([invoice], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Invoice-${orderId}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 mb-10">
      {/* Success Header */}
      <div className="bg-green-50 border-2 border-green-500 rounded-lg p-8 text-center mb-8">
        <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Order Placed Successfully!
        </h1>
        <p className="text-gray-600 mb-4">
          Thank you for your purchase. Your order has been confirmed.
        </p>
        <div className="bg-white inline-block px-6 py-3 rounded-md shadow-sm">
          <p className="text-sm text-gray-600">Order ID</p>
          <p className="text-xl font-bold text-red-500">{orderId}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <button
          onClick={handleDownloadInvoice}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-md transition cursor-pointer"
        >
          <FaDownload /> Download Invoice
        </button>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-md transition cursor-pointer"
        >
          <FaPrint /> Print Order
        </button>
        <button
          onClick={() => navigate("/products")}
          className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300 px-6 py-3 rounded-md transition cursor-pointer"
        >
          Continue Shopping
        </button>
      </div>

      {/* Order Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Shipping Information */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <MdEmail className="text-red-500" />
            Shipping Information
          </h2>
          <div className="space-y-2 text-gray-700">
            <p>
              <strong>Name:</strong> {shippingInfo.fullName}
            </p>
            <p>
              <strong>Email:</strong> {shippingInfo.email}
            </p>
            <p>
              <strong>Phone:</strong> {shippingInfo.phone}
            </p>
            <p>
              <strong>Address:</strong> {shippingInfo.address}
            </p>
            <p>
              {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
            </p>
            <p>{shippingInfo.country}</p>
          </div>
        </div>

        {/* Order Information */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Order Information</h2>
          <div className="space-y-2 text-gray-700">
            <p>
              <strong>Order Date:</strong>{" "}
              {new Date(orderDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Payment Method:</strong>{" "}
              {paymentMethod === "card"
                ? "Credit/Debit Card"
                : paymentMethod === "paypal"
                ? "PayPal"
                : "Cash on Delivery"}
            </p>
            <p>
              <strong>Total Items:</strong> {items.length}
            </p>
            <p>
              <strong>Estimated Delivery:</strong>{" "}
              {estimatedDelivery.toLocaleDateString()}
            </p>
            <div className="mt-4 p-3 bg-blue-50 rounded-md">
              <p className="text-sm text-blue-800">
                <strong>📧 Confirmation email sent to:</strong>
                <br />
                {shippingInfo.email}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-8">
        <h2 className="text-xl font-semibold mb-6">Order Items</h2>
        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 pb-4 border-b border-gray-200 last:border-0"
            >
              <img
                src={item.images[0]}
                alt={item.title}
                className="w-20 h-20 object-cover rounded-md"
              />
              <div className="flex-1">
                <h3 className="font-medium line-clamp-2">{item.title}</h3>
                <p className="text-sm text-gray-600">
                  Quantity: {item.quantity}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-red-500">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <p className="text-xs text-gray-500">
                  ${item.price.toFixed(2)} each
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Price Summary */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Payment Summary</h2>
        <div className="space-y-3">
          <div className="flex justify-between text-gray-700">
            <span>Subtotal</span>
            <span>${pricing.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Delivery Fee</span>
            <span className="text-red-500 font-semibold">
              {pricing.deliveryFee === 0 ? "FREE" : `$${pricing.deliveryFee}`}
            </span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Handling Fee</span>
            <span>${pricing.handlingFee.toFixed(2)}</span>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between text-xl font-bold">
            <span>Grand Total</span>
            <span className="text-red-500">${pricing.grandTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Track Order Section */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg p-8 mt-8 text-center">
        <h2 className="text-2xl font-bold mb-3">Track Your Order</h2>
        <p className="mb-6">
          You can track your order status anytime using your order ID
        </p>
        <button
          onClick={() => navigate("/track-order", { state: { orderId } })}
          className="bg-white text-red-500 font-semibold px-8 py-3 rounded-md hover:bg-gray-100 transition"
        >
          Track Order
        </button>
      </div>

      {/* Support Information */}
      <div className="bg-gray-50 rounded-lg p-6 mt-8 text-center">
        <p className="text-gray-700">
          Need help with your order?{" "}
          <a
            href="/contact"
            className="text-red-500 font-semibold hover:underline"
          >
            Contact Support
          </a>
        </p>
      </div>
    </div>
  );
};

export default OrderConfirmation;