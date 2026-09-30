export default function SettingsLoading() {
  return (
    <div className="flex-1 p-6 lg:p-8">
      <div className="mb-8">
        <div className="h-8 w-32 animate-pulse rounded-lg bg-tp-line/50" />
        <div className="mt-2 h-4 w-48 animate-pulse rounded bg-tp-line/30" />
      </div>

      <div className="max-w-2xl space-y-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-tp-line bg-white p-6">
            <div className="h-5 w-24 animate-pulse rounded bg-tp-line/40 mb-4" />
            <div className="h-10 w-full animate-pulse rounded-xl bg-tp-line/30" />
          </div>
        ))}
      </div>
    </div>
  );
}
