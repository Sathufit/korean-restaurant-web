/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'deep-black': '#0A0A0A',
        'warm-white': '#FAF8F3',
        'gold': '#D4AF37',
        'charcoal': '#1C1C1C',
        'cream': '#F8F6F3',
      },
      fontFamily: {
        heading: ['Playfair Display', 'Noto Serif KR', 'serif'],
        korean: ['Noto Serif KR', 'serif'],
        body: ['Outfit', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'float': 'float 3s ease-in-out infinite',
      },
      boxShadow: {
        'luxury': '0 10px 40px rgba(0, 0, 0, 0.1)',
        'gold': '0 8px 32px rgba(212, 175, 55, 0.3)',
      },
    },
  },
  plugins: [],
}
