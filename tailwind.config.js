/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      padding: {
        '6.25rem': '6.25rem',
      },
      maxWidth: {
        '66.25rem': '66.25rem'
      },
      width: {
        '69.25rem': '69.25rem'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
};
