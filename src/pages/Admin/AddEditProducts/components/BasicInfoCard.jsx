import { FileText, AlertCircle } from "lucide-react";

export const BasicInfoCard = ({ register, errors }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-blue-100 p-3 rounded-xl">
          <FileText className="text-blue-600" size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Basic Information</h2>
          <p className="text-sm text-gray-500">Enter product details</p>
        </div>
      </div>

      {/* Title */}
      <div className="space-y-2">
        <label className="block text-sm font-bold text-gray-700">
          Product Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register("title")}
          className={`w-full px-4 py-3 border-2 rounded-xl outline-none transition-all ${
            errors.title
              ? "border-red-500 focus:ring-2 focus:ring-red-200"
              : "border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200"
          }`}
          placeholder="e.g., Premium Wireless Headphones"
        />
        {errors.title && (
          <p className="text-red-500 text-sm flex items-center gap-1">
            <AlertCircle size={14} />
            {errors.title.message}
          </p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="block text-sm font-bold text-gray-700">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register("description")}
          rows={5}
          className={`w-full px-4 py-3 border-2 rounded-xl outline-none transition-all resize-none ${
            errors.description
              ? "border-red-500 focus:ring-2 focus:ring-red-200"
              : "border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200"
          }`}
          placeholder="Detailed product description..."
        />
        {errors.description && (
          <p className="text-red-500 text-sm flex items-center gap-1">
            <AlertCircle size={14} />
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Brand */}
      <div className="space-y-2">
        <label className="block text-sm font-bold text-gray-700">
          Brand <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register("brand")}
          className={`w-full px-4 py-3 border-2 rounded-xl outline-none transition-all ${
            errors.brand
              ? "border-red-500 focus:ring-2 focus:ring-red-200"
              : "border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200"
          }`}
          placeholder="e.g., Sony, Apple, Nike"
        />
        {errors.brand && (
          <p className="text-red-500 text-sm flex items-center gap-1">
            <AlertCircle size={14} />
            {errors.brand.message}
          </p>
        )}
      </div>
    </div>
  );
};