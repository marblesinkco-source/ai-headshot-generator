'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Download, RotateCcw, ShieldCheck } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const ctaHref = '/auth/register?redirect=/dashboard/upload';

const BASE_W = 1920;
const BASE_H = 1080;

type TemplateId =
  | 'modern-office'
  | 'home-office'
  | 'abstract-gradient'
  | 'solid-color'
  | 'blurred-bokeh'
  | 'corporate-blue'
  | 'nature-green'
  | 'warm-studio';

type TextPos = 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';

interface TemplateDef {
  id: TemplateId;
  label: string;
  primary: string;
  secondary: string;
  usesSecondary: boolean;
}

const TEMPLATES: TemplateDef[] = [
  { id: 'modern-office', label: 'Modern Office', primary: '#E8EEF4', secondary: '#AEBFD1', usesSecondary: true },
  { id: 'home-office', label: 'Home Office', primary: '#D9B58C', secondary: '#8A5A3C', usesSecondary: true },
  { id: 'abstract-gradient', label: 'Abstract Gradient', primary: '#4F6BED', secondary: '#E58BB8', usesSecondary: true },
  { id: 'solid-color', label: 'Solid Color', primary: '#2F3E46', secondary: '#2F3E46', usesSecondary: false },
  { id: 'blurred-bokeh', label: 'Blurred Bokeh', primary: '#1F2A44', secondary: '#C9A98A', usesSecondary: true },
  { id: 'corporate-blue', label: 'Corporate Blue', primary: '#0F3D75', secondary: '#3B82C4', usesSecondary: true },
  { id: 'nature-green', label: 'Nature Green', primary: '#2F6B3F', secondary: '#8FC48A', usesSecondary: true },
  { id: 'warm-studio', label: 'Warm Studio', primary: '#6B4A36', secondary: '#E8CFA9', usesSecondary: true },
];

const SWATCHES = [
  '#0F3D75',
  '#1F2A44',
  '#2F3E46',
  '#2F6B3F',
  '#76563D',
  '#C9A98A',
  '#E8EEF4',
  '#F8F5EF',
  '#8A5A3C',
  '#4F6BED',
  '#E58BB8',
  '#171613',
];

const TEXT_POSITIONS: { id: TextPos; label: string }[] = [
  { id: 'bottom-left', label: 'Bottom left' },
  { id: 'bottom-right', label: 'Bottom right' },
  { id: 'top-left', label: 'Top left' },
  { id: 'top-right', label: 'Top right' },
];

interface RenderOptions {
  template: TemplateId;
  primary: string;
  secondary: string;
  blur: number;
  brightness: number;
  warmth: number;
  text: string;
  fontSize: number;
  textPos: TextPos;
}

/* ---------- colour helpers ---------- */

