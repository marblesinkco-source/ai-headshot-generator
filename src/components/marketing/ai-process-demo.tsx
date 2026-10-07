import Link from 'next/link';
import { Check } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/**
 * "See How It Works" - CSS-only, auto-advancing 3-step demo.
 * One 9s infinite cycle: Upload (0-3s) -> AI Processing (3-6s) -> Results (6-9s).
 * No JS timers; everything is driven by @keyframes + animation-delay.
 * All illustrations are abstract SVG silhouettes (concept art, not real people).
 */

type Pose = 'center' | 'left' | 'right' | 'tilt';

function Silhouette({ pose = 'center', className }: { pose?: Pose; className?: string }) {
  // Different head/shoulder placements so each thumbnail reads as a different pose.
  const cfg: Record<Pose, { cx: number; cy: number; r: number; body: string; rotate: number }> = {
    center: { cx: 24, cy: 17, r: 7.5, body: 'M8 46c0-10 7-16 16-16s16 6 16 16z', rotate: 0 },
    left: { cx: 20, cy: 18, r: 7, body: 'M4 46c0-10 6-15 15-15s15 5 15 15z', rotate: 0 },
    right: { cx: 29, cy: 18, r: 7, body: 'M14 46c0-10 6-15 15-15s15 5 15 15z', rotate: 0 },
    tilt: { cx: 24, cy: 17, r: 7, body: 'M8 46c0-10 7-16 16-16s16 6 16 16z', rotate: -8 },
  };
  const c = cfg[pose];
  return (
    <svg viewBox="0 0 48 48" className={className} fill="currentColor" aria-hidden="true" focusable="false">
      <g transform={`rotate(${c.rotate} 24 30)`}>
        <circle cx={c.cx} cy={c.cy} r={c.r} />
        <path d={c.body} />
      </g>
    </svg>
  );
}

const UPLOADS: { pose: Pose; delay: string }[] = [
  { pose: 'center', delay: '0s' },
  { pose: 'left', delay: '0.35s' },
  { pose: 'right', delay: '0.7s' },
  { pose: 'tilt', delay: '1.05s' },
];

const RESULTS: { pose: Pose; tile: string; figure: string; delay: string }[] = [
  { pose: 'center', tile: 'bg-tp-beige', figure: 'text-tp-ink', delay: '0s' },
  { pose: 'left', tile: 'bg-tp-black', figure: 'text-tp-paper', delay: '0.35s' },
  { pose: 'right', tile: 'bg-tp-bronze', figure: 'text-tp-black', delay: '0.7s' },
  { pose: 'tilt', tile: 'bg-tp-paper border border-tp-line', figure: 'text-tp-bronze-ink', delay: '1.05s' },
];

// Particle positions (percent of the 160px stage) for the processing step.
const PARTICLES = [
  { top: '12%', left: '22%', delay: '0s' },
  { top: '20%', left: '76%', delay: '0.4s' },
  { top: '48%', left: '8%', delay: '0.8s' },
  { top: '52%', left: '90%', delay: '1.2s' },
  { top: '82%', left: '28%', delay: '1.6s' },
  { top: '86%', left: '72%', delay: '2s' },
];

const STEPS = [
  { n: 1, label: 'Upload 4-10 selfies', detail: 'Add a few clear photos of your face.' },
  { n: 2, label: 'AI learns your unique features', detail: 'Our model studies your likeness.' },
  { n: 3, label: 'Get studio-quality photos', detail: 'Pick your favorites and download.' },
];

