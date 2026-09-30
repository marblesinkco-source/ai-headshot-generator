import { Upload, Sparkles, Download } from 'lucide-react';

const steps = [
  {
    icon: Upload,
    title: 'Upload 4-10 Selfies',
    description:
      'Take or upload a few casual photos of yourself. Different angles and lighting work best -- no need for anything fancy.',
    step: '01',
  },
  {
    icon: Sparkles,
    title: 'AI Creates Your Model',
    description:
      'Our AI learns your unique features and generates a custom model trained specifically on you. This takes about 30 minutes.',
    step: '02',
  },
  {
    icon: Download,
    title: 'Download 120+ Headshots',
    description:
      'Choose from over 120 studio-quality headshots with different backgrounds, styles, and outfits. Ready in about 2 hours.',
    step: '03',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 sm:py-32 bg-tailor-cream/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-500">
            Simple Process
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-tailor-black sm:text-4xl">
            How it Works
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Get professional photos in three easy steps. No studio visit required.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-16 grid gap-8 sm:mt-20 lg:grid-cols-3 lg:gap-12">
          {steps.map((step, i) => (
            <div key={step.step} className="relative text-center">
              {/* Connector line (desktop only) */}
              {i < steps.length - 1 && (
                <div className="absolute left-full top-12 hidden h-px w-full -translate-x-1/2 bg-gradient-to-r from-brand-300 to-transparent lg:block" />
              )}

              {/* Icon */}
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-tailor-black text-tailor-gold ring-1 ring-brand-400/20">
                <step.icon className="h-7 w-7" strokeWidth={1.5} />
              </div>

              {/* Step number */}
              <span className="mt-4 block text-xs font-bold uppercase tracking-widest text-brand-400">
                Step {step.step}
              </span>

              <h3 className="mt-2 text-xl font-semibold text-tailor-black">{step.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
