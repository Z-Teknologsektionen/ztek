import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        zRed: "'#ED2024",
        zBlack: "#333333",
        zDarkGray: "#888888",
        zLightGray: "#BBBBBB",
        zWhite: "#EEEEEE",
      },
    },
  },
  plugins: [],
} satisfies Config;
