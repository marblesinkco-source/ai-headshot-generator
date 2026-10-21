export default function BlogLoading() {
  return (
    <main id="main-content" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="h-10 w-40 animate-pulse rounded-tp-button bg-tp-line/50" />
      <div className="mt-4 h-5 w-72 animate-pulse rounded bg-tp-line/30" />
      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-tp-card border border-tp-line bg-white overflow-hidden">
            <div className="h-48 animate-pulse bg-tp-line/30" />
            <div className="p-5 space-y-3">
              <div className="h-4 w-20 animate-pulse rounded bg-tp-line/30" />
              <div className="h-5 w-full animate-pulse rounded bg-tp-line/40" />
              <div className="h-4 w-3/4 animate-pulse rounded bg-tp-line/30" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