function hexToRgb(hex: string): [number, number, number] {
  let h = hex.replace('#', '').trim();
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  if (!/^[0-9a-fA-F]{6}$/.test(h)) return [128, 128, 128];
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

function toHex(r: number, g: number, b: number): string {
  const c = (n: number) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0');
  return `#${c(r)}${c(g)}${c(b)}`;
}

function rgba(hex: string, a: number): string {
  const [r, g, b] = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${Math.max(0, Math.min(1, a))})`;
}

function mix(a: string, b: string, t: number): string {
  const [r1, g1, b1] = hexToRgb(a);
  const [r2, g2, b2] = hexToRgb(b);
  return toHex(r1 + (r2 - r1) * t, g1 + (g2 - g1) * t, b1 + (b2 - b1) * t);
}

/** amt in -1..1: negative darkens, positive lightens. */
function shade(hex: string, amt: number): string {
  return amt >= 0 ? mix(hex, '#ffffff', amt) : mix(hex, '#000000', -amt);
}

function luminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex).map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function linear(
  ctx: CanvasRenderingContext2D,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  stops: [number, string][]
): CanvasGradient {
  const g = ctx.createLinearGradient(x0, y0, x1, y1);
  stops.forEach(([o, c]) => g.addColorStop(o, c));
  return g;
}

function glow(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, color: string, alpha: number) {
  const g = ctx.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, rgba(color, alpha));
  g.addColorStop(1, rgba(color, 0));
  ctx.fillStyle = g;
  ctx.fillRect(x - r, y - r, r * 2, r * 2);
}

/* ---------- template painters (all in 1920x1080 space) ---------- */

function paintModernOffice(ctx: CanvasRenderingContext2D, p: string, s: string) {
  ctx.fillStyle = linear(ctx, 0, 0, BASE_W, BASE_H, [
    [0, p],
    [1, s],
  ]);
  ctx.fillRect(0, 0, BASE_W, BASE_H);

  // Window on the right with soft light falling across the wall.
  ctx.fillStyle = 'rgba(255,255,255,0.10)';
  ctx.fillRect(1260, 110, 560, 660);
  ctx.strokeStyle = 'rgba(255,255,255,0.28)';
  ctx.lineWidth = 10;
  ctx.strokeRect(1260, 110, 560, 660);
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(1260 + 560 / 3, 110);
  ctx.lineTo(1260 + 560 / 3, 770);
  ctx.moveTo(1260 + (560 * 2) / 3, 110);
  ctx.lineTo(1260 + (560 * 2) / 3, 770);
  ctx.moveTo(1260, 440);
  ctx.lineTo(1820, 440);
  ctx.stroke();

  ctx.fillStyle = 'rgba(255,255,255,0.05)';
  ctx.beginPath();
  ctx.moveTo(1260, 770);
  ctx.lineTo(1820, 770);
  ctx.lineTo(1500, 1080);
  ctx.lineTo(760, 1080);
  ctx.closePath();
  ctx.fill();

  // Floating wall shelves on the left.
  [300, 430, 560].forEach((y, i) => {
    ctx.fillStyle = 'rgba(0,0,0,0.10)';
    ctx.fillRect(110, y, 300, 14);
    ctx.fillStyle = 'rgba(255,255,255,0.22)';
    ctx.fillRect(130 + i * 40, y - 56, 52, 56);
    ctx.fillStyle = 'rgba(0,0,0,0.12)';
    ctx.fillRect(210 + i * 30, y - 90, 28, 90);
    ctx.fillStyle = 'rgba(255,255,255,0.16)';
    ctx.beginPath();
    ctx.arc(340, y - 22, 22, 0, Math.PI * 2);
    ctx.fill();
  });

  // Floor.
  ctx.fillStyle = 'rgba(0,0,0,0.10)';
  ctx.fillRect(0, 930, BASE_W, 150);
  ctx.fillStyle = 'rgba(255,255,255,0.22)';
  ctx.fillRect(0, 928, BASE_W, 3);
}

function paintHomeOffice(ctx: CanvasRenderingContext2D, p: string, s: string) {
  ctx.fillStyle = linear(ctx, 0, 0, 0, BASE_H, [
    [0, shade(p, 0.18)],
    [1, p],
  ]);
  ctx.fillRect(0, 0, BASE_W, BASE_H);
  glow(ctx, 960, 120, 760, '#FFE9C2', 0.35);

  const rand = mulberry32(42);
  const bookColors = [s, shade(s, -0.3), shade(p, -0.45), mix(p, '#C9A98A', 0.5), shade(s, 0.25), mix(s, '#3b4a3f', 0.5)];
  const wood = shade(s, -0.4);

  [40, 1520].forEach((x0) => {
    const w = 360;
    ctx.fillStyle = wood;
    ctx.fillRect(x0 - 12, 60, w + 24, 940);
    for (let row = 0; row < 4; row++) {
      const top = 84 + row * 222;
      const bottom = top + 196;
      ctx.fillStyle = 'rgba(0,0,0,0.30)';
      ctx.fillRect(x0, top, w, 196);
      let x = x0 + 14;
      while (x < x0 + w - 40) {
        const bw = 24 + rand() * 26;
        const bh = 110 + rand() * 66;
        if (rand() < 0.12) {
          x += 28 + rand() * 30; // a gap
          continue;
        }
        const color = shade(bookColors[Math.floor(rand() * bookColors.length)], (rand() - 0.5) * 0.25);
        ctx.fillStyle = color;
        ctx.fillRect(x, bottom - bh, bw - 3, bh);
        ctx.fillStyle = 'rgba(255,255,255,0.22)';
        ctx.fillRect(x, bottom - bh + 16, bw - 3, 4);
        ctx.fillRect(x, bottom - 26, bw - 3, 3);
        x += bw;
      }
      ctx.fillStyle = shade(wood, 0.12);
      ctx.fillRect(x0 - 12, bottom, w + 24, 16);
    }
  });

  // Desk edge.
  ctx.fillStyle = shade(wood, -0.1);
  ctx.fillRect(0, 1010, BASE_W, 70);
  ctx.fillStyle = 'rgba(255,255,255,0.12)';
  ctx.fillRect(0, 1010, BASE_W, 4);
}

function paintAbstract(ctx: CanvasRenderingContext2D, p: string, s: string) {
  const mid = shade(mix(p, s, 0.5), 0.1);
  ctx.fillStyle = linear(ctx, 0, 0, BASE_W, BASE_H, [
    [0, p],
    [0.5, mid],
    [1, s],
  ]);
  ctx.fillRect(0, 0, BASE_W, BASE_H);
  glow(ctx, 380, 240, 760, '#ffffff', 0.22);
  glow(ctx, 1600, 900, 820, shade(s, 0.3), 0.4);
  glow(ctx, 1500, 160, 520, shade(p, -0.2), 0.35);
  glow(ctx, 300, 980, 480, shade(p, 0.3), 0.3);
}

function paintSolid(ctx: CanvasRenderingContext2D, p: string) {
  ctx.fillStyle = p;
  ctx.fillRect(0, 0, BASE_W, BASE_H);
}

function paintBokeh(ctx: CanvasRenderingContext2D, p: string, s: string, blur: number) {
  ctx.fillStyle = linear(ctx, 0, 0, BASE_W, BASE_H, [
    [0, shade(p, -0.1)],
    [1, mix(p, s, 0.4)],
  ]);
  ctx.fillRect(0, 0, BASE_W, BASE_H);

  const soft = Math.max(0, Math.min(1, blur / 100));
  const edge = 1 - soft * 0.92;
  const colors = [s, shade(s, 0.4), mix(s, '#ffffff', 0.55), shade(p, 0.5)];
  const rand = mulberry32(7);

  ctx.save();
  ctx.globalCompositeOperation = 'screen';
  for (let i = 0; i < 64; i++) {
    const x = rand() * BASE_W;
    const y = rand() * BASE_H;
    const r = 40 + rand() * 140 + soft * 30;
    const a = 0.1 + rand() * 0.35;
    const c = colors[Math.floor(rand() * colors.length)];
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, rgba(c, a * (soft > 0.5 ? 1 : 0.7)));
    g.addColorStop(Math.max(0.01, Math.min(0.99, edge)), rgba(c, a * 0.85));
    g.addColorStop(1, rgba(c, 0));
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    if (soft < 0.3) {
      ctx.strokeStyle = rgba(c, a * 0.6);
      ctx.lineWidth = 3;
      ctx.stroke();
    }
  }
  ctx.restore();
}

function paintCorporate(ctx: CanvasRenderingContext2D, p: string, s: string) {
  ctx.fillStyle = linear(ctx, 0, 0, BASE_W, BASE_H, [
    [0, p],
    [1, s],
  ]);
  ctx.fillRect(0, 0, BASE_W, BASE_H);

  ctx.lineWidth = 2;
  ctx.strokeStyle = 'rgba(255,255,255,0.06)';
  ctx.beginPath();
  for (let x = 0; x <= BASE_W; x += 90) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, BASE_H);
  }
  for (let y = 0; y <= BASE_H; y += 90) {
    ctx.moveTo(0, y);
    ctx.lineTo(BASE_W, y);
  }
  ctx.stroke();

  ctx.strokeStyle = 'rgba(255,255,255,0.10)';
  ctx.beginPath();
  for (let x = 0; x <= BASE_W; x += 450) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, BASE_H);
  }
  for (let y = 0; y <= BASE_H; y += 450) {
    ctx.moveTo(0, y);
    ctx.lineTo(BASE_W, y);
  }
  ctx.stroke();

  ctx.fillStyle = 'rgba(255,255,255,0.05)';
  ctx.beginPath();
  ctx.moveTo(1100, 0);
  ctx.lineTo(1920, 0);
  ctx.lineTo(1920, 700);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = 'rgba(0,0,0,0.12)';
  ctx.fillRect(0, 990, BASE_W, 90);
}

function paintNature(ctx: CanvasRenderingContext2D, p: string, s: string) {
  ctx.fillStyle = linear(ctx, 0, 0, 0, BASE_H, [
    [0, shade(s, 0.2)],
    [1, p],
  ]);
  ctx.fillRect(0, 0, BASE_W, BASE_H);

  const rand = mulberry32(21);
  const palette = [shade(p, 0.2), s, shade(p, -0.25), shade(s, 0.3)];
  for (let i = 0; i < 30; i++) {
    const x = rand() * BASE_W;
    const y = rand() * BASE_H;
    const r = 80 + rand() * 220;
    ctx.fillStyle = rgba(palette[Math.floor(rand() * palette.length)], 0.12 + rand() * 0.18);
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Leaf-like ellipses, concentrated toward the edges so the centre stays calm.
  for (let i = 0; i < 18; i++) {
    const left = i % 2 === 0;
    const x = left ? rand() * 420 : BASE_W - rand() * 420;
    const y = rand() * BASE_H;
    ctx.fillStyle = rgba(shade(p, -0.2 - rand() * 0.15), 0.28);
    ctx.beginPath();
    ctx.ellipse(x, y, 40 + rand() * 40, 110 + rand() * 120, rand() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }
}

function paintWarmStudio(ctx: CanvasRenderingContext2D, p: string, s: string) {
  ctx.fillStyle = linear(ctx, 0, 0, 0, BASE_H, [
    [0, s],
    [1, p],
  ]);
  ctx.fillRect(0, 0, BASE_W, BASE_H);

  glow(ctx, 1500, 200, 950, '#FFF0D2', 0.5);
  glow(ctx, 380, 320, 640, '#FFE2B4', 0.22);

  ctx.fillStyle = 'rgba(0,0,0,0.08)';
  ctx.fillRect(0, 0, 120, BASE_H);
  ctx.fillRect(1800, 0, 120, BASE_H);
  ctx.fillStyle = 'rgba(0,0,0,0.12)';
  ctx.fillRect(0, 930, BASE_W, 150);

  const v = ctx.createRadialGradient(960, 540, 400, 960, 540, 1250);
  v.addColorStop(0, 'rgba(0,0,0,0)');
  v.addColorStop(1, 'rgba(0,0,0,0.35)');
  ctx.fillStyle = v;
  ctx.fillRect(0, 0, BASE_W, BASE_H);
}

function paintText(ctx: CanvasRenderingContext2D, o: RenderOptions, ink: string) {
  const text = o.text.trim();
  if (!text) return;
  const margin = 90;
  const maxW = BASE_W - margin * 2;
  let size = o.fontSize;
  ctx.font = `600 ${size}px Manrope, system-ui, -apple-system, 'Segoe UI', sans-serif`;
  const width = ctx.measureText(text).width;
  if (width > maxW) {
    size = Math.max(16, Math.floor((size * maxW) / width));
    ctx.font = `600 ${size}px Manrope, system-ui, -apple-system, 'Segoe UI', sans-serif`;
  }

  const right = o.textPos.endsWith('right');
  const bottom = o.textPos.startsWith('bottom');
  const barW = 64;
  const barH = 6;
  const x = right ? BASE_W - margin : margin;
  const barX = right ? BASE_W - margin - barW : margin;

  ctx.textAlign = right ? 'right' : 'left';
  ctx.fillStyle = ink;

  if (bottom) {
    ctx.textBaseline = 'bottom';
    const y = BASE_H - margin;
    ctx.fillText(text, x, y);
    ctx.fillStyle = '#C9A98A';
    ctx.fillRect(barX, y - size * 1.2 - 22, barW, barH);
  } else {
    ctx.textBaseline = 'top';
    const y = margin + 26;
    ctx.fillText(text, x, y);
    ctx.fillStyle = '#C9A98A';
    ctx.fillRect(barX, margin, barW, barH);
  }
}

/** Draws the full background scaled to a canvas of size W x H. */
function renderBackground(canvas: HTMLCanvasElement, o: RenderOptions, W: number, H: number) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  canvas.width = W;
  canvas.height = H;

  ctx.save();
  ctx.scale(W / BASE_W, H / BASE_H);

  switch (o.template) {
    case 'modern-office':
      paintModernOffice(ctx, o.primary, o.secondary);
      break;
    case 'home-office':
      paintHomeOffice(ctx, o.primary, o.secondary);
      break;
    case 'abstract-gradient':
      paintAbstract(ctx, o.primary, o.secondary);
      break;
    case 'solid-color':
      paintSolid(ctx, o.primary);
      break;
    case 'blurred-bokeh':
      paintBokeh(ctx, o.primary, o.secondary, o.blur);
      break;
    case 'corporate-blue':
      paintCorporate(ctx, o.primary, o.secondary);
      break;
    case 'nature-green':
      paintNature(ctx, o.primary, o.secondary);
      break;
    case 'warm-studio':
      paintWarmStudio(ctx, o.primary, o.secondary);
      break;
  }

  // Brightness and warmth are applied as overlays so they work in every browser.
  if (o.brightness !== 0) {
    ctx.fillStyle = o.brightness > 0 ? `rgba(255,255,255,${o.brightness / 100})` : `rgba(0,0,0,${-o.brightness / 100})`;
    ctx.fillRect(0, 0, BASE_W, BASE_H);
  }
  if (o.warmth !== 0) {
    const a = (Math.abs(o.warmth) / 100) * 0.6;
    ctx.fillStyle = o.warmth > 0 ? `rgba(255,150,40,${a})` : `rgba(60,130,255,${a})`;
    ctx.fillRect(0, 0, BASE_W, BASE_H);
  }

  const base = o.template === 'solid-color' ? o.primary : mix(o.primary, o.secondary, 0.5);
  const ink = luminance(base) < 0.35 ? '#FFFFFF' : '#171613';
  paintText(ctx, o, ink);

  ctx.restore();
}

/* ---------- small UI pieces ---------- */

function TemplateThumb({ def }: { def: TemplateDef }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    renderBackground(
      ref.current,
      {
        template: def.id,
        primary: def.primary,
        secondary: def.secondary,
        blur: 40,
        brightness: 0,
        warmth: 0,
        text: '',
        fontSize: 56,
        textPos: 'bottom-left',
      },
      256,
      144
    );
  }, [def]);
  return <canvas ref={ref} width={256} height={144} className="block h-auto w-full" aria-hidden="true" />;
}

function ColorControl({
  label,
  value,
  onChange,
  id,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  id: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-sm font-semibold text-tp-ink">
          {label}
        </label>
        <span className="text-xs uppercase text-tp-muted">{value}</span>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2" role="group" aria-label={`${label} swatches`}>
        {SWATCHES.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => onChange(c)}
            aria-label={`${label} ${c}`}
            aria-pressed={value.toLowerCase() === c.toLowerCase()}
            style={{ backgroundColor: c }}
            className={cn(
              'h-8 w-8 rounded-full border transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze focus-visible:ring-offset-2',
              value.toLowerCase() === c.toLowerCase() ? 'border-tp-black ring-2 ring-tp-bronze ring-offset-2' : 'border-tp-line'
            )}
          />
        ))}
        <input
          id={id}
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-8 w-12 cursor-pointer rounded-tp-button border border-tp-line bg-white p-0.5"
          aria-label={`Custom ${label.toLowerCase()}`}
        />
      </div>
    </div>
  );
}

function Slider({
  id,
  label,
  value,
  min,
  max,
  onChange,
  display,
}: {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
  display?: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-sm font-semibold text-tp-ink">
          {label}
        </label>
        <span className="text-sm text-tp-muted">{display ?? value}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full accent-tp-bronze"
      />
    </div>
  );
}

/* ---------- main component ---------- */

export default function VirtualBackgroundMaker() {
  const [template, setTemplate] = useState<TemplateId>('modern-office');
  const [primary, setPrimary] = useState(TEMPLATES[0].primary);
  const [secondary, setSecondary] = useState(TEMPLATES[0].secondary);
  const [blur, setBlur] = useState(40);
  const [brightness, setBrightness] = useState(0);
  const [warmth, setWarmth] = useState(0);
  const [text, setText] = useState('');
  const [fontSize, setFontSize] = useState(56);
  const [textPos, setTextPos] = useState<TextPos>('bottom-left');
  const [showGuide, setShowGuide] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const def = TEMPLATES.find((t) => t.id === template) ?? TEMPLATES[0];

  const options: RenderOptions = { template, primary, secondary, blur, brightness, warmth, text, fontSize, textPos };

  // Redraw the preview whenever any setting changes.
  useEffect(() => {
    if (!canvasRef.current) return;
    renderBackground(canvasRef.current, options, BASE_W, BASE_H);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [template, primary, secondary, blur, brightness, warmth, text, fontSize, textPos]);

  const chooseTemplate = (t: TemplateDef) => {
    setTemplate(t.id);
    setPrimary(t.primary);
    setSecondary(t.secondary);
  };

  const resetAll = () => {
    setPrimary(def.primary);
    setSecondary(def.secondary);
    setBlur(40);
    setBrightness(0);
    setWarmth(0);
    setText('');
    setFontSize(56);
    setTextPos('bottom-left');
    setError(null);
  };

  const download = (w: number, h: number) => {
    setError(null);
    try {
      const canvas = document.createElement('canvas');
      renderBackground(canvas, options, w, h);
      canvas.toBlob((blob) => {
        if (!blob) {
          setError('Your browser could not create the image. Try a different browser.');
          return;
        }
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `tailorpic-virtual-background-${template}-${w}x${h}.png`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      }, 'image/png');
    } catch {
      setError('Your browser could not create the image. Try a different browser.');
    }
  };

  return (
    <div className="mx-auto w-full max-w-5xl rounded-tp-card border border-tp-line bg-tp-paper p-5 sm:p-8">
      {/* Preview */}
      <div className="relative overflow-hidden rounded-tp-card border border-tp-line bg-white">
        <canvas
          ref={canvasRef}
          width={BASE_W}
          height={BASE_H}
          role="img"
          aria-label={`Preview of the ${def.label} virtual background`}
          className="block h-auto w-full"
        />
        {showGuide && (
          <svg
            viewBox="0 0 160 90"
            className="pointer-events-none absolute inset-0 h-full w-full"
            aria-hidden="true"
            preserveAspectRatio="none"
          >
            <g fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.9)" strokeWidth="0.6" strokeDasharray="2 1.5">
              <ellipse cx="80" cy="34" rx="12" ry="15" />
              <path d="M40 90 C40 62 58 54 80 54 C102 54 120 62 120 90 Z" />
            </g>
          </svg>
        )}
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <label className="flex cursor-pointer items-center gap-2 text-sm text-tp-muted">
          <input
            type="checkbox"
            checked={showGuide}
            onChange={(e) => setShowGuide(e.target.checked)}
            className="h-4 w-4 accent-tp-bronze"
          />
          Show where you will appear (preview only)
        </label>
        <p className="text-xs text-tp-muted">Output: 1920 × 1080 (16:9)</p>
      </div>

      {/* Templates */}
      <div className="mt-8">
        <p className="text-sm font-semibold text-tp-ink">Template</p>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4" role="group" aria-label="Background template">
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => chooseTemplate(t)}
              aria-pressed={template === t.id}
              className={cn(
                'overflow-hidden rounded-tp-button border bg-white text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze',
                template === t.id ? 'border-tp-black ring-2 ring-tp-bronze' : 'border-tp-line hover:border-tp-bronze'
              )}
            >
              <TemplateThumb def={t} />
              <span className="block px-3 py-2 text-xs font-semibold text-tp-ink">{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div className="space-y-6">
          <ColorControl id="vb-primary" label={def.usesSecondary ? 'Primary color' : 'Color'} value={primary} onChange={setPrimary} />
          {def.usesSecondary && (
            <ColorControl id="vb-secondary" label="Secondary color" value={secondary} onChange={setSecondary} />
          )}
          {template === 'blurred-bokeh' && (
            <Slider id="vb-blur" label="Blur intensity" value={blur} min={0} max={100} onChange={setBlur} />
          )}
          <Slider
            id="vb-brightness"
            label="Brightness"
            value={brightness}
            min={-30}
            max={30}
            onChange={setBrightness}
            display={brightness > 0 ? `+${brightness}` : `${brightness}`}
          />
          <Slider
            id="vb-warmth"
            label="Warmth"
            value={warmth}
            min={-30}
            max={30}
            onChange={setWarmth}
            display={warmth === 0 ? 'Neutral' : warmth > 0 ? `Warmer +${warmth}` : `Cooler ${warmth}`}
          />
        </div>

        <div className="space-y-6">
          <div>
            <label htmlFor="vb-text" className="text-sm font-semibold text-tp-ink">
              Text overlay (optional)
            </label>
            <input
              id="vb-text"
              type="text"
              maxLength={60}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Company name or tagline"
              className="mt-2 h-11 w-full rounded-tp-button border border-tp-line bg-white px-3 text-sm text-tp-ink placeholder:text-tp-muted focus:outline-none focus:ring-2 focus:ring-tp-bronze-ink"
            />
            <p className="mt-1 text-xs text-tp-muted">
              Text sits in a corner so it stays out of your frame. Long text shrinks to fit.
            </p>
          </div>
          <Slider
            id="vb-font-size"
            label="Text size"
            value={fontSize}
            min={24}
            max={120}
            onChange={setFontSize}
            display={`${fontSize} px`}
          />
          <div>
            <p className="text-sm font-semibold text-tp-ink">Text position</p>
            <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Text position">
              {TEXT_POSITIONS.map((tp) => (
                <button
                  key={tp.id}
                  type="button"
                  onClick={() => setTextPos(tp.id)}
                  aria-pressed={textPos === tp.id}
                  className={cn(
                    'rounded-tp-button border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze',
                    textPos === tp.id
                      ? 'border-tp-black bg-tp-black text-tp-bronze'
                      : 'border-tp-line bg-white text-tp-ink hover:border-tp-bronze'
                  )}
                >
                  {tp.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Downloads */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => download(1920, 1080)}
          className={cn(buttonVariants({ variant: 'primary', size: 'lg' }), 'flex-1')}
        >
          <Download className="h-5 w-5" aria-hidden="true" />
          Download PNG (1920 × 1080)
        </button>
        <button
          type="button"
          onClick={() => download(1280, 720)}
          className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'flex-1')}
        >
          <Download className="h-5 w-5" aria-hidden="true" />
          Download PNG (1280 × 720)
        </button>
        <button type="button" onClick={resetAll} className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}>
          <RotateCcw className="h-5 w-5" aria-hidden="true" />
          Reset
        </button>
      </div>

      {error && (
        <p role="alert" className="mt-4 text-sm text-tp-ink">
          {error}
        </p>
      )}

      <div className="mt-6 space-y-2 text-center">
        <p className="text-sm text-tp-ink">Works with Zoom, Microsoft Teams, Google Meet, and Webex.</p>
        <p className="flex items-center justify-center gap-2 text-xs text-tp-muted">
          <ShieldCheck className="h-4 w-4 text-tp-bronze-ink" aria-hidden="true" />
          Your background is created in your browser. Nothing is uploaded.
        </p>
      </div>

      <div className="mt-6 rounded-tp-card border border-tp-line bg-white p-5 text-center">
        <p className="text-sm font-semibold text-tp-ink">Want a professional headshot for your video calls?</p>
        <Link
          href={ctaHref}
          className="mt-2 inline-block text-sm font-semibold text-tp-bronze-ink underline underline-offset-4"
        >
          Try TailorPic
        </Link>
      </div>
    </div>
  );
}