const CSS = `
.tp-demo { --tp-demo-cycle: 9s; }
.tp-demo .d-anim { animation-duration: var(--tp-demo-cycle); animation-iteration-count: infinite; animation-timing-function: ease-in-out; animation-fill-mode: both; }

/* Pane emphasis: each step brightens during its own third of the cycle */
@keyframes tpDemoPane1 { 0%{opacity:1;transform:scale(1)} 30%{opacity:1;transform:scale(1)} 36%{opacity:.5;transform:scale(.98)} 94%{opacity:.5;transform:scale(.98)} 100%{opacity:1;transform:scale(1)} }
@keyframes tpDemoPane2 { 0%{opacity:.5;transform:scale(.98)} 30%{opacity:.5;transform:scale(.98)} 36%{opacity:1;transform:scale(1)} 63%{opacity:1;transform:scale(1)} 69%{opacity:.5;transform:scale(.98)} 100%{opacity:.5;transform:scale(.98)} }
@keyframes tpDemoPane3 { 0%{opacity:.5;transform:scale(.98)} 63%{opacity:.5;transform:scale(.98)} 69%{opacity:1;transform:scale(1)} 94%{opacity:1;transform:scale(1)} 100%{opacity:.5;transform:scale(.98)} }

/* Numbered circle highlight (overlay fades in during the step's window) */
@keyframes tpDemoDot1 { 0%{opacity:1} 30%{opacity:1} 36%{opacity:0} 94%{opacity:0} 100%{opacity:1} }
@keyframes tpDemoDot2 { 0%{opacity:0} 30%{opacity:0} 36%{opacity:1} 63%{opacity:1} 69%{opacity:0} 100%{opacity:0} }
@keyframes tpDemoDot3 { 0%{opacity:0} 63%{opacity:0} 69%{opacity:1} 94%{opacity:1} 100%{opacity:0} }

/* Progress line segments: fill as the demo advances to the next step */
@keyframes tpDemoLine1 { 0%,24%{transform:scale(0)} 36%{transform:scale(1)} 94%{transform:scale(1)} 100%{transform:scale(0)} }
@keyframes tpDemoLine2 { 0%,57%{transform:scale(0)} 69%{transform:scale(1)} 94%{transform:scale(1)} 100%{transform:scale(0)} }

/* Step 1 */
@keyframes tpDemoPop { 0%{opacity:0;transform:translateY(8px) scale(.85)} 5%{opacity:1;transform:translateY(0) scale(1)} 92%{opacity:1;transform:translateY(0) scale(1)} 100%{opacity:0;transform:translateY(0) scale(.95)} }
@keyframes tpDemoBar { 0%{transform:scaleX(0)} 30%{transform:scaleX(1)} 92%{transform:scaleX(1)} 100%{transform:scaleX(0)} }

/* Step 2 */
@keyframes tpDemoSpin { from{transform:rotate(0deg)} to{transform:rotate(1080deg)} }
@keyframes tpDemoSpinRev { from{transform:rotate(0deg)} to{transform:rotate(-720deg)} }
@keyframes tpDemoPulse { 0%,100%{transform:scale(.92)} 5.5%{transform:scale(1.08)} 11%{transform:scale(.92)} 16.5%{transform:scale(1.08)} 22%{transform:scale(.92)} 27.5%{transform:scale(1.08)} 33%{transform:scale(.92)} 38.5%{transform:scale(1.08)} 44%{transform:scale(.92)} 49.5%{transform:scale(1.08)} 55%{transform:scale(.92)} 60.5%{transform:scale(1.08)} 66%{transform:scale(.92)} 71.5%{transform:scale(1.08)} 77%{transform:scale(.92)} 82.5%{transform:scale(1.08)} 88%{transform:scale(.92)} 94%{transform:scale(1.08)} }
@keyframes tpDemoRing { 0%{opacity:0;transform:scale(.6)} 8%{opacity:.5} 22%{opacity:0;transform:scale(1.5)} 100%{opacity:0;transform:scale(1.5)} }
@keyframes tpDemoTwinkle { 0%,30%{opacity:0;transform:scale(.4)} 40%{opacity:1;transform:scale(1)} 55%{opacity:.2;transform:scale(.6)} 66%{opacity:1;transform:scale(1)} 72%,100%{opacity:0;transform:scale(.4)} }

/* Step 3 */
@keyframes tpDemoResult { 0%,64%{opacity:0;transform:scale(.88)} 70%{opacity:1;transform:scale(1)} 92%{opacity:1;transform:scale(1)} 100%{opacity:0;transform:scale(.95)} }
@keyframes tpDemoCheck { 0%,68%{opacity:0;transform:scale(0)} 74%{opacity:1;transform:scale(1.15)} 78%{opacity:1;transform:scale(1)} 92%{opacity:1;transform:scale(1)} 100%{opacity:0;transform:scale(.6)} }

.tp-demo .a-pane1 { animation-name: tpDemoPane1; }
.tp-demo .a-pane2 { animation-name: tpDemoPane2; }
.tp-demo .a-pane3 { animation-name: tpDemoPane3; }
.tp-demo .a-dot1 { animation-name: tpDemoDot1; }
.tp-demo .a-dot2 { animation-name: tpDemoDot2; }
.tp-demo .a-dot3 { animation-name: tpDemoDot3; }
.tp-demo .a-line1 { animation-name: tpDemoLine1; }
.tp-demo .a-line2 { animation-name: tpDemoLine2; }
.tp-demo .a-pop { animation-name: tpDemoPop; }
.tp-demo .a-bar { animation-name: tpDemoBar; transform-origin: left center; }
.tp-demo .a-spin { animation-name: tpDemoSpin; animation-timing-function: linear; }
.tp-demo .a-spin-rev { animation-name: tpDemoSpinRev; animation-timing-function: linear; }
.tp-demo .a-pulse { animation-name: tpDemoPulse; }
.tp-demo .a-ring { animation-name: tpDemoRing; animation-timing-function: ease-out; }
.tp-demo .a-twinkle { animation-name: tpDemoTwinkle; }
.tp-demo .a-result { animation-name: tpDemoResult; }
.tp-demo .a-check { animation-name: tpDemoCheck; }

/* Progress segments grow from their start edge: left on desktop, top on mobile */
.tp-demo .line-fill { transform-origin: top left; }

@media (prefers-reduced-motion: reduce) {
  .tp-demo .d-anim { animation: none !important; }
  .tp-demo .a-pane1, .tp-demo .a-pane2, .tp-demo .a-pane3 { opacity: 1; transform: none; }
  .tp-demo .a-dot1, .tp-demo .a-dot2, .tp-demo .a-dot3 { opacity: 0; }
  .tp-demo .a-line1, .tp-demo .a-line2 { transform: scale(1); }
  .tp-demo .a-pop, .tp-demo .a-result, .tp-demo .a-check { opacity: 1; transform: none; }
  .tp-demo .a-bar { transform: scaleX(1); }
  .tp-demo .a-ring { opacity: .25; transform: scale(1.15); }
  .tp-demo .a-twinkle { opacity: .8; transform: none; }
}
`;

