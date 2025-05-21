/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#121212",
        secondary: "#232323",
        accent: "#f54",
      },
      borderRadius: {
        'xl': '12px',
      },
    },
  },
  plugins: [],
};