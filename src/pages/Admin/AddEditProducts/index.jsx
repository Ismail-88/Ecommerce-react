import { useState } from "react";
import { useParams } from "react-router-dom";
import { FileText, DollarSign, ImageIcon, Palette, ClipboardCheck, Check } from "lucide-react";
import useAddEditProduct from "./hooks/useAddEditProduct";
import { ProductHeader } from "./components/ProductHeader";
import { ErrorAlert } from "./components/ErrorAlert";
import { ImageUploadCard } from "./components/ImageUploadCard";
import { BasicInfoCard } from "./components/BasicInfoCard";
import { PricingInventoryCard } from "./components/PricingInventoryCard";
import { FormActionButtons } from "./components/FormActionButtons";
import { ReviewSummary } from "./components/ReviewSummary";
import { ColorVariantsCard } from "../../../components/ColorVariantsCard";
import { FullPageSpinner } from "../../../components/ui/Spinner";

const steps = [
  { label: "Details", icon: FileText },
  { label: "Pricing", icon: DollarSign },
  { label: "Media", icon: ImageIcon },
  { label: "Colors", icon: Palette, optional: true },
  { label: "Review", icon: ClipboardCheck },
];

const AddEditProduct = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const {
    register,
    handleSubmit,
    trigger,
    errors,
    loading,
    imagePreview,
    submitError,
    setSubmitError,
    handleImageUpload,
    removeImage,
    moveImage,
    onSubmit,
    watchedPrice,
    watchedDiscount,
    watchedStock,
    finalPrice,
    categories,
    colors,
    setColors,
    setValue,
    watch,
  } = useAddEditProduct(id, isEditMode);

  const [activeStep, setActiveStep] = useState(0);
  const watched = watch();

  const isStepComplete = (i) => {
    if (i === 0)
      return Boolean(watched.title && watched.brand && watched.category && watched.description);
    if (i === 1) return !Number.isNaN(Number(watched.price)) && !Number.isNaN(Number(watched.stock));
    if (i === 2) return imagePreview.length > 0;
    if (i === 3) return true; // optional step — always skippable
    return true;
  };

  const goNext = async () => {
    const fieldsByStep = {
      0: ["title", "description", "brand", "category"],
      1: ["price", "stock", "discount"],
    };
    const fields = fieldsByStep[activeStep];
    if (fields) {
      const valid = await trigger(fields);
      if (!valid) return;
    }
    setActiveStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const goBack = () => setActiveStep((s) => Math.max(s - 1, 0));

  if (loading && isEditMode) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <FullPageSpinner label="Loading Product..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent">
      <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-5">
        <ProductHeader isEditMode={isEditMode} />
        <ErrorAlert error={submitError} onClose={() => setSubmitError("")} />

        {/* Stepper */}
        <ol className="flex items-center gap-2 sm:gap-3" aria-label="Product form steps">
          {steps.map((step, i) => {
            const StepIcon = step.icon;
            const complete = isStepComplete(i);
            const active = i === activeStep;
            const reachable = i <= activeStep;
            return (
              <li key={step.label} className="flex items-center gap-2 sm:gap-3 flex-1 last:flex-none">
                <button
                  type="button"
                  onClick={() => reachable && setActiveStep(i)}
                  disabled={!reachable}
                  className={`flex items-center gap-2 group ${
                    reachable ? "cursor-pointer" : "cursor-not-allowed"
                  }`}
                  aria-current={active ? "step" : undefined}
                >
                  <span
                    className={`flex items-center justify-center w-8 h-8 rounded-full border text-xs font-bold transition-colors duration-150 ${
                      active
                        ? "bg-brand-600 border-brand-600 text-white shadow-sm shadow-brand-600/20"
                        : complete
                        ? "bg-success/10 border-success text-success"
                        : "border-border bg-surface-alt text-text-faint"
                    }`}
                  >
                    {complete && !active ? <Check size={15} aria-hidden /> : <StepIcon size={15} aria-hidden />}
                  </span>
                  <span
                    className={`hidden sm:block text-sm font-medium ${
                      active ? "text-foreground" : complete ? "text-text-secondary" : "text-text-faint"
                    }`}
                  >
                    {step.label}
                    {step.optional && (
                      <span className="ml-1 text-[11px] font-normal text-text-faint">
                        (Optional)
                      </span>
                    )}
                  </span>
                </button>
                {i < steps.length - 1 && (
                  <span
                    className={`h-px flex-1 ${complete ? "bg-success" : "bg-border"}`}
                    aria-hidden
                  />
                )}
              </li>
            );
          })}
        </ol>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
          noValidate
        >
          {activeStep === 0 && (
            <BasicInfoCard
              register={register}
              errors={errors}
              setValue={setValue}
              watch={watch}
              categories={categories}
            />
          )}

          {activeStep === 1 && (
            <PricingInventoryCard
              register={register}
              errors={errors}
              watchedPrice={watchedPrice}
              watchedDiscount={watchedDiscount}
              watchedStock={watchedStock}
              finalPrice={finalPrice}
            />
          )}

          {activeStep === 2 && (
            <ImageUploadCard
              imagePreview={imagePreview}
              onImageUpload={handleImageUpload}
              onRemoveImage={removeImage}
              onMoveImage={moveImage}
            />
          )}

          {activeStep === 3 && (
            <ColorVariantsCard colors={colors} setColors={setColors} />
          )}

          {activeStep === 4 && (
            <ReviewSummary
              watched={watched}
              finalPrice={finalPrice}
              imageCount={imagePreview.length}
              colorsCount={colors.length}
              categories={categories}
            />
          )}

          <FormActionButtons
            activeStep={activeStep}
            totalSteps={steps.length}
            onBack={goBack}
            onNext={goNext}
            loading={loading}
            isEditMode={isEditMode}
          />
        </form>
      </div>
    </div>
  );
};

export default AddEditProduct;
