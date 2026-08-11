import { useState } from "react";
import { FileText, Sparkles, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { api } from "../../../../context/DataContext";
import SectionCard from "../../../../components/ui/erp/SectionCard";
import Input from "../../../../components/ui/Input";
import Textarea from "../../../../components/ui/Textarea";
import Select from "../../../../components/ui/Select";

export const BasicInfoCard = ({ register, errors, setValue, watch, categories }) => {
  const [generating, setGenerating] = useState(false);
  const [generatingBrand, setGeneratingBrand] = useState(false);

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

  const generateBrand = async () => {
    const title = String(watch("title") || "").trim();
    if (title.length < 3) {
      toast.error("Please enter a product title first (min 3 characters).");
      return;
    }

    const categoryId = String(watch("category") || "");
    const category = categories?.find((c) => String(c._id) === categoryId)?.name || "";

    setGeneratingBrand(true);
    try {
      const res = await api.post("/api/ai/generate-brand", {
        title,
        category,
      });
      const brand = res.data?.brand || "";
      if (brand) {
        setValue("brand", brand, { shouldValidate: true });
        toast.success(`AI suggested brand: ${brand}`);
      }
    } catch (error) {
      console.error("AI generate brand error:", error);
      toast.error(
        error.response?.data?.error || "Failed to generate brand. Please try again."
      );
    } finally {
      setGeneratingBrand(false);
    }
  };

  return (
    <SectionCard
      icon={FileText}
      tone="info"
      title="General Info"
      description="Core product identity and description"
      action={
        <button
          type="button"
          onClick={generateDescription}
          disabled={generating}
          className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-3 py-2 text-xs font-semibold text-white hover:bg-brand-700 disabled:opacity-60 transition-colors"
        >
          {generating ? (
            <Loader2 size={13} className="animate-spin" aria-hidden />
          ) : (
            <Sparkles size={13} aria-hidden />
          )}
          {generating ? "Generating..." : "Generate with AI"}
        </button>
      }
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div className="md:col-span-2">
          <Input
            label="Product Title"
            required
            {...register("title")}
            error={errors.title?.message}
            success={Boolean(watch("title"))}
            placeholder="e.g., Premium Wireless Headphones"
          />
        </div>
        <Input
          label="Brand"
          required
          {...register("brand")}
          error={errors.brand?.message}
          success={Boolean(watch("brand"))}
          placeholder="e.g., Sony, Apple, Nike"
        />
        <button
          type="button"
          onClick={generateBrand}
          disabled={generatingBrand}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 disabled:opacity-60 transition-colors"
        >
          {generatingBrand ? (
            <Loader2 size={12} className="animate-spin" aria-hidden />
          ) : (
            <Sparkles size={12} aria-hidden />
          )}
          {generatingBrand ? "Suggesting brand..." : "Generate brand with AI"}
        </button>
        <Select
          label="Category"
          required
          {...register("category")}
          error={errors.category?.message}
          success={Boolean(watch("category"))}
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </Select>
        <div className="md:col-span-2">
          <Textarea
            label="Description"
            required
            rows={5}
            {...register("description")}
            error={errors.description?.message}
            success={(watch("description") || "").length >= 10}
            placeholder="Detailed product description..."
          />
        </div>
      </div>
    </SectionCard>
  );
};
