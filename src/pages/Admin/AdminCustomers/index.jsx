import React, { useState } from 'react';
import { Users } from 'lucide-react';

import { useCustomers } from './hooks/useCustomers';
import { CustomerStats } from './components/CustomerStats';
import { CustomerFilters } from './components/CustomerFilters';
import { CustomerTable } from './components/CustomerTable';
import { CustomerDetailsModal } from './components/CustomerDetailsModal';
import Pagination from '../../../components/ui/erp/Pagination';
import { FullPageSpinner } from '../../../components/ui/Spinner';

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
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const totalPages = Math.max(1, Math.ceil(customers.length / pageSize));
  const safePage = Math.min(page, totalPages);

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
    <div className="p-6 bg-transparent min-h-screen">
      <div className="flex items-center gap-3 mb-6">
        <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-soft text-brand-600 dark:text-brand-400">
          <Users size={20} aria-hidden />
        </span>
        <div>
          <h1 className="text-xl font-bold text-foreground mb-1">Customer Management</h1>
          <p className="text-sm text-text-muted">View and manage your customers</p>
        </div>
      </div>

      <CustomerStats stats={stats} />

      <CustomerFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterRole={filterRole}
        setFilterRole={setFilterRole}
      />

      <CustomerTable
        customers={customers}
        currentPage={safePage}
        pageSize={pageSize}
        onViewDetails={handleViewDetails}
        onDelete={handleDelete}
      />

      <Pagination
        page={safePage}
        limit={pageSize}
        total={customers.length}
        onPageChange={setPage}
        onLimitChange={(limit) => {
          setPageSize(limit);
          setPage(1);
        }}
        className="mt-5"
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
