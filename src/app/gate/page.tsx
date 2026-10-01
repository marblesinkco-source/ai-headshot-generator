/**
 * Gate page — shown to visitors when the site is in TEST MODE.
 * Only whitelisted test users can access the full site.
 */

import Link from "next/link";

export const metadata = {
  title: "TailorPic — Çok Yakında",
  description: "TailorPic çok yakında hizmetinizde olacak.",
  robots: { index: false, follow: false },
};

export default function GatePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-tp-paper px-6">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Logo / Brand */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-tp-ink font-display">
            TailorPic
          </h1>
          <p className="text-tp-muted text-sm tracking-wide uppercase">
            Your Best Photo, Tailored by AI
          </p>
        </div>

        {/* Status Card */}
        <div className="bg-white rounded-tp-card border border-tp-line p-8 shadow-sm space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-tp-bronze/10 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-tp-bronze"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"
              />
            </svg>
          </div>

          <h2 className="text-xl font-semibold text-tp-ink">
            Bakım ve Geliştirme Aşamasında
          </h2>

          <p className="text-tp-muted text-sm leading-relaxed">
            Sitemiz şu anda son kontroller ve geliştirmeler için sadece test
            kullanıcılarına açıktır. Çok yakında herkese açılacağız!
          </p>

          <div className="pt-2">
            <Link
              href="/auth/login"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-tp-ink text-tp-paper text-sm font-medium rounded-tp-button hover:bg-tp-ink/90 transition-colors"
            >
              Test Kullanıcı Girişi
            </Link>
          </div>
        </div>

        {/* Contact */}
        <p className="text-tp-muted text-xs">
          Sorularınız için{" "}
          <a
            href="mailto:support@tailorpic.com"
            className="text-tp-bronze-ink underline underline-offset-2"
          >
            support@tailorpic.com
          </a>
        </p>
      </div>
    </div>
  );
}
