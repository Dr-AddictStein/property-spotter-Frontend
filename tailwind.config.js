/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "jost": ["Jost",' sans-serif']
      },
      colors: {
        "primary": "#074da3",
        "secondary": "#0c2339",
        "body": "#EFF4FC"
      }
    },
  },
  plugins: [require("daisyui")]
}

