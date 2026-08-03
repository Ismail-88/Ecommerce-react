import { Plus, FolderOpen } from 'lucide-react';

import Button from '../../../../components/ui/Button';

export const CategoriesHeader = ({ totalCategories, onAddClick }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
      <div className="flex items-center gap-3">
        <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-brand-soft text-brand-600 dark:text-brand-400">
          <FolderOpen size={24} aria-hidden />
        </span>
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Category Management</h1>
          <p className="text-sm text-text-muted">Total Categories: {totalCategories}</p>
        </div>
      </div>
      <Button onClick={onAddClick}>
        <Plus size={20} aria-hidden />
        Add Category
      </Button>
    </div>
  );
};
