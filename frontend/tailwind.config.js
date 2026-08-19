/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        healthcare: {
          50: "#eefbfc",
          100: "#d6f4f7",
          500: "#0783a0",
          600: "#06728b",
          700: "#075d72",
          800: "#064d5d",
          900: "#043d4a",
        },

        gold: "#ffc400",
      },

      boxShadow: {
        card: "0 5px 25px rgba(0,0,0,0.08)",
      },
    },
  },

  plugins: [],
};