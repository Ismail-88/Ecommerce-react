import { useNavigate, useParams } from "react-router-dom";
import useAddEditProduct from "./hooks/useAddEditProduct";
import { ToastContainer } from "react-toastify";
import { ProductHeader } from "./components/ProductHeader";
import { ErrorAlert } from "./components/ErrorAlert";
import { ImageUploadCard } from "./components/ImageUploadCard";
import { BasicInfoCard } from "./components/BasicInfoCard";
import { PricingInventoryCard } from "./components/PricingInventoryCard";
import { FormActionButtons } from "./components/FormActionButtons";
import { ColorVariantsCard } from "../../../components/ColorVariantsCard";
import { useTheme } from "../../../context/ThemeContext";
import { FullPageSpinner } from "../../../components/ui/Spinner";

const AddEditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const { isDark } = useTheme();

  const {
    register,
    handleSubmit,
    errors,
    loading,
    imagePreview,
    uploadedImages,
    submitError,
    setSubmitError,
    handleImageUpload,
    removeImage,
    onSubmit,
    watchedPrice,
    watchedDiscount,
    finalPrice,
    categories,
    colors,
    setColors,
    setValue,
    watch,
  } = useAddEditProduct(id, isEditMode);

  if (loading && isEditMode) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <FullPageSpinner label="Loading Product..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent">
      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={isDark ? "dark" : "light"}
      />

      <div className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8 space-y-6">
        {/* Header */}
        <ProductHeader isEditMode={isEditMode} />

        {/* Error Alert */}
        <ErrorAlert error={submitError} onClose={() => setSubmitError("")} />

        <form
          onSubmit={handleSubmit(onSubmit, (errors) => {
            console.log("Validation errors:", errors);
          })}
          className="space-y-6"
        >
          {/* Product Images */}
          <ImageUploadCard
            imagePreview={imagePreview}
            onImageUpload={handleImageUpload}
            onRemoveImage={removeImage}
          />

          {/* Basic Information */}
          <BasicInfoCard
            register={register}
            errors={errors}
            setValue={setValue}
            watch={watch}
            categories={categories}
          />

          {/* Pricing & Inventory */}
          <PricingInventoryCard
            register={register}
            errors={errors}
            categories={categories}
            watchedPrice={watchedPrice}
            watchedDiscount={watchedDiscount}
            finalPrice={finalPrice}
          />

          {/* Color Variants Card */}
          <ColorVariantsCard colors={colors} setColors={setColors} />

          {/* Action Buttons */}
          <FormActionButtons loading={loading} isEditMode={isEditMode} />
        </form>
      </div>
    </div>
  );
};

export default AddEditProduct;
