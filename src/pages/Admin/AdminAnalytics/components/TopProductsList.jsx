import React from 'react'
import { Package } from 'lucide-react';
import { formatINR } from '../../../../utils/formatCurrency';

const TopProductsList = ({ products }) => {
  return (
    <div className="bg-surface border border-border shadow-card p-6 rounded-2xl">
      <div className="flex items-center gap-2 mb-4">
        <Package size={18} className="text-brand-600 dark:text-brand-400" aria-hidden />
        <h3 className="text-lg font-semibold text-foreground">Top Selling Products</h3>
      </div>
      <div className="space-y-3">
        {products.map((product, index) => (
          <div key={index} className="flex items-center gap-4 p-3 bg-surface-alt border border-border rounded-xl">
            <img
              src={product.image}
              alt={product.title}
              className="w-16 h-16 object-cover rounded-lg bg-surface"
            />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground text-sm line-clamp-1">{product.title}</p>
              <p className="text-xs text-text-muted">Sold: {product.quantity} units</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="font-bold text-success">{formatINR(product.revenue, 2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TopProductsList
