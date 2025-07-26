import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // --- ADDED: Custom color palettes ---
        eco: {
          "50": "#f0f9f1",
          "100": "#dcf1de",
          "200": "#bae3bf",
          "300": "#8ece96",
          "400": "#5eb169",
          "500": "#429a4e",
          "600": "#317a3b",
          "700": "#296232",
          "800": "#244e2b",
          "900": "#204126",
        },
        tech: {
          "50": "#f2f8fd",
          "100": "#e3eefa",
          "200": "#c1def5",
          "300": "#8bc4ec",
          "400": "#4fa6df",
          "500": "#2c8cca",
          "600": "#2171ab",
          "700": "#1e5b8b",
          "800": "#1e4d74",
          "900": "#1e4162",
        },
        amber: {
          "50": "#fffbeb",
          "100": "#fef3c7",
          "200": "#fde68a",
          "300": "#fcd34d",
          "400": "#fbbf24",
          "500": "#f59e0b",
          "600": "#d97706",
          "700": "#b45309",
          "800": "#92400e",
          "900": "#78350f",
        },
        orange: {
          "50": "#fff7ed",
          "100": "#ffedd5",
          "200": "#fed7aa",
          "300": "#fdba74",
          "400": "#fb923c",
          "500": "#f97316",
          "600": "#ea580c",
          "700": "#c2410c",
          "800": "#9a3412",
          "900": "#7c2d12",
        },
        teal: {
          "50": "#f0fdfa",
          "100": "#ccfbf1",
          "200": "#99f6e4",
          "300": "#5eead4",
          "400": "#2dd4bf",
          "500": "#14b8a6",
          "600": "#0d9488",
          "700": "#0f766e",
          "800": "#115e59",
          "900": "#134e4a",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      // --- ADDED: Keyframes for animations ---
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)", // A slightly more subtle 10px
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      // --- ADDED: Animation utilities ---
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-up": "fade-up 0.5s ease-out forwards", // 'forwards' is important!
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;