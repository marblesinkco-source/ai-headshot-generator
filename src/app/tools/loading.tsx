export default function ToolsLoading() {
  return (
    <main id="main-content" className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="h-10 w-48 animate-pulse rounded-tp-button bg-tp-line/50" />
      <div className="mt-4 h-5 w-80 animate-pulse rounded bg-tp-line/30" />
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-tp-card border border-tp-line bg-white p-6">
            <div className="h-10 w-10 animate-pulse rounded-tp-button bg-tp-line/30" />
            <div className="mt-4 h-5 w-32 animate-pulse rounded bg-tp-line/40" />
            <div className="mt-2 h-4 w-full animate-pulse rounded bg-tp-line/30" />
          </div>
        ))}
      </div>
    </main>
  );
}
