
import { useState, useMemo, useEffect, useCallback } from 'react';
import { getData } from '../../../../context/DataContext';

export const useProductsFilter = () => {
  const { data, fetchAllProducts, categoryNames, brandNames } = getData();
  
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("featured");

  // Fetch products on mount
  useEffect(() => {
    fetchAllProducts();
    // window.scrollTo(0, 0);
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = data?.filter((item) => {
      return (
        item.title.toLowerCase().includes(search.toLowerCase()) &&
        (category === 'All' || item.category.name === category) &&
        (brand === 'All' || item.brand.toLowerCase() === brand.toLowerCase()) &&
        item.price >= priceRange[0] && item.price <= priceRange[1]
      );
    });

    if (sortBy === "price-low") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    } else if (sortBy === "newest") {
      filtered = [...filtered].reverse();
    }

    return filtered;
  }, [data, search, category, brand, priceRange, sortBy]);

  // Pagination
  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredProducts?.length / itemsPerPage);
  
  const paginatedProducts = useMemo(() => {
    return filteredProducts?.slice(page * itemsPerPage - itemsPerPage, page * itemsPerPage);
  }, [filteredProducts, page, itemsPerPage]);

  const handlePageChange = useCallback((selectedPage) => {
    setPage(selectedPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleCategoryChange = useCallback((e) => {
    setCategory(e.target.value);
    setPage(1);
  }, []);

  const handleBrandChange = useCallback((e) => {
    setBrand(e.target.value);
    setPage(1);
  }, []);

  const resetFilters = useCallback(() => {
    setSearch("");
    setBrand("All");
    setCategory("All");
    setPriceRange([0, 5000]);
    setPage(1);
  }, []);

  return {
    // Data
    data,
    categoryNames,
    brandNames,
    filteredProducts,
    paginatedProducts,
    
    // State
    search,
    category,
    brand,
    priceRange,
    page,
    sortBy,
    totalPages,
    
    // Setters
    setSearch,
    setPriceRange,
    setSortBy,
    
    // Handlers
    handleCategoryChange,
    handleBrandChange,
    handlePageChange,
    resetFilters
  };
};