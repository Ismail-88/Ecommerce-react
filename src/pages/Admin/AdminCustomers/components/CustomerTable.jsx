import { useMemo, useState } from 'react';
import { Eye, Trash2, UserCheck, UserX } from 'lucide-react';
import { API_BASE_URL } from '../../../../context/DataContext';
import { formatINR } from '../../../../utils/formatCurrency';

import Badge from '../../../../components/ui/Badge';
import ConfirmDialog from '../../../../components/ui/ConfirmDialog';
import DataGrid from '../../../../components/ui/erp/DataGrid';
import { sortRows } from '../../../../components/ui/erp/sortRows';

const getImageUrl = (imgPath) => {
  if (!imgPath) return 'https://via.placeholder.com/100';
  if (imgPath.startsWith("http")) return imgPath;
  return `${API_BASE_URL}${imgPath}`;
};

const formatCurrency = (amount) => formatINR(amount, 2);

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const CustomerTable = ({ customers, currentPage, pageSize, onViewDetails, onDelete }) => {
  const [sortKey, setSortKey] = useState('name');
  const [sortDir, setSortDir] = useState('asc');
  const [customerToDelete, setCustomerToDelete] = useState(null);

  const columns = useMemo(() => [
    {
      key: 'customerId',
      header: 'Customer ID',
      render: (customer) => (
        <span className="font-mono text-xs font-medium text-text-muted">
          {customer._id.slice(-8).toUpperCase()}
        </span>
      ),
    },
    {
      key: 'name',
      header: 'Name',
      sortable: true,
      sortValue: (customer) => customer.name,
      render: (customer) => (
        <div className="flex items-center gap-3">
          <img
            src={getImageUrl(customer.profileImage)}
            alt={customer.name}
            onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/100'; }}
            className="w-8 h-8 rounded-full object-cover bg-surface border border-border"
          />
          <span className="text-sm font-medium text-foreground">{customer.name}</span>
        </div>
      ),
    },
    {
      key: 'email',
      header: 'Email',
      sortable: true,
      sortValue: (customer) => customer.email,
      render: (customer) => (
        <span className="text-sm text-text-muted">{customer.email}</span>
      ),
    },
    {
      key: 'role',
      header: 'Role',
      sortable: true,
      sortValue: (customer) => customer.role,
      render: (customer) => (
        <Badge tone={customer.role === 'admin' || customer.role === 'superadmin' ? 'brand' : customer.role === 'staff' ? 'info' : 'neutral'}>
          {customer.role.toUpperCase()}
        </Badge>
      ),
    },
    {
      key: 'totalOrders',
      header: 'Total Orders',
      align: 'right',
      sortable: true,
      sortValue: (customer) => customer.totalOrders || 0,
      render: (customer) => (
        <span className="text-sm text-foreground font-medium">{customer.totalOrders || 0}</span>
      ),
    },
    {
      key: 'totalSpent',
      header: 'Total Spent',
      align: 'right',
      sortable: true,
      sortValue: (customer) => customer.totalSpent || 0,
      render: (customer) => (
        <span className="text-sm text-foreground font-semibold">{formatCurrency(customer.totalSpent)}</span>
      ),
    },
    {
      key: 'joinedDate',
      header: 'Joined Date',
      sortable: true,
      sortValue: (customer) => new Date(customer.createdAt).getTime(),
      render: (customer) => (
        <span className="text-sm text-text-muted">{formatDate(customer.createdAt)}</span>
      ),
    },
    {
      key: 'isActive',
      header: 'Status',
      sortable: true,
      sortValue: (customer) => customer.isActive,
      render: (customer) => (
        <Badge tone={customer.isActive ? 'success' : 'danger'}>
          {customer.isActive ? (
            <>
              <UserCheck size={13} aria-hidden />
              Active
            </>
          ) : (
            <>
              <UserX size={13} aria-hidden />
              Inactive
            </>
          )}
        </Badge>
      ),
    },
  ], []);

  const totalPages = Math.max(1, Math.ceil(customers.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const sortedCustomers = sortRows(customers, columns, sortKey, sortDir);
  const pageRows = sortedCustomers.slice((safePage - 1) * pageSize, safePage * pageSize);

  const rowActions = (customer) => [
    {
      label: 'View Details',
      icon: <Eye size={15} aria-hidden />,
      onClick: () => onViewDetails(customer),
    },
    {
      label: 'Delete Customer',
      icon: <Trash2 size={15} aria-hidden />,
      tone: 'danger',
      onClick: () => setCustomerToDelete(customer._id),
    },
  ];

  const handleConfirmDelete = () => {
    if (customerToDelete) {
      onDelete(customerToDelete);
      setCustomerToDelete(null);
    }
  };

  return (
    <>
      <DataGrid
        columns={columns}
        rows={pageRows}
        rowKey="_id"
        sortKey={sortKey}
        sortDir={sortDir}
        onSortChange={(key, dir) => {
          setSortKey(key);
          setSortDir(dir);
        }}
        rowActions={rowActions}
        toolbar
        title="Customers"
        count={customers.length}
        emptyMessage="No customers found"
      />

      <ConfirmDialog
        open={Boolean(customerToDelete)}
        onClose={() => setCustomerToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Customer?"
        message="You won't be able to revert this!"
        confirmText="Yes, delete it"
      />
    </>
  );
};
