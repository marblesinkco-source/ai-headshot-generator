import {
  Laptop,
  Building,
  Stethoscope,
  Home,
  Scale,
  Megaphone,
  GraduationCap,
  Briefcase,
} from "lucide-react";

const industries = [
  { icon: Laptop, label: "Tech & Startups" },
  { icon: Building, label: "Finance & Banking" },
  { icon: Stethoscope, label: "Healthcare" },
  { icon: Home, label: "Real Estate" },
  { icon: Scale, label: "Legal" },
  { icon: Megaphone, label: "Marketing & Media" },
  { icon: GraduationCap, label: "Education" },
  { icon: Briefcase, label: "Consulting" },
];

export function CompanyLogos() {
  return (
    <section className="w-full py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="font-display text-2xl md:text-3xl text-tp-ink mb-3">
            Trusted by Professionals Everywhere
          </h2>
          <p className="text-tp-muted text-base">
            From startups to Fortune 500 teams
          </p>
        </div>

        {/* Industry icons grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-8 gap-4 md:gap-6 mb-14">
          {industries.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-3 rounded-tp-card border border-tp-line bg-tp-paper/60 px-4 py-6 transition-colors hover:border-tp-bronze/40"
            >
              <Icon
                className="text-tp-bronze-ink"
                size={28}
                strokeWidth={1.5}
              />
              <span className="text-xs text-tp-muted text-center leading-tight font-medium">
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom stats line */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-tp-button border border-tp-line bg-tp-paper/80 px-5 py-2.5">
            <span className="text-sm text-tp-muted">
              Join thousands of professionals who&apos;ve upgraded their image
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
