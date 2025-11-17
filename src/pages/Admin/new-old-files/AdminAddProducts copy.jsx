// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { FaUpload, FaTrash, FaArrowLeft } from 'react-icons/fa';
// // import { getProductById, addProduct, updateProduct, uploadImage } from '../services/api';

// // Zod validation schema
// const productSchema = z.object({
//   title: z.string().min(3, 'Title must be at least 3 characters'),
//   description: z.string().min(10, 'Description must be at least 10 characters'),
//   price: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
//     message: 'Price must be a positive number',
//   }),
//   brand: z.string().min(2, 'Brand is required'),
//   category: z.string().min(2, 'Category is required'),
//   stock: z.string().refine((val) => !isNaN(parseInt(val)) && parseInt(val) >= 0, {
//     message: 'Stock must be a non-negative number',
//   }),
//   discount: z.string().optional(),
//   status: z.enum(['active', 'inactive']),
// });

// const AdminAddProduct = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const isEditMode = !!id;

//   const [imagePreview, setImagePreview] = useState([]);
//   const [uploading, setUploading] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setValue,
//     reset,
//   } = useForm({
//     resolver: zodResolver(productSchema),
//     defaultValues: {
//       status: 'active',
//       discount: '0',
//     },
//   });

//   useEffect(() => {
//     if (isEditMode) {
//       // Fetch product data for editing
//       // In production, fetch from API
//       const demoProduct = {
//         title: 'Sample Product',
//         description: 'This is a sample product description',
//         price: '99.99',
//         brand: 'Brand Name',
//         category: 'electronics',
//         stock: '50',
//         discount: '10',
//         status: 'active',
//         images: ['https://via.placeholder.com/300'],
//       };
//       // Load product data
//       Object.keys(demoProduct).forEach((key) => {
//         if (key !== 'images') {
//           setValue(key, demoProduct[key]);
//         }
//       });
//       setImagePreview(demoProduct.images || []);
//     }
//   }, [isEditMode, id, setValue]);

//   // Handle image upload
//   const handleImageUpload = (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length + imagePreview.length > 5) {
//       alert('Maximum 5 images allowed');
//       return;
//     }

//     files.forEach((file) => {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview((prev) => [...prev, reader.result]);
//       };
//       reader.readAsDataURL(file);
//     });
//   };

//   // Remove image
//   const removeImage = (index) => {
//     setImagePreview((prev) => prev.filter((_, i) => i !== index));
//   };

//   // Form submission
//   const onSubmit = async (data) => {
//     if (imagePreview.length === 0) {
//       alert('Please upload at least one image');
//       return;
//     }

//     setUploading(true);

//     // Prepare product data
//     const productData = {
//       ...data,
//       price: parseFloat(data.price),
//       stock: parseInt(data.stock),
//       discount: parseInt(data.discount || 0),
//       images: imagePreview,
//       createdAt: new Date().toISOString(),
//     };

//     console.log('Product Data:', productData);

//     // Simulate API call
//     setTimeout(() => {
//       setUploading(false);
//       alert(
//         isEditMode
//           ? 'Product updated successfully!'
//           : 'Product added successfully!'
//       );
//       navigate('/admin/products');
//     }, 1500);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-4 md:p-8">
//       {/* Header */}
//       <div className="flex items-center gap-4 mb-8">
//         <button
//           onClick={() => navigate('/admin/products')}
//           className="p-2 hover:bg-gray-200 rounded-lg transition"
//         >
//           <FaArrowLeft className="text-xl" />
//         </button>
//         <div>
//           <h1 className="text-3xl font-bold text-gray-800">
//             {isEditMode ? 'Edit Product' : 'Add New Product'}
//           </h1>
//           <p className="text-gray-600">
//             {isEditMode
//               ? 'Update product information'
//               : 'Fill in the details to add a new product'}
//           </p>
//         </div>
//       </div>

//       <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Left Column - Images */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
//               <h2 className="text-lg font-semibold text-gray-800 mb-4">
//                 Product Images
//               </h2>

//               {/* Image Upload */}
//               <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-red-500 transition">
//                 <FaUpload className="text-3xl text-gray-400 mb-2" />
//                 <span className="text-sm text-gray-600">
//                   Click to upload images
//                 </span>
//                 <span className="text-xs text-gray-500 mt-1">
//                   (Max 5 images)
//                 </span>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   multiple
//                   onChange={handleImageUpload}
//                   className="hidden"
//                 />
//               </label>

