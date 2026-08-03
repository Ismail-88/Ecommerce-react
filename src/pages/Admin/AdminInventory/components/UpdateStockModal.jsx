import React, { useEffect, useState } from 'react'

import Modal from '../../../../components/ui/Modal';
import Button from '../../../../components/ui/Button';

const UpdateStockModal = ({ product, onClose, onUpdate }) => {
  const [newStock, setNewStock] = useState(0);

  useEffect(() => {
    if (product) {
      setNewStock(product.stock);
    }
  }, [product]);

  if (!product) return null;

  const handleUpdate = async () => {
    const result = await onUpdate(product._id, newStock);
    if (result.success) {
      onClose();
    }
  };

  return (
    <Modal open onClose={onClose} size="sm" title="Update Stock">
      <div className="mb-4">
        <label className="block text-sm font-medium text-foreground mb-1">
          Product: {product.title}
        </label>
        <p className="text-sm text-text-muted">Current Stock: {product.stock}</p>
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-foreground mb-2">
          New Stock Quantity
        </label>
        <input
          type="number"
          min="0"
          value={newStock}
          onChange={(e) => setNewStock(e.target.value)}
          className="w-full px-4 py-2.5 border border-border bg-background text-foreground rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 focus:outline-none transition-all"
        />
      </div>
      <div className="flex gap-3">
        <Button variant="primary" className="flex-1" onClick={handleUpdate}>
          Update Stock
        </Button>
        <Button variant="secondary" className="flex-1" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Modal>
  )
}

export default UpdateStockModal
