import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Content (top padding offsets the fixed shared header) */}
      <main id="main-content" className="mx-auto max-w-3xl px-4 pb-12 pt-28">
        {children}
      </main>

      <Footer />
    </div>
  );
}
