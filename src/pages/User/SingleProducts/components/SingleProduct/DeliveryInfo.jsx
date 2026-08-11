import React, { useState } from "react";
import { Truck, RotateCcw, MapPin, CheckCircle2, Banknote, ShieldCheck, BadgeCheck } from "lucide-react";

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
    { icon: Truck, title: "Free Delivery", desc: "On orders over ₹499" },
    { icon: RotateCcw, title: "7 Days Return", desc: "Hassle-free returns" },
    { icon: Banknote, title: "COD Available", desc: "Pay at your door" },
    { icon: ShieldCheck, title: "1-Yr Warranty", desc: "Genuine products" },
  ];

  const isValid = pincode.length === 6;

  return (
    <div className="bg-surface border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-foreground">Delivery Options</h3>
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
          <MapPin size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-faint" aria-hidden />
          <input
            id="pincode"
            type="text"
            inputMode="numeric"
            placeholder="Enter delivery pincode"
            value={pincode}
            onChange={(e) => {
              setPincode(e.target.value.replace(/\D/g, "").slice(0, 6));
              setChecked(false);
            }}
            className="w-full rounded-md border border-border bg-input-bg pl-9 pr-3.5 py-2.5 text-sm text-foreground placeholder:text-text-faint focus:border-brand-500"
          />
        </div>
        <button
          onClick={checkDelivery}
          disabled={!isValid}
          className="rounded-md bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Check
        </button>
      </div>

      {checked && deliveryDate && (
        <div role="status" className="mb-4 p-4 rounded-md bg-success-soft border border-success/20 animate-fade-in">
          <div className="flex items-center gap-2.5 text-success font-semibold mb-1">
            <Truck size={18} aria-hidden />
            <span>
              Delivery by{" "}
              {deliveryDate.toLocaleDateString("en-IN", {
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

      <div className="grid grid-cols-2 gap-2.5">
        {services.map((service) => {
          const ServiceIcon = service.icon;
          return (
            <div key={service.title} className="flex items-center gap-2.5 rounded-md bg-surface-alt px-3 py-2.5">
              <span className="flex items-center justify-center w-9 h-9 rounded-md bg-primary-soft text-brand-600 dark:text-brand-400 flex-shrink-0">
                <ServiceIcon size={17} aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="font-semibold text-[13px] text-foreground truncate">{service.title}</p>
                <p className="text-[11px] text-text-muted truncate">{service.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DeliveryInfo;
