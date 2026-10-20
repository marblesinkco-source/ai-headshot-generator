export default function HeadshotsLoading() {
  return (
    <main id="main-content" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <div className="mx-auto h-10 w-64 animate-pulse rounded-tp-button bg-tp-line/50" />
        <div className="mx-auto mt-4 h-5 w-96 animate-pulse rounded bg-tp-line/30" />
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-tp-card border border-tp-line bg-white p-6">
            <div className="h-6 w-32 animate-pulse rounded bg-tp-line/40" />
            <div className="mt-3 h-4 w-full animate-pulse rounded bg-tp-line/30" />
            <div className="mt-6 h-8 w-20 animate-pulse rounded bg-tp-line/50" />
          </div>
        ))}
      </div>
    </main>
  );
}
