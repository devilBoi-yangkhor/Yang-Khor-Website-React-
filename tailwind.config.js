/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bgColor: "#121212", //black
        textColor: "#ffffff", //white
        primary: "#0E1293", //blue
        secondary: "#E2BA23", //yellow
        accent: "#87CEEB", //skyblue
      },
    },
  },
  darkMode: 'class', // Ensure dark mode is enabled
  plugins: [],
}
