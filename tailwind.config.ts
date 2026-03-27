import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Kolory marki Zuzanny Przekop
      colors: {
        brand: {
          navy:  "#0B2162",
          sage:  "#8BC9A2",
          lime:  "#CBEA4F",
          cream: "#FFFBF5",
          // Warianty pomocnicze
          "sage-light":  "#E8F5EE",
          "sage-medium": "#C5E5D0",
          "navy-light":  "#1a3a8a",
          "cream-dark":  "#F5EEE0",
        },
      },
      fontFamily: {
        mono: ["Inconsolata", "monospace"],
        sans: ["Inter", "sans-serif"],
      },
      // Płynna typografia — większa na desktop
      fontSize: {
        "quiz-title": ["clamp(1.75rem, 5vw, 2.75rem)", { lineHeight: "1.2" }],
        "quiz-question": ["clamp(1.1rem, 3vw, 1.4rem)", { lineHeight: "1.5" }],
      },
      animation: {
        "fade-in": "fadeIn 0.35s ease-out",
        "slide-up": "slideUp 0.35s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
