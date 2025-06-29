/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ff014f",
        secondary: "#1e2125",
        dark: "#212428",
        "card-dark": "#1e2024",
        "border-color": "#262a2e",
        "body-color": "#878e99",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      boxShadow: {
        card: "10px 10px 19px #1c1e22, -10px -10px 19px #262a2e",
      },
    },
  },
  plugins: [],
};
