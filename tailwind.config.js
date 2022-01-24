const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      "2xs": "360px",
      xs: "475px",
      ...defaultTheme.screens,
    },
    extend: {},
  },
  plugins: [],
};
