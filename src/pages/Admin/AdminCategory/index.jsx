import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCategories } from './hooks/useCategories';
import { CategoriesHeader } from './components/CategoriesHeader';
import { CategorySearch } from './components/CategorySearch';
import { CategoryCard } from './components/CategoryCard';
import { CategoryModal } from './components/CategoryModal';
import EmptyState from '../../../components/ui/EmptyState';
import { FullPageSpinner } from '../../../components/ui/Spinner';
import { useTheme } from '../../../context/ThemeContext';
import { FolderOpen } from 'lucide-react';

const AdminCategories = () => {
  const { isDark } = useTheme();
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
      <div className="flex justify-center items-center min-h-[60vh]">
        <FullPageSpinner label="Loading categories..." />
      </div>
    );
  }

  return (
    <div className="p-6 bg-transparent min-h-screen">
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
        theme={isDark ? "dark" : "light"}
      />

      <CategoriesHeader
        totalCategories={categories.length}
        onAddClick={handleAddClick}
      />

      <CategorySearch
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {categories.length === 0 ? (
        <EmptyState
          icon={FolderOpen}
          eyebrow="Categories"
          title="No categories found"
          description="Try adjusting your search, or add a new category to get started."
          action={<button onClick={handleAddClick}>Add Category</button>}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard
              key={category._id}
              category={category}
              onEdit={handleEditClick}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

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
