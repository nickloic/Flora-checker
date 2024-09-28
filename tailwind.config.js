/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'soft-white': '#eeeeee',
        'soft-green': '#739F4D',
        'soft-black': '#202022',
      },
    },
    fontFamily: {
      'monospace': ['monospace'],
    },
  },
  plugins: [],
}

