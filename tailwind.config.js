/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: { 
          primary: "#1e73be",
          dark: "#0d3b66",
          accent: "#f59e0b"
        }
      }
    },
  },
  plugins: [],
}
