/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#e94560",
          hover: "#d63d54",
          dark: "#c73652",
          light: "#fff0f3",
          alt: "#ee445e",
          border: "#ffccd5"
        },
        secondary: {
          DEFAULT: "#4361ee",
          light: "#f0f4ff",
          alt: "#4f7cff",
        },
        success: {
          DEFAULT: "#2ec4b6",
          light: "#e6faf8",
        },
        warning: {
          DEFAULT: "#f77f00",
          light: "#fff5e6",
        },
        alert: {
          DEFAULT: "#d4a000",
          light: "#fff8e6",
        },
        brand: {
          dark: "#1a1a2e",
          medium: "#16213e",
          light: "#0f3460",
        },
        app: {
          text: "#1a1a2e",
          bg: "#f4f6fb",
        }
      },
    },
  },
  plugins: [],
};
