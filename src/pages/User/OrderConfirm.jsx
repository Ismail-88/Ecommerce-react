// pages/OrderConfirmation.jsx
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle2, Download, Printer, ShoppingBag, MapPin, CreditCard, Package, Calendar, Truck } from "lucide-react";
import { useCart } from "../../context/CartContext";

import EmptyState from "../../components/ui/EmptyState";
import Button from "../../components/ui/Button";
import { formatINR } from "../../utils/formatCurrency";

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const orderData = location.state?.orderData;

  useEffect(() => {
    if (orderData) {
      clearCart();
    }
  }, [orderData, clearCart]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadInvoice = () => {
    const invoice = `
ORDER CONFIRMATION
==================
Order ID: ${orderData.orderId}
Order Date: ${new Date(orderData.orderDate).toLocaleDateString()}

SHIPPING INFORMATION
--------------------
Name: ${orderData.shippingInfo.fullName}
Email: ${orderData.shippingInfo.email}
Phone: ${orderData.shippingInfo.phone}
Address: ${orderData.shippingInfo.address}, ${orderData.shippingInfo.city}, ${orderData.shippingInfo.state} ${orderData.shippingInfo.zipCode}, ${orderData.shippingInfo.country}

ITEMS ORDERED
-------------
${orderData.items.map((item, i) => `${i + 1}. ${item.title} x${item.quantity} - ${formatINR(item.price * item.quantity, 2)}`).join('\n')}

PAYMENT SUMMARY
---------------
Subtotal: ${formatINR(orderData.pricing.subtotal, 2)}
Delivery Fee: ${formatINR(orderData.pricing.deliveryFee, 2)}
Handling Fee: ${formatINR(orderData.pricing.handlingFee, 2)}
Total: ${formatINR(orderData.pricing.grandTotal, 2)}

Payment Method: ${orderData.paymentMethod.toUpperCase()}

Thank you for shopping with us!
    `;

    const blob = new Blob([invoice], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Invoice-${orderData.orderId}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (!orderData) {
    return (
      <div className="min-h-[70vh] bg-background flex items-center justify-center px-4">
        <EmptyState
          icon={Package}
          title="No Order Found"
          description="Please place an order to view confirmation"
          action={
            <Button size="lg" onClick={() => navigate("/products")}>
              Continue Shopping
            </Button>
          }
        />
      </div>
    );
  }

  const { orderId, items, shippingInfo, paymentMethod, pricing, orderDate } = orderData;

  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 7);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Success Header */}
      <div className="border-b border-border bg-surface-alt">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-12 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-success-soft border-4 border-success/20 mb-6">
            <CheckCircle2 size={44} className="text-success" aria-hidden />
          </div>

          <span className="inline-flex items-center gap-2 rounded-full border border-success/20 bg-success-soft px-4 py-1.5 text-xs font-bold text-success mb-4">
            ORDER CONFIRMED
          </span>

          <h1 className="text-4xl md:text-5xl font-black mb-3 text-foreground">
            Success!
          </h1>
          <p className="text-text-muted text-lg mb-8">
            Your order has been placed successfully
          </p>

          <div className="inline-block rounded-2xl border border-border bg-surface shadow-card px-8 py-5">
            <p className="text-sm text-text-muted mb-1">Order ID</p>
            <p className="text-2xl font-extrabold text-brand-600 dark:text-brand-400">
              {orderId}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <Button onClick={handleDownloadInvoice}>
            <Download size={17} aria-hidden />
            Download Invoice
          </Button>
          <Button variant="outline" onClick={handlePrint}>
            <Printer size={17} aria-hidden />
            Print Order
          </Button>
          <Button variant="outline" onClick={() => navigate("/products")}>
            <ShoppingBag size={17} aria-hidden />
            Continue Shopping
          </Button>
        </div>

        {/* Order Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          {/* Shipping Information */}
          <div className="rounded-2xl border border-border bg-surface shadow-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-brand-soft text-brand-600 dark:text-brand-400">
                <MapPin size={24} aria-hidden />
              </span>
              <h2 className="text-xl font-bold text-foreground">Shipping Information</h2>
            </div>
            <div className="space-y-2.5 text-foreground/90">
              <p>
                <span className="text-text-muted">Name:</span>{" "}
                <span className="font-semibold text-foreground">{shippingInfo.fullName}</span>
              </p>
              <p>
                <span className="text-text-muted">Email:</span>{" "}
                <span className="font-semibold text-foreground">{shippingInfo.email}</span>
              </p>
              <p>
                <span className="text-text-muted">Phone:</span>{" "}
                <span className="font-semibold text-foreground">{shippingInfo.phone}</span>
              </p>
              <div className="pt-3 border-t border-border">
                <p className="text-text-muted text-sm mb-2">Delivery Address</p>
                <p className="font-semibold text-foreground">{shippingInfo.address}</p>
                <p className="font-semibold text-foreground">{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}</p>
                <p className="font-semibold text-foreground">{shippingInfo.country}</p>
              </div>
            </div>
          </div>

          {/* Order Information */}
          <div className="rounded-2xl border border-border bg-surface shadow-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-info-soft text-info">
                <Package size={24} aria-hidden />
              </span>
              <h2 className="text-xl font-bold text-foreground">Order Information</h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-xl border border-border bg-surface-alt">
                <Calendar size={18} className="text-brand-600 dark:text-brand-400 flex-shrink-0" aria-hidden />
                <div>
                  <p className="text-sm text-text-muted">Order Date</p>
                  <p className="font-bold text-foreground">{new Date(orderDate).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl border border-border bg-surface-alt">
                <CreditCard size={18} className="text-brand-600 dark:text-brand-400 flex-shrink-0" aria-hidden />
                <div>
                  <p className="text-sm text-text-muted">Payment Method</p>
                  <p className="font-bold capitalize text-foreground">
                    {paymentMethod === "card" ? "Credit/Debit Card" : paymentMethod === "paypal" ? "PayPal" : "Cash on Delivery"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl border border-border bg-surface-alt">
                <ShoppingBag size={18} className="text-brand-600 dark:text-brand-400 flex-shrink-0" aria-hidden />
                <div>
                  <p className="text-sm text-text-muted">Total Items</p>
                  <p className="font-bold text-foreground">{items.length} Products</p>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-success-soft border border-success/20">
                <p className="text-sm text-success mb-1 flex items-center gap-2">
                  <Truck size={14} aria-hidden />
                  Estimated Delivery
                </p>
                <p className="font-extrabold text-xl text-foreground">{estimatedDelivery.toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="rounded-2xl border border-border bg-surface shadow-card p-6 mb-10">
          <h2 className="text-xl font-bold text-foreground mb-6">Order Items</h2>
          <div className="space-y-3">
            {items.map((item, index) => (
              <div key={index} className="flex items-center gap-4 p-4 rounded-xl border border-border bg-surface-alt">
                <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-surface flex-shrink-0">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground line-clamp-2 mb-1">{item.title}</h3>
                  <p className="text-sm text-text-muted">Quantity: <span className="text-foreground font-bold">{item.quantity}</span></p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-lg font-extrabold text-foreground">
                    {formatINR(item.price * item.quantity)}
                  </p>
                  <p className="text-sm text-text-muted">{formatINR(item.price)} each</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Price Summary */}
        <div className="rounded-2xl border border-border bg-surface shadow-card p-6 max-w-2xl mx-auto">
          <h2 className="text-xl font-bold text-foreground mb-6">Payment Summary</h2>
          <div className="space-y-3">
            <div className="flex justify-between text-foreground/90">
              <span className="text-text-muted">Subtotal</span>
              <span className="font-bold text-foreground">{formatINR(pricing.subtotal)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-muted">Delivery Fee</span>
              <span className="text-success font-bold">
                {pricing.deliveryFee === 0 ? "FREE" : formatINR(pricing.deliveryFee)}
              </span>
            </div>
            <div className="flex justify-between text-foreground/90">
              <span className="text-text-muted">Handling Fee</span>
              <span className="font-bold text-foreground">{formatINR(pricing.handlingFee)}</span>
            </div>
            <div className="h-px bg-border my-4"></div>
            <div className="flex justify-between items-center p-4 rounded-xl bg-brand-soft border border-brand-500/20">
              <span className="text-lg font-bold text-foreground">Grand Total</span>
              <span className="text-3xl font-black text-brand-600 dark:text-brand-400">
                {formatINR(pricing.grandTotal)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
