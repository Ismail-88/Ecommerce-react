import { Search } from 'lucide-react';

export const CategorySearch = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="bg-surface border border-border shadow-card p-4 rounded-2xl mb-6">
      <div className="relative">
        <Search className="absolute left-3.5 top-3 text-text-faint" size={18} aria-hidden />
        <input
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-border bg-background text-foreground placeholder:text-text-faint rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 focus:outline-none transition-all"
        />
      </div>
    </div>
  );
};
