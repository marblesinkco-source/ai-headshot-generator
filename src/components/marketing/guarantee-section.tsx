import Link from 'next/link';

const svgProps = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
} as const;

function ShieldIcon() {
  return (
    <svg {...svgProps}>
      <path d="M12 3 4.5 6v5.5c0 4.4 3.1 8.2 7.5 9.5 4.4-1.3 7.5-5.1 7.5-9.5V6L12 3Z" />
      <path d="m8.75 12 2.25 2.25L15.5 9.75" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg {...svgProps}>
      <rect x="5" y="10.5" width="14" height="10" rx="2" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
      <path d="M12 14.5v2" />
    </svg>
  );
}

function ReceiptIcon() {
  return (
    <svg {...svgProps}>
      <path d="M6 3h12v18l-2.25-1.5L13.5 21l-1.5-1.5L10.5 21l-2.25-1.5L6 21V3Z" />
      <path d="M9 8h6" />
      <path d="M9 12h6" />
    </svg>
  );
}

const items = [
  {
    Icon: ShieldIcon,
    title: 'Satisfaction Guarantee',
    description: 'Not happy with your results? We’ll work with you to regenerate until you are.',
  },
  {
    Icon: LockIcon,
    title: 'Secure & Private',
    description:
      'Your photos are encrypted in transit. Uploaded photos used for AI training are deleted within 30 days of order completion.',
  },
  {
    Icon: ReceiptIcon,
    title: 'One-Time Payment',
    description: 'Pay once per package. No subscription to cancel.',
  },
] as const;

export function GuaranteeSection() {
  return (
    <section aria-labelledby="guarantee-heading" className="bg-tp-paper py-20 lg:py-24">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-7 lg:px-14">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-tp-bronze-ink">
            Our Guarantee
          </p>
          <h2
            id="guarantee-heading"
            className="font-display mt-4 text-[30px] font-normal leading-tight tracking-[-0.03em] text-tp-ink sm:text-[40px]"
          >
            Your Satisfaction, Guaranteed
          </h2>
        </div>

        <ul className="mt-10 grid gap-5 sm:mt-14 md:grid-cols-3 lg:gap-6">
          {items.map(({ Icon, title, description }) => (
            <li
              key={title}
              className="scroll-fade-in rounded-tp-card border border-tp-line bg-white p-6 lg:p-8"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-tp-button bg-tp-beige text-tp-bronze-ink">
                <Icon />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-tp-ink">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-tp-muted">{description}</p>
            </li>
          ))}
        </ul>

        <div className="mt-10 text-center">
          <Link
            href="/guarantee"
            className="text-sm font-semibold text-tp-bronze-ink underline-offset-4 hover:underline"
          >
            Read our full guarantee &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
