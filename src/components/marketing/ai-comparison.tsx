import { BASE_PRICE_DISPLAY } from '@/config/pricing';
import Link from 'next/link';

const rows = [
  { feature: 'Training', generic: 'Generic, not personalized', tailorpic: 'Trained on YOUR photos' },
  { feature: 'Face accuracy', generic: 'Often distorted or inconsistent', tailorpic: 'Preserves your actual likeness' },
  { feature: 'Professional quality', generic: 'Unpredictable results', tailorpic: 'Studio-grade output' },
  { feature: 'Background options', generic: 'Manual prompting required', tailorpic: 'Pre-designed professional scenes' },
  { feature: 'Consistency', generic: 'Different face each time', tailorpic: 'Consistent across all photos' },
  { feature: 'Ease of use', generic: 'Complex prompt engineering', tailorpic: 'Upload selfies, pick a style' },
  { feature: 'Commercial rights', generic: 'Varies by platform', tailorpic: 'Full rights included' },
  { feature: 'Price', generic: 'Free – $20/month subscription', tailorpic: `From ${BASE_PRICE_DISPLAY} one-time` },
];

export function AIComparison() {
  return (
    <section className="py-16 sm:py-20" aria-labelledby="ai-cmp-title">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-7 lg:px-14">
        <div className="text-center mb-10">
          <p className="uppercase text-[11px] font-semibold tracking-[0.25em] text-tp-bronze-ink mb-3">
            AI headshots done right
          </p>
          <h2
            id="ai-cmp-title"
            className="font-display text-[28px] sm:text-[36px] font-normal tracking-[-0.03em] text-tp-black"
          >
            Generic AI vs. TailorPic
          </h2>
          <p className="mt-3 text-tp-muted text-base max-w-lg mx-auto">
            Why purpose-built AI headshots outperform generic image generators.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] border-collapse">
            <caption className="sr-only">Generic AI tools (ChatGPT/DALL-E, Midjourney) compared with TailorPic</caption>
            <thead>
              <tr>
                <th scope="col" className="text-left py-3 px-4 text-sm font-medium text-tp-muted border-b border-tp-line w-[30%]">
                  Feature
                </th>
                <th scope="col" className="text-center py-3 px-4 text-sm font-medium text-tp-muted border-b border-tp-line w-[35%]">
                  Generic AI Tools
                </th>
                <th scope="col" className="text-center py-3 px-4 text-sm font-semibold text-tp-bronze-ink border-b-2 border-tp-bronze bg-tp-beige/20 rounded-t-lg w-[35%]">
                  TailorPic
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.feature} className={i % 2 === 0 ? 'bg-tp-paper' : ''}>
                  <th scope="row" className="text-left py-3 px-4 text-sm font-medium text-tp-ink border-b border-tp-line/60">
                    {row.feature}
                  </th>
                  <td className="text-center py-3 px-4 text-sm text-tp-muted border-b border-tp-line/60">
                    {row.generic}
                  </td>
                  <td className="text-center py-3 px-4 text-sm font-medium text-tp-ink border-b border-tp-line/60 bg-tp-beige/10">
                    <span className="inline-flex items-center gap-1.5">
                      <svg className="h-4 w-4 text-tp-bronze-ink flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      {row.tailorpic}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-center mt-8">
          <Link
            href="/auth/register?redirect=%2Fdashboard%2Fupload"
            className="inline-flex items-center gap-2 rounded-tp-button bg-tp-black px-8 py-3.5 text-[15px] font-semibold text-tp-paper shadow-md transition-all hover:-translate-y-0.5 hover:bg-tp-ink hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tp-bronze"
          >
            Try TailorPic Now <span aria-hidden="true" className="text-lg">↗</span>
          </Link>
          <p className="mt-3 text-sm text-tp-muted">One-time payment · No subscription · Full commercial rights</p>
        </div>
      </div>
    </section>
  );
}
