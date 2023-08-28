// @ts-ignore

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        zRed: "#ED2024",
        zBlack: "#333333",
        zDarkGray: "#888888",
        zLightGray: "#BBBBBB",
        zWhite: "#EEEEEE",
      },
      backgroundImage: {
        "about-image": "url('/kandidat.jpg')",
      },
    },
  },
  plugins: [],
} satisfies Config;
