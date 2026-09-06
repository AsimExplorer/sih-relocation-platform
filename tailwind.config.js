/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gov: {
          darkest: '#090d16',
          dark: '#0f172a',
          card: '#1e293b',
          surface: '#182234',
          border: '#334155',
          muted: '#94a3b8',
          text: '#f8fafc',
          accent: '#2563eb',
        },
        hazard: {
          red: '#dc2626',
          redLight: 'rgba(220, 38, 38, 0.15)',
          orange: '#ea580c',
          orangeLight: 'rgba(234, 88, 12, 0.15)',
          amber: '#d97706',
          emerald: '#059669',
          emeraldLight: 'rgba(5, 150, 105, 0.15)',
          blue: '#0284c7',
          blueLight: 'rgba(2, 132, 199, 0.15)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      }
    },
  },
  plugins: [],
}
