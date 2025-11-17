// components/Admin/DeleteProductModal.jsx
import React from 'react';
import { Trash2, AlertTriangle } from 'lucide-react';
import { useTheme } from '../../../../context/ThemeContext';

const DeleteProductModal = ({ product, onConfirm, onCancel }) => {
  const { isDark } = useTheme();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className={`rounded-3xl p-8 max-w-md w-full shadow-2xl animate-in zoom-in duration-200 ${
        isDark 
          ? 'bg-gradient-to-br from-white/[0.1] to-white/[0.05] border border-white/10 backdrop-blur-3xl' 
          : 'bg-white'
      }`}>
        {isDark && (
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5 pointer-events-none"></div>
        )}
        
        <div className="relative text-center">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
            isDark 
              ? 'bg-gradient-to-br from-red-500/20 to-rose-500/20 border border-red-500/30' 
              : 'bg-red-100'
          }`}>
            <Trash2 className="text-red-500" size={40} />
          </div>
          
          <div className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 mb-4 ${
            isDark ? 'border-red-500/30 bg-red-500/10' : 'bg-red-50 border-red-200'
          }`}>
            <AlertTriangle className="w-4 h-4 text-red-500" />
            <span className="text-sm font-bold text-red-500">Warning</span>
          </div>
          
          <h3 className={`text-2xl font-bold mb-3 ${
            isDark 
              ? 'bg-gradient-to-r from-red-400 to-rose-500 bg-clip-text text-transparent' 
              : 'text-gray-900'
          }`}>
            Delete Product?
          </h3>
          
          <p className={`mb-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Are you sure you want to delete
          </p>
          
          <p className={`font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            "{product?.title}"?
          </p>
          
          <p className={`text-sm mb-8 ${
            isDark ? 'text-red-400' : 'text-red-600'
          }`}>
            This action cannot be undone.
          </p>
          
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className={`flex-1 px-6 py-3.5 rounded-xl font-bold transition-all ${
                isDark 
                  ? 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="group relative flex-1 px-6 py-3.5 rounded-xl font-bold hover:scale-105 transition-all shadow-lg overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="relative z-10 text-white">Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteProductModal;