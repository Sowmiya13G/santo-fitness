/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: "#ADA4A5",
        red: "#B12525",
        red_63: "#F96363",
        red_4D: "#E54D4D",
        red_07: "#9C0707",
      },
      backgroundImage: {
        "red-gradient": "linear-gradient(to bottom, #E54D4D, #9C0707)",
        "red-gradient-1": "linear-gradient(to bottom, #B12525, #F96363)",
      },
      fontFamily: {
        poppin: ["Poppins", "sans-serif"], 
      },
    },
  },
  plugins: [],
};
