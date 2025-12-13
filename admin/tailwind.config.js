/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns:{
        'auto':'repeat(auto-fill, minmax(200px, 1fr))'
      },
      colors:{
        'primary':'#5F6FFF',
        'dark': {
          'bg': '#000000',
          'surface': '#1a1a1a',
          'border': '#333333'
        }
      }
    },
  },
  plugins: [],
}