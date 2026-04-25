/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-navy': '#0f172a', // slate-900
        'brand-dark': '#1e293b', // slate-800
        'brand-light': '#f8fafc', // slate-50
        'brand-primary': '#3b82f6', // blue-500
        'brand-primary-hover': '#2563eb', // blue-600
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
