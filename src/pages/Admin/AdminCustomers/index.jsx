import React, { useState } from 'react';
import { Users } from 'lucide-react';
import { ToastContainer } from 'react-toastify';

import { useCustomers } from './hooks/useCustomers';
import { CustomerStats } from './components/CustomerStats';
import { CustomerFilters } from './components/CustomerFilters';
import { CustomerTable } from './components/CustomerTable';
import { CustomerDetailsModal } from './components/CustomerDetailsModal';
import { FullPageSpinner } from '../../../components/ui/Spinner';
import { useTheme } from '../../../context/ThemeContext';

const AdminCustomers = () => {
  const { isDark } = useTheme();
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
      <div className="flex items-center justify-center min-h-[60vh]">
        <FullPageSpinner label="Loading Customers..." />
      </div>
    );
  }

  return (
    <div className="p-6 bg-background min-h-screen">
      <div className="flex items-center gap-3 mb-6">
        <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-brand-soft text-brand-600 dark:text-brand-400">
          <Users size={24} aria-hidden />
        </span>
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Customer Management</h1>
          <p className="text-sm text-text-muted">View and manage your customers</p>
        </div>
      </div>

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
        theme={isDark ? "dark" : "light"}
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
