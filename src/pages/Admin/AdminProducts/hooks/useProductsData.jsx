import React, { useEffect, useState } from 'react'
import { api, getData } from '../../../../context/DataContext';
import axios from 'axios';

const useProductsData = () => {
    const { data, fetchAllProducts, categories, fetchCategories } = getData();
    
      const [products, setProducts] = useState([]);
      const [filteredProducts, setFilteredProducts] = useState([]);
      const [loading, setLoading] = useState(true);
      const [searchQuery, setSearchQuery] = useState("");
      const [selectedCategory, setSelectedCategory] = useState("all");
      const [sortBy, setSortBy] = useState("newest");

    useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    setProducts(data);
  }, [data]);

  useEffect(() => {
    filterAndSortProducts();
  }, [products, searchQuery, selectedCategory, sortBy]);

  const loadProducts = async () => {
      try {
        setLoading(true);
        await fetchAllProducts();
        await fetchCategories();
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };
  
    const filterAndSortProducts = () => {
      let filtered = [...products];
  
      if (searchQuery) {
        filtered = filtered.filter(
          (product) =>
            product.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description?.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
  
      if (selectedCategory !== "all") {
        filtered = filtered.filter(
          (product) => product.category?.name === selectedCategory
        );
      }
  
      switch (sortBy) {
        case "newest":
          filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          break;
        case "oldest":
          filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
          break;
        case "price-low":
          filtered.sort((a, b) => a.price - b.price);
          break;
        case "price-high":
          filtered.sort((a, b) => b.price - a.price);
          break;
        case "name-az":
          filtered.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case "name-za":
          filtered.sort((a, b) => b.title.localeCompare(a.title));
          break;
        case "stock-low":
          filtered.sort((a, b) => (a.stock || 0) - (b.stock || 0));
          break;
        case "stock-high":
          filtered.sort((a, b) => (b.stock || 0) - (a.stock || 0));
          break;
        default:
          break;
      }
  
      setFilteredProducts(filtered);
    };

    const deleteProduct = async (productId) => {
    try {
      await api.delete(`/products/${productId}`);
      await fetchAllProducts();
      return { success: true };
    } catch (error) {
      console.error("Error deleting product:", error);
      return { success: false, error };
    }
  };

  return {
    products,
    filteredProducts,
    loading,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    categories,
    deleteProduct,
    reloadProducts: loadProducts,

  }
}


export default useProductsData
