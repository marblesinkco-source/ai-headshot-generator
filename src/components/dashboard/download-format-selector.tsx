'use client';

import { useState } from 'react';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface DownloadFormat {
  id: string;
  name: string;
  description: string;
  width: number;
  height: number;
  icon: React.ReactNode;
}

interface DownloadFormatSelectorProps {
  imageUrl: string;
  onDownload: (format: string, width: number, height: number) => void;
}

/* ------------------------------------------------------------------ */
/*  Preset formats                                                     */
/* ------------------------------------------------------------------ */

const PRESET_FORMATS: DownloadFormat[] = [
  {
    id: 'linkedin',
    name: 'LinkedIn',
    description: '400 × 400 px',
    width: 400,
    height: 400,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
      </svg>
    ),
  },
  {
    id: 'resume',
    name: 'Resume / CV',
    description: '600 × 750 px (2×2.5 in)',
    width: 600,
    height: 750,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9z" />
      </svg>
    ),
  },
  {
    id: 'email-signature',
    name: 'Email Signature',
    description: '200 × 200 px',
    width: 200,
    height: 200,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    id: 'social-media',
    name: 'Social Media',
    description: '1080 × 1080 px',
    width: 1080,
    height: 1080,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185z" />
      </svg>
    ),
  },
  {
    id: 'passport',
    name: 'Passport',
    description: '600 × 600 px (2×2 in)',
    width: 600,
    height: 600,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0z" />
      </svg>
    ),
  },
  {
    id: 'original',
    name: 'Original',
    description: 'Full resolution',
    width: 0,
    height: 0,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21z" />
      </svg>
    ),
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function DownloadFormatSelector({
  imageUrl,
  onDownload,
}: DownloadFormatSelectorProps) {
  const [selectedId, setSelectedId] = useState<string>('linkedin');
  const [customWidth, setCustomWidth] = useState<number>(800);
  const [customHeight, setCustomHeight] = useState<number>(800);
  const isCustom = selectedId === 'custom';

  function handleDownload() {
    if (isCustom) {
      onDownload('custom', customWidth, customHeight);
      return;
    }
    const preset = PRESET_FORMATS.find((f) => f.id === selectedId);
    if (preset) {
      onDownload(preset.id, preset.width, preset.height);
    }
  }

  return (
    <div className="w-full space-y-4">
      {/* Preset format grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {PRESET_FORMATS.map((format) => {
          const isSelected = selectedId === format.id;
          return (
            <button
              key={format.id}
              type="button"
              onClick={() => setSelectedId(format.id)}
              className={`
                relative flex flex-col items-center gap-1.5 rounded-tp-card border-2 px-3 py-4
                transition-colors text-left
                ${
                  isSelected
                    ? 'border-tp-bronze bg-tp-paper'
                    : 'border-tp-line bg-white hover:border-tp-beige'
                }
              `}
            >
              {/* Radio indicator */}
              <span
                className={`
                  absolute top-2.5 right-2.5 h-4 w-4 rounded-full border-2 flex items-center justify-center
                  ${isSelected ? 'border-tp-bronze' : 'border-tp-line'}
                `}
              >
                {isSelected && (
                  <span className="h-2 w-2 rounded-full bg-tp-bronze" />
                )}
              </span>

              {/* Icon */}
              <span className={isSelected ? 'text-tp-bronze-ink' : 'text-tp-muted'}>
                {format.icon}
              </span>

              {/* Label */}
              <span className="text-sm font-medium text-tp-ink">
                {format.name}
              </span>

              {/* Dimensions */}
              <span className="text-xs text-tp-muted">
                {format.description}
              </span>
            </button>
          );
        })}

        {/* Custom format card */}
        <button
          type="button"
          onClick={() => setSelectedId('custom')}
          className={`
            relative flex flex-col items-center gap-1.5 rounded-tp-card border-2 px-3 py-4
            transition-colors text-left
            ${
              isCustom
                ? 'border-tp-bronze bg-tp-paper'
                : 'border-tp-line bg-white hover:border-tp-beige'
            }
          `}
        >
          <span
            className={`
              absolute top-2.5 right-2.5 h-4 w-4 rounded-full border-2 flex items-center justify-center
              ${isCustom ? 'border-tp-bronze' : 'border-tp-line'}
            `}
          >
            {isCustom && (
              <span className="h-2 w-2 rounded-full bg-tp-bronze" />
            )}
          </span>

          <span className={isCustom ? 'text-tp-bronze-ink' : 'text-tp-muted'}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
            </svg>
          </span>

          <span className="text-sm font-medium text-tp-ink">Custom</span>
          <span className="text-xs text-tp-muted">Enter dimensions</span>
        </button>
      </div>

      {/* Custom dimension inputs */}
      {isCustom && (
        <div className="flex items-center gap-3 rounded-tp-card border border-tp-line bg-tp-paper px-4 py-3">
          <label className="flex flex-col gap-1">
            <span className="text-xs text-tp-muted">Width (px)</span>
            <input
              type="number"
              min={1}
              max={10000}
              value={customWidth}
              onChange={(e) => setCustomWidth(Math.max(1, Number(e.target.value)))}
              className="w-24 rounded-tp-button border border-tp-line bg-white px-3 py-1.5 text-sm text-tp-ink focus:border-tp-bronze-ink focus:outline-none"
            />
          </label>
          <span className="mt-4 text-tp-muted">x</span>
          <label className="flex flex-col gap-1">
            <span className="text-xs text-tp-muted">Height (px)</span>
            <input
              type="number"
              min={1}
              max={10000}
              value={customHeight}
              onChange={(e) => setCustomHeight(Math.max(1, Number(e.target.value)))}
              className="w-24 rounded-tp-button border border-tp-line bg-white px-3 py-1.5 text-sm text-tp-ink focus:border-tp-bronze-ink focus:outline-none"
            />
          </label>
        </div>
      )}

      {/* Download button */}
      <button
        type="button"
        onClick={handleDownload}
        className="w-full rounded-tp-button bg-tp-bronze px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
      >
        Download{' '}
        {isCustom
          ? `${customWidth} x ${customHeight}`
          : PRESET_FORMATS.find((f) => f.id === selectedId)?.name ?? ''}{' '}
        Photo
      </button>
    </div>
  );
}
