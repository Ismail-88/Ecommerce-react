// components/tracking/TrackingSearchForm.jsx
import React from 'react';
import { Search, Package, Mail } from 'lucide-react';

import Input from '../../../../components/ui/Input';
import Button from '../../../../components/ui/Button';

const TrackingSearchForm = ({ register, errors, onSubmit, loading }) => {
  return (
    <div className="rounded-2xl border border-border bg-surface shadow-card p-8 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-brand-600 text-white">
          <Package size={24} aria-hidden />
        </span>
        <h2 className="text-2xl font-bold text-foreground">Track Your Order</h2>
      </div>

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
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-faint" aria-hidden />
            <input
              id="email"
              type="email"
              {...register("email")}
              placeholder="Enter your email for verification"
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-text-faint focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-all"
            />
          </div>
          {errors.email && (
            <p className="text-danger text-sm mt-2">{errors.email.message}</p>
          )}
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
