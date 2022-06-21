/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: { max: "767px" },
      md: { min: "768px" },
      lg: { min: "1024px" },
      xl: { min: "1159px" },
    },
    extend: {
      colors: {
        lime: {
          1000: "#eafadd",
        },
        gray: {
          1000: "#f1eafc",
        },
        pink: {
          1000: "#fee3c8",
        },
      },
    },
  },

  plugins: [],
};
