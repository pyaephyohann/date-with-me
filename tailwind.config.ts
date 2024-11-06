import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF69B4",
        secondary: "#fff",
        tartiary: "#FD1853",
        background: "#F3F4F4",
      },
      fontWeight: {
        boldMd: "500",
      },
      keyframes: {
        vibrate: {
          "0%, 100%": { transform: "scale(1)" },
          "25%": { transform: "scale(1.05)" },
          "50%": { transform: "scale(0.95)" },
          "75%": { transform: "scale(1.05)" },
        },
      },
      animation: {
        vibrate: "vibrate 0.3s ease-in-out",
      },
    },
  },
  plugins: [],
};
export default config;
