import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import z from 'zod';
import { api, getData } from '../../../../context/DataContext';


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
const useAddEditProduct = (productId, isEditMode) => {
  const navigate = useNavigate();
  const { categories, fetchCategories, getSingleProduct, singleProduct, fetchAllProducts } = getData();

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
    if (isEditMode && productId) {
      loadProduct();
    }
  }, [productId]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      await getSingleProduct(productId);
      toast.success("Product loaded successfully!");
    } catch (error) {
      console.error("Error loading product:", error);
      toast.error("Failed to load product");
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

    if (files.length + imagePreview.length > 5) {
      toast.warning("Maximum 5 images allowed!");
      return;
    }

    setImagePreview((prev) => [...prev, ...files]);
    setUploadedImages((prev) => [...prev, ...files]);
    toast.success(`${files.length} image(s) uploaded!`);
  };

  const removeImage = (index) => {
    setImagePreview((prev) => prev.filter((_, i) => i !== index));
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
    toast.info("Image removed");
  };

  const onSubmit = async (data) => {
    data.slug = data.title ? data.title.toLowerCase().replace(/\s+/g, "-") : "";

    try {
      setLoading(true);
      setSubmitError("");

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("slug", data.slug);
      formData.append("stock", data.stock);
      formData.append("category", data.category);
      formData.append("brand", data.brand);
      formData.append("discount", data.discount);

      uploadedImages.forEach((image) => {
        if (image instanceof File) {
          formData.append("images", image);
        }
      });

      let res;

      if (isEditMode) {
        res = await api.put(
          `/products/${productId}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        await getSingleProduct(productId);

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

        toast.success("🎉 Product updated successfully!");
      } else {
        res = await api.post("/products", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        reset();
        setImagePreview([]);
        setUploadedImages([]);

        toast.success("🎉 Product created successfully!");
      }

      if (typeof fetchAllProducts === "function") {
        await fetchAllProducts();
      }

      setTimeout(() => {
        navigate("/admin/products");
      }, 1500);
    } catch (error) {
      console.error("❌ Error saving product:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Failed to save product. Please try again.";
      setSubmitError(errorMessage);
      toast.error(`❌ ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const watchedPrice = watch("price");
  const watchedDiscount = watch("discount");
  const finalPrice = watchedPrice - (watchedPrice * watchedDiscount) / 100;

  return {
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
  };
};

export default useAddEditProduct;