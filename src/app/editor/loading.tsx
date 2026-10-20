export default function EditorLoading() {
  return (
    <main id="main-content" className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="h-8 w-40 animate-pulse rounded-tp-button bg-tp-line/50" />
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="aspect-square animate-pulse rounded-tp-card bg-tp-line/30" />
        <div className="space-y-4">
          <div className="h-6 w-48 animate-pulse rounded bg-tp-line/40" />
          <div className="h-4 w-full animate-pulse rounded bg-tp-line/30" />
          <div className="h-40 w-full animate-pulse rounded-tp-card bg-tp-line/20" />
          <div className="h-11 w-full animate-pulse rounded-tp-button bg-tp-bronze/20" />
        </div>
      </div>
    </main>
  );
}
