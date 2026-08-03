import { useState } from 'react';
import { Eye, Trash2, UserCheck, UserX } from 'lucide-react';
import { API_BASE_URL } from '../../../../context/DataContext';

import Badge from '../../../../components/ui/Badge';
import ConfirmDialog from '../../../../components/ui/ConfirmDialog';

export const CustomerTable = ({ customers, onViewDetails, onDelete }) => {
  const [customerToDelete, setCustomerToDelete] = useState(null);

  const getImageUrl = (imgPath) => {
    if (!imgPath) return 'https://via.placeholder.com/100';
    if (imgPath.startsWith("http")) return imgPath;
    return `${API_BASE_URL}${imgPath}`;
  };

  const formatCurrency = (amount) => {
    return (amount || 0.0).toLocaleString("en-US", {
      style: "currency",
      currency: "USD"
    });
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleConfirmDelete = () => {
    if (customerToDelete) {
      onDelete(customerToDelete);
      setCustomerToDelete(null);
    }
  };

  return (
    <div className="bg-surface rounded-2xl border border-border shadow-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-surface-alt border-b border-border">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">Customer ID</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">Name</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">Email</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">Role</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">Total Orders</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">Total Spent</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">Joined Date</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {customers.length === 0 ? (
              <tr>
                <td colSpan="9" className="px-6 py-8 text-center text-text-muted">
                  No customers found
                </td>
              </tr>
            ) : (
              customers.map((customer) => (
                <tr key={customer._id} className="hover:bg-surface-alt transition-colors">
                  <td className="px-6 py-4 text-sm text-foreground font-medium">
                    {customer._id.slice(-8).toUpperCase()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={getImageUrl(customer.profileImage)}
                        alt={customer.name}
                        className="w-10 h-10 rounded-full object-cover bg-surface"
                      />
                      <span className="text-sm font-medium text-foreground">{customer.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-text-muted">{customer.email}</td>
                  <td className="px-6 py-4">
                    <Badge tone={customer.role === 'admin' || customer.role === 'superadmin' ? 'brand' : customer.role === 'staff' ? 'info' : 'neutral'}>
                      {customer.role.toUpperCase()}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground font-medium">
                    {customer.totalOrders || 0}
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground font-semibold">
                    {formatCurrency(customer.totalSpent)}
                  </td>
                  <td className="px-6 py-4 text-sm text-text-muted">
                    {formatDate(customer.createdAt)}
                  </td>
                  <td className="px-6 py-4">
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
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => onViewDetails(customer)}
                        className="p-2 text-info hover:bg-info-soft rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye size={18} aria-hidden />
                      </button>
                      <button
                        onClick={() => setCustomerToDelete(customer._id)}
                        className="p-2 text-danger hover:bg-danger-soft rounded-lg transition-colors"
                        title="Delete Customer"
                      >
                        <Trash2 size={18} aria-hidden />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        open={Boolean(customerToDelete)}
        onClose={() => setCustomerToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Customer?"
        message="You won't be able to revert this!"
        confirmText="Yes, delete it"
      />
    </div>
  );
};
