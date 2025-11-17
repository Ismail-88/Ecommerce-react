// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { FaUpload, FaTrash, FaArrowLeft } from 'react-icons/fa';
// import useProductForm from '../../../hooks/Dashboard/useProductForm';
// import { ToastContainer } from 'react-toastify';
// import FormHeader from '../../../components/Admin/Product-form/FormHeader';
// // import ImageUploadSection from '../../../components/Admin/Product-form/ImageUploadSection';


// const AdminAddProduct = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const isEditMode = !!id;


//   const {
//     register,
//     handleSubmit,
//     errors,
//     imagePreview,
//     uploading,
//     loading,
//     handleImageUpload,
//     removeImage,
//     onSubmit,
//   }= useProductForm(id, isEditMode)

//    if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-gray-100">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-red-500 mx-auto mb-4"></div>
//           <p className="text-gray-600 font-semibold text-lg">Loading Product...</p>
//         </div>
//       </div>
//     );
//   }


//   return (
//     <div className="min-h-screen bg-gray-100 p-4 md:p-8">
//        {/* Toast Container */}
//       {/* <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//       />
//       {/* Header */}
//       {/* <FormHeader isEditMode={isEditMode}/> */} 

//       <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Left Column - Images */}
//           <div className="lg:col-span-1">
//             <ImageUploadSection imagePreview={imagePreview} onImageUpload={handleImageUpload} onRemoveImage={removeImage}/>
//           </div>

//           {/* Right Column - Product Details */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Basic Information */}
            

//             {/* Pricing & Inventory */}
            

//             {/* Status */}
            

//             {/* Action Buttons */}
            
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AdminAddProduct;