/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bgPrimary: "#F7F8F9",
        bgDarkPrimary: "#1D2125",
        bgShadow: "#10232A",
        bgHighlight: "#F1F2F4",
        bgDarkHighlight: "#22272B",
        bgText: "#FFFFFF",
        bgDarkText: "#101214",
        bgAction: "#B58863",
        darkPrimary: "",
      },
    },
  },
  plugins: [],
};
