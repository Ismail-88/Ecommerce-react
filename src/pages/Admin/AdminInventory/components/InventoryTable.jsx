import { Edit } from 'lucide-react';
import React from 'react'
import { API_BASE_URL } from '../../../../context/DataContext';
import { formatINR } from '../../../../utils/formatCurrency';

import Badge from '../../../../components/ui/Badge';

const InventoryTable = ({ products, onUpdateStock }) => {
  const getStockStatus = (stock) => {
    if (stock === 0) return { text: 'Out of Stock', tone: 'danger' };
    if (stock <= 10) return { text: 'Low Stock', tone: 'warning' };
    return { text: 'In Stock', tone: 'success' };
  };

  const formatCurrency = (value) => formatINR(value);

  return (
    <div className="bg-surface rounded-2xl border border-border shadow-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-surface-alt border-b border-border">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-text-muted uppercase">Product</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-text-muted uppercase">Brand</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-text-muted uppercase">Category</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-text-muted uppercase">Price</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-text-muted uppercase">Stock</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-text-muted uppercase">Stock Value</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-text-muted uppercase">Status</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-text-muted uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {products.length === 0 ? (
              <tr>
                <td colSpan="8" className="px-6 py-8 text-center text-text-muted">No products found</td>
              </tr>
            ) : (
              products.map((product) => {
                const status = getStockStatus(product.stock);
                const stockValue = product.price * product.stock;
                const imageUrl = product.images?.[0]?.startsWith('http')
                  ? product.images[0]
                  : `${API_BASE_URL}${product.images?.[0]}`;

                return (
                  <tr key={product._id} className="hover:bg-surface-alt transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={imageUrl || 'https://via.placeholder.com/50'}
                          alt={product.title}
                          className="w-12 h-12 object-cover rounded-lg bg-surface"
                        />
                        <span className="text-sm font-medium text-foreground max-w-xs truncate">
                          {product.title}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-text-muted">{product.brand || 'N/A'}</td>
                    <td className="px-6 py-4 text-sm text-text-muted">{product.category?.name || 'N/A'}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-foreground">
                      {formatCurrency(product.price)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-lg font-bold ${
                        product.stock === 0 ? 'text-danger' : product.stock <= 10 ? 'text-warning' : 'text-success'
                      }`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-foreground">
                      {formatCurrency(stockValue)}
                    </td>
                    <td className="px-6 py-4">
                      <Badge tone={status.tone}>{status.text}</Badge>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => onUpdateStock(product)}
                        className="flex items-center gap-1 px-3 py-2 text-info hover:bg-info-soft rounded-lg transition-colors"
                      >
                        <Edit size={16} aria-hidden />
                        Update
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default InventoryTable
