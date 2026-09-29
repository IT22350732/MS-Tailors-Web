import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: "#08090C",
          surface: "#0F1218",
          card: "#121620",
          elevated: "#181E2C",
          border: "#1E2738",
          borderSubtle: "#2A364E",
        },
        navy: {
          950: "#060A12",
          900: "#0A1120",
          850: "#0E182D",
          800: "#13213D",
          700: "#1C2F55",
        },
        gold: {
          DEFAULT: "#C5A880",
          light: "#E3CEB2",
          antique: "#D4AF37",
          dark: "#9E825E",
          hover: "#B89970",
          subtle: "rgba(197, 168, 128, 0.12)",
          border: "rgba(197, 168, 128, 0.25)",
        },
        silk: {
          ivory: "#FDFBF7",
          pearl: "#F3F4F6",
          silver: "#CBD5E1",
          muted: "#94A3B8",
          dark: "#64748B",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "Cambria", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-cinzel)", "Georgia", "serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #DFB976 0%, #C5A880 50%, #9E825E 100%)",
        "gold-sheen": "linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.15), transparent)",
        "dark-gradient": "linear-gradient(180deg, #08090C 0%, #0A1120 100%)",
        "radial-highlight": "radial-gradient(circle at 50% 0%, rgba(197, 168, 128, 0.08) 0%, transparent 70%)",
      },
      boxShadow: {
        "gold-glow": "0 0 25px -5px rgba(197, 168, 128, 0.25)",
        "gold-glow-lg": "0 0 40px -10px rgba(197, 168, 128, 0.35)",
        "dark-card": "0 10px 30px -10px rgba(0, 0, 0, 0.8)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "shimmer": "shimmer 2.5s infinite linear",
      },
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
