import { Edit, Folder, Trash2 } from "lucide-react";
import Swal from "sweetalert2";

export const CategoryCard = ({ category, onEdit, onDelete }) => {
  const handleDelete = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `Delete category "${category.name}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      onDelete(category._id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 bg-gray-200 relative">
        {category.image ? (
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Folder size={64} className="text-gray-400" />
          </div>
        )}
        {category.isActive !== undefined && !category.isActive && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
            Inactive
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-1">{category.name}</h3>
        <p className="text-sm text-gray-500 mb-3">{category.slug}</p>
        {category.description && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {category.description}
          </p>
        )}
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(category)}
            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <Edit size={16} />
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};