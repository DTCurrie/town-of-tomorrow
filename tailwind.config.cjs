/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      backgroundImage: {
        'paper-pattern': "url('/ep_naturalwhite.png')",
      }
    },
  },
  plugins: [],
}
