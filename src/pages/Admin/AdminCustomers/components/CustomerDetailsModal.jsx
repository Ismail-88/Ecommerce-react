import Modal from '../../../../components/ui/Modal';
import Badge from '../../../../components/ui/Badge';

export const CustomerDetailsModal = ({ customer, onClose }) => {
  if (!customer) return null;

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const infoCards = [
    { label: 'Customer ID', value: customer._id.slice(-8).toUpperCase() },
    { label: 'Role', value: customer.role.toUpperCase() },
    { label: 'Total Orders', value: customer.totalOrders || 0 },
    {
      label: 'Total Spent',
      value: `$${(customer.totalSpent || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
    },
    { label: 'Joined Date', value: formatDate(customer.createdAt) },
    { label: 'Last Login', value: customer.lastLogin ? formatDate(customer.lastLogin) : 'N/A' },
  ];

  return (
    <Modal open onClose={onClose} size="lg" title="Customer Details">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <img
            src={customer.profileImage || 'https://via.placeholder.com/100'}
            alt={customer.name}
            className="w-20 h-20 rounded-full object-cover bg-surface border border-border"
          />
          <div>
            <h3 className="text-xl font-semibold text-foreground">{customer.name}</h3>
            <p className="text-text-muted">{customer.email}</p>
            <div className="mt-2">
              <Badge tone={customer.isActive ? 'success' : 'danger'}>
                {customer.isActive ? 'Active' : 'Inactive'}
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {infoCards.map((card, index) => (
            <div key={index} className="bg-surface-alt p-4 rounded-xl border border-border">
              <p className="text-sm text-text-muted">{card.label}</p>
              <p className="text-lg font-semibold text-foreground">
                {card.value}
              </p>
            </div>
          ))}
        </div>

        {customer.clerkId && (
          <div className="bg-info-soft p-4 rounded-xl border border-info/20">
            <p className="text-sm text-text-muted">Clerk ID</p>
            <p className="text-sm font-mono text-foreground">{customer.clerkId}</p>
          </div>
        )}
      </div>
    </Modal>
  );
};
