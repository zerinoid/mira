/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      red: {
        300: "#fa5748",
        500: "#ba141a",
        700: "#bf0000",
      },
      yellow: {
        100: "#ffffe6",
      },
    },
    extend: {},
  },
  plugins: [],
};
