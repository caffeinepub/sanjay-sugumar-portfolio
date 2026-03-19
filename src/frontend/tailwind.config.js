/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "oklch(var(--background) / <alpha-value>)",
        foreground: "oklch(var(--foreground) / <alpha-value>)",
        card: {
          DEFAULT: "oklch(var(--card) / <alpha-value>)",
          foreground: "oklch(var(--card-foreground) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "oklch(var(--popover) / <alpha-value>)",
          foreground: "oklch(var(--popover-foreground) / <alpha-value>)",
        },
        primary: {
          DEFAULT: "oklch(var(--primary) / <alpha-value>)",
          foreground: "oklch(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "oklch(var(--secondary) / <alpha-value>)",
          foreground: "oklch(var(--secondary-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "oklch(var(--muted) / <alpha-value>)",
          foreground: "oklch(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "oklch(var(--accent) / <alpha-value>)",
          foreground: "oklch(var(--accent-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "oklch(var(--destructive) / <alpha-value>)",
          foreground: "oklch(var(--destructive-foreground) / <alpha-value>)",
        },
        border: "oklch(var(--border) / <alpha-value>)",
        input: "oklch(var(--input) / <alpha-value>)",
        ring: "oklch(var(--ring) / <alpha-value>)",
        navbar: "oklch(var(--navbar) / <alpha-value>)",
      },
      fontFamily: {
        display: ["Bricolage Grotesque", "Inter", "system-ui", "sans-serif"],
        body: ["Inter", "Plus Jakarta Sans", "system-ui", "sans-serif"],
        mono: ["Fira Code", "JetBrains Mono", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        card: "0 2px 12px 0 rgba(100, 80, 160, 0.08), 0 1px 3px 0 rgba(100, 80, 160, 0.06)",
        "card-hover":
          "0 8px 32px 0 rgba(100, 80, 160, 0.14), 0 2px 8px 0 rgba(100, 80, 160, 0.1)",
        glass: "0 8px 32px rgba(100, 80, 180, 0.1)",
      },
      animation: {
        blink: "blink 1s step-end infinite",
        "fade-in": "fadeInUp 0.65s ease-out forwards",
        float: "float 4s ease-in-out infinite",
        "glow-pulse": "glow-pulse 2.5s ease-in-out infinite",
        "telegram-pulse": "telegram-pulse 3s ease-in-out infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "glow-pulse": {
          "0%, 100%": {
            boxShadow: "0 8px 32px oklch(0.44 0.19 294 / 0.5)",
          },
          "50%": {
            boxShadow:
              "0 8px 48px oklch(0.44 0.19 294 / 0.8), 0 0 60px oklch(0.44 0.19 294 / 0.3)",
          },
        },
        "telegram-pulse": {
          "0%, 100%": { boxShadow: "0 4px 20px rgba(0, 136, 204, 0.4)" },
          "50%": {
            boxShadow:
              "0 4px 40px rgba(0, 136, 204, 0.75), 0 0 60px rgba(0, 136, 204, 0.3)",
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
