import React, { useEffect, useState } from 'react'

const UpdateStockModal = ({product, onClose, onUpdate}) => {

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
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Update Stock</h2>
        </div>
        <div className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product: {product.title}
            </label>
            <p className="text-sm text-gray-600">Current Stock: {product.stock}</p>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Stock Quantity
            </label>
            <input
              type="number"
              min="0"
              value={newStock}
              onChange={(e) => setNewStock(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleUpdate}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              Update Stock
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateStockModal
