'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const faqs = [
  {
    question: 'How long does it take to get my photos?',
    answer:
      'Most orders are completed within 2 hours. After you upload your selfies, our AI trains a custom model on your features (about 30 minutes), then generates all your photos. You will receive an email notification as soon as they are ready to download.',
  },
  {
    question: 'How good is the quality compared to a real photographer?',
    answer:
      'Our AI produces studio-quality results that are virtually indistinguishable from professional photography. We use state-of-the-art generative AI trained on millions of professional portraits. The Executive plan delivers images in 4K resolution, suitable for print and large displays.',
  },
  {
    question: 'What kind of selfies should I upload?',
    answer:
      'Upload 4 to 10 clear photos of your face from different angles. Use good, natural lighting (near a window works great). Avoid heavy filters, sunglasses, or group photos. The more variety in angles and expressions, the better your results will be.',
  },
  {
    question: 'Is my data private and secure?',
    answer:
      'Absolutely. Your photos are encrypted in transit and at rest. We never share your images with third parties. Your AI model and all generated photos are automatically deleted from our servers 30 days after delivery. You can also request immediate deletion at any time.',
  },
  {
    question: 'Can I get a refund if I am not satisfied?',
    answer:
      'Yes. We offer a 100% money-back guarantee. If you are not happy with your photos, contact our support team within 14 days of delivery and we will issue a full refund -- no questions asked.',
  },
  {
    question: 'Can I use these photos commercially?',
    answer:
      'Yes. You own full rights to all generated photos. Use them on LinkedIn, your company website, business cards, email signatures, press kits, or anywhere else. There are no licensing restrictions or royalties.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section id="faq" className="bg-tailor-cream/40 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-500">
            FAQ
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-tailor-black sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Everything you need to know about our AI photo service.
          </p>
        </div>

        {/* Accordion */}
        <div className="mt-16 divide-y divide-brand-200/50 rounded-2xl border border-brand-200/60 bg-white">
          {faqs.map((faq, i) => (
            <div key={i}>
              <button
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-brand-50/50"
                onClick={() => toggle(i)}
                aria-expanded={openIndex === i}
              >
                <span className="text-base font-medium text-tailor-black">{faq.question}</span>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 shrink-0 text-brand-400 transition-transform duration-200',
                    openIndex === i && 'rotate-180 text-brand-600'
                  )}
                />
              </button>
              <div
                className={cn(
                  'grid transition-all duration-200',
                  openIndex === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                )}
              >
                <div className="overflow-hidden">
                  <p className="px-6 pb-5 text-base leading-relaxed text-gray-600">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
