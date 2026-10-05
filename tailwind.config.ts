import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        // TailorPic brand palette — premium luxury
        accent: {
          600: '#a07a52',
        },
        // Named semantic brand tokens (V3 §2 locked palette)
        'tp-black': '#0B0B0B',
        'tp-ink': '#171613',
        'tp-bronze': '#C9A98A',
        'tp-bronze-ink': '#76563D',
        'tp-paper': '#F8F5EF',
        'tp-beige': '#DCCDBB',
        'tp-muted': '#5F5A54',
        'tp-line': '#DFD6CC',
        'tp-warm': '#E8E1D8',
        'tp-white': '#FFFFFF',
        // Semantic state colors
        'tp-success': '#16A34A',
        'tp-warning': '#F59E0B',
        'tp-error': '#DC2626',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        'tp-card': '18px',
        'tp-button': '12px',
        'tp-dialog': '20px',
      },
      fontFamily: {
        sans: ['var(--font-manrope)', 'Inter', 'Arial', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', '"Instrument Serif"', 'Georgia', '"Times New Roman"', 'serif'],
      },
      fontSize: {
        // V3 Design System typography scale (ref image §3)
        // Headings — Instrument Serif (font-display font-normal)
        'tp-h1': ['clamp(2.5rem, 4vw, 3.5rem)', { lineHeight: '1.14', letterSpacing: '-0.02em' }],
        'tp-h2': ['clamp(1.875rem, 3vw, 2.5rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'tp-h3': ['clamp(1.25rem, 2vw, 1.5rem)', { lineHeight: '1.33' }],
        // Body — Manrope (font-sans)
        'tp-body-lg': ['1.125rem', { lineHeight: '1.75' }],
        'tp-body': ['1rem', { lineHeight: '1.75' }],
        'tp-body-sm': ['0.875rem', { lineHeight: '1.5' }],
        'tp-caption': ['0.75rem', { lineHeight: '1.33', letterSpacing: '0.02em' }],
        'tp-label': ['0.6875rem', { lineHeight: '1.45', letterSpacing: '0.08em' }],
      },
      maxWidth: {
        // V3 §5: main container 1280–1440px
        'tp-site': '1320px',
        'tp-content': '620px', // readable text width
      },
      spacing: {
        // V3 §5: section vertical rhythm 72–112px
        'tp-section': '5rem',      // 80px — default section gap
        'tp-section-sm': '3rem',   // 48px — compact section gap
        'tp-section-lg': '6rem',   // 96px — spacious section gap
        'tp-gutter': '1.5rem',     // 24px — outer gutter (V3 §5)
      },
      animation: {
        'cta-pulse': 'ctaPulse 1.6s ease-out infinite',
      },
      keyframes: {
        ctaPulse: {
          '0%': { boxShadow: '0 0 0 0 rgba(201, 169, 138, 0.55)' },
          '70%': { boxShadow: '0 0 0 14px rgba(201, 169, 138, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(201, 169, 138, 0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
