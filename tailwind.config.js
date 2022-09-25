const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        pageBackground: "#e2e8f0",
        primary: "#f59e0b",
        secondary: "#10b981",
        warning: "#a855f7",
        danger: "#dc2626",
        background: "#f8fafc",
        text: "#475569",
      },
    },
  },
  plugins: [],
}
