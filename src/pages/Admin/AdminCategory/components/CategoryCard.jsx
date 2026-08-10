import { useState } from 'react';
import { Edit, Folder, Trash2 } from 'lucide-react';

import Badge from '../../../../components/ui/Badge';
import Button from '../../../../components/ui/Button';
import ConfirmDialog from '../../../../components/ui/ConfirmDialog';
import { API_BASE_URL } from '../../../../context/DataContext';

const CATEGORY_PLACEHOLDER = 'https://via.placeholder.com/400x300?text=No+Image';

const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  if (imagePath.startsWith('http')) return imagePath;
  return `${API_BASE_URL}${imagePath.startsWith('/') ? imagePath : `/${imagePath}`}`;
};

export const CategoryCard = ({ category, onEdit, onDelete }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const categoryImage = getImageUrl(category.image);

  return (
    <>
      <div className="bg-surface rounded-2xl border border-border shadow-card overflow-hidden hover:shadow-lg transition-shadow">
        <div className="h-48 bg-surface-alt relative">
          {categoryImage ? (
            <img
              src={categoryImage}
              alt={category.name}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = CATEGORY_PLACEHOLDER;
              }}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Folder size={64} className="text-text-faint" />
            </div>
          )}
          {category.isActive !== undefined && !category.isActive && (
            <div className="absolute top-2 right-2">
              <Badge tone="danger">Inactive</Badge>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold text-foreground mb-1">{category.name}</h3>
          <p className="text-sm text-text-muted mb-3">{category.slug}</p>
          {category.description && (
            <p className="text-sm text-text-muted mb-4 line-clamp-2">
              {category.description}
            </p>
          )}
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              className="flex-1"
              onClick={() => onEdit(category)}
            >
              <Edit size={16} aria-hidden />
              Edit
            </Button>
            <Button
              variant="dangerOutline"
              size="sm"
              className="flex-1"
              onClick={() => setShowDeleteConfirm(true)}
            >
              <Trash2 size={16} aria-hidden />
              Delete
            </Button>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={() => {
          onDelete(category._id);
          setShowDeleteConfirm(false);
        }}
        title="Delete Category?"
        message={`Delete category "${category.name}"? This action cannot be undone.`}
        confirmText="Delete"
        confirmVariant="danger"
      />
    </>
  );
};
