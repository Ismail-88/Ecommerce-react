import { Edit } from 'lucide-react';
import React from 'react'

const InventoryTable = ({products, onUpdateStock}) => {
    const getStockStatus = (stock) => {
    if (stock === 0) return { text: 'Out of Stock', color: 'bg-red-100 text-red-800' };
    if (stock <= 10) return { text: 'Low Stock', color: 'bg-yellow-100 text-yellow-800' };
    return { text: 'In Stock', color: 'bg-green-100 text-green-800' };
  };
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Product</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Brand</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Category</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Price</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Stock</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Stock Value</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.length === 0 ? (
              <tr>
                <td colSpan="8" className="px-6 py-8 text-center text-gray-500">No products found</td>
              </tr>
            ) : (
              products.map((product) => {
                const status = getStockStatus(product.stock);
                const stockValue = product.price * product.stock;
                const imageUrl = product.images?.[0]?.startsWith('http') 
                  ? product.images[0] 
                  : `http://localhost:5000${product.images?.[0]}`;

                return (
                  <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={imageUrl || 'https://via.placeholder.com/50'}
                          alt={product.title}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <span className="text-sm font-medium text-gray-800 max-w-xs truncate">
                          {product.title}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{product.brand || 'N/A'}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{product.category?.name || 'N/A'}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                      {product.price?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-lg font-bold ${
                        product.stock === 0 ? 'text-red-600' :
                        product.stock <= 10 ? 'text-yellow-600' : 'text-green-600'
                      }`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                      {stockValue.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${status.color}`}>
                        {status.text}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => onUpdateStock(product)}
                        className="flex items-center gap-1 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit size={16} />
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
