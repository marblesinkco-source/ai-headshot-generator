'use client';

import { useEffect, useState } from 'react';

type QualityLevel = 'good' | 'warning' | 'error';

interface QualityResult {
  level: QualityLevel;
  message: string;
}

interface PhotoQualityCheckerProps {
  file: File;
  previewUrl: string;
}

function checkFileSize(file: File): QualityResult | null {
  if (file.size > 10 * 1024 * 1024) {
    return { level: 'error', message: 'File is over 10 MB' };
  }
  if (file.size < 50 * 1024) {
    return { level: 'warning', message: 'File is under 50 KB — may lack detail' };
  }
  return null;
}

function checkResolution(width: number, height: number): QualityResult | null {
  if (width < 512 || height < 512) {
    return {
      level: 'warning',
      message: `Low resolution (${width}×${height}) — 512px minimum recommended`,
    };
  }
  return null;
}

function checkAspectRatio(width: number, height: number): QualityResult | null {
  const ratio = Math.max(width, height) / Math.min(width, height);
  if (ratio > 3) {
    return {
      level: 'warning',
      message: 'Unusual aspect ratio — crop to a standard shape for best results',
    };
  }
  return null;
}

export function PhotoQualityChecker({ file, previewUrl }: PhotoQualityCheckerProps) {
  const [result, setResult] = useState<QualityResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    // Check file size first (instant)
    const sizeIssue = checkFileSize(file);
    if (sizeIssue && sizeIssue.level === 'error') {
      setResult(sizeIssue);
      setLoading(false);
      return;
    }

    // Load image to check resolution and aspect ratio
    const img = new Image();
    img.onload = () => {
      if (cancelled) return;

      const resolutionIssue = checkResolution(img.naturalWidth, img.naturalHeight);
      if (resolutionIssue) {
        setResult(resolutionIssue);
        setLoading(false);
        return;
      }

      const aspectIssue = checkAspectRatio(img.naturalWidth, img.naturalHeight);
      if (aspectIssue) {
        setResult(aspectIssue);
        setLoading(false);
        return;
      }

      // File size warning (non-blocking)
      if (sizeIssue) {
        setResult(sizeIssue);
        setLoading(false);
        return;
      }

      setResult({ level: 'good', message: 'Good quality' });
      setLoading(false);
    };

    img.onerror = () => {
      if (cancelled) return;
      setResult(null);
      setLoading(false);
    };

    img.src = previewUrl;

    return () => {
      cancelled = true;
    };
  }, [file, previewUrl]);

  if (loading || !result) return null;

  return (
    <div
      className={`mt-1.5 flex items-center gap-1.5 rounded-md px-2 py-1 text-xs leading-tight ${
        result.level === 'good'
          ? 'bg-tp-beige/60 text-tp-bronze-ink'
          : result.level === 'warning'
            ? 'bg-tp-warning/10 text-tp-bronze-ink'
            : 'bg-tp-paper text-tp-ink'
      }`}
    >
      {result.level === 'good' && (
        <svg
          className="h-3.5 w-3.5 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      )}
      {result.level === 'warning' && (
        <svg
          className="h-3.5 w-3.5 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
          />
        </svg>
      )}
      {result.level === 'error' && (
        <svg
          className="h-3.5 w-3.5 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      )}
      <span>{result.message}</span>
    </div>
  );
}
