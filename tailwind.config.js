/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}', './src/app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#fdfdfd',
        foreground: '#333333',
        primary: '#0ea5e9',
        secondary: '#3b82f6',
        accent: '#9333ea',
      },
    },
  },
  plugins: [],
};

