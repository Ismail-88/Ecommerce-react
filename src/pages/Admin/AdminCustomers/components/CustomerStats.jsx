import { Users, UserCheck, UserPlus, ShieldCheck } from 'lucide-react';

const statStyles = [
  'text-info bg-info-soft',
  'text-success bg-success-soft',
  'text-brand-600 dark:text-brand-400 bg-brand-soft',
  'text-warning bg-warning-soft',
];

export const CustomerStats = ({ stats }) => {
  const statsConfig = [
    { label: 'Total Customers', value: stats.totalCustomers, icon: Users },
    { label: 'Active Customers', value: stats.activeCustomers, icon: UserCheck },
    { label: 'New This Month', value: stats.newCustomersThisMonth, icon: UserPlus },
    { label: 'Total Admins', value: stats.totalAdmins, icon: ShieldCheck },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {statsConfig.map((stat, index) => (
        <div key={index} className="bg-surface border border-border shadow-card p-6 rounded-2xl">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-text-muted text-sm font-medium">{stat.label}</h3>
              <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
            </div>
            <span className={`p-3 rounded-xl ${statStyles[index]}`}>
              <stat.icon size={22} aria-hidden />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
