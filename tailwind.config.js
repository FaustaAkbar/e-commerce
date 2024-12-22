/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'custom-green': '#E8FFF3', // Menambahkan warna kustom
      },
    },
  },
  plugins: [],
};
