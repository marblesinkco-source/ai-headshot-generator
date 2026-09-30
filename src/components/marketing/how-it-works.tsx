const steps = [
  {
    number: '01',
    title: 'Choose a category',
    description: 'Find the photo direction you need.',
  },
  {
    number: '02',
    title: 'Choose a package',
    description: 'Review the available options.',
  },
  {
    number: '03',
    title: 'Upload your photos',
    description: 'Follow the category guidelines.',
  },
  {
    number: '04',
    title: 'Create and download',
    description: 'Keep the results you love.',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-[1320px] px-4 sm:px-7 lg:px-14 py-10 lg:py-[68px]">
      <div className="flex justify-between items-center gap-4 mb-5 lg:mb-[30px]">
        <h2 className="font-display text-[25px] lg:text-[33px] leading-tight tracking-[-0.03em] font-normal">
          A clearer way to create.
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-5 lg:grid-cols-4 lg:gap-7">
        {steps.map((step) => (
          <article key={step.number} className="border-t border-[#B8A795] pt-5">
            <span className="block text-tp-bronze-ink text-xs tracking-[0.18em]">
              {step.number}
            </span>
            <h3 className="text-[13px] lg:text-base mt-3 lg:mt-[17px] mb-2 lg:mb-[9px] font-semibold">
              {step.title}
            </h3>
            <p className="text-[11px] lg:text-[13px] text-tp-muted leading-[1.7] m-0">
              {step.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
