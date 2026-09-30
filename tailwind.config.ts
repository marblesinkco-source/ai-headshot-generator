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
        brand: {
          50: '#faf8f5',    // lightest warm off-white
          100: '#f3efe8',   // soft cream
          200: '#e5ddd0',   // warm beige light
          300: '#dccdbb',   // Warm Beige
          400: '#c9a98a',   // Bronze / Tailoring Gold
          500: '#b8946e',   // deeper gold
          600: '#a07a52',   // rich bronze
          700: '#876440',   // dark bronze
          800: '#6e5035',   // deep espresso bronze
          900: '#5a4130',   // very dark
          950: '#2d1f16',   // near-black warm
        },
        accent: {
          50: '#faf8f5',
          100: '#f8f5ef',   // Soft Off-White
          200: '#e8e2d8',
          300: '#dccdbb',   // Warm Beige
          400: '#c9a98a',   // Bronze
          500: '#b8946e',
          600: '#a07a52',
          700: '#876440',
          800: '#6e5035',
          900: '#0b0b0b',   // Tailoring Black
          950: '#050505',
        },
        // Named semantic brand tokens
        'tailor-black': '#0b0b0b',
        'tailor-gold': '#c9a98a',
        'tailor-beige': '#dccdbb',
        'tailor-cream': '#f8f5ef',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-up': 'fadeUp 0.5s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        shimmer: 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-10px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
