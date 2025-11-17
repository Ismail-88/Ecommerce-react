import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCategories } from './hooks/useCategories';
import { CategoriesHeader } from './components/CategoriesHeader';
import { CategorySearch } from './components/CategorySearch';
import { CategoryCard } from './components/CategoryCard';
import { CategoryModal } from './components/CategoryModal';

const AdminCategories = () => {
  const {
    categories,
    loading,
    searchTerm,
    setSearchTerm,
    createCategory,
    updateCategory,
    deleteCategory,
  } = useCategories();

  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleAddClick = () => {
    setSelectedCategory(null);
    setShowModal(true);
  };

  const handleEditClick = (category) => {
    setSelectedCategory(category);
    setShowModal(true);
  };

  const handleSave = async (categoryData) => {
    if (selectedCategory) {
      return await updateCategory(selectedCategory._id, categoryData);
    } else {
      return await createCategory(categoryData);
    }
  };

  const handleDelete = async (id) => {
    await deleteCategory(id);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-gray-600">Loading categories...</div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
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

      <CategoriesHeader
        totalCategories={categories.length}
        onAddClick={handleAddClick}
      />

      <CategorySearch
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            No categories found
          </div>
        ) : (
          categories.map((category) => (
            <CategoryCard
              key={category._id}
              category={category}
              onEdit={handleEditClick}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>

      {showModal && (
        <CategoryModal
          category={selectedCategory}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default AdminCategories;