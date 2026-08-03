import { DollarSign, Box, Percent, Tag, AlertCircle } from "lucide-react";
import { formatINR } from "../../../../utils/formatCurrency";

export const PricingInventoryCard = ({
  register,
  errors,
  categories,
  watchedPrice,
  watchedDiscount,
  finalPrice,
}) => {
  const inputClass = (hasError) =>
    `w-full pl-11 pr-4 py-3 border rounded-xl outline-none transition-all ${
      hasError
        ? "border-danger focus:ring-2 focus:ring-danger/20"
        : "border-border bg-background text-foreground focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
    }`;

  return (
    <div className="bg-surface rounded-2xl border border-border shadow-card p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-success-soft text-success">
          <DollarSign size={24} aria-hidden />
        </span>
        <div>
          <h2 className="text-xl font-bold text-foreground">Pricing & Inventory</h2>
          <p className="text-sm text-text-muted">Set price and stock levels</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Price */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-foreground">
            Price ($) <span className="text-danger">*</span>
          </label>
          <div className="relative">
            <DollarSign
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-faint"
              size={20}
              aria-hidden
            />
            <input
              type="number"
              step="0.01"
              {...register("price", { valueAsNumber: true })}
              className={inputClass(Boolean(errors.price))}
              placeholder="0.00"
            />
          </div>
          {errors.price && (
            <p className="text-danger text-sm flex items-center gap-1">
              <AlertCircle size={14} aria-hidden />
              {errors.price.message}
            </p>
          )}
        </div>

        {/* Stock */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-foreground">
            Stock Quantity <span className="text-danger">*</span>
          </label>
          <div className="relative">
            <Box
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-faint"
              size={20}
              aria-hidden
            />
            <input
              type="number"
              {...register("stock", { valueAsNumber: true })}
              className={inputClass(Boolean(errors.stock))}
              placeholder="0"
            />
          </div>
          {errors.stock && (
            <p className="text-danger text-sm flex items-center gap-1">
              <AlertCircle size={14} aria-hidden />
              {errors.stock.message}
            </p>
          )}
        </div>

        {/* Discount */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-foreground">
            Discount (%)
          </label>
          <div className="relative">
            <Percent
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-faint"
              size={20}
              aria-hidden
            />
            <input
              type="number"
              step="0.01"
              {...register("discount", { valueAsNumber: true })}
              className={inputClass(Boolean(errors.discount))}
              placeholder="0"
            />
          </div>
          {errors.discount && (
            <p className="text-danger text-sm flex items-center gap-1">
              <AlertCircle size={14} aria-hidden />
              {errors.discount.message}
            </p>
          )}
        </div>

        {/* Category */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-foreground">
            Category <span className="text-danger">*</span>
          </label>
          <div className="relative">
            <Tag
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-faint"
              size={20}
              aria-hidden
            />
            <select
              {...register("category")}
              className={`${inputClass(Boolean(errors.category))} appearance-none cursor-pointer`}
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          {errors.category && (
            <p className="text-danger text-sm flex items-center gap-1">
              <AlertCircle size={14} aria-hidden />
              {errors.category.message}
            </p>
          )}
        </div>
      </div>

      {/* Price Preview */}
      {watchedPrice > 0 && (
        <div className="bg-success-soft border border-success/20 rounded-2xl p-6">
          <h3 className="font-bold text-foreground mb-4">Price Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-text-muted">
              <span>Original Price:</span>
              <span className="font-semibold text-foreground">{formatINR(watchedPrice)}</span>
            </div>
            {watchedDiscount > 0 && (
              <>
                <div className="flex justify-between text-danger">
                  <span>Discount ({watchedDiscount}%):</span>
                  <span className="font-semibold">
                    -{formatINR((watchedPrice * watchedDiscount) / 100)}
                  </span>
                </div>
                <div className="border-t border-success/30 pt-2 flex justify-between text-lg font-bold text-success">
                  <span>Final Price:</span>
                  <span>{formatINR(finalPrice)}</span>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
