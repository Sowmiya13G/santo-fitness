/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // common
        primary: "#9C0707",
        secondary: "#E54D4D",
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
        opacity_primary:"#9C070720"
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
  plugins: [],
};
