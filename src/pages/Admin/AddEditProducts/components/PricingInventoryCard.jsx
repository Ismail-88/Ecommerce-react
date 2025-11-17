import { DollarSign, Box, Percent, Tag, AlertCircle } from "lucide-react";

export const PricingInventoryCard = ({
  register,
  errors,
  categories,
  watchedPrice,
  watchedDiscount,
  finalPrice,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-green-100 p-3 rounded-xl">
          <DollarSign className="text-green-600" size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Pricing & Inventory</h2>
          <p className="text-sm text-gray-500">Set price and stock levels</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Price */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-gray-700">
            Price ($) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <DollarSign
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="number"
              step="0.01"
              {...register("price", { valueAsNumber: true })}
              className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl outline-none transition-all ${
                errors.price
                  ? "border-red-500 focus:ring-2 focus:ring-red-200"
                  : "border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200"
              }`}
              placeholder="0.00"
            />
          </div>
          {errors.price && (
            <p className="text-red-500 text-sm flex items-center gap-1">
              <AlertCircle size={14} />
              {errors.price.message}
            </p>
          )}
        </div>

        {/* Stock */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-gray-700">
            Stock Quantity <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Box
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="number"
              {...register("stock", { valueAsNumber: true })}
              className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl outline-none transition-all ${
                errors.stock
                  ? "border-red-500 focus:ring-2 focus:ring-red-200"
                  : "border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200"
              }`}
              placeholder="0"
            />
          </div>
          {errors.stock && (
            <p className="text-red-500 text-sm flex items-center gap-1">
              <AlertCircle size={14} />
              {errors.stock.message}
            </p>
          )}
        </div>

        {/* Discount */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-gray-700">
            Discount (%)
          </label>
          <div className="relative">
            <Percent
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="number"
              step="0.01"
              {...register("discount", { valueAsNumber: true })}
              className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl outline-none transition-all ${
                errors.discount
                  ? "border-red-500 focus:ring-2 focus:ring-red-200"
                  : "border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200"
              }`}
              placeholder="0"
            />
          </div>
          {errors.discount && (
            <p className="text-red-500 text-sm flex items-center gap-1">
              <AlertCircle size={14} />
              {errors.discount.message}
            </p>
          )}
        </div>

        {/* Category */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-gray-700">
            Category <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Tag
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <select
              {...register("category")}
              className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl outline-none appearance-none bg-white cursor-pointer transition-all ${
                errors.category
                  ? "border-red-500 focus:ring-2 focus:ring-red-200"
                  : "border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200"
              }`}
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
            <p className="text-red-500 text-sm flex items-center gap-1">
              <AlertCircle size={14} />
              {errors.category.message}
            </p>
          )}
        </div>
      </div>

      {/* Price Preview */}
      {watchedPrice > 0 && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6">
          <h3 className="font-bold text-gray-900 mb-4">Price Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>Original Price:</span>
              <span className="font-semibold">${watchedPrice.toFixed(2)}</span>
            </div>
            {watchedDiscount > 0 && (
              <>
                <div className="flex justify-between text-red-600">
                  <span>Discount ({watchedDiscount}%):</span>
                  <span className="font-semibold">
                    -${((watchedPrice * watchedDiscount) / 100).toFixed(2)}
                  </span>
                </div>
                <div className="border-t-2 border-green-300 pt-2 flex justify-between text-lg font-bold text-green-700">
                  <span>Final Price:</span>
                  <span>${finalPrice.toFixed(2)}</span>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};