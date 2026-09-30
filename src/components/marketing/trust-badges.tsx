import { Shield, Lock, Clock, Trash2, CreditCard, Award } from 'lucide-react';

const badges = [
  {
    icon: Shield,
    label: 'Privacy First',
    detail: 'Your photos are never shared or used for general AI training',
  },
  {
    icon: Lock,
    label: 'Encrypted',
    detail: 'TLS/SSL encryption in transit and AES-256 at rest',
  },
  {
    icon: Trash2,
    label: 'Auto-Delete',
    detail: 'Training data and models deleted within 30 days',
  },
  {
    icon: CreditCard,
    label: 'Secure Payment',
    detail: 'PCI-compliant payments powered by Stripe',
  },
  {
    icon: Award,
    label: '100% Guarantee',
    detail: 'Full refund within 14 days if you are not satisfied',
  },
  {
    icon: Clock,
    label: 'Fast Delivery',
    detail: 'Most orders ready in under 2 hours',
  },
];

export function TrustBadges() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-7 lg:px-14">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-tp-bronze">
            Why TailorPic
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-tp-black sm:text-3xl">
            Trusted by Professionals
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 lg:gap-3">
          {badges.map((badge) => (
            <div
              key={badge.label}
              className="flex flex-col items-center text-center rounded-2xl border border-tp-line bg-white p-4 lg:p-5 transition-all hover:border-tp-bronze/30 hover:shadow-sm"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-tp-paper border border-tp-line mb-3">
                <badge.icon className="h-5 w-5 text-tp-bronze-ink" />
              </div>
              <p className="text-[13px] font-semibold text-tp-black mb-1">
                {badge.label}
              </p>
              <p className="text-[11px] leading-relaxed text-tp-muted">
                {badge.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
