import { Calendar } from 'lucide-react';

const DashboardHeader = () => {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-border bg-surface px-5 py-4">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-wider text-text-faint">
          Overview
        </p>
        <h1 className="text-xl font-bold tracking-tight text-foreground mt-0.5">
          Dashboard
        </h1>
        <p className="text-sm text-text-muted mt-0.5">
          Store performance across sales, catalog, and customers
        </p>
      </div>
      <div className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface-alt px-3 py-2 text-sm text-text-secondary">
        <Calendar size={15} className="text-text-muted" aria-hidden />
        <span className="font-medium">{today}</span>
      </div>
    </div>
  );
};

export default DashboardHeader;
