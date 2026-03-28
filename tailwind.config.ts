import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: '#f8fafc',
        foreground: '#1a1a2e',
        card: '#ffffff',
        sus: '#6366f1',
        attrakdiff: {
          pq: '#2563eb',
          hqi: '#7c3aed',
          hqs: '#0891b2',
          att: '#059669',
        },
        journeymap: '#f59e0b',
      },
    },
  },
  plugins: [],
}

export default config
