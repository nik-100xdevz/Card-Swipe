/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{ts,tsx,js,jsx}", "./app/**/*.{ts,tsx,js,jsx}", "./pages/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        glass: "rgba(255,255,255,0.12)",
      },
      boxShadow: {
        "soft-card": "0 30px 50px rgba(11,22,40,0.12)",
      },
    },
  },
  plugins: [],
};