function StepVisual({ step }: { step: 1 | 2 | 3 }) {
  const frame =
    'relative flex h-44 w-full max-w-[17rem] items-center justify-center overflow-hidden rounded-tp-card border border-tp-line bg-tp-paper';

  if (step === 1) {
    return (
      <div className={cn(frame, 'd-anim a-pane1 flex-col gap-4 px-5')} aria-hidden="true">
        <div className="grid grid-cols-4 gap-2.5">
          {UPLOADS.map((u, i) => (
            <div
              key={i}
              className="d-anim a-pop flex h-14 w-12 items-end justify-center overflow-hidden rounded-tp-button border border-tp-line bg-tp-beige text-tp-muted sm:w-14"
              style={{ animationDelay: u.delay }}
            >
              <Silhouette pose={u.pose} className="h-12 w-12" />
            </div>
          ))}
        </div>
        <div className="w-full">
          <div className="mb-1.5 flex justify-between text-[11px] font-medium text-tp-muted">
            <span>Uploading</span>
            <span>4 selfies</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-tp-beige">
            <div className="d-anim a-bar h-full w-full rounded-full bg-tp-bronze" />
          </div>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className={cn(frame, 'd-anim a-pane2')} aria-hidden="true">
        <div className="relative h-36 w-36">
          {/* Expanding rings */}
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="d-anim a-ring absolute inset-6 rounded-full border border-tp-bronze"
              style={{ animationDelay: `${i * 0.5}s` }}
            />
          ))}
          {/* Orbit rings with dots */}
          <div className="d-anim a-spin absolute inset-1">
            <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-tp-bronze" />
            <span className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-tp-ink" />
            <span className="absolute left-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-tp-bronze-ink" />
          </div>
          <div className="d-anim a-spin-rev absolute inset-5 rounded-full border border-dashed border-tp-line">
            <span className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 translate-x-1/2 rounded-full bg-tp-bronze" />
            <span className="absolute left-0 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-tp-ink" />
          </div>
          {/* Central circle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="d-anim a-pulse flex h-14 w-14 items-center justify-center rounded-full bg-tp-black text-tp-bronze">
              <Silhouette pose="center" className="h-9 w-9" />
            </div>
          </div>
        </div>
        {/* Particles */}
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="d-anim a-twinkle absolute h-1.5 w-1.5 rounded-full bg-tp-bronze"
            style={{ top: p.top, left: p.left, animationDelay: p.delay }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={cn(frame, 'd-anim a-pane3 px-5')} aria-hidden="true">
      <div className="grid grid-cols-2 gap-2.5">
        {RESULTS.map((r, i) => (
          <div
            key={i}
            className={cn(
              'd-anim a-result relative flex h-[4.25rem] w-[4.5rem] items-end justify-center overflow-hidden rounded-tp-button sm:w-20',
              r.tile,
              r.figure
            )}
            style={{ animationDelay: r.delay }}
          >
            <Silhouette pose={r.pose} className="h-14 w-14" />
            <span
              className="d-anim a-check absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-tp-black text-tp-paper"
              style={{ animationDelay: r.delay }}
            >
              <Check className="h-2.5 w-2.5" strokeWidth={3} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AIProcessDemo() {
  const paneClass = ['a-dot1', 'a-dot2', 'a-dot3'];

  return (
    <section className="tp-demo bg-tp-beige py-16 sm:py-20" aria-labelledby="ai-process-demo-heading">
      <style>{CSS}</style>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-tp-bronze-ink">See AI in Action</p>
          <h2
            id="ai-process-demo-heading"
            className="mt-3 font-display text-3xl font-normal text-tp-black sm:text-4xl lg:text-5xl"
          >
            See How It Works
          </h2>
          <p className="mt-4 text-base text-tp-muted sm:text-lg">
            From selfies to studio-quality headshots in three simple steps
          </p>
        </div>

        <ol className="mt-12 flex flex-col sm:mt-14 md:flex-row">
          {STEPS.map((s, i) => {
            const isLast = i === STEPS.length - 1;
            return (
              <li
                key={s.n}
                className={cn(
                  'relative flex flex-1 flex-col items-center text-center',
                  !isLast && 'pb-10 md:pb-0'
                )}
              >
                {/* Progress line segment to the next step */}
                {!isLast && (
                  <>
                    <span
                      aria-hidden="true"
                      className="absolute left-1/2 top-5 -ml-px h-full w-0.5 bg-tp-line md:ml-0 md:h-0.5 md:w-full"
                    />
                    <span
                      aria-hidden="true"
                      className={cn(
                        'd-anim line-fill absolute left-1/2 top-5 -ml-px h-full w-0.5 bg-tp-bronze md:ml-0 md:h-0.5 md:w-full',
                        i === 0 ? 'a-line1' : 'a-line2'
                      )}
                      style={{ transformOrigin: 'top left' }}
                    />
                  </>
                )}

                {/* Numbered circle */}
                <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-tp-line bg-tp-paper text-sm font-semibold text-tp-black">
                  <span
                    aria-hidden="true"
                    className={cn('d-anim absolute inset-0 rounded-full bg-tp-bronze', paneClass[i])}
                  />
                  <span className="relative">
                    <span className="sr-only">Step </span>
                    {s.n}
                  </span>
                </div>
                <div className="mt-5 flex w-full justify-center px-2">
                  <StepVisual step={s.n as 1 | 2 | 3} />
                </div>

                <h3 className="mt-5 text-base font-semibold text-tp-black">{s.label}</h3>
                <p className="mt-1 max-w-[15rem] text-sm text-tp-muted">{s.detail}</p>
              </li>
            );
          })}
        </ol>

        <div className="mt-12 text-center sm:mt-14">
          <p className="font-display text-2xl font-normal text-tp-black sm:text-3xl">Ready to try?</p>
          <Link
            href="/headshots"
            className={cn(buttonVariants({ variant: 'primary', size: 'lg' }), 'mt-5')}
          >
            Create your headshots
          </Link>
        </div>
      </div>
    </section>
  );
}
