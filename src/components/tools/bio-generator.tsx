'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Check, Copy, Lock, RefreshCw, Sparkles } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { BASE_PRICE_DISPLAY } from '@/config/pricing';

type ToneId = 'professional' | 'friendly' | 'authoritative' | 'creative';
type LengthId = 'short' | 'medium' | 'long';
type PersonId = 'first' | 'third';

interface FormState {
  name: string;
  title: string;
  company: string;
  industry: string;
  years: string;
  skills: string;
  achievements: string;
  education: string;
  tone: ToneId;
  length: LengthId;
  person: PersonId;
}

interface Inputs {
  name: string;
  first: string;
  title: string;
  company: string;
  field: string;
  years: number | null;
  skills: string[];
  achievements: string;
  education: string;
  tone: ToneId;
  length: LengthId;
  person: PersonId;
}

interface Ctx {
  N: string; // subject for the opening sentence (I / full name)
  S: string; // subject for later sentences (I / first name)
  Poss: string; // capitalised possessive (My / Jane's)
  poss: string;
  be: string;
  have: string;
  v: (base: string, third: string) => string;
  a: string; // article for the job title
  title: string;
  roleLine: string; // "a Senior Engineer at Acme"
  fieldIn: string; // " in technology" or ""
  field: string;
  company: string;
  fp: boolean;
}

type PieceId = 'intro' | 'exp' | 'skills' | 'ach' | 'edu' | 'drive' | 'approach' | 'value' | 'close';

interface ToneVocab {
  label: string;
  hint: string;
  record: string;
  intro: ((c: Ctx) => string)[];
  drive: ((c: Ctx) => string)[];
  approach: ((c: Ctx) => string)[];
  value: ((c: Ctx) => string)[];
  close: ((c: Ctx) => string)[];
}

const TONES: ToneId[] = ['professional', 'friendly', 'authoritative', 'creative'];

const LENGTHS: { id: LengthId; label: string; hint: string }[] = [
  { id: 'short', label: 'Short', hint: '2-3 sentences' },
  { id: 'medium', label: 'Medium', hint: '4-5 sentences' },
  { id: 'long', label: 'Long', hint: 'A full paragraph' },
];

const PERSONS: { id: PersonId; label: string; hint: string }[] = [
  { id: 'first', label: 'First person', hint: '"I am..."' },
  { id: 'third', label: 'Third person', hint: '"Jane is..."' },
];

const INDUSTRIES = [
  'Technology',
  'Finance',
  'Healthcare',
  'Legal',
  'Education',
  'Marketing',
  'Real Estate',
  'Consulting',
  'Creative',
  'Other',
];

const FIELD_PHRASES: Record<string, string> = {
  Technology: 'technology',
  Finance: 'finance',
  Healthcare: 'healthcare',
  Legal: 'the legal field',
  Education: 'education',
  Marketing: 'marketing',
  'Real Estate': 'real estate',
  Consulting: 'consulting',
  Creative: 'the creative industries',
  Other: '',
};

const VERSION_COUNT = 4;

