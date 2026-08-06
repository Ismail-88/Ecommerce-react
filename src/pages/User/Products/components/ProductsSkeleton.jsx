const ProductsSkeleton = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
      {/* Featured skeleton */}
      <div className="col-span-full rounded-xl border border-border bg-surface overflow-hidden md:flex" aria-hidden>
        <div className="md:w-[46%] aspect-[4/3] md:aspect-auto md:min-h-[300px] bg-surface-strong animate-pulse" />
        <div className="flex-1 p-8 space-y-4">
          <div className="h-3 w-1/4 rounded-full bg-surface-strong animate-pulse" />
          <div className="h-7 w-3/4 rounded-full bg-surface-strong animate-pulse" />
          <div className="h-4 w-full rounded-full bg-surface-strong animate-pulse" />
          <div className="h-4 w-2/3 rounded-full bg-surface-strong animate-pulse" />
          <div className="h-10 w-1/3 rounded-xl bg-surface-strong animate-pulse" />
        </div>
      </div>

      {Array.from({ length: count - 1 }).map((_, i) => (
        <div key={i} className="rounded-xl border border-border bg-surface overflow-hidden" aria-hidden>
          <div className="aspect-square bg-surface-strong animate-pulse" />
          <div className="p-4 space-y-3">
            <div className="h-3 w-1/3 rounded-full bg-surface-strong animate-pulse" />
            <div className="h-4 w-full rounded-full bg-surface-strong animate-pulse" />
            <div className="h-4 w-2/3 rounded-full bg-surface-strong animate-pulse" />
            <div className="h-5 w-1/2 rounded-full bg-surface-strong animate-pulse" />
            <div className="h-10 w-full rounded-xl bg-surface-strong animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsSkeleton;
