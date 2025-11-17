import { FaDownload } from "react-icons/fa"

export const OrdersHeader = ({totalOrders, onExport}) => {
  return (
    
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  Order Management
                </h1>
                <p className="text-gray-600">Total Orders: {totalOrders}</p>
              </div>
              <button
                onClick={onExport}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 font-semibold transition"
              >
                <FaDownload /> Export Orders
              </button>
            </div>
   
  )
}