const VOCAB: Record<ToneId, ToneVocab> = {
  professional: {
    label: 'Professional',
    hint: 'Polished and measured',
    record: 'delivering dependable, high-quality work',
    intro: [
      (c) => `${c.N} ${c.be} ${c.roleLine}${c.field ? `, working in ${c.field}` : ''}.`,
      (c) => `${c.N} ${c.v('serve', 'serves')} as ${c.roleLine}${c.field ? `, working in ${c.field}` : ''}.`,
      (c) =>
        `${c.company ? `At ${c.company}, ` : ''}${c.N} ${c.v('work', 'works')} as ${c.a} ${c.title}${c.field ? ` focused on ${c.field}` : ''}.`,
      (c) =>
        `${c.N} ${c.be} ${c.a} ${c.title}${c.company ? ` with ${c.company}` : ''}${c.field ? `, focused on ${c.field}` : ''}.`,
    ],
    drive: [
      (c) => `${c.Poss} work is built on reliable execution, clear communication, and a steady focus on results.`,
      (c) => `${c.S} ${c.v('approach', 'approaches')} every engagement with careful planning and a commitment to quality.`,
      (c) => `${c.S} ${c.v('take', 'takes')} a methodical approach to complex problems and ${c.v('keep', 'keeps')} stakeholders informed at every stage.`,
      (c) => `${c.Poss} focus is on delivering dependable outcomes that stand up over time.`,
    ],
    approach: [
      (c) => `${c.S} ${c.v('value', 'values')} accountability, collaboration, and continuous improvement.`,
      (c) => `${c.S} ${c.v('build', 'builds')} strong working relationships grounded in trust and transparency.`,
      (c) => `${c.S} ${c.v('stay', 'stays')} current with developments${c.fieldIn} and ${c.v('bring', 'brings')} that perspective to every project.`,
      (c) => `${c.S} ${c.v('set', 'sets')} clear goals, ${c.v('measure', 'measures')} progress honestly, and ${c.v('follow', 'follows')} through on commitments.`,
    ],
    value: [
      (c) => `${c.Poss} goal is to help teams and clients make well-informed decisions.`,
      (c) => `Whether leading a project or contributing as part of a team, ${c.S} ${c.v('aim', 'aims')} to add lasting value.`,
      (c) => `${c.S} ${c.v('believe', 'believes')} the best results come from listening first and acting deliberately.`,
      (c) => `${c.Poss} work reflects a belief that consistency and integrity matter as much as talent.`,
    ],
    close: [
      (c) => `${c.S} ${c.v('welcome', 'welcomes')} opportunities to connect with others${c.fieldIn}.`,
      (c) => `${c.S} ${c.be} always glad to exchange ideas with fellow professionals.`,
      () => 'Introductions and professional inquiries are always welcome.',
      (c) => `${c.S} ${c.v('look', 'looks')} forward to connecting with people who share a commitment to quality work.`,
    ],
  },
  friendly: {
    label: 'Friendly',
    hint: 'Warm and approachable',
    record: 'helping people and teams do their best work',
    intro: [
      (c) => `${c.N} ${c.be} ${c.roleLine}${c.field ? `, working in ${c.field}` : ''}.`,
      (c) =>
        `${c.company ? `Over at ${c.company}, ` : ''}${c.N} ${c.v('work', 'works')} as ${c.a} ${c.title}${c.field ? `, helping to move ${c.field} forward` : ''}.`,
      (c) =>
        `${c.N} ${c.v('love', 'loves')} being ${c.roleLine}${c.field ? `, especially because of the people and ideas in ${c.field}` : ''}.`,
      (c) =>
        `${c.N} ${c.v('wear', 'wears')} the ${c.title} hat${c.company ? ` at ${c.company}` : ''}${c.field ? ` and ${c.v('enjoy', 'enjoys')} everything ${c.field} has to offer` : ''}.`,
    ],
    drive: [
      (c) => `${c.S} ${c.v('believe', 'believes')} great work starts with good conversations and genuine curiosity.`,
      (c) => `${c.Poss} favorite part of the job is helping others succeed and learning along the way.`,
      (c) => `${c.S} ${c.v('like', 'likes')} to keep things simple, honest, and a little bit fun.`,
      (c) => `${c.S} ${c.v('thrive', 'thrives')} on collaboration and ${c.v('love', 'loves')} a good problem to solve with a team.`,
    ],
    approach: [
      (c) => `${c.S} ${c.v('try', 'tries')} to be the kind of teammate people actually enjoy working with.`,
      (c) => `${c.S} ${c.v('ask', 'asks')} plenty of questions, ${c.v('share', 'shares')} what ${c.fp ? 'I learn' : 'is learned'}, and ${c.v('keep', 'keeps')} the mood positive.`,
      (c) => `Clear, kind communication is at the heart of how ${c.S} ${c.v('work', 'works')}.`,
      (c) => `${c.S} ${c.v('keep', 'keeps')} an open door and an open mind.`,
    ],
    value: [
      (c) => `${c.S} ${c.v('believe', 'believes')} the best teams are built on trust, kindness, and a shared sense of purpose.`,
      (c) => `${c.Poss} goal is simple: do good work and make it easier for others to do theirs.`,
      (c) => `Good people and good work go hand in hand, and ${c.S} ${c.v('try', 'tries')} to bring both every day.`,
      (c) => `${c.S} ${c.v('believe', 'believes')} a little curiosity and a lot of kindness go a long way.`,
    ],
    close: [
      (c) => `${c.Poss} inbox is always open for a chat.`,
      (c) => `${c.S} ${c.be} always happy to connect, swap ideas, or just say hello.`,
      (c) => `${c.S} ${c.v('love', 'loves')} meeting new people${c.fieldIn}, so come say hi.`,
      (c) => `If you would like to connect, ${c.S} ${c.be} just a message away.`,
    ],
  },
  authoritative: {
    label: 'Authoritative',
    hint: 'Direct and results-driven',
    record: 'delivering measurable results and leading with clarity',
    intro: [
      (c) => `${c.N} ${c.be} ${c.roleLine}${c.field ? ` with a clear focus on ${c.field}` : ''}.`,
      (c) =>
        `As ${c.a} ${c.title}${c.company ? ` at ${c.company}` : ''}, ${c.N} ${c.v('drive', 'drives')} results${c.field ? ` across ${c.field}` : ''}.`,
      (c) =>
        `${c.N} ${c.v('hold', 'holds')} the position of ${c.title}${c.company ? ` at ${c.company}` : ''}${c.field ? `, operating in ${c.field}` : ''}.`,
      (c) =>
        `${c.N} ${c.v('bring', 'brings')} a decisive, results-first approach to ${c.field ? `work in ${c.field}` : 'every role'} as ${c.roleLine}.`,
    ],
    drive: [
      (c) => `${c.Poss} standards are high, and ${c.poss} focus is on outcomes that can be measured.`,
      (c) => `${c.S} ${c.v('make', 'makes')} decisions with clarity and ${c.v('own', 'owns')} the results.`,
      (c) => `${c.S} ${c.v('turn', 'turns')} complex challenges into clear plans and ${c.v('see', 'sees')} them through to completion.`,
      (c) => `${c.Poss} approach is direct: define the goal, align the team, and deliver.`,
    ],
    approach: [
      (c) => `${c.S} ${c.v('lead', 'leads')} with evidence, accountability, and a bias for action.`,
      (c) => `${c.S} ${c.v('expect', 'expects')} excellence and ${c.v('invest', 'invests')} in the people who deliver it.`,
      (c) => `${c.S} ${c.v('prioritize', 'prioritizes')} what matters and ${c.v('cut', 'cuts')} through noise.`,
      (c) => `${c.S} ${c.v('build', 'builds')} teams and systems that perform under pressure.`,
    ],
    value: [
      (c) => `${c.Poss} work is defined by ownership, discipline, and results.`,
      (c) => `${c.S} ${c.v('believe', 'believes')} leadership means taking responsibility before taking credit.`,
      (c) => `Strong strategy matters, but ${c.S} ${c.v('know', 'knows')} execution is what counts.`,
      (c) => `${c.S} ${c.v('stand', 'stands')} behind every commitment and ${c.v('deliver', 'delivers')} on it.`,
    ],
    close: [
      (c) => `${c.S} ${c.v('welcome', 'welcomes')} conversations with leaders and teams ready to move forward.`,
      (c) => `To discuss collaboration or leadership opportunities${c.fieldIn}, get in touch.`,
      (c) => `${c.S} ${c.be} open to partnerships with organizations that value results.`,
      (c) => `${c.S} ${c.v('look', 'looks')} forward to the next challenge.`,
    ],
  },
  creative: {
    label: 'Creative',
    hint: 'Vivid and original',
    record: 'turning fresh ideas into work people remember',
    intro: [
      (c) => `${c.N} ${c.be} ${c.roleLine}${c.field ? `, bringing fresh ideas to ${c.field}` : ''}.`,
      (c) => `${c.N} ${c.v('make', 'makes')} ideas happen as ${c.roleLine}${c.fieldIn}.`,
      (c) =>
        `${c.company ? `At ${c.company}, ` : ''}${c.N} ${c.v('work', 'works')} as ${c.a} ${c.title}${c.field ? `, exploring new possibilities in ${c.field}` : ''}.`,
      (c) =>
        `${c.N} ${c.be} ${c.a} ${c.title}${c.company ? ` at ${c.company}` : ''} with a passion for ${c.field ? `reimagining ${c.field}` : 'making things better'}.`,
    ],
    drive: [
      (c) => `${c.S} ${c.v('love', 'loves')} turning rough ideas into work people remember.`,
      (c) => `${c.Poss} process mixes curiosity, craft, and a healthy dose of experimentation.`,
      (c) => `${c.S} ${c.v('see', 'sees')} every project as a chance to try something new.`,
      (c) => `${c.S} ${c.v('sketch', 'sketches')}, ${c.v('test', 'tests')}, and ${c.v('refine', 'refines')} until the idea earns its place.`,
    ],
    approach: [
      (c) => `${c.S} ${c.v('approach', 'approaches')} problems from unexpected angles.`,
      (c) => `${c.S} ${c.v('mix', 'mixes')} strategy with imagination to make work that stands out.`,
      (c) => `${c.S} ${c.v('stay', 'stays')} curious and ${c.v('borrow', 'borrows')} inspiration from everywhere.`,
      (c) => `${c.S} ${c.v('believe', 'believes')} constraints are where the best ideas begin.`,
    ],
    value: [
      (c) => `${c.Poss} work sits where logic meets imagination.`,
      (c) => `${c.S} ${c.v('care', 'cares')} about details, stories, and the feeling a piece of work leaves behind.`,
      (c) => `${c.S} ${c.v('think', 'thinks')} the most interesting work happens when people try things they are not sure will work.`,
      (c) => `Playful, thoughtful, and a little bold: that is the spirit ${c.S} ${c.v('bring', 'brings')} to every project.`,
    ],
    close: [
      (c) => `${c.S} ${c.be} always up for a conversation about ideas worth chasing.`,
      (c) => `Got a half-formed idea? ${c.S} would love to hear it.`,
      (c) => `${c.Poss} door is open to collaborations that push things forward.`,
      () => 'Collaborations and curious conversations are always welcome.',
    ],
  },
};

