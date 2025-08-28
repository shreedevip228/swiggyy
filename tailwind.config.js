/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // tailwind.config.js
extend: {
  animation: {
    fadeIn: "fadeIn 0.3s ease-in-out",
  },
  keyframes: {
    fadeIn: {
      "0%": { opacity: 0, transform: "scale(0.95)" },
      "100%": { opacity: 1, transform: "scale(1)" },
    },
  },
}

};
