export default function RootLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-tp-paper">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-tp-line border-t-tp-bronze" />
        <p className="text-sm text-tp-muted animate-pulse">Loading...</p>
      </div>
    </div>
  );
}
