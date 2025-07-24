/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        "screen-dynamic": "calc(var(--vh) * 100)",
      },
      colors: {
        // common
        primary: "#9C0707",
        secondary: "#E54D4D",
        red_25:"#B1252590",
        primaryOpacity:"#f4b1a79e",
        red_50: "#B1252450",
        red_30: "#B1252430",
        // background
        bg_primary: "#ADA4A5",
        bg_secondary: "#ADA4A5",
        // font
        font_primary: "#000",
        font_secondary: "#ddd",
        // border
        border_primary: "#000",
        border_secondary: "#ddd",
        // opacity
        opacity_primary: "#9C070720",
        icon: "#8E8E93",
        feild_primay: "#F7F8F8",
      },
      backgroundImage: {
        // "primary-gradient": "linear-gradient(to right, #E54D4D, #9C0707)",
        "primary-gradient": "linear-gradient(45deg, #E54D4D, #9C0707)",
      },
      fontFamily: {
        poppin: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".text-gradient": {
          backgroundImage: "linear-gradient(45deg, #E54D4D, #9C0707)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        },
      });
    }),
  ],
};
