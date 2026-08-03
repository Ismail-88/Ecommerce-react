import React from "react";
import { Truck } from "lucide-react";
import Card from "../../../../components/ui/Card";
import Input from "../../../../components/ui/Input";

const ShippingForm = ({ register, errors }) => {
  return (
    <Card className="!p-6 md:!p-8">
      <div className="flex items-center gap-3 mb-6">
        <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-primary-soft text-brand-600 dark:text-brand-400">
          <Truck size={22} aria-hidden />
        </span>
        <h2 className="text-xl md:text-2xl font-bold text-foreground">Shipping Information</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="md:col-span-2">
          <Input label="Full Name" placeholder="John Doe" autoComplete="name" {...register("fullName")} error={errors.fullName?.message} required />
        </div>

        <Input label="Email Address" type="email" placeholder="john@example.com" autoComplete="email" {...register("email")} error={errors.email?.message} required />

        <Input label="Phone Number" type="tel" placeholder="+1 234 567 8900" autoComplete="tel" {...register("phone")} error={errors.phone?.message} required />

        <div className="md:col-span-2">
          <Input label="Street Address" placeholder="123 Main Street, Apt 4B" autoComplete="street-address" {...register("address")} error={errors.address?.message} required />
        </div>

        <Input label="City" placeholder="New York" autoComplete="address-level2" {...register("city")} error={errors.city?.message} required />

        <Input label="State" placeholder="NY" autoComplete="address-level1" {...register("state")} error={errors.state?.message} required />

        <Input label="Zip Code" placeholder="10001" autoComplete="postal-code" {...register("zipCode")} error={errors.zipCode?.message} required />

        <Input label="Country" placeholder="United States" autoComplete="country-name" {...register("country")} error={errors.country?.message} required />
      </div>
    </Card>
  );
};

export default ShippingForm;
