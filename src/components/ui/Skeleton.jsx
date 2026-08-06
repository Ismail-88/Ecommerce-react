const Skeleton = ({ className = "", ...props }) => (
  <div
    aria-hidden
    className={`skeleton-shimmer rounded-md ${className}`}
    {...props}
  />
);

export const SkeletonCard = ({ className = "" }) => (
  <div className={`bg-surface border border-border rounded-xl p-5 ${className}`}>
    <Skeleton className="h-40 w-full rounded-lg mb-4" />
    <Skeleton className="h-4 w-3/4 mb-2" />
    <Skeleton className="h-4 w-1/2 mb-4" />
    <div className="flex justify-between">
      <Skeleton className="h-6 w-16" />
      <Skeleton className="h-8 w-8 rounded-full" />
    </div>
  </div>
);

export const SkeletonText = ({ lines = 3, className = "" }) => (
  <div className={`space-y-2 ${className}`} aria-hidden>
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton key={i} className={`h-4 ${i === lines - 1 ? "w-1/2" : "w-full"}`} />
    ))}
  </div>
);

export default Skeleton;
