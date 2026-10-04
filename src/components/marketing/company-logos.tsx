import Image from "next/image";
import { getIndustryVisual, square } from "@/config/stock-portraits";

const industries = [
  { slug: "finance", label: "Finance", description: "Banks, advisors & fintech" },
  { slug: "healthcare", label: "Healthcare", description: "Doctors, clinics & wellness" },
  { slug: "legal", label: "Legal", description: "Attorneys & law firms" },
  { slug: "tech", label: "Tech", description: "Startups & enterprise" },
  { slug: "real-estate", label: "Real Estate", description: "Agents & brokerages" },
  { slug: "education", label: "Education", description: "Teachers & institutions" },
];

export function CompanyLogos() {
  return (
    <section
      aria-labelledby="industries-heading"
      className="w-full py-tp-section-sm lg:py-tp-section"
    >
      <div className="mx-auto max-w-[1320px] px-4 sm:px-7 lg:px-14">
        <div className="text-center mb-10 lg:mb-12">
          <p className="uppercase text-[11px] font-semibold tracking-[0.25em] text-tp-bronze-ink mb-3">
            Built for professionals
          </p>
          <h2
            id="industries-heading"
            className="font-display text-[30px] md:text-[40px] font-normal tracking-[-0.03em] text-tp-ink leading-tight"
          >
            Headshots for every industry
          </h2>
          <p className="mt-4 text-[15px] text-tp-muted leading-relaxed">
            Professional-grade results for teams of all sizes
          </p>
        </div>

        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {industries.map(({ slug, label, description }) => {
            const visual = getIndustryVisual(slug);
            return (
              <li
                key={slug}
                className="flex flex-col items-center gap-3 rounded-2xl border border-tp-line bg-tp-paper px-4 py-6 text-center shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-tp-bronze"
              >
                <div className="relative h-[80px] w-[80px] overflow-hidden rounded-full ring-2 ring-tp-line">
                  <Image
                    src={square(visual.heroPortraitId)}
                    alt={visual.alt}
                    width={80}
                    height={80}
                    className="object-cover"
                    sizes="80px"
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
            );
          })}
        </ul>
      </div>
    </section>
  );
}
