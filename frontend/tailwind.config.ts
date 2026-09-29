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
          DEFAULT: "#000000",
          surface: "#07090E",
          card: "#0C101A",
          elevated: "#121826",
          border: "#1E293B",
          borderSubtle: "#2A3A54",
        },
        blue: {
          DEFAULT: "#3877F6",
          vivid: "#3877F6",
          electric: "#2563EB",
          light: "#60A5FA",
          dark: "#1D4ED8",
          deep: "#0F172A",
          subtle: "rgba(56, 119, 246, 0.12)",
          border: "rgba(56, 119, 246, 0.35)",
        },
        gold: {
          DEFAULT: "#3877F6", // Transitioned to MS Royal Blue
          light: "#93C5FD",
          antique: "#60A5FA",
          dark: "#1D4ED8",
          hover: "#2563EB",
          subtle: "rgba(56, 119, 246, 0.12)",
          border: "rgba(56, 119, 246, 0.35)",
        },
        silk: {
          ivory: "#FFFFFF",
          pearl: "#F8FAFC",
          silver: "#E2E8F0",
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
        "blue-gradient": "linear-gradient(135deg, #60A5FA 0%, #3877F6 50%, #1D4ED8 100%)",
        "gold-gradient": "linear-gradient(135deg, #60A5FA 0%, #3877F6 50%, #1D4ED8 100%)", // Keep for backwards compatibility
        "blue-sheen": "linear-gradient(90deg, transparent, rgba(56, 119, 246, 0.2), transparent)",
        "gold-sheen": "linear-gradient(90deg, transparent, rgba(56, 119, 246, 0.2), transparent)",
        "dark-gradient": "linear-gradient(180deg, #000000 0%, #07090E 100%)",
        "radial-highlight": "radial-gradient(circle at 50% 0%, rgba(56, 119, 246, 0.16) 0%, transparent 70%)",
      },
      boxShadow: {
        "blue-glow": "0 0 25px -5px rgba(56, 119, 246, 0.4)",
        "blue-glow-lg": "0 0 45px -8px rgba(56, 119, 246, 0.55)",
        "gold-glow": "0 0 25px -5px rgba(56, 119, 246, 0.4)",
        "gold-glow-lg": "0 0 45px -8px rgba(56, 119, 246, 0.55)",
        "dark-card": "0 10px 30px -10px rgba(0, 0, 0, 0.9)",
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
