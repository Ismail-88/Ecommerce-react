// components/Admin/DeleteProductModal.jsx
import React from 'react';

import ConfirmDialog from '../../../../components/ui/ConfirmDialog';

const DeleteProductModal = ({ product, onConfirm, onCancel }) => {
  return (
    <ConfirmDialog
      open
      onClose={onCancel}
      onConfirm={onConfirm}
      title="Delete Product?"
      message={`Are you sure you want to delete "${product?.title}"? This action cannot be undone.`}
      confirmText="Delete"
    />
  );
};

export default DeleteProductModal;
