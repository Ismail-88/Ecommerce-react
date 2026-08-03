import { useState } from 'react';

import Modal from '../../../../components/ui/Modal';
import Button from '../../../../components/ui/Button';

export const CategoryModal = ({ category, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    image: '',
    isActive: true
  });

  const editMode = !!category;

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleNameChange = (name) => {
    setFormData({
      ...formData,
      name: name,
      slug: generateSlug(name)
    });
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      alert('Category name is required');
      return;
    }

    const result = await onSave(formData);
    if (result.success) {
      onClose();
    }
  };

  return (
    <Modal
      open
      onClose={onClose}
      title={editMode ? 'Edit Category' : 'Add New Category'}
      description={editMode ? 'Update the category details below' : 'Fill in the details to create a new category'}
      footer={
        <div className="flex gap-3">
          <Button variant="primary" className="flex-1" onClick={handleSubmit}>
            {editMode ? 'Update Category' : 'Create Category'}
          </Button>
          <Button variant="secondary" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Category Name *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => handleNameChange(e.target.value)}
            className="w-full px-4 py-2.5 border border-border bg-background text-foreground rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 focus:outline-none transition-all"
            placeholder="e.g., Electronics"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Slug (Auto-generated)
          </label>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className="w-full px-4 py-2.5 border border-border bg-surface-alt text-foreground rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 focus:outline-none transition-all"
            placeholder="electronics"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2.5 border border-border bg-background text-foreground rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 focus:outline-none transition-all"
            rows={3}
            placeholder="Category description..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Image URL
          </label>
          <input
            type="url"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="w-full px-4 py-2.5 border border-border bg-background text-foreground rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 focus:outline-none transition-all"
            placeholder="https://example.com/image.jpg"
          />
          {formData.image && (
            <img
              src={formData.image}
              alt="Preview"
              className="mt-2 w-32 h-32 object-cover rounded-lg bg-surface-alt"
            />
          )}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isActive"
            checked={formData.isActive}
            onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
            className="w-4 h-4 text-brand-600 border-border rounded focus:ring-brand-500"
          />
          <label htmlFor="isActive" className="text-sm font-medium text-foreground">
            Active Category
          </label>
        </div>
      </div>
    </Modal>
  );
};
