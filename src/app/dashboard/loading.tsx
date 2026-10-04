export default function DashboardLoading() {
  return (
    <div className="flex-1 p-6 lg:p-8">
      {/* Header skeleton */}
      <div className="mb-8">
        <div className="h-8 w-48 animate-pulse rounded-tp-button bg-tp-line/50" />
        <div className="mt-2 h-4 w-72 animate-pulse rounded bg-tp-line/30" />
      </div>

      {/* Stats row skeleton */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-tp-dialog border border-tp-line bg-white p-5"
          >
            <div className="h-4 w-20 animate-pulse rounded bg-tp-line/40" />
            <div className="mt-3 h-8 w-16 animate-pulse rounded bg-tp-line/50" />
          </div>
        ))}
      </div>

      {/* Content skeleton */}
      <div className="rounded-tp-dialog border border-tp-line bg-white p-6">
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="h-12 w-12 animate-pulse rounded-tp-card bg-tp-line/40" />
              <div className="flex-1">
                <div className="h-4 w-32 animate-pulse rounded bg-tp-line/40" />
                <div className="mt-2 h-3 w-48 animate-pulse rounded bg-tp-line/30" />
              </div>
              <div className="h-8 w-20 animate-pulse rounded-tp-button bg-tp-line/30" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
