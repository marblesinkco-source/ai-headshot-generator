import { useId } from 'react';

interface PortraitSilhouetteProps {
  outfitColor: string;
  skinTone?: string;
  /** Draw only hair, face and neck (for callers that render their own shoulders). */
  bare?: boolean;
  /** Overrides the neck colour, e.g. for a turtleneck. */
  neckColor?: string;
}

/**
 * Illustrative bust silhouette (hair, face, neck, shoulders) drawn as inline SVG.
 * Fills its container and stays anchored to the bottom edge. Decorative only.
 */
export function PortraitSilhouette({ outfitColor, skinTone = '#E8D5C4', bare = false, neckColor }: PortraitSilhouetteProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const soft = `tp-soft-${uid}`;
  const blur = `tp-blur-${uid}`;
  const skinGrad = `tp-skin-${uid}`;
  const cloth = `tp-cloth-${uid}`;

  return (
    <svg
      viewBox="0 0 100 125"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMax slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <filter id={soft} x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="1.2" stdDeviation="1.6" floodColor="#000" floodOpacity="0.28" />
        </filter>
        <filter id={blur} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.8" />
        </filter>
        <linearGradient id={skinGrad} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.18" />
          <stop offset="0.55" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.14" />
        </linearGradient>
        <linearGradient id={cloth} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.12" />
          <stop offset="1" stopColor="#000" stopOpacity="0.18" />
        </linearGradient>
      </defs>

      {/* Neck */}
      <path d="M42.5 64 L57.5 64 L58 90 L50 101 L42 90 Z" fill={neckColor ?? skinTone} />
      <path d="M42.5 64 L57.5 64 L58 90 L50 101 L42 90 Z" fill="#000" opacity="0.08" />
      {/* Chin shadow on neck */}
      <ellipse cx="50" cy="77" rx="9" ry="4.5" fill="#000" opacity="0.2" filter={`url(#${blur})`} />

      {/* Shoulders */}
      {!bare && (
      <g filter={`url(#${soft})`}>
        <path
          d="M-5 125 C-5 108 8 98 28 93 C36 91 40 90 41.5 87.5 L50 100.5 L58.5 87.5 C60 90 64 91 72 93 C92 98 105 108 105 125 Z"
          fill={outfitColor}
        />
        <path
          d="M-5 125 C-5 108 8 98 28 93 C36 91 40 90 41.5 87.5 L50 100.5 L58.5 87.5 C60 90 64 91 72 93 C92 98 105 108 105 125 Z"
          fill={`url(#${cloth})`}
        />
      </g>
      )}

      {/* Ears */}
      <ellipse cx="33.2" cy="56" rx="2.4" ry="4.4" fill={skinTone} />
      <ellipse cx="66.8" cy="56" rx="2.4" ry="4.4" fill={skinTone} />

      {/* Face */}
      <g filter={`url(#${soft})`}>
        <path
          d="M50 33 C38.5 33 34 43 34.5 54 C35 65 40 75 46 78.5 C48.5 80 51.5 80 54 78.5 C60 75 65 65 65.5 54 C66 43 61.5 33 50 33 Z"
          fill={skinTone}
        />
      </g>
      <path
        d="M50 33 C38.5 33 34 43 34.5 54 C35 65 40 75 46 78.5 C48.5 80 51.5 80 54 78.5 C60 75 65 65 65.5 54 C66 43 61.5 33 50 33 Z"
        fill={`url(#${skinGrad})`}
      />

      {/* Hair */}
      <path
        d="M33.5 55 C30 38 37 26 51 26 C65 26 71 38 66.5 55 C66 47 63.5 42 58.5 40 C52 43 42 42 37.5 46 C35 48 34 51 33.5 55 Z"
        fill="#3B2A20"
      />
      <path
        d="M40 31 C45 28 54 27.5 61 31"
        fill="none"
        stroke="#fff"
        strokeOpacity="0.14"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
