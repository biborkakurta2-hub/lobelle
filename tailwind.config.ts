import type { Config } from "tailwindcss";

/**
 * Dizájn tokenek — a Beauty Forum arculat szerint.
 * Meleg krém alap, borostyán akcentus, lágy lekerekítések,
 * Cormorant (címek) + Jost (szövegtörzs) tipográfia.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Akcentus: borostyán gomb- és kiemelésszín, mellette halványabb arany
        bronze: {
          DEFAULT: "#CC7D18",
          dark: "#B06A12",
          soft: "#A37D52",
        },
        // Felületek — a krém alap a hátteret adó gradienssel egyezik
        cream: {
          DEFAULT: "#FBF4E6",
          deep: "#F6EBD8",
        },
        sand: "#DFC296",
        // Szöveg
        ink: "#3E2A1A",
        warm: "#5B4634",
        faded: "#8A775F",
        // Vonalak, keretek
        hairline: "#E2D4BD",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-jost)", "Helvetica Neue", "Arial", "sans-serif"],
      },
      letterSpacing: {
        label: "0.12em",
      },
      borderRadius: {
        card: "1rem",
        field: "1rem",
      },
      maxWidth: {
        content: "72rem",
      },
      boxShadow: {
        soft: "0 18px 40px -28px rgba(62, 42, 26, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
