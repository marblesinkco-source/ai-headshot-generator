import { BASE_PRICE_DISPLAY } from '@/config/pricing';
import Link from 'next/link';

const rows = [
  { feature: 'Price', studio: '$200 – $500', tailorpic: `From ${BASE_PRICE_DISPLAY}` },
  { feature: 'Time to results', studio: '1 – 2 weeks', tailorpic: '~2 hours' },
  { feature: 'Number of photos', studio: '5 – 15', tailorpic: 'Up to 160' },
  { feature: 'Scheduling', studio: 'Book days ahead', tailorpic: 'Start anytime' },
  { feature: 'Travel required', studio: 'Yes', tailorpic: 'No — upload from anywhere' },
  { feature: 'Style variety', studio: '1 – 2 looks', tailorpic: '12 categories' },
  { feature: 'Retouching', studio: 'Extra cost', tailorpic: 'Included' },
  { feature: 'Commercial rights', studio: 'Varies', tailorpic: 'Full rights included' },
];

export function StudioComparison() {
  return (
    <section className="py-16 sm:py-20" aria-labelledby="studio-cmp-title">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-7 lg:px-14">
        <div className="text-center mb-10">
          <p className="uppercase text-[11px] font-semibold tracking-[0.25em] text-tp-bronze-ink mb-3">
            Why switch?
          </p>
          <h2
            id="studio-cmp-title"
            className="font-display text-[28px] sm:text-[36px] font-normal tracking-[-0.03em] text-tp-black"
          >
            Studio photoshoot vs. TailorPic
          </h2>
          <p className="mt-3 text-tp-muted text-base max-w-lg mx-auto">
            A fraction of the cost. Results in ~2 hours, not weeks.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] border-collapse">
            <thead>
              <tr>
                <th className="text-left py-3 px-4 text-sm font-medium text-tp-muted border-b border-tp-line w-[35%]">
                  &nbsp;
                </th>
                <th className="text-center py-3 px-4 text-sm font-medium text-tp-muted border-b border-tp-line w-[32.5%]">
                  Traditional Studio
                </th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-tp-bronze-ink border-b-2 border-tp-bronze bg-tp-beige/20 rounded-t-lg w-[32.5%]">
                  TailorPic
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.feature} className={i % 2 === 0 ? 'bg-tp-paper' : ''}>
                  <td className="py-3 px-4 text-sm font-medium text-tp-ink border-b border-tp-line/60">
                    {row.feature}
                  </td>
                  <td className="text-center py-3 px-4 text-sm text-tp-muted border-b border-tp-line/60">
                    {row.studio}
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
            Get Your Photos Today <span aria-hidden="true" className="text-lg">↗</span>
          </Link>
          <p className="mt-3 text-sm text-tp-muted">One-time payment · No subscription · Full commercial rights</p>
        </div>
      </div>
    </section>
  );
}
