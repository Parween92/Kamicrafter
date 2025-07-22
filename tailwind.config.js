/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "neon-custom": "#00ffff",
      },
      dropShadow: {
        "neon-custom": "0 0 6px #00ffff",
      },
    },
  },
  plugins: [require("daisyui")],
};
