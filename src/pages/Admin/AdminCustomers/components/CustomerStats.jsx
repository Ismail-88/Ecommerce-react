export const CustomerStats = ({ stats }) => {
  const statsConfig = [
    { label: 'Total Customers', value: stats.totalCustomers, color: 'blue' },
    { label: 'Active Customers', value: stats.activeCustomers, color: 'green' },
    { label: 'New This Month', value: stats.newCustomersThisMonth, color: 'purple' },
    { label: 'Total Admins', value: stats.totalAdmins, color: 'orange' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {statsConfig.map((stat, index) => (
        <div key={index} className={`bg-white p-6 rounded-lg shadow-md border-l-4 border-${stat.color}-500`}>
          <h3 className="text-gray-500 text-sm font-medium">{stat.label}</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};
