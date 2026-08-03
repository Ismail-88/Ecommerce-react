// components/Admin/ProductCard.jsx
import React from 'react';
import { Edit2, Eye, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from '../../../../context/DataContext';
import { formatINR } from '../../../../utils/formatCurrency';

import Badge from '../../../../components/ui/Badge';
import Button from '../../../../components/ui/Button';

const ProductCard = ({ product, onDelete }) => {
  const navigate = useNavigate();

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://via.placeholder.com/300x300?text=No+Image";
    if (imagePath.startsWith("http")) return imagePath;
    return `${API_BASE_URL}${imagePath}`;
  };

  const firstImage = Array.isArray(product.images) ? product.images[0] : product.images;
  const imageUrl = getImageUrl(firstImage);

  return (
    <div className="group relative rounded-2xl border border-border bg-surface shadow-card hover:shadow-overlay transition-all overflow-hidden">
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-surface-alt">
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
            <Badge tone="danger">
              -{product.discount}%
            </Badge>
          )}
          {(product.stock || 0) < 10 && (
            <Badge tone="warning">
              Low Stock
            </Badge>
          )}
        </div>

        {/* Hover Actions */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3 bg-overlay/70">
          <button
            onClick={() => navigate(`/product/${product._id}`)}
            className="p-3 rounded-xl hover:scale-110 transition-transform shadow-card bg-surface text-foreground"
            title="View"
          >
            <Eye size={20} aria-hidden />
          </button>
          <button
            onClick={() => navigate(`/admin/products/edit/${product._id}`)}
            className="p-3 rounded-xl bg-info text-white hover:scale-110 transition-transform shadow-card"
            title="Edit"
          >
            <Edit2 size={20} aria-hidden />
          </button>
          <button
            onClick={() => onDelete(product)}
            className="p-3 rounded-xl bg-danger text-white hover:scale-110 transition-transform shadow-card"
            title="Delete"
          >
            <Trash2 size={20} aria-hidden />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="relative p-5 space-y-4">
        <div>
          <Badge tone="brand" className="mb-2">
            {product.category?.name || "Uncategorized"}
          </Badge>
          <h3 className="text-lg font-bold line-clamp-2 mb-2 text-foreground group-hover:text-brand-600 transition-colors">
            {product.title}
          </h3>
          <p className="text-sm line-clamp-2 text-text-muted">
            {product.description}
          </p>
        </div>

        <div className="flex items-end justify-between pt-4 border-t border-border">
          <div>
            <p className="text-sm mb-1 text-text-muted">Price</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-foreground">
                {formatINR(product.price)}
              </span>
              {product.discount > 0 && (
                <span className="text-sm line-through text-text-faint">
                  {formatINR(product.price / (1 - product.discount / 100))}
                </span>
              )}
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm mb-1 text-text-muted">Stock</p>
            <p className={`text-xl font-bold ${(product.stock || 0) < 10 ? 'text-danger' : 'text-success'}`}>
              {product.stock || 0}
            </p>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            variant="secondary"
            className="flex-1"
            onClick={() => navigate(`/admin/products/edit/${product._id}`)}
          >
            <Edit2 size={16} aria-hidden />
            Edit
          </Button>
          <Button variant="danger" onClick={() => onDelete(product)}>
            <Trash2 size={16} aria-hidden />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
