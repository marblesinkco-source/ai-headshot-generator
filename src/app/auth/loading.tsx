export default function AuthLoading() {
  return (
    <main id="main-content" className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-tp-dialog border border-tp-line bg-white p-8">
        <div className="mx-auto h-8 w-32 animate-pulse rounded bg-tp-line/50" />
        <div className="mt-8 space-y-4">
          <div className="h-4 w-16 animate-pulse rounded bg-tp-line/30" />
          <div className="h-10 w-full animate-pulse rounded-tp-button bg-tp-line/30" />
          <div className="h-4 w-16 animate-pulse rounded bg-tp-line/30" />
          <div className="h-10 w-full animate-pulse rounded-tp-button bg-tp-line/30" />
          <div className="h-11 w-full animate-pulse rounded-tp-button bg-tp-bronze/20" />
        </div>
      </div>
    </main>
  );
}
