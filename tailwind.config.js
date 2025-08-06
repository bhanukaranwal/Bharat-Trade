export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron: "#FF9933",
        indianGreen: "#138808",
        indigo: "#3F51B5",
      },
      keyframes: {
        "slide-in": {
          "0%": { opacity: 0, transform: "translateX(20%)" },
          "100%": { opacity: 1, transform: "translateX(0)" }
        },
      },
      animation: {
        "slide-in": "slide-in 0.3s ease forwards",
      },
    },
  },
  plugins: [],
};
