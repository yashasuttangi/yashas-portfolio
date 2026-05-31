/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── deep space backgrounds ──
        space: {
          void:    '#020108',  // deepest — used for body
          base:    '#070518',  // standard page bg
          deep:    '#0a0820',  // raised areas / hover
          surface: 'rgba(255, 255, 255, 0.03)',  // glassmorphic cards
          glow:    'rgba(167, 139, 250, 0.08)',  // ambient nebula tint
        },
        // ── borders ──
        line: {
          faint:  'rgba(240, 238, 255, 0.05)',
          base:   'rgba(240, 238, 255, 0.1)',
          bright: 'rgba(240, 238, 255, 0.2)',
        },
        // ── accents (mapped to scene clusters) ──
        // Primary — soft violet, the "signature" color
        violet: {
          glow: '#a78bfa',
          mid:  '#8b5cf6',
          deep: '#5b21b6',
        },
        // Secondary — soft teal, for "full-stack" cluster + accents
        teal: {
          glow: '#5eead4',
          mid:  '#2dd4bf',
          deep: '#0f766e',
        },
        // Tertiary — warm coral, used sparingly for emphasis/awards
        coral: {
          glow: '#fda4af',
          mid:  '#fb7185',
          deep: '#9f1239',
        },
        // ── text ──
        ink: {
          primary:   '#f0eeff',                          // main copy
          secondary: 'rgba(240, 238, 255, 0.65)',        // body
          muted:     'rgba(240, 238, 255, 0.4)',         // labels
          faint:     'rgba(240, 238, 255, 0.2)',         // hints
        },
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],            // headlines — distinctive, modern
        mono:    ['"DM Mono"', 'monospace'],        // labels, system text
        body:    ['Inter', 'sans-serif'],           // body — readable
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: '0.3' },
          '50%':      { opacity: '1' },
        },
        drift: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%':      { opacity: '1',   transform: 'scale(1.15)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        twinkle:   'twinkle 3s ease-in-out infinite',
        drift:     'drift 6s ease-in-out infinite',
        pulseGlow: 'pulseGlow 2.5s ease-in-out infinite',
        fadeUp:    'fadeUp 0.8s ease-out forwards',
      },
    },
  },
  plugins: [],
};