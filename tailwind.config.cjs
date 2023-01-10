/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        'display': "'Special Elite', 'Courier New', Courier, monospace",
      }
    }
  },
  plugins: [],
  safelist: [
    {
      pattern: /(bg|text|border(-t|-r|-b|-l)?)-(rose|cyan|lime|sky|amber|emerald|pink|violet|teal)-(50|100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern: /w-(\d\d?)\/12/,
    },
  ]
}
