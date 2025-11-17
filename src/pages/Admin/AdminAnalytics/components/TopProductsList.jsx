import React from 'react'

const TopProductsList = ({products}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Selling Products</h3>
          <div className="space-y-4">
            {products.map((product, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <p className="font-semibold text-gray-800 text-sm">{product.title}</p>
                  <p className="text-xs text-gray-600">Sold: {product.quantity} units</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">₹{product.revenue.toLocaleString('en-IN')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
  )
}

export default TopProductsList
