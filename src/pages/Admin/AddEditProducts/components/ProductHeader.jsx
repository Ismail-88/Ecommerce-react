import { useNavigate } from "react-router-dom";
import { ArrowLeft, Package } from "lucide-react";

export const ProductHeader = ({ isEditMode }) => {
  const navigate = useNavigate();

  return (
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
  );
};