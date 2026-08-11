import { DollarSign } from "lucide-react";
import { formatINR } from "../../../../utils/formatCurrency";
import SectionCard from "../../../../components/ui/erp/SectionCard";
import Input from "../../../../components/ui/Input";

export const PricingInventoryCard = ({
  register,
  errors,
  watchedPrice,
  watchedDiscount,
  watchedStock,
  finalPrice,
}) => {
  return (
    <SectionCard
      icon={DollarSign}
      tone="success"
      title="Pricing & Stock"
      description="Set price, discount and inventory levels"
    >
      <div className="grid gap-5 md:grid-cols-3">
        <Input
          label="Price"
          required
          type="number"
          step="0.01"
          {...register("price", { valueAsNumber: true })}
          error={errors.price?.message}
          success={watchedPrice > 0}
          placeholder="0.00"
        />
        <Input
          label="Discount (%)"
          type="number"
          step="0.01"
          {...register("discount", { valueAsNumber: true })}
          error={errors.discount?.message}
          success={watchedDiscount > 0}
          placeholder="0"
        />
        <Input
          label="Stock Quantity"
          required
          type="number"
          {...register("stock", { valueAsNumber: true })}
          error={errors.stock?.message}
          success={!Number.isNaN(watchedStock)}
          placeholder="0"
        />
      </div>

      {watchedPrice > 0 && (
        <div className="mt-5 rounded-lg border border-success/20 bg-success-soft px-5 py-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-success mb-3">
            Price Summary
          </h3>
          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between text-text-secondary">
              <span>Original Price</span>
              <span className="font-semibold text-foreground">{formatINR(watchedPrice)}</span>
            </div>
            {watchedDiscount > 0 && (
              <>
                <div className="flex justify-between text-danger">
                  <span>Discount ({watchedDiscount}%)</span>
                  <span className="font-semibold">
                    −{formatINR((watchedPrice * watchedDiscount) / 100)}
                  </span>
                </div>
                <div className="border-t border-success/30 pt-1.5 flex justify-between font-bold text-success">
                  <span>Final Price</span>
                  <span>{formatINR(finalPrice)}</span>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </SectionCard>
  );
};
