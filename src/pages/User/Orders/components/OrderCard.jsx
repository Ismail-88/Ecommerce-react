// components/orders/OrderCard.jsx - Fixed Version
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShippingFast, FaCheckCircle, FaTimesCircle, FaClock, FaBox, FaEye } from 'react-icons/fa';
import { MapPin, CreditCard } from 'lucide-react';

const OrderCard = ({ order, formatDate }) => {
  const navigate = useNavigate();


  const statusConfig = useMemo(() => ({
    pending: {
      icon: FaClock,
      color: "text-yellow-400",
      bg: "from-yellow-500/20 to-amber-500/20",
      border: "border-yellow-500/30",
      label: "Pending"
    },
    processing: {
      icon: FaBox,
      color: "text-blue-400",
      bg: "from-blue-500/20 to-indigo-500/20",
      border: "border-blue-500/30",
      label: "Processing"
    },
    shipped: {
      icon: FaShippingFast,
      color: "text-purple-400",
      bg: "from-purple-500/20 to-pink-500/20",
      border: "border-purple-500/30",
      label: "Shipped"
    },
    delivered: {
      icon: FaCheckCircle,
      color: "text-emerald-400",
      bg: "from-emerald-500/20 to-teal-500/20",
      border: "border-emerald-500/30",
      label: "Delivered"
    },
    cancelled: {
      icon: FaTimesCircle,
      color: "text-red-400",
      bg: "from-red-500/20 to-rose-500/20",
      border: "border-red-500/30",
      label: "Cancelled"
    }
  }), []);

  const StatusIcon = statusConfig[order.status?.toLowerCase()]?.icon || FaClock;
  const statusStyle = statusConfig[order.status?.toLowerCase()] || statusConfig.pending;

  // Safely handle items array
  const orderItems = useMemo(() => {
    if (!order.items || !Array.isArray(order.items)) {
      return [];
    }
    return order.items;
  }, [order.items]);

  // Get image URL safely
  const getImageUrl = (item) => {
    if (!item) return '/placeholder-image.jpg';
    
    if (Array.isArray(item.images)) {
      return item.images[0] || '/placeholder-image.jpg';
    }
    
    if (typeof item.images === 'string') {
      return item.images;
    }
    
    if (item.image) {
      return Array.isArray(item.image) ? item.image[0] : item.image;
    }
    
    return '/placeholder-image.jpg';
  };

  return (
    <div className="group relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-3xl overflow-hidden hover:border-cyan-500/30 transition-all">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-blue-500/0 to-purple-500/0 group-hover:from-cyan-500/5 group-hover:via-blue-500/5 group-hover:to-purple-500/5 transition-all"></div>
      
      <div className="relative p-8">
        {/* Order Header */}
        <div className="flex flex-wrap justify-between items-start gap-4 mb-6 pb-6 border-b border-white/10">
          <div>
            <h3 className="font-black text-2xl mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              #{order.orderId}
            </h3>
            <p className="text-sm text-gray-400 flex items-center gap-2">
              <span className="w-1 h-1 bg-cyan-400 rounded-full"></span>
              {formatDate(order.orderDate)}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${statusStyle.bg} border ${statusStyle.border}`}>
              <StatusIcon className={`${statusStyle.color} w-5 h-5`} />
              <span className={`font-bold text-sm ${statusStyle.color}`}>
                {statusStyle.label}
              </span>
            </div>
            <button
              onClick={() => navigate(`/order/${order._id}`)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl hover:border-cyan-500/50 text-cyan-400 font-bold transition-all group/btn"
            >
              <FaEye className="group-hover/btn:scale-110 transition-transform" />
              View
            </button>
          </div>
        </div>

        {/* Order Items */}
        <div className="space-y-4 mb-6">
          {orderItems.length > 0 ? (
            <>
              {orderItems.slice(0, 2).map((item, index) => (
                <div key={index} className="flex gap-4 p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl group/item hover:border-cyan-500/30 transition-all">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-white/5">
                    <img
                      src={getImageUrl(item)}
                      alt={item.title || 'Product'}
                      className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        console.error("Image load error for:", item);
                        e.target.src = '/placeholder-image.jpg';
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-white line-clamp-1 mb-1 group-hover/item:text-cyan-400 transition-colors">
                      {item.title || 'Product'}
                    </h4>
                    <p className="text-sm text-gray-400 mb-1">
                      Quantity: <span className="text-white font-bold">{item.quantity || 1}</span>
                    </p>
                    <p className="text-lg font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                      ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
              {orderItems.length > 2 && (
                <div className="text-center py-2 px-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-sm text-gray-400">
                    +{orderItems.length - 2} more items
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8 px-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-gray-400">No items found in this order</p>
            </div>
          )}
        </div>

        {/* Order Footer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-white/10">
          <div className="p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
            <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
              <CreditCard className="w-4 h-4" />
              Payment
            </div>
            <p className="font-bold capitalize">
              {order.paymentMethod === "cod" ? "Cash on Delivery" : order.paymentMethod || "N/A"}
            </p>
          </div>
          
          <div className="p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
            <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
              <MapPin className="w-4 h-4" />
              Delivery
            </div>
            <p className="font-bold">
              {order.shippingInfo?.city || 'N/A'}, {order.shippingInfo?.state || 'N/A'}
            </p>
          </div>
          
          <div className="p-4 rounded-2xl border border-white/10 bg-gradient-to-r from-cyan-500/10 to-blue-500/10">
            <p className="text-gray-400 text-sm mb-2">Total Amount</p>
            <p className="text-3xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              ${(order.pricing?.grandTotal || 0).toFixed(2)}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          {order.status?.toLowerCase() === "delivered" && (
            <button className="flex-1 relative overflow-hidden group/btn rounded-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600"></div>
              <span className="relative block py-3 text-white font-bold">
                Write Review
              </span>
            </button>
          )}
          {(order.status?.toLowerCase() === "pending" || order.status?.toLowerCase() === "processing") && (
            <button className="flex-1 py-3 rounded-xl border-2 border-red-500/50 text-red-400 font-bold hover:bg-red-500/10 transition-all">
              Cancel Order
            </button>
          )}
          {order.status?.toLowerCase() === "shipped" && (
            <button 
            onClick={() => navigate(`/track-order`)}
            className="flex-1 relative overflow-hidden group/btn rounded-xl">
               
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-amber-500"></div>
              <span className="relative block py-3 text-white font-bold">
                Track Order
              </span>
            </button>
          )}
          <button
            onClick={() => navigate(`/order/${order._id}`)}
            className="flex-1 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl font-bold hover:border-cyan-500/50 transition-all"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;