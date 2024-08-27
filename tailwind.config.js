/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'pulse-once': 'pulse 500ms ease-in-out 1'
      }
    },
  },
  plugins: [],
}