'use client';

import { useEffect, useCallback } from 'react';

interface Headshot {
  id: string;
  imageUrl: string;
  thumbnailUrl: string;
  isFavorite: boolean;
}

interface HeadshotModalProps {
  headshots: Headshot[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
  onToggleFavorite: (id: string) => void;
  onDownload: (url: string, index: number) => void;
}

export function HeadshotModal({
  headshots,
  currentIndex,
  onClose,
  onNavigate,
  onToggleFavorite,
  onDownload,
}: HeadshotModalProps) {
  const current = headshots[currentIndex];
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < headshots.length - 1;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          if (hasPrev) onNavigate(currentIndex - 1);
          break;
        case 'ArrowRight':
          if (hasNext) onNavigate(currentIndex + 1);
          break;
      }
    },
    [onClose, onNavigate, currentIndex, hasPrev, hasNext]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  if (!current) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80" onClick={onClose} />

      {/* Content */}
      <div className="relative z-10 flex max-h-[90vh] max-w-[90vw] flex-col items-center">
        {/* Top bar */}
        <div className="mb-4 flex w-full items-center justify-between">
          <span className="text-sm text-white/70">
            {currentIndex + 1} of {headshots.length}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleFavorite(current.id)}
              className="rounded-tp-button bg-white/10 p-2.5 text-white backdrop-blur-sm hover:bg-white/20 transition-colors"
              title={current.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <svg
                className={`h-5 w-5 ${current.isFavorite ? 'fill-red-500 text-red-500' : ''}`}
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                fill={current.isFavorite ? 'currentColor' : 'none'}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </button>
            <button
              onClick={() => onDownload(current.imageUrl, currentIndex)}
              className="rounded-tp-button bg-white/10 p-2.5 text-white backdrop-blur-sm hover:bg-white/20 transition-colors"
              title="Download"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
            </button>
            <button
              onClick={onClose}
              className="rounded-tp-button bg-white/10 p-2.5 text-white backdrop-blur-sm hover:bg-white/20 transition-colors"
              title="Close"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Image */}
        <div className="relative flex items-center">
          {/* Prev button */}
          {hasPrev && (
            <button
              onClick={() => onNavigate(currentIndex - 1)}
              className="absolute -left-16 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm hover:bg-white/20 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
          )}

          <img
            src={current.imageUrl}
            alt={`Headshot ${currentIndex + 1}`}
            className="max-h-[80vh] max-w-[80vw] rounded-tp-button object-contain shadow-2xl"
            decoding="async"
          />

          {/* Next button */}
          {hasNext && (
            <button
              onClick={() => onNavigate(currentIndex + 1)}
              className="absolute -right-16 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm hover:bg-white/20 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
