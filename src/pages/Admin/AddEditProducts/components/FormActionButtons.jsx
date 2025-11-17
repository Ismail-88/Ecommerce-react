import { useNavigate } from "react-router-dom";
import { Save } from "lucide-react";

export const FormActionButtons = ({ loading, isEditMode }) => {
  const navigate = useNavigate();

  return (
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
            <span>{isEditMode ? "Update Product" : "Create Product"}</span>
          </>
        )}
      </button>
    </div>
  );
};