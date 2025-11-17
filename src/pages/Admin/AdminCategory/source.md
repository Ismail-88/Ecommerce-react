// ============================================
// FILE: src/pages/admin/Categories/hooks/useCategories.jsx
// ============================================
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    filterCategories();
  }, [categories, searchTerm]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5000/categories');
      const data = await response.json();
      setCategories(data);
      toast.success('Categories loaded successfully!');
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  const filterCategories = () => {
    if (searchTerm) {
      const filtered = categories.filter(cat =>
        cat.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cat.slug?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCategories(filtered);
    } else {
      setFilteredCategories(categories);
    }
  };

  const createCategory = async (categoryData) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('http://localhost:5000/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(categoryData)
      });

      if (response.ok) {
        toast.success('Category created successfully!');
        fetchCategories();
        return { success: true };
      }
    } catch (error) {
      console.error('Error creating category:', error);
      toast.error('Failed to create category');
      return { success: false };
    }
  };

  const updateCategory = async (id, categoryData) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5000/categories/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(categoryData)
      });

      if (response.ok) {
        toast.success('Category updated successfully!');
        fetchCategories();
        return { success: true };
      }
    } catch (error) {
      console.error('Error updating category:', error);
      toast.error('Failed to update category');
      return { success: false };
    }
  };

  const deleteCategory = async (id) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5000/categories/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        toast.success('Category deleted successfully!');
        fetchCategories();
        return { success: true };
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      toast.error('Failed to delete category');
      return { success: false };
    }
  };

  return {
    categories: filteredCategories,
    loading,
    searchTerm,
    setSearchTerm,
    createCategory,
    updateCategory,
    deleteCategory,
  };
};

// ============================================
// FILE: src/pages/admin/Categories/components/CategoriesHeader.jsx
// ============================================
import React from 'react';
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

// ============================================
// FILE: src/pages/admin/Categories/components/CategorySearch.jsx
// ============================================
import React from 'react';
import { Search } from 'lucide-react';

export const CategorySearch = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="relative">
        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  );
};

// ============================================
// FILE: src/pages/admin/Categories/components/CategoryCard.jsx
// ============================================
import React from 'react';
import { Edit, Trash2, Folder } from 'lucide-react';
import Swal from 'sweetalert2';

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

// ============================================
// FILE: src/pages/admin/Categories/components/CategoryModal.jsx
// ============================================
import React, { useState, useEffect } from 'react';

export const CategoryModal = ({ category, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    image: '',
    isActive: true
  });

  const editMode = !!category;

  useEffect(() => {
    if (category) {
      setFormData(category);
    }
  }, [category]);

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleNameChange = (name) => {
    setFormData({
      ...formData,
      name: name,
      slug: generateSlug(name)
    });
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      alert('Category name is required');
      return;
    }

    const result = await onSave(formData);
    if (result.success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            {editMode ? 'Edit Category' : 'Add New Category'}
          </h2>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => handleNameChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Electronics"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Slug (Auto-generated)
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
              placeholder="electronics"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              placeholder="Category description..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image URL
            </label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://example.com/image.jpg"
            />
            {formData.image && (
              <img
                src={formData.image}
                alt="Preview"
                className="mt-2 w-32 h-32 object-cover rounded-lg"
              />
            )}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
              Active Category
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleSubmit}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              {editMode ? 'Update Category' : 'Create Category'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// FILE: src/pages/admin/Categories/index.jsx
// ============================================
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