/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#7A2E2E',
          50: '#fcf7f7',
          100: '#f9eeee',
          200: '#f2dada',
          300: '#e6bbbb',
          400: '#d18e8e',
          500: '#7a2e2e',
          600: '#692626',
          700: '#572020',
          800: '#481b1b',
          900: '#3d1a1a',
        },
        background: '#F6F3F2',
        textMain: '#2A2A2A',
      },
      fontFamily: {
        sans: ['Public Sans', 'sans-serif'],
      },
      borderRadius: {
        'twelve': '12px',
      }
    },
  },
  plugins: [],
}
