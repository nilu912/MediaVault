// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        neonGreen: "#39FF14",
        darkBackground: "#0f0f0f",
      },
      boxShadow: {
        neon: "0 0 8px #39FF14, 0 0 15px #39FF14",
      },
      animation: {
        flicker: "flicker 2s infinite",
      },
      keyframes: {
        flicker: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.8 },
          "80%": { opacity: 0.4 },
          "90%": { opacity: 0.2 },
        },
      },
    },
  },
  plugins: [],
};
