export default function GalleryLoading() {
  return (
    <div className="flex-1 p-6 lg:p-8">
      <div className="mb-8">
        <div className="h-8 w-36 animate-pulse rounded-lg bg-tp-line/50" />
        <div className="mt-2 h-4 w-56 animate-pulse rounded bg-tp-line/30" />
      </div>

      {/* Photo grid skeleton */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="aspect-[3/4] animate-pulse rounded-2xl bg-tp-line/40"
          />
        ))}
      </div>
    </div>
  );
}
