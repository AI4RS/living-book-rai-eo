/** @type {import('tailwindcss').Config} */

// Colors resolve to CSS variables defined in src/index.css (:root), so the
// palette (including the accent) is changed in one place.
const token = (name) => `rgb(var(--color-${name}) / <alpha-value>)`;

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    // Sharp corners throughout. Only a 2px option is available.
    borderRadius: {
      none: "0",
      DEFAULT: "0",
      sm: "2px",
    },
    extend: {
      colors: {
        ink: token("ink"),
        muted: token("muted"),
        line: { DEFAULT: token("line"), strong: token("line-strong") },
        surface: token("surface"),
        subtle: token("subtle"),
        accent: {
          DEFAULT: token("accent"),
          hover: token("accent-hover"),
          tint: token("accent-tint"),
        },
        risk: { DEFAULT: token("risk"), tint: token("risk-tint") },
        safe: { DEFAULT: token("safe"), tint: token("safe-tint") },
        warn: { DEFAULT: token("warn"), tint: token("warn-tint") },
      },
      fontFamily: {
        sans: [
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        serif: ["Georgia", "ui-serif", "Cambria", "Times New Roman", "serif"],
      },
    },
  },
  plugins: [],
};
