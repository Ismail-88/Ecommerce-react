import React from 'react'
import { FaEye, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';

export const OrdersTable = ({orders, onViewOrder,onStatusChange, onDelete}) => {

   const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      processing: "bg-blue-100 text-blue-800",
      shipped: "bg-purple-100 text-purple-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const handleDelete = async (orderId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      onDelete(orderId);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  Order ID
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  Customer
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  Date
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  Items
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  Total
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  Status
                </th>
                <th className="text-center py-4 px-6 font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr
                    key={order.orderId}
                    className="border-b border-gray-200 hover:bg-gray-50 transition"
                  >
                    <td className="py-4 px-6 font-mono text-sm font-semibold text-gray-800">
                      {order.orderId}
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-semibold text-gray-800">
                          {order.shippingInfo.fullName}
                        </p>
                        <p className="text-sm text-gray-600">
                          {order.shippingInfo.email}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-700">
                      {new Date(order.orderDate).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6 text-gray-700">
                      {order.items.length} item(s)
                    </td>
                    <td className="py-4 px-6 font-bold text-red-500">
                      ${order.pricing.grandTotal.toFixed(2)}
                    </td>
                    <td className="py-4 px-6">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          onStatusChange(order.orderId, e.target.value)
                        }
                        className={`px-3 py-1 rounded-full text-sm font-semibold cursor-pointer ${getStatusColor(
                          order.status
                        )}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <button
                        onClick={() => onViewOrder(order)}
                        className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition cursor-pointer"
                        title="View Details"
                      >
                        <FaEye />
                      </button>
                          <button
                            onClick={() => handleDelete(order._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
                            title="Delete Order"
                          >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-12">
                    <p className="text-gray-600">No orders found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
  )
}

