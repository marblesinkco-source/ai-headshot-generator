import {
  Laptop,
  Landmark,
  Stethoscope,
  Home,
  Scale,
  GraduationCap,
} from "lucide-react";

const industries = [
  { icon: Landmark, label: "Finance", description: "Banks, advisors & fintech" },
  { icon: Stethoscope, label: "Healthcare", description: "Doctors, clinics & wellness" },
  { icon: Scale, label: "Legal", description: "Attorneys & law firms" },
  { icon: Laptop, label: "Tech", description: "Startups & enterprise" },
  { icon: Home, label: "Real Estate", description: "Agents & brokerages" },
  { icon: GraduationCap, label: "Education", description: "Teachers & institutions" },
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

        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {industries.map(({ icon: Icon, label, description }) => (
            <li
              key={label}
              className="flex flex-col items-center gap-3 rounded-2xl border border-tp-line bg-tp-paper px-4 py-6 text-center shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-tp-bronze"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-tp-beige/40">
                <Icon
                  className="text-tp-bronze-ink"
                  size={22}
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </div>
              <div>
                <span className="block text-sm font-semibold text-tp-ink">
                  {label}
                </span>
                <span className="mt-1 block text-xs text-tp-muted">
                  {description}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
