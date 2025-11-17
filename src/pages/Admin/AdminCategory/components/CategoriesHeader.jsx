import { Plus } from 'lucide-react';

export const CategoriesHeader = ({ totalCategories, onAddClick }) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Category Management</h1>
        <p className="text-gray-600 mt-2">Total Categories: {totalCategories}</p>
      </div>
      <button
        onClick={onAddClick}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
      >
        <Plus size={20} />
        Add Category
      </button>
    </div>
  );
};