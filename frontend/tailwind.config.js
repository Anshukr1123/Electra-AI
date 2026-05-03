/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E40AF',
        secondary: '#0F172A',
        accent: '#3B82F6',
        background: '#F8FAFC',
        surface: '#FFFFFF',
        textMain: '#1E293B',
        textMuted: '#64748B'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
