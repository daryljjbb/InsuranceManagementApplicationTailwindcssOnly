/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
  extend: {
  keyframes: {
    slideIn: {
      "0%": { opacity: 0, transform: "translateX(12px)" },
      "100%": { opacity: 1, transform: "translateX(0)" },
    },
    fadeOut: {
      "0%": { opacity: 1, transform: "translateY(0)" },
      "100%": { opacity: 0, transform: "translateY(6px)" },
    },
    fadeIn: {
      "0%": { opacity: 0, transform: "translateY(6px)" },
      "100%": { opacity: 1, transform: "translateY(0)" },
    },
  },
  animation: {
    slideIn: "slideIn 0.35s ease-out",
    fadeIn: "fadeIn 0.35s ease-out",
    fadeOut: "fadeOut 0.25s ease-in",
  },
}

  },
  plugins: [],
};
