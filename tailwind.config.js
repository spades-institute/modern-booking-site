/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#101012",
          700: "#2B2B2E",
          500: "#4A4A4D",
        },
        stone: {
          400: "#8C8B87",
          200: "#D9D7D2",
          100: "#E7E5E0",
        },
        paper: {
          DEFAULT: "#F6F5F2",
          dim: "#EFEDE8",
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
      },
      letterSpacing: {
        widest2: "0.28em",
      },
      backgroundImage: {
        "fade-bar": "linear-gradient(90deg, #101012 0%, #4A4A4D 30%, #8C8B87 55%, #D9D7D2 78%, #F6F5F2 100%)",
        "fade-bar-rev": "linear-gradient(270deg, #101012 0%, #4A4A4D 30%, #8C8B87 55%, #D9D7D2 78%, #F6F5F2 100%)",
      },
      maxWidth: {
        content: "1240px",
      },
      transitionTimingFunction: {
        blade: "cubic-bezier(.65,0,.35,1)",
      },
    },
  },
  plugins: [],
};
