/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        blackOverlay: "rgba(0, 0 ,0 ,0.6)",
      },
      borderRadius: {
        sixty: "60px",
      },
    },
  },
  plugins: [],
};
