import { Search } from 'lucide-react'
import React from 'react'

const InventoryFilters = ({ searchTerm, setSearchTerm, stockFilter, setStockFilter }) => {
  return (
    <div className="bg-surface border border-border shadow-card p-4 rounded-2xl mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3.5 top-3 text-text-faint" size={18} aria-hidden />
          <input
            type="text"
            placeholder="Search by product name or brand..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-border bg-background text-foreground placeholder:text-text-faint rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 focus:outline-none transition-all"
          />
        </div>
        <select
          value={stockFilter}
          onChange={(e) => setStockFilter(e.target.value)}
          className="px-4 py-2.5 border border-border bg-background text-foreground rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 focus:outline-none transition-all"
        >
          <option value="all">All Products</option>
          <option value="instock">In Stock</option>
          <option value="low">Low Stock</option>
          <option value="out">Out of Stock</option>
        </select>
      </div>
    </div>
  )
}

export default InventoryFilters
