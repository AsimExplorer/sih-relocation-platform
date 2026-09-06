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
          bg: '#f8fafc',
          card: '#ffffff',
          surface: '#f1f5f9',
          surfaceHover: '#e2e8f0',
          border: '#e2e8f0',
          borderStrong: '#cbd5e1',
          navy: '#0f172a',
          navyMuted: '#1e293b',
          blue: '#1d4ed8',
          blueDark: '#1e3a8a',
          blueLight: '#eff6ff',
          text: '#0f172a',
          textSecondary: '#475569',
          muted: '#64748b',
        },
        hazard: {
          red: '#b91c1c',
          redLight: '#fef2f2',
          redBorder: '#fecaca',
          orange: '#c2410c',
          orangeLight: '#fff7ed',
          orangeBorder: '#fed7aa',
          amber: '#b45309',
          amberLight: '#fffbeb',
          amberBorder: '#fde68a',
          emerald: '#15803d',
          emeraldLight: '#f0fdf4',
          emeraldBorder: '#bbf7d0',
          blue: '#1d4ed8',
          blueLight: '#eff6ff',
          blueBorder: '#bfdbfe',
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
