import React from "react";
import { CreditCard, Banknote, ShieldCheck } from "lucide-react";
import Card from "../../../../components/ui/Card";

const PaymentMethodSelector = ({ register, errors, paymentMethod }) => {
  const optionClass = (active) =>
    `relative flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
      active
        ? "border-brand-600 bg-primary-soft"
        : "border-border hover:border-border-strong bg-surface-alt"
    }`;

  const radioClass = (active) =>
    `flex items-center justify-center w-5 h-5 rounded-full border-2 transition-all ${
      active ? "border-brand-600" : "border-border-strong"
    }`;

  return (
    <Card className="!p-6 md:!p-8">
      <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6">Payment Method</h2>

      <div className="space-y-4">
        {/* Pay Online */}
        <label className={optionClass(paymentMethod === "razorpay")}>
          <input type="radio" value="razorpay" {...register("paymentMethod")} className="sr-only" />
          <span className={radioClass(paymentMethod === "razorpay")}>
            {paymentMethod === "razorpay" && <span className="w-2 h-2 bg-brand-600 rounded-full" />}
          </span>
          <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-primary-soft text-brand-600 dark:text-brand-400 flex-shrink-0">
            <CreditCard size={20} aria-hidden />
          </span>
          <span className="flex-1">
            <span className="font-bold block text-foreground">Pay Online</span>
            <span className="text-xs text-text-muted">Card • UPI • Net Banking • Wallets</span>
          </span>
        </label>

        {paymentMethod === "razorpay" && (
          <div className="ml-6 p-5 rounded-xl border border-border bg-surface-alt animate-fade-in">
            <div className="flex items-start gap-3">
              <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-success-soft text-success flex-shrink-0">
                <ShieldCheck size={18} aria-hidden />
              </span>
              <div>
                <h4 className="font-bold text-foreground mb-1.5">Secure Payment Gateway</h4>
                <p className="text-sm text-text-muted leading-relaxed mb-2.5">
                  You'll be redirected to Razorpay's secure payment page. Choose from:
                </p>
                <ul className="space-y-1.5 text-sm text-text-muted">
                  <li>• Credit/Debit Cards (Visa, Mastercard, RuPay)</li>
                  <li>• UPI (PhonePe, Google Pay, Paytm, BHIM)</li>
                  <li>• Net Banking (All major banks)</li>
                  <li>• Wallets (Paytm, PhonePe, Mobikwik)</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Cash on Delivery */}
        <label className={optionClass(paymentMethod === "cod")}>
          <input type="radio" value="cod" {...register("paymentMethod")} className="sr-only" />
          <span className={radioClass(paymentMethod === "cod")}>
            {paymentMethod === "cod" && <span className="w-2 h-2 bg-brand-600 rounded-full" />}
          </span>
          <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-success-soft text-success flex-shrink-0">
            <Banknote size={20} aria-hidden />
          </span>
          <span className="flex-1">
            <span className="font-bold block text-foreground">Cash on Delivery</span>
            <span className="text-xs text-text-muted">Pay when you receive</span>
          </span>
        </label>

        {paymentMethod === "cod" && (
          <div className="ml-6 p-5 rounded-xl border border-border bg-surface-alt animate-fade-in">
            <div className="flex items-start gap-3">
              <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-success-soft text-success flex-shrink-0">
                <Banknote size={18} aria-hidden />
              </span>
              <div>
                <h4 className="font-bold text-foreground mb-1.5">Pay on Delivery</h4>
                <p className="text-sm text-text-muted">
                  Pay with cash when your order is delivered. Additional handling fee may apply.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {errors.paymentMethod && (
        <p className="text-danger text-sm mt-4">{errors.paymentMethod.message}</p>
      )}
    </Card>
  );
};

export default PaymentMethodSelector;
