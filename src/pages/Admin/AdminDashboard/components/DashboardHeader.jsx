import { Sparkles, Calendar } from 'lucide-react';

const DashboardHeader = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-brand-soft via-surface to-surface shadow-card p-8">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 via-transparent to-transparent"></div>
      <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={22} className="text-brand-600 dark:text-brand-400" aria-hidden />
            <span className="text-sm font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              Admin Dashboard
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black mb-2 text-foreground">
            Welcome back, Admin!
          </h1>
          <p className="text-lg text-text-muted">
            Here's what's happening with your store today
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-6 text-center shadow-card">
          <Calendar size={24} className="mx-auto mb-2 text-brand-600 dark:text-brand-400" aria-hidden />
          <p className="text-sm mb-1 text-text-muted">
            Today's Date
          </p>
          <p className="text-xl font-black text-foreground">
            {new Date().toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
