// hooks/useHomeData.js
import { useEffect, useState, useMemo } from 'react';
import { getData } from '../../../../context/DataContext';

export const useHomeData = () => {
  const { data, fetchAllProducts } = getData();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  // Auto-rotate hero slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Memoized featured products
  const featuredProducts = useMemo(() => {
    return data && data.length > 0 ? data.slice(0, 8) : [];
  }, [data]);

  // Memoized trending products
  const trendingProducts = useMemo(() => {
    return data && data.length > 10 ? data.slice(10, 14) : [];
  }, [data]);

  // Hero product
  const heroProduct = useMemo(() => {
    return data && data.length > 20 ? data[20] : null;
  }, [data]);

  return {
    data,
    featuredProducts,
    trendingProducts,
    heroProduct,
    currentSlide,
    setCurrentSlide
  };
};