function cap(text: string): string {
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : text;
}

function joinList(items: string[]): string {
  if (items.length <= 1) return items[0] ?? '';
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`;
}

function article(word: string): string {
  return /^[aeiou]/i.test(word.trim()) ? 'an' : 'a';
}

function yearsPhrase(years: number): string {
  return years === 1 ? 'one year' : `${years} years`;
}

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function buildContext(i: Inputs): Ctx {
  const fp = i.person === 'first';
  const poss = fp ? 'my' : `${i.first}'s`;
  const a = article(i.title);
  return {
    fp,
    N: fp ? 'I' : i.name,
    S: fp ? 'I' : i.first,
    poss,
    Poss: cap(poss),
    be: fp ? 'am' : 'is',
    have: fp ? 'have' : 'has',
    v: (base, third) => (fp ? base : third),
    a,
    title: i.title,
    roleLine: `${a} ${i.title}${i.company ? ` at ${i.company}` : ''}`,
    fieldIn: i.field ? ` in ${i.field}` : '',
    field: i.field,
    company: i.company,
  };
}

function expSentence(k: number, c: Ctx, years: number | null, record: string): string {
  if (years === null) {
    return [
      `${c.S} ${c.v('focus', 'focuses')} on ${record}.`,
      `${c.Poss} career is centered on ${record}.`,
      `${c.Poss} work${c.fieldIn} is shaped by a strong focus on ${record}.`,
      `${c.S} ${c.have} built a career centered on ${record}.`,
    ][k];
  }
  const yp = yearsPhrase(years);
  return [
    `With ${yp} of experience${c.fieldIn}, ${c.S} ${c.have} built a record of ${record}.`,
    `Over the course of ${yp}${c.fieldIn}, ${c.S} ${c.have} developed a reputation for ${record}.`,
    `${c.Poss} ${yp} of experience${c.fieldIn} ${years === 1 ? 'has' : 'have'} fostered a strong focus on ${record}.`,
    `${c.S} ${c.have} spent ${yp}${c.fieldIn} building a career centered on ${record}.`,
  ][k];
}

function skillsSentence(k: number, c: Ctx, skills: string[]): string {
  if (skills.length === 0) return '';
  const list = joinList(skills);
  return [
    `${c.Poss} strengths include ${list}.`,
    `${c.S} ${c.v('specialize', 'specializes')} in ${list}.`,
    `${c.Poss} toolkit spans ${list}.`,
    `${c.S} ${c.v('bring', 'brings')} hands-on experience in ${list}.`,
  ][k];
}

const READING_ORDER: PieceId[] = ['intro', 'exp', 'skills', 'ach', 'edu', 'drive', 'approach', 'value', 'close'];

const PRIORITY: Record<LengthId, { limit: number; order: PieceId[] }> = {
  short: { limit: 3, order: ['intro', 'skills', 'close', 'exp'] },
  medium: { limit: 5, order: ['intro', 'close', 'ach', 'skills', 'exp', 'edu', 'approach'] },
  long: {
    limit: 8,
    order: ['intro', 'close', 'ach', 'skills', 'exp', 'edu', 'approach', 'drive', 'value'],
  },
};

function generateBio(version: number, i: Inputs): string {
  const k = ((version % VERSION_COUNT) + VERSION_COUNT) % VERSION_COUNT;
  const vocab = VOCAB[i.tone];
  const c = buildContext(i);

  const pieces: Record<PieceId, string> = {
    intro: vocab.intro[k](c),
    exp: expSentence(k, c, i.years, vocab.record),
    skills: skillsSentence(k, c, i.skills),
    ach: i.achievements ? `Career highlights: ${i.achievements}.` : '',
    edu: i.education ? `${c.Poss} education includes ${i.education}.` : '',
    drive: vocab.drive[k](c),
    approach: vocab.approach[k](c),
    value: vocab.value[k](c),
    close: vocab.close[k](c),
  };

  const { limit, order } = PRIORITY[i.length];
  const chosen = new Set(order.filter((id) => pieces[id]).slice(0, limit));
  return READING_ORDER.filter((id) => chosen.has(id))
    .map((id) => pieces[id])
    .join(' ');
}

