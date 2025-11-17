// pages/MyOrders.jsx - Debug Version
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useOrders } from "./hooks/useOrders";
import { Crown, Package, Sparkles } from "lucide-react";

// Components
import OrderFilterTabs from "./components/OrderFilterTabs";
import OrderCard from "./components/OrderCard";
import EmptyOrdersState from "./components/EmptyOrdersState";

const MyOrders = () => {
  const navigate = useNavigate();
  const {
    user,
    isLoaded,
    orders,
    filteredOrders,
    loadingOrders,
    filter,
    setFilter,
    formatDate,
    getOrderCount
  } = useOrders();

  // Debug logging


  // Loading state
  if (!isLoaded || loadingOrders) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 rounded-full blur-2xl animate-pulse"></div>
            <div className="relative w-20 h-20 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-400 font-medium">Loading your orders...</p>
        </div>
      </div>
    );
  }

  // User not logged in
  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <div className="text-center">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 rounded-full blur-3xl"></div>
            <Package className="relative w-32 h-32 text-gray-600" />
          </div>
          <h1 className="text-4xl font-black mb-4">Please Login</h1>
          <p className="text-gray-400 text-lg mb-8">
            You need to be logged in to view your orders
          </p>
          <button
            onClick={() => navigate("/sign-in")}
            className="group relative overflow-hidden rounded-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="relative block px-8 py-4 text-white font-bold">
              Login Now
            </span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Premium Header */}
      <div className="relative py-20 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.05),transparent_70%)]"></div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-2xl px-5 py-2 mb-6">
            <Crown className="w-5 h-5 text-yellow-400 animate-pulse" />
            <span className="text-sm font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              ORDER HISTORY
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-4">
            <span className="block mb-2">Your Premium</span>
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Orders
            </span>
          </h1>
          <p className="text-gray-400 text-xl flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            Track and manage all your luxury purchases
          </p>

          {/* Debug Info - Remove in production */}
          {/* <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10 text-sm">
            <p className="text-cyan-400 font-bold mb-2">Debug Info:</p>
            <p className="text-gray-400">Total Orders: {orders?.length || 0}</p>
            <p className="text-gray-400">Filtered Orders: {filteredOrders?.length || 0}</p>
            <p className="text-gray-400">Current Filter: {filter}</p>
            {orders && orders.length > 0 && (
              <p className="text-gray-400">First Order Items: {orders[0]?.items?.length || 0}</p>
            )}
          </div> */}
        </div>
      </div>

      {/* Orders Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        {/* Filter Tabs */}
        <OrderFilterTabs
          filter={filter}
          setFilter={setFilter}
          getOrderCount={getOrderCount}
        />

        {/* Orders List or Empty State */}
        {filteredOrders.length === 0 ? (
          <EmptyOrdersState filter={filter} />
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <OrderCard
                key={order._id}
                order={order}
                formatDate={formatDate}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;