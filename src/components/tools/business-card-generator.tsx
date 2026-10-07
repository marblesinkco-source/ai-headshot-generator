'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Upload, Download, ShieldCheck, User, Briefcase, Mail, Phone, Globe, Linkedin, X, CreditCard, FileDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const MAX_BYTES = 10 * 1024 * 1024;
const CARD_W = 1050;
const CARD_H = 600;

type TemplateId = 'classic' | 'modern' | 'minimal' | 'corporate';

interface Fields {
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  linkedin: string;
}

interface Palette {
  bg: string;
  text: string;
  sub: string;
  accent: string;
}

const TEMPLATES: { id: TemplateId; label: string; hint: string; palette: Palette }[] = [
  { id: 'classic', label: 'Classic', hint: 'White, dark text', palette: { bg: '#FFFFFF', text: '#14110F', sub: '#5C554D', accent: '#9A6B3A' } },
  { id: 'modern', label: 'Modern', hint: 'Dark, light text', palette: { bg: '#14110F', text: '#F6F1E9', sub: '#C9BFB0', accent: '#C8935A' } },
  { id: 'minimal', label: 'Minimal', hint: 'Clean borders', palette: { bg: '#FBF8F3', text: '#14110F', sub: '#6B645B', accent: '#14110F' } },
  { id: 'corporate', label: 'Corporate', hint: 'Blue accent', palette: { bg: '#FFFFFF', text: '#0F1B2D', sub: '#4A5568', accent: '#1D4ED8' } },
];

const INITIAL: Fields = {
  name: 'Alex Morgan',
  title: 'Product Manager',
  company: 'Northwind Studio',
  email: 'alex@example.com',
  phone: '+1 555 010 0199',
  website: 'example.com',
  linkedin: '',
};

function vcardEscape(v: string) {
  return v.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/;/g, '\\;').replace(/,/g, '\\,');
}

function normalizeUrl(v: string) {
  const t = v.trim();
  if (!t) return '';
  return /^https?:\/\//i.test(t) ? t : `https://${t}`;
}

function buildVCard(f: Fields) {
  const name = f.name.trim();
  const parts = name.split(/\s+/).filter(Boolean);
  const last = parts.length > 1 ? parts[parts.length - 1] : '';
  const first = parts.length > 1 ? parts.slice(0, -1).join(' ') : parts[0] || '';
  const lines = ['BEGIN:VCARD', 'VERSION:3.0', `N:${vcardEscape(last)};${vcardEscape(first)};;;`, `FN:${vcardEscape(name)}`];
  if (f.company.trim()) lines.push(`ORG:${vcardEscape(f.company.trim())}`);
  if (f.title.trim()) lines.push(`TITLE:${vcardEscape(f.title.trim())}`);
  if (f.phone.trim()) lines.push(`TEL;TYPE=WORK,VOICE:${f.phone.trim()}`);
  if (f.email.trim()) lines.push(`EMAIL;TYPE=INTERNET:${f.email.trim()}`);
  if (f.website.trim()) lines.push(`URL:${normalizeUrl(f.website)}`);
  if (f.linkedin.trim()) lines.push(`X-SOCIALPROFILE;TYPE=linkedin:${normalizeUrl(f.linkedin)}`);
  lines.push('END:VCARD');
  return lines.join('\r\n') + '\r\n';
}

function fileSlug(name: string) {
  return name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'business-card';
}

function stripProtocol(v: string) {
  return v.trim().replace(/^https?:\/\/(www\.)?/i, '').replace(/\/$/, '');
}

function fitText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number, startSize: number, weight: string, family: string, minSize = 18) {
  let size = startSize;
  ctx.font = `${weight} ${size}px ${family}`;
  while (ctx.measureText(text).width > maxWidth && size > minSize) {
    size -= 2;
    ctx.font = `${weight} ${size}px ${family}`;
  }
  return size;
}

function drawCard(canvas: HTMLCanvasElement, f: Fields, tpl: TemplateId, photo: HTMLImageElement | null) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const p = TEMPLATES.find((t) => t.id === tpl)!.palette;
  const sans = 'Manrope, "Helvetica Neue", Arial, sans-serif';
  const serif = '"Instrument Serif", Georgia, "Times New Roman", serif';

  canvas.width = CARD_W;
  canvas.height = CARD_H;
  ctx.fillStyle = p.bg;
  ctx.fillRect(0, 0, CARD_W, CARD_H);

  // Template decoration
  if (tpl === 'classic') {
    ctx.fillStyle = p.accent;
    ctx.fillRect(0, 0, 14, CARD_H);
  } else if (tpl === 'modern') {
    ctx.fillStyle = p.accent;
    ctx.fillRect(70, 70, 70, 6);
  } else if (tpl === 'minimal') {
    ctx.strokeStyle = p.accent;
    ctx.lineWidth = 3;
    ctx.strokeRect(30, 30, CARD_W - 60, CARD_H - 60);
  } else {
    ctx.fillStyle = p.accent;
    ctx.fillRect(0, 0, CARD_W, 24);
    ctx.fillRect(0, CARD_H - 90, CARD_W, 90);
  }

  const padX = tpl === 'classic' ? 80 : 76;
  const hasPhoto = !!photo;
  const photoD = 190;
  const photoCx = CARD_W - padX - photoD / 2;
  const photoCy = tpl === 'corporate' ? 210 : 190;
  const textMax = hasPhoto ? photoCx - photoD / 2 - padX - 30 : CARD_W - padX * 2;
  const topY = tpl === 'corporate' ? 130 : tpl === 'modern' ? 150 : 120;

  ctx.textBaseline = 'alphabetic';
  ctx.textAlign = 'left';

  // Name
  const nameText = f.name.trim() || 'Your Name';
  const nameSize = fitText(ctx, nameText, textMax, 68, '400', serif, 30);
  ctx.fillStyle = p.text;
  ctx.fillText(nameText, padX, topY + 50);

  // Title
  let y = topY + 50;
  if (f.title.trim()) {
    y += 46;
    fitText(ctx, f.title.trim(), textMax, 28, '600', sans);
    ctx.fillStyle = p.accent;
    ctx.fillText(f.title.trim(), padX, y);
  }
  if (f.company.trim()) {
    y += 40;
    fitText(ctx, f.company.trim(), textMax, 26, '500', sans);
    ctx.fillStyle = p.sub;
    ctx.fillText(f.company.trim(), padX, y);
  }
  void nameSize;

  // Photo
  if (photo) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(photoCx, photoCy, photoD / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    const s = Math.max(photoD / photo.naturalWidth, photoD / photo.naturalHeight);
    const w = photo.naturalWidth * s;
    const h = photo.naturalHeight * s;
    ctx.drawImage(photo, photoCx - w / 2, photoCy - h / 2, w, h);
    ctx.restore();
    ctx.beginPath();
    ctx.arc(photoCx, photoCy, photoD / 2, 0, Math.PI * 2);
    ctx.lineWidth = 5;
    ctx.strokeStyle = p.accent;
    ctx.stroke();
  }

  // Contact lines
  const contacts = [f.email.trim(), f.phone.trim(), stripProtocol(f.website), stripProtocol(f.linkedin)].filter(Boolean);
  const onBand = tpl === 'corporate';
  const lineH = 38;
  const contactMax = CARD_W - padX * 2;
  if (onBand) {
    // Contacts laid out in the bottom band, up to two rows
    ctx.fillStyle = '#FFFFFF';
    const colW = contactMax / 2;
    contacts.slice(0, 4).forEach((c, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      fitText(ctx, c, colW - 20, 24, '500', sans, 14);
      ctx.fillText(c, padX + col * colW, CARD_H - 62 + row * 34 - (contacts.length > 2 ? 4 : -12));
    });
  } else {
    const startY = CARD_H - 70 - (contacts.length - 1) * lineH;
    ctx.fillStyle = p.accent;
    ctx.fillRect(padX, startY - 50, 56, 3);
    contacts.forEach((c, i) => {
      fitText(ctx, c, contactMax, 25, '500', sans, 14);
      ctx.fillStyle = p.text;
      ctx.fillText(c, padX, startY + i * lineH);
    });
  }
}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('load'));
    };
    img.src = url;
  });
}

const FIELD_DEFS: { key: keyof Fields; label: string; icon: typeof User; type: string; placeholder: string; autoComplete?: string }[] = [
  { key: 'name', label: 'Full name', icon: User, type: 'text', placeholder: 'Alex Morgan', autoComplete: 'off' },
  { key: 'title', label: 'Job title', icon: Briefcase, type: 'text', placeholder: 'Product Manager', autoComplete: 'off' },
  { key: 'company', label: 'Company', icon: CreditCard, type: 'text', placeholder: 'Northwind Studio', autoComplete: 'off' },
  { key: 'email', label: 'Email', icon: Mail, type: 'email', placeholder: 'alex@example.com', autoComplete: 'off' },
  { key: 'phone', label: 'Phone', icon: Phone, type: 'tel', placeholder: '+1 555 010 0199', autoComplete: 'off' },
  { key: 'website', label: 'Website', icon: Globe, type: 'text', placeholder: 'example.com', autoComplete: 'off' },
  { key: 'linkedin', label: 'LinkedIn URL', icon: Linkedin, type: 'text', placeholder: 'linkedin.com/in/yourname', autoComplete: 'off' },
];

export default function BusinessCardGenerator() {
  const [fields, setFields] = useState<Fields>(INITIAL);
  const [template, setTemplate] = useState<TemplateId>('classic');
  const [photo, setPhoto] = useState<HTMLImageElement | null>(null);
  const [photoName, setPhotoName] = useState('');
  const [error, setError] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const render = useCallback(() => {
    if (canvasRef.current) drawCard(canvasRef.current, fields, template, photo);
  }, [fields, template, photo]);

  useEffect(() => {
    render();
    // Re-render once web fonts are ready so canvas text uses them.
    let cancelled = false;
    if (typeof document !== 'undefined' && document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (!cancelled) render();
      });
    }
    return () => {
      cancelled = true;
    };
  }, [render]);

  const update = (key: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFields((prev) => ({ ...prev, [key]: value }));
  };

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setError('');
    if (!file.type.startsWith('image/')) {
      setError('Please choose an image file (JPG, PNG or WebP).');
      return;
    }
    if (file.size > MAX_BYTES) {
      setError('That image is larger than 10 MB. Please choose a smaller one.');
      return;
    }
    try {
      const img = await loadImage(file);
      setPhoto(img);
      setPhotoName(file.name);
    } catch {
      setError('We could not read that image. Try a JPG or PNG.');
    }
  };

  const removePhoto = () => {
    setPhoto(null);
    setPhotoName('');
  };

  const triggerDownload = (href: string, filename: string) => {
    const a = document.createElement('a');
    a.href = href;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const downloadPng = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    drawCard(canvas, fields, template, photo);
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      triggerDownload(url, `${fileSlug(fields.name)}-business-card.png`);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }, 'image/png');
  };

  const downloadVcf = () => {
    const blob = new Blob([buildVCard(fields)], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    triggerDownload(url, `${fileSlug(fields.name)}.vcf`);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const canExport = useMemo(() => fields.name.trim().length > 0, [fields.name]);

  return (
    <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
        {/* Inputs */}
        <div className="rounded-tp-card border border-tp-line bg-white p-5 sm:p-6">
          <h2 className="font-display font-normal text-2xl text-tp-ink">Your details</h2>
          <div className="mt-5 space-y-4">
            {FIELD_DEFS.map(({ key, label, icon: Icon, type, placeholder, autoComplete }) => (
              <div key={key}>
                <label htmlFor={`bc-${key}`} className="mb-1.5 block text-sm font-medium text-tp-ink">
                  {label}
                </label>
                <div className="relative">
                  <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-tp-muted" aria-hidden="true" />
                  <input
                    id={`bc-${key}`}
                    type={type}
                    value={fields[key]}
                    onChange={update(key)}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    maxLength={120}
                    className="w-full rounded-tp-button border border-tp-line bg-tp-paper py-2.5 pl-10 pr-3 text-sm text-tp-ink placeholder:text-tp-muted/70 focus:border-tp-bronze-ink focus:outline-none focus:ring-2 focus:ring-tp-bronze-ink/40"
                  />
                </div>
              </div>
            ))}

            <div>
              <span className="mb-1.5 block text-sm font-medium text-tp-ink">Headshot (optional)</span>
              <input ref={fileRef} type="file" accept="image/*" onChange={onFile} className="sr-only" id="bc-photo" />
              {photo ? (
                <div className="flex items-center justify-between gap-3 rounded-tp-button border border-tp-line bg-tp-paper px-3.5 py-2.5">
                  <span className="truncate text-sm text-tp-ink">{photoName}</span>
                  <button
                    type="button"
                    onClick={removePhoto}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-tp-button text-tp-muted hover:bg-tp-beige/40 hover:text-tp-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze"
                    aria-label="Remove headshot"
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="flex w-full items-center justify-center gap-2 rounded-tp-button border border-dashed border-tp-line bg-tp-paper px-4 py-3 text-sm font-medium text-tp-ink hover:border-tp-bronze focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze"
                >
                  <Upload className="h-4 w-4" aria-hidden="true" />
                  Upload a photo
                </button>
              )}
              <p className="mt-1.5 text-xs text-tp-muted">Cropped to a circle automatically. JPG, PNG or WebP up to 10 MB.</p>
              {error && (
                <p role="alert" className="mt-2 text-sm text-red-700">
                  {error}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="rounded-tp-card border border-tp-line bg-white p-5 sm:p-6">
          <h2 className="font-display font-normal text-2xl text-tp-ink">Preview</h2>

          <div role="radiogroup" aria-label="Card style" className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {TEMPLATES.map((t) => {
              const active = t.id === template;
              return (
                <button
                  key={t.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setTemplate(t.id)}
                  className={cn(
                    'rounded-tp-button border px-3 py-2 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze',
                    active ? 'border-tp-ink bg-tp-ink text-tp-paper' : 'border-tp-line bg-tp-paper text-tp-ink hover:border-tp-bronze'
                  )}
                >
                  <span className="block text-sm font-semibold">{t.label}</span>
                  <span className={cn('block text-xs', active ? 'text-tp-beige' : 'text-tp-muted')}>{t.hint}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-5 overflow-hidden rounded-tp-button border border-tp-line bg-tp-beige/30 p-3 sm:p-4">
            <canvas
              ref={canvasRef}
              width={CARD_W}
              height={CARD_H}
              className="block h-auto w-full rounded-[10px] shadow-md"
              role="img"
              aria-label={`Business card preview for ${fields.name || 'your name'}`}
            />
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={downloadPng}
              disabled={!canExport}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-tp-button bg-tp-ink px-5 py-3 text-sm font-semibold text-tp-paper hover:bg-tp-black focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Download PNG
            </button>
            <button
              type="button"
              onClick={downloadVcf}
              disabled={!canExport}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-tp-button border border-tp-ink bg-white px-5 py-3 text-sm font-semibold text-tp-ink hover:bg-tp-beige/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <FileDown className="h-4 w-4" aria-hidden="true" />
              Download vCard (.vcf)
            </button>
          </div>
          {!canExport && <p className="mt-2 text-xs text-tp-muted">Enter your name to enable downloads.</p>}

          <p className="mt-4 flex items-start gap-2 text-xs text-tp-muted">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-tp-bronze-ink" aria-hidden="true" />
            Your data never leaves your browser. The card and vCard are built on your device.
          </p>
        </div>
      </div>
    </div>
  );
}
