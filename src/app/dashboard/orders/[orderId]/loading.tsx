export default function OrderDetailLoading() {
  return (
    <div className="flex-1 p-6 lg:p-8">
      <div className="mb-8">
        <div className="h-8 w-48 animate-pulse rounded-lg bg-tp-line/50" />
        <div className="mt-2 h-4 w-36 animate-pulse rounded bg-tp-line/30" />
      </div>

      <div className="max-w-3xl space-y-6">
        <div className="rounded-2xl border border-tp-line bg-white p-6">
          <div className="h-5 w-28 animate-pulse rounded bg-tp-line/40 mb-4" />
          <div className="space-y-3">
            <div className="h-4 w-full animate-pulse rounded bg-tp-line/30" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-tp-line/30" />
          </div>
        </div>

        <div className="rounded-2xl border border-tp-line bg-white p-6">
          <div className="h-5 w-24 animate-pulse rounded bg-tp-line/40 mb-4" />
          <div className="grid gap-4 sm:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="aspect-square animate-pulse rounded-xl bg-tp-line/30" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