//               {/* Image Previews */}
//               <div className="mt-4 space-y-2">
//                 {imagePreview.map((img, index) => (
//                   <div
//                     key={index}
//                     className="relative group rounded-lg overflow-hidden"
//                   >
//                     <img
//                       src={img}
//                       alt={`Preview ${index + 1}`}
//                       className="w-full h-32 object-cover"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => removeImage(index)}
//                       className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
//                     >
//                       <FaTrash />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Right Column - Product Details */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Basic Information */}
//             <div className="bg-white rounded-lg shadow-md p-6">
//               <h2 className="text-lg font-semibold text-gray-800 mb-4">
//                 Basic Information
//               </h2>

//               <div className="space-y-4">
//                 {/* Title */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Product Title *
//                   </label>
//                   <input
//                     type="text"
//                     {...register('title')}
//                     placeholder="Enter product title"
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
//                   />
//                   {errors.title && (
//                     <p className="text-red-500 text-sm mt-1">
//                       {errors.title.message}
//                     </p>
//                   )}
//                 </div>

//                 {/* Description */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Description *
//                   </label>
//                   <textarea
//                     {...register('description')}
//                     rows={5}
//                     placeholder="Enter product description"
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
//                   />
//                   {errors.description && (
//                     <p className="text-red-500 text-sm mt-1">
//                       {errors.description.message}
//                     </p>
//                   )}
//                 </div>

//                 {/* Brand & Category */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Brand *
//                     </label>
//                     <input
//                       type="text"
//                       {...register('brand')}
//                       placeholder="Enter brand name"
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
//                     />
//                     {errors.brand && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {errors.brand.message}
//                       </p>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Category *
//                     </label>
//                     <select
//                       {...register('category')}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
//                     >
//                       <option value="">Select category</option>
//                       <option value="electronics">Electronics</option>
//                       <option value="clothing">Clothing</option>
//                       <option value="books">Books</option>
//                       <option value="home">Home & Kitchen</option>
//                       <option value="sports">Sports</option>
//                       <option value="toys">Toys</option>
//                       <option value="beauty">Beauty</option>
//                       <option value="automotive">Automotive</option>
//                     </select>
//                     {errors.category && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {errors.category.message}
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Pricing & Inventory */}
//             <div className="bg-white rounded-lg shadow-md p-6">
//               <h2 className="text-lg font-semibold text-gray-800 mb-4">
//                 Pricing & Inventory
//               </h2>

//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 {/* Price */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Price ($) *
//                   </label>
//                   <input
//                     type="text"
//                     {...register('price')}
//                     placeholder="0.00"
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
//                   />
//                   {errors.price && (
//                     <p className="text-red-500 text-sm mt-1">
//                       {errors.price.message}
//                     </p>
//                   )}
//                 </div>

//                 {/* Stock */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Stock Quantity *
//                   </label>
//                   <input
//                     type="text"
//                     {...register('stock')}
//                     placeholder="0"
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
//                   />
//                   {errors.stock && (
//                     <p className="text-red-500 text-sm mt-1">
//                       {errors.stock.message}
//                     </p>
//                   )}
//                 </div>

//                 {/* Discount */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Discount (%)
//                   </label>
//                   <input
//                     type="text"
//                     {...register('discount')}
//                     placeholder="0"
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Status */}
//             <div className="bg-white rounded-lg shadow-md p-6">
//               <h2 className="text-lg font-semibold text-gray-800 mb-4">
//                 Product Status
//               </h2>

//               <div className="flex gap-4">
//                 <label className="flex items-center gap-2 cursor-pointer">
//                   <input
//                     type="radio"
//                     value="active"
//                     {...register('status')}
//                     className="w-4 h-4 text-red-500"
//                   />
//                   <span className="text-gray-700">Active</span>
//                 </label>
//                 <label className="flex items-center gap-2 cursor-pointer">
//                   <input
//                     type="radio"
//                     value="inactive"
//                     {...register('status')}
//                     className="w-4 h-4 text-red-500"
//                   />
//                   <span className="text-gray-700">Inactive</span>
//                 </label>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex gap-4">
//               <button
//                 type="button"
//                 onClick={() => navigate('/admin/products')}
//                 className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold transition"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={uploading}
//                 className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
//               >
//                 {uploading
//                   ? 'Saving...'
//                   : isEditMode
//                   ? 'Update Product'
//                   : 'Add Product'}
//               </button>
//             </div>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AdminAddProduct;