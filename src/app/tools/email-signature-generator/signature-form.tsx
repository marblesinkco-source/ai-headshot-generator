'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Copy, Check, Eye, Palette } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { BASE_PRICE_DISPLAY } from '@/config/pricing';

type LayoutId = 'horizontal' | 'vertical' | 'minimal';

interface Fields {
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  linkedin: string;
  photo: string;
}

const LAYOUTS: { id: LayoutId; label: string; hint: string }[] = [
  { id: 'horizontal', label: 'Horizontal', hint: 'Photo on the left' },
  { id: 'vertical', label: 'Vertical', hint: 'Photo on top' },
  { id: 'minimal', label: 'Minimal', hint: 'Text only' },
];

const THEMES = [
  { id: 'blue', label: 'Professional Blue', color: '#2563eb' },
  { id: 'gray', label: 'Corporate Gray', color: '#4b5563' },
  { id: 'gold', label: 'Elegant Gold', color: '#b45309' },
  { id: 'purple', label: 'Modern Purple', color: '#7c3aed' },
  { id: 'black', label: 'Classic Black', color: '#171613' },
];

const INITIAL: Fields = {
  name: 'Jane Doe',
  title: 'Marketing Director',
  company: 'Acme Inc.',
  email: 'jane@acme.com',
  phone: '+1 555 123 4567',
  website: 'https://acme.com',
  linkedin: 'https://linkedin.com/in/janedoe',
  photo: '',
};

const FIELD_DEFS: { key: keyof Fields; label: string; type: string; placeholder: string }[] = [
  { key: 'name', label: 'Full Name', type: 'text', placeholder: 'Jane Doe' },
  { key: 'title', label: 'Job Title', type: 'text', placeholder: 'Marketing Director' },
  { key: 'company', label: 'Company Name', type: 'text', placeholder: 'Acme Inc.' },
  { key: 'email', label: 'Email', type: 'email', placeholder: 'jane@acme.com' },
  { key: 'phone', label: 'Phone', type: 'tel', placeholder: '+1 555 123 4567' },
  { key: 'website', label: 'Website URL', type: 'url', placeholder: 'https://acme.com' },
  { key: 'linkedin', label: 'LinkedIn Profile URL', type: 'url', placeholder: 'https://linkedin.com/in/janedoe' },
  { key: 'photo', label: 'Photo URL (optional)', type: 'url', placeholder: 'https://example.com/me.jpg' },
];

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Only allow http(s) URLs in generated HTML.
function safeUrl(u: string): string {
  const t = u.trim();
  if (!t) return '';
  const withProto = /^https?:\/\//i.test(t) ? t : /^[a-z][a-z0-9+.-]*:/i.test(t) ? '' : `https://${t}`;
  return withProto;
}

function displayUrl(u: string): string {
  return u.trim().replace(/^https?:\/\//i, '').replace(/\/$/, '');
}

function buildHtml(f: Fields, layout: LayoutId, color: string): string {
  const font = "font-family:Arial,Helvetica,sans-serif;";
  const photo = safeUrl(f.photo);
  const site = safeUrl(f.website);
  const li = safeUrl(f.linkedin);
  const sep = `<span style="color:${color};padding:0 6px;">|</span>`;
  const link = (href: string, text: string) =>
    `<a href="${esc(href)}" style="color:#171613;text-decoration:none;">${esc(text)}</a>`;

  const contact: string[] = [];
  if (f.email.trim()) contact.push(link(`mailto:${f.email.trim()}`, f.email.trim()));
  if (f.phone.trim()) contact.push(link(`tel:${f.phone.trim().replace(/[^+\d]/g, '')}`, f.phone.trim()));
  if (site) contact.push(link(site, displayUrl(f.website)));

  const nameLine = f.name.trim()
    ? `<tr><td style="${font}font-size:18px;font-weight:bold;color:${color};padding:0;line-height:1.3;">${esc(f.name.trim())}</td></tr>`
    : '';
  const role = [f.title.trim(), f.company.trim()].filter(Boolean).map(esc).join(' &middot; ');
  const roleLine = role
    ? `<tr><td style="${font}font-size:14px;color:#5F5A54;padding:2px 0 0 0;line-height:1.4;">${role}</td></tr>`
    : '';
  const contactLine = contact.length
    ? `<tr><td style="${font}font-size:13px;color:#171613;padding:8px 0 0 0;line-height:1.5;">${contact.join(sep)}</td></tr>`
    : '';
  const liLine = li
    ? `<tr><td style="${font}font-size:13px;padding:4px 0 0 0;"><a href="${esc(li)}" style="color:${color};text-decoration:none;font-weight:bold;">LinkedIn</a></td></tr>`
    : '';

  const textTable = `<table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">${nameLine}${roleLine}${contactLine}${liLine}</table>`;

  const img = (align: string) =>
    `<img src="${esc(photo)}" width="80" height="80" alt="${esc(f.name.trim() || 'Photo')}" style="display:block;width:80px;height:80px;border-radius:50%;border:0;object-fit:cover;${align}" />`;

  if (layout === 'minimal' || !photo) {
    const bar = layout === 'minimal' ? `border-left:3px solid ${color};padding-left:12px;` : '';
    return `<table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;${font}"><tr><td style="${bar}">${textTable}</td></tr></table>`;
  }

  if (layout === 'vertical') {
    return `<table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;${font}"><tr><td style="padding:0 0 10px 0;">${img('')}</td></tr><tr><td style="padding:0;">${textTable}</td></tr></table>`;
  }

  return `<table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;${font}"><tr><td valign="top" style="padding:0 16px 0 0;width:80px;">${img('')}</td><td valign="top" style="padding:0 0 0 16px;border-left:2px solid ${color};">${textTable}</td></tr></table>`;
}

function buildText(f: Fields): string {
  const lines: string[] = [];
  if (f.name.trim()) lines.push(f.name.trim());
  const role = [f.title.trim(), f.company.trim()].filter(Boolean).join(', ');
  if (role) lines.push(role);
  const contact = [f.email.trim(), f.phone.trim(), f.website.trim()].filter(Boolean).join(' | ');
  if (contact) lines.push(contact);
  if (f.linkedin.trim()) lines.push(`LinkedIn: ${f.linkedin.trim()}`);
  return lines.join('\n');
}

export function SignatureForm() {
  const [fields, setFields] = useState<Fields>(INITIAL);
  const [layout, setLayout] = useState<LayoutId>('horizontal');
  const [themeId, setThemeId] = useState('blue');
  const [copied, setCopied] = useState<'html' | 'text' | null>(null);

  const color = THEMES.find((t) => t.id === themeId)?.color ?? THEMES[0].color;
  const html = buildHtml(fields, layout, color);

  const update = (key: keyof Fields, value: string) =>
    setFields((prev) => ({ ...prev, [key]: value }));

  const copy = async (kind: 'html' | 'text') => {
    const value = kind === 'html' ? html : buildText(fields);
    try {
      await navigator.clipboard.writeText(value);
      setCopied(kind);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      setCopied(null);
    }
  };

  const inputClass =
    'mt-1.5 w-full rounded-tp-button border border-tp-line bg-white px-3 py-2.5 text-sm text-tp-ink placeholder:text-tp-muted/80 focus:border-tp-bronze-ink focus:outline-none focus:ring-2 focus:ring-tp-bronze-ink/30';

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Inputs */}
      <div className="space-y-6">
        <div className="rounded-tp-card border border-tp-line bg-white p-5 sm:p-6">
          <h2 className="text-lg font-display font-normal text-tp-ink">Your details</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {FIELD_DEFS.map((f) => (
              <label
                key={f.key}
                className={cn(
                  'block text-sm font-medium text-tp-ink',
                  (f.key === 'linkedin' || f.key === 'photo') && 'sm:col-span-2',
                )}
              >
                {f.label}
                <input
                  type={f.type}
                  value={fields[f.key]}
                  onChange={(e) => update(f.key, e.target.value)}
                  placeholder={f.placeholder}
                  className={inputClass}
                />
              </label>
            ))}
          </div>
        </div>

        <div className="rounded-tp-card border border-tp-line bg-white p-5 sm:p-6">
          <h2 className="flex items-center gap-2 text-lg font-display font-normal text-tp-ink">
            <Palette className="h-5 w-5 text-tp-bronze-ink" aria-hidden="true" />
            Style
          </h2>

          <p className="mt-4 text-sm font-medium text-tp-ink">Layout</p>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {LAYOUTS.map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => setLayout(l.id)}
                aria-pressed={layout === l.id}
                className={cn(
                  'rounded-tp-button border px-3 py-2.5 text-left transition-colors',
                  layout === l.id
                    ? 'border-tp-bronze bg-tp-paper'
                    : 'border-tp-line bg-white hover:bg-tp-paper',
                )}
              >
                <span className="block text-sm font-semibold text-tp-ink">{l.label}</span>
                <span className="block text-xs text-tp-muted">{l.hint}</span>
              </button>
            ))}
          </div>

          <p className="mt-5 text-sm font-medium text-tp-ink">Color theme</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {THEMES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setThemeId(t.id)}
                aria-pressed={themeId === t.id}
                className={cn(
                  'flex items-center gap-2 rounded-tp-button border px-3 py-2 text-sm text-tp-ink transition-colors',
                  themeId === t.id
                    ? 'border-tp-bronze bg-tp-paper'
                    : 'border-tp-line bg-white hover:bg-tp-paper',
                )}
              >
                <span
                  className="h-4 w-4 rounded-full border border-tp-line"
                  style={{ backgroundColor: t.color }}
                />
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="space-y-6">
        <div className="rounded-tp-card border border-tp-line bg-white p-5 sm:p-6">
          <h2 className="flex items-center gap-2 text-lg font-display font-normal text-tp-ink">
            <Eye className="h-5 w-5 text-tp-bronze-ink" aria-hidden="true" />
            Live preview
          </h2>
          <div className="mt-4 overflow-x-auto rounded-tp-button border border-tp-line bg-tp-paper p-4">
            <div className="min-w-[320px] rounded-tp-button bg-white p-5">
              <p className="text-sm text-tp-muted">Best regards,</p>
              <div className="mt-4" dangerouslySetInnerHTML={{ __html: html }} />
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => copy('html')}
              className={buttonVariants({ className: 'flex-1' })}
            >
              {copied === 'html' ? (
                <Check className="mr-2 h-4 w-4" aria-hidden="true" />
              ) : (
                <Copy className="mr-2 h-4 w-4" aria-hidden="true" />
              )}
              {copied === 'html' ? 'Copied!' : 'Copy HTML'}
            </button>
            <button
              type="button"
              onClick={() => copy('text')}
              className={buttonVariants({ variant: 'outline', className: 'flex-1' })}
            >
              {copied === 'text' ? (
                <Check className="mr-2 h-4 w-4" aria-hidden="true" />
              ) : (
                <Copy className="mr-2 h-4 w-4" aria-hidden="true" />
              )}
              {copied === 'text' ? 'Copied!' : 'Copy as Text'}
            </button>
          </div>
          <p className="mt-3 text-xs text-tp-muted">
            Paste the HTML into your email client&apos;s signature settings (Gmail needs an HTML signature
            extension or the raw HTML editor; Outlook and Apple Mail accept pasted HTML).
          </p>
        </div>

        <div className="rounded-tp-card border border-tp-line bg-tp-beige/40 p-5 sm:p-6">
          <p className="font-semibold text-tp-ink">
            Want a professional headshot for your signature?
          </p>
          <p className="mt-1 text-sm text-tp-muted">
            TailorPic generates studio-quality photos from selfies — From {BASE_PRICE_DISPLAY}
          </p>
          <Link
            href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots"
            className={buttonVariants({ className: 'mt-4' })}
          >
            Create my headshot
          </Link>
        </div>
      </div>
    </div>
  );
}
