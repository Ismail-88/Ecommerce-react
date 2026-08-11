// pages/User/Orders/index.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useOrders } from "./hooks/useOrders";
import { Package } from "lucide-react";

// Components
import OrderFilterTabs from "./components/OrderFilterTabs";
import OrderCard from "./components/OrderCard";
import EmptyOrdersState from "./components/EmptyOrdersState";
import EmptyState from "../../../components/ui/EmptyState";
import Button from "../../../components/ui/Button";
import { FullPageSpinner } from "../../../components/ui/Spinner";

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
    getOrderCount,
    cancelOrder
  } = useOrders();

  // Loading state
  if (!isLoaded || loadingOrders) {
    return (
      <div className="min-h-[70vh] bg-background flex items-center justify-center">
        <FullPageSpinner label="Loading your orders..." />
      </div>
    );
  }

  // User not logged in
  if (!user) {
    return (
      <div className="min-h-[70vh] bg-background flex items-center justify-center px-4">
        <EmptyState
          icon={Package}
          title="Please Login"
          description="You need to be logged in to view your orders"
          action={
            <Button size="lg" onClick={() => navigate("/sign-in")}>
              Login Now
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen text-foreground">
      {/* Orders Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              My Orders
            </h1>
            <p className="text-sm text-text-muted mt-1">
              Track and manage all your purchases
            </p>
          </div>
          <p className="text-sm font-semibold text-text-muted">
            {orders.length} order{orders.length !== 1 ? "s" : ""}
          </p>
        </div>

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
          <div className="space-y-5">
            {filteredOrders.map((order) => (
              <OrderCard
                key={order._id}
                order={order}
                formatDate={formatDate}
                onCancelOrder={cancelOrder}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
