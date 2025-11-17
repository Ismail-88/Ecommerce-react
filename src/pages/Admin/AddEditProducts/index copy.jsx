
import { useNavigate, useParams } from "react-router-dom";

import useAddEditProduct from "./hooks/useAddEditProduct";
import { ToastContainer } from "react-toastify";
import { ProductHeader } from "./components/ProductHeader";
import { ErrorAlert } from "./components/ErrorAlert";
import { ImageUploadCard } from "./components/ImageUploadCard";
import { BasicInfoCard } from "./components/BasicInfoCard";
import { PricingInventoryCard } from "./components/PricingInventoryCard";
import { FormActionButtons } from "./components/FormActionButtons";



const AddEditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

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
  } = useAddEditProduct(id, isEditMode)

  if (loading && isEditMode) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold text-lg">Loading Product...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
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
        theme="light"
      />

      <div className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8 space-y-6">
        {/* Header */}
        <ProductHeader isEditMode={isEditMode}/>

        {/* Error Alert */}
        <ErrorAlert error={submitError} onClose={() => setSubmitError("")}/>

        <form
          onSubmit={handleSubmit(onSubmit, (errors) => {
            console.log("🚨 Validation errors:", errors);
          })}
          className="space-y-6"
        >
          {/* Product Images */}
          
           <ImageUploadCard imagePreview={imagePreview} onImageUpload={handleImageUpload} onRemoveImage={removeImage}/>
          {/* Basic Information */}
            <BasicInfoCard register={register} errors={errors} />

          {/* Pricing & Inventory */}
          <PricingInventoryCard
            register={register}
            errors={errors}
            categories={categories}
            watchedPrice={watchedPrice}
            watchedDiscount={watchedDiscount}
            finalPrice={finalPrice}
          />

          {/* Action Buttons */}
          <FormActionButtons loading={loading} isEditMode={isEditMode} />
        </form>
      </div>
    </div>
  );
};

export default AddEditProduct;
