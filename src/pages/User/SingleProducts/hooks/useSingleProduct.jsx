// hooks/useSingleProduct.js
import { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import { getData } from '../../../../context/DataContext';


export const useSingleProduct = (id) => {
  const { singleProduct, getSingleProduct, data: products, getProductImagesUrls, getImageUrl } = getData();
  
  const [selectedColor, setSelectedColor] = useState(null);
  const [currentImages, setCurrentImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [reviewStats, setReviewStats] = useState({ average: 0, total: 0 });

  // Process color images
  const processColorImages = useCallback((images) => {
    if (!images || images.length === 0) return [];
    return images.map(img => getImageUrl(img)).filter(img => img !== null);
  }, [getImageUrl]);

  // Fetch review stats
  useEffect(() => {
    const fetchReviewStats = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}/reviews/stats`);
        setReviewStats(res.data);
      } catch (error) {
        console.error("Error fetching review stats:", error);
      }
    };
    if (id) fetchReviewStats();
  }, [id]);

  // Initialize product data
  useEffect(() => {
    if (singleProduct) {
      if (singleProduct.colors && singleProduct.colors.length > 0) {
        const firstColor = singleProduct.colors[0];
        setSelectedColor(firstColor);
        const processedImages = processColorImages(firstColor.images);
        setCurrentImages(processedImages);
      } else {
        const defaultImages = getProductImagesUrls(singleProduct);
        setCurrentImages(defaultImages);
      }
      setSelectedImage(0);
    }
  }, [singleProduct, processColorImages, getProductImagesUrls]);

  // Fetch product
//   useEffect(() => {
//     getSingleProduct(id);
//     window.scrollTo(0, 0);
//   }, [id, getSingleProduct]);

useEffect(() => {
  if (!id) return;
  getSingleProduct(id);
  window.scrollTo(0, 0);
 
}, [id]);

  // Handle color change
  const handleColorChange = useCallback((color) => {
    setSelectedColor(color);
    const processedImages = processColorImages(color.images);
    setCurrentImages(processedImages);
    setSelectedImage(0);
  }, [processColorImages]);

  // Calculate pricing
  const pricing = useMemo(() => {
    if (!singleProduct) return { originalPrice: 0, discountPercentage: 0 };
    
    const discountPercentage = singleProduct.discount || 10;
    const originalPrice = Math.round(
      singleProduct.price + (singleProduct.price * discountPercentage) / 100
    );
    
    return { originalPrice, discountPercentage };
  }, [singleProduct]);

  // Get related products
  const relatedProducts = useMemo(() => {
    if (!products || !singleProduct) return [];
    
    const getCategoryId = (category) => {
      if (typeof category === 'string') return category;
      return category?._id || category?.id;
    };

    return products
      .filter((p) => {
        const pCategoryId = getCategoryId(p.category);
        const currentCategoryId = getCategoryId(singleProduct.category);
        return pCategoryId === currentCategoryId && p._id !== singleProduct._id;
      })
      .slice(0, 8);
  }, [products, singleProduct]);

  return {
    singleProduct,
    selectedColor,
    currentImages,
    selectedImage,
    setSelectedImage,
    quantity,
    setQuantity,
    isWishlisted,
    setIsWishlisted,
    reviewStats,
    handleColorChange,
    pricing,
    relatedProducts
  };
};