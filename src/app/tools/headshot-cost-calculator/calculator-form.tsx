'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Camera, Sparkles, Check, ArrowRight, Clock, TrendingDown } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type GroupId = '1' | '2-5' | '6-10' | '11-25' | '26-50' | '50+';
type TypeId = 'headshot' | 'dating' | 'pet' | 'product';
type ViewId = 'both' | 'photographer' | 'ai';

const GROUPS: { id: GroupId; label: string; count: number; min: number; max: number }[] = [
  { id: '1', label: '1', count: 1, min: 150, max: 300 },
  { id: '2-5', label: '2-5', count: 3, min: 100, max: 250 },
  { id: '6-10', label: '6-10', count: 8, min: 80, max: 200 },
  { id: '11-25', label: '11-25', count: 18, min: 60, max: 150 },
  { id: '26-50', label: '26-50', count: 38, min: 50, max: 120 },
  { id: '50+', label: '50+', count: 75, min: 40, max: 100 },
];

const TYPES: { id: TypeId; label: string; person: boolean; noun: string }[] = [
  { id: 'headshot', label: 'Professional Headshot', person: true, noun: 'person' },
  { id: 'dating', label: 'Dating Photos', person: true, noun: 'person' },
  { id: 'pet', label: 'Pet Portrait', person: false, noun: 'pet' },
  { id: 'product', label: 'Product Photo', person: false, noun: 'product' },
];

const VIEWS: { id: ViewId; label: string }[] = [
  { id: 'both', label: 'Compare both' },
  { id: 'photographer', label: 'Photographer' },
  { id: 'ai', label: 'AI (TailorPic)' },
];

const AI_PRICE = 9.9;
const STUDIO = { min: 50, max: 200 };
const MAKEUP = { min: 50, max: 100 };
const TRAVEL = { min: 20, max: 60 };

const usd = (n: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: n % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(n);

function RadioCard({
  name,
  value,
  checked,
  onChange,
  children,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  children: React.ReactNode;
}) {
  return (
    <label
      className={cn(
        'relative flex cursor-pointer items-center justify-center rounded-tp-button border-2 px-3 py-3 text-center text-sm font-medium transition-all duration-200',
        'focus-within:ring-2 focus-within:ring-tp-bronze focus-within:ring-offset-2',
        checked
          ? 'border-tp-bronze bg-tp-bronze/15 text-tp-bronze-ink shadow-sm'
          : 'border-tp-line bg-white text-tp-ink hover:border-tp-bronze/60 hover:bg-tp-paper',
      )}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      {checked && <Check className="mr-1.5 h-4 w-4 shrink-0" aria-hidden="true" />}
      {children}
    </label>
  );
}

export function CalculatorForm() {
  const [group, setGroup] = useState<GroupId>('1');
  const [type, setType] = useState<TypeId>('headshot');
  const [view, setView] = useState<ViewId>('both');

  const r = useMemo(() => {
    const g = GROUPS.find((x) => x.id === group)!;
    const t = TYPES.find((x) => x.id === type)!;
    const n = g.count;

    const shoot = { min: g.min * n, max: g.max * n };
    const studio = STUDIO;
    const travel = TRAVEL;
    const makeup = t.person ? { min: MAKEUP.min * n, max: MAKEUP.max * n } : { min: 0, max: 0 };
    // Studio and travel are shared across a group; makeup is per person.
    const photoMin = shoot.min + studio.min + travel.min + makeup.min;
    const photoMax = shoot.max + studio.max + travel.max + makeup.max;

    const aiTotal = AI_PRICE * n;
    const enterprise = n > 5;
    const hours = t.person ? Math.max(3, Math.ceil(n * 0.75) + 2) : Math.max(2, Math.ceil(n * 0.5) + 1);

    return {
      g, t, n, shoot, studio, travel, makeup, photoMin, photoMax, aiTotal, enterprise, hours,
      saveMin: Math.max(0, photoMin - aiTotal),
      saveMax: Math.max(0, photoMax - aiTotal),
      savePct: Math.round((1 - aiTotal / ((photoMin + photoMax) / 2)) * 100),
    };
  }, [group, type]);

  const showPhoto = view !== 'ai';
  const showAi = view !== 'photographer';

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,400px)_minmax(0,1fr)]">
      {/* Form */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="space-y-7 rounded-tp-card border border-tp-line bg-white p-5 shadow-sm sm:p-7"
        aria-label="Headshot cost calculator"
      >
        <fieldset>
          <legend className="text-sm font-semibold text-tp-ink">
            1. How many {r.t.noun === 'person' ? 'people' : r.t.noun + 's'} need photos?
          </legend>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {GROUPS.map((g) => (
              <RadioCard key={g.id} name="group" value={g.id} checked={group === g.id} onChange={() => setGroup(g.id)}>
                {g.label}
              </RadioCard>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-sm font-semibold text-tp-ink">2. What type of photos?</legend>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {TYPES.map((t) => (
              <RadioCard key={t.id} name="type" value={t.id} checked={type === t.id} onChange={() => setType(t.id)}>
                {t.label}
              </RadioCard>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-sm font-semibold text-tp-ink">3. Which option do you want to see?</legend>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {VIEWS.map((v) => (
              <RadioCard key={v.id} name="view" value={v.id} checked={view === v.id} onChange={() => setView(v.id)}>
                <span className="text-xs sm:text-sm">{v.label}</span>
              </RadioCard>
            ))}
          </div>
        </fieldset>
      </form>

      {/* Results */}
      <div aria-live="polite" className="space-y-5">
        {view === 'both' && (
          <div
            key={`${group}-${type}`}
            className="flex items-center gap-3 rounded-tp-card border border-emerald-200 bg-emerald-50 px-5 py-4"
          >
            <TrendingDown className="h-6 w-6 shrink-0 text-emerald-700" aria-hidden="true" />
            <p className="text-sm text-emerald-900 sm:text-base">
              You could save{' '}
              <strong className="font-bold">
                {usd(r.saveMin)} - {usd(r.saveMax)}
              </strong>{' '}
              (about {r.savePct}%) with AI{r.enterprise ? ' at list price' : ''}.
            </p>
          </div>
        )}

        <div className={cn('grid gap-5', view === 'both' && 'md:grid-cols-2')}>
          {/* Photographer */}
          <div
            className={cn(
              'overflow-hidden rounded-tp-card border border-tp-line bg-white p-5 shadow-sm transition-all duration-500 sm:p-6',
              showPhoto ? 'translate-y-0 opacity-100' : 'hidden',
            )}
          >
            <div className="flex items-center gap-2 text-tp-muted">
              <Camera className="h-5 w-5" aria-hidden="true" />
              <h3 className="text-sm font-semibold uppercase tracking-wide">Professional photographer</h3>
            </div>
            <p className="mt-4 text-3xl font-extrabold tracking-tight text-tp-ink transition-all duration-300 sm:text-4xl">
              {usd(r.photoMin)} - {usd(r.photoMax)}
            </p>
            <p className="mt-1 text-xs text-tp-muted">Estimated total for {r.n} {r.t.noun}{r.n > 1 ? 's' : ''}</p>
            <ul className="mt-5 space-y-2 border-t border-tp-line pt-4 text-sm text-tp-muted">
              <li className="flex justify-between gap-3"><span>Photography ({usd(r.g.min)}-{usd(r.g.max)} each)</span><span className="font-medium text-tp-ink">{usd(r.shoot.min)}-{usd(r.shoot.max)}</span></li>
              <li className="flex justify-between gap-3"><span>Studio rental</span><span className="font-medium text-tp-ink">{usd(r.studio.min)}-{usd(r.studio.max)}</span></li>
              {r.t.person && (
                <li className="flex justify-between gap-3"><span>Makeup &amp; grooming</span><span className="font-medium text-tp-ink">{usd(r.makeup.min)}-{usd(r.makeup.max)}</span></li>
              )}
              <li className="flex justify-between gap-3"><span>Travel &amp; parking</span><span className="font-medium text-tp-ink">{usd(r.travel.min)}-{usd(r.travel.max)}</span></li>
              <li className="flex justify-between gap-3"><span className="flex items-center gap-1.5"><Clock className="h-4 w-4" aria-hidden="true" />Time spent</span><span className="font-medium text-tp-ink">~{r.hours} hrs</span></li>
            </ul>
            <p className="mt-4 text-xs text-tp-muted">Plus booking lead time of days to weeks, and retouching often billed extra.</p>
          </div>

          {/* TailorPic */}
          <div
            className={cn(
              'relative overflow-hidden rounded-tp-card border-2 border-tp-bronze bg-tp-paper p-5 shadow-md transition-all duration-500 sm:p-6',
              showAi ? 'translate-y-0 opacity-100' : 'hidden',
            )}
          >
            {view === 'both' && (
              <span className="absolute right-4 top-4 rounded-full bg-emerald-600 px-3 py-1 text-xs font-bold text-white">
                Save up to {usd(r.saveMax)}
              </span>
            )}
            <div className="flex items-center gap-2 text-tp-bronze-ink">
              <Sparkles className="h-5 w-5" aria-hidden="true" />
              <h3 className="text-sm font-semibold uppercase tracking-wide">TailorPic AI</h3>
            </div>
            <p className="mt-4 text-3xl font-extrabold tracking-tight text-tp-ink transition-all duration-300 sm:text-4xl">
              {r.enterprise ? `From ${usd(r.aiTotal)}` : usd(r.aiTotal)}
            </p>
            <p className="mt-1 text-xs text-tp-muted">
              {r.enterprise
                ? `${usd(AI_PRICE)} per ${r.t.noun} at list price. Volume pricing is negotiable.`
                : `${usd(AI_PRICE)} per ${r.t.noun}, one-time payment`}
            </p>
            <ul className="mt-5 space-y-2 border-t border-tp-line pt-4 text-sm text-tp-muted">
              {['No studio, makeup or travel costs', 'Ready in hours, from your own device', 'Multiple styles and backgrounds', r.enterprise ? 'Team pricing and brand consistency' : 'No subscription'].map((t) => (
                <li key={t} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />{t}</li>
              ))}
            </ul>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <Link href="/auth/register" className={buttonVariants({ size: 'lg', className: 'w-full sm:w-auto' })}>
                Get Started <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              {r.enterprise && (
                <Link href="/enterprise" className={buttonVariants({ variant: 'outline', size: 'lg', className: 'w-full sm:w-auto' })}>
                  Talk to sales
                </Link>
              )}
            </div>
          </div>
        </div>

        <p className="text-xs leading-relaxed text-tp-muted">
          Photographer figures are typical US market estimates and vary by city and experience. Group estimates use a representative size ({r.n} {r.t.noun}{r.n > 1 ? 's' : ''}) for the selected range; studio and travel are shared, makeup is per person.
        </p>
      </div>
    </div>
  );
}
