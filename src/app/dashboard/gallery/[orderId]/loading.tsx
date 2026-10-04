export default function GalleryDetailLoading() {
  return (
    <div className="flex-1 p-6 lg:p-8">
      <div className="mb-8">
        <div className="h-8 w-36 animate-pulse rounded-tp-button bg-tp-line/50" />
        <div className="mt-2 h-4 w-44 animate-pulse rounded bg-tp-line/30" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="aspect-square animate-pulse rounded-tp-dialog bg-tp-line/30" />
        ))}
      </div>
    </div>
  );
}
