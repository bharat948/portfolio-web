/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary, #0066CC)',
        'primary-dark': 'var(--color-primary-dark, #0A84FF)',
        secondary: 'var(--color-secondary, #5AC8FA)',
        'secondary-dark': 'var(--color-secondary-dark, #64D2FF)',
        accent: 'var(--color-accent, #FF2D55)',
        'accent-dark': 'var(--color-accent-dark, #FF375F)',
      },
      fontFamily: {
        sans: [
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};