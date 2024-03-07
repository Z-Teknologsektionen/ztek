import { type Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        zRed: "#ED2024",
        zBlack: "#333333",
        zDarkGray: "#888888",
        zLightGray: "#BBBBBB",
        zWhite: "#EEEEEE",
        waring: "#FFA500",
        danger: "#FF0000",
        success: "#008000",
        cardBackground: "#F5F5F5",
      },
      backgroundImage: {
        "about-image": "url('/kandidat.jpg')",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  //https://github.com/sambauers/tailwindcss-3d
  plugins: [require("tailwindcss-animate"), require("tailwindcss-3d")],
} satisfies Config;
