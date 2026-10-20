export default function MarketingLoading() {
  return (
    <main id="main-content" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <div className="mx-auto h-10 w-72 animate-pulse rounded-tp-button bg-tp-line/50" />
        <div className="mx-auto mt-4 h-5 w-96 animate-pulse rounded bg-tp-line/30" />
      </div>
      <div className="mt-12 space-y-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-tp-card border border-tp-line bg-white p-8">
            <div className="h-6 w-48 animate-pulse rounded bg-tp-line/40" />
            <div className="mt-4 space-y-2">
              <div className="h-4 w-full animate-pulse rounded bg-tp-line/30" />
              <div className="h-4 w-3/4 animate-pulse rounded bg-tp-line/30" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
