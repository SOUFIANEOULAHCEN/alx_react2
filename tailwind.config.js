export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0A1F44",
        // secondary: "#1E3A8A",
        secondary: "#0e1f4c",
        dark: "#121212",
        lightGray: "#B0B3B8",
        white: "#FFFFFF",
      },
    },
  },
  plugins: [require("daisyui")],
};
