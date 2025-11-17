import React from 'react'

export const OrderDetailsModal = ({ order, onClose, onStatusChange}) => {

      if (!order) return null;

  return (
    <div
          className="fixed inset-0 flex items-center justify-center p-4 z-50 transition-opacity duration-300 ease-in-out"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.4)",
            backdropFilter: "blur(8px)",
            // opacity: showModal ? 1 : 0,
          }}
        >
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-lg transform transition-transform duration-300 ease-in-out scale-100">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Order Details
                </h2>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700 text-2xl cursor-pointer"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Order Information
                  </h3>
                  <p className="text-sm text-gray-600">
                    Order ID:{" "}
                    <span className="font-mono">{order.orderId}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Date:{" "}
                    {new Date(order.orderDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    Payment: {order.paymentMethod.toUpperCase()}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Customer Information
                  </h3>
                  <p className="text-sm text-gray-600">
                    {order.shippingInfo.fullName}
                  </p>
                  <p className="text-sm text-gray-600">
                    {order.shippingInfo.email}
                  </p>
                  <p className="text-sm text-gray-600">
                    {order.shippingInfo.phone}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Shipping Address
                </h3>
                <p className="text-sm text-gray-600">
                  {order.shippingInfo.address},{" "}
                  {order.shippingInfo.city},{" "}
                  {order.shippingInfo.state}{" "}
                  {order.shippingInfo.zipCode}
                  <br />
                  {order.shippingInfo.country}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">
                  Order Items
                </h3>
                <div className="space-y-3">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg"
                    >
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800 text-sm">
                          {item.title}
                        </p>
                        <p className="text-xs text-gray-600">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <span className="font-bold text-red-500">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-3">
                  Order Summary
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-800">
                      ${order.pricing.subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="text-gray-800">
                      {order.pricing.deliveryFee === 0
                        ? "FREE"
                        : `$${order.pricing.deliveryFee.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Handling Fee</span>
                    <span className="text-gray-800">
                      ${order.pricing.handlingFee.toFixed(2)}
                    </span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-red-500">
                      ${order.pricing.grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Update Order Status
                </label>
                <select
                  value={order.status}
                   onChange={(e) => onStatusChange(order.orderId, e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>
        </div>
  )
}


