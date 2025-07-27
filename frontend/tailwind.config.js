/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          pink: "#FF00FF",
          green: "#39FF14",
          blue: "#00FFFF",
          purple: "#9D00FF",
        },
        dark: "#0f0f0f"
      },
      fontFamily: {
        neon: ['"Orbitron"', "sans-serif"],
      },
    },
  },
  plugins: [],
}
