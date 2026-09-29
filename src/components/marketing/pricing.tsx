import { Check } from 'lucide-react';
import { PACKAGES } from '@/config/packages';
import { formatPrice } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const featureLabels: Record<string, string> = {
  linkedin_banner: 'LinkedIn banner image',
  email_signature: 'Email signature photo',
  priority_support: 'Priority support',
};

const packages = Object.values(PACKAGES);

export function Pricing() {
  return (
    <section id="pricing" className="relative bg-gray-50/50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-600">
            Pricing
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Choose Your Plan
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            One-time payment. No subscription. Your photos are yours forever.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-16 grid gap-8 sm:mt-20 lg:grid-cols-3">
          {packages.map((pkg) => {
            const isPopular = 'recommended' in pkg && pkg.recommended;

            return (
              <Card
                key={pkg.id}
                className={cn(
                  'relative flex flex-col',
                  isPopular &&
                    'border-brand-300 shadow-lg shadow-brand-500/10 ring-1 ring-brand-200 scale-[1.02] lg:scale-105'
                )}
              >
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge>Most Popular</Badge>
                  </div>
                )}

                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    {pkg.name}
                  </CardTitle>

                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold tracking-tight text-gray-900">
                      {formatPrice(pkg.price)}
                    </span>
                    <span className="text-sm text-gray-500">one-time</span>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 space-y-4">
                  {/* Key stats */}
                  <div className="rounded-xl bg-gray-50 p-4 text-sm">
                    <div className="flex justify-between py-1">
                      <span className="text-gray-500">Headshots</span>
                      <span className="font-semibold text-gray-900">{pkg.headshots}+</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-100 py-1 pt-2">
                      <span className="text-gray-500">Backgrounds</span>
                      <span className="font-semibold text-gray-900">{pkg.backgrounds}</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-100 py-1 pt-2">
                      <span className="text-gray-500">Styles</span>
                      <span className="font-semibold text-gray-900">{pkg.styles}</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-100 py-1 pt-2">
                      <span className="text-gray-500">Resolution</span>
                      <span className="font-semibold uppercase text-gray-900">
                        {pkg.resolution}
                      </span>
                    </div>
                  </div>

                  {/* Extra features */}
                  {pkg.features.length > 0 && (
                    <ul className="space-y-2.5 pt-2">
                      {pkg.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                          <Check className="h-4 w-4 shrink-0 text-brand-500" />
                          {featureLabels[f] || f}
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>

                <CardFooter>
                  <Button
                    variant={isPopular ? 'primary' : 'outline'}
                    className="w-full"
                  >
                    Get {pkg.name}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* Trust line */}
        <p className="mt-12 text-center text-sm text-gray-500">
          Secure payment via Stripe. 100% satisfaction guaranteed or your money back.
        </p>
      </div>
    </section>
  );
}
