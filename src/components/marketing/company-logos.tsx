import {
  Laptop,
  Landmark,
  Stethoscope,
  Home,
  Scale,
  GraduationCap,
} from "lucide-react";

const industries = [
  { icon: Landmark, label: "Finance" },
  { icon: Stethoscope, label: "Healthcare" },
  { icon: Scale, label: "Legal" },
  { icon: Laptop, label: "Tech" },
  { icon: Home, label: "Real Estate" },
  { icon: GraduationCap, label: "Education" },
];

export function CompanyLogos() {
  return (
    <section
      aria-labelledby="industries-heading"
      className="w-full py-14 md:py-16"
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-8 md:mb-10">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-tp-bronze-ink mb-3">
            Built for professionals
          </p>
          <h2
            id="industries-heading"
            className="font-display text-2xl md:text-3xl text-tp-ink mb-3"
          >
            Professional headshots for every industry
          </h2>
          <p className="text-tp-muted text-base">
            Professional-grade results for teams of all sizes
          </p>
        </div>

        <ul className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
          {industries.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="inline-flex items-center gap-2.5 rounded-full border border-tp-line bg-tp-paper px-4 py-2.5 transition-colors hover:border-tp-bronze md:px-5 md:py-3"
            >
              <Icon
                className="text-tp-bronze-ink"
                size={20}
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <span className="text-sm font-medium text-tp-ink whitespace-nowrap">
                {label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
