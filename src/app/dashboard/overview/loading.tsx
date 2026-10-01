export default function OverviewLoading() {
  return (
    <div className="flex-1 p-6 lg:p-8">
      <div className="mb-8">
        <div className="h-8 w-40 animate-pulse rounded-lg bg-tp-line/50" />
        <div className="mt-2 h-4 w-56 animate-pulse rounded bg-tp-line/30" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-tp-line bg-white p-6">
            <div className="h-4 w-20 animate-pulse rounded bg-tp-line/40 mb-3" />
            <div className="h-8 w-16 animate-pulse rounded-lg bg-tp-line/50" />
          </div>
        ))}
      </div>

      <div className="mt-8 space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-tp-line bg-white p-6">
            <div className="h-5 w-32 animate-pulse rounded bg-tp-line/40 mb-3" />
            <div className="h-4 w-full animate-pulse rounded bg-tp-line/30" />
            <div className="mt-2 h-4 w-3/4 animate-pulse rounded bg-tp-line/30" />
          </div>
        ))}
      </div>
    </div>
  );
}
