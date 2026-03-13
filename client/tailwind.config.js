/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        roboto: ['"Roboto"', "sans-serif"],
      },
      colors: {
        themeColor: "#85319A",
        gradientFirst: "#BA0727",
        gradientSecond: "#FF3155",
        darkModeThird: "#4E535D",
      },
    },
    screens: {
      xs: "480px", // Small mobile devices
      sm: "640px", // Standard mobile devices
      md: "768px", // Tablets
      lg: "1024px", // Small laptops
      xl: "1280px", // Desktops
      xxl: "1536px", // Large screens
    },
  },
  plugins: [],
}
