export const CustomerDetailsModal = ({ customer, onClose }) => {
  if (!customer) return null;

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Customer Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-4">
            <img
              src={customer.profileImage || 'https://via.placeholder.com/100'}
              alt={customer.name}
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <h3 className="text-xl font-semibold text-gray-800">{customer.name}</h3>
              <p className="text-gray-600">{customer.email}</p>
              <span className={`inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full ${
                customer.isActive
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {customer.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Customer ID</p>
              <p className="text-lg font-semibold text-gray-800">
                {customer._id.slice(-8).toUpperCase()}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Role</p>
              <p className="text-lg font-semibold text-gray-800 uppercase">
                {customer.role}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Total Orders</p>
              <p className="text-lg font-semibold text-gray-800">
                {customer.totalOrders || 0}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Total Spent</p>
              <p className="text-lg font-semibold text-gray-800">
                ₹{(customer.totalSpent || 0).toLocaleString('en-IN')}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Joined Date</p>
              <p className="text-lg font-semibold text-gray-800">
                {formatDate(customer.createdAt)}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Last Login</p>
              <p className="text-lg font-semibold text-gray-800">
                {customer.lastLogin ? formatDate(customer.lastLogin) : 'N/A'}
              </p>
            </div>
          </div>

          {customer.clerkId && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Clerk ID</p>
              <p className="text-sm font-mono text-gray-800">{customer.clerkId}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};