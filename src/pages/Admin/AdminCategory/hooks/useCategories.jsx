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