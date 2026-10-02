import { Briefcase, Megaphone, Building2, LineChart, Users, Palette } from 'lucide-react';

const useCases = [
  {
    icon: Briefcase,
    role: 'Startup Founders',
    scenario:
      'Need polished headshots fast for pitch decks, websites, and investor meetings — without scheduling a studio session.',
  },
  {
    icon: Megaphone,
    role: 'Marketing Teams',
    scenario:
      'Get consistent headshots across different styles — one look for LinkedIn, another for conference bios, all from the same selfies.',
  },
  {
    icon: Building2,
    role: 'Real Estate Agents',
    scenario:
      'Professional, approachable photos for signs, flyers, and listings at a fraction of the cost of a traditional photographer.',
  },
  {
    icon: LineChart,
    role: 'Financial Advisors',
    scenario:
      'Clean, trust-building portraits and multiple options to choose from, without scheduling appointments.',
  },
  {
    icon: Users,
    role: 'HR & People Teams',
    scenario:
      'Streamline headshots for new hires — everyone uploads their own photos and results arrive quickly at a budget-friendly cost.',
  },
  {
    icon: Palette,
    role: 'Freelancers & Creatives',
    scenario:
      'Find the perfect headshot that matches your personal brand across a wide range of creative styles.',
  },
];

export function Testimonials() {
  return (
    <section id="results" className="relative overflow-hidden py-24 sm:py-32">
      {/* Background accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-tp-paper via-white to-tp-paper"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-tp-bronze/10 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-tp-bronze-ink">
            Use Cases
          </p>
          <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-tp-black sm:text-4xl">
            How Professionals Use TailorPic
          </h2>
          <p className="mt-4 text-lg text-tp-muted">
            See how different professionals benefit from AI-generated headshots.
          </p>
        </div>

        {/* Cards: 1 col mobile, 2 tablet, 3 desktop */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:mt-20 md:grid-cols-2 lg:grid-cols-3">
          {useCases.map((uc) => {
            const Icon = uc.icon;
            return (
              <div
                key={uc.role}
                className="group relative flex flex-col overflow-hidden rounded-tp-card border border-tp-line bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-tp-bronze/40 hover:shadow-xl hover:shadow-tp-bronze/10"
              >
                {/* Top accent line */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-tp-bronze/0 via-tp-bronze to-tp-bronze/0 opacity-60 transition-opacity group-hover:opacity-100"
                />

                <div className="flex items-center gap-3">
                  <div
                    aria-hidden="true"
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-tp-black text-tp-bronze ring-2 ring-tp-bronze/40 ring-offset-2 ring-offset-white"
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold text-tp-black">
                    {uc.role}
                  </h3>
                </div>

                <p className="mt-5 flex-1 text-base leading-relaxed text-tp-muted">
                  {uc.scenario}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
