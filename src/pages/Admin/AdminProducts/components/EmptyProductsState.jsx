// components/Admin/EmptyProductsState.jsx
import React from 'react';
import { Package, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import EmptyState from '../../../../components/ui/EmptyState';
import Button from '../../../../components/ui/Button';

const EmptyProductsState = ({ searchQuery, selectedCategory }) => {
  const navigate = useNavigate();

  return (
    <EmptyState
      icon={Package}
      title="No Products Found"
      description={
        searchQuery || selectedCategory !== "all"
          ? "Try adjusting your filters or search query to find what you're looking for"
          : "Start building your catalog by adding your first product"
      }
      action={
        <Button size="lg" onClick={() => navigate("/admin/products/add")}>
          <Plus size={18} aria-hidden />
          Add Your First Product
        </Button>
      }
    />
  );
};

export default EmptyProductsState;
