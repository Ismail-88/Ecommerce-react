import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

const CustomScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 group"
          aria-label="Scroll to top"
        >
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
            
            {/* Button */}
            <div className="relative w-14 h-14 rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 backdrop-blur-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-active:scale-95 transition-all">
              <ChevronUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </button>
      )}
    </>
  );
};

export default CustomScrollToTop;

