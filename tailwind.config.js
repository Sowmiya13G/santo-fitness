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
        red_25: "#B1252590",
        primaryOpacity: "#f4b1a79e",
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
        field_primary: "#F7F8F8",
        field_primaryDisabled: "#ececec",
      },
      backgroundImage: {
        // "primary-gradient": "linear-gradient(to right, #E54D4D, #9C0707)",
        "primary-gradient": "linear-gradient(45deg, #E54D4D, #9C0707)",
      },
      fontFamily: {
        poppin: ["Poppins", "sans-serif"],
      },
      keyframes: {
        "slide-left-to-right": {
          "0%": { transform: "translateX(0%)", opacity: "0" },
          "100%": { transform: "translateX(-100%)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "zoom-in": {
          "0%": { opacity: "0", transform: "scale(1.25)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.4s ease-out forwards ",
        "zoom-in": "zoom-in 0.4s ease-out forwards ",
        "slide-left-to-right": "slide-left-to-right 0.4s ease-out forwards",
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
