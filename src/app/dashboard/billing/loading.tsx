export default function BillingLoading() {
  return (
    <div className="space-y-8">
      {/* Header skeleton */}
      <div>
        <div className="h-8 w-48 animate-pulse rounded-lg bg-tp-line/50" />
        <div className="mt-2 h-4 w-64 animate-pulse rounded bg-tp-line/30" />
      </div>

      {/* Summary cards skeleton */}
      <div className="grid gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-tp-line bg-white p-6">
            <div className="h-4 w-24 animate-pulse rounded bg-tp-line/40" />
            <div className="mt-3 h-9 w-20 animate-pulse rounded-xl bg-tp-line/50" />
          </div>
        ))}
      </div>

      {/* Table skeleton */}
      <div className="rounded-2xl border border-tp-line bg-white shadow-sm">
        <div className="border-b border-tp-line px-6 py-4">
          <div className="h-6 w-32 animate-pulse rounded bg-tp-line/40" />
        </div>
        <div className="divide-y divide-tp-line/50">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-4">
                <div className="h-4 w-24 animate-pulse rounded bg-tp-line/30" />
                <div className="h-4 w-32 animate-pulse rounded bg-tp-line/40" />
              </div>
              <div className="flex items-center gap-4">
                <div className="h-4 w-16 animate-pulse rounded bg-tp-line/30" />
                <div className="h-5 w-20 animate-pulse rounded-full bg-tp-line/40" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
