'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import { Check, Copy, Sparkles } from 'lucide-react';

const LIMIT = 220;

const INDUSTRIES = [
  'Technology', 'Finance', 'Healthcare', 'Marketing', 'Legal', 'Real Estate', 'Education',
  'Consulting', 'Design', 'Sales', 'Engineering', 'HR', 'Other',
] as const;
type Industry = (typeof INDUSTRIES)[number];

const TONES = ['Professional', 'Creative', 'Bold', 'Friendly'] as const;
type Tone = (typeof TONES)[number];

interface IndustryCopy {
  audience: string;
  result: string;
  field: string;
  topic: string;
}

const INDUSTRY_COPY: Record<Industry, IndustryCopy> = {
  Technology: { audience: 'teams', result: 'ship better products', field: 'Technology', topic: 'Building Useful Technology' },
  Finance: { audience: 'clients', result: 'make confident financial decisions', field: 'Finance', topic: 'Smart Financial Decisions' },
  Healthcare: { audience: 'patients and care teams', result: 'get better care', field: 'Healthcare', topic: 'Better Patient Outcomes' },
  Marketing: { audience: 'brands', result: 'grow their audience', field: 'Marketing', topic: 'Stories That Connect' },
  Legal: { audience: 'clients', result: 'navigate complex legal matters', field: 'Legal Practice', topic: 'Clear Legal Guidance' },
  'Real Estate': { audience: 'buyers and sellers', result: 'reach their property goals', field: 'Real Estate', topic: 'Helping People Find Home' },
  Education: { audience: 'learners', result: 'reach their potential', field: 'Education', topic: 'Lifelong Learning' },
  Consulting: { audience: 'organizations', result: 'solve their toughest problems', field: 'Consulting', topic: 'Practical Business Solutions' },
  Design: { audience: 'brands and users', result: 'create experiences people love', field: 'Design', topic: 'Thoughtful Design' },
  Sales: { audience: 'customers', result: 'find the right solution', field: 'Sales', topic: 'Building Lasting Relationships' },
  Engineering: { audience: 'teams', result: 'build reliable systems', field: 'Engineering', topic: 'Solving Hard Problems' },
  HR: { audience: 'people and teams', result: 'thrive at work', field: 'Human Resources', topic: 'Great Workplaces' },
  Other: { audience: 'clients and teams', result: 'reach their goals', field: 'Your Field', topic: 'Doing Great Work' },
};

interface ToneCopy {
  adjective: string;
  closer: string;
  cta: string;
}

const TONE_COPY: Record<Tone, ToneCopy> = {
  Professional: { adjective: 'Results', closer: 'Open to Opportunities', cta: "Let's Connect" },
  Creative: { adjective: 'Idea', closer: 'Always Curious', cta: "Let's Create Together" },
  Bold: { adjective: 'Impact', closer: 'Ready for the Next Challenge', cta: "Let's Talk" },
  Friendly: { adjective: 'People', closer: 'Happy to Chat', cta: "Say Hello" },
};

interface FormValues {
  title: string;
  industry: Industry;
  skills: string;
  years: number;
  tone: Tone;
}

function parseSkills(raw: string): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const part of raw.split(',')) {
    const s = part.trim();
    const key = s.toLowerCase();
    if (s && !seen.has(key)) {
      seen.add(key);
      out.push(s);
    }
  }
  return out;
}

function buildHeadlines(v: FormValues): string[] {
  const t = v.title.trim();
  const skills = parseSkills(v.skills);
  const s1 = skills[0] ?? t;
  const s2 = skills[1];
  const copy = INDUSTRY_COPY[v.industry];
  const tone = TONE_COPY[v.tone];
  const industryLabel = v.industry === 'Other' ? 'Business' : v.industry;
  const skillList = skills.slice(0, 3).join(', ') || s1;
  const skillPair = s2 ? `${s1} + ${s2}` : s1;

  return [
    `${t} | Helping ${copy.audience} ${copy.result} | ${s1}`,
    `${t} at ${industryLabel} | ${s1} Expert | ${v.years}+ Years of ${copy.field}`,
    `${s1} Specialist | ${t} | Passionate About ${copy.topic}`,
    `${tone.adjective}-Driven ${t} | ${skillList} | ${tone.closer}`,
    `${t} → ${industryLabel} | ${skillPair} | ${tone.cta}`,
  ];
}

export function HeadlineForm() {
  const [title, setTitle] = useState('');
  const [industry, setIndustry] = useState<Industry>('Technology');
  const [skills, setSkills] = useState('');
  const [years, setYears] = useState('5');
  const [tone, setTone] = useState<Tone>('Professional');
  const [headlines, setHeadlines] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState<number | null>(null);
  const [copyFailed, setCopyFailed] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      setError('Enter your job title.');
      return;
    }
    if (parseSkills(skills).length === 0) {
      setError('Enter at least one skill, separated by commas.');
      return;
    }
    const n = Math.round(Number(years));
    if (!Number.isFinite(n) || n < 1 || n > 40) {
      setError('Years of experience must be between 1 and 40.');
      return;
    }
    setError('');
    setCopied(null);
    setCopyFailed(false);
    setHeadlines(buildHeadlines({ title, industry, skills, years: n, tone }));
  }

  async function copy(text: string, index: number) {
    try {
      await navigator.clipboard.writeText(text);
      setCopyFailed(false);
      setCopied(index);
      setTimeout(() => setCopied((c) => (c === index ? null : c)), 2000);
    } catch {
      setCopyFailed(true);
    }
  }

  const inputClass =
    'mt-1.5 w-full rounded-tp-button border border-tp-line bg-white px-3 py-2.5 text-tp-ink placeholder:text-tp-muted focus:border-tp-bronze-ink focus:outline-none focus:ring-2 focus:ring-tp-bronze-ink/30';
  const labelClass = 'block text-sm font-semibold text-tp-ink';

  return (
    <div>
      <form onSubmit={onSubmit} className="rounded-tp-card border border-tp-line bg-white p-5 sm:p-8" noValidate>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="lh-title" className={labelClass}>Job title</label>
            <input
              id="lh-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Product Manager"
              maxLength={80}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="lh-industry" className={labelClass}>Industry</label>
            <select
              id="lh-industry"
              value={industry}
              onChange={(e) => setIndustry(e.target.value as Industry)}
              className={inputClass}
            >
              {INDUSTRIES.map((i) => (
                <option key={i} value={i}>{i}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="lh-skills" className={labelClass}>Key skills</label>
            <input
              id="lh-skills"
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="e.g. Roadmapping, Analytics, Leadership"
              maxLength={120}
              className={inputClass}
            />
            <p className="mt-1 text-xs text-tp-muted">Separate skills with commas.</p>
          </div>
          <div>
            <label htmlFor="lh-years" className={labelClass}>Years of experience</label>
            <input
              id="lh-years"
              type="number"
              min={1}
              max={40}
              value={years}
              onChange={(e) => setYears(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <fieldset className="mt-5">
          <legend className={labelClass}>Tone</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {TONES.map((t) => (
              <label key={t} className="cursor-pointer">
                <input
                  type="radio"
                  name="tone"
                  value={t}
                  checked={tone === t}
                  onChange={() => setTone(t)}
                  className="peer sr-only"
                />
                <span className="inline-block rounded-tp-button border border-tp-line bg-white px-4 py-2 text-sm font-medium text-tp-ink transition-colors peer-checked:border-tp-bronze peer-checked:bg-tp-paper peer-focus-visible:ring-2 peer-focus-visible:ring-tp-bronze/40">
                  {t}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        {error && (
          <p role="alert" className="mt-5 text-sm font-medium text-tp-bronze-ink">{error}</p>
        )}

        <button
          type="submit"
          className="mt-6 inline-flex items-center gap-2 rounded-tp-button bg-tp-black px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-tp-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze/60"
        >
          <Sparkles className="h-4 w-4" aria-hidden="true" />
          Generate headlines
        </button>
      </form>

      {headlines.length > 0 && (
        <div className="mt-10" aria-live="polite">
          <h2 className="text-2xl font-display font-normal text-tp-ink">Your headline ideas</h2>
          <p className="mt-1 text-sm text-tp-muted">
            Edit these to fit your story. LinkedIn allows up to {LIMIT} characters.
          </p>
          {copyFailed && (
            <p role="alert" className="mt-3 text-sm font-medium text-tp-bronze-ink">
              Copy was blocked by your browser. Select the text and copy it manually.
            </p>
          )}
          <ul className="mt-5 space-y-3">
            {headlines.map((h, i) => {
              const over = h.length > LIMIT;
              return (
                <li
                  key={i}
                  className="flex flex-col gap-3 rounded-tp-card border border-tp-line bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5"
                >
                  <div className="min-w-0">
                    <p className="break-words text-base text-tp-ink">{h}</p>
                    <p className={`mt-1.5 text-xs ${over ? 'font-semibold text-tp-bronze-ink' : 'text-tp-muted'}`}>
                      {h.length}/{LIMIT} characters{over ? ' (too long, shorten it)' : ''}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => copy(h, i)}
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-tp-button border border-tp-line bg-white px-4 py-2 text-sm font-semibold text-tp-ink transition-colors hover:bg-tp-paper focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze/40"
                  >
                    {copied === i ? (
                      <>
                        <Check className="h-4 w-4" aria-hidden="true" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" aria-hidden="true" /> Copy
                      </>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
