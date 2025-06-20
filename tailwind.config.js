module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: 'var(--accent)',
      },
      fontFamily: {
        display: ['var(--font-playfair)'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
