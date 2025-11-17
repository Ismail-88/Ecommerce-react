// components/Admin/EmptyProductsState.jsx
import React from 'react';
import { Box, Plus, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../../context/ThemeContext';

const EmptyProductsState = ({ searchQuery, selectedCategory }) => {
  const navigate = useNavigate();
  const { isDark } = useTheme();

  return (
    <div className={`rounded-3xl shadow-xl p-16 text-center transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10' 
        : 'bg-white'
    }`}>
      {isDark && (
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5 pointer-events-none"></div>
      )}
      
      <div className="relative">
        <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${
          isDark 
            ? 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-white/10' 
            : 'bg-gray-100'
        }`}>
          <Box className={isDark ? 'text-cyan-400' : 'text-gray-400'} size={48} />
        </div>
        
        <h3 className={`text-2xl font-bold mb-3 ${
          isDark 
            ? 'bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent' 
            : 'text-gray-800'
        }`}>
          No Products Found
        </h3>
        
        <p className={`mb-8 max-w-md mx-auto ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          {searchQuery || selectedCategory !== "all"
            ? "Try adjusting your filters or search query to find what you're looking for"
            : "Start building your catalog by adding your first product"}
        </p>
        
        <button
          onClick={() => navigate("/admin/products/add")}
          className="group relative overflow-hidden px-8 py-4 rounded-xl font-bold hover:scale-105 transition-all inline-flex items-center gap-3 shadow-xl"
        >
          {isDark ? (
            <>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <Plus size={20} className="relative z-10 text-white" />
              <span className="relative z-10 text-white">Add Your First Product</span>
              <Sparkles size={20} className="relative z-10 text-white" />
            </>
          ) : (
            <>
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-600"></div>
              <Plus size={20} className="relative z-10 text-white" />
              <span className="relative z-10 text-white">Add Your First Product</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default EmptyProductsState;