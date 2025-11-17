// components/Admin/ProductCard.jsx
import React from 'react';
import { Edit2, Eye, Trash2, Tag as TagIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from '../../../../context/ThemeContext';

const ProductCard = ({ product, onDelete }) => {
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://via.placeholder.com/300x300?text=No+Image";
    if (imagePath.startsWith("http")) return imagePath;
    return `http://localhost:5000${imagePath}`;
  };

  const firstImage = Array.isArray(product.images) ? product.images[0] : product.images;
  const imageUrl = getImageUrl(firstImage);

  return (
    <div className={`group relative rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden ${
      isDark 
        ? 'bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-cyan-500/30' 
        : 'bg-white'
    }`}>
      {/* Dark Mode Hover Effect */}
      {isDark && (
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-blue-500/0 to-purple-500/0 group-hover:from-cyan-500/5 group-hover:via-blue-500/5 group-hover:to-purple-500/5 transition-all"></div>
      )}

      {/* Image */}
      <div className={`relative h-56 overflow-hidden ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}>
        <img
          src={imageUrl}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300x300?text=No+Image";
          }}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.discount > 0 && (
            <span className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-3 py-1 rounded-xl text-sm font-bold shadow-lg backdrop-blur-xl">
              -{product.discount}%
            </span>
          )}
          {(product.stock || 0) < 10 && (
            <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-xl text-xs font-bold shadow-lg backdrop-blur-xl">
              Low Stock
            </span>
          )}
        </div>

        {/* Hover Actions */}
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3 ${
          isDark ? 'bg-black/60' : 'bg-gradient-to-t from-black/60 via-black/20 to-transparent'
        }`}>
          <button
            onClick={() => navigate(`/product/${product._id}`)}
            className={`p-3 rounded-xl hover:scale-110 transition-transform shadow-xl ${
              isDark 
                ? 'bg-white/10 border border-white/20 backdrop-blur-xl text-white' 
                : 'bg-white text-gray-800'
            }`}
            title="View"
          >
            <Eye size={20} />
          </button>
          <button
            onClick={() => navigate(`/admin/products/edit/${product._id}`)}
            className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:scale-110 transition-transform shadow-xl"
            title="Edit"
          >
            <Edit2 size={20} />
          </button>
          <button
            onClick={() => onDelete(product)}
            className="p-3 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 text-white hover:scale-110 transition-transform shadow-xl"
            title="Delete"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="relative p-5 space-y-4">
        <div>
          <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-2 ${
            isDark 
              ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-400' 
              : 'text-red-600 bg-red-50'
          }`}>
            {product.category?.name || "Uncategorized"}
          </span>
          <h3 className={`text-lg font-bold line-clamp-2 mb-2 transition-colors ${
            isDark ? 'text-white group-hover:text-cyan-400' : 'text-gray-900'
          }`}>
            {product.title}
          </h3>
          <p className={`text-sm line-clamp-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {product.description}
          </p>
        </div>

        <div className={`flex items-end justify-between pt-4 border-t ${
          isDark ? 'border-white/10' : 'border-gray-100'
        }`}>
          <div>
            <p className={`text-sm mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Price</p>
            <div className="flex items-baseline gap-2">
              <span className={`text-2xl font-bold ${
                isDark ? 'bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent' : 'text-red-600'
              }`}>
                ${product.price}
              </span>
              {product.discount > 0 && (
                <span className={`text-sm line-through ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                  ${(product.price / (1 - product.discount / 100)).toFixed(2)}
                </span>
              )}
            </div>
          </div>
          <div className="text-right">
            <p className={`text-sm mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Stock</p>
            <p className={`text-xl font-bold ${
              (product.stock || 0) < 10 
                ? 'text-red-500' 
                : isDark ? 'text-emerald-400' : 'text-green-500'
            }`}>
              {product.stock || 0}
            </p>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <button
            onClick={() => navigate(`/admin/products/edit/${product._id}`)}
            className={`flex-1 py-2.5 rounded-xl font-bold hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-lg ${
              isDark 
                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white' 
                : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
            }`}
          >
            <Edit2 size={16} /> Edit
          </button>
          <button
            onClick={() => onDelete(product)}
            className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2.5 rounded-xl font-bold hover:scale-105 transition-all shadow-lg"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;