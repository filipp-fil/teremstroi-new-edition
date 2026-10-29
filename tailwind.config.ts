import type { Config } from "tailwindcss";

/**
 * Дизайн-система «Красивый Дом».
 * Основной цвет — салатово-зелёный (со старого сайта), акцент — алый (логотип).
 * Менять фирменные цвета — здесь, в разделе colors.
 */
const config: Config = {
  darkMode: "class", // тёмную тему НЕ включаем; флаг оставлен для совместимости shadcn
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        // --- Фирменная палитра ---
        primary: {
          DEFAULT: "#8CC63F", // салатовый (кнопки, акценты)
          dark: "#6BA534", // тёмнее — hover
          light: "#EAF5DB", // подложки
        },
        accent: {
          DEFAULT: "#E63946", // алый из логотипа (акценты, скидки)
          dark: "#C42833",
        },
        forest: {
          DEFAULT: "#1E3A1E", // тёмно-зелёный для текста
          light: "#3B5A3B",
        },
        // --- Нейтральные ---
        sand: "#F7F6F2", // фон секций
        line: "#E5E3DC", // границы
        // --- shadcn-совместимые алиасы ---
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        radius: "hsl(var(--radius))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "1rem",
        "2xl": "1.25rem",
      },
      fontFamily: {
        // Подключаются в app/layout.tsx через next/font
        heading: ["var(--font-unbounded)", "sans-serif"],
        sans: ["var(--font-manrope)", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 24px -8px rgba(30, 58, 30, 0.12)",
        lift: "0 12px 40px -12px rgba(30, 58, 30, 0.25)",
      },
      keyframes: {
        "pulse-soft": {
          "0%, 100%": { transform: "scale(1)", boxShadow: "0 0 0 0 rgba(140,198,63,0.5)" },
          "50%": { transform: "scale(1.05)", boxShadow: "0 0 0 12px rgba(140,198,63,0)" },
        },
      },
      animation: {
        "pulse-soft": "pulse-soft 2.5s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
