import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';

import { useCustomers } from './hooks/useCustomers';
import { CustomerStats } from './components/CustomerStats';
import { CustomerFilters } from './components/CustomerFilters';
import { CustomerTable } from './components/CustomerTable';
import { CustomerDetailsModal } from './components/CustomerDetailsModal';

const AdminCustomers = () => {
  const {
    customers,
    loading,
    searchTerm,
    setSearchTerm,
    filterRole,
    setFilterRole,
    deleteCustomer,
    stats,
  } = useCustomers();

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleViewDetails = (customer) => {
    setSelectedCustomer(customer);
    setShowDetails(true);
  };

  const handleDelete = async (id) => {
    await deleteCustomer(id);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold text-lg">Loading Customers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      <h1 className="text-3xl font-bold text-gray-800 mb-8">Customer Management</h1>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <CustomerStats stats={stats} />

      <CustomerFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterRole={filterRole}
        setFilterRole={setFilterRole}
      />

      <CustomerTable
        customers={customers}
        onViewDetails={handleViewDetails}
        onDelete={handleDelete}
      />

      {showDetails && selectedCustomer && (
        <CustomerDetailsModal
          customer={selectedCustomer}
          onClose={() => setShowDetails(false)}
        />
      )}
    </div>
  );
};

export default AdminCustomers;