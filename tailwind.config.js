/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'move-bounce': 'move-bounce 3s ease-in-out',
        fade: 'fade 0.5s ease-in-out',
        'fade-in': 'fade-in 1s ease-in-out', // ✅ New animation
      },
      keyframes: {
        'move-bounce': {
          '0%': { transform: 'translateY(0)' },
          '60%': { transform: 'translateY(80vh)' },
          '70%': { transform: 'translateY(76vh)' },
          '75%': { transform: 'translateY(80vh)' },
          '80%': { transform: 'translateY(76vh)' },
          '85%': { transform: 'translateY(80vh)' },
          '100%': { transform: 'translateY(80vh)' },
        },
        fade: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        'fade-in': { // ✅ New keyframes
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
