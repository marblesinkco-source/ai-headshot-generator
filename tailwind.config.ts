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
        // Named semantic brand tokens
        'tp-black': '#0B0B0B',
        'tp-ink': '#171613',
        'tp-bronze': '#C9A98A',
        'tp-bronze-ink': '#76563D',
        'tp-paper': '#F8F5EF',
        'tp-beige': '#DCCDBB',
        'tp-muted': '#5F5A54',
        'tp-line': '#DFD6CC',
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
        display: ['"Instrument Serif"', 'Georgia', '"Times New Roman"', 'serif'],
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
