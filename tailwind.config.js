import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkPrimary: "#1B1B1B",
        darkSecondary: "#2C2C2E",
        darkTertiary: "#3C3C43",
        ascent: "#0A84FF",
        lightPrimary: "#85858B",
        lightSecondary: "#E1E1E6",
        lightTertiary: "#EBEBF5",
        lightQuaternary: "#F2F2F7",
      },
      boxShadow: {
        card: "0px 35px 120px -10px #211e35",
      },
    },
  },
  plugins: [daisyui],
};
