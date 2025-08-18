/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#E63946",   // boxing red
        secondary: "#1D3557", // navy
        light: "#F1FAEE",     // soft background
      },
      boxShadow: {
        card: "0 6px 30px rgba(0,0,0,.08)"
      }
    },
  },
  plugins: [],
}

