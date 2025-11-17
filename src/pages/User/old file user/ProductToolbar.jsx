import { IoGridOutline, IoListOutline } from "react-icons/io5";

const ProductToolbar = ({ filterData, sortBy, setSortBy, viewMode, setViewMode }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 mb-6 border border-gray-200">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="text-gray-800 font-bold text-lg">
            {filterData?.length} <span className="text-gray-500 font-normal">Products</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="p-3 border-2 border-gray-300 rounded-xl focus:border-red-500 focus:outline-none font-medium"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="newest">Newest First</option>
          </select>

          <div className="hidden md:flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-3 rounded-lg transition-all ${
                viewMode === "grid" ? "bg-white shadow-md text-red-500" : "text-gray-500"
              }`}
            >
              <IoGridOutline size={22} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-3 rounded-lg transition-all ${
                viewMode === "list" ? "bg-white shadow-md text-red-500" : "text-gray-500"
              }`}
            >
              <IoListOutline size={22} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductToolbar;