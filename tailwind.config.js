/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#03dac5",
        secondary: "#2F4858",
        background: "#121212",
      },
    },
  },
  plugins: [],
};
