import { useState } from "react";
import { FileText, AlertCircle, Sparkles, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { api } from "../../../../context/DataContext";

export const BasicInfoCard = ({ register, errors, setValue, watch, categories }) => {
  const [generating, setGenerating] = useState(false);

  const inputClass = (hasError) =>
    `w-full px-4 py-3 border rounded-xl outline-none transition-all ${
      hasError
        ? "border-danger focus:ring-2 focus:ring-danger/20"
        : "border-border bg-background text-foreground focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
    }`;

  const generateDescription = async () => {
    const title = String(watch("title") || "").trim();
    if (title.length < 3) {
      toast.error("Please enter a product title first (min 3 characters).");
      return;
    }

    const brand = String(watch("brand") || "").trim();
    const categoryId = String(watch("category") || "");
    const category = categories?.find((c) => String(c._id) === categoryId)?.name || "";
    const rawPrice = watch("price");

    setGenerating(true);
    try {
      const res = await api.post("/api/ai/generate-description", {
        title,
        brand,
        category,
        price: rawPrice ? Number(rawPrice) : undefined,
      });
      const description = res.data?.description || "";
      setValue("description", description);
      toast.success("AI description generated!");
    } catch (error) {
      console.error("AI generate description error:", error);
      toast.error(
        error.response?.data?.error || "Failed to generate description. Please try again."
      );
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="bg-surface rounded-2xl border border-border shadow-card p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-info-soft text-info">
          <FileText size={24} aria-hidden />
        </span>
        <div>
          <h2 className="text-xl font-bold text-foreground">Basic Information</h2>
          <p className="text-sm text-text-muted">Enter product details</p>
        </div>
      </div>

      {/* Title */}
      <div className="space-y-2">
        <label className="block text-sm font-bold text-foreground">
          Product Title <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          {...register("title")}
          className={inputClass(Boolean(errors.title))}
          placeholder="e.g., Premium Wireless Headphones"
        />
        {errors.title && (
          <p className="text-danger text-sm flex items-center gap-1">
            <AlertCircle size={14} aria-hidden />
            {errors.title.message}
          </p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-3">
          <label className="block text-sm font-bold text-foreground">
            Description <span className="text-danger">*</span>
          </label>
          <button
            type="button"
            onClick={generateDescription}
            disabled={generating}
            className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-600 px-3 py-1.5 text-xs font-bold text-white hover:opacity-90 active:scale-95 transition-all disabled:opacity-50"
          >
            {generating ? (
              <Loader2 size={13} className="animate-spin" aria-hidden />
            ) : (
              <Sparkles size={13} aria-hidden />
            )}
            {generating ? "Generating..." : "Generate with AI"}
          </button>
        </div>
        <textarea
          {...register("description")}
          rows={5}
          className={`${inputClass(Boolean(errors.description))} resize-none`}
          placeholder="Detailed product description..."
        />
        {errors.description && (
          <p className="text-danger text-sm flex items-center gap-1">
            <AlertCircle size={14} aria-hidden />
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Brand */}
      <div className="space-y-2">
        <label className="block text-sm font-bold text-foreground">
          Brand <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          {...register("brand")}
          className={inputClass(Boolean(errors.brand))}
          placeholder="e.g., Sony, Apple, Nike"
        />
        {errors.brand && (
          <p className="text-danger text-sm flex items-center gap-1">
            <AlertCircle size={14} aria-hidden />
            {errors.brand.message}
          </p>
        )}
      </div>
    </div>
  );
};
