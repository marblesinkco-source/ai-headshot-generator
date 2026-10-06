'use client';

import { useMemo, useState } from 'react';
import { Check, Copy, RefreshCw, ArrowLeft, ArrowRight } from 'lucide-react';

type ToneId = 'professional' | 'casual' | 'confident' | 'creative';

interface FormState {
  jobTitle: string;
  industry: string;
  years: string;
  skills: string;
  tone: ToneId;
}

interface Inputs {
  title: string;
  industry: string;
  years: number | null;
  skills: string[];
  tone: ToneId;
}

interface Para {
  text: string;
  optional?: boolean;
}

const TONES: { id: ToneId; label: string; hint: string }[] = [
  { id: 'professional', label: 'Professional', hint: 'Polished and measured' },
  { id: 'casual', label: 'Casual', hint: 'Warm and conversational' },
  { id: 'confident', label: 'Confident', hint: 'Direct and assured' },
  { id: 'creative', label: 'Creative', hint: 'Vivid and personal' },
];

const TEMPLATE_NAMES = ['Story-led', 'Strengths-first', 'Mission-driven', 'Straight talk'];

interface ToneWords {
  drive: string;
  quality: string;
  habit: string;
  value: string;
  invite: string;
}

const TONE_WORDS: Record<ToneId, ToneWords> = {
  professional: {
    drive: 'delivering reliable, well-considered results',
    quality: 'clear communication and careful planning',
    habit: 'I plan carefully, communicate early, and follow through on what I commit to',
    value: 'I value accountability, clarity, and steady progress over quick fixes',
    invite: 'I am always glad to connect with fellow professionals, so feel free to send a message or a connection request.',
  },
  casual: {
    drive: 'figuring out how to make things work and helping others do the same',
    quality: 'honest conversations and a bit of curiosity',
    habit: 'I ask plenty of questions, share what I learn, and keep things friendly',
    value: 'I like working with people who are open, kind, and happy to roll up their sleeves',
    invite: 'If you want to swap ideas or just say hello, my inbox is open. I would love to hear from you.',
  },
  confident: {
    drive: 'taking ownership and getting results that last',
    quality: 'decisive action and high standards',
    habit: 'I set a clear target, make the call, and hold myself to the outcome',
    value: 'I expect a lot from myself and I back it up with consistent work',
    invite: 'If you are building something that needs a dependable owner, let us talk.',
  },
  creative: {
    drive: 'turning rough ideas into work people genuinely enjoy',
    quality: 'fresh angles and a love of craft',
    habit: 'I sketch, test, and refine until the idea earns its place',
    value: 'I believe the best work comes from curiosity, a little play, and plenty of iteration',
    invite: 'If you have an interesting problem or a half-formed idea, I would enjoy hearing about it.',
  },
};

function joinList(items: string[]): string {
  if (items.length <= 1) return items[0] ?? '';
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`;
}

function article(word: string): string {
  return /^[aeiou]/i.test(word.trim()) ? 'an' : 'a';
}

function yearsPhrase(years: number | null): string {
  if (years === null) return '';
  return years === 1 ? 'one year' : `${years} years`;
}

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function buildTemplate(index: number, i: Inputs): Para[] {
  const t = TONE_WORDS[i.tone];
  const title = i.title;
  const ind = i.industry;
  const a = article(title);
  const yp = yearsPhrase(i.years);
  const skills = joinList(i.skills);
  const topSkill = i.skills[0];
  const spent = yp ? `Over ${yp}` : 'Throughout my career';
  const skillLine = skills
    ? `My core strengths include ${skills}.`
    : `My core strengths are ${t.quality}.`;

  switch (index) {
    case 0:
      return [
        {
          text: `I am ${a} ${title} working in ${ind}, and what keeps me motivated is ${t.drive}. ${spent}, I have learned that good work in ${ind} rarely comes from one big moment. It comes from showing up, paying attention, and improving a little every week.`,
        },
        {
          text: `${skillLine} I lean on these every day, whether I am solving a new problem, supporting a teammate, or explaining a decision to someone outside my field.`,
        },
        {
          text: `${t.habit}. ${t.value}. I try to leave every team and project a little better than I found it.`,
        },
        {
          text: `Outside of the daily work, I enjoy following what is changing in ${ind} and learning from the people around me. ${t.invite}`,
          optional: true,
        },
      ];
    case 1:
      return [
        {
          text: skills
            ? `${title} in ${ind}. ${skills.charAt(0).toUpperCase()}${skills.slice(1)}. That is the short version of what I bring to a team.`
            : `${title} in ${ind}. ${t.quality.charAt(0).toUpperCase()}${t.quality.slice(1)}. That is the short version of what I bring to a team.`,
        },
        {
          text: `${spent}, I have built my work around ${t.drive}. ${
            topSkill
              ? `${topSkill.charAt(0).toUpperCase()}${topSkill.slice(1)} is where I spend much of my time, and it is where I keep getting better.`
              : 'I keep getting better by staying curious and asking for feedback.'
          }`,
        },
        {
          text: `What I offer is simple. I understand the problems people face in ${ind}, I work well with others, and I stay focused until the work is done properly. ${t.habit}. I also care about the people side of the job. I share what I know, ask for feedback often, and try to make the people around me more effective, because strong results in ${ind} are almost always a team effort.`,
        },
        {
          text: `${t.value}. ${t.invite}`,
          optional: true,
        },
      ];
    case 2:
      return [
        {
          text: `I believe ${ind} works best when the people in it care about the outcome. As ${a} ${title}, my goal is ${t.drive}, and I measure my own work by whether it helps the people who rely on it.`,
        },
        {
          text: `${spent}, I have developed a practical toolkit. ${skillLine} Each of these matters more when it is paired with listening and a willingness to adapt.`,
        },
        {
          text: `${t.value}. ${t.habit}. I would rather build something useful and lasting than something that only looks good for a week.`,
        },
        {
          text: `I am always interested in meeting people who share that outlook, whether you work in ${ind} or somewhere nearby. ${t.invite}`,
          optional: true,
        },
      ];
    default:
      return [
        {
          text: `${title}, ${ind}. ${yp ? `${yp.charAt(0).toUpperCase()}${yp.slice(1)} in the field.` : 'Still learning, still building.'} Here is what that means in practice.`,
        },
        {
          text: `I focus on ${t.drive}. ${skillLine} I do not rely on buzzwords. I rely on doing the work, explaining it clearly, and being honest when something is not going to plan. That approach keeps my work grounded in what people actually need.`,
        },
        {
          text: `${t.habit}. ${t.value}. If a project needs ${t.quality}, I am usually the one raising my hand. I would rather say what I can do and then do it.`,
        },
        {
          text: `I enjoy conversations about where ${ind} is heading and how teams can work better together. ${t.invite}`,
          optional: true,
        },
      ];
  }
}

function generateSummary(index: number, i: Inputs): string {
  const paras = buildTemplate(index, i);
  const render = (list: Para[]) => list.map((p) => p.text).join('\n\n');
  let current = paras.slice();
  // Keep the output within the 150-200 word target by dropping optional closing paragraphs.
  while (countWords(render(current)) > 200) {
    const last = [...current].reverse().findIndex((p) => p.optional);
    if (last === -1) break;
    current.splice(current.length - 1 - last, 1);
  }
  return render(current);
}

function parseInputs(f: FormState): Inputs | null {
  const title = f.jobTitle.trim();
  const industry = f.industry.trim();
  if (!title || !industry) return null;
  const yearsNum = parseInt(f.years, 10);
  const skills = f.skills
    .split(',')
    .map((s) => s.trim().replace(/\s+/g, ' ').slice(0, 40))
    .filter(Boolean)
    .slice(0, 5);
  return {
    title,
    industry,
    years: Number.isFinite(yearsNum) && yearsNum > 0 ? Math.min(yearsNum, 60) : null,
    skills,
    tone: f.tone,
  };
}

const inputClass =
  'w-full rounded-tp-button border border-tp-line bg-white px-4 py-3 text-sm text-tp-ink placeholder:text-tp-muted focus:border-tp-bronze focus:outline-none focus:ring-2 focus:ring-tp-bronze/30';

export function LinkedInAboutGenerator() {
  const [form, setForm] = useState<FormState>({
    jobTitle: '',
    industry: '',
    years: '',
    skills: '',
    tone: 'professional',
  });
  const [generated, setGenerated] = useState<Inputs | null>(null);
  const [templateIndex, setTemplateIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [showError, setShowError] = useState(false);

  const summary = useMemo(
    () => (generated ? generateSummary(templateIndex, generated) : ''),
    [generated, templateIndex],
  );

  const words = summary ? countWords(summary) : 0;

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
    setTemplateIndex(0);
    setCopied(false);
  }

  function cycle(delta: number) {
    setTemplateIndex((prev) => (prev + delta + TEMPLATE_NAMES.length) % TEMPLATE_NAMES.length);
    setCopied(false);
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <div>
          <label htmlFor="jobTitle" className="mb-1.5 block text-sm font-medium text-tp-ink">
            Job title
          </label>
          <input
            id="jobTitle"
            type="text"
            className={inputClass}
            placeholder="e.g. Product Designer"
            value={form.jobTitle}
            onChange={(e) => update('jobTitle', e.target.value)}
            maxLength={80}
            required
          />
        </div>
        <div>
          <label htmlFor="industry" className="mb-1.5 block text-sm font-medium text-tp-ink">
            Industry
          </label>
          <input
            id="industry"
            type="text"
            className={inputClass}
            placeholder="e.g. healthcare technology"
            value={form.industry}
            onChange={(e) => update('industry', e.target.value)}
            maxLength={80}
            required
          />
        </div>
        <div>
          <label htmlFor="years" className="mb-1.5 block text-sm font-medium text-tp-ink">
            Years of experience <span className="font-normal text-tp-muted">(optional)</span>
          </label>
          <input
            id="years"
            type="number"
            inputMode="numeric"
            min={0}
            max={60}
            className={inputClass}
            placeholder="e.g. 6"
            value={form.years}
            onChange={(e) => update('years', e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="skills" className="mb-1.5 block text-sm font-medium text-tp-ink">
            Key skills <span className="font-normal text-tp-muted">(comma separated, up to 5)</span>
          </label>
          <input
            id="skills"
            type="text"
            className={inputClass}
            placeholder="e.g. user research, prototyping, design systems"
            value={form.skills}
            onChange={(e) => update('skills', e.target.value)}
            maxLength={250}
          />
        </div>
        <fieldset>
          <legend className="mb-1.5 block text-sm font-medium text-tp-ink">Tone</legend>
          <div className="grid grid-cols-2 gap-3">
            {TONES.map((t) => {
              const active = form.tone === t.id;
              return (
                <label
                  key={t.id}
                  className={`cursor-pointer rounded-tp-button border px-4 py-3 text-sm transition-colors ${
                    active
                      ? 'border-tp-bronze bg-tp-paper text-tp-ink'
                      : 'border-tp-line bg-white text-tp-ink hover:border-tp-bronze/60'
                  }`}
                >
                  <input
                    type="radio"
                    name="tone"
                    value={t.id}
                    checked={active}
                    onChange={() => update('tone', t.id)}
                    className="sr-only"
                  />
                  <span className="block font-medium">{t.label}</span>
                  <span className="block text-xs text-tp-muted">{t.hint}</span>
                </label>
              );
            })}
          </div>
        </fieldset>
        {showError && (
          <p role="alert" className="text-sm text-tp-bronze-ink">
            Please enter your job title and industry to generate a summary.
          </p>
        )}
        <button
          type="submit"
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-tp-button bg-tp-black px-8 text-base font-medium text-tp-bronze shadow-md shadow-black/15 transition-all hover:bg-tp-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze focus-visible:ring-offset-2"
        >
          Generate my About section
        </button>
      </form>

      <div aria-live="polite">
        {generated ? (
          <div className="rounded-tp-card border border-tp-line bg-tp-paper p-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-tp-bronze-ink">
                  Version {templateIndex + 1} of {TEMPLATE_NAMES.length}
                </p>
                <p className="text-sm text-tp-muted">{TEMPLATE_NAMES[templateIndex]}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => cycle(-1)}
                  aria-label="Previous version"
                  className="flex h-9 w-9 items-center justify-center rounded-tp-button border border-tp-line bg-white text-tp-ink hover:border-tp-bronze"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => cycle(1)}
                  aria-label="Next version"
                  className="flex h-9 w-9 items-center justify-center rounded-tp-button border border-tp-line bg-white text-tp-ink hover:border-tp-bronze"
                >
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
            <div className="whitespace-pre-line rounded-tp-button border border-tp-line bg-white p-5 text-sm leading-relaxed text-tp-ink">
              {summary}
            </div>
            <p className="mt-3 text-xs text-tp-muted">{words} words</p>
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
                onClick={() => cycle(1)}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-tp-button border-2 border-tp-line px-5 text-sm font-medium text-tp-bronze-ink transition-all hover:border-tp-bronze hover:bg-white"
              >
                <RefreshCw className="h-4 w-4" aria-hidden="true" />
                Try another version
              </button>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-tp-muted">
              This is a starting draft built from your inputs. Add a specific result or story from your own work
              before you publish it.
            </p>
          </div>
        ) : (
          <div className="flex h-full min-h-[240px] items-center justify-center rounded-tp-card border border-dashed border-tp-line bg-tp-paper p-8 text-center">
            <p className="max-w-xs text-sm text-tp-muted">
              Fill in your details and your LinkedIn About draft will appear here. Nothing you type leaves your
              browser.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
