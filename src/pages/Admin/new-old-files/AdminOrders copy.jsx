import React, { useState, useEffect } from 'react';
import { FaSearch, FaEye, FaDownload, FaFilter } from 'react-icons/fa';
// import { getAllOrders, updateOrderStatus as updateOrderStatusAPI } from '../services/api';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [orders, searchTerm, statusFilter]);

  const fetchOrders = () => {
    // Get orders from localStorage
    const storedOrders = JSON.parse(localStorage.getItem('allOrders') || '[]');
    
    // Demo orders if none exist
    const demoOrders = storedOrders.length > 0 ? storedOrders : [
      {
        orderId: 'ORD-1234567890',
        orderDate: new Date().toISOString(),
        status: 'pending',
        items: [
          {
            title: 'Sample Product 1',
            quantity: 2,
            price: 99.99,
            images: ['https://via.placeholder.com/100'],
          },
        ],
        shippingInfo: {
          fullName: 'John Doe',
          email: 'john@example.com',
          phone: '+1234567890',
          address: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'USA',
        },
        paymentMethod: 'card',
        pricing: {
          subtotal: 199.98,
          deliveryFee: 0,
          handlingFee: 5,
          grandTotal: 204.98,
        },
      },
    ];
    
    setOrders(demoOrders);
  };

  const filterOrders = () => {
    let filtered = orders;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.orderId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.shippingInfo?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.shippingInfo?.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    setFilteredOrders(filtered);
  };

  const handleStatusChange = (orderId, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.orderId === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('allOrders', JSON.stringify(updatedOrders));
    alert('Order status updated successfully!');
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const exportOrders = () => {
    const csv = [
      ['Order ID', 'Customer', 'Date', 'Status', 'Total'],
      ...filteredOrders.map((order) => [
        order.orderId,
        order.shippingInfo.fullName,
        new Date(order.orderDate).toLocaleDateString(),
        order.status,
        `$${order.pricing.grandTotal.toFixed(2)}`,
      ]),
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orders-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Order Management
          </h1>
          <p className="text-gray-600">
            Total Orders: {filteredOrders.length}
          </p>
        </div>
        <button
          onClick={exportOrders}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 font-semibold transition"
        >
          <FaDownload /> Export Orders
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by Order ID, Customer name or Email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent appearance-none"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Desktop View */}
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
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr
                    key={order.orderId}
                    className="border-b border-gray-200 hover:bg-gray-50 transition"
                  >
                    <td className="py-4 px-6">
                      <span className="font-mono text-sm font-semibold text-gray-800">
                        {order.orderId}
                      </span>
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
                    <td className="py-4 px-6">
                      <span className="text-gray-700">
                        {new Date(order.orderDate).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-gray-700">
                        {order.items.length} item(s)
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-bold text-red-500">
                        ${order.pricing.grandTotal.toFixed(2)}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order.orderId, e.target.value)
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
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleViewOrder(order)}
                          className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition"
                          title="View Details"
                        >
                          <FaEye />
                        </button>
                      </div>
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

        {/* Mobile View */}
        <div className="md:hidden space-y-4 p-4">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <div
                key={order.orderId}
                className="bg-gray-50 rounded-lg p-4 space-y-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-mono text-sm font-semibold text-gray-800">
                      {order.orderId}
                    </p>
                    <p className="text-sm text-gray-600">
                      {order.shippingInfo.fullName}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </span>
                  <span className="font-bold text-red-500">
                    ${order.pricing.grandTotal.toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={() => handleViewOrder(order)}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 text-sm"
                >
                  <FaEye /> View Details
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No orders found</p>
            </div>
          )}
        </div>
      </div>

      {/* Order Details Modal */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Order Details
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Order Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Order Information
                  </h3>
                  <p className="text-sm text-gray-600">
                    Order ID: <span className="font-mono">{selectedOrder.orderId}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Date: {new Date(selectedOrder.orderDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    Payment: {selectedOrder.paymentMethod.toUpperCase()}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Customer Information
                  </h3>
                  <p className="text-sm text-gray-600">
                    {selectedOrder.shippingInfo.fullName}
                  </p>
                  <p className="text-sm text-gray-600">
                    {selectedOrder.shippingInfo.email}
                  </p>
                  <p className="text-sm text-gray-600">
                    {selectedOrder.shippingInfo.phone}
                  </p>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Shipping Address
                </h3>
                <p className="text-sm text-gray-600">
                  {selectedOrder.shippingInfo.address}, {selectedOrder.shippingInfo.city},
                  {selectedOrder.shippingInfo.state} {selectedOrder.shippingInfo.zipCode}
                  <br />
                  {selectedOrder.shippingInfo.country}
                </p>
              </div>

              {/* Order Items */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">
                  Order Items
                </h3>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg">
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

              {/* Order Summary */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-3">
                  Order Summary
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-800">
                      ${selectedOrder.pricing.subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="text-gray-800">
                      {selectedOrder.pricing.deliveryFee === 0
                        ? 'FREE'
                        : `${selectedOrder.pricing.deliveryFee.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Handling Fee</span>
                    <span className="text-gray-800">
                      ${selectedOrder.pricing.handlingFee.toFixed(2)}
                    </span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-red-500">
                      ${selectedOrder.pricing.grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Update */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Update Order Status
                </label>
                <select
                  value={selectedOrder.status}
                  onChange={(e) => {
                    handleStatusChange(selectedOrder.orderId, e.target.value);
                    setSelectedOrder({ ...selectedOrder, status: e.target.value });
                  }}
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
      )}
    </div>
  );
};

export default AdminOrders;