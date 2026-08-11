import { useMemo, useState } from 'react';
import { Edit } from 'lucide-react';
import { API_BASE_URL } from '../../../../context/DataContext';
import { formatINR } from '../../../../utils/formatCurrency';

import Badge from '../../../../components/ui/Badge';
import DataGrid from '../../../../components/ui/erp/DataGrid';
import { sortRows } from '../../../../components/ui/erp/sortRows';

const getStockStatus = (stock) => {
  if (stock === 0) return { text: 'Out of Stock', tone: 'danger' };
  if (stock <= 10) return { text: 'Low Stock', tone: 'warning' };
  return { text: 'In Stock', tone: 'success' };
};

const formatCurrency = (value) => formatINR(value);

const getImageUrl = (images) => {
  const src = images?.[0];
  if (!src) return null;
  return src.startsWith('http') ? src : `${API_BASE_URL}${src}`;
};

const InventoryTable = ({ products, currentPage, pageSize, onUpdateStock }) => {
  const [sortKey, setSortKey] = useState('title');
  const [sortDir, setSortDir] = useState('asc');

  const columns = useMemo(() => [
    {
      key: 'title',
      header: 'Product',
      sortable: true,
      sortValue: (product) => product.title,
      render: (product) => (
        <div className="flex items-center gap-3">
          {getImageUrl(product.images) && (
            <img
              src={getImageUrl(product.images)}
              alt={product.title}
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
              className="w-8 h-8 object-cover rounded-md bg-surface border border-border"
            />
          )}
          <span className="text-sm font-medium text-foreground max-w-[220px] truncate">
            {product.title}
          </span>
        </div>
      ),
    },
    {
      key: 'brand',
      header: 'Brand',
      sortable: true,
      sortValue: (product) => product.brand,
      render: (product) => (
        <span className="text-sm text-text-muted">{product.brand || 'N/A'}</span>
      ),
    },
    {
      key: 'category',
      header: 'Category',
      sortable: true,
      sortValue: (product) => product.category?.name,
      render: (product) => (
        <span className="text-sm text-text-muted">{product.category?.name || 'N/A'}</span>
      ),
    },
    {
      key: 'price',
      header: 'Price',
      align: 'right',
      sortable: true,
      sortValue: (product) => Number(product.price) || 0,
      render: (product) => (
        <span className="text-sm font-semibold text-foreground">{formatCurrency(product.price)}</span>
      ),
    },
    {
      key: 'stock',
      header: 'Stock',
      align: 'right',
      sortable: true,
      sortValue: (product) => Number(product.stock) || 0,
      render: (product) => (
        <span className={`text-sm font-bold ${
          product.stock === 0 ? 'text-danger' : product.stock <= 10 ? 'text-warning' : 'text-success'
        }`}>
          {product.stock}
        </span>
      ),
    },
    {
      key: 'stockValue',
      header: 'Stock Value',
      align: 'right',
      sortable: true,
      sortValue: (product) => Number(product.price) * Number(product.stock) || 0,
      render: (product) => (
        <span className="text-sm font-semibold text-foreground">
          {formatCurrency(Number(product.price) * Number(product.stock) || 0)}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (product) => {
        const status = getStockStatus(product.stock);
        return <Badge tone={status.tone}>{status.text}</Badge>;
      },
    },
  ], []);

  const totalPages = Math.max(1, Math.ceil(products.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const sortedProducts = sortRows(products, columns, sortKey, sortDir);
  const pageRows = sortedProducts.slice((safePage - 1) * pageSize, safePage * pageSize);

  const rowActions = (product) => [
    {
      label: 'Update Stock',
      icon: <Edit size={15} aria-hidden />,
      onClick: () => onUpdateStock(product),
    },
  ];

  return (
    <DataGrid
      columns={columns}
      rows={pageRows}
      rowKey="_id"
      sortKey={sortKey}
      sortDir={sortDir}
      onSortChange={(key, dir) => {
        setSortKey(key);
        setSortDir(dir);
      }}
      rowActions={rowActions}
      toolbar
      title="Inventory"
      count={products.length}
      emptyMessage="No products found"
    />
  );
};

export default InventoryTable;
