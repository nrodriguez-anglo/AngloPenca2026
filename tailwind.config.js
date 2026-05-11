/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#FFFFFF',
        surface: '#F4F4F5',
        'surface-2': 'zinc-700',
        border: '#F4F4F5',
        primary: {
          DEFAULT: '#D1172B',
          hover: '#059669',
          light: '#D1FAE5',
        },
        accent: {
          DEFAULT: '#13123D',
          hover: '#D97706',
          light: '#FEF3C7',
        },
        text: {
          primary: '#27272a',
          secondary: '#1E3F77',
          muted: '#71717b',
        },
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6',
      },
      fontFamily: {
         milo: ['MiloOT-Bold', 'sans-serif'],
      },
      screens: {
        xs: '375px',
      },
    },
  },
  plugins: [],
}