function parseInputs(f: FormState): Inputs | null {
  const name = f.name.trim().replace(/\s+/g, ' ');
  const title = f.title.trim().replace(/\s+/g, ' ');
  if (!name || !title) return null;
  const yearsNum = parseInt(f.years, 10);
  const skills = Array.from(
    new Set(
      f.skills
        .split(',')
        .map((s) => s.trim().replace(/\s+/g, ' ').slice(0, 60))
        .filter(Boolean),
    ),
  ).slice(0, 8);
  const achievements = f.achievements
    .split(/\n+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .join('; ')
    .replace(/[.;\s]+$/, '');
  const education = f.education.trim().replace(/\s+/g, ' ').replace(/[.\s]+$/, '');
  return {
    name,
    first: name.split(' ')[0],
    title,
    company: f.company.trim().replace(/\s+/g, ' '),
    field: FIELD_PHRASES[f.industry] ?? '',
    years: Number.isFinite(yearsNum) && yearsNum > 0 ? Math.min(yearsNum, 60) : null,
    skills,
    achievements,
    education,
    tone: f.tone,
    length: f.length,
    person: f.person,
  };
}

const inputClass =
  'w-full rounded-tp-button border border-tp-line bg-white px-4 py-3 text-sm text-tp-ink placeholder:text-tp-muted focus:border-tp-bronze focus:outline-none focus:ring-2 focus:ring-tp-bronze/30';

interface ChoiceOption<T extends string> {
  id: T;
  label: string;
  hint: string;
}

function ChoiceGroup<T extends string>({
  legend,
  name,
  options,
  value,
  onChange,
  columns,
}: {
  legend: string;
  name: string;
  options: ChoiceOption<T>[];
  value: T;
  onChange: (id: T) => void;
  columns: string;
}) {
  return (
    <fieldset>
      <legend className="mb-1.5 block text-sm font-medium text-tp-ink">{legend}</legend>
      <div className={`grid gap-3 ${columns}`}>
        {options.map((o) => {
          const active = value === o.id;
          return (
            <label
              key={o.id}
              className={`cursor-pointer rounded-tp-button border px-4 py-3 text-sm transition-colors focus-within:ring-2 focus-within:ring-tp-bronze/40 ${
                active
                  ? 'border-tp-bronze bg-tp-paper text-tp-ink'
                  : 'border-tp-line bg-white text-tp-ink hover:border-tp-bronze/60'
              }`}
            >
              <input
                type="radio"
                name={name}
                value={o.id}
                checked={active}
                onChange={() => onChange(o.id)}
                className="sr-only"
              />
              <span className="block font-medium">{o.label}</span>
              <span className="block text-xs text-tp-muted">{o.hint}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

export default function BioGenerator() {
  const [form, setForm] = useState<FormState>({
    name: '',
    title: '',
    company: '',
    industry: 'Technology',
    years: '',
    skills: '',
    achievements: '',
    education: '',
    tone: 'professional',
    length: 'medium',
    person: 'first',
  });
  const [generated, setGenerated] = useState<Inputs | null>(null);
  const [version, setVersion] = useState(0);
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const [showError, setShowError] = useState(false);

  const bio = useMemo(() => (generated ? generateBio(version, generated) : ''), [generated, version]);
  const words = bio ? countWords(bio) : 0;

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = parseInputs(form);
    if (!parsed) {
      setShowError(true);
      return;
    }
    setShowError(false);
    setGenerated(parsed);
    setVersion(0);
    setCopied(false);
    setCopyFailed(false);
  }

  function regenerate() {
    setVersion((prev) => (prev + 1) % VERSION_COUNT);
    setCopied(false);
    setCopyFailed(false);
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(bio);
      setCopied(true);
      setCopyFailed(false);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
      setCopyFailed(true);
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="bio-name" className="mb-1.5 block text-sm font-medium text-tp-ink">
                Full name
              </label>
              <input
                id="bio-name"
                type="text"
                className={inputClass}
                placeholder="e.g. Jane Doe"
                value={form.name}
                onChange={(e) => update('name', e.target.value)}
                maxLength={80}
                autoComplete="name"
                required
              />
            </div>
            <div>
              <label htmlFor="bio-title" className="mb-1.5 block text-sm font-medium text-tp-ink">
                Job title
              </label>
              <input
                id="bio-title"
                type="text"
                className={inputClass}
                placeholder="e.g. Product Designer"
                value={form.title}
                onChange={(e) => update('title', e.target.value)}
                maxLength={80}
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="bio-company" className="mb-1.5 block text-sm font-medium text-tp-ink">
              Company or organization <span className="font-normal text-tp-muted">(optional)</span>
            </label>
            <input
              id="bio-company"
              type="text"
              className={inputClass}
              placeholder="e.g. Northwind Studio"
              value={form.company}
              onChange={(e) => update('company', e.target.value)}
              maxLength={80}
              autoComplete="organization"
            />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="bio-industry" className="mb-1.5 block text-sm font-medium text-tp-ink">
                Industry
              </label>
              <select
                id="bio-industry"
                className={inputClass}
                value={form.industry}
                onChange={(e) => update('industry', e.target.value)}
              >
                {INDUSTRIES.map((ind) => (
                  <option key={ind} value={ind}>
                    {ind}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="bio-years" className="mb-1.5 block text-sm font-medium text-tp-ink">
                Years of experience <span className="font-normal text-tp-muted">(optional)</span>
              </label>
              <input
                id="bio-years"
                type="number"
                inputMode="numeric"
                min={0}
                max={60}
                className={inputClass}
                placeholder="e.g. 8"
                value={form.years}
                onChange={(e) => update('years', e.target.value)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="bio-skills" className="mb-1.5 block text-sm font-medium text-tp-ink">
              Key skills <span className="font-normal text-tp-muted">(comma separated)</span>
            </label>
            <input
              id="bio-skills"
              type="text"
              className={inputClass}
              placeholder="e.g. user research, prototyping, design systems"
              value={form.skills}
              onChange={(e) => update('skills', e.target.value)}
              maxLength={300}
            />
          </div>
          <div>
            <label htmlFor="bio-achievements" className="mb-1.5 block text-sm font-medium text-tp-ink">
              Achievements <span className="font-normal text-tp-muted">(optional)</span>
            </label>
            <textarea
              id="bio-achievements"
              rows={3}
              className={inputClass}
              placeholder="e.g. Led the redesign of our checkout flow"
              value={form.achievements}
              onChange={(e) => update('achievements', e.target.value)}
              maxLength={500}
            />
          </div>
          <div>
            <label htmlFor="bio-education" className="mb-1.5 block text-sm font-medium text-tp-ink">
              Education <span className="font-normal text-tp-muted">(optional)</span>
            </label>
            <input
              id="bio-education"
              type="text"
              className={inputClass}
              placeholder="e.g. a BA in Psychology from the University of Leeds"
              value={form.education}
              onChange={(e) => update('education', e.target.value)}
              maxLength={150}
            />
          </div>

          <ChoiceGroup
            legend="Tone"
            name="bio-tone"
            columns="grid-cols-2"
            value={form.tone}
            onChange={(id) => update('tone', id)}
            options={TONES.map((id) => ({ id, label: VOCAB[id].label, hint: VOCAB[id].hint }))}
          />
          <ChoiceGroup
            legend="Length"
            name="bio-length"
            columns="grid-cols-1 sm:grid-cols-3"
            value={form.length}
            onChange={(id) => update('length', id)}
            options={LENGTHS}
          />
          <ChoiceGroup
            legend="Point of view"
            name="bio-person"
            columns="grid-cols-2"
            value={form.person}
            onChange={(id) => update('person', id)}
            options={PERSONS}
          />

          {showError && (
            <p role="alert" className="text-sm text-tp-bronze-ink">
              Please enter your full name and job title to generate a bio.
            </p>
          )}
          <button
            type="submit"
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-tp-button bg-tp-black px-8 text-base font-medium text-tp-bronze shadow-md shadow-black/15 transition-all hover:bg-tp-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze focus-visible:ring-offset-2"
          >
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Generate my bio
          </button>
          <p className="flex items-center justify-center gap-2 text-xs text-tp-muted">
            <Lock className="h-3.5 w-3.5" aria-hidden="true" />
            Everything runs in your browser. Nothing is uploaded.
          </p>
        </form>

        <div aria-live="polite">
          {generated ? (
            <div className="rounded-tp-card border border-tp-line bg-tp-paper p-6">
              <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-tp-bronze-ink">
                Version {version + 1} of {VERSION_COUNT}
              </p>
              <div className="rounded-tp-button border border-tp-line bg-white p-5 text-sm leading-relaxed text-tp-ink">
                {bio}
              </div>
              <p className="mt-3 text-xs text-tp-muted">
                {words} words, {bio.length} characters
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-tp-button bg-tp-black px-5 text-sm font-medium text-tp-bronze transition-all hover:bg-tp-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze focus-visible:ring-offset-2"
                >
                  {copied ? (
                    <Check className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Copy className="h-4 w-4" aria-hidden="true" />
                  )}
                  {copied ? 'Copied' : 'Copy to clipboard'}
                </button>
                <button
                  type="button"
                  onClick={regenerate}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-tp-button border-2 border-tp-line px-5 text-sm font-medium text-tp-bronze-ink transition-all hover:border-tp-bronze hover:bg-white"
                >
                  <RefreshCw className="h-4 w-4" aria-hidden="true" />
                  Regenerate
                </button>
              </div>
              {copyFailed && (
                <p role="alert" className="mt-3 text-xs text-tp-bronze-ink">
                  Copy was blocked by your browser. Select the text above and copy it manually.
                </p>
              )}
              <p className="mt-4 text-xs leading-relaxed text-tp-muted">
                This is a starting draft built from your inputs. Review it, then add a specific result or detail from
                your own work before you publish it.
              </p>
            </div>
          ) : (
            <div className="flex h-full min-h-[240px] items-center justify-center rounded-tp-card border border-dashed border-tp-line bg-tp-paper p-8 text-center">
              <p className="max-w-xs text-sm text-tp-muted">
                Fill in your details and your bio will appear here. Use Regenerate to cycle through alternate
                versions.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-12 rounded-tp-card border border-tp-line bg-white p-6 text-center sm:p-8">
        <h2 className="font-display font-normal text-2xl text-tp-ink sm:text-3xl">
          Want a headshot to go with your bio?
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-tp-muted">
          Pair your new bio with a studio-style AI headshot. Plans start from {BASE_PRICE_DISPLAY}.
        </p>
        <Link
          href="/auth/register?redirect=/dashboard/upload"
          className={cn(buttonVariants({ variant: 'primary', size: 'lg' }), 'mt-5')}
        >
          Create my headshot
        </Link>
      </div>
    </div>
  );
}
