// hooks/useShare.js
import { useState, useCallback } from 'react';

export const useShare = (product) => {
  const [showShareMenu, setShowShareMenu] = useState(false);

  const handleShare = useCallback((platform) => {
    const url = window.location.href;
    const text = `Check out ${product?.title}`;
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      whatsapp: `https://wa.me/?text=${text} ${url}`,
      copy: url
    };

    if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      alert('Link copied!');
    } else {
      window.open(shareUrls[platform], '_blank');
    }
    
    setShowShareMenu(false);
  }, [product]);

  return {
    showShareMenu,
    setShowShareMenu,
    handleShare
  };
};