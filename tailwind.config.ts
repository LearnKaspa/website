import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        kaspa: {
          DEFAULT: "#70C7BA",
          light: "#8ee0d4",
          dark: "#4da89c",
          surface: "#0e1416",
          card: "#121a1d",
          border: "#1d2b2f",
          accent: "#22393d"
        },
        obsidian: {
          950: "#060809",
          900: "#090d0e",
          800: "#0f1618",
          700: "#182226"
        }
      },
      fontFamily: {
        mono: ["JetBrains Mono", "Menlo", "Courier New", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;