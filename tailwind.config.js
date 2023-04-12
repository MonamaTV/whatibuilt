/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#cf6679",
        secondary: "#2F4858",
        background: "#20262E",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
