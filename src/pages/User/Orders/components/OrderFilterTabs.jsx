
const OrderFilterTabs = ({ filter, setFilter, getOrderCount }) => {
  const statuses = ["all", "pending", "processing", "shipped", "delivered", "cancelled"];

  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {statuses.map((status) => (
        <button
          key={status}
          onClick={() => setFilter(status)}
          className={`relative overflow-hidden group px-6 py-3 rounded-xl font-bold transition-all capitalize ${
            filter === status
              ? "bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white scale-105 shadow-lg shadow-cyan-500/50"
              : "border border-white/10 bg-white/5 backdrop-blur-xl text-gray-400 hover:border-cyan-500/50 hover:text-white"
          }`}
        >
          <span className="relative z-10">{status}</span>
          <span className="relative z-10 ml-2 px-2 py-0.5 rounded-full text-xs font-bold bg-white/20">
            {getOrderCount(status)}
          </span>
          {filter !== status && (
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          )}
        </button>
      ))}
    </div>
  );
};

export default OrderFilterTabs;