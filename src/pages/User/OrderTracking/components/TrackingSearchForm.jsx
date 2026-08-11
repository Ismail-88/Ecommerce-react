// components/tracking/TrackingSearchForm.jsx
import React from 'react';
import { Search } from 'lucide-react';

import Input from '../../../../components/ui/Input';
import Button from '../../../../components/ui/Button';

const TrackingSearchForm = ({ register, errors, onSubmit, loading }) => {
  return (
    <div className="rounded-lg border border-border bg-surface p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold text-foreground">Track Your Order</h2>
      <p className="text-sm text-text-muted mt-1 mb-6">
        Enter your Order ID to get real-time delivery updates
      </p>

      <form onSubmit={onSubmit} className="space-y-5">
        <div>
          <label htmlFor="orderId" className="block text-sm font-bold text-text-muted uppercase tracking-wider mb-2">
            Order ID *
          </label>
          <Input
            id="orderId"
            type="text"
            {...register("orderId")}
            placeholder="Enter your Order ID (e.g., COD-1234567890 or order_xxxx)"
            error={errors.orderId?.message}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-bold text-text-muted uppercase tracking-wider mb-2">
            Email Address (Optional)
          </label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            placeholder="Enter your email for verification"
            error={errors.email?.message}
          />
        </div>

        <Button type="submit" size="lg" className="w-full justify-center" loading={loading} disabled={loading}>
          {loading ? (
            <>Tracking...</>
          ) : (
            <>
              <Search size={18} aria-hidden />
              Track Order
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default TrackingSearchForm;
