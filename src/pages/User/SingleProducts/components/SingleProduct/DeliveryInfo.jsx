import React, { useState } from "react";
import { Truck, RotateCcw, Shield, MapPin, CheckCircle2, BadgeCheck } from "lucide-react";

const DeliveryInfo = () => {
  const [pincode, setPincode] = useState("");
  const [deliveryDate, setDeliveryDate] = useState(null);
  const [checked, setChecked] = useState(false);

  const checkDelivery = () => {
    if (pincode.length === 6) {
      const date = new Date();
      date.setDate(date.getDate() + 3);
      setDeliveryDate(date);
      setChecked(true);
    }
  };

  const services = [
    { icon: Truck, title: "Free Express Delivery", desc: "On orders over $50" },
    { icon: RotateCcw, title: "7 Days Easy Return", desc: "Hassle-free returns" },
    { icon: Shield, title: "Premium Warranty", desc: "Covered under warranty" },
  ];

  const isValid = pincode.length === 6;

  return (
    <div className="rounded-2xl border border-border bg-surface shadow-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider">
          Delivery Options
        </h3>
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-success">
          <BadgeCheck size={13} aria-hidden />
          COD Available
        </span>
      </div>

      <div className="flex gap-2.5 mb-3">
        <label htmlFor="pincode" className="sr-only">
          Enter pincode
        </label>
        <div className="relative flex-1">
          <MapPin
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-faint"
            aria-hidden
          />
          <input
            id="pincode"
            type="text"
            inputMode="numeric"
            placeholder="Enter Pincode"
            value={pincode}
            onChange={(e) => {
              setPincode(e.target.value.replace(/\D/g, "").slice(0, 6));
              setChecked(false);
            }}
            className="w-full rounded-lg border border-border bg-input-bg pl-9 pr-3.5 py-2.5 text-sm text-foreground placeholder:text-text-faint focus:border-brand-500"
          />
        </div>
        <button
          onClick={checkDelivery}
          disabled={!isValid}
          className="rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Check
        </button>
      </div>

      {checked && deliveryDate && (
        <div role="status" className="mb-4 p-4 rounded-xl bg-success-soft border border-success/20 animate-fade-in">
          <div className="flex items-center gap-2.5 text-success font-semibold mb-1">
            <Truck size={18} aria-hidden />
            <span>
              Delivery by{" "}
              {deliveryDate.toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-text-muted ml-8 flex-wrap">
            <span className="inline-flex items-center gap-1 font-semibold text-success">
              <CheckCircle2 size={13} aria-hidden />
              Free delivery
            </span>
            <span aria-hidden>•</span>
            <span>Cash on Delivery available</span>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {services.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="flex items-center gap-3.5 p-3 rounded-xl border border-border bg-surface-alt hover:border-brand-400 transition-colors"
          >
            <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-soft text-brand-600 dark:text-brand-400 flex-shrink-0">
              <Icon size={19} aria-hidden />
            </span>
            <div>
              <p className="font-semibold text-sm text-foreground">{title}</p>
              <p className="text-xs text-text-muted">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeliveryInfo;
