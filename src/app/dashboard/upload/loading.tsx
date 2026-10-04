export default function UploadLoading() {
  return (
    <div className="flex-1 p-6 lg:p-8">
      <div className="mb-8">
        <div className="h-8 w-40 animate-pulse rounded-tp-button bg-tp-line/50" />
        <div className="mt-2 h-4 w-64 animate-pulse rounded bg-tp-line/30" />
      </div>

      {/* Upload zone skeleton */}
      <div className="mx-auto max-w-2xl">
        <div className="h-64 animate-pulse rounded-tp-dialog border-2 border-dashed border-tp-line bg-tp-paper/50" />
        <div className="mt-6 h-12 w-full animate-pulse rounded-tp-card bg-tp-line/40" />
      </div>
    </div>
  );
}
