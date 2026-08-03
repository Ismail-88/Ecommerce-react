import { Filter, Search } from "lucide-react";

export const CustomerFilters = ({ searchTerm, setSearchTerm, filterRole, setFilterRole }) => {
  return (
    <div className="bg-surface border border-border shadow-card p-4 rounded-2xl mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3.5 top-3 text-text-faint" size={18} aria-hidden />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-border bg-background text-foreground placeholder:text-text-faint rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 focus:outline-none transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-text-faint" aria-hidden />
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-4 py-2.5 border border-border bg-background text-foreground rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 focus:outline-none transition-all"
          >
            <option value="all">All Users</option>
            <option value="user">Customers Only</option>
            <option value="admin">Admins</option>
            <option value="staff">Staff</option>
          </select>
        </div>
      </div>
    </div>
  );
};
