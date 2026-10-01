'use client';

import { useCallback, useRef, useState } from 'react';
import Image from 'next/image';

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  width: number;
  height: number;
}

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  width,
  height,
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const dragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setPosition(pct);
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      dragging.current = true;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      updatePosition(e.clientX);
    },
    [updatePosition]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging.current) return;
      updatePosition(e.clientX);
    },
    [updatePosition]
  );

  const handlePointerUp = useCallback(() => {
    dragging.current = false;
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-tp-card select-none touch-none"
      style={{ aspectRatio: `${width} / ${height}` }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      role="slider"
      aria-label="Before and after comparison slider"
      aria-valuenow={Math.round(position)}
      aria-valuemin={0}
      aria-valuemax={100}
      tabIndex={0}
      onKeyDown={(e: React.KeyboardEvent) => {
        if (e.key === 'ArrowLeft') setPosition((p: number) => Math.max(5, p - 2));
        if (e.key === 'ArrowRight') setPosition((p: number) => Math.min(95, p + 2));
      }}
    >
      {/* After image (full background) */}
      <Image
        src={afterSrc}
        alt={afterAlt}
        width={width}
        height={height}
        className="absolute inset-0 h-full w-full object-cover"
        sizes="(max-width: 768px) 90vw, 520px"
        loading="lazy"
      />

      {/* Before image (clipped via clip-path so it doesn't scale) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={beforeSrc}
          alt={beforeAlt}
          width={width}
          height={height}
          className="absolute inset-0 h-full w-full object-cover"
          sizes="(max-width: 768px) 90vw, 520px"
          loading="lazy"
        />
      </div>

      {/* Slider line */}
      <div
        className="absolute top-0 bottom-0 z-10"
        style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
      >
        <div className="h-full w-[2px] bg-white/90 shadow-sm" />
        {/* Drag handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-tp-black/60 backdrop-blur-sm shadow-lg cursor-ew-resize">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-white">
            <path d="M5 3L2 8L5 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M11 3L14 8L11 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <span className="absolute top-3 left-3 z-20 rounded-full bg-tp-black/75 px-3 py-1.5 text-[11px] font-medium text-white">
        Before
      </span>
      <span className="absolute top-3 right-3 z-20 rounded-full bg-tp-bronze/90 px-3 py-1.5 text-[11px] font-medium text-tp-black">
        After
      </span>
    </div>
  );
}
