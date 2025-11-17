import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ArrowLeft,
  Save,
  Upload,
  X,
  Image as ImageIcon,
  Package,
  DollarSign,
  Tag,
  FileText,
  Percent,
  Box,
  AlertCircle,
} from "lucide-react";
import { getData } from "../../../context/DataContext";
import axios from "axios";

// Zod validation schema
const productSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title too long"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description too long"),
  price: z.number().min(0.01, "Price must be greater than 0"),
  stock: z.number().int().min(0, "Stock cannot be negative"),
  category: z.string().min(1, "Please select a category"),
  brand: z.string().min(1, "Brand is required"),
  discount: z
    .number()
    .min(0, "Discount cannot be negative")
    .max(100, "Discount cannot exceed 100%"),
});

const AddEditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const { categories, fetchCategories, getSingleProduct, singleProduct, fetchAllProducts } =
    getData();

  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      stock: 0,
      category: "",
      brand: "",
      discount: 0,
    },
  });

  useEffect(() => {
    fetchCategories();
    if (isEditMode && id) {
      loadProduct();
    }
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      await getSingleProduct(id);
    } catch (error) {
      console.error("Error loading product:", error);
      setSubmitError("Failed to load product");
    } finally {
      setLoading(false);
    }
  };

 useEffect(() => {
  if (isEditMode && singleProduct && categories.length) {
    reset({
      title: singleProduct.title || "",
      description: singleProduct.description || "",
      price: singleProduct.price || 0,
      stock: singleProduct.stock || 0,
      category:
        typeof singleProduct.category === "object"
          ? singleProduct.category._id
          : singleProduct.category || "",
      brand: singleProduct.brand || "",
      discount: singleProduct.discount || 0,
    });

    const images = Array.isArray(singleProduct.images)
      ? singleProduct.images
      : [singleProduct.images];
    setImagePreview(images);
    setUploadedImages(images);
  }
}, [singleProduct, isEditMode, reset, categories]);

  const handleImageUpload = (e) => {
  const files = Array.from(e.target.files);
  if (files.length === 0) return;

  // Just add the File objects directly to maintain consistency
  setImagePreview((prev) => [...prev, ...files]);
  setUploadedImages((prev) => [...prev, ...files]);
};

  const removeImage = (index) => {
    setImagePreview((prev) => prev.filter((_, i) => i !== index));
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data) => {
  // 🧩 Generate slug automatically
  data.slug = data.title ? data.title.toLowerCase().replace(/\s+/g, "-") : "";

  try {
    setLoading(true);
    setSubmitError("");

    // 🧾 Create FormData for upload
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("slug", data.slug);
    formData.append("stock", data.stock);
    formData.append("category", data.category);
    formData.append("brand", data.brand);
    formData.append("discount", data.discount);

    // 🖼️ Add images (only files, not URLs)
    uploadedImages.forEach((image) => {
      if (image instanceof File) {
        formData.append("images", image);
      }
    });

    console.log("📤 Submitting:", [...formData.entries()]);

    let res;

    if (isEditMode) {
  res = await axios.put(
    `http://localhost:5000/products/${id}`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );

  // Re-fetch updated product
  await getSingleProduct(id);

  // Reset form with new updated product
  reset({
    title: singleProduct.title || "",
    description: singleProduct.description || "",
    price: singleProduct.price || 0,
    stock: singleProduct.stock || 0,
    category:
      typeof singleProduct.category === "object"
        ? singleProduct.category._id
        : singleProduct.category || "",
    brand: singleProduct.brand || "",
    discount: singleProduct.discount || 0,
  });

  const images = Array.isArray(singleProduct.images)
    ? singleProduct.images
    : [singleProduct.images];

  setImagePreview(images);
  setUploadedImages(images);
} else {
      res = await axios.post("http://localhost:5000/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("✅ Product created:", res.data);

      // Clear after adding a new product
      reset();
      setImagePreview([]);
      setUploadedImages([]);
    }

    // ✅ Re-fetch latest products so frontend stays synced
    if (typeof fetchAllProducts === "function") {
      await fetchAllProducts();
    }

    // Navigate back to product list after add/edit
    navigate("/admin/products");

  } catch (error) {
    console.error("❌ Error saving product:", error);
    setSubmitError(
      error.response?.data?.message ||
      "Failed to save product. Please try again."
    );
  } finally {
    setLoading(false);
  }
};


  const watchedPrice = watch("price");
  const watchedDiscount = watch("discount");
  const finalPrice = watchedPrice - (watchedPrice * watchedDiscount) / 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="relative overflow-hidden bg-gradient-to-br from-red-600 via-red-500 to-pink-600 rounded-3xl shadow-2xl">
          <div className="absolute inset-0 bg-black opacity-5"></div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"></div>

          <div className="relative p-8">
            <button
              onClick={() => navigate("/admin/products")}
              className="flex items-center gap-2 text-white/90 hover:text-white mb-4 transition-colors group"
            >
              <ArrowLeft
                size={20}
                className="group-hover:-translate-x-1 transition-transform"
              />
              <span className="font-semibold">Back to Products</span>
            </button>

            <div className="flex items-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                <Package className="text-white" size={32} />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  {isEditMode ? "Edit Product" : "Add New Product"}
                </h1>
                <p className="text-red-100 mt-1">
                  {isEditMode
                    ? "Update product information"
                    : "Fill in the details to create a new product"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {submitError && (
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 flex items-start gap-3">
            <AlertCircle className="text-red-500 flex-shrink-0" size={24} />
            <div>
              <h4 className="font-bold text-red-900">Error</h4>
              <p className="text-red-700 text-sm">{submitError}</p>
            </div>
            <button
              onClick={() => setSubmitError("")}
              className="ml-auto text-red-500 hover:text-red-700"
            >
              <X size={20} />
            </button>
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit, (errors) => {
            console.log("🚨 Validation errors:", errors);
          })}
          className="space-y-6"
        >
          {/* Product Images */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-purple-100 p-3 rounded-xl">
                <ImageIcon className="text-purple-600" size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Product Images
                </h2>
                <p className="text-sm text-gray-500">
                  Upload product photos (max 5 images)
                </p>
              </div>
            </div>

            {/* Image Upload */}
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-red-500 transition-colors">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
                disabled={imagePreview.length >= 5}
              />
              <label
                htmlFor="image-upload"
                className={`cursor-pointer ${
                  imagePreview.length >= 5
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                <Upload className="mx-auto text-gray-400 mb-4" size={48} />
                <p className="text-gray-700 font-semibold mb-2">
                  Click to upload or drag and drop
                </p>
                <p className="text-sm text-gray-500">
                  PNG, JPG, WEBP up to 10MB
                </p>
              </label>
            </div>

            {/* Image Preview Grid */}
            {imagePreview.length > 0 && (
  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
    {imagePreview.map((img, index) => (
      <div key={index} className="relative group">
        <img
          src={
            typeof img === "string"
              ? img.startsWith("/uploads")
                ? `http://localhost:5000${img}` // backend URL
                : img // full URL or blob
              : URL.createObjectURL(img) // File object
          }
          alt={`Preview ${index + 1}`}
          className="w-full h-32 object-cover rounded-xl border-2 border-gray-200"
        />

        <button
          type="button"
          onClick={() => removeImage(index)}
          className="absolute -top-2 -right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:scale-110"
        >
          <X size={16} />
        </button>

        {index === 0 && (
          <span className="absolute bottom-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-lg font-bold">
            Main
          </span>
        )}
      </div>
    ))}
  </div>
)}
          </div>

          {/* Basic Information */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 p-3 rounded-xl">
                <FileText className="text-blue-600" size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Basic Information
                </h2>
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

          {/* Pricing & Inventory */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-100 p-3 rounded-xl">
                <DollarSign className="text-green-600" size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Pricing & Inventory
                </h2>
                <p className="text-sm text-gray-500">
                  Set price and stock levels
                </p>
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
                    <span className="font-semibold">
                      ${watchedPrice.toFixed(2)}
                    </span>
                  </div>
                  {watchedDiscount > 0 && (
                    <>
                      <div className="flex justify-between text-red-600">
                        <span>Discount ({watchedDiscount}%):</span>
                        <span className="font-semibold">
                          -$
                          {((watchedPrice * watchedDiscount) / 100).toFixed(2)}
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

          {/* Action Buttons */}
          <div className="flex gap-4 sticky bottom-4 bg-white rounded-2xl shadow-2xl p-4 border-2 border-gray-200">
            <button
              type="button"
              onClick={() => navigate("/admin/products")}
              className="flex-1 px-6 py-4 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl font-bold hover:scale-105 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save size={20} />
                  <span>
                    {isEditMode ? "Update Product" : "Create Product"}
                  </span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditProduct;
