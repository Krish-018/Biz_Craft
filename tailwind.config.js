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
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        }
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
        'slide-in': 'slideIn 0.3s ease-out',
      }
    },
  },
  plugins: [],
  safelist: [
    {
      pattern: /(bg|text|border)-(blue|green|purple|red|amber|rose|orange|indigo)-(100|200|300|400|500|600|700|800)/,
    },
  ],
}