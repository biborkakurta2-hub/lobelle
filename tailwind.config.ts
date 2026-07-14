import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bronze: {
          DEFAULT: "#C07F3F",
          dark: "#A76A2F",
        },
        cream: {
          DEFAULT: "#FAF7F2",
          deep: "#F3EDE3",
        },
        ink: "#2B2B2B",
        faded: "#6E6659",
        hairline: "#DCC49F",
      },
      fontFamily: {
        serif: ["var(--font-lora)", "Georgia", "serif"],
        sans: ["var(--font-poppins)", "Arial", "sans-serif"],
      },
      letterSpacing: {
        label: "0.25em",
      },
      maxWidth: {
        content: "72rem",
      },
    },
  },
  plugins: [],
};

export default config;
