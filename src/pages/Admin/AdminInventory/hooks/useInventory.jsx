import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const useInventory = () => {

      const [products, setProducts] = useState([]);
      const [filteredProducts, setFilteredProducts] = useState([]);
      const [loading, setLoading] = useState(true);
      const [searchTerm, setSearchTerm] = useState('');
      const [stockFilter, setStockFilter] = useState('all');
      const [currentPage, setCurrentPage] = useState(1);
      const productsPerPage = 5;

    useEffect(() => {
    fetchProducts();
    }, []);

     useEffect(() => {
    filterProducts();
  }, [products, searchTerm, stockFilter]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/products');
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.brand?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (stockFilter === 'low') {
      filtered = filtered.filter((product) => product.stock <= 10 && product.stock > 0);
    } else if (stockFilter === 'out') {
      filtered = filtered.filter((product) => product.stock === 0);
    } else if (stockFilter === 'instock') {
      filtered = filtered.filter((product) => product.stock > 10);
    }

    setFilteredProducts(filtered);
    setCurrentPage(1)
  };

   const updateStock = async (productId, newStock) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5000/products/${selectedProduct._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ stock: parseInt(newStock) })
      });

      if (response.ok) {
        toast.success('Stock updated successfully!');
        fetchProducts();
        return { success: true };
      }
    } catch (error) {
      console.error('Error updating stock:', error);
      toast.error('Failed to update stock');
      return { success: false };
    }
  };

  //stats
  const totalProducts = filteredProducts.length;
  const lowStockProducts = filteredProducts.filter(p => p.stock <= 10 && p.stock > 0).length;
  const outOfStockProducts = filteredProducts.filter(p => p.stock === 0).length;
  const totalStockValue = filteredProducts.reduce((sum, p) => sum + (p.price * p.stock), 0);

  //pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

   

  return {
    products : currentProducts,
    loading,
    searchTerm,
    setSearchTerm,
    stockFilter,
    setStockFilter,
    currentPage,
    setCurrentPage,
    totalPages,
    updateStock,
    stats : {
      totalProducts,
      lowStockProducts,
      outOfStockProducts,
      totalStockValue
    }

  }
}

export default useInventory